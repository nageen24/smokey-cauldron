import * as React from 'react'

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setState] = React.useState<T>(() => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? (JSON.parse(raw) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setAndStore = React.useCallback(
    (value: T) => {
      setState(value)
      try {
        localStorage.setItem(key, JSON.stringify(value))
      } catch {
        // ignore
      }
    },
    [key],
  )

  return [state, setAndStore]
}

