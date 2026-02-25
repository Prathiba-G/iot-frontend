import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import styles from './Outcomes.module.css'

// Compute experience dynamically from founding year
const FOUNDING_YEAR = 2015

const METRICS = (function () {
  return [
    { value: '10+', unit: 'years', label: 'Hands-on embedded systems & IoT experience' },
    { value: '100%', unit: '', label: 'Project-driven training and development' },
    { value: 'End-to-end', unit: '', label: 'From system design to prototype stabilization' },
  ]
})()

export default function Outcomes({ addToRefs }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const metricsRefs = useRef([])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section ref={ref} id="outcomes" className={styles.section}>
      <div className={styles.wrapper}>
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Why Neotech
        </motion.h2>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
        >
          {METRICS.map((m, index) => (
            <motion.div
              key={m.label}
              className={styles.metricWrap}
              variants={itemVariants}
              ref={(el) => {
                if (el && !metricsRefs.current.includes(el)) {
                  metricsRefs.current.push(el)
                  if (addToRefs) addToRefs(el)
                }
              }}
            >
              <div className={styles.metric}>
                <span className={styles.value}>
                  {m.value}
                  <span className={styles.unit}>{m.unit}</span>
                </span>
                <span className={styles.label}>{m.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
