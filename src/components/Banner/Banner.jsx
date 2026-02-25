import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import styles from './Banner.module.css'

gsap.registerPlugin(ScrollTrigger)

const messages = [
  "Premium Online & Offline Embedded Systems Classes Available",
  "Elite Hands-on Training • Cutting-Edge Projects • Expert Mentorship",
  "Master Embedded, IoT & Automation — Seamless Online or In-Person",
  "From Novice to Expert — Adaptive, Premium Learning Pathways"
]

export default function Banner() {
  const trackRef = useRef(null)

  useEffect(() => {
    if (trackRef.current) {
      gsap.to(trackRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: trackRef.current.closest('section'),
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.5
        }
      })
    }
  }, [])

  return (
    <section className={styles.banner}>
      <div className={styles.marquee}>
        <div
          ref={trackRef}
          className={styles.track}
        >
          {messages.map((msg, index) => (
            <span key={index} className={styles.message}>
              {msg}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {messages.map((msg, index) => (
            <span key={`dup-${index}`} className={styles.message}>
              {msg}
            </span>
          ))}
        </div>
      </div>
      <div className={styles.fadeLeft} />
      <div className={styles.fadeRight} />
    </section>
  )
}
