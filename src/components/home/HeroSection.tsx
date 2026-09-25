import React from 'react'
import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiZap,
  FiCheckCircle,
  FiPlay,
  FiTrendingUp,
} from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import ImageWrapper from '../ImageWrapper'
import { SlantedScrollCard } from '../common/SlantedScrollCard'
import logoIcon from '../../assets/logos/logo-icon.svg'

export const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-primary-50/50 via-white to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* Background Ambient Brand Crimson Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-primary-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Brand Icon Watermark */}
      <img
        src={logoIcon}
        alt=""
        aria-hidden="true"
        className="absolute -top-10 -right-16 w-96 h-96 opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none -z-10"
      />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Friendly Welcome Pill */}
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white dark:bg-neutral-900 border border-primary-500/30 shadow-sm mb-6">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500" />
              </span>
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                Welcome to <span className="text-primary-600 dark:text-primary-400 font-bold">VerionX</span> • Learn, Build & Grow
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-neutral-950 dark:text-white tracking-tight leading-[1.06] mb-6">
              Learn practical skills. Build real things.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 via-primary-600 to-amber-500">
                Level up.
              </span>
            </h1>

            {/* Plain Everyday English Subheading */}
            <p className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl leading-relaxed mb-8">
              Pick up useful creative and tech skills, use smart software tools that save you time,
              and turn your ideas into real businesses. Along the way, you earn points, level up, and unlock rewards just like in a game.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              <a
                href="#pillars"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-primary-500 text-white font-semibold text-base shadow-xl shadow-primary-500/30 hover:bg-primary-600 hover:shadow-primary-500/40 active:scale-[0.98] transition-all"
              >
                <span>See How It Works</span>
                <FiArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#products"
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-xl bg-neutral-100 dark:bg-neutral-800/80 text-neutral-900 dark:text-neutral-100 font-medium text-base border border-neutral-200 dark:border-neutral-700/60 hover:border-primary-500/50 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all"
              >
                <span>Explore Our Apps & Tools</span>
                <FiZap className="w-4 h-4 text-primary-500" />
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-neutral-200/70 dark:border-neutral-800/70 grid grid-cols-3 gap-4 sm:gap-8 w-full">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  5 Pillars
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">To Learn & Build</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                  14 Live Apps
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">In Production</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                  100%
                </div>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">Practical & Rewarding</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Quest Hub Preview Card with 3D Slanted Elevation */}
          <div className="lg:col-span-5 relative">
            <SlantedScrollCard
              intensity="dramatic"
              direction="left"
              straightenOnScroll={true}
              hoverTilt={true}
            >
              {/* Interactive Card Container */}
              <div className="relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-6 sm:p-7 overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-500 before:via-primary-600 before:to-amber-500">
                {/* Card Header */}
                <div className="flex items-center justify-between pb-5 border-b border-neutral-100 dark:border-neutral-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold">
                      <img src={logoIcon} alt="VerionX Icon" className="w-6 h-6 object-contain" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-neutral-900 dark:text-white leading-tight">
                        Your Daily Ecosystem Quests
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        Explore tools, complete micro-actions & level up
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 px-2.5 py-1 rounded-full border border-primary-500/30">
                    Level 1 Explorer
                  </span>
                </div>

                {/* Shimmer-enabled Image Preview slot */}
                <div className="mt-5 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
                  <ImageWrapper
                    src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80"
                    alt="People collaborating on simple projects"
                    aspectRatio="16/9"
                    fallbackText="VerionX Community Hub"
                    className="shadow-inner"
                  />
                </div>

                {/* Daily Tasks List */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center space-x-2.5">
                      <FiCheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                        UloX: Build your first AI agent graph
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      +250 XP
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center space-x-2.5">
                      <FiZap className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                        RadX: Scan a cassava crop for disease
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                      +150 XP
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center space-x-2.5">
                      <FiTrendingUp className="w-4 h-4 text-primary-500" />
                      <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                        FinX: Run automated balance reconciliation
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                      +320 XP
                    </span>
                  </div>
                </div>

                {/* Card Footer Streak Counter */}
                <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <FaFire className="w-3.5 h-3.5" />
                    <span>Day 1 Streak Active</span>
                  </div>
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    Unlock Level 2 at 250 XP
                  </span>
                </div>
              </div>
            </SlantedScrollCard>

            {/* Floating Decorative XP Pill */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 p-3 sm:p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-primary-500/30 shadow-xl flex items-center space-x-3 z-30 animate-bounce duration-1000">
              <div className="w-8 h-8 rounded-lg bg-primary-500/10 text-primary-500 flex items-center justify-center">
                <FiPlay className="w-4 h-4 fill-current" />
              </div>
              <div>
                <div className="text-xs font-bold text-neutral-900 dark:text-white">Earn Points As You Go</div>
                <div className="text-[10px] text-primary-600 dark:text-primary-400 font-semibold">Finish simple tasks & unlock perks</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
