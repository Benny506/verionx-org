import type { SEOProps } from '../components/SEO'

export const SEO_CONFIG: Record<'home' | 'about' | 'contact', SEOProps> = {
  home: {
    title: 'VerionX — Ecosystem of 14 Live Applications & Venture Launchpad',
    description:
      'VerionX is an ecosystem of 14 specialized applications spanning AI agent engineering (UloX, ZeusX), crop computer vision (RadX), healthcare (OmegaX), mathematics (CalX), and finance operations (FinX, BuzX, GrantX).',
    keywords:
      'VerionX, UloX, RadX, OmegaX, ZeusX, BuzX, TraweX, MarketX, CalX, BiblioX, ResearchX, GrantX, LearnX, MatriX, FinX, AI agent trainer, crop disease diagnosis, non-repayable grants, SOX closing, prompt engineering',
    url: '/',
    type: 'website',
  },
  about: {
    title: 'About Us — 14 Specialized Applications & Venture Ecosystem',
    description:
      'Discover how VerionX is engineering 14 connected software applications to make tech skills, artificial intelligence, healthcare, and enterprise venture scale accessible.',
    keywords:
      'About VerionX, AI agents, agricultural computer vision, startup incubator, non-dilutive grants, venture ecosystem',
    url: '/about',
    type: 'website',
  },
  contact: {
    title: 'Contact Us — Say Hello to the VerionX Team',
    description:
      'Get in touch with the VerionX team. We are here to answer your questions about our apps, skills lessons, or startup launchpad.',
    keywords:
      'Contact VerionX, email support, join community chat, startup help desk',
    url: '/contact',
    type: 'website',
  },
}
