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
      'Build a working version of your product, set up easy online sales with BuzX, and get your first 100 paying customers without wrestling with complex software.',
    deliverables: [
      'Launch your simple, working product',
      'Set up easy customer messages & payment tools',
      'Collect feedback and make quick improvements',
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
    metricSub: 'Live Invoicing & Payments Active',
    icon: FiZap,
    ctaText: 'Build & Launch Your Venture',
  },
  {
    number: '03',
    name: 'Grow Big & Find Grants',
    tagline: 'Funding & Global Scale',
    division: 'Growth Stage: Expansion Phase',
    headline: 'Discover startup grants, hire help, and reach new markets.',
    description:
      'Scale your sales, apply for small business grants with GrantX, hire help, and reach thousands of new customers with continuous mentor guidance.',
    deliverables: [
      'Apply for non-repayable grants & funding',
      'Build a small team and automate daily tasks',
      'Expand into new online markets and locations',
    ],
    imageUrl:
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Diverse startup founders celebrating expansion milestone',
    accentColor: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    badgeColor: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    glowColor: 'rgba(16, 185, 129, 0.22)',
    metricLabel: 'Funding Opportunities',
    metricValue: '$150k+ Match Radar',
    metricSub: 'Grant Programs & Regional Subsidies',
    icon: FiDollarSign,
    ctaText: 'Scale & Find Grants',
  },
]

export const VenturesRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeStageIdx, setActiveStageIdx] = useState(0)
  const [sliceProgress, setSliceProgress] = useState(0)

  // Scroll tracking across the 3 stages
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Synchronize nav visibility and active stage calculations
  const updateNavAndStage = useCallback((latestProgress: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const isPinned = rect.top <= 10 && rect.bottom >= window.innerHeight - 10
      window.dispatchEvent(
        new CustomEvent('verionx:nav-visibility', { detail: { hidden: isPinned } })
      )
    }

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
      updateNavAndStage(latest)
    })

    const handleWindowScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const isPinned = rect.top <= 10 && rect.bottom >= window.innerHeight - 10
        window.dispatchEvent(
          new CustomEvent('verionx:nav-visibility', { detail: { hidden: isPinned } })
        )
      }
    }

    window.addEventListener('scroll', handleWindowScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleWindowScroll)
      window.dispatchEvent(
        new CustomEvent('verionx:nav-visibility', { detail: { hidden: false } })
      )
      unsubscribe()
    }
  }, [scrollYProgress, updateNavAndStage])

  // Click on stage pills to glide smoothly to that stage
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
            From a raw thought in your head to a real, profitable company. Scroll down to follow our
            3 simple, proven stages.
          </p>
        </div>
      </div>

      {/* 2. Scroll-Hijacking Pinned Presentation Container */}
      <div
        ref={containerRef}
        className="relative"
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

