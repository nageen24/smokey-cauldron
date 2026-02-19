export type RestaurantData = {
  name: string
  tagline?: string
  googleMapsUrl: string
  address?: string
  phone?: string
  hours?: Array<{ day: string; open: string; close: string }>
  coordinates?: { lat: number; lng: number }
  lastUpdatedISO?: string
}

export type SocialPost = {
  platform: 'instagram'
  url: string
  oembedHtml?: string
  authorName?: string
  authorUrl?: string
  title?: string
  thumbnailUrl?: string
  fetchedAtISO?: string
}

