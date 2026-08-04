/**
 * GravityEngine — A DOM-based 2D physics engine.
 *
 * Registers HTML elements as rigid bodies, then simulates gravity, wall/floor
 * bouncing, inter-body collisions, and pointer drag-and-throw.  Every frame
 * the engine positions elements with CSS `transform` for GPU-accelerated
 * rendering.
 *
 * Usage:
 *   const engine = new GravityEngine()
 *   engine.setContainer(sectionEl)
 *   engine.register('heading', headingEl)
 *   engine.activate()          // elements start falling
 *   engine.startDrag(id, x, y) // grab
 *   engine.moveDrag(x, y)      // drag
 *   engine.endDrag()           // release / throw
 *   engine.deactivate()        // smooth spring-back to original positions
 *   engine.destroy()           // cleanup
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PhysicsBody {
  id: string
  el: HTMLElement
  /** Full inline style attribute saved before activation. */
  savedStyle: string
  /** Original position relative to the container (set on activate). */
  ox: number
  oy: number
  /** Current physics position. */
  x: number
  y: number
  /** Velocity (px / s). */
  vx: number
  vy: number
  /** Measured dimensions. */
  w: number
  h: number
  /** Rotation (rad) & angular velocity (rad / s). */
  rot: number
  av: number
  /** True while the user is dragging this body. */
  dragging: boolean
}

// ---------------------------------------------------------------------------
// Engine
// ---------------------------------------------------------------------------

export class GravityEngine {
  // -- state ----------------------------------------------------------------
  private bodies: PhysicsBody[] = []
  private container: HTMLElement | null = null
  private raf = 0
  private lastTime = 0
  private _active = false

  // -- drag bookkeeping -----------------------------------------------------
  private dragBody: PhysicsBody | null = null
  private dragOffX = 0
  private dragOffY = 0
  private dragPrevX = 0
  private dragPrevY = 0
  private dragPrevT = 0

  // -- tunables -------------------------------------------------------------
  private readonly GRAVITY = 980        // px/s²
  private readonly BOUNCE = 0.3         // coefficient of restitution
  private readonly GROUND_FRIC = 0.92   // horizontal slowdown on floor contact
  private readonly ANG_DAMP = 0.96      // angular velocity damping per frame
  private readonly VEL_CAP = 2500       // max velocity magnitude

  // -- public accessors -----------------------------------------------------
  get active() { return this._active }

  // -- setup ----------------------------------------------------------------
  setContainer(el: HTMLElement) { this.container = el }

  register(id: string, el: HTMLElement) {
    // Prevent duplicates.
    this.bodies = this.bodies.filter(b => b.id !== id)
    this.bodies.push({
      id,
      el,
      savedStyle: '',
      ox: 0, oy: 0,
      x: 0, y: 0,
      vx: 0, vy: 0,
      w: 0, h: 0,
      rot: 0, av: 0,
      dragging: false,
    })
  }

  unregister(id: string) {
    this.bodies = this.bodies.filter(b => b.id !== id)
  }

  // -- lifecycle ------------------------------------------------------------

  activate() {
    if (this._active || !this.container) return
    this._active = true

    const cr = this.container.getBoundingClientRect()

    for (const b of this.bodies) {
      const r = b.el.getBoundingClientRect()
      // Skip hidden elements (display:none gives 0×0 rect).
      if (r.width === 0 && r.height === 0) continue

      // Save the full inline style so we can restore it later.
      b.savedStyle = b.el.getAttribute('style') || ''

      b.ox = r.left - cr.left
      b.oy = r.top - cr.top
      b.x = b.ox
      b.y = b.oy
      b.w = r.width
      b.h = r.height
      b.vx = (Math.random() - 0.5) * 120
      b.vy = 0
      b.rot = 0
      b.av = (Math.random() - 0.5) * 3

      const s = b.el.style
      s.position = 'absolute'
      s.left = `${b.ox}px`
      s.top = `${b.oy}px`
      s.right = 'auto'
      s.bottom = 'auto'
      s.width = `${b.w}px`
      s.margin = '0'
      s.zIndex = '10'
      s.cursor = 'grab'
      s.touchAction = 'none'
      s.willChange = 'transform'
      s.transition = 'none'
      s.transform = 'none'
      s.animation = 'none'
    }

    this.lastTime = 0
    this.raf = requestAnimationFrame(this.tick)
  }

  /**
   * Stop the simulation and optionally spring elements back to their
   * original positions before restoring the saved inline styles.
   */
  deactivate(smooth = true) {
    this._active = false
    cancelAnimationFrame(this.raf)
    this.dragBody = null

    if (smooth) {
      for (const b of this.bodies) {
        b.el.style.transition =
          'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
        b.el.style.transform = 'translate(0,0) rotate(0deg)'
      }
      setTimeout(() => this.restoreAll(), 850)
    } else {
      this.restoreAll()
    }
  }

  destroy() {
    this._active = false
    cancelAnimationFrame(this.raf)
    this.dragBody = null
    this.bodies = []
  }

  // -- internal helpers -----------------------------------------------------

  private restoreAll() {
    for (const b of this.bodies) {
      if (b.savedStyle) {
        b.el.setAttribute('style', b.savedStyle)
      } else {
        b.el.removeAttribute('style')
      }
      b.vx = 0; b.vy = 0; b.rot = 0; b.av = 0
    }
  }

  // -- physics step ---------------------------------------------------------

  private tick = (ts: number) => {
    if (!this._active || !this.container) return
    if (!this.lastTime) this.lastTime = ts

    const dt = Math.min((ts - this.lastTime) / 1000, 0.033)
    this.lastTime = ts

    const cw = this.container.clientWidth
    const ch = this.container.clientHeight

    for (const b of this.bodies) {
      if (b.w === 0) continue // skip hidden bodies

      if (b.dragging) {
        // Still update the visual transform for rotation while dragging.
        this.applyTransform(b)
        continue
      }

      // Gravity.
      b.vy += this.GRAVITY * dt

      // Clamp velocity.
      b.vx = clamp(b.vx, -this.VEL_CAP, this.VEL_CAP)
      b.vy = clamp(b.vy, -this.VEL_CAP, this.VEL_CAP)

      // Integrate position.
      b.x += b.vx * dt
      b.y += b.vy * dt

      // Rotation.
      b.rot += b.av * dt
      b.av *= this.ANG_DAMP

      // --- boundary collisions ---

      // Floor.
      if (b.y + b.h > ch) {
        b.y = ch - b.h
        b.vy = -Math.abs(b.vy) * this.BOUNCE
        b.vx *= this.GROUND_FRIC
        b.av *= 0.8
        if (Math.abs(b.vy) < 12) {
          b.vy = 0
          b.av *= 0.92
          if (Math.abs(b.vx) < 3) b.rot *= 0.97
        }
      }
      // Ceiling.
      if (b.y < 0) { b.y = 0; b.vy = Math.abs(b.vy) * this.BOUNCE }
      // Left wall.
      if (b.x < 0) { b.x = 0; b.vx = Math.abs(b.vx) * this.BOUNCE }
      // Right wall.
      if (b.x + b.w > cw) { b.x = cw - b.w; b.vx = -Math.abs(b.vx) * this.BOUNCE }

      this.applyTransform(b)
    }

    // Body↔body collisions (simple AABB push-apart).
    this.resolveCollisions()

    this.raf = requestAnimationFrame(this.tick)
  }

  private applyTransform(b: PhysicsBody) {
    const dx = b.x - b.ox
    const dy = b.y - b.oy
    b.el.style.transform = `translate(${dx}px,${dy}px) rotate(${b.rot}rad)`
  }

  private resolveCollisions() {
    const len = this.bodies.length
    for (let i = 0; i < len; i++) {
      const a = this.bodies[i]
      if (a.w === 0) continue
      for (let j = i + 1; j < len; j++) {
        const b = this.bodies[j]
        if (b.w === 0) continue

        // Quick AABB rejection.
        if (a.x >= b.x + b.w || a.x + a.w <= b.x ||
            a.y >= b.y + b.h || a.y + a.h <= b.y) continue

        const ox = Math.min(a.x + a.w - b.x, b.x + b.w - a.x)
        const oy = Math.min(a.y + a.h - b.y, b.y + b.h - a.y)

        if (oy < ox) {
          const half = oy / 2
          if (a.y < b.y) {
            if (!a.dragging) a.y -= half
            if (!b.dragging) b.y += half
          } else {
            if (!a.dragging) a.y += half
            if (!b.dragging) b.y -= half
          }
          const tv = a.vy; a.vy = b.vy * 0.5; b.vy = tv * 0.5
        } else {
          const half = ox / 2
          if (a.x < b.x) {
            if (!a.dragging) a.x -= half
            if (!b.dragging) b.x += half
          } else {
            if (!a.dragging) a.x += half
            if (!b.dragging) b.x -= half
          }
          const tv = a.vx; a.vx = b.vx * 0.5; b.vx = tv * 0.5
        }
      }
    }
  }

  // -- drag API -------------------------------------------------------------

  startDrag(id: string, clientX: number, clientY: number) {
    if (!this._active || !this.container) return
    const b = this.bodies.find(x => x.id === id)
    if (!b || b.w === 0) return

    const cr = this.container.getBoundingClientRect()
    const lx = clientX - cr.left
    const ly = clientY - cr.top

    b.dragging = true
    b.vx = 0
    b.vy = 0
    b.el.style.cursor = 'grabbing'
    b.el.style.zIndex = '20'

    this.dragBody = b
    this.dragOffX = lx - b.x
    this.dragOffY = ly - b.y
    this.dragPrevX = lx
    this.dragPrevY = ly
    this.dragPrevT = performance.now()
  }

  moveDrag(clientX: number, clientY: number) {
    const b = this.dragBody
    if (!b || !this.container) return

    const cr = this.container.getBoundingClientRect()
    const lx = clientX - cr.left
    const ly = clientY - cr.top
    const now = performance.now()
    const dt = (now - this.dragPrevT) / 1000

    b.x = lx - this.dragOffX
    b.y = ly - this.dragOffY

    if (dt > 0.001) {
      b.vx = ((lx - this.dragPrevX) / dt) * 0.35
      b.vy = ((ly - this.dragPrevY) / dt) * 0.35
    }

    this.dragPrevX = lx
    this.dragPrevY = ly
    this.dragPrevT = now
  }

  endDrag() {
    const b = this.dragBody
    if (!b) return

    b.dragging = false
    b.el.style.cursor = 'grab'
    b.el.style.zIndex = '10'
    // Add some angular spin proportional to throw velocity.
    b.av = (Math.random() - 0.5) * Math.min(Math.abs(b.vx) / 150, 4)
    this.dragBody = null
  }
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}
