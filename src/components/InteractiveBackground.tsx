import { useEffect, useRef } from 'react'

/**
 * Canvas particle field that links nearby particles and reacts to the cursor.
 * Renders nothing when the user prefers reduced motion.
 */
export default function InteractiveBackground({
  className = 'absolute inset-0 -z-10 h-full w-full',
}: {
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = canvas.offsetWidth)
    let height = (canvas.height = canvas.offsetHeight)

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', handleResize)

    // Cursor tracking, kept far off-screen until the pointer arrives.
    const mouse = { x: -1000, y: -1000, radius: 150 }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    const particleCount = Math.floor((width * height) / 12000)
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 1,
      baseAlpha: Math.random() * 0.5 + 0.2,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        // Bounce off the edges.
        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(56, 189, 248, ${p.baseAlpha})`
        ctx.fill()

        // Draw a line to the cursor and nudge the particle away from it.
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.hypot(dx, dy)

        if (dist < mouse.radius && dist > 0) {
          const force = 1 - dist / mouse.radius
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(56, 189, 248, ${force * 0.6})`
          ctx.lineWidth = 1
          ctx.stroke()

          p.x -= (dx / dist) * force * 1.5
          p.y -= (dy / dist) * force * 1.5
        }

        // Link up neighbouring particles.
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const pDist = Math.hypot(p.x - p2.x, p.y - p2.y)

          if (pDist < 100) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - pDist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
