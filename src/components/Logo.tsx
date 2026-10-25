import logo from '../assets/logo.svg'
import logoLight from '../assets/logo-light.svg'
import { cn } from '../lib/utils'

export default function Logo({ light = false, className }: { light?: boolean; className?: string }) {
  return <img src={light ? logoLight : logo} alt="Krishivam Agriscience Private Limited" width={2060} height={1074} className={cn('h-12 w-auto object-contain', className)} />
}
