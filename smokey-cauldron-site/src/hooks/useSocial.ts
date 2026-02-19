import { useJson } from '../lib/useJson'
import type { SocialPost } from '../types'
import { fallbackSocial } from '../data/defaults'

export function useSocial() {
  return useJson<SocialPost[]>('/social.json', fallbackSocial)
}

