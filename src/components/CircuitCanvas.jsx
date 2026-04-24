import { useEffect, useRef } from 'react'

export default function CircuitCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H, lines = [], animId

    function resize() {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    class Line {
      constructor() { this.reset(true) }
      reset(init = false) {
        this.x = Math.random() * W
        this.y = init ? Math.random() * H : (Math.random() < .5 ? -10 : H + 10)
        this.dir = Math.random() < .5 ? 1 : -1
        this.speed = .3 + Math.random() * .6
        this.alpha = .12 + Math.random() * .18
        this.color = Math.random() < .6 ? '43,91,168' : '90,140,46'
        this.segments = []
        let cx = this.x, cy = this.y
        for (let i = 0; i < 6; i++) {
          const horiz = Math.random() < .5
          const d = (30 + Math.random() * 60) * (Math.random() < .5 ? 1 : -1)
          if (horiz) cx += d; else cy += d
          this.segments.push({ x: cx, y: cy })
        }
      }
      draw() {
        ctx.strokeStyle = `rgba(${this.color},${this.alpha})`
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        this.segments.forEach(s => ctx.lineTo(s.x, s.y))
        ctx.stroke()
        const last = this.segments[this.segments.length - 1]
        ctx.fillStyle = `rgba(${this.color},${this.alpha * 2})`
        ctx.beginPath()
        ctx.arc(last.x, last.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      update() {
        this.y += this.speed * this.dir
        this.segments.forEach(s => s.y += this.speed * this.dir)
        if (this.y > H + 200 || this.y < -200) this.reset()
      }
    }

    for (let i = 0; i < 28; i++) lines.push(new Line())

    function animate() {
      ctx.clearRect(0, 0, W, H)
      lines.forEach(l => { l.update(); l.draw() })
      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.35 }}
    />
  )
}
