import { useState } from 'react'

export function useLocalStorage(key, initialValue, validate = () => true) {
  const [value, setValue] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(`prepspace:${key}`))
      return saved !== null && validate(saved) ? saved : initialValue
    } catch { return initialValue }
  })
  function update(next) {
    setValue((previous) => {
      const result = typeof next === 'function' ? next(previous) : next
      try { localStorage.setItem(`prepspace:${key}`, JSON.stringify(result)) } catch { return result }
      return result
    })
  }
  return [value, update]
}
