import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Engineering-first scroll restoration: instant, reliable, hash-aware
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    // Ensure SPA manual restoration to avoid browser auto-restores interfering
    if ('scrollRestoration' in window.history) {
      try {
        window.history.scrollRestoration = 'manual'
      } catch (e) {
        // ignore
      }
    }

    // If there's a hash (anchor), try to scroll to it; otherwise scroll to top
    if (hash) {
      const id = hash.replace('#', '')
      // Try immediate element
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'auto' })
        return
      }

      // If element not yet present (client-side render), try once on next frame
      requestAnimationFrame(() => {
        const el2 = document.getElementById(id)
        if (el2) el2.scrollIntoView({ behavior: 'auto' })
      })
      return
    }

    // Default: reset to top instantly to avoid flicker
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}
