import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const els = section.querySelectorAll('.reveal')
    if (!els.length) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      })
    }, { threshold: 0.15 })

    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}
