import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiAward, FiZap, FiStar, FiShield, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { FaFire } from 'react-icons/fa'
import { SlantedScrollCard } from '../common/SlantedScrollCard'

export const GamificationSpotlight: React.FC = () => {
  return (
    <section id="gamification" className="py-24 sm:py-32 bg-neutral-50/70 dark:bg-neutral-950 text-neutral-900 dark:text-white relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[30rem] h-[30rem] bg-primary-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Everyday Explanation & Scrolling Runway */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
                <FiAward className="w-3.5 h-3.5" />
                <span>Embedded Gamification</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 dark:text-white tracking-tight leading-tight mb-6">
                Learning That Feels Like Playing Your Favorite Game
              </h2>

              <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-4">
                We built fun game mechanics directly into everything you do. Complete a daily task,
                finish a 5-minute lesson, or launch your first business tool—earn points, build streaks,
                and unlock real rewards.
              </p>
            </div>

            {/* Feature Breakdown Cards */}
            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start space-x-4">
                <div className="w-11 h-11 rounded-xl bg-primary-500/10 text-primary-500 border border-primary-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FiZap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5">
                    Earn Points for Everything You Do
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Get XP points for completing micro-lessons, experimenting with software tools, and reaching business milestones.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start space-x-4">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FaFire className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5">
                    Daily Streaks That Build Great Habits
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Spend just 5 to 10 minutes a day to build a learning habit you will actually stick to without feeling overwhelmed.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start space-x-4">
                <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-500 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FiShield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5">
                    Unlock Real Perks & Prizes
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Leveling up unlocks bonus software features, free business templates, and priority grant application reviews.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-start space-x-4">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                  <FiCheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white mb-1.5">
                    Verified Skill Badges
                  </h4>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    Earn digital badges you can show off on LinkedIn or your portfolio to prove your practical abilities.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Gamified Quest Card with 3D Slanted Scroll */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 self-start z-10">
            <SlantedScrollCard
              intensity="moderate"
              direction="left"
              straightenOnScroll={false}
              hoverTilt={true}
            >
              <div className="p-7 sm:p-8 rounded-3xl bg-neutral-900 text-white border border-neutral-800 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-500 before:via-primary-600 before:to-amber-500">
                {/* Header Status */}
                <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary-500 to-amber-500 flex items-center justify-center font-bold text-white shadow-lg shadow-primary-500/30">
                      <FiStar className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 style={{ color: '#FFF' }} className="text-lg font-bold text-white">Your Explorer Profile</h3>
                      <div className="flex items-center space-x-2 text-xs text-neutral-400">
                        <span>Level 2 Builder</span>
                        <span>•</span>
                        <span className="text-amber-400 font-bold">7-Day Streak 🔥</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs text-neutral-400">Total Points</div>
                    <div className="text-xl font-extrabold text-primary-400 font-mono">
                      850 XP
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="my-6">
                  <div className="flex justify-between text-xs font-semibold mb-2 text-neutral-300">
                    <span>Next Goal: Level 3 (Master Builder)</span>
                    <span className="text-amber-400 font-mono">850 / 1,000 XP</span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-3 overflow-hidden p-0.5 border border-neutral-700">
                    <motion.div
                      className="bg-gradient-to-r from-primary-500 via-amber-500 to-emerald-400 h-2 rounded-full"
                      initial={{ width: '0%' }}
                      whileInView={{ width: '85%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Featured Quest Preview Box with Clean Get Started CTA */}
                <div className="p-5 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                      Today's Daily Quest
                    </span>
                    <span className="text-xs font-bold text-amber-400 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                      +100 Bonus XP
                    </span>
                  </div>

                  <p className="text-sm text-neutral-200 font-medium leading-snug">
                    Try out the 2-minute brainstorming guide in Creative Skills.
                  </p>

                  <Link
                    to="/contact"
                    className="w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center space-x-2 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/25 transition-all group cursor-pointer"
                  >
                    <span>I'm Interested • Get Started</span>
                    <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Unlocked Badges Row */}
                <div className="mt-6 pt-6 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-xs text-neutral-400 font-medium">Badges You've Earned</span>
                  <div className="flex items-center space-x-2">
                    <span
                      title="Early Explorer"
                      className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center text-xs font-bold"
                    >
                      🚀
                    </span>
                    <span
                      title="Creative Thinker"
                      className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center text-xs font-bold"
                    >
                      💡
                    </span>
                    <span
                      title="Product Tester"
                      className="w-8 h-8 rounded-full bg-violet-500/20 text-violet-400 border border-violet-500/30 flex items-center justify-center text-xs font-bold"
                    >
                      ⚡
                    </span>
                  </div>
                </div>
              </div>
            </SlantedScrollCard>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GamificationSpotlight

