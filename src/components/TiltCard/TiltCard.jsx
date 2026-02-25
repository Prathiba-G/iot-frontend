import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import styles from './TiltCard.module.css'

const spring = { stiffness: 300, damping: 25 }

export default function TiltCard({ children, className = '' }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const [isHovering, setHovering] = useState(false)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), spring)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), spring)

  const handleMove = (e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const relX = (e.clientX - centerX) / rect.width
    const relY = (e.clientY - centerY) / rect.height
    x.set(relX)
    y.set(relY)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
    setHovering(false)
  }

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${className}`}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={handleLeave}
      style={{
        rotateX: isHovering ? rotateX : 0,
        rotateY: isHovering ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div style={{ transform: 'translateZ(0)' }}>{children}</div>
    </motion.div>
  )
}
