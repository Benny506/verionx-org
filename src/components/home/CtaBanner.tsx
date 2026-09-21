import React from 'react'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { SlantedScrollCard } from '../common/SlantedScrollCard'

export const CtaBanner: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950 text-white relative overflow-hidden">
      {/* Radiant Mesh Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-600/30 via-neutral-950 to-neutral-950 -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <SlantedScrollCard
          intensity="moderate"
          direction="center"
          straightenOnScroll={false}
          hoverTilt={false}
          className="max-w-6xl mx-auto"
        >
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 backdrop-blur-xl p-8 sm:p-14 text-center w-full shadow-2xl relative overflow-hidden">
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-400 text-xs font-bold uppercase tracking-wider mb-6 border border-primary-500/20">
              <span>Get Started in Seconds</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
              Ready to learn something new and{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-primary-500 to-amber-400">
                level up
              </span>
              ?
            </h2>

            <p className="text-base sm:text-lg text-neutral-200 max-w-2xl mx-auto mb-10 leading-relaxed">
              Join the VerionX community today. Test out our friendly software apps, practice real-world
              skills in 5 minutes a day, and turn your business ideas into reality.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#pillars"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-primary-500 text-white font-medium text-base shadow-xl shadow-primary-500/30 hover:bg-primary-600 active:scale-[0.98] transition-all"
              >
                <span>Get Started for Free</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-neutral-800 text-neutral-200 font-medium text-base border border-neutral-700 hover:bg-neutral-700 transition-all"
              >
                <span>Say Hello to Our Team</span>
              </a>
            </div>

            {/* Value Badges */}
            <div className="mt-10 pt-8 border-t border-neutral-800/80 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="text-primary-500" />
                <span>100% Free to Try</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="text-primary-500" />
                <span>Short 5-Minute Lessons</span>
              </div>
              <div className="flex items-center space-x-2">
                <FiCheckCircle className="text-primary-500" />
                <span>Helpful Founder Community</span>
              </div>
            </div>
          </div>
        </SlantedScrollCard>
      </div>
    </section>
  )
}

export default CtaBanner
