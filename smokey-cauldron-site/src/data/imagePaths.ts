/**
 * Home page images (Option B). Uses public/images/banner/menu-1.png etc.
 * and public/images/gallery/menu-1.png etc. (PNG). Fallback to public root if missing.
 */

const BANNER_BASE = '/images/banner'
const GALLERY_BASE = '/images/gallery'

export const BANNER_IMAGES = [
  `${BANNER_BASE}/menu-1.png`,
  `${BANNER_BASE}/menu-2.png`,
  `${BANNER_BASE}/menu-3.png`,
]

export const GALLERY_IMAGES = [
  `${GALLERY_BASE}/menu-1.png`,
  `${GALLERY_BASE}/menu-2.png`,
  `${GALLERY_BASE}/menu-3.png`,
  `${GALLERY_BASE}/menu-4.png`,
  `${GALLERY_BASE}/menu-5.png`,
  `${GALLERY_BASE}/menu-6.png`,
  `${GALLERY_BASE}/menu-7.png`,
  `${GALLERY_BASE}/menu-8.png`,
  `${GALLERY_BASE}/menu-9.png`,
  `${GALLERY_BASE}/menu-10.png`,
  `${GALLERY_BASE}/menu-11.png`,
  `${GALLERY_BASE}/menu-12.png`,
]

export const FALLBACK_BANNER = ['/menu-1.png', '/menu-2.png', '/menu-3.png']
export const FALLBACK_GALLERY = '/menu-1.png'

/** A Taste of Rome–style section: 4 images from public/images/menu/jpeg (click thumbnail = large view) */
const MENU_JPEG_BASE = '/images/menu'
export const TASTE_SECTION_IMAGES = [
  `${MENU_JPEG_BASE}/menu-1.jpeg`,
  `${MENU_JPEG_BASE}/menu-2.jpeg`,
  `${MENU_JPEG_BASE}/menu-3.jpeg`,
  `${MENU_JPEG_BASE}/menu-4.jpeg`,
]
