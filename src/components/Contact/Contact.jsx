import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Contact.module.css'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const navigate = useNavigate()

  return (
    <section ref={ref} className={styles.section}>
      <motion.div
        className={styles.wrapper}
        initial="hidden"
        animate={isInView ? 'show' : 'hidden'}
        variants={containerVariants}
      >
        <motion.span className={styles.marker} variants={itemVariants} />
        <motion.h2 className={styles.heading} variants={itemVariants}>
          Ready to build something?
        </motion.h2>
        <motion.p className={styles.lead} variants={itemVariants}>
          For project development, training, or technical consultations — let's connect.
        </motion.p>
        <motion.div className={styles.actions} variants={itemVariants}>
          <a href="mailto:neotech.embedded@gmail.com" className={styles.ctaPrimary}>
            Send Email
            <span className={styles.icon}>→</span>
          </a>
          <a
            href="/contact"
            className={styles.ctaSecondary}
            onClick={(e) => {
              e.preventDefault()
              navigate('/contact')
            }}
          >
            Schedule Call
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
