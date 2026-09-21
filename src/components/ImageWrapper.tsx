import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiImage } from 'react-icons/fi'

export interface ImageWrapperProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt: string
  aspectRatio?: string // e.g., '16/9', '4/3', '1/1', 'auto'
  className?: string
  imgClassName?: string
  fallbackText?: string
  shimmerClassName?: string
  rounded?: string
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({
  src,
  alt,
  aspectRatio = 'auto',
  className = '',
  imgClassName = '',
  fallbackText,
  shimmerClassName = '',
  rounded = 'rounded-xl',
  loading = 'lazy',
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [hasError, setHasError] = useState<boolean>(!src)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true)
    setHasError(false)
    if (onLoad) onLoad(e)
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(false)
    setHasError(true)
    if (onError) onError(e)
  }

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{ aspectRatio: aspectRatio !== 'auto' ? aspectRatio : undefined }}
    >
      {/* Shimmer Placeholder (Displays while downloading/loading) */}
      <AnimatePresence>
        {!isLoaded && !hasError && (
          <motion.div
            key="shimmer-placeholder"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`absolute inset-0 w-full h-full shimmer-container ${shimmerClassName} flex items-center justify-center`}
          >
            <div className="shimmer-wave" />
            <FiImage className="w-8 h-8 text-neutral-300 dark:text-neutral-700 opacity-60 relative z-10 animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error / Fallback State */}
      {hasError && (
        <div className="absolute inset-0 w-full h-full bg-neutral-100 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/50 flex flex-col items-center justify-center p-4 text-center">
          <FiImage className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mb-1" />
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
            {fallbackText || alt || 'Image placeholder'}
          </span>
        </div>
      )}

      {/* Main Image */}
      {src && (
        <img
          src={src}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full object-cover transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  )
}

export default ImageWrapper
