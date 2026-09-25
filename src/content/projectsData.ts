import React from 'react'
import {
  FiCpu,
  FiZap,
  FiActivity,
  FiTerminal,
  FiPieChart,
  FiNavigation,
  FiShoppingBag,
  FiAward,
  FiBookOpen,
  FiSearch,
  FiGift,
  FiCompass,
  FiGrid,
  FiDollarSign,
} from 'react-icons/fi'
import logoIcon from '../assets/logos/logo-icon.svg'

export type ProductCategory =
  | 'All'
  | 'AI & Developer'
  | 'Commerce & Finance'
  | 'Health & AgriTech'
  | 'Learning & Strategy'

export interface ProjectItem {
  id: string
  name: string
  category: ProductCategory
  categoryLabel: string
  tagline: string
  headline: string
  description: string
  detailedFeatures: string[]
  liveUrl: string
  primaryColor: string // hex code
  themeClass: {
    text: string
    bgLight: string
    border: string
    badgeBg: string
    badgeText: string
    glow: string
    gradient: string
  }
  isOfficialLogo?: boolean
  logoSrc?: string
  icon: React.ComponentType<{ className?: string }>
  badge: string
  gamificationPerk: string
  gamificationBadge: string
  statsMetric: {
    label: string
    value: string
  }
}

export const ECOSYSTEM_PROJECTS: ProjectItem[] = [
  {
    id: 'ulox',
    name: 'UloX',
    category: 'AI & Developer',
    categoryLabel: 'AI & Engineering',
    tagline: 'Visual AI Agent Engineering Trainer',
    headline: 'Build, evaluate, and deploy multi-agent systems with live visual feedback.',
    description:
      'UloX teaches you how to design real autonomous AI agents from scratch. Connect visual workflow nodes, inspect prompt reasoning, and test decision reliability with built-in evaluation bars.',
    detailedFeatures: [
      'Interactive Multi-Agent Graph Canvas & Visual Node Builder',
      'Real-time Decision Evaluation & Prompt Reliability Scores',
      'Multi-Level Training Curriculum from Novice to Autonomous Architect',
      'Instant One-Click Sandbox Simulation & Graph Execution',
    ],
    liveUrl: 'https://ulox-by-verionx-2wh3u8.v2.appdeploy.ai/',
    primaryColor: '#10B981',
    themeClass: {
      text: 'text-emerald-500',
      bgLight: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeText: 'text-emerald-600 dark:text-emerald-400',
      glow: 'rgba(16, 185, 129, 0.22)',
      gradient: 'from-emerald-500 to-teal-600',
    },
    isOfficialLogo: true,
    logoSrc: logoIcon,
    icon: FiCpu,
    badge: 'AI Trainer',
    gamificationPerk: 'Agent Architect Protocol • Earn +250 XP for building your first agent loop',
    gamificationBadge: 'Agent Master 🤖',
    statsMetric: {
      label: 'Agent Graphs Built',
      value: '4,800+',
    },
  },
  {
    id: 'radx',
    name: 'RadX',
    category: 'Health & AgriTech',
    categoryLabel: 'AgriTech Intelligence',
    tagline: 'Cassava Plant Disease & Crop Vision',
    headline: 'Snap a crop photo to instantly identify plant diseases and get a step-by-step treatment plan.',
    description:
      'RadX puts an expert crop doctor in every farmer’s pocket. Using computer vision, it scans cassava leaves for Mosaic Disease, Brown Streak, and Blight, providing clear weekly care schedules.',
    detailedFeatures: [
      'Instant Crop Photo Leaf Diagnosis with 96%+ Accuracy',
      'Pest & Pathogen Identification with Clear Severity Indicators',
      'Step-by-Step Weekly Treatment & Organic Recovery Schedules',
      'Farmer-Friendly Advice without Confusing Chemical Jargon',
    ],
    liveUrl: 'https://radx-c0ik3s.v2.appdeploy.ai/',
    primaryColor: '#22C55E',
    themeClass: {
      text: 'text-green-500',
      bgLight: 'bg-green-500/10',
      border: 'border-green-500/30',
      badgeBg: 'bg-green-50 dark:bg-green-950/60',
      badgeText: 'text-green-600 dark:text-green-400',
      glow: 'rgba(34, 197, 94, 0.22)',
      gradient: 'from-green-500 to-emerald-600',
    },
    icon: FiZap,
    badge: 'Crop Vision',
    gamificationPerk: 'Harvest Guardian Badge • Earn +150 XP on your first leaf diagnosis',
    gamificationBadge: 'Green Thumb 🌿',
    statsMetric: {
      label: 'Leaves Diagnosed',
      value: '12,500+',
    },
  },
  {
    id: 'omegax',
    name: 'OmegaX',
    category: 'Health & AgriTech',
    categoryLabel: 'Smart Healthcare',
    tagline: 'Healthcare Hub & Anti-Counterfeit Drug Scanner',
    headline: 'Verify medicine authenticity, book verified telehealth doctors, and locate nearby clinics.',
    description:
      'OmegaX safeguards community health. Scan prescription medication packaging to detect counterfeit drugs instantly, consult licensed healthcare professionals online, and view emergency health facilities.',
    detailedFeatures: [
      'Barcode & NAFDAC/FDA Anti-Counterfeit Medicine Scanner',
      'Telehealth Video Consultations with Licensed Practitioners',
      'Interactive Hospital & Emergency Pharmacy GPS Mapping',
      'Encrypted Personal Health Records & Prescription Tracker',
    ],
    liveUrl: 'https://d4cbcf0597554d0780.v2.appdeploy.ai/',
    primaryColor: '#6366F1',
    themeClass: {
      text: 'text-indigo-500',
      bgLight: 'bg-indigo-500/10',
      border: 'border-indigo-500/30',
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/60',
      badgeText: 'text-indigo-600 dark:text-indigo-400',
      glow: 'rgba(99, 102, 241, 0.22)',
      gradient: 'from-indigo-500 to-blue-600',
    },
    icon: FiActivity,
    badge: 'Health Guardian',
    gamificationPerk: 'Safety Shield • Earn +200 XP for completing a medication safety audit',
    gamificationBadge: 'Health Shield 🛡️',
    statsMetric: {
      label: 'Medications Verified',
      value: '28,000+',
    },
  },
  {
    id: 'zeusx',
    name: 'ZeusX',
    category: 'AI & Developer',
    categoryLabel: 'Prompt Engineering',
    tagline: 'AI Prompt Engineering Studio & Catalog',
    headline: 'Supercharge your AI outputs with 1,000+ battle-tested prompts and token analytics.',
    description:
      'ZeusX is a collaborative IDE for prompt engineers. Explore curated prompt templates across coding, business writing, and marketing, fork prompts to experiment, and measure token latency in real time.',
    detailedFeatures: [
      'Categorized Library of 1,000+ Production-Ready AI Prompts',
      'Live Playground with Multi-Model Parameter & Token Benchmarks',
      'One-Click Prompt Forking, Version Control & Team Sharing',
      'Interactive Prompt Optimization Assistant & System Role Tuner',
    ],
    liveUrl: 'https://ded4ae22055948128b.v2.appdeploy.ai/',
    primaryColor: '#8B5CF6',
    themeClass: {
      text: 'text-violet-500',
      bgLight: 'bg-violet-500/10',
      border: 'border-violet-500/30',
      badgeBg: 'bg-violet-50 dark:bg-violet-950/60',
      badgeText: 'text-violet-600 dark:text-violet-400',
      glow: 'rgba(139, 92, 246, 0.22)',
      gradient: 'from-violet-500 to-purple-600',
    },
    icon: FiTerminal,
    badge: 'Prompt IDE',
    gamificationPerk: 'Master Prompter Tier • Earn +175 XP on prompt template publication',
    gamificationBadge: 'Prompt Wizard ⚡',
    statsMetric: {
      label: 'Prompts Curated',
      value: '1,200+',
    },
  },
  {
    id: 'buzx',
    name: 'BuzX',
    category: 'Commerce & Finance',
    categoryLabel: 'Business Modeling',
    tagline: 'Unit Economics & Financial Shock-Testing',
    headline: 'Model revenue scenarios, stress-test margins, and generate clean invoices.',
    description:
      'BuzX gives founders clarity over their numbers. Simulate how customer acquisition costs, pricing changes, and market shocks impact your runway before taking risky business decisions.',
    detailedFeatures: [
      'Interactive Unit Economics & Profit Margin Stress Tester',
      'Cash Flow Runway Simulator & Market Shock Sensitivity Graphs',
      'Professional Invoice & Quote Generator with Client Tracking',
      'Automated Financial KPI Dashboards for Investor Readiness',
    ],
    liveUrl: 'https://buzx-hi37w5.v2.appdeploy.ai/',
    primaryColor: '#06B6D4',
    themeClass: {
      text: 'text-cyan-500',
      bgLight: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      badgeBg: 'bg-cyan-50 dark:bg-cyan-950/60',
      badgeText: 'text-cyan-600 dark:text-cyan-400',
      glow: 'rgba(6, 182, 212, 0.22)',
      gradient: 'from-cyan-500 to-blue-500',
    },
    icon: FiPieChart,
    badge: 'Financial Intelligence',
    gamificationPerk: 'CFO Milestone • Earn +220 XP on completing your 3-year cash flow model',
    gamificationBadge: 'Venture Architect 📊',
    statsMetric: {
      label: 'Models Simulated',
      value: '6,400+',
    },
  },
  {
    id: 'trawex',
    name: 'TraweX',
    category: 'Learning & Strategy',
    categoryLabel: 'Mobility & Weather',
    tagline: 'Traffic Congestion & Weather Departure Predictor',
    headline: 'Know the optimal time to leave home by combining live road congestion and rainfall forecasts.',
    description:
      'TraweX synchronizes real-time satellite weather radars and city traffic flow into a single predictive engine. Get automated alerts before downpours cause gridlock on your daily commute.',
    detailedFeatures: [
      'Live Radar Precipitation & Flood Hazard Heatmaps',
      'Real-Time Road Congestion & Bottleneck Analysis',
      'Intelligent "Best Time to Leave" Commute Recommendation',
      'Route Hazard & Rain Incident Community Reporting',
    ],
    liveUrl: 'https://trawex-3yzmgb.v2.appdeploy.ai/#/live',
    primaryColor: '#F59E0B',
    themeClass: {
      text: 'text-amber-500',
      bgLight: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      badgeBg: 'bg-amber-50 dark:bg-amber-950/60',
      badgeText: 'text-amber-600 dark:text-amber-400',
      glow: 'rgba(245, 158, 11, 0.22)',
      gradient: 'from-amber-500 to-orange-500',
    },
    icon: FiNavigation,
    badge: 'Commute Intelligence',
    gamificationPerk: 'Master Navigator • Earn +100 XP for finding a 30-minute faster route',
    gamificationBadge: 'Road Scout 🚗',
    statsMetric: {
      label: 'Commutes Optimized',
      value: '18,900+',
    },
  },
  {
    id: 'marketx',
    name: 'MarketX',
    category: 'Commerce & Finance',
    categoryLabel: 'Creator Storefront',
    tagline: 'Instant Creator Storefront & Digital Marketplace',
    headline: 'Build a high-converting digital storefront and sell physical & digital goods in minutes.',
    description:
      'MarketX empowers makers and merchants to create branded storefronts without technical complexity. Accept local and international payments, manage inventories, and deliver instant digital downloads.',
    detailedFeatures: [
      'Instant Branded Storefront Builder with Zero Code Required',
      'Automated Digital File & License Key Delivery System',
      'Multi-Currency Payment Processing & Instant Local Payouts',
      'Built-in Abandoned Cart Recovery & Affiliate Marketing Tools',
    ],
    liveUrl: 'https://marketx-qioxsn.v2.appdeploy.ai/',
    primaryColor: '#EB1C25',
    themeClass: {
      text: 'text-primary-500',
      bgLight: 'bg-primary-500/10',
      border: 'border-primary-500/30',
      badgeBg: 'bg-primary-50 dark:bg-primary-950/60',
      badgeText: 'text-primary-600 dark:text-primary-400',
      glow: 'rgba(235, 28, 37, 0.22)',
      gradient: 'from-primary-500 to-rose-600',
    },
    icon: FiShoppingBag,
    badge: 'Creator Commerce',
    gamificationPerk: 'Merchant First Sale • Earn +300 XP when launching your live storefront',
    gamificationBadge: 'Storefront Pro 🛍️',
    statsMetric: {
      label: 'Storefronts Created',
      value: '3,100+',
    },
  },
  {
    id: 'calx',
    name: 'CalX',
    category: 'Learning & Strategy',
    categoryLabel: 'Competitive Math',
    tagline: 'Interactive Math Duels & Curriculum Mastery',
    headline: 'Master mathematics through rated 1v1 multiplayer duels, puzzles, and structured grade curricula.',
    description:
      'CalX transforms math from daunting equations into an exhilarating competitive game. Challenge friends or global opponents to timed calculations, unlock trophies, and master topics from basic algebra to calculus.',
    detailedFeatures: [
      'Real-Time Multiplayer 1v1 Speed Math Battle Arena',
      'Structured Grade Curricula from Primary School to Senior Secondary',
      'Global ELO Rating Leaderboard & Weekly Tournament Cups',
      'Interactive Logic Puzzles & Step-by-Step Problem Solver',
    ],
    liveUrl: 'https://calx-z5alyu.v2.appdeploy.ai/',
    primaryColor: '#EAB308',
    themeClass: {
      text: 'text-yellow-500',
      bgLight: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      badgeBg: 'bg-yellow-50 dark:bg-yellow-950/60',
      badgeText: 'text-yellow-600 dark:text-yellow-400',
      glow: 'rgba(234, 179, 8, 0.22)',
      gradient: 'from-yellow-500 to-amber-500',
    },
    icon: FiAward,
    badge: 'Math Duels',
    gamificationPerk: 'Grandmaster Duelist • Earn +250 XP for winning a 5-match win streak',
    gamificationBadge: 'Math Champion 🏆',
    statsMetric: {
      label: 'Duels Played',
      value: '84,000+',
    },
  },
  {
    id: 'bibliox',
    name: 'BiblioX',
    category: 'Learning & Strategy',
    categoryLabel: 'Scripture & Life Guidance',
    tagline: 'Life-Context Scripture Study & Devotionals',
    headline: 'Ask real life questions and discover relevant Biblical wisdom and guided devotionals.',
    description:
      'BiblioX bridges sacred scriptures with modern daily challenges. Search topics like anxiety, career decisions, leadership, or relationships to receive curated verses, historical context, and reflection prompts.',
    detailedFeatures: [
      'Life-Context Semantic Search across Canonical Translations',
      'Daily Guided Reflection Journals with Progress Tracking',
      'Parallel Translation View with Greek & Hebrew Lexicons',
      'Custom Devotional Reading Plans for Communities & Individuals',
    ],
    liveUrl: 'https://bibliox-ybasra.v2.appdeploy.ai/#/',
    primaryColor: '#3B82F6',
    themeClass: {
      text: 'text-blue-500',
      bgLight: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      badgeBg: 'bg-blue-50 dark:bg-blue-950/60',
      badgeText: 'text-blue-600 dark:text-blue-400',
      glow: 'rgba(59, 130, 246, 0.22)',
      gradient: 'from-blue-600 to-indigo-700',
    },
    icon: FiBookOpen,
    badge: 'Wisdom & Devotion',
    gamificationPerk: 'Wisdom Seeker • Earn +120 XP for completing a 7-day devotional habit',
    gamificationBadge: 'Scholar of Wisdom 📖',
    statsMetric: {
      label: 'Devotionals Read',
      value: '42,000+',
    },
  },
  {
    id: 'researchx',
    name: 'ResearchX',
    category: 'Learning & Strategy',
    categoryLabel: 'Academic Intelligence',
    tagline: 'Collaborative Research Hub & AI Analyzer',
    headline: 'Accelerate academic literature reviews, manage citations, and verify research integrity.',
    description:
      'ResearchX is the workstation for modern scholars. Synthesize peer-reviewed papers in seconds, manage bibliography references in BibTeX, and run automated methodology integrity audits on drafts.',
    detailedFeatures: [
      'AI Literature Review Synthesizer across 50M+ Open Access Papers',
      'Smart Citation & Reference Manager with BibTeX & APA Export',
      'Methodology & Claim Plagiarism Integrity Analyzer',
      'Real-Time Collaborative Multi-Author Research Notebooks',
    ],
    liveUrl: 'https://researchx-e9bh8n.v2.appdeploy.ai/',
    primaryColor: '#9333EA',
    themeClass: {
      text: 'text-purple-500',
      bgLight: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      badgeBg: 'bg-purple-50 dark:bg-purple-950/60',
      badgeText: 'text-purple-600 dark:text-purple-400',
      glow: 'rgba(147, 51, 234, 0.22)',
      gradient: 'from-purple-500 to-violet-600',
    },
    icon: FiSearch,
    badge: 'Academic Research',
    gamificationPerk: 'Published Scholar • Earn +280 XP upon completing your first synthesis report',
    gamificationBadge: 'Lead Researcher 🔬',
    statsMetric: {
      label: 'Papers Synthesized',
      value: '19,500+',
    },
  },
  {
    id: 'grantx',
    name: 'GrantX',
    category: 'Commerce & Finance',
    categoryLabel: 'Funding Desk',
    tagline: 'African & Global Non-Repayable Grant Discovery Desk',
    headline: 'Discover verified non-repayable grants and generate winning proposals with AI.',
    description:
      'GrantX opens doors to capital for visionary entrepreneurs. Search a vetted database of global grants and competitions, evaluate eligibility criteria, and use AI to tailor winning grant applications.',
    detailedFeatures: [
      'Curated Directory of Non-Repayable Startup & NGO Grants',
      'Automated Eligibility Matching & Deadline Alert Calendar',
      'AI-Powered Grant Proposal & Budget Narrative Generator',
      'Past Winning Proposal Examples & Reviewer Scorecards',
    ],
    liveUrl: 'https://grantx-i2lh1b.v2.appdeploy.ai',
    primaryColor: '#14B8A6',
    themeClass: {
      text: 'text-teal-500',
      bgLight: 'bg-teal-500/10',
      border: 'border-teal-500/30',
      badgeBg: 'bg-teal-50 dark:bg-teal-950/60',
      badgeText: 'text-teal-600 dark:text-teal-400',
      glow: 'rgba(20, 184, 166, 0.22)',
      gradient: 'from-teal-500 to-emerald-600',
    },
    icon: FiGift,
    badge: 'Grants & Funding',
    gamificationPerk: 'Grant Hunter • Earn +300 XP on submitting a matched grant proposal',
    gamificationBadge: 'Grant Winner 💰',
    statsMetric: {
      label: 'Grant Capital Tracked',
      value: '$4.2M+',
    },
  },
  {
    id: 'learnx',
    name: 'LearnX',
    category: 'Learning & Strategy',
    categoryLabel: 'Signal Intelligence',
    tagline: 'High-Signal Knowledge & Opportunity Mining',
    headline: 'Filter noise, distill world-class insights, and consult the AI Council of Great Minds.',
    description:
      'LearnX extracts actionable signal from information overload. Read concise mental model summaries, discover emerging tech opportunities, and prompt an AI advisory board modeled after world thinkers.',
    detailedFeatures: [
      'High-Signal Daily Intelligence Feed & Noise Reduction Filter',
      'Simulated Advisory "Council of Great Minds" Consultation Desk',
      'Curated Mental Model Decks for Accelerated Strategic Thinking',
      'Emerging Technology Trend Radar & Career Opportunity Signals',
    ],
    liveUrl: 'https://learnx-3anj39.v2.appdeploy.ai/',
    primaryColor: '#0EA5E9',
    themeClass: {
      text: 'text-sky-500',
      bgLight: 'bg-sky-500/10',
      border: 'border-sky-500/30',
      badgeBg: 'bg-sky-50 dark:bg-sky-950/60',
      badgeText: 'text-sky-600 dark:text-sky-400',
      glow: 'rgba(14, 165, 233, 0.22)',
      gradient: 'from-sky-500 to-cyan-600',
    },
    icon: FiCompass,
    badge: 'Knowledge Signal',
    gamificationPerk: 'Signal Seeker • Earn +140 XP on completing a daily mental model sprint',
    gamificationBadge: 'Deep Thinker 💡',
    statsMetric: {
      label: 'Signals Extracted',
      value: '50,000+',
    },
  },
  {
    id: 'matrix',
    name: 'MatriX',
    category: 'Learning & Strategy',
    categoryLabel: 'Strategic Gaming',
    tagline: 'Spatial Coordinate Strategy Board Game',
    headline: 'Outmaneuver opponents in a tactical board game powered by spatial coordinate geometry.',
    description:
      'MatriX challenges your tactical foresight. Place nodes, control zones, and calculate geometric paths on an interactive coordinate grid to capture territory against smart AI bots or live opponents.',
    detailedFeatures: [
      'Interactive 2D/3D Coordinate Grid Strategy Battlefield',
      'Multi-Level Single Player Tactical Campaigns against Adaptive AI',
      'Real-Time Multiplayer Ranked Matches & Matchmaking System',
      'Spatial Geometry & Graph Theory Skill Progression Path',
    ],
    liveUrl: 'https://matrix-8cmld0.v2.appdeploy.ai/',
    primaryColor: '#7C3AED',
    themeClass: {
      text: 'text-violet-600',
      bgLight: 'bg-violet-600/10',
      border: 'border-violet-600/30',
      badgeBg: 'bg-violet-50 dark:bg-violet-950/60',
      badgeText: 'text-violet-600 dark:text-violet-300',
      glow: 'rgba(124, 58, 237, 0.22)',
      gradient: 'from-violet-600 to-purple-700',
    },
    icon: FiGrid,
    badge: 'Spatial Strategy',
    gamificationPerk: 'Grand Tactician • Earn +220 XP for conquering Level 10 Territory Campaign',
    gamificationBadge: 'Coordinate Master ♟️',
    statsMetric: {
      label: 'Matches Played',
      value: '31,000+',
    },
  },
  {
    id: 'finx',
    name: 'FinX',
    category: 'Commerce & Finance',
    categoryLabel: 'Finance Operations',
    tagline: 'Enterprise Financial Close & SOX Accounting',
    headline: 'Automate journal entries, streamline balance sheet reconciliations, and accelerate monthly close.',
    description:
      'FinX replaces tedious month-end spreadsheet chaos with automated financial closing workflows. Reconcile ledger accounts, flag balance variances, and maintain audit-ready SOX compliance.',
    detailedFeatures: [
      'Automated Month-End Close Checklist & Account Reconciliations',
      'Real-Time Variance & Financial Anomaly Detection Algorithms',
      'Audit-Ready SOX Compliance Trails & Dual Approval Controls',
      'Multi-Entity Consolidated Balance Sheet & P&L Reporting',
    ],
    liveUrl: 'https://finx-c44to2.v2.appdeploy.ai/',
    primaryColor: '#059669',
    themeClass: {
      text: 'text-emerald-600',
      bgLight: 'bg-emerald-600/10',
      border: 'border-emerald-600/30',
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeText: 'text-emerald-700 dark:text-emerald-300',
      glow: 'rgba(5, 150, 105, 0.22)',
      gradient: 'from-emerald-600 to-green-700',
    },
    icon: FiDollarSign,
    badge: 'Finance Operations',
    gamificationPerk: 'Audit Perfectionist • Earn +320 XP on closing books 3 days ahead of schedule',
    gamificationBadge: 'Finance Maestro 📈',
    statsMetric: {
      label: 'Entries Reconciled',
      value: '140,000+',
    },
  },
]
