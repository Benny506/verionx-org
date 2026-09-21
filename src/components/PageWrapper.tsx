import React from 'react'
import { motion } from 'framer-motion'
import SEO from './SEO'
import type { SEOProps } from './SEO'

export interface PageWrapperProps {
  seo?: SEOProps
  className?: string
  children: React.ReactNode
  animate?: boolean
}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  seo,
  className = '',
  children,
  animate = true,
}) => {
  return (
    <>
      <SEO {...seo} />
      {animate ? (
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className={`w-full min-h-screen ${className}`}
        >
          {children}
        </motion.main>
      ) : (
        <main className={`w-full min-h-screen ${className}`}>
          {children}
        </main>
      )}
    </>
  )
}

export default PageWrapper
