/** Category cards alternate between two light surfaces only: white, then cream. */
export const cardSurface = (index: number) => (index % 2 === 0 ? 'bg-white text-night border-night/10' : 'bg-cream text-night border-night/10')
