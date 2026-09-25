import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiBookOpen,
  FiBox,
  FiFeather,
  FiCpu,
  FiTrendingUp,
  FiCheckCircle,
  FiAward,
  FiLayers,
  FiZap,
} from 'react-icons/fi'
import { SlantedScrollCard } from '../common/SlantedScrollCard'

interface Pillar {
  id: string
  title: string
  subtitle: string
  shortDesc: string
  fullDesc: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  color: string
  accentBg: string
  highlights: string[]
}

const PILLARS: Pillar[] = [
  {
    id: 'learning-hub',
    title: 'Learning Hub',
    subtitle: 'High-signal knowledge, competitive math & research tools',
    shortDesc: 'Learn faster with gamified tools like LearnX, CalX, BiblioX, and ResearchX.',
    fullDesc:
      'We believe learning should be high-signal, engaging, and directly applicable. Master competitive mental math in CalX duels, extract life context in BiblioX, conduct AI literature reviews in ResearchX, and filter noise with LearnX.',
    icon: FiBookOpen,
    badge: 'Step-by-Step Learning',
    color: 'text-primary-500',
    accentBg: 'bg-primary-500/10',
    highlights: [
      'LearnX: Daily signal feed & AI Council of Great Minds',
      'CalX: Real-time 1v1 multiplayer math battle arena',
      'ResearchX & BiblioX: Deep literature synthesis & life guidance',
    ],
  },
  {
    id: 'digital-products',
    title: 'Digital Products',
    subtitle: '14 specialized software tools for life and enterprise',
    shortDesc: 'Production-ready apps tackling healthcare, agriculture, AI prompt craft, and mobility.',
    fullDesc:
      'Our family of 14 connected applications simplifies complex challenges: RadX diagnoses crop diseases with computer vision, OmegaX detects counterfeit drugs, TraweX predicts traffic and weather, and ZeusX accelerates prompt engineering.',
    icon: FiBox,
    badge: '14 Specialized Apps',
    color: 'text-violet-500',
    accentBg: 'bg-violet-500/10',
    highlights: [
      'RadX & OmegaX: AI crop pathology vision & medicine authentication',
      'ZeusX & MatriX: 1,000+ prompt templates & spatial coordinate strategy',
      'TraweX: Synchronized weather radar & traffic commute predictor',
    ],
  },
  {
    id: 'creative-skills',
    title: 'Creative Skills',
    subtitle: 'Prompt architecture, spatial thinking & system design',
    shortDesc: 'Build mental models for complex problem-solving and rapid design.',
    fullDesc:
      'Creativity is an engineered capability. We combine spatial reasoning from MatriX, structured prompt engineering from ZeusX, and first-principles mental frameworks from LearnX to help you solve difficult real-world challenges.',
    icon: FiFeather,
    badge: 'Creative Thinking',
    color: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    highlights: [
      'Master prompt crafting and parameter tuning in ZeusX',
      'Sharpen spatial geometry and tactical foresight in MatriX',
      'Explore first-principles decision decks in LearnX',
    ],
  },
  {
    id: 'digital-skills',
    title: 'Digital Skills & AI',
    subtitle: 'Agentic engineering, automation & modern workflows',
    shortDesc: 'Learn how to build autonomous AI agent loops with live evaluation in UloX.',
    fullDesc:
      'Stay ahead with agentic software engineering. Build multi-agent workflows from scratch in UloX, inspect token latency benchmarks in ZeusX, and automate daily repetitive tasks with intelligent assistants.',
    icon: FiCpu,
    badge: 'Agentic Engineering',
    color: 'text-cyan-500',
    accentBg: 'bg-cyan-500/10',
    highlights: [
      'UloX: Visual multi-agent graph builder with live reliability scoring',
      'ZeusX: Token telemetry, system role tuning, and prompt versioning',
      'Automated workflows that save 15+ hours every week',
    ],
  },
  {
    id: 'enterprise-center',
    title: 'Startup Launchpad',
    subtitle: 'From unit economics and storefronts to non-repayable grants',
    shortDesc: 'Financial modeling with BuzX, stores with MarketX, grants with GrantX, and close with FinX.',
    fullDesc:
      'Turn your venture idea into an enduring, financially robust business. Test pricing and cash runways in BuzX, launch digital storefronts in MarketX, win non-repayable startup funding in GrantX, and automate audit-ready closing with FinX.',
    icon: FiTrendingUp,
    badge: 'Venture Incubation',
    color: 'text-emerald-500',
    accentBg: 'bg-emerald-500/10',
    highlights: [
      'BuzX & MarketX: Unit economics stress-testing & instant creator stores',
      'GrantX: Global directory of non-repayable startup & NGO grants',
      'FinX: Automated monthly financial close and SOX accounting compliance',
    ],
  },
]

export const PillarsSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>(PILLARS[0].id)
  const activePillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0]
  const IconComponent = activePillar.icon

  return (
    <section id="pillars" className="py-24 bg-neutral-50 dark:bg-neutral-900/60 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-bold uppercase tracking-wider mb-4">
            <FiAward className="w-3.5 h-3.5" />
            <span>Five Core Pillars</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
            Five Simple Ways VerionX Helps You Grow
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 mt-4 leading-relaxed">
            Everything connects together like a game. Learn useful skills, use simple tools that save
            you time, and get help starting your business — all while earning points and rewards.
          </p>
        </div>

        {/* Pillar Switcher Navigation (Responsive Pills) */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-8 gap-2 no-scrollbar">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon
            const isSelected = pillar.id === activePillarId

            return (
              <button
                key={pillar.id}
                onClick={() => setActivePillarId(pillar.id)}
                className={`flex items-center space-x-2.5 px-5 py-3.5 rounded-2xl font-medium text-sm whitespace-nowrap transition-all duration-200 cursor-pointer ${isSelected
                  ? 'bg-primary-500 text-white shadow-xl shadow-primary-500/30 scale-[1.02] font-semibold'
                  : 'bg-white dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-primary-300 border border-neutral-200 dark:border-neutral-700/60'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : pillar.color}`} />
                <span>{pillar.title}</span>
              </button>
            )
          })}
        </div>

        {/* Active Pillar Highlight Card with Smooth Transition & Brand Crimson Line */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePillar.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-800 shadow-xl overflow-hidden p-8 sm:p-12 before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-primary-500 before:via-primary-600 before:to-amber-500"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 rounded-2xl ${activePillar.accentBg} ${activePillar.color} flex items-center justify-center font-bold`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                      {activePillar.badge}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-neutral-950 dark:text-white leading-tight">
                      {activePillar.title}
                    </h3>
                  </div>
                </div>

                <h4 className="text-lg font-semibold text-primary-600 dark:text-primary-400 mb-3">
                  {activePillar.subtitle}
                </h4>

                <p className="text-base text-neutral-600 dark:text-neutral-300 leading-relaxed mb-6">
                  {activePillar.fullDesc}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 mb-6">
                  {activePillar.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <FiCheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Bespoke Informative Visual per Pillar (Layman-Friendly) with 3D Slanted Scroll */}
              <div className="lg:col-span-5">
                <SlantedScrollCard
                  intensity="moderate"
                  direction="left"
                  straightenOnScroll={false}
                  hoverTilt={true}
                  className="h-full"
                >
                  <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/80 dark:border-neutral-700/60 flex flex-col justify-between h-full shadow-lg">
                    {/* 1. Learning Hub Visual */}
                    {activePillar.id === 'learning-hub' && (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                            <FiBookOpen className="text-primary-500" />
                            <span>How You Learn Here</span>
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            High Success Rate
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
                              <span>Learn by Doing Real Projects</span>
                              <span className="text-primary-500 font-bold">92%</span>
                            </div>
                            <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                              <div className="bg-primary-500 h-2 rounded-full w-[92%]" />
                            </div>
                          </div>

                          <div className="p-3.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <div className="flex justify-between text-xs font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
                              <span>Short & Clear 5-Min Lessons</span>
                              <span className="text-amber-500 font-bold">88%</span>
                            </div>
                            <div className="w-full bg-neutral-100 dark:bg-neutral-800 rounded-full h-2 overflow-hidden">
                              <div className="bg-amber-500 h-2 rounded-full w-[88%]" />
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 pt-2 text-center">
                            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                              <div className="text-base font-bold text-neutral-900 dark:text-white">12</div>
                              <div className="text-[10px] text-neutral-400">Main Tracks</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                              <div className="text-base font-bold text-neutral-900 dark:text-white">40+</div>
                              <div className="text-[10px] text-neutral-400">Quick Labs</div>
                            </div>
                            <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                              <div className="text-base font-bold text-primary-500">4.9★</div>
                              <div className="text-[10px] text-neutral-400">Student Rating</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 2. Digital Products Suite Visual */}
                    {activePillar.id === 'digital-products' && (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                            <FiLayers className="text-violet-500" />
                            <span>Apps Connected Together</span>
                          </span>
                          <span className="text-[11px] font-semibold text-violet-600 bg-violet-50 dark:bg-violet-950/60 px-2 py-0.5 rounded-full border border-violet-500/20">
                            One Login
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/30 text-center">
                            <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                              MatriX (Your Main Workplace)
                            </span>
                            <div className="text-[10px] text-neutral-500">Everything connects back here smoothly</div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 font-medium">
                              <div className="text-amber-500 font-bold">ULO</div>
                              <div className="text-[9px] text-neutral-400">Daily Tools</div>
                            </div>
                            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 font-medium">
                              <div className="text-cyan-500 font-bold">BuzX</div>
                              <div className="text-[9px] text-neutral-400">Sales Helper</div>
                            </div>
                            <div className="p-2 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 font-medium">
                              <div className="text-emerald-500 font-bold">GrantX</div>
                              <div className="text-[9px] text-neutral-400">Grant Finder</div>
                            </div>
                          </div>

                          <div className="p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
                            <span className="text-neutral-500">Automatic Sync</span>
                            <span className="font-semibold text-emerald-500">Never retype your data</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 3. Creative Skills Visual */}
                    {activePillar.id === 'creative-skills' && (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                            <FiFeather className="text-amber-500" />
                            <span>4 Steps to Great Ideas</span>
                          </span>
                          <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-500/20">
                            Simple Steps
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2.5 text-xs">
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <span className="text-amber-500 font-bold text-[11px]">1. Listen</span>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Find out what people truly need</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <span className="text-primary-500 font-bold text-[11px]">2. Brainstorm</span>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Come up with lots of fun ideas</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <span className="text-violet-500 font-bold text-[11px]">3. Make a Sample</span>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Build a quick, simple sketch</p>
                          </div>
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <span className="text-emerald-500 font-bold text-[11px]">4. Test It</span>
                            <p className="text-[10px] text-neutral-500 mt-0.5">Get feedback from real users</p>
                          </div>
                        </div>

                        <div className="mt-3 p-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-[11px] text-neutral-500">
                          <span>Creative Confidence</span>
                          <span className="font-semibold text-neutral-800 dark:text-neutral-200">Anyone can do it</span>
                        </div>
                      </div>
                    )}

                    {/* 4. Digital Skills & AI Visual */}
                    {activePillar.id === 'digital-skills' && (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                            <FiCpu className="text-cyan-500" />
                            <span>How Smart Automation Works</span>
                          </span>
                          <span className="text-[11px] font-semibold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 px-2 py-0.5 rounded-full border border-cyan-500/20">
                            Saves Hours
                          </span>
                        </div>

                        <div className="space-y-2.5">
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
                              <span className="font-medium text-neutral-800 dark:text-neutral-200">1. Customer Inquires</span>
                            </div>
                            <span className="text-[11px] text-neutral-400">Instant</span>
                          </div>

                          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <FiZap className="text-cyan-500 w-3.5 h-3.5" />
                              <span className="font-bold text-cyan-600 dark:text-cyan-400">2. AI Prepares the Answer</span>
                            </div>
                            <span className="text-[11px] text-cyan-600 dark:text-cyan-400">Automatic</span>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <FiCheckCircle className="text-emerald-500 w-3.5 h-3.5" />
                              <span className="font-medium text-neutral-800 dark:text-neutral-200">3. Sale is Closed</span>
                            </div>
                            <span className="text-[11px] font-bold text-emerald-600">Saved 24h/week</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. Enterprise Development Center Visual */}
                    {activePillar.id === 'enterprise-center' && (
                      <div>
                        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200/60 dark:border-neutral-700/60">
                          <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200 uppercase tracking-wider flex items-center space-x-1.5">
                            <FiTrendingUp className="text-emerald-500" />
                            <span>Two Ways to Launch</span>
                          </span>
                          <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            2 Paths
                          </span>
                        </div>

                        <div className="space-y-2.5 text-xs">
                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <div className="flex justify-between font-bold text-neutral-900 dark:text-white mb-1">
                              <span>Division 1: Early Stage</span>
                              <span className="text-amber-500 font-mono">Stage 1-2</span>
                            </div>
                            <p className="text-[11px] text-neutral-500">Build your first simple version and get your first 100 users.</p>
                          </div>

                          <div className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800">
                            <div className="flex justify-between font-bold text-neutral-900 dark:text-white mb-1">
                              <span>Division 2: Growth Stage</span>
                              <span className="text-emerald-500 font-mono">Stage 3</span>
                            </div>
                            <p className="text-[11px] text-neutral-500">Apply for grants with GrantX, hire help, and scale your sales.</p>
                          </div>

                          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-[11px]">
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Friendly Weekly Mentorship</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">Step-by-step</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Informative Footer Tag */}
                    <div className="mt-4 pt-3 border-t border-neutral-200/60 dark:border-neutral-700/60 flex items-center justify-between text-[11px] text-neutral-400">
                      <span className="flex items-center space-x-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse" />
                        <span>Connected by Gamification</span>
                      </span>
                      <span>Earn Points as You Grow</span>
                    </div>
                  </div>
                </SlantedScrollCard>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default PillarsSection
