import { useLayoutEffect, useCallback, useState, RefObject } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

type RectResult = {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
}

function getRect<T extends HTMLElement>(element?: T): RectResult {
  let rect: RectResult = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
  }
  if (element) rect = element.getBoundingClientRect()
  return rect
}

export function useRect<T extends HTMLElement>(ref: RefObject<T>): RectResult {
  const [rect, setRect] = useState<RectResult>(
    ref && ref.current ? getRect(ref.current) : getRect()
  )

  const handleResize = useCallback((): void => {
    if (!ref.current) return
    setRect(getRect(ref.current))
  }, [ref])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver((): void => handleResize())
      resizeObserver.observe(element)
      return (): void => {
        if (!resizeObserver) return
        resizeObserver.disconnect()
        resizeObserver = null
      }
    } else {
      window.addEventListener('resize', handleResize)
      return (): void => window.removeEventListener('resize', handleResize)
    }
  }, [ref.current])

  return rect
}
