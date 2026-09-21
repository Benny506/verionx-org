import React from 'react'
import { Helmet } from 'react-helmet-async'

export interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  canonical?: string
  children?: React.ReactNode
}

const DEFAULT_TITLE = 'VerionX — Empowering Skills, Digital Products & Enterprise Growth'
const DEFAULT_DESCRIPTION =
  'VerionX is an innovation ecosystem connecting a learning hub, cutting-edge digital products (ULO, MatriX, CasaX & more), creative and digital skills, and gamified enterprise growth.'
const DEFAULT_IMAGE = 'https://verionx.org/logo-wordmark.svg'
const BASE_URL = 'https://verionx.org'

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = 'VerionX, digital products, learning hub, creative skills, digital skills, business automation, gamification, ULO, MatriX, enterprise development',
  image = DEFAULT_IMAGE,
  url = BASE_URL,
  type = 'website',
  canonical,
  children,
}) => {
  const fullTitle = title
    ? title.includes('VerionX')
      ? title
      : `${title} | VerionX`
    : DEFAULT_TITLE

  const currentUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`
  const canonicalUrl = canonical || currentUrl
  const ogImageUrl = image.startsWith('http') ? image : `${BASE_URL}${image}`

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="VerionX" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />

      {children}
    </Helmet>
  )
}

export default SEO
