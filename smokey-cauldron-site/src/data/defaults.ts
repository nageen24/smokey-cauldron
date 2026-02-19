import type { RestaurantData, SocialPost } from '../types'

export const GOOGLE_MAPS_URL =
  'https://www.google.com/maps/place/The+Smokey+Cauldron/@33.728613,73.0572096,15z/data=!4m10!1m2!2m1!1srestaurants+in+islambad+f6!3m6!1s0x38dfece483b03ddf:0xb0fcef9617db2fe7!8m2!3d33.7297484!4d73.077004!15sChtyZXN0YXVyYW50cyBpbiBpc2xhbWFiYWQgZjZaHSIbcmVzdGF1cmFudHMgaW4gaXNsYW1hYmFkIGY2kgEKcmVzdGF1cmFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOcU9WQnVRbFpuRUFF4AEA-gEECDoQQg!16s%2Fg%2F11c1bfdvpf?authuser=0&entry=ttu&g_ep=EgoyMDI2MDIxMS4wIKXMDSoASAFQAw%3D%3D'

export const INSTAGRAM_USERNAME = 'thesmokeycauldronf6'

export const fallbackRestaurant: RestaurantData = {
  name: 'The Smokey Cauldron',
  tagline: 'Harry Potter–inspired themed dining in Islamabad',
  googleMapsUrl: GOOGLE_MAPS_URL,
  coordinates: { lat: 33.7297484, lng: 73.077004 },
}

export const fallbackSocial: SocialPost[] = [
  {
    platform: 'instagram',
    url: 'https://www.instagram.com/thesmokeycauldronf6/p/C6qIWyPoaxN/',
  },
]

