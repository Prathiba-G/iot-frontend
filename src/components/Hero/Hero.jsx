import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import bgVideo from '../../assets/bgvideo.mp4'
import styles from './Hero.module.css'

gsap.registerPlugin(ScrollTrigger)

const entrance = { opacity: 1, y: 0 }
const transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const primaryBtnRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const pcbOffset = useTransform(scrollYProgress, [0, 0.5], [0, 24])
  const pcbOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.4])
  const videoY = useTransform(scrollYProgress, [0, 1], [0, 40])

  // Founding year and dynamic experience calculation
  const foundingYear = 2015
  const years = "10+"

  // Navigation
  const navigate = useNavigate()

  // Magnetic button effect
  const handleMouseMove = (e) => {
    if (!primaryBtnRef.current || !isHovering) return

    const rect = primaryBtnRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = (e.clientX - centerX) * 0.3
    const y = (e.clientY - centerY) * 0.3

    setMousePosition({ x, y })
  }

  return (
    <section ref={sectionRef} className={styles.hero}>
      <motion.video
        ref={videoRef}
        className={styles.video}
        style={{ y: videoY }}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
      >
        <source src={bgVideo} type="video/mp4" />
      </motion.video>
      <div className={styles.overlay} />
      <motion.div
        className={styles.pcb}
        style={{ y: pcbOffset, opacity: pcbOpacity }}
        aria-hidden
      >
        <div className={styles.pcbInner} />
      </motion.div>

      <div className={styles.wrapper}>
        <motion.div
          className={`${styles.badge} hero-badge`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...transition, delay: 0.5 }}
        >
          {years} years in embedded
        </motion.div>
        <motion.h1
          className={`${styles.title} hero-title`}
          initial={{ opacity: 0, y: 20 }}
          animate={entrance}
          transition={{ ...transition, delay: 0.1 }}
        >
          Engineering the Future of IoT with <span className={styles.highlightName}>Neotech</span>
        </motion.h1>
        <motion.div
          className={styles.accentLine}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ ...transition, delay: 0.3, duration: 0.8 }}
        />
        <motion.p
          className={`${styles.subtitle} hero-subtitle`}
          initial={{ opacity: 0, y: 16 }}
          animate={entrance}
          transition={{ ...transition, delay: 0.25 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.5 }}
          >
            Neotech Embedded Services delivers end-to-end embedded solutions:
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.6 }}
          >
            system design, hardware development, firmware implementation,
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...transition, delay: 0.7 }}
          >
            debugging, and prototype stabilization. Training is industry-aligned
            and project-driven.
          </motion.span>
        </motion.p>
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 12 }}
          animate={entrance}
          transition={{ ...transition, delay: 0.4 }}
        >
          <motion.a
            ref={primaryBtnRef}
            href="#tracks"
            className={styles.primaryBtn}
            style={{
              x: mousePosition.x,
              y: mousePosition.y,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false)
              setMousePosition({ x: 0, y: 0 })
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(34, 193, 255, 0.4)',
            }}
            whileFocus={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(34, 193, 255, 0.4)',
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="/contact"
            className={styles.secondaryBtn}
            onClick={(e) => {
              e.preventDefault()
              navigate('/contact')
            }}
            whileHover={{
              scale: 1.03,
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
            }}
            whileFocus={{
              scale: 1.03,
              boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            Contact Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
