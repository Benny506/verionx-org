import React, { useEffect } from 'react'
import Lenis from 'lenis'

let activeLenisInstance: Lenis | null = null

export const getLenis = () => activeLenisInstance

export const scrollToTarget = (
  target: number | HTMLElement | string,
  options?: { offset?: number; immediate?: boolean; duration?: number }
) => {
  if (activeLenisInstance) {
    activeLenisInstance.scrollTo(target, options)
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: options?.immediate ? 'auto' : 'smooth' })
  } else if (typeof target === 'string') {
    const el = document.querySelector(target)
    if (el) {
      el.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
    }
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: options?.immediate ? 'auto' : 'smooth' })
  }
}

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    activeLenisInstance = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const animId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animId)
      lenis.destroy()
      activeLenisInstance = null
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll


