/// <reference types="vite/client" />

interface Window {
  /** Set by the inline loader in index.html once it has lifted. */
  __klIsDone?: boolean
  /** Report load progress (0..1) to the inline loader. */
  __klStage?: (progress: number) => void
  /** Tell the inline loader the first screen is ready. */
  __klFinish?: () => void
  /** Google Analytics (gtag.js), present once analytics has started. */
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}
