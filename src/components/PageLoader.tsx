/** Shown in the rare moment a page's code is still on its way: a small sprout, not a blank screen. */
export default function PageLoader() {
  return (
    <div className="grid min-h-[100svh] place-items-center bg-night" role="status" aria-label="Loading page">
      <svg viewBox="0 0 60 80" className="h-16 w-12" aria-hidden="true">
        <path d="M30 72 C29 60 31 50 30 38 C29 30 30 24 30 18" fill="none" stroke="#c5e86c" strokeWidth="2.6" strokeLinecap="round" pathLength={1} className="animate-[sprout_1.6s_ease-in-out_infinite] [stroke-dasharray:1]" />
        <path d="M30 46 C24 38 14 37 8 42 C15 48 25 49 30 46Z" fill="#1b6b3a" className="origin-[30px_46px] animate-[leaf_1.6s_ease-in-out_infinite]" />
        <path d="M30 34 C36 26 46 25 52 30 C45 36 35 37 30 34Z" fill="#c5e86c" className="origin-[30px_34px] animate-[leaf_1.6s_ease-in-out_.2s_infinite]" />
        <path d="M12 73 C24 71 36 71 48 73" fill="none" stroke="#ebe4d2" strokeOpacity=".4" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}
