import { Link, useParams } from "react-router-dom";
import { ArrowUpRight, Check, FileText, Package, Sprout } from "lucide-react";
import { motion } from "framer-motion";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import { products } from "../data/site";
import NotFound from "./NotFound";
export default function Product() {
  const { categorySlug, productSlug } = useParams();
  const p = products.find(
    (x) => x.categorySlug === categorySlug && x.slug === productSlug,
  );
  if (!p) return <NotFound />;
  return (
    <>
      <section className="relative overflow-hidden bg-ink pt-36 pb-20 text-white">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_60%_40%,rgba(75,141,44,.38),transparent_40%)]" />
        <div className="container-page relative grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <Reveal>
            <p className="eyebrow !text-[#82b85b]">{p.category}</p>
            <h1 className="mt-4 font-display text-7xl font-semibold leading-[.85] sm:text-8xl">
              {p.name}
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              {p.positioning}
            </p>
          </Reveal>
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto grid aspect-square w-full max-w-[420px] place-items-center rounded-[3rem] border border-white/10 bg-white/[.035]"
          >
            <div className="absolute h-56 w-56 rounded-full border border-white/10" />
            <div className="absolute h-36 w-36 rounded-full border border-[#82b85b]/30" />
            <Sprout size={90} strokeWidth={0.8} className="text-[#82b85b]" />
          </motion.div>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container-page grid gap-16 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow">Product overview</p>
            <h2 className="section-title">
              A clear foundation for the product story.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div>
              <p className="text-lg leading-8 text-ink/65">
                [Add product description]
              </p>
              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {[
                  "Advanced formulation",
                  "Easy application",
                  "Modern crop nutrition",
                  "Designed for agricultural use",
                ].map((x) => (
                  <div
                    key={x}
                    className="flex items-center gap-3 rounded-2xl bg-mist p-5"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-forest">
                      <Check size={15} />
                    </span>
                    <span className="text-sm font-semibold">{x}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-[#edf1eb] py-20 lg:py-28">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow">Product information</p>
            <h2 className="section-title">
              Specifications, ready to complete.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                label: "Composition",
                value: "[Add composition]",
                icon: FileText,
              },
              {
                label: "Formulation",
                value: "[Add formulation]",
                icon: Sprout,
              },
              {
                label: "Recommended crops",
                value: "[Add recommended crops]",
                icon: Sprout,
              },
              {
                label: "Application method",
                value: "[Add application details]",
                icon: Sprout,
              },
              {
                label: "Dosage",
                value: "[Add dosage/application details]",
                icon: FileText,
              },
              {
                label: "Packaging",
                value: "[Add packaging information]",
                icon: Package,
              },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-2xl border border-ink/10 bg-white p-6"
              >
                <Icon size={19} className="text-forest" />

                <p className="mt-8 text-xs font-bold uppercase tracking-[.16em] text-ink/35">
                  {label}
                </p>

                <p className="mt-2 text-sm font-semibold text-ink/70">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-28">
        <div className="container-page rounded-[2.5rem] bg-forest p-8 text-white sm:p-12 lg:p-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow !text-[#a9d18b]">
                Interested in this product?
              </p>
              <h2 className="mt-3 font-display text-5xl font-semibold leading-none sm:text-6xl">
                Let’s talk about {p.name}.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                className="btn-primary !bg-white !text-forest"
                to="/contact"
              >
                Enquire Now <ArrowUpRight size={15} />
              </Link>
              <Link
                className="btn-secondary !border-white/20 !bg-transparent !text-white"
                to="/contact"
              >
                Contact Krishivam
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
