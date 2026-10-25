import { useEffect, useState } from 'react'

/** True once the first-paint loader has lifted (or was never on the page). */
export const loaderDone = () => window.__klIsDone === true || !document.getElementById('kl')

/**
 * True once the loader has lifted. `after` (ms) waits a little longer, so an
 * entrance plays on a screen the sliding loader has already uncovered.
 */
export function useLoaderDone(after = 0) {
  const [done, setDone] = useState(loaderDone)
  useEffect(() => {
    if (done) return
    let timer = 0
    const on = () => { timer = window.setTimeout(() => setDone(true), after) }
    window.addEventListener('kl:done', on, { once: true })
    return () => { window.removeEventListener('kl:done', on); window.clearTimeout(timer) }
  }, [done, after])
  return done
}
