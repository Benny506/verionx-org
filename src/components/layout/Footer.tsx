import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowUp, FiShield } from 'react-icons/fi'
import { FaTwitter, FaLinkedin, FaGithub, FaDiscord } from 'react-icons/fa'
import logoWordmark from '../../assets/logos/logo-wordmark.svg'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-neutral-900 text-neutral-200 border-t border-neutral-800 pt-16 pb-12">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          {/* Brand Info & Mission */}
          <div className="lg:col-span-2 flex flex-col justify-between pr-0 lg:pr-6">
            <div>
              <Link to="/" className="inline-block mb-4">
                <img
                  src={logoWordmark}
                  alt="VerionX"
                  className="h-8 w-auto object-contain"
                />
              </Link>
              <p className="text-sm text-neutral-300 max-w-md leading-relaxed mt-2">
                VerionX is a fun playground where you can learn practical tech skills, use smart software
                apps that save you time, and get help building your own business — all powered by points and rewards.
              </p>
            </div>

            <div className="mt-8 flex items-center space-x-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-500 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-500 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaLinkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-500 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaGithub className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Discord"
                className="w-9 h-9 rounded-xl bg-neutral-800 hover:bg-primary-500 text-neutral-300 hover:text-white flex items-center justify-center transition-all duration-200"
              >
                <FaDiscord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 1: Core Pillars */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Core Pillars
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#pillars" className="text-neutral-300 hover:text-white transition-colors">
                  Learning Hub
                </a>
              </li>
              <li>
                <a href="/#pillars" className="text-neutral-300 hover:text-white transition-colors">
                  Creative Skills
                </a>
              </li>
              <li>
                <a href="/#pillars" className="text-neutral-300 hover:text-white transition-colors">
                  Digital Skills & AI
                </a>
              </li>
              <li>
                <a href="/#ventures" className="text-neutral-300 hover:text-white transition-colors">
                  Enterprise Center
                </a>
              </li>
              <li>
                <a href="/#gamification" className="text-neutral-300 hover:text-white transition-colors">
                  Gamification Backbone
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Digital Products */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Digital Products
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#products" className="text-neutral-300 hover:text-white transition-colors">
                  ULO & ULOX
                </a>
              </li>
              <li>
                <a href="/#products" className="text-neutral-300 hover:text-white transition-colors">
                  MatriX OS
                </a>
              </li>
              <li>
                <a href="/#products" className="text-neutral-300 hover:text-white transition-colors">
                  CasaX
                </a>
              </li>
              <li>
                <a href="/#products" className="text-neutral-300 hover:text-white transition-colors">
                  BuzX & MarketX
                </a>
              </li>
              <li>
                <a href="/#products" className="text-neutral-300 hover:text-white transition-colors">
                  GrantX Finder
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-white transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <a href="/#ventures" className="text-neutral-300 hover:text-white transition-colors">
                  Venture Incubation
                </a>
              </li>
              <li>
                <span className="inline-flex items-center text-xs font-medium text-emerald-300 bg-emerald-950/70 px-2.5 py-1 rounded-full border border-emerald-700/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse" />
                  Ecosystem Online
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-400 gap-4">
          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} VerionX. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1">
              <FiShield className="w-3.5 h-3.5 text-primary-500" />
              <span>Built for Creators & Builders</span>
            </span>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <FiArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
