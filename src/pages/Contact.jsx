import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from './Contact.module.css'

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}
const transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] }

export default function ContactPage() {
  const [status, setStatus] = useState(null)
  const [touched, setTouched] = useState({ name: false, email: false, message: false, mobile: false, domain: false, type: false })
  const [values, setValues] = useState({ name: '', email: '', message: '', mobile: '', domain: '', type: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (e) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    const valid =
      values.name.trim() !== '' &&
      values.email.trim() !== '' &&
      values.message.trim() !== ''
    setStatus(valid ? 'success' : 'error')
  }

  const showError = (field) => touched[field] && values[field].trim() === ''

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.layout}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        <div className={styles.left}>
          <motion.section className={styles.intro} variants={fadeIn} transition={transition}>
            <h1 className={styles.title}>Contact</h1>
            <p className={styles.lead}>
              For technical enquiries, project discussions, or training — reach out.
            </p>
          </motion.section>

          <motion.section
            className={styles.details}
            variants={fadeIn}
            transition={transition}
          >
            <h2 className={styles.heading}>Neotech Embedded Services</h2>
            <dl className={styles.dl}>
              <dt>Email</dt>
              <dd>
                <a href="mailto:neotech.embedded@gmail.com">neotech.embedded@gmail.com</a>
              </dd>
              <dd>
                <a href="mailto:bhagyashreeskulkarni@gmail.com">
                  bhagyashreeskulkarni@gmail.com
                </a>
              </dd>
              <dt>Phone / WhatsApp</dt>
              <dd>
                <a href="tel:+917709053793">7709053793</a>
              </dd>
              <dd>
                <a href="tel:+919823990793">9823990793</a>
              </dd>
              <dt>Instagram</dt>
              <dd>
                <a
                  href="https://www.instagram.com/neotech_embedded_iot/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  neotech_embedded_iot
                </a>
              </dd>
              <dt>LinkedIn</dt>
              <dd>
                <a
                  href="https://www.linkedin.com/in/bhagyashree-kulkarni-9b0214107/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  neotech_embedded_iot
                </a>
              </dd>
            </dl>
          </motion.section>
        </div>

        <motion.section
          className={styles.formSection}
          variants={fadeIn}
          transition={transition}
        >
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.field}>
              <label htmlFor="contact-name" className={styles.label}>
                Name <span className={styles.required}>*</span>
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={showError('name') ? styles.inputError : styles.input}
                required
              />
              {showError('name') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-email" className={styles.label}>
                Email <span className={styles.required}>*</span>
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={showError('email') ? styles.inputError : styles.input}
                required
              />
              {showError('email') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-mobile" className={styles.label}>
                Mobile Number <span className={styles.required}>*</span>
              </label>
              <input
                id="contact-mobile"
                type="tel"
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                className={showError('mobile') ? styles.inputError : styles.input}
                required
              />
              {showError('mobile') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-domain" className={styles.label}>
                Domain of Interest <span className={styles.required}>*</span>
              </label>
              <select
                id="contact-domain"
                name="domain"
                value={values.domain}
                onChange={handleChange}
                onBlur={handleBlur}
                className={showError('domain') ? styles.inputError : styles.input}
                required
              >
                <option value="">Select a domain</option>
                <option value="Embedded Systems">Embedded Systems</option>
                <option value="IoT">IoT</option>
                <option value="Instrumentation & Automation">Instrumentation & Automation</option>
                <option value="Firmware Development">Firmware Development</option>
                <option value="Hardware Design">Hardware Design</option>
              </select>
              {showError('domain') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <div className={styles.field}>
              <label className={styles.label}>
                Student / Professional <span className={styles.required}>*</span>
              </label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="type"
                    value="Student"
                    checked={values.type === 'Student'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  Student
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="type"
                    value="Working Professional"
                    checked={values.type === 'Working Professional'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  Working Professional
                </label>
              </div>
              {showError('type') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <div className={styles.field}>
              <label htmlFor="contact-message" className={styles.label}>
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={values.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                className={showError('message') ? styles.textareaError : styles.textarea}
                required
              />
              {showError('message') && (
                <span className={styles.fieldError}>Required</span>
              )}
            </div>
            <button type="submit" className={styles.submit}>
              Send message
            </button>
            {status === 'success' && (
              <p className={styles.feedbackSuccess}>Message sent. We’ll get back to you.</p>
            )}
            {status === 'error' && (
              <p className={styles.feedbackError}>Please fill in all required fields.</p>
            )}
          </form>
        </motion.section>
      </motion.div>
    </div>
  )
}
