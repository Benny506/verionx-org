import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { SEO_CONFIG } from '../config/seo'
import { FiTarget, FiZap, FiShield, FiArrowRight } from 'react-icons/fi'
import ImageWrapper from '../components/ImageWrapper'

export const About: React.FC = () => {
  return (
    <PageWrapper seo={SEO_CONFIG.about} className="pt-32 pb-24">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* About Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <span>Our Story & Mission</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            We Make Learning, Building, and Growing Fun & Easy
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 mt-6 leading-relaxed">
            VerionX is an ecosystem of 14 specialized applications designed to make learning, creating,
            and growing high-impact ventures accessible to everyone. We engineer intuitive software spanning
            agentic AI (UloX, ZeusX), vital agriculture & healthcare (RadX, OmegaX), competitive learning (CalX, LearnX),
            and venture scale (BuzX, GrantX, FinX).
          </p>
        </div>

        {/* Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 text-primary-500 flex items-center justify-center font-bold mb-6">
              <FiTarget className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-3">
              High-Utility & Plain English
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Every tool solves a tangible problem without unnecessary friction or complexity. We turn
              advanced AI and computing into intuitive interfaces anyone can master in minutes.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center font-bold mb-6">
              <FiZap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-3">
              Gamified & Rewarding
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Progress feels exciting. Earn XP, build daily learning streaks, and unlock real venture perks
              as you test apps, build agent loops, or run business models.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold mb-6">
              <FiShield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-950 dark:text-white mb-3">
              14 Connected Solutions
            </h3>
            <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              From protecting crop harvests in RadX to finding non-dilutive capital in GrantX and closing
              corporate books in FinX, our applications operate as a unified growth playground.
            </p>
          </div>
        </div>

        {/* Shimmer Image Slot for Innovation Hub */}
        <div className="rounded-3xl overflow-hidden border border-neutral-200 dark:border-neutral-800 mb-20 shadow-xl">
          <ImageWrapper
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Friendly community collaborating"
            aspectRatio="21/9"
            fallbackText="VerionX Community Hub"
          />
        </div>

        {/* CTA */}
        <div className="text-center bg-neutral-900 text-white rounded-3xl p-10 sm:p-14 border border-neutral-800">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Want to build with us?</h2>
          <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto mb-8">
            Say hello to our team, ask any question, or join our friendly community of creators.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-xl bg-primary-500 text-white font-medium text-sm shadow-lg shadow-primary-500/25 hover:bg-primary-600 transition-all"
          >
            <span>Say Hello</span>
            <FiArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </PageWrapper>
  )
}

export default About
