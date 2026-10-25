import { useEffect, useRef } from 'react'
import { cn } from '../../lib/utils'

// Port of designali-in's "Shader Animation" (21st.dev): concentric rings of light
// rippling outward, sliced by a diagonal modulo. The original drags in Three.js for
// one full-screen quad; this draws the same fragment shader with raw WebGL, so it
// costs a few KB instead of ~150 KB. The three colour channels the original renders
// as RGB are re-tinted into the Krishivam palette (lime, leaf, harvest gold).

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`

const FRAG = `
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 base;
uniform vec3 tintA;
uniform vec3 tintB;
uniform vec3 tintC;
uniform float intensity;
void main(void) {
  vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
  float t = time * 0.05;
  float lineWidth = 0.002;
  vec3 color = vec3(0.0);
  for (int j = 0; j < 3; j++) {
    for (int i = 0; i < 5; i++) {
      color[j] += lineWidth * float(i * i) / abs(fract(t - 0.01 * float(j) + float(i) * 0.01) * 5.0 - length(uv) + mod(uv.x + uv.y, 0.2));
    }
  }
  // Three tints summed would blow out to white; tone-map so the brightest
  // rings stay a soft glow and the dark ground keeps text legible.
  vec3 tinted = (color.r * tintA + color.g * tintB + color.b * tintC) * intensity;
  vec3 glow = 1.0 - exp(-tinted * 1.6);
  gl_FragColor = vec4(base + glow * (1.0 - base), 1.0);
}`

const DEFAULT_TINTS: [string, string, string] = ['#c5e86c', '#1b6b3a', '#1b6b3a']

const hex = (h: string) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255) as [number, number, number]

export interface ShaderAnimationProps {
  className?: string
  /** Background the rings glow over. */
  base?: string
  /** Tints for the shader's three ring channels. */
  tints?: [string, string, string]
  /** Render scale against device pixels; lower is cheaper. */
  quality?: number
  /** Overall glow strength. */
  intensity?: number
}

export function ShaderAnimation({ className, base = '#07130d', tints = DEFAULT_TINTS, quality = 0.75, intensity = 1.5 }: ShaderAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(prog, 'resolution')
    const uTime = gl.getUniformLocation(prog, 'time')
    gl.uniform3fv(gl.getUniformLocation(prog, 'base'), hex(base))
    gl.uniform3fv(gl.getUniformLocation(prog, 'tintA'), hex(tints[0]))
    gl.uniform3fv(gl.getUniformLocation(prog, 'tintB'), hex(tints[1]))
    gl.uniform3fv(gl.getUniformLocation(prog, 'tintC'), hex(tints[2]))
    gl.uniform1f(gl.getUniformLocation(prog, 'intensity'), intensity)

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * quality
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // The original advanced time by 0.05 a frame; this keeps that speed at 60fps
    // but ties it to the clock, so slow devices don't slow the ripple down.
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0
    let visible = true
    const start = performance.now()
    const draw = (now: number) => {
      gl.uniform1f(uTime, 2 + ((now - start) / 1000) * 3)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!reduced && visible) frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    // Stop drawing whenever the canvas is off screen or the tab is hidden.
    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting && !document.hidden
      if (visible && !was && !reduced) frame = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    const onVis = () => {
      const was = visible
      visible = !document.hidden && canvas.getBoundingClientRect().bottom > 0
      if (visible && !was && !reduced) frame = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      // Free the GL objects but keep the context: the same canvas may be set up
      // again straight away (prop change, StrictMode), and a lost context can't be reused.
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, tints.join(), quality, intensity])

  return <canvas ref={canvasRef} aria-hidden="true" className={cn('block h-full w-full', className)} />
}

export default ShaderAnimation
