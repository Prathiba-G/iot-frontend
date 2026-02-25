import { motion } from 'framer-motion'
import TiltCard from '../TiltCard/TiltCard'
import styles from './Tracks.module.css'

const TRACKS = [
  {
    id: 'embedded-iot',
    title: 'Embedded Systems & IoT',
    desc: 'End-to-end project development and IoT system design. From requirements to prototype stabilization.',
    meta: 'Development',
  },
  {
    id: 'hardware-firmware',
    title: 'Hardware & Firmware',
    desc: 'Circuit design, testing, firmware implementation, and debugging support. Hardware–software integration.',
    meta: 'Implementation',
  },
  {
    id: 'training',
    title: 'Training & Solutions',
    desc: 'Custom academic and industry-oriented project solutions. Technical mentoring and skill-based training.',
    meta: 'Training',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
}

export default function Tracks() {
  return (
    <section id="tracks" className={styles.section}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.intro}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4 }}
        >
          <h2 className={styles.heading}>What we offer</h2>
          <p className={styles.lead}>
            Embedded systems, IoT, and instrumentation-based project development.
            Not theory-based — project-driven and industry-aligned.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TRACKS.map((track) => (
            <motion.div key={track.id} className={styles.cardWrap} variants={item}>
              <TiltCard>
                <span className={styles.meta}>{track.meta}</span>
                <h3 className={styles.cardTitle}>{track.title}</h3>
                <p className={styles.cardDesc}>{track.desc}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
