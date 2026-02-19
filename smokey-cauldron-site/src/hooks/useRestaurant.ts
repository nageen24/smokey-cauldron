import { useJson } from '../lib/useJson'
import type { RestaurantData } from '../types'
import { fallbackRestaurant } from '../data/defaults'

export function useRestaurant() {
  return useJson<RestaurantData>('/restaurant.json', fallbackRestaurant)
}

