import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

export interface SlantedScrollCardProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  /**
   * Angle intensity presets or custom degrees
   * 'subtle': ~6-8 deg
   * 'moderate': ~12-14 deg
   * 'dramatic': ~18-22 deg
   */
  intensity?: 'subtle' | 'moderate' | 'dramatic'
  /**
   * Slant direction
   * 'left': tilts back-left
   * 'right': tilts back-right
   * 'center': tilts along X axis (laid back)
   */
  direction?: 'left' | 'right' | 'center'
  /**
   * Whether the card automatically straightens up as it scrolls into the center of the viewport
   */
  straightenOnScroll?: boolean
  /**
   * Enable 3D interactive mouse tilt on hover
   */
  hoverTilt?: boolean
}

export const SlantedScrollCard: React.FC<SlantedScrollCardProps> = ({
  children,
  className = '',
  innerClassName = '',
  intensity = 'moderate',
  direction = 'left',
  straightenOnScroll = true,
  hoverTilt = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)

  // Configure initial rotation angles based on intensity
  const angleMultiplier = intensity === 'subtle' ? 6 : intensity === 'dramatic' ? 18 : 12

  const initialRotateX = angleMultiplier
  const initialRotateY = direction === 'left' ? -angleMultiplier * 0.8 : direction === 'right' ? angleMultiplier * 0.8 : 0
  const initialRotateZ = direction === 'left' ? 2 : direction === 'right' ? -2 : 0

  // Track element scroll position relative to viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  })

  // Smooth springs for buttery smooth 3D restoration on scroll
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [initialRotateX, 0])
  const rawRotateY = useTransform(scrollYProgress, [0, 1], [initialRotateY, 0])
  const rawRotateZ = useTransform(scrollYProgress, [0, 1], [initialRotateZ, 0])
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.96, 1])

  const springConfig = { stiffness: 90, damping: 22, restDelta: 0.001 }
  const springRotateX = useSpring(rawRotateX, springConfig)
  const springRotateY = useSpring(rawRotateY, springConfig)
  const springRotateZ = useSpring(rawRotateZ, springConfig)
  const springScale = useSpring(rawScale, springConfig)

  const finalRotateX = straightenOnScroll ? springRotateX : initialRotateX
  const finalRotateY = straightenOnScroll ? springRotateY : initialRotateY
  const finalRotateZ = straightenOnScroll ? springRotateZ : initialRotateZ
  const finalScale = straightenOnScroll ? springScale : 1

  return (
    <div
      ref={cardRef}
      className={`relative [perspective:1200px] ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX: finalRotateX,
          rotateY: finalRotateY,
          rotateZ: finalRotateZ,
          scale: finalScale,
          transformStyle: 'preserve-3d',
        }}
        whileHover={
          hoverTilt
            ? {
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1.02,
                transition: { duration: 0.35, ease: 'easeOut' },
              }
            : undefined
        }
        className={`w-full h-full transition-shadow duration-500 [transform-style:preserve-3d] ${innerClassName}`}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default SlantedScrollCard
