import Approach from './Approach'
import TextReveal from '../TextReveal'
import { ParallaxScrolling } from '../ui/parallax-scrolling'
import { company } from '../../data/site'

/** The parallax farm (with its tractor) handing over to the approach statement. */
export default function FarmScene() {
  return (
    <ParallaxScrolling
      title={
        <div className="px-5 text-center">
          <p className="eyebrow justify-center">Our promise</p>
          <TextReveal as="h2" inView text={company.promise} className="mt-4 font-serif text-[11vw] leading-[1] text-night sm:text-[7.5vw] lg:text-[6.2rem]" />
        </div>
      }
    >
      <Approach />
    </ParallaxScrolling>
  )
}
