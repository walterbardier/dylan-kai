import { useEffect, useRef } from 'react'

export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const setSize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight || window.innerHeight * 3
    }
    setSize()
    window.addEventListener('resize', setSize)

    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.2,
      base: Math.random() * 0.55 + 0.08,
      speed: Math.random() * 0.6 + 0.15,
      phase: Math.random() * Math.PI * 2,
    }))

    let id: number
    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const s of stars) {
        const tw = Math.sin(t * s.speed + s.phase) * 0.38 + 0.62
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${(s.base * tw).toFixed(3)})`
        ctx.fill()
      }
      t += 0.01
      id = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('resize', setSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
