import { motion, useInView, useScroll, useTransform, useMotionValue, useSpring, useAnimation } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import servicesVideo from '../assets/services.mp4'
import styles from './Services.module.css'

const SERVICES = [
  {
    id: 'embedded',
    title: 'Embedded Systems',
    subtitle: 'Project Development',
    desc: 'Full lifecycle from requirements to stable prototype. System design, integration, and validation with emphasis on deployment readiness.',
    icon: '⚙️',
    features: ['System Design', 'Integration', 'Validation'],
  },
  {
    id: 'iot',
    title: 'IoT System',
    subtitle: 'Design & Implementation',
    desc: 'Connected systems from node to backend. Protocol integration, data path design, and deployment-ready behaviour.',
    icon: '🌐',
    features: ['Protocol Integration', 'Data Path Design', 'Deployment Ready'],
  },
  {
    id: 'hardware',
    title: 'Hardware Circuit',
    subtitle: 'Design & Testing',
    desc: 'Schematic to tested hardware. Signal integrity, power, and validation before firmware integration.',
    icon: '🔌',
    features: ['Signal Integrity', 'Power Analysis', 'Testing'],
  },
  {
    id: 'firmware',
    title: 'Firmware Development',
    subtitle: '& Debugging Support',
    desc: 'Implementation and debug through to stable behaviour. Interrupts, timing, memory constraints, and integration.',
    icon: '💾',
    features: ['Implementation', 'Debugging', 'Optimization'],
  },
  {
    id: 'custom',
    title: 'Custom Solutions',
    subtitle: 'Academic & Industrial',
    desc: 'Project-based delivery for academic and industrial clients. Defined scope, deliverables, and execution.',
    icon: '🎯',
    features: ['Project Delivery', 'Consulting', 'Support'],
  },
  {
    id: 'mentoring',
    title: 'Technical Mentoring',
    subtitle: 'Skill-Based Training',
    desc: 'Hands-on, project-driven skill building. Debugging, integration, instrumentation, and protocols.',
    icon: '📚',
    features: ['Hands-On Training', 'Debugging Skills', 'Industry Aligned'],
  },
]

const PROJECTS = [
  'GPS-Based Vehicle and Asset Tracking Systems',
  'Raspberry Pi Project on Smart Door System',
  'IoT Monitoring and Control Solutions',
  'Smart Agriculture and Automation Systems',
  'IMU-Based Motion Detection Projects',
  'Embedded Data Logging and Scheduling Systems',
]

const DOMAINS = [
  'Embedded Systems',
  'IoT',
  'Instrumentation & Automation',
  'Real-Time Systems',
  'Sensor-Based Applications',
  'Communication Protocols',
  'Hardware–Software Integration',
]

function ServiceCard({ service, index }) {
  const [isHover, setIsHover] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-100, 100], [5, -5]), {
    stiffness: 300,
    damping: 25,
  })
  const rotateY = useSpring(useTransform(mouseX, [-100, 100], [-5, 5]), {
    stiffness: 300,
    damping: 25,
  })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left - rect.width / 2)
    mouseY.set(e.clientY - rect.height / 2)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHover(false)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 },
    },
  }

  return (
    <motion.div
      className={styles.cardOuter}
      variants={containerVariants}
      whileHover={{ y: -8 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHover(true)}
    >
      <motion.div
        className={styles.card}
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className={styles.cardInner}>


          <motion.h3
            className={styles.cardTitle}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className={styles.cardSubtitle}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.1 }}
          >
            {service.subtitle}
          </motion.p>

          <motion.p
            className={styles.cardDesc}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.2 }}
          >
            {service.desc}
          </motion.p>

          <motion.div
            className={styles.cardFeatures}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          >
            {service.features.map((feature, i) => (
              <motion.span
                key={feature}
                className={styles.badge}
                whileHover={{ scale: 1.05 }}
              >
                {feature}
              </motion.span>
            ))}
          </motion.div>

          <div className={styles.cardGlow} />
          <div className={styles.cardBorder} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Services() {
  const heroRef = useRef(null)
  const heroInView = useInView(heroRef, { once: true, margin: '-100px' })

  const servicesRef = useRef(null)
  const servicesInView = useInView(servicesRef, { once: true, margin: '-80px' })

  const domainsRef = useRef(null)
  const domainsInView = useInView(domainsRef, { once: true, margin: '-80px' })

  const projectsRef = useRef(null)
  const projectsInView = useInView(projectsRef, { once: true, margin: '-80px' })
  const marqueeControls = useAnimation()

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  useEffect(() => {
    const startMarquee = async () => {
      await marqueeControls.start({
        x: '-50%',
        transition: {
          duration: 30,
          ease: 'linear',
          repeat: Infinity,
        },
      })
    }
    startMarquee()
  }, [marqueeControls])

  return (
    <motion.div
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <section ref={heroRef} className={styles.hero}>
        <video
          className={styles.heroBg}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-hidden="true"
        >
          <source src={servicesVideo} type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />

        <motion.div
          className={styles.heroContent}
          variants={containerVariants}
          initial="hidden"
          animate={heroInView ? 'show' : 'hidden'}
        >
          <motion.h1 className={styles.heroTitle} variants={itemVariants}>
            Services
          </motion.h1>

          <motion.p className={styles.heroLead} variants={itemVariants}>
            Engineering work is approached with a clear path from design to stable delivery: system design, hardware and firmware implementation, debugging, and prototype stabilization.
          </motion.p>

          <motion.div className={styles.heroDivider} variants={itemVariants} />

          <motion.div className={styles.scrollCue} variants={itemVariants}>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <section ref={servicesRef} className={styles.servicesSection}>
        <div className={styles.servicesHead}>
          <motion.h2
            className={styles.sectionTitle}
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Six Core Services
          </motion.h2>
        </div>

        <div className={styles.servicesGrid}>
          {SERVICES.map((service, idx) => (
            <ServiceCard key={service.id} service={service} index={idx} />
          ))}
        </div>
      </section>

      <section ref={projectsRef} className={styles.projectsSection}>
        <motion.div
          className={styles.projectsInner}
          variants={containerVariants}
          initial="hidden"
          animate={projectsInView ? 'show' : 'hidden'}
        >
          <motion.h2 className={styles.projectsHeading} variants={itemVariants}>
            Notable Projects Executed
          </motion.h2>

          <div className={styles.marqueeContainer}>
            <motion.div
              className={styles.marquee}
              animate={marqueeControls}
              onHoverStart={() => marqueeControls.set({ transition: { duration: 60 } })}
              onHoverEnd={() => marqueeControls.set({ transition: { duration: 30 } })}
            >
              {PROJECTS.concat(PROJECTS).map((project, index) => (
                <span key={`${project}-${index}`} className={styles.projectItem}>
                  {project}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section ref={domainsRef} className={styles.domainsSection}>
        <motion.div
          className={styles.domainsArrow}
          initial={{ opacity: 0 }}
          animate={domainsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6 }}
        />

        <motion.div
          className={styles.domainsInner}
          variants={containerVariants}
          initial="hidden"
          animate={domainsInView ? 'show' : 'hidden'}
        >
          <motion.span className={styles.marker} variants={itemVariants} />

          <motion.h2 className={styles.domainsHeading} variants={itemVariants}>
            Project Domains <span className={styles.domainCount}>7</span>
          </motion.h2>

          <motion.p className={styles.domainsLead} variants={itemVariants}>
            Depth across embedded, IoT, and instrumentation: real-time systems, sensor-based applications, and hardware–software integration.
          </motion.p>

          <motion.ul className={styles.domainList} variants={containerVariants}>
            {DOMAINS.map((domain) => (
              <motion.li
                key={domain}
                className={styles.domainItem}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
                }}
                whileHover={{
                  scale: 1.05,
                  x: 4,
                  transition: { duration: 0.2 },
                }}
              >
                {domain}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </section>
    </motion.div>
  )
}
