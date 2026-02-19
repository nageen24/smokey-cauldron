import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as cheerio from 'cheerio'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, '..')
const publicDir = path.join(projectRoot, 'public')

const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/The+Smokey+Cauldron/@33.728613,73.0572096,15z/data=!4m10!1m2!2m1!1srestaurants+in+islambad+f6!3m6!1s0x38dfece483b03ddf:0xb0fcef9617db2fe7!8m2!3d33.7297484!4d73.077004!15sChtyZXN0YXVyYW50cyBpbiBpc2xhbWFiYWQgZjZaHSIbcmVzdGF1cmFudHMgaW4gaXNsYW1hYmFkIGY2kgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOcU9WQnVRbFpuRUFF4AEA-gEECDoQQg!16s%2Fg%2F11c1bfdvpf?authuser=0&entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'

const INSTAGRAM_USERNAME = 'thesmokeycauldronf6'

async function readJsonIfExists(filePath, fallback) {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

async function writeJsonPretty(filePath, data) {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

function parseCoordinatesFromMapsUrl(url) {
  // Prefer the actual place pin if present: ...!3d33.7297!4d73.0770...
  const pin = url.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/)
  if (pin) return { lat: Number(pin[1]), lng: Number(pin[2]) }

  // Fallback: the map viewport center: .../@33.728613,73.0572096,15z/...
  const viewport = url.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?),/)
  if (!viewport) return null
  return { lat: Number(viewport[1]), lng: Number(viewport[2]) }
}

async function fetchHtml(url, init) {
  const res = await fetch(url, {
    redirect: 'follow',
    headers: {
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
      ...init?.headers,
    },
    ...init,
  })
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
  return await res.text()
}

function extractPhone(text) {
  // Pakistan-ish phone patterns; keep it permissive.
  const m =
    text.match(/(\+?92\s*[-]?\s*\d{2,3}\s*[-]?\s*\d{3}\s*[-]?\s*\d{4})/i) ??
    text.match(/(0\d{2,3}\s*[-]?\s*\d{3}\s*[-]?\s*\d{4})/i)
  return m ? m[1].replace(/\s+/g, ' ').trim() : null
}

function normalizeText(s) {
  return s
    .replaceAll('\u00a0', ' ')
    .replaceAll('\u202f', ' ')
    .replaceAll('\u2009', ' ')
    .replaceAll('\u2013', '-')
    .replaceAll('\u2014', '-')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractHours(text) {
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const out = []
  for (const day of days) {
    const re = new RegExp(
      `${day}:\\s*([0-9]{1,2}:[0-9]{2}\\s*[AP]M)\\s*[-]\\s*([0-9]{1,2}:[0-9]{2}\\s*[AP]M)`,
      'i',
    )
    const m = text.match(re)
    if (m) out.push({ day, open: m[1].toUpperCase(), close: m[2].toUpperCase() })
  }
  return out.length ? out : null
}

function extractAddress(text) {
  // Try to capture a compact address-like segment from common directory sites.
  const patterns = [
    /located at\s+(.+?)\s*(?:Opening Hours|Contact Information|For inquiries)/i,
    /Conveniently located at\s+(.+?)\s*(?:The Smokey Cauldron|Contact Information|Opening Hours)/i,
    /Contact Information\s+(.+?)\s*Opening Hours/i,
  ]
  for (const p of patterns) {
    const m = text.match(p)
    if (m?.[1]) {
      const candidate = m[1].replace(/[\u0000-\u001f]/g, '').trim()
      if (candidate.length > 8 && candidate.length < 220) return candidate
    }
  }
  return null
}

async function buildRestaurantJson() {
  const coords =
    parseCoordinatesFromMapsUrl(GOOGLE_MAPS_URL) ?? { lat: 33.7297484, lng: 73.077004 }

  const base = {
    name: 'The Smokey Cauldron',
    tagline: 'Harry Potter–inspired themed dining in Islamabad',
    googleMapsUrl: GOOGLE_MAPS_URL,
    coordinates: coords,
    lastUpdatedISO: new Date().toISOString(),
  }

  const sources = [
    'https://tourisminsights.pk/geo-map/the-smokey-cauldron/',
    'https://f7markaz.com/islamabad/the-smokey-cauldron',
  ]

  for (const url of sources) {
    try {
      const html = await fetchHtml(url)
      const $ = cheerio.load(html)
      const text = normalizeText($('body').text())

      const phone = extractPhone(text)
      const addressCandidate =
        normalizeText($('address').first().text()) || extractAddress(text)
      const hoursCandidate = extractHours(text)

      const merged = { ...base }
      if (phone) merged.phone = phone
      if (addressCandidate && addressCandidate.length > 12) merged.address = addressCandidate
      if (hoursCandidate) merged.hours = hoursCandidate

      return merged
    } catch {
      // keep trying next source
    }
  }

  return base
}

async function buildSocialJson(existingPosts = []) {
  const profileUrl = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`

  let shortcodes = []
  try {
    const html = await fetchHtml(profileUrl, {
      headers: { accept: 'text/html' },
    })
    const re = /\/p\/([A-Za-z0-9_-]+)\//g
    const found = new Set()
    let m
    while ((m = re.exec(html)) !== null) {
      found.add(m[1])
      if (found.size >= 8) break
    }
    shortcodes = [...found]
  } catch {
    // fallback: keep existing URLs
  }

  const urls =
    shortcodes.length > 0
      ? shortcodes.map((c) => `https://www.instagram.com/p/${c}/`)
      : existingPosts.map((p) => p.url).filter(Boolean)

  const unique = [...new Set(urls)].slice(0, 6)

  const posts = []
  for (const url of unique) {
    try {
      const oembedUrl = `https://www.instagram.com/oembed/?url=${encodeURIComponent(
        url,
      )}&omitscript=true`
      const res = await fetch(oembedUrl, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122 Safari/537.36',
          accept: 'application/json,text/plain,*/*',
        },
      })
      if (!res.ok) throw new Error(`oEmbed HTTP ${res.status}`)
      const j = await res.json()
      posts.push({
        platform: 'instagram',
        url,
        oembedHtml: j.html,
        authorName: j.author_name,
        authorUrl: j.author_url,
        title: j.title,
        thumbnailUrl: j.thumbnail_url,
        fetchedAtISO: new Date().toISOString(),
      })
    } catch {
      // Fallback: use the official Instagram embed format.
      posts.push({
        platform: 'instagram',
        url,
        oembedHtml: `<blockquote class="instagram-media" data-instgrm-permalink="${url}" data-instgrm-version="14" style="background:#fff; border:0; border-radius:12px; margin:0; padding:0; width:100%"></blockquote>`,
        fetchedAtISO: new Date().toISOString(),
      })
    }
  }

  return posts
}

async function buildMenuJson() {
  // Best-effort text-only parse from public menu sites.
  const sources = [
    'https://menuprices.pk/the-smokey-cauldron-menu/',
    'https://todaymenuprices.com/the-smokey-cauldron-menu-prices/',
  ]

  for (const url of sources) {
    try {
      const html = await fetchHtml(url)
      const $ = cheerio.load(html)
      const items = []

      $('table tr').each((_, tr) => {
        const tds = $(tr).find('td')
        if (tds.length < 1) return
        const name = $(tds[0]).text().replace(/\s+/g, ' ').trim()
        const price = $(tds[1]).text().replace(/\s+/g, ' ').trim()
        if (!name || name.length < 3) return
        const normalizedPrice = price && /pkr|rs/i.test(price) ? price : undefined
        items.push({ name, price: normalizedPrice })
      })

      if (items.length >= 5) {
        return { lastUpdatedISO: new Date().toISOString(), items }
      }
    } catch {
      // try next
    }
  }

  return { lastUpdatedISO: new Date().toISOString(), items: [] }
}

function extractReviews(text) {
  const reviews = []
  const re =
    /([A-Z][a-z]+ [A-Z][a-z]+)★★★★★([^]+?)(?=[A-Z][a-z]+ [A-Z][a-z]+★★★★★|This article is based|Tagsrestaurant|$)/g
  let m
  while ((m = re.exec(text)) !== null && reviews.length < 8) {
    const author = m[1].trim()
    let body = m[2].replace(/Report/gi, '').trim()
    if (body.length > 40 && body.length < 600) {
      reviews.push({
        author,
        body,
        rating: 5,
        source: 'tourisminsights.pk',
      })
    }
  }
  return reviews
}

async function buildReviewsJson() {
  const sources = ['https://tourisminsights.pk/geo-map/the-smokey-cauldron/']
  for (const url of sources) {
    try {
      const html = await fetchHtml(url)
      const $ = cheerio.load(html)
      const text = normalizeText($('body').text())
      const extracted = extractReviews(text)
      if (extracted.length) {
        return { lastUpdatedISO: new Date().toISOString(), reviews: extracted }
      }
    } catch {
      // try next
    }
  }

  return { lastUpdatedISO: new Date().toISOString(), reviews: [] }
}

async function main() {
  const restaurantPath = path.join(publicDir, 'restaurant.json')
  const socialPath = path.join(publicDir, 'social.json')
  const menuPath = path.join(publicDir, 'menu.json')
  const reviewsPath = path.join(publicDir, 'reviews.json')

  const existingSocial = await readJsonIfExists(socialPath, [])

  const restaurant = await buildRestaurantJson()
  const social = await buildSocialJson(existingSocial)
  const menu = await buildMenuJson()
  const reviews = await buildReviewsJson()

  await writeJsonPretty(restaurantPath, restaurant)
  await writeJsonPretty(socialPath, social)
  await writeJsonPretty(menuPath, menu)
  await writeJsonPretty(reviewsPath, reviews)

  console.log('Updated:')
  console.log('-', path.relative(projectRoot, restaurantPath))
  console.log('-', path.relative(projectRoot, socialPath))
  console.log('-', path.relative(projectRoot, menuPath))
  console.log('-', path.relative(projectRoot, reviewsPath))
}

main().catch((e) => {
  console.error(e)
  process.exitCode = 1
})

