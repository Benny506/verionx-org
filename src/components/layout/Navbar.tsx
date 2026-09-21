import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiMenu, FiAward, FiArrowUpRight } from 'react-icons/fi'
import logoWordmark from '../../assets/logos/logo-wordmark.svg'
import MobileDrawer from './MobileDrawer'
import { scrollToTarget } from './SmoothScroll'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isNavHidden, setIsNavHidden] = useState(false)
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false)
  const [xpPoints, setXpPoints] = useState(120)
  const [xpGlow, setXpGlow] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    const handleNavVisibility = (e: Event) => {
      const customEvent = e as CustomEvent<{ hidden: boolean }>
      if (customEvent.detail !== undefined && customEvent.detail.hidden !== undefined) {
        setIsNavHidden(customEvent.detail.hidden)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('verionx:nav-visibility', handleNavVisibility)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('verionx:nav-visibility', handleNavVisibility)
    }
  }, [])

  const handleXpClick = () => {
    setXpPoints((prev) => prev + 10)
    setXpGlow(true)
    setTimeout(() => setXpGlow(false), 800)
  }

  const handleAnchorScroll = (id: string) => {
    if (location.pathname === '/') {
      const el = document.getElementById(id)
      if (el) {
        scrollToTarget(el)
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isNavHidden
            ? '-translate-y-full opacity-0 pointer-events-none'
            : isScrolled
              ? 'translate-y-0 opacity-100 py-2.5 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-md border-b border-neutral-200/80 dark:border-neutral-800/80'
              : 'translate-y-0 opacity-100 py-4 bg-white/60 dark:bg-neutral-950/60 backdrop-blur-sm border-b border-neutral-200/40 dark:border-neutral-800/40'
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-2 group">
              <img
                src={logoWordmark}
                alt="VerionX"
                className="h-7 sm:h-8 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === '/' && !location.hash
                    ? 'text-primary-600 dark:text-primary-400 font-semibold bg-primary-50/80 dark:bg-primary-950/40'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60'
                }`}
              >
                Home
              </Link>
              <a
                href="/#pillars"
                onClick={() => handleAnchorScroll('pillars')}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-colors"
              >
                Pillars
              </a>
              <a
                href="/#products"
                onClick={() => handleAnchorScroll('products')}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-colors"
              >
                Products
              </a>
              <a
                href="/#ventures"
                onClick={() => handleAnchorScroll('ventures')}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60 transition-colors"
              >
                Ventures
              </a>
              <Link
                to="/about"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === '/about'
                    ? 'text-primary-600 dark:text-primary-400 font-semibold bg-primary-50/80 dark:bg-primary-950/40'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  location.pathname === '/contact'
                    ? 'text-primary-600 dark:text-primary-400 font-semibold bg-primary-50/80 dark:bg-primary-950/40'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100/60 dark:hover:bg-neutral-900/60'
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Action & Gamification Controls */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Playful Interactive XP Badge */}
              <button
                onClick={handleXpClick}
                title="Click to gain Explorer XP!"
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all duration-300 ${
                  xpGlow
                    ? 'bg-primary-500 text-white border-primary-500 scale-105 shadow-md shadow-primary-500/30'
                    : 'bg-neutral-100/80 dark:bg-neutral-900/80 text-neutral-800 dark:text-neutral-200 border-neutral-200 dark:border-neutral-800 hover:border-primary-300'
                }`}
              >
                <FiAward className={`w-3.5 h-3.5 ${xpGlow ? 'text-white' : 'text-primary-500'}`} />
                <span>Level 1: Explorer</span>
                <span className="text-[10px] opacity-75 font-mono">({xpPoints} XP)</span>
              </button>

              {/* Primary CTA */}
              <a
                href="/#pillars"
                onClick={() => handleAnchorScroll('pillars')}
                className="hidden md:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-primary-500 text-white text-xs sm:text-sm font-medium shadow-md shadow-primary-500/25 hover:bg-primary-600 active:scale-95 transition-all"
              >
                <span>Get Started</span>
                <FiArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                aria-label="Open Mobile Menu"
                className="lg:hidden p-2 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 focus:outline-none"
              >
                <FiMenu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Responsive Off-Canvas Drawer */}
      <MobileDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
        userXp={xpPoints}
      />
    </>
  )
}

export default Navbar
