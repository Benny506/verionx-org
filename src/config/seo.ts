import type { SEOProps } from '../components/SEO'

export const SEO_CONFIG: Record<'home' | 'about' | 'contact', SEOProps> = {
  home: {
    title: 'VerionX — Learn Skills, Use Helpful Apps & Build Your Business',
    description:
      'VerionX is a fun platform where you can learn practical tech skills, use smart everyday software apps (ULO, MatriX, CasaX & more), and get help starting your business while earning points and rewards.',
    keywords:
      'VerionX, simple software tools, learn tech skills, creative brainstorming, small business help, startup grants, gamified learning, ULO, MatriX, CasaX, BuzX, MarketX, GrantX',
    url: '/',
    type: 'website',
  },
  about: {
    title: 'About Us — Learn, Build & Grow with VerionX',
    description:
      'Discover how VerionX makes learning tech and building a business simple, fun, and rewarding with short lessons, everyday apps, and startup support.',
    keywords:
      'About VerionX, learn practical skills, business launchpad, friendly tech tools, startup guidance',
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
