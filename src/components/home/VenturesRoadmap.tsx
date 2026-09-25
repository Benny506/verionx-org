import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiTrendingUp,
  FiCheckCircle,
  FiArrowRight,
  FiCompass,
  FiZap,
  FiDollarSign,
  FiAward,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { ImageWrapper } from '../ImageWrapper'
import { scrollToTarget } from '../layout/SmoothScroll'

interface Stage {
  number: string
  name: string
  tagline: string
  division: string
  headline: string
  description: string
  deliverables: string[]
  imageUrl: string
  imageAlt: string
  accentColor: string
  accentBg: string
  badgeColor: string
  glowColor: string
  metricLabel: string
  metricValue: string
  metricSub: string
  icon: React.ComponentType<{ className?: string }>
  ctaText: string
}

const STAGES: Stage[] = [
  {
    number: '01',
    name: 'Brainstorm & Test',
    tagline: 'Idea Validation Sprint',
    division: 'Early Stage: Idea Phase',
    headline: 'Test your idea with real people in days, not months.',
    description:
      'Talk to real people, see what they need, and create a simple blueprint before spending lots of time or money.',
    deliverables: [
      'Find out what customers really care about',
      'Design a simple offer and clear pricing',
      'Create your first sample or prototype sketch',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Design sprint team brainstorming with blueprints and notes',
    accentColor: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    badgeColor: 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-500/30',
    glowColor: 'rgba(245, 158, 11, 0.22)',
    metricLabel: 'Concept Validation Score',
    metricValue: '96% High Demand',
    metricSub: '12 Customer Interviews Completed',
    icon: FiCompass,
    ctaText: 'Start With Brainstorming',
  },
  {
    number: '02',
    name: 'Build & Launch',
    tagline: 'Rapid Execution & Setup',
    division: 'Early Stage: Launch Phase',
    headline: 'Build a working product and get your first 100 paying customers.',
    description:
      'Build a working version of your product, set up instant online digital storefronts with MarketX, stress-test your unit margins with BuzX, and start collecting revenue seamlessly.',
    deliverables: [
      'Launch your digital storefront with MarketX',
      'Test revenue scenarios and send invoices with BuzX',
      'Collect user feedback and make rapid improvements',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Digital creator setting up digital product and launchpad',
    accentColor: 'text-primary-500',
    accentBg: 'bg-primary-500/10',
    badgeColor: 'bg-primary-50 dark:bg-primary-950/60 text-primary-600 dark:text-primary-400 border-primary-500/30',
    glowColor: 'rgba(235, 28, 37, 0.22)',
    metricLabel: 'Early Adopter Momentum',
    metricValue: '100+ First Users',
    metricSub: 'Live Invoicing & MarketX Checkout Active',
    icon: FiZap,
    ctaText: 'Build & Launch Your Venture',
  },
  {
    number: '03',
    name: 'Grow Big & Find Grants',
    tagline: 'Funding & Global Scale',
    division: 'Growth Stage: Expansion Phase',
    headline: 'Discover non-repayable startup grants and automate finance operations.',
    description:
      'Scale your sales, apply for non-dilutive startup grants with GrantX, automate ledger reconciliations with FinX, and expand into global markets.',
    deliverables: [
      'Apply for non-repayable grants & funding via GrantX',
      'Automate monthly close and compliance via FinX',
      'Expand into new international online markets',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Business analytics metrics and revenue scale graph',
    accentColor: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.22)',
    metricLabel: 'Capital & Close Multiplier',
    metricValue: '$50,000+ Matched Grants',
    metricSub: 'FinX Automated SOX Compliance',
    icon: FiDollarSign,
    ctaText: 'Discover Grants & Scaling',
  },
]

export const VenturesRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const [activeStageIdx, setActiveStageIdx] = useState(0)
  const [sliceProgress, setSliceProgress] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  // Calibrated scroll height: 60vh per stage (~180vh total)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Synchronize stage calculation based on scroll progression on desktop
  const updateStage = useCallback((latestProgress: number) => {
    if (window.innerWidth < 1024) return
    const total = STAGES.length
    const step = 1 / total
    const clampedProgress = Math.max(0, Math.min(0.9999, latestProgress))
    const idx = Math.min(Math.floor(clampedProgress / step), total - 1)
    setActiveStageIdx(idx)

    const localProg = (clampedProgress - idx * step) / step
    setSliceProgress(Math.max(0, Math.min(1, localProg)))
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      updateStage(latest)
    })
    return () => unsubscribe()
  }, [scrollYProgress, updateStage])

  // Precise scrolling on desktop stage pill click
  const handleStageClick = (sIdx: number) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    const containerTop = containerRect.top + currentScrollY
    const containerHeight = containerRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const maxScroll = Math.max(0, containerHeight - viewportHeight)

    const step = 1 / STAGES.length
    const targetProgress = (sIdx + 0.5) * step
    const targetY = containerTop + targetProgress * maxScroll

    scrollToTarget(targetY)
  }

  // Mobile horizontal carousel scroll listener & smooth navigation
  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return
    const el = mobileCarouselRef.current
    const card = el.firstElementChild as HTMLElement | null
    if (!card) return
    const cardWidth = card.offsetWidth + 16
    const scrollLeft = el.scrollLeft
    const newIdx = Math.round(scrollLeft / cardWidth)
    setMobileActiveIndex(Math.max(0, Math.min(STAGES.length - 1, newIdx)))
  }

  const scrollMobileTo = (idx: number) => {
    if (!mobileCarouselRef.current) return
    const el = mobileCarouselRef.current
    const card = el.firstElementChild as HTMLElement | null
    if (!card) return
    const cardWidth = card.offsetWidth + 16
    el.scrollTo({ left: idx * cardWidth, behavior: 'smooth' })
    setMobileActiveIndex(idx)
  }

  const activeStage = STAGES[activeStageIdx] || STAGES[0]
  const Icon = activeStage.icon

  return (
    <section id="ventures" className="relative bg-neutral-50 dark:bg-neutral-900/70">
      {/* 1. Top Section Header */}
      <div className="pt-24 pb-12 w-full px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-200/60 dark:border-neutral-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <FiTrendingUp className="w-3.5 h-3.5" />
            <span>Startup Launchpad</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            How We Help You Build Your Business
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
            From a raw thought in your head to a real, profitable company. Explore our 3 simple,
            proven stages.
          </p>
        </div>
      </div>

      {/* 2. Mobile Horizontal Gesture Snap Carousel (Apple / Stripe Mobile Pattern) */}
      <div className="block lg:hidden py-8">
        {/* Swipe Track */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 pb-4 scrollbar-none scroll-smooth"
        >
          {STAGES.map((stg, sIdx) => {
            const StageIcon = stg.icon
            return (
              <div
                key={stg.number}
                className="w-[88vw] sm:w-[75vw] max-w-[380px] shrink-0 snap-center rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden flex flex-col justify-between"
              >
                {/* Visual Header Image */}
                <div className="relative w-full h-44 overflow-hidden">
                  <ImageWrapper
                    src={stg.imageUrl}
                    alt={stg.imageAlt}
                    className="w-full h-full object-cover"
                    imgClassName="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

                  {/* Top Badge Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider">
                      Phase {stg.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                      {stg.tagline}
                    </span>
                  </div>

                  {/* Bottom Metric Tag */}
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-white/40 dark:border-neutral-700/60 shadow flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-7 h-7 rounded-lg ${stg.accentBg} ${stg.accentColor} flex items-center justify-center font-bold`}
                      >
                        <StageIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="text-xs font-extrabold text-neutral-900 dark:text-white">
                        {stg.metricValue}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      Verified
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${stg.badgeColor}`}>
                        {stg.division}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-400">
                        Stage {sIdx + 1} of 3
                      </span>
                    </div>

                    <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white mb-1.5">
                      {stg.name}
                    </h3>
                    <h4 className="text-xs font-bold text-neutral-700 dark:text-neutral-200 mb-2 leading-snug">
                      {stg.headline}
                    </h4>
                    <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4">
                      {stg.description}
                    </p>

                    {/* Deliverables */}
                    <div className="space-y-1.5 mb-4">
                      {stg.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2 text-[11px] font-medium text-neutral-700 dark:text-neutral-300">
                          <FiCheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card CTA */}
                  <a
                    href="/contact"
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-primary-500/25 active:scale-[0.98] transition-all"
                  >
                    <span>{stg.ctaText}</span>
                    <FiArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Carousel Indicators & Controls */}
        <div className="px-4 mt-4 flex items-center justify-between">
          <button
            onClick={() => scrollMobileTo(Math.max(0, mobileActiveIndex - 1))}
            disabled={mobileActiveIndex === 0}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Previous stage"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-2">
            {STAGES.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollMobileTo(dotIdx)}
                aria-label={`Jump to stage ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === mobileActiveIndex
                    ? 'w-7 bg-primary-500'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollMobileTo(Math.min(STAGES.length - 1, mobileActiveIndex + 1))}
            disabled={mobileActiveIndex === STAGES.length - 1}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next stage"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Desktop Scroll-Hijacking Pinned Presentation Container (hidden on mobile, full cinematic scroll on lg:) */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${STAGES.length * 60}vh` }}
      >
        {/* Sticky Pinned Viewport */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-gradient-to-b from-neutral-50/80 via-white to-neutral-50/80 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          {/* Ambient Glow Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10"
            style={{ backgroundColor: activeStage.glowColor }}
          />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              {/* Left Column: Stage Details & Action */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStage.number}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    {/* Stage Number & Division Pill */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl sm:text-4xl font-black text-neutral-300 dark:text-neutral-700 font-mono">
                        {activeStage.number}
                      </span>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${activeStage.badgeColor}`}
                      >
                        {activeStage.division}
                      </span>
                    </div>

                    {/* Stage Title */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${activeStage.accentBg} ${activeStage.accentColor} flex items-center justify-center font-bold shadow-sm transition-transform duration-300`}
                        style={{ transform: `scale(${1 + sliceProgress * 0.08})` }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white">
                        {activeStage.name}
                      </h3>
                    </div>

                    {/* Headline */}
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 leading-snug">
                      {activeStage.headline}
                    </h4>

                    {/* Plain English Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                      {activeStage.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2.5 mb-8">
                      {activeStage.deliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2.5">
                          <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Single Clean CTA */}
                    <div>
                      <a
                        href="/contact"
                        className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm shadow-xl shadow-primary-500/30 active:scale-[0.98] transition-all"
                      >
                        <span>{activeStage.ctaText}</span>
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Vivid Photography with Live Telemetry Overlays */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="w-full max-w-lg aspect-[4/3] sm:aspect-square rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-4 sm:p-6 flex flex-col justify-between items-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage.number}
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="w-full h-full flex flex-col justify-between relative rounded-2xl overflow-hidden"
                    >
                      {/* Curated High-Res Unsplash Image with Shimmer Loading & Parallax Scale */}
                      <div className="relative w-full h-full rounded-2xl overflow-hidden">
                        <div
                          className="w-full h-full transition-transform duration-100 ease-out"
                          style={{
                            transform: `scale(${1.02 + sliceProgress * 0.08}) translateY(${
                              (sliceProgress - 0.5) * -12
                            }px)`,
                          }}
                        >
                          <ImageWrapper
                            src={activeStage.imageUrl}
                            alt={activeStage.imageAlt}
                            className="w-full h-full object-cover"
                            imgClassName="w-full h-full object-cover"
                            rounded="rounded-2xl"
                          />
                        </div>

                        {/* Subtle Dark Gradient Overlay for Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none rounded-2xl" />

                        {/* Top Badge Overlay */}
                        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-white uppercase tracking-wider flex items-center space-x-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Stage {activeStage.number} in Action</span>
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white">
                            {activeStage.tagline}
                          </span>
                        </div>

                        {/* Bottom Glassmorphic Telemetry Card */}
                        <div className="absolute bottom-3 left-3 right-3 p-3 sm:p-4 rounded-xl bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border border-white/40 dark:border-neutral-700/60 shadow-xl flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-10 h-10 rounded-xl ${activeStage.accentBg} ${activeStage.accentColor} flex items-center justify-center font-bold shrink-0 shadow-sm`}
                            >
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="text-[10px] font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                                {activeStage.metricLabel}
                              </div>
                              <div className="text-xs sm:text-sm font-extrabold text-neutral-900 dark:text-white">
                                {activeStage.metricValue}
                              </div>
                            </div>
                          </div>
                          <div className="hidden sm:flex items-center space-x-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/20">
                            <FiAward className="w-3.5 h-3.5" />
                            <span>Verified</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Stepper Pills */}
            <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2">
              {STAGES.map((stg, sIdx) => (
                <button
                  key={stg.number}
                  onClick={() => handleStageClick(sIdx)}
                  type="button"
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 select-none ${
                    sIdx === activeStageIdx
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span>
                    {stg.number}. {stg.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VenturesRoadmap

