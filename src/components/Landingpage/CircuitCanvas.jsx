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
        this.y = Math.random() * H
        
        // Vibrant neon colors matching the screenshot (Cyan and Bright Green)
        this.color = Math.random() < 0.4 ? '138, 255, 104' : '0, 195, 255'
        this.points = [{ x: this.x, y: this.y }]
        this.totalLength = 0

        let cx = this.x
        let cy = this.y
        let direction = Math.floor(Math.random() * 4) // 0: Up, 1: Right, 2: Down, 3: Left

        // Generate orthogonal circuit board-like segments
        const numSegments = 3 + Math.floor(Math.random() * 4)
        for (let i = 0; i < numSegments; i++) {
          let dist = 50 + Math.random() * 150
          
          // Occasionally add a 45-degree diagonal bend for variety
          if (Math.random() < 0.15) {
            const dirX = Math.random() < 0.5 ? 1 : -1
            const dirY = Math.random() < 0.5 ? 1 : -1
            cx += dist * dirX
            cy += dist * dirY
            this.totalLength += Math.sqrt(dist * dist + dist * dist)
          } else {
            if (direction === 0) cy -= dist
            else if (direction === 1) cx += dist
            else if (direction === 2) cy += dist
            else if (direction === 3) cx -= dist
            this.totalLength += dist
          }

          this.points.push({ x: cx, y: cy })
          
          // Force a 90-degree turn left or right for the next segment
          direction = (direction + (Math.random() < 0.5 ? 1 : 3)) % 4
        }

        // Delay the start of some lines so they don't all animate at once
        this.progress = init ? -Math.random() * this.totalLength : -Math.random() * 500
        this.speed = 0.8 + Math.random() * 1.5
        this.pulseLength = 30 + Math.random() * 50
      }

      draw() {
        // 1. Draw the faint, fixed background track
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 1; i < this.points.length; i++) {
          ctx.lineTo(this.points[i].x, this.points[i].y)
        }
        ctx.strokeStyle = `rgba(${this.color}, 0.15)`
        ctx.lineWidth = 1
        ctx.setLineDash([])
        ctx.stroke()

        // 2. Draw the animated glowing pulse traveling along the path
        if (this.progress > -this.pulseLength && this.progress < this.totalLength) {
          ctx.beginPath()
          ctx.moveTo(this.points[0].x, this.points[0].y)
          for (let i = 1; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y)
          }

          ctx.shadowColor = `rgb(${this.color})`
          ctx.shadowBlur = 10 // Creates the glowing effect
          ctx.strokeStyle = `rgba(${this.color}, 0.8)`
          ctx.lineWidth = 2
          
          // Trick: Use a dash pattern of [pulse_size, massive_gap] and offset it
          ctx.setLineDash([this.pulseLength, 99999]) 
          ctx.lineDashOffset = -this.progress
          ctx.stroke()
        }

        // 3. Draw a static node dot at the end of the line
        ctx.shadowBlur = 4
        ctx.beginPath()
        const lastP = this.points[this.points.length - 1]
        ctx.arc(lastP.x, lastP.y, 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${this.color}, 0.6)`
        ctx.fill()
      }

      update() {
        this.progress += this.speed
        // Reset the line when the pulse finishes traveling
        if (this.progress > this.totalLength + 100) this.reset()
      }
    }

    // Initialize lines
    for (let i = 0; i < 25; i++) lines.push(new Line())

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
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1, 
        pointerEvents: 'none' 
        // Note: Removed `opacity: 0.35` so the canvas glow effects stay bright!
      }}
    />
  )
}