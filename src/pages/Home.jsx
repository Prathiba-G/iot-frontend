import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero/Hero'
import Banner from '../components/Banner/Banner'
import Tracks from '../components/Tracks/Tracks'
import LabsStory from '../components/LabsStory/LabsStory'
import Outcomes from '../components/Outcomes/Outcomes'
import Contact from '../components/Contact/Contact'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const floatingBgRef = useRef(null)
  const accentLineRef = useRef(null)
  const outcomesMetricsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section transition animations with scale-in/fade-up
      const sections = gsap.utils.toArray('section')
      sections.forEach((section, i) => {
        gsap.fromTo(section,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'bottom 15%',
              toggleActions: 'play none none reverse'
            }
          }
        )
      })

      // Micro-motion pulse in outcomes - only if elements exist
      if (outcomesMetricsRef.current.length > 0) {
        gsap.to(outcomesMetricsRef.current, {
          scale: 1.02,
          duration: 2,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1,
          stagger: 0.3
        })
      }

      // Floating background element - only if ref exists
      if (floatingBgRef.current) {
        gsap.to(floatingBgRef.current, {
          y: '+=20',
          duration: 4,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        })
      }

      // Accent line motion - only if ref exists
      if (accentLineRef.current) {
        gsap.to(accentLineRef.current, {
          height: '+=30',
          duration: 3,
          ease: 'power1.inOut',
          yoyo: true,
          repeat: -1
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const addToOutcomesRefs = (el) => {
    if (el && !outcomesMetricsRef.current.includes(el)) {
      outcomesMetricsRef.current.push(el)
    }
  }

  return (
    <motion.div
      className="home-container"
      style={{ position: 'relative' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div ref={floatingBgRef} className="floating-bg" style={{
        position: 'fixed',
        top: '20%',
        right: '10%',
        width: '200px',
        height: '200px',
        background: 'radial-gradient(circle, rgba(0,123,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform'
      }} />
      <div ref={accentLineRef} className="accent-line" style={{
        position: 'fixed',
        top: '60%',
        left: '5%',
        width: '2px',
        height: '100px',
        background: 'linear-gradient(to bottom, rgba(0,123,255,0.3) 0%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: -1,
        willChange: 'transform'
      }} />
      <Hero />
      <Banner />
      <Outcomes addToRefs={addToOutcomesRefs} />
      <Tracks />
      <LabsStory />
      <Contact />
    </motion.div>
  )
}
