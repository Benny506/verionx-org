import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiZap,
  FiGrid,
  FiHome,
  FiActivity,
  FiShoppingBag,
  FiDollarSign,
  FiArrowRight,
  FiShield,
  FiAward,
  FiCheckCircle,
  FiTrendingUp,
  FiTarget,
  FiCompass,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'
import { scrollToTarget } from '../layout/SmoothScroll'

interface ProductDetail {
  id: string
  name: string
  tagline: string
  headline: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  color: string
  accentBg: string
  glowColor: string
  gamificationNote: string
  gamificationBadge: string
  ctaText: string
  ctaHref: string
}

const PRODUCTS: ProductDetail[] = [
  {
    id: 'ulo',
    name: 'ULO & ULOX',
    tagline: 'Quick Daily Task Helper',
    headline: 'Finish everyday tasks in fewer clicks with smart speed boosters.',
    description:
      'ULO takes repetitive daily chores off your plate. Whether organizing files, batching actions, or speeding through daily tasks, it helps you work faster while rewarding your consistency.',
    icon: FiZap,
    badge: 'Daily Utilities',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    glowColor: 'rgba(245, 158, 11, 0.22)',
    gamificationNote: 'Built-in 2.5x Speed Multiplier • Earn +150 Focus Points on completion',
    gamificationBadge: 'Productivity Streak ⚡',
    ctaText: 'Learn More About ULO',
    ctaHref: '/contact',
  },
  {
    id: 'matrix',
    name: 'MatriX',
    tagline: 'Your Central Home Base',
    headline: 'The single workspace where your apps, tools, and projects live.',
    description:
      'No more jumping between ten different tabs. MatriX connects your files, customer data, and daily to-do lists into one clean, interconnected workspace.',
    icon: FiGrid,
    badge: 'Main Workplace',
    color: 'text-violet-500',
    accentBg: 'bg-violet-500/10',
    glowColor: 'rgba(139, 92, 246, 0.22)',
    gamificationNote: 'Synced Workspaces Hub • Unlock Master Navigator Level 3 Badge',
    gamificationBadge: 'Workspace Mastery 🧩',
    ctaText: 'Learn More About MatriX',
    ctaHref: '/contact',
  },
  {
    id: 'casax',
    name: 'CasaX',
    tagline: 'Living & Property Manager',
    headline: 'Keep your homes, rental spaces, and belongings organized and safe.',
    description:
      'Manage physical spaces, track property upkeep, coordinate rental details, and log valuable assets with zero clutter or confusing spreadsheets.',
    icon: FiHome,
    badge: 'Home & Assets',
    color: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    glowColor: 'rgba(16, 185, 129, 0.22)',
    gamificationNote: 'Asset Guardian Protocol • Milestone Rewards for Portfolio Health',
    gamificationBadge: 'Asset Shield 🛡️',
    ctaText: 'Learn More About CasaX',
    ctaHref: '/contact',
  },
  {
    id: 'buzx',
    name: 'BuzX',
    tagline: 'Sales & Customer Helper',
    headline: 'Close deals, send clean invoices, and chat with customers easily.',
    description:
      'BuzX helps you run your business smoothly. Track interested customers, automate order follow-ups, and get paid faster without wrestling with complex software.',
    icon: FiActivity,
    badge: 'Business Helper',
    color: 'text-cyan-500',
    accentBg: 'bg-cyan-500/10',
    glowColor: 'rgba(6, 182, 212, 0.22)',
    gamificationNote: 'Founder Milestone Tracker • Double XP on First 10 Invoices',
    gamificationBadge: 'Deal Closer 💼',
    ctaText: 'Learn More About BuzX',
    ctaHref: '/contact',
  },
  {
    id: 'marketx',
    name: 'MarketX',
    tagline: 'Store & Catalog Creator',
    headline: 'Put your products online and start selling in under 10 minutes.',
    description:
      'Set up a simple, beautiful online store, manage inventory effortlessly, and accept payments from anywhere in the world.',
    icon: FiShoppingBag,
    badge: 'Online Commerce',
    color: 'text-primary-500',
    accentBg: 'bg-primary-500/10',
    glowColor: 'rgba(235, 28, 37, 0.22)',
    gamificationNote: 'Storefront Leveler • Bonus Theme Unlocks at 50 Sales',
    gamificationBadge: 'Merchant Master 🛍️',
    ctaText: 'Learn More About MarketX',
    ctaHref: '/contact',
  },
  {
    id: 'grantx',
    name: 'GrantX',
    tagline: 'Non-Repayable Funding Finder',
    headline: 'Match with government grants and prizes that never have to be repaid.',
    description:
      'Stop missing out on free money for your business. GrantX searches verified government and private grants matching your specific industry and stage.',
    icon: FiDollarSign,
    badge: 'Capital & Grants',
    color: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    glowColor: 'rgba(16, 185, 129, 0.22)',
    gamificationNote: 'Grant Application Checklist • XP Rewards on Every Verified Submission',
    gamificationBadge: 'Grant Master 🎯',
    ctaText: 'Learn More About GrantX',
    ctaHref: '/contact',
  },
]

export const ProductsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliceProgress, setSliceProgress] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  // Generous scroll height: 65vh per product (~390vh total) to let animations breathe naturally
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Synchronize nav visibility and active product calculations on desktop
  const updateNavAndProduct = useCallback((latestProgress: number) => {
    if (window.innerWidth < 1024) return

    // Determine if pinned sticky viewport is actively hijacked
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const isPinned = rect.top <= 10 && rect.bottom >= window.innerHeight - 10
      window.dispatchEvent(
        new CustomEvent('verionx:nav-visibility', { detail: { hidden: isPinned } })
      )
    } else {
      const isInside = latestProgress > 0.01 && latestProgress < 0.99
      window.dispatchEvent(
        new CustomEvent('verionx:nav-visibility', { detail: { hidden: isInside } })
      )
    }

    // Calculate active product index & continuous within-slice progress
    const total = PRODUCTS.length
    const step = 1 / total
    const clampedProgress = Math.max(0, Math.min(0.9999, latestProgress))
    const idx = Math.min(Math.floor(clampedProgress / step), total - 1)
    setActiveIndex(idx)

    const localProg = (clampedProgress - idx * step) / step
    setSliceProgress(Math.max(0, Math.min(1, localProg)))
  }, [])

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      updateNavAndProduct(latest)
    })

    // Also listen to window scroll to catch entry/exit boundaries immediately
    const handleWindowScroll = () => {
      if (window.innerWidth < 1024) return
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
  }, [scrollYProgress, updateNavAndProduct])

  // Precise scrolling on desktop pill click: moves smoothly to target product center
  const handlePillClick = (pIdx: number) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    const containerTop = containerRect.top + currentScrollY
    const containerHeight = containerRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const maxScroll = Math.max(0, containerHeight - viewportHeight)

    const step = 1 / PRODUCTS.length
    // Center scroll target right inside the target product's active window
    const targetProgress = (pIdx + 0.5) * step
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
    setMobileActiveIndex(Math.max(0, Math.min(PRODUCTS.length - 1, newIdx)))
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

  const activeProduct = PRODUCTS[activeIndex] || PRODUCTS[0]
  const Icon = activeProduct.icon

  return (
    <section id="products" className="relative bg-white dark:bg-neutral-950">
      {/* 1. Top Section Header */}
      <div className="pt-24 pb-12 w-full px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <FiZap className="w-3.5 h-3.5" />
            <span>The Suite of X Apps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Helpful Software Tools Built for Everyday Life & Work
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
            Explore our family of connected apps. Each tool solves a real task, makes work effortless,
            and rewards your daily progress.
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
          {PRODUCTS.map((prod, pIdx) => {
            const ProdIcon = prod.icon
            return (
              <div
                key={prod.id}
                className="w-[86vw] sm:w-[75vw] max-w-[380px] shrink-0 snap-center rounded-3xl bg-neutral-50/80 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Top Status */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-2.5 py-1 rounded-full border border-primary-500/20">
                      {prod.badge}
                    </span>
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      {pIdx + 1} of {PRODUCTS.length}
                    </span>
                  </div>

                  {/* App Name & Icon */}
                  <div className="flex items-center space-x-3 mb-2.5">
                    <div
                      className={`w-11 h-11 rounded-2xl ${prod.accentBg} ${prod.color} flex items-center justify-center font-bold shadow-sm`}
                    >
                      <ProdIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-neutral-900 dark:text-white">
                        {prod.name}
                      </h3>
                      <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                        {prod.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Headline */}
                  <h4 className="text-sm font-bold text-neutral-800 dark:text-neutral-100 mb-2 leading-snug">
                    {prod.headline}
                  </h4>

                  {/* Description */}
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                    {prod.description}
                  </p>

                  {/* Live Visual Feature Card */}
                  <div className="w-full h-40 rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 p-4 flex flex-col justify-center items-center relative overflow-hidden mb-4 shadow-sm">
                    {prod.id === 'ulo' && (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-amber-500/10 border-2 border-amber-500/30 flex flex-col items-center justify-center shadow-md mb-2">
                          <FiZap className="w-6 h-6 text-amber-500" />
                          <span className="text-sm font-black text-neutral-900 dark:text-white font-mono">
                            3.5x
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-amber-600 uppercase">
                          Speed Booster Active
                        </span>
                      </div>
                    )}

                    {prod.id === 'matrix' && (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-14 h-14 rounded-xl bg-violet-600 text-white flex flex-col items-center justify-center shadow-lg">
                          <FiGrid className="w-5 h-5 mb-0.5" />
                          <span className="text-[8px] font-bold">MatriX</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] font-bold">
                          <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                            ✓ Synced Tasks
                          </div>
                          <div className="px-2 py-0.5 rounded-md bg-violet-500/10 text-violet-600 border border-violet-500/20">
                            ✓ Clean Files
                          </div>
                        </div>
                      </div>
                    )}

                    {prod.id === 'casax' && (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mb-1.5">
                          <FiShield className="w-7 h-7 text-emerald-500" />
                        </div>
                        <span className="text-[11px] font-bold text-emerald-600">
                          100% Assets Protected
                        </span>
                      </div>
                    )}

                    {prod.id === 'buzx' && (
                      <div className="w-full flex flex-col items-center">
                        <div className="flex items-end justify-center space-x-2 h-16 mb-2">
                          <div className="w-4 h-6 rounded-t bg-cyan-500/30" />
                          <div className="w-4 h-9 rounded-t bg-cyan-500/50" />
                          <div className="w-4 h-12 rounded-t bg-cyan-500/70" />
                          <div className="w-4 h-15 rounded-t bg-cyan-500 shadow" />
                        </div>
                        <span className="text-[10px] font-bold text-cyan-600">
                          +42% Revenue Growth
                        </span>
                      </div>
                    )}

                    {prod.id === 'marketx' && (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-14 h-14 rounded-2xl bg-primary-500/10 border border-primary-500/30 text-primary-500 flex items-center justify-center shadow-md mb-1.5">
                          <FiShoppingBag className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-primary-600">
                          Instant Global Checkout
                        </span>
                      </div>
                    )}

                    {prod.id === 'grantx' && (
                      <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 flex items-center justify-center shadow-md mb-1.5">
                          <FiDollarSign className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600">
                          $50,000 Matched Grant
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Gamification Perk Badge */}
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 font-medium flex items-center space-x-2">
                    <FiAward className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{prod.gamificationBadge}</span>
                  </div>
                </div>

                {/* Card CTA */}
                <a
                  href={prod.ctaHref}
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-primary-500/25 active:scale-[0.98] transition-all"
                >
                  <span>{prod.ctaText}</span>
                  <FiArrowRight className="w-3.5 h-3.5" />
                </a>
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
            aria-label="Previous app"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center space-x-2">
            {PRODUCTS.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollMobileTo(dotIdx)}
                aria-label={`Jump to app ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  dotIdx === mobileActiveIndex
                    ? 'w-7 bg-primary-500'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollMobileTo(Math.min(PRODUCTS.length - 1, mobileActiveIndex + 1))}
            disabled={mobileActiveIndex === PRODUCTS.length - 1}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next app"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Desktop Scroll-Hijacking Pinned Container (hidden on mobile, full cinematic scroll on lg:) */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${PRODUCTS.length * 65}vh` }}
      >
        {/* Sticky Pinned Full-Screen Viewport Container */}
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-gradient-to-b from-neutral-50/70 via-white to-neutral-50/70 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          {/* Dynamic Background Ambient Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10"
            style={{ backgroundColor: activeProduct.glowColor }}
          />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              {/* Left Column: Product Info & Single CTA with Dynamic Fade-Out/In */}
              <div className="lg:col-span-6 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProduct.id}
                    initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -16, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    {/* Badge & Step Indicator */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/60 px-3 py-1 rounded-full border border-primary-500/20">
                        {activeProduct.badge}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-400">
                        App {activeIndex + 1} of {PRODUCTS.length}
                      </span>
                    </div>

                    {/* Product Name & Icon */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${activeProduct.accentBg} ${activeProduct.color} flex items-center justify-center font-bold shadow-sm transition-transform duration-300`}
                        style={{ transform: `scale(${1 + sliceProgress * 0.08})` }}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white">
                        {activeProduct.name}
                      </h3>
                    </div>

                    {/* Tagline & Headline */}
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-4 leading-snug">
                      {activeProduct.headline}
                    </h4>

                    {/* Plain English Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                      {activeProduct.description}
                    </p>

                    {/* Embedded Gamification Feature Card */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-8 flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <FiAward className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center space-x-2">
                          <span>Embedded Gamification</span>
                          <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                            {activeProduct.gamificationBadge}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {activeProduct.gamificationNote}
                        </div>
                      </div>
                    </div>

                    {/* Single Clean Professional CTA */}
                    <div>
                      <a
                        href={activeProduct.ctaHref}
                        className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-semibold text-sm shadow-xl shadow-primary-500/30 active:scale-[0.98] transition-all"
                      >
                        <span>{activeProduct.ctaText}</span>
                        <FiArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: 6 Scroll-Tied Bespoke Live Animations with Dynamic Fade-Out/In */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="w-full max-w-lg aspect-square rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* 1. ULO & ULOX Animation: Scroll-Driven Speed Dial & Task Trail */}
                    {activeProduct.id === 'ulo' && (
                      <motion.div
                        key="anim-ulo"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex flex-col justify-between items-center text-center relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-amber-500 uppercase tracking-wider flex items-center space-x-1">
                            <FiZap className="w-3.5 h-3.5" />
                            <span>Task Speedometer</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            Scroll Driven
                          </span>
                        </div>

                        {/* Speed Dial directly linked to scroll progress */}
                        <div className="relative w-56 h-56 flex items-center justify-center my-auto">
                          {/* Outer perimeter arc */}
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle
                              cx="112"
                              cy="112"
                              r="96"
                              stroke="currentColor"
                              strokeWidth="6"
                              className="text-neutral-100 dark:text-neutral-800"
                              fill="transparent"
                            />
                            <circle
                              cx="112"
                              cy="112"
                              r="96"
                              stroke="currentColor"
                              strokeWidth="8"
                              strokeDasharray={603}
                              strokeDashoffset={603 * (1 - sliceProgress)}
                              strokeLinecap="round"
                              className="text-amber-500 transition-all duration-75"
                              fill="transparent"
                            />
                          </svg>

                          {/* Central Dial */}
                          <div
                            style={{ transform: `scale(${1 + sliceProgress * 0.12})` }}
                            className="w-36 h-36 rounded-full bg-amber-500/10 border border-amber-500/30 flex flex-col items-center justify-center shadow-lg shadow-amber-500/20 z-10 transition-transform duration-75"
                          >
                            <FiZap
                              className="w-8 h-8 text-amber-500 mb-1 transition-transform duration-75"
                              style={{ transform: `rotate(${sliceProgress * 180}deg)` }}
                            />
                            <span className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
                              {(1.0 + sliceProgress * 2.5).toFixed(1)}x
                            </span>
                            <span className="text-[10px] text-amber-600 font-bold uppercase">
                              Speed Boost
                            </span>
                          </div>

                          {/* Rotating indicator needle */}
                          <div
                            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-transform duration-75"
                            style={{ transform: `rotate(${-120 + sliceProgress * 240}deg)` }}
                          >
                            <div className="w-1.5 h-24 bg-amber-500 rounded-full shadow-md -translate-y-12" />
                          </div>
                        </div>

                        {/* Dynamic Tasks Completed on Scroll */}
                        <div className="w-full grid grid-cols-3 gap-2 text-[10px] font-semibold mb-2">
                          <div
                            className={`p-2 rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                              sliceProgress >= 0.2
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                            }`}
                          >
                            <FiCheckCircle className="w-3 h-3" />
                            <span>Batch Files</span>
                          </div>
                          <div
                            className={`p-2 rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                              sliceProgress >= 0.55
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                            }`}
                          >
                            <FiCheckCircle className="w-3 h-3" />
                            <span>Auto-Sort</span>
                          </div>
                          <div
                            className={`p-2 rounded-lg border flex items-center justify-center space-x-1 transition-all ${
                              sliceProgress >= 0.85
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-600 dark:text-amber-400 font-bold'
                                : 'bg-neutral-50 dark:bg-neutral-800/40 border-neutral-200 dark:border-neutral-800 text-neutral-400'
                            }`}
                          >
                            <FiCheckCircle className="w-3 h-3" />
                            <span>Sync Cloud</span>
                          </div>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">Daily Streak Bonus</span>
                          <span className="font-bold text-amber-500">
                            +{Math.round(50 + sliceProgress * 100)} XP Earned
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* 2. MatriX Animation: Static Core Hub + Strictly Horizontal Orbiting Badges */}
                    {activeProduct.id === 'matrix' && (() => {
                      const orbitRadius = 96
                      // Angle sweeps 360 degrees (2*PI) with scroll
                      const baseAngle = sliceProgress * 2 * Math.PI - Math.PI / 2

                      const modules = [
                        {
                          id: 'tasks',
                          label: 'Tasks Hub',
                          color: 'bg-emerald-500',
                          border: 'border-emerald-500/30',
                          angleOffset: 0,
                          threshold: 0,
                        },
                        {
                          id: 'docs',
                          label: 'Documents',
                          color: 'bg-violet-500',
                          border: 'border-violet-500/30',
                          angleOffset: Math.PI / 2,
                          threshold: 0.25,
                        },
                        {
                          id: 'chat',
                          label: 'Chat Feed',
                          color: 'bg-cyan-500',
                          border: 'border-cyan-500/30',
                          angleOffset: Math.PI,
                          threshold: 0.5,
                        },
                        {
                          id: 'insights',
                          label: 'Insights',
                          color: 'bg-amber-500',
                          border: 'border-amber-500/30',
                          angleOffset: (3 * Math.PI) / 2,
                          threshold: 0.75,
                        },
                      ]

                      return (
                        <motion.div
                          key="anim-matrix"
                          initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                          exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                          transition={{ duration: 0.35, ease: 'easeInOut' }}
                          className="w-full h-full flex flex-col justify-between items-center text-center relative"
                        >
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs font-bold text-violet-500 uppercase tracking-wider flex items-center space-x-1">
                              <FiGrid className="w-3.5 h-3.5" />
                              <span>Workspace Constellation</span>
                            </span>
                            <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                              Scroll Driven
                            </span>
                          </div>

                          {/* Orbit Canvas with Central Hub & 360 Horizontal Revolving Badges */}
                          <div className="relative w-64 h-64 flex items-center justify-center my-auto">
                            {/* SVG Orbital Track Ring & Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <circle
                                cx="128"
                                cy="128"
                                r={orbitRadius}
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeDasharray="4 4"
                                className="text-violet-400/30 dark:text-violet-500/25"
                                fill="transparent"
                              />
                            </svg>

                            {/* Stable, Upright Central Core Hub (Zero Rotation) */}
                            <div className="w-20 h-20 rounded-2xl bg-violet-600 text-white flex flex-col items-center justify-center shadow-xl shadow-violet-500/30 z-20">
                              <FiGrid className="w-7 h-7 mb-1" />
                              <span className="text-[9px] font-bold tracking-tight">Core Hub</span>
                            </div>

                            {/* Orbiting Badges: Purely translated on X/Y, strictly horizontal (NO rotation of badge) */}
                            {modules.map((mod) => {
                              const angle = baseAngle + mod.angleOffset
                              const x = Math.round(orbitRadius * Math.cos(angle))
                              const y = Math.round(orbitRadius * Math.sin(angle))
                              const isVisible = sliceProgress >= mod.threshold
                              const opacity = isVisible ? 1 : 0
                              const scale = isVisible ? 1 : 0.5

                              return (
                                <div
                                  key={mod.id}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-auto transition-opacity duration-300"
                                  style={{
                                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                                    opacity,
                                  }}
                                >
                                  <div
                                    className={`px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border-2 ${mod.border} shadow-lg text-[10px] font-bold text-neutral-900 dark:text-white flex items-center space-x-1.5 whitespace-nowrap select-none`}
                                  >
                                    <span className={`w-2 h-2 rounded-full ${mod.color}`} />
                                    <span>{mod.label}</span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>

                          {/* Telemetry Footer */}
                          <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                            <span className="text-neutral-500 font-medium">Nodes Connected</span>
                            <span className="font-bold text-violet-500 font-mono">
                              {modules.filter((m) => sliceProgress >= m.threshold).length} of 4
                              Orbiting
                            </span>
                          </div>
                        </motion.div>
                      )
                    })()}

                    {/* 3. CasaX Animation: Scroll-Driven Asset Protection Pulse */}
                    {activeProduct.id === 'casax' && (
                      <motion.div
                        key="anim-casax"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex flex-col justify-between items-center text-center relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center space-x-1">
                            <FiShield className="w-3.5 h-3.5" />
                            <span>Asset Radar & Shield</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            Scroll Driven
                          </span>
                        </div>

                        {/* Shield & concentric rings react to scroll */}
                        <div className="relative w-56 h-56 flex items-center justify-center my-auto">
                          {/* Expanding Radar Rings */}
                          <div
                            className="absolute inset-0 rounded-full border-2 border-emerald-500/30 transition-all duration-75"
                            style={{
                              transform: `scale(${0.6 + sliceProgress * 0.7})`,
                              opacity: 0.3 + sliceProgress * 0.7,
                            }}
                          />
                          <div
                            className="absolute inset-8 rounded-full border border-emerald-500/20 transition-all duration-75"
                            style={{
                              transform: `scale(${0.8 + sliceProgress * 0.4})`,
                            }}
                          />

                          {/* Center Shield */}
                          <div
                            style={{ transform: `scale(${0.9 + sliceProgress * 0.25})` }}
                            className="w-24 h-24 rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/40 flex flex-col items-center justify-center text-emerald-500 shadow-xl shadow-emerald-500/20 z-10 transition-transform duration-75"
                          >
                            <FiShield className="w-10 h-10 mb-1" />
                            <span className="text-[10px] font-bold text-neutral-900 dark:text-white">
                              Secure
                            </span>
                          </div>

                          {/* Radar Beam */}
                          <div
                            className="absolute inset-0 pointer-events-none transition-transform duration-75"
                            style={{ transform: `rotate(${sliceProgress * 540}deg)` }}
                          >
                            <div className="w-1/2 h-0.5 bg-gradient-to-r from-transparent to-emerald-400 absolute top-1/2 left-0 shadow-sm" />
                          </div>
                        </div>

                        {/* Asset Category Badges */}
                        <div className="w-full grid grid-cols-2 gap-2 text-[10px] font-semibold mb-2">
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                            <span>Properties & Units</span>
                            <span className="font-bold">100% Logged</span>
                          </div>
                          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
                            <span>Valuable Belongings</span>
                            <span className="font-bold">Safe & Tracked</span>
                          </div>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">Portfolio Status</span>
                          <span className="font-bold text-emerald-500">
                            {Math.round(80 + sliceProgress * 20)}% Verified Safe
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* 4. BuzX Animation: High-Visibility Dynamic Sales Chart & Volume Bars */}
                    {activeProduct.id === 'buzx' && (
                      <motion.div
                        key="anim-buzx"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex flex-col justify-between items-center text-center relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider flex items-center space-x-1">
                            <FiTrendingUp className="w-3.5 h-3.5" />
                            <span>Sales Growth Analytics</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            Scroll Driven
                          </span>
                        </div>

                        {/* High-Visibility Full Graph Stage */}
                        <div className="w-full h-44 relative flex flex-col justify-end px-3 my-auto rounded-2xl bg-gradient-to-b from-neutral-50/50 to-neutral-100/80 dark:from-neutral-800/40 dark:to-neutral-850/80 border border-neutral-200/70 dark:border-neutral-700/70 overflow-hidden">
                          {/* Background Grid Lines */}
                          <div className="absolute inset-0 flex flex-col justify-between p-3 pointer-events-none opacity-40">
                            <div className="w-full border-b border-dashed border-neutral-300 dark:border-neutral-600 flex justify-between text-[8px] text-neutral-400">
                              <span>$50k</span>
                            </div>
                            <div className="w-full border-b border-dashed border-neutral-300 dark:border-neutral-600 flex justify-between text-[8px] text-neutral-400">
                              <span>$25k</span>
                            </div>
                            <div className="w-full border-b border-neutral-300 dark:border-neutral-600 flex justify-between text-[8px] text-neutral-400">
                              <span>$0</span>
                            </div>
                          </div>

                          {/* Dynamic 5-Bar Sales Cluster */}
                          <div className="w-full h-32 flex items-end justify-between gap-2 sm:gap-3 z-10 pb-1">
                            {[
                              { label: 'Q1', base: 45 },
                              { label: 'Q2', base: 65 },
                              { label: 'Q3', base: 82 },
                              { label: 'Q4', base: 94 },
                              { label: 'Now', base: 100 },
                            ].map((bar, i) => {
                              const growthFactor = Math.min(
                                1,
                                Math.max(0.25, sliceProgress * 1.3 - i * 0.12)
                              )
                              const computedHeight = Math.round(bar.base * growthFactor)
                              return (
                                <div
                                  key={bar.label}
                                  className="flex-1 flex flex-col items-center justify-end h-full group"
                                >
                                  {/* Value tag on top of active bar */}
                                  <span className="text-[9px] font-mono font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                                    {computedHeight}%
                                  </span>

                                  {/* Solid Glowing Bar Container */}
                                  <div className="w-full h-24 bg-neutral-200/50 dark:bg-neutral-700/50 rounded-lg flex items-end overflow-hidden p-0.5">
                                    <div
                                      style={{ height: `${computedHeight}%` }}
                                      className="w-full bg-gradient-to-t from-cyan-600 via-cyan-400 to-primary-500 rounded-md transition-all duration-100 shadow-md shadow-cyan-500/30"
                                    />
                                  </div>

                                  <span className="text-[9px] font-bold text-neutral-500 dark:text-neutral-400 mt-1">
                                    {bar.label}
                                  </span>
                                </div>
                              )
                            })}
                          </div>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">Revenue Velocity</span>
                          <span className="font-bold text-cyan-500 font-mono">
                            ${Math.round(5400 + sliceProgress * 42800).toLocaleString()} (
                            {Math.round(12 + sliceProgress * 38)} Deals)
                          </span>
                        </div>
                      </motion.div>
                    )}

                    {/* 5. MarketX Animation: Scroll-Driven 3D Card Tilt & Holographic Glint */}
                    {activeProduct.id === 'marketx' && (
                      <motion.div
                        key="anim-marketx"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex flex-col justify-between items-center text-center relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-primary-500 uppercase tracking-wider flex items-center space-x-1">
                            <FiShoppingBag className="w-3.5 h-3.5" />
                            <span>Creator Store Showcase</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            Scroll Driven
                          </span>
                        </div>

                        {/* Card tilts and rotates dynamically as user scrolls */}
                        <div
                          style={{
                            transform: `perspective(600px) rotateY(${
                              (sliceProgress - 0.5) * 28
                            }deg) rotateX(${(0.5 - sliceProgress) * 16}deg) scale(${
                              0.95 + sliceProgress * 0.1
                            })`,
                          }}
                          className="w-64 p-5 rounded-2xl bg-gradient-to-br from-white via-primary-50/50 to-neutral-100 dark:from-neutral-800 dark:via-neutral-850 dark:to-neutral-900 border border-primary-500/30 shadow-2xl my-auto text-left relative overflow-hidden transition-transform duration-75"
                        >
                          {/* Dynamic Holographic light glint sweep */}
                          <div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent pointer-events-none transition-all duration-75"
                            style={{
                              transform: `translateX(${
                                (sliceProgress - 0.5) * 300
                              }%) rotate(25deg)`,
                            }}
                          />

                          <div className="flex items-center justify-between text-xs mb-2">
                            <span className="font-bold text-primary-600 bg-primary-50 dark:bg-primary-950/60 px-2 py-0.5 rounded">
                              Featured Template
                            </span>
                            <span className="text-[10px] text-amber-500 font-bold">5.0 ★ (120)</span>
                          </div>
                          <h5 className="text-base font-extrabold text-neutral-900 dark:text-white mb-1">
                            SaaS Launchpad Kit
                          </h5>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
                            Complete verified UI designs, ready automations & growth widgets.
                          </p>
                          <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-700 text-xs font-bold">
                            <span className="text-neutral-600 dark:text-neutral-400">Creator Price</span>
                            <span className="text-primary-600 dark:text-primary-400 font-mono text-sm">
                              150 Pts / $29
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">Creator Royalty</span>
                          <span className="font-bold text-primary-500">100% Instant Payouts</span>
                        </div>
                      </motion.div>
                    )}

                    {/* 6. GrantX Animation: Scroll-Driven Radar & Target Lock */}
                    {activeProduct.id === 'grantx' && (
                      <motion.div
                        key="anim-grantx"
                        initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="w-full h-full flex flex-col justify-between items-center text-center relative"
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center space-x-1">
                            <FiTarget className="w-3.5 h-3.5" />
                            <span>Global Grant Radar</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                            Scroll Driven
                          </span>
                        </div>

                        {/* Radar beam rotates strictly in sync with scroll */}
                        <div className="relative w-52 h-52 rounded-full border-2 border-emerald-500/30 flex items-center justify-center my-auto overflow-hidden">
                          {/* Radar sweep gradient */}
                          <div
                            style={{ transform: `rotate(${sliceProgress * 720}deg)` }}
                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-emerald-500/30 to-transparent transition-transform duration-75"
                          />

                          {/* Concentric grid rings */}
                          <div className="w-36 h-36 rounded-full border border-emerald-500/20" />
                          <div className="w-20 h-20 rounded-full border border-emerald-500/30 flex items-center justify-center">
                            <FiCompass
                              className="w-6 h-6 text-emerald-400 transition-transform duration-75"
                              style={{ transform: `rotate(${-sliceProgress * 360}deg)` }}
                            />
                          </div>

                          {/* Crosshairs */}
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-full h-px bg-emerald-500/20" />
                            <div className="h-full w-px bg-emerald-500/20 absolute" />
                          </div>

                          {/* Target locks on as user scrolls */}
                          <div
                            style={{
                              opacity: sliceProgress > 0.35 ? 1 : 0.2,
                              transform: `scale(${sliceProgress > 0.35 ? 1 : 0.8})`,
                            }}
                            className="absolute top-8 right-8 flex items-center space-x-1.5 transition-all duration-150"
                          >
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-full shadow border border-emerald-500/30">
                              $50k Match
                            </span>
                          </div>
                        </div>

                        {/* Telemetry Footer */}
                        <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                          <span className="text-neutral-500 font-medium">Match Accuracy</span>
                          <span className="font-bold text-emerald-500">
                            {Math.round(75 + sliceProgress * 23)}% High Probability
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Step Indicator Navigation Bar (Fixed & Accurate Scrolling) */}
            <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-2">
              {PRODUCTS.map((prod, pIdx) => (
                <button
                  key={prod.id}
                  onClick={() => handlePillClick(pIdx)}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 select-none ${
                    pIdx === activeIndex
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25 scale-105'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                >
                  <span>{prod.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection

