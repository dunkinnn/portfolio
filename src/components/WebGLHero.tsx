import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../lib/useTheme'

/**
 * GPU particle field that drifts slowly and is pushed away by the cursor.
 * Drop-in replacement for InteractiveBackground with the same className API.
 */

const VERTEX = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform float uMotion;

  attribute float aRandom;
  attribute float aScale;

  varying float vGlow;
  varying float vRandom;

  void main() {
    vec3 pos = position;

    // Slow ambient drift so the field never looks frozen.
    float t = uTime * 0.06 + aRandom * 6.2831;
    pos.x += sin(t * (0.6 + aRandom)) * 0.03 * uMotion;
    pos.y += cos(t * (0.5 + aRandom * 0.8)) * 0.03 * uMotion;

    // Aspect-correct the local space so the cursor influence stays circular.
    vec2 d = pos.xy - uMouse;
    vec2 dw = vec2(d.x * uAspect, d.y);
    float dist = length(dw);

    float f = 1.0 - smoothstep(0.0, uRadius, dist);
    f = pow(f, 1.6);

    vec2 dir = dist > 0.0001 ? dw / dist : vec2(0.0, 1.0);
    vec2 push = dir * f * uStrength;
    push += vec2(-dir.y, dir.x) * f * uStrength * 0.5;

    pos.x += push.x / uAspect;
    pos.y += push.y;

    vGlow = f;
    vRandom = aRandom;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 + f * 2.0);
  }
`

const FRAGMENT = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorHot;

  varying float vGlow;
  varying float vRandom;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.05, d);
    if (alpha < 0.01) discard;

    vec3 col = mix(uColorA, uColorB, vRandom);
    col = mix(col, uColorHot, vGlow * 0.85);

    float a = alpha * (0.16 + 0.3 * vRandom + 0.5 * vGlow);
    gl_FragColor = vec4(col, clamp(a, 0.0, 1.0));
  }
`

const GRID_VERTEX = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const GRID_FRAGMENT = /* glsl */ `
  uniform vec2 uMouse;
  uniform float uAspect;
  uniform float uRadius;
  uniform vec2 uCells;
  uniform vec3 uGridColor;
  uniform vec3 uColorHot;
  uniform float uGridOpacity;

  varying vec2 vUv;

  void main() {
    vec2 p = vUv - 0.5;

    // Antialiased 1px lines, using the screen-space derivative of the cell coords.
    vec2 cell = vUv * uCells;
    vec2 edge = min(fract(cell), 1.0 - fract(cell));
    vec2 width = fwidth(cell);
    vec2 line = 1.0 - smoothstep(vec2(0.0), width, edge);
    float grid = max(line.x, line.y);
    if (grid < 0.001) discard;

    // Same falloff the particles use, from the same uMouse uniform.
    vec2 d = p - uMouse;
    float dist = length(vec2(d.x * uAspect, d.y));
    float f = 1.0 - smoothstep(0.0, uRadius, dist);
    f = pow(f, 1.6);

    // Radial vignette so the grid fades out toward the edges.
    float mask = 1.0 - smoothstep(0.34, 0.72, length(vec2(p.x * uAspect, p.y)));

    vec3 col = mix(uGridColor, uColorHot, f * 0.85);
    float a = grid * mask * (uGridOpacity + f * 0.7);
    if (a < 0.002) discard;

    gl_FragColor = vec4(col, a);
  }
`

type FieldProps = {
  colorA: string
  colorB: string
  colorHot: string
  gridColor: string
  motion: number
  light: boolean
}

function ParticleField({
  colorA,
  colorB,
  colorHot,
  gridColor,
  motion,
  light,
}: FieldProps) {
  const { viewport, size, gl } = useThree()
  const target = useRef(new THREE.Vector2(10, 10))

  // Particle count is picked once from the initial canvas area.
  const count = useRef(
    Math.max(500, Math.min(2400, Math.round((size.width * size.height) / 900))),
  ).current

  const { group, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const randoms = new Float32Array(count)
    const scales = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = Math.random() - 0.5
      positions[i * 3 + 1] = Math.random() - 0.5
      positions[i * 3 + 2] = 0
      randoms[i] = Math.random()
      scales[i] = 0.5 + Math.random() * 1.1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 1))
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))

    const u = {
      uMouse: { value: new THREE.Vector2(10, 10) },
      uTime: { value: 0 },
      uAspect: { value: 1 },
      uRadius: { value: 0.2 },
      uStrength: { value: 0.04 },
      uSize: { value: 2.6 },
      uPixelRatio: { value: 1 },
      uMotion: { value: motion },
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) },
      uColorHot: { value: new THREE.Color(colorHot) },
      uCells: { value: new THREE.Vector2(1, 1) },
      uGridColor: { value: new THREE.Color(gridColor) },
      uGridOpacity: { value: light ? 0.7 : 0.5 },
    }

    // Additive only ever brightens, so it is invisible on a light background.
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms: u,
      transparent: true,
      depthWrite: false,
      blending: light ? THREE.NormalBlending : THREE.AdditiveBlending,
    })

    // The grid shares the uniforms object outright, so there is one cursor
    // value driving both layers and they can never drift apart.
    const gridMaterial = new THREE.ShaderMaterial({
      vertexShader: GRID_VERTEX,
      fragmentShader: GRID_FRAGMENT,
      uniforms: u,
      transparent: true,
      depthWrite: false,
    })

    const gridGeometry = new THREE.PlaneGeometry(1, 1)
    const grid = new THREE.Mesh(gridGeometry, gridMaterial)
    grid.position.z = -0.01
    grid.renderOrder = -1

    const points = new THREE.Points(geometry, material)

    const g = new THREE.Group()
    g.add(grid, points)

    return { group: g, uniforms: u }
  }, [count, colorA, colorB, colorHot, gridColor, motion, light])

  // Dispose GPU resources when the field unmounts or is rebuilt.
  useEffect(() => {
    return () => {
      group.traverse((child) => {
        const obj = child as THREE.Mesh | THREE.Points
        obj.geometry?.dispose()
        ;(obj.material as THREE.ShaderMaterial | undefined)?.dispose()
      })
    }
  }, [group])

  // Track the cursor on the window so content layered above the canvas
  // does not swallow the events.
  useEffect(() => {
    const canvas = gl.domElement

    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      target.current.set(
        (e.clientX - rect.left) / rect.width - 0.5,
        0.5 - (e.clientY - rect.top) / rect.height,
      )
    }

    const handleLeave = () => target.current.set(10, 10)

    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('pointerleave', handleLeave)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerleave', handleLeave)
    }
  }, [gl])

  useFrame((state, delta) => {
    const aspect = viewport.width / viewport.height

    uniforms.uTime.value = state.clock.elapsedTime
    uniforms.uAspect.value = aspect
    uniforms.uPixelRatio.value = state.gl.getPixelRatio()
    uniforms.uRadius.value = 220 / viewport.height
    uniforms.uStrength.value = 22 / viewport.height
    uniforms.uMouse.value.lerp(target.current, Math.min(1, delta * 7))

    // 64px cells, matching the CSS grid this replaced.
    uniforms.uCells.value.set(viewport.width / 64, viewport.height / 64)

    group.scale.set(viewport.width, viewport.height, 1)
  })

  return <primitive object={group} />
}

// Additive blending needs bright colours on dark; light mode blends normally
// and so needs colours dark enough to read against white.
const PALETTE = {
  dark: {
    colorA: '#38bdf8',
    colorB: '#818cf8',
    colorHot: '#e0f2fe',
    gridColor: '#1e293b',
  },
  light: {
    colorA: '#0284c7',
    colorB: '#6366f1',
    colorHot: '#0f172a',
    gridColor: '#cbd5e1',
  },
} as const

export default function WebGLHero({
  className = 'pointer-events-none absolute inset-0 -z-10 h-full w-full',
  colorA,
  colorB,
  colorHot,
  gridColor,
}: {
  className?: string
  colorA?: string
  colorB?: string
  colorHot?: string
  gridColor?: string
} = {}) {
  const { isDark } = useTheme()
  const palette = isDark ? PALETTE.dark : PALETTE.light

  const hostRef = useRef<HTMLDivElement | null>(null)
  const [onScreen, setOnScreen] = useState(true)

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Stop burning GPU cycles once the hero has scrolled away.
  useEffect(() => {
    const host = hostRef.current
    if (!host || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { threshold: 0 },
    )

    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={hostRef} className={className} aria-hidden="true">
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 1 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
        frameloop={onScreen ? 'always' : 'never'}
      >
        <ParticleField
          colorA={colorA ?? palette.colorA}
          colorB={colorB ?? palette.colorB}
          colorHot={colorHot ?? palette.colorHot}
          gridColor={gridColor ?? palette.gridColor}
          motion={reduced ? 0 : 1}
          light={!isDark}
        />
      </Canvas>
    </div>
  )
}
