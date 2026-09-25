import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll } from 'framer-motion'
import {
  FiZap,
  FiArrowRight,
  FiExternalLink,
  FiAward,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiNavigation,
  FiGift,
} from 'react-icons/fi'
import { scrollToTarget } from '../layout/SmoothScroll'
import {
  ECOSYSTEM_PROJECTS,
  type ProjectItem,
  type ProductCategory,
} from '../../content/projectsData'

const CATEGORIES: ProductCategory[] = [
  'All',
  'AI & Developer',
  'Commerce & Finance',
  'Health & AgriTech',
  'Learning & Strategy',
]

export const ProductsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const mobileCarouselRef = useRef<HTMLDivElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All')
  const [activeIndex, setActiveIndex] = useState(0)
  const [sliceProgress, setSliceProgress] = useState(0)
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0)

  // Filter projects if category selected
  const displayedProjects =
    selectedCategory === 'All'
      ? ECOSYSTEM_PROJECTS
      : ECOSYSTEM_PROJECTS.filter((p) => p.category === selectedCategory)

  // Height multiplier for desktop scroll hijacking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Synchronize nav visibility and active product calculations on desktop
  const updateNavAndProduct = useCallback(
    (latestProgress: number) => {
      if (window.innerWidth < 1024) return

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

      const total = displayedProjects.length
      const step = 1 / total
      const clampedProgress = Math.max(0, Math.min(0.9999, latestProgress))
      const idx = Math.min(Math.floor(clampedProgress / step), total - 1)
      setActiveIndex(idx)

      const localProg = (clampedProgress - idx * step) / step
      setSliceProgress(Math.max(0, Math.min(1, localProg)))
    },
    [displayedProjects.length]
  )

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      updateNavAndProduct(latest)
    })

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

  // Precise scrolling on desktop pill click
  const handlePillClick = (pIdx: number) => {
    if (!containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop
    const containerTop = containerRect.top + currentScrollY
    const containerHeight = containerRef.current.offsetHeight
    const viewportHeight = window.innerHeight
    const maxScroll = Math.max(0, containerHeight - viewportHeight)

    const step = 1 / displayedProjects.length
    const targetProgress = (pIdx + 0.5) * step
    const targetY = containerTop + targetProgress * maxScroll

    scrollToTarget(targetY)
  }

  // Mobile horizontal carousel scroll listener & navigation
  const handleMobileScroll = () => {
    if (!mobileCarouselRef.current) return
    const el = mobileCarouselRef.current
    const card = el.firstElementChild as HTMLElement | null
    if (!card) return
    const cardWidth = card.offsetWidth + 16
    const scrollLeft = el.scrollLeft
    const newIdx = Math.round(scrollLeft / cardWidth)
    setMobileActiveIndex(Math.max(0, Math.min(displayedProjects.length - 1, newIdx)))
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

  const activeProduct: ProjectItem =
    displayedProjects[activeIndex] || displayedProjects[0] || ECOSYSTEM_PROJECTS[0]
  const Icon = activeProduct.icon

  return (
    <section id="products" className="relative bg-white dark:bg-neutral-950">
      {/* 1. Top Section Header & Category Filters */}
      <div className="pt-24 pb-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 border-b border-neutral-100 dark:border-neutral-900">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
              <FiZap className="w-3.5 h-3.5" />
              <span>The 14 X Applications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
              A Complete Ecosystem of High-Utility Tools
            </h2>
            <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed">
              From visual AI agent builders and crop pathology vision to mathematical duels and
              automated corporate finance — explore all 14 live applications.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              const count =
                cat === 'All'
                  ? ECOSYSTEM_PROJECTS.length
                  : ECOSYSTEM_PROJECTS.filter((p) => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setActiveIndex(0)
                    setMobileActiveIndex(0)
                  }}
                  type="button"
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center space-x-1.5 ${
                    isSelected
                      ? 'bg-primary-500 text-white shadow-md shadow-primary-500/25'
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white border border-neutral-200/60 dark:border-neutral-800'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. Mobile Horizontal Gesture Snap Carousel */}
      <div className="block lg:hidden py-8">
        <div
          ref={mobileCarouselRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 sm:px-6 pb-4 scrollbar-none scroll-smooth"
        >
          {displayedProjects.map((prod, pIdx) => {
            const ProdIcon = prod.icon
            return (
              <div
                key={prod.id}
                className="w-[86vw] sm:w-[75vw] max-w-[390px] shrink-0 snap-center rounded-3xl bg-neutral-50/90 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  {/* Status & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${prod.themeClass.badgeBg} ${prod.themeClass.badgeText} ${prod.themeClass.border}`}
                    >
                      {prod.categoryLabel}
                    </span>
                    <span className="text-xs font-mono font-semibold text-neutral-400">
                      {pIdx + 1} of {displayedProjects.length}
                    </span>
                  </div>

                  {/* Icon & Name */}
                  <div className="flex items-center space-x-3 mb-2.5">
                    <div
                      className={`w-12 h-12 rounded-2xl ${prod.themeClass.bgLight} ${prod.themeClass.text} border ${prod.themeClass.border} flex items-center justify-center font-bold shadow-sm p-2`}
                    >
                      {prod.isOfficialLogo && prod.logoSrc ? (
                        <img src={prod.logoSrc} alt={prod.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <ProdIcon className="w-6 h-6" />
                      )}
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

                  {/* Highlight Features */}
                  <div className="space-y-1.5 mb-4">
                    {prod.detailedFeatures.slice(0, 2).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start space-x-1.5 text-[11px] text-neutral-700 dark:text-neutral-300"
                      >
                        <FiCheckCircle
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${prod.themeClass.text}`}
                        />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Stats Metric Pill */}
                  <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-between text-xs mb-3 shadow-sm">
                    <span className="text-neutral-500">{prod.statsMetric.label}</span>
                    <span className={`font-bold font-mono ${prod.themeClass.text}`}>
                      {prod.statsMetric.value}
                    </span>
                  </div>

                  {/* Gamification Perk Badge */}
                  <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-800 dark:text-amber-300 font-medium flex items-center space-x-2">
                    <FiAward className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{prod.gamificationBadge}</span>
                  </div>
                </div>

                {/* Card CTA: Launch External Live App */}
                <a
                  href={prod.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-4 py-3 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-xs flex items-center justify-center space-x-2 shadow-lg active:scale-[0.98] transition-all"
                >
                  <span>Launch {prod.name} Live</span>
                  <FiExternalLink className="w-3.5 h-3.5" />
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
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[65%] py-1">
            {displayedProjects.map((_, dotIdx) => (
              <button
                key={dotIdx}
                onClick={() => scrollMobileTo(dotIdx)}
                aria-label={`Jump to app ${dotIdx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer shrink-0 ${
                  dotIdx === mobileActiveIndex
                    ? 'w-6 bg-primary-500'
                    : 'w-2 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() =>
              scrollMobileTo(Math.min(displayedProjects.length - 1, mobileActiveIndex + 1))
            }
            disabled={mobileActiveIndex === displayedProjects.length - 1}
            className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 flex items-center justify-center transition-all cursor-pointer"
            aria-label="Next app"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Desktop Scroll-Hijacking Pinned Container */}
      <div
        ref={containerRef}
        className="relative hidden lg:block"
        style={{ height: `${displayedProjects.length * 65}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden bg-gradient-to-b from-neutral-50/70 via-white to-neutral-50/70 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
          {/* Dynamic Background Ambient Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] rounded-full blur-3xl pointer-events-none transition-all duration-700 -z-10 opacity-70"
            style={{ backgroundColor: activeProduct.themeClass.glow }}
          />

          <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 py-6 sm:py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
              {/* Left Column: Product Information & Direct Launch CTA */}
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
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${activeProduct.themeClass.badgeBg} ${activeProduct.themeClass.badgeText} ${activeProduct.themeClass.border}`}
                      >
                        {activeProduct.categoryLabel}
                      </span>
                      <span className="text-xs font-mono font-semibold text-neutral-400">
                        App {activeIndex + 1} of {displayedProjects.length}
                      </span>
                    </div>

                    {/* Product Name & Icon */}
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-14 h-14 rounded-2xl ${activeProduct.themeClass.bgLight} ${activeProduct.themeClass.text} border ${activeProduct.themeClass.border} flex items-center justify-center font-bold shadow-sm p-3 transition-transform duration-300`}
                        style={{ transform: `scale(${1 + sliceProgress * 0.08})` }}
                      >
                        {activeProduct.isOfficialLogo && activeProduct.logoSrc ? (
                          <img
                            src={activeProduct.logoSrc}
                            alt={activeProduct.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <Icon className="w-7 h-7" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white">
                          {activeProduct.name}
                        </h3>
                        <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                          {activeProduct.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Headline */}
                    <h4 className="text-lg sm:text-xl font-bold text-neutral-800 dark:text-neutral-100 mb-3 leading-snug">
                      {activeProduct.headline}
                    </h4>

                    {/* Plain English Description */}
                    <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
                      {activeProduct.description}
                    </p>

                    {/* Key Features List */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {activeProduct.detailedFeatures.map((feat, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300"
                        >
                          <FiCheckCircle
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${activeProduct.themeClass.text}`}
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* Gamification Protocol Card */}
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-sm mb-6 flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                        <FiAward className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900 dark:text-white flex items-center space-x-2">
                          <span>Gamification Perk</span>
                          <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-1.5 py-0.5 rounded">
                            {activeProduct.gamificationBadge}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                          {activeProduct.gamificationPerk}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Direct Launch External Link + Secondary */}
                    <div className="flex items-center space-x-3">
                      <a
                        href={activeProduct.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 dark:bg-white dark:hover:bg-neutral-100 text-white dark:text-neutral-950 font-bold text-sm shadow-xl active:scale-[0.98] transition-all cursor-pointer"
                      >
                        <span>Launch {activeProduct.name} App</span>
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href="/contact"
                        className="inline-flex items-center space-x-2 px-5 py-3.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 font-semibold text-sm transition-all"
                      >
                        <span>Request Demo</span>
                        <FiArrowRight className="w-4 h-4 text-neutral-400" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Right Column: Dynamic Bespoke Interactive Live Showcase */}
              <div className="lg:col-span-6 flex items-center justify-center">
                <div className="w-full max-w-lg aspect-square rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-2xl p-6 sm:p-8 flex flex-col justify-between items-center relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    {/* Bespoke Interactive Simulation Card for Active Product */}
                    <motion.div
                      key={activeProduct.id}
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, scale: 0.94, filter: 'blur(6px)' }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="w-full h-full flex flex-col justify-between items-center text-center relative"
                    >
                      {/* Top Simulation Header */}
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 ${activeProduct.themeClass.text}`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                          <span>{activeProduct.name} Simulation View</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded">
                          Live Interactive
                        </span>
                      </div>

                      {/* Visual Center Graphic depending on Product */}
                      <div className="my-auto w-full flex flex-col items-center justify-center">
                        {/* 1. UloX: Multi-Agent Graph Node Canvas */}
                        {activeProduct.id === 'ulox' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="flex items-center justify-center space-x-3 mb-4">
                              <div className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shadow-sm">
                                [Planner Agent]
                              </div>
                              <div className="h-0.5 w-6 bg-emerald-500/50" />
                              <div
                                style={{ transform: `scale(${1 + sliceProgress * 0.1})` }}
                                className="px-3 py-2 rounded-xl bg-teal-500/20 border-2 border-teal-500 text-teal-600 dark:text-teal-300 font-mono text-xs font-black shadow-md transition-transform duration-75"
                              >
                                [Coder Node]
                              </div>
                              <div className="h-0.5 w-6 bg-emerald-500/50" />
                              <div className="px-3 py-2 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold shadow-sm">
                                [Evaluator]
                              </div>
                            </div>
                            <div className="w-48 bg-neutral-100 dark:bg-neutral-800 rounded-full h-2.5 overflow-hidden mb-2">
                              <div
                                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-75"
                                style={{ width: `${Math.round(60 + sliceProgress * 38)}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono font-bold text-emerald-500">
                              Reliability Score: {Math.round(60 + sliceProgress * 38)}%
                            </span>
                          </div>
                        )}

                        {/* 2. RadX: Cassava Leaf Computer Vision Diagnosis */}
                        {activeProduct.id === 'radx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="relative w-44 h-44 rounded-2xl bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                              <div
                                style={{ transform: `scale(${1 + sliceProgress * 0.08})` }}
                                className="w-24 h-24 rounded-full bg-green-500/20 border border-green-500/50 flex flex-col items-center justify-center transition-transform duration-75"
                              >
                                <span className="text-3xl mb-1">🌿</span>
                                <span className="text-[9px] font-mono font-bold text-green-700 dark:text-green-300">
                                  Manihot Esculenta
                                </span>
                              </div>
                              {/* Scanning reticle beam */}
                              <div
                                className="absolute left-0 right-0 h-1 bg-green-400 shadow-[0_0_8px_#22c55e] transition-all duration-75"
                                style={{ top: `${(sliceProgress * 100).toFixed(0)}%` }}
                              />
                            </div>
                            <span className="text-xs font-bold text-green-600 dark:text-green-400">
                              Confidence: {Math.round(91 + sliceProgress * 8)}% • Mosaic Virus Negative
                            </span>
                          </div>
                        )}

                        {/* 3. OmegaX: Medicine Barcode & Authenticity Scanner */}
                        {activeProduct.id === 'omegax' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-56 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-left shadow-lg mb-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-mono font-bold text-indigo-500 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                                  NAFDAC VERIFIED
                                </span>
                                <span className="text-xs text-emerald-500 font-bold">100% Genuine</span>
                              </div>
                              <div className="text-sm font-bold text-neutral-900 dark:text-white">
                                Amoxicillin 500mg
                              </div>
                              <div className="text-[10px] text-neutral-500 font-mono mt-1">
                                Batch #NX-99824 • Exp: 2028-11
                              </div>
                            </div>
                            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                              3 Verified Clinics Located Nearby
                            </span>
                          </div>
                        )}

                        {/* 4. ZeusX: Prompt Engineering IDE & Latency Gauge */}
                        {activeProduct.id === 'zeusx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-64 p-3.5 rounded-xl bg-neutral-950 text-neutral-200 border border-violet-500/30 font-mono text-[11px] text-left shadow-xl mb-3">
                              <div className="text-violet-400 font-bold mb-1">
                                // System Prompt Template
                              </div>
                              <div className="text-neutral-400 truncate">
                                role: "Autonomous Code Refactor Specialist"
                              </div>
                              <div className="text-neutral-500 text-[10px] mt-2 flex justify-between">
                                <span>Tokens: 1,420</span>
                                <span className="text-emerald-400 font-bold">Latency: 140ms</span>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                              1,000+ Curated Templates Ready for Forking
                            </span>
                          </div>
                        )}

                        {/* 5. BuzX: Unit Economics & Financial Stress-Testing */}
                        {activeProduct.id === 'buzx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="flex items-end justify-center space-x-2 h-20 mb-3">
                              {[
                                { height: '35%', label: 'Q1' },
                                { height: '55%', label: 'Q2' },
                                { height: '75%', label: 'Q3' },
                                { height: `${Math.round(80 + sliceProgress * 19)}%`, label: 'Q4' },
                              ].map((bar, bIdx) => (
                                <div key={bIdx} className="flex flex-col items-center space-y-1">
                                  <div
                                    style={{ height: bar.height }}
                                    className="w-7 rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 shadow-md transition-all duration-75"
                                  />
                                  <span className="text-[10px] font-mono text-neutral-400">
                                    {bar.label}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                              Runway Buffer: {Math.round(14 + sliceProgress * 8)} Months • Break-Even Positive
                            </span>
                          </div>
                        )}

                        {/* 6. TraweX: Traffic Congestion & Weather Departure Radar */}
                        {activeProduct.id === 'trawex' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="relative w-40 h-40 rounded-full border-2 border-amber-500/30 flex items-center justify-center mb-3">
                              <div
                                style={{ transform: `rotate(${sliceProgress * 360}deg)` }}
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/25 to-transparent rounded-full transition-transform duration-75"
                              />
                              <FiNavigation className="w-8 h-8 text-amber-500" />
                            </div>
                            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                              Best Departure: 07:45 AM (Save 32 mins rain delay)
                            </span>
                          </div>
                        )}

                        {/* 7. MarketX: Creator Storefront 3D Tilt Card */}
                        {activeProduct.id === 'marketx' && (
                          <div className="w-full flex flex-col items-center">
                            <div
                              style={{
                                transform: `perspective(500px) rotateY(${
                                  (sliceProgress - 0.5) * 24
                                }deg) rotateX(${(0.5 - sliceProgress) * 14}deg)`,
                              }}
                              className="w-56 p-4 rounded-2xl bg-gradient-to-br from-white via-primary-50/40 to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 border border-primary-500/30 shadow-xl mb-3 text-left transition-transform duration-75"
                            >
                              <div className="text-xs font-bold text-primary-600 mb-1">
                                Creator Storefront
                              </div>
                              <div className="text-sm font-extrabold text-neutral-900 dark:text-white">
                                UI & Automation Pack
                              </div>
                              <div className="text-[11px] font-mono font-bold text-primary-500 mt-2">
                                $39 • Instant Download
                              </div>
                            </div>
                            <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                              100% Instant Creator Payouts & Automated Delivery
                            </span>
                          </div>
                        )}

                        {/* 8. CalX: 1v1 Math Battle Arena */}
                        {activeProduct.id === 'calx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-60 p-4 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 shadow-lg mb-3">
                              <div className="flex justify-between items-center text-xs font-bold mb-2">
                                <span className="text-neutral-700 dark:text-neutral-300">Player 1 (1850 ELO)</span>
                                <span className="text-yellow-600">VS</span>
                                <span className="text-neutral-700 dark:text-neutral-300">Player 2 (1820 ELO)</span>
                              </div>
                              <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-950 font-mono text-base font-black text-yellow-600">
                                ∫ 3x² dx = ?
                              </div>
                            </div>
                            <span className="text-xs font-bold text-yellow-600 dark:text-yellow-400">
                              Current Streak: 7 Wins • Global Rank #42
                            </span>
                          </div>
                        )}

                        {/* 9. BiblioX: Scripture Life Wisdom Semantic Search */}
                        {activeProduct.id === 'bibliox' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-64 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-left shadow-lg mb-3">
                              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                                Life Context: Anxiety & Focus
                              </div>
                              <div className="text-xs italic text-neutral-800 dark:text-neutral-200 leading-relaxed">
                                "Be strong and of a good courage; be not afraid, neither be thou dismayed..."
                              </div>
                              <div className="text-[10px] font-mono text-blue-500 mt-2 font-bold">
                                Joshua 1:9 (KJV & Parallel Greek)
                              </div>
                            </div>
                            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                              7-Day Guided Meditation Routine Active
                            </span>
                          </div>
                        )}

                        {/* 10. ResearchX: Literature Review Synthesizer */}
                        {activeProduct.id === 'researchx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-64 p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-left shadow-lg mb-3">
                              <div className="flex items-center justify-between text-[10px] font-mono text-purple-600 font-bold mb-1">
                                <span>50M+ PAPERS SEARCHED</span>
                                <span>BibTeX Export</span>
                              </div>
                              <div className="text-xs font-bold text-neutral-900 dark:text-white mb-1">
                                "Attention Mechanisms in Transformers"
                              </div>
                              <div className="text-[10px] text-neutral-500">
                                98% Methodology Rigor Score • 14 Citations Linked
                              </div>
                            </div>
                            <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                              Multi-Author Collaborative Workspace Active
                            </span>
                          </div>
                        )}

                        {/* 11. GrantX: Global Non-Repayable Grant Discovery Radar */}
                        {activeProduct.id === 'grantx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="relative w-40 h-40 rounded-full border-2 border-teal-500/30 flex items-center justify-center mb-3">
                              <div
                                style={{ transform: `rotate(${sliceProgress * 720}deg)` }}
                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-teal-500/30 to-transparent rounded-full transition-transform duration-75"
                              />
                              <FiGift className="w-8 h-8 text-teal-500" />
                            </div>
                            <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                              $50,000 Matched Grant • 94% High Eligibility Probability
                            </span>
                          </div>
                        )}

                        {/* 12. LearnX: Council of Great Minds Consultation */}
                        {activeProduct.id === 'learnx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-64 p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-left shadow-lg mb-3">
                              <div className="text-[10px] font-bold text-sky-600 uppercase mb-1">
                                Simulated Council of Great Minds
                              </div>
                              <div className="text-xs text-neutral-800 dark:text-neutral-200">
                                "First-principles thinking: Deconstruct the problem to fundamental truths."
                              </div>
                              <div className="text-[10px] text-neutral-400 font-mono mt-1">
                                Aristotle & Munger Synthesis Model
                              </div>
                            </div>
                            <span className="text-xs font-bold text-sky-600 dark:text-sky-400">
                              High-Signal Noise Reduction Filter Active
                            </span>
                          </div>
                        )}

                        {/* 13. MatriX: Spatial Coordinate Strategy Grid */}
                        {activeProduct.id === 'matrix' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-48 h-36 rounded-2xl bg-violet-600/10 border border-violet-600/30 p-2 grid grid-cols-4 gap-1 mb-3">
                              {Array.from({ length: 12 }).map((_, i) => (
                                <div
                                  key={i}
                                  className={`rounded-md flex items-center justify-center font-mono text-[9px] font-bold ${
                                    i === 3 || i === 6 || i === 10
                                      ? 'bg-violet-600 text-white shadow'
                                      : 'bg-white/50 dark:bg-neutral-800/50 text-neutral-400'
                                  }`}
                                >
                                  ({i % 4}, {Math.floor(i / 4)})
                                </div>
                              ))}
                            </div>
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-300">
                              Ranked Coordinate Arena • Zone Control 84%
                            </span>
                          </div>
                        )}

                        {/* 14. FinX: Enterprise Financial Close & SOX Audit */}
                        {activeProduct.id === 'finx' && (
                          <div className="w-full flex flex-col items-center">
                            <div className="w-64 p-3.5 rounded-2xl bg-emerald-600/10 border border-emerald-600/30 text-left shadow-lg mb-3">
                              <div className="flex justify-between items-center text-[10px] font-mono font-bold text-emerald-600 mb-1">
                                <span>SOX CLOSE CHECKLIST</span>
                                <span>100% RECONCILED</span>
                              </div>
                              <div className="text-xs font-bold text-neutral-900 dark:text-white">
                                General Ledger Variance: $0.00
                              </div>
                              <div className="text-[10px] text-neutral-500 mt-1">
                                Automated Dual Sign-Off Completed 3 Days Early
                              </div>
                            </div>
                            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                              Audit-Ready Financial Statements Generated
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Telemetry Footer */}
                      <div className="w-full p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/70 border border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-xs">
                        <span className="text-neutral-500 font-medium">
                          {activeProduct.statsMetric.label}
                        </span>
                        <span className={`font-bold font-mono ${activeProduct.themeClass.text}`}>
                          {activeProduct.statsMetric.value}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Bottom Horizontal App Selector Bar */}
            <div className="mt-8 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-start lg:justify-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
              {displayedProjects.map((prod, pIdx) => (
                <button
                  key={prod.id}
                  onClick={() => handlePillClick(pIdx)}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 select-none shrink-0 ${
                    pIdx === activeIndex
                      ? 'bg-neutral-950 text-white dark:bg-white dark:text-neutral-950 shadow-md scale-105'
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
