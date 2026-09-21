import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiArrowRight, FiAward, FiLayers, FiCompass, FiBriefcase, FiMail, FiZap } from 'react-icons/fi'
import logoWordmark from '../../assets/logos/logo-wordmark.svg'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  userXp?: number
}

const navLinks = [
  { name: 'Home', path: '/', icon: FiCompass },
  { name: 'Ecosystem Pillars', path: '/#pillars', icon: FiLayers },
  { name: 'Digital Products', path: '/#products', icon: FiZap },
  { name: 'Ventures Center', path: '/#ventures', icon: FiBriefcase },
  { name: 'About Us', path: '/about', icon: FiCompass },
  { name: 'Contact', path: '/contact', icon: FiMail },
]

export const MobileDrawer: React.FC<MobileDrawerProps> = ({ isOpen, onClose, userXp = 120 }) => {
  const location = useLocation()

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleLinkClick = (path: string) => {
    onClose()
    if (path.startsWith('/#')) {
      const targetId = path.replace('/#', '')
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 150)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Off-canvas Slide-out Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute top-0 right-0 bottom-0 w-[85%] max-w-[380px] bg-white dark:bg-neutral-950 border-l border-neutral-200 dark:border-neutral-800 flex flex-col justify-between p-6 shadow-2xl overflow-y-auto"
          >
            {/* Header with Logo and Close Button */}
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100 dark:border-neutral-900">
                <Link to="/" onClick={() => handleLinkClick('/')} className="flex items-center">
                  <img src={logoWordmark} alt="VerionX Logo" className="h-7 w-auto object-contain" />
                </Link>
                <button
                  onClick={onClose}
                  aria-label="Close Navigation Menu"
                  className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>

              {/* Gamification Progress Pill */}
              <div className="mt-5 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                    <FiAward className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Level 1: Explorer</div>
                    <div className="text-[11px] text-neutral-500 dark:text-neutral-400">VerionX Quest Active</div>
                  </div>
                </div>
                <div className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50 px-2 py-1 rounded-lg">
                  +{userXp} XP
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  const isActive =
                    link.path === '/'
                      ? location.pathname === '/' && !location.hash
                      : location.pathname === link.path

                  return (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => handleLinkClick(link.path)}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-500 text-white font-semibold shadow-md shadow-primary-500/20'
                          : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                        <span>{link.name}</span>
                      </div>
                      <FiArrowRight className={`w-3.5 h-3.5 opacity-60 ${isActive ? 'text-white' : ''}`} />
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-neutral-100 dark:border-neutral-900 flex flex-col space-y-3">
              <Link
                to="/#pillars"
                onClick={() => handleLinkClick('/#pillars')}
                className="w-full py-3.5 px-4 rounded-xl bg-primary-500 text-white font-medium text-sm text-center shadow-lg shadow-primary-500/25 hover:bg-primary-600 active:scale-[0.98] transition-all"
              >
                Join the Ecosystem
              </Link>
              <p className="text-[11px] text-center text-neutral-400">
                Where Creativity Meets Digital Power.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default MobileDrawer
