import { useEffect, useState } from 'react'

/** True once the first-paint loader has lifted (or was never on the page). */
export const loaderDone = () => window.__klIsDone === true || !document.getElementById('kl')

export function useLoaderDone() {
  const [done, setDone] = useState(loaderDone)
  useEffect(() => {
    if (done) return
    const on = () => setDone(true)
    window.addEventListener('kl:done', on)
    return () => window.removeEventListener('kl:done', on)
  }, [done])
  return done
}
