import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import styles from './About.module.css'
import founderImage from '../assets/Founder.png'

const TIMELINE_ITEMS = [
  {
    year: '2010',
    title: 'Embedded Systems Development Begins',
    description: 'Hands-on embedded systems and IoT project development begins, covering hardware design, firmware development, debugging, and system stabilization across academic, R&D, and industrial environments.',
  },
  {
    year: '2015',
    title: 'Neotech Embedded Services Founded',
    description: 'Neotech Embedded Services established with a focus on real-world embedded systems execution, end-to-end project development, and industry-aligned technical mentoring driven by practical implementation.',
  },
]

export default function About() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const introRef = useRef(null)
  const introInView = useInView(introRef, { once: true, margin: '-80px' })

  const philosophyRef = useRef(null)
  const philosophyInView = useInView(philosophyRef, { once: true, margin: '-80px' })

  const founderRef = useRef(null)
  const founderInView = useInView(founderRef, { once: true, margin: '-80px' })

  // Founding year and derived experience (keeps numbers accurate over time)
  const foundingYear = 2015
  const years = "10+"

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <section ref={introRef} className={styles.intro}>
        <motion.div
          className={styles.introInner}
          variants={containerVariants}
          initial="hidden"
          animate={introInView ? 'show' : 'hidden'}
        >
          <motion.span className={styles.marker} variants={itemVariants} />
          <motion.h1 className={styles.title} variants={itemVariants}>
            About Neotech
          </motion.h1>
          <motion.p className={styles.lead} variants={itemVariants}>
            Neotech Embedded Services is an engineering-focused organization
            specializing in embedded systems, IoT, and instrumentation-based
            project development. The focus is real-world execution: debugging
            rigor, system stability, and prototype readiness over theoretical
            training.
          </motion.p>
        </motion.div>
      </section>

      <section ref={founderRef} className={styles.founder}>
        <motion.div
          className={styles.founderGrid}
          variants={containerVariants}
          initial="hidden"
          animate={founderInView ? 'show' : 'hidden'}
        >
          <div className={styles.founderMain}>
            <motion.h2 className={styles.heading} variants={itemVariants}>
              Founder &amp; Director
            </motion.h2>
            <motion.p className={styles.name} variants={itemVariants}>
              Bhagyashree Kulkarni
            </motion.p>
            <motion.div className={styles.imageBlock} variants={itemVariants}>
              <img src={founderImage} alt="Bhagyashree Kulkarni" className={styles.founderImage} />
            </motion.div>
            <motion.dl className={styles.dl} variants={itemVariants}>
              <dt>Education</dt>
              <dd>B.E. – Instrumentation Engineering</dd>
              <dd>M.Tech – Embedded Systems, JNTU Hyderabad</dd>
              <dt className={styles.dtSpacer}>Experience</dt>
              <dd>
                {years} years of hands-on embedded systems &amp; IoT project
                development (since {2010}). Academic R&amp;D, small-scale
                industrial environments, and custom embedded solutions.
              </dd>
            </motion.dl>
            <motion.p className={styles.story} variants={itemVariants}>
              Neotech was founded to bridge concept-level ideas to stable,
              working embedded systems. That means rigorous debugging,
              hardware–software integration, and system lifecycle thinking — not
              slides or theory in isolation.
            </motion.p>
          </div>
          <div className={styles.founderSide}>
            <motion.div className={styles.metrics} variants={itemVariants}>
              <span className={styles.metricValue}>{years}</span>
              <span className={styles.metricLabel}>years embedded &amp; IoT</span>
            </motion.div>
            <motion.div className={styles.metrics} variants={itemVariants}>
              <span className={styles.metricValue}>{2010}</span>
              <span className={styles.metricLabel}>hands-on since</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className={styles.timeline} ref={timelineRef}>
        <motion.div
          className={styles.timelineHead}
          variants={containerVariants}
          initial="hidden"
          animate={introInView ? 'show' : 'hidden'}
        >
          <motion.h2 className={styles.headingLarge} variants={itemVariants}>
            Founder Journey
          </motion.h2>
          <motion.p className={styles.timelineSubhead} variants={itemVariants}>
            {years} years of hands-on embedded systems evolution
          </motion.p>
        </motion.div>

        <div className={styles.timelineBody}>
          <motion.div className={styles.timelineLineContainer} style={{ height: lineHeight }}>
            <div className={styles.timelineLine} />
          </motion.div>

          <div className={styles.timelineItems}>
            {TIMELINE_ITEMS.map((item, idx) => (
              <motion.div
                key={item.year}
                className={styles.timelineItemWrapper}
                data-align={idx % 2 === 0 ? 'left' : 'right'}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
              >
                <div className={styles.timelineCard}>
                  <motion.div
                    className={styles.card}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{
                      scale: 1.02,
                      rotateX: 5,
                      rotateY: -8,
                      z: 100,
                      transition: { duration: 0.3 },
                    }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className={styles.year}>{item.year}</span>
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <div className={styles.cardGlow} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section ref={philosophyRef} className={styles.philosophy}>
        <motion.div
          className={styles.philosophyInner}
          variants={containerVariants}
          initial="hidden"
          animate={philosophyInView ? 'show' : 'hidden'}
        >
          <motion.span className={styles.marker} variants={itemVariants} />
          <motion.h2 className={styles.heading} variants={itemVariants}>
            Engineering philosophy
          </motion.h2>
          <motion.p className={styles.body} variants={itemVariants}>
            Projects are approached with a clear path from design to stable
            prototype: system design, hardware development, firmware
            implementation, and debugging support. The goal is deployable
            behaviour and system stability, not demos that break under
            real-world conditions.
          </motion.p>
        </motion.div>
      </section>
    </motion.div>
  )
}
