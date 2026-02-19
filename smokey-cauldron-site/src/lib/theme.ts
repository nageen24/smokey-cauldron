import * as React from 'react'
import { useLocalStorageState } from './useLocalStorage'

export type Theme = 'night' | 'day'

const THEME_KEY = 'smokey-cauldron.theme'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useLocalStorageState<Theme>(THEME_KEY, 'night')

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggle = React.useCallback(() => {
    setTheme(theme === 'night' ? 'day' : 'night')
  }, [setTheme, theme])

  return [theme, toggle]
}

