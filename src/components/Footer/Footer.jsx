import styles from './Footer.module.css'
import { Link } from 'react-router-dom'
import logoSrc from '../../assets/neotech_logo.png'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const foundingYear = 2015

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.footerContainer}>
        {/* Column 1: Company Info */}
        <div className={styles.column}>
          <div className={styles.logoSection}>
            <img src={logoSrc} alt="Neotech logo" className={styles.logo} />
            <span className={styles.companyName}>Neotech Embedded Services</span>
          </div>
          <p className={styles.description}>
            Engineering-driven embedded systems and IoT solutions. We build scalable, reliable, and innovative digital products that power the future of technology.
          </p>
          <p className={styles.tagline}>Building scalable digital solutions since 2015.</p>
        </div>

        {/* Column 2: Services */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Services</h4>
          <ul className={styles.linkList}>
            <li><Link to="/services">Embedded Systems & IoT</Link></li>
            <li><Link to="/services">Hardware Development</Link></li>
            <li><Link to="/services">Firmware Programming</Link></li>
            <li><Link to="/labs">Training & Solutions</Link></li>
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Quick Links</h4>
          <ul className={styles.linkList}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact & Social */}
        <div className={styles.column}>
          <h4 className={styles.columnTitle}>Get in Touch</h4>
          <div className={styles.contactInfo}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:neotech.embedded@gmail.com">neotech.embedded@gmail.com</a>
              <a href="mailto:bhagyashreeskulkarni@gmail.com">bhagyashreeskulkarni@gmail.com</a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone / WhatsApp</span>
              <a href="tel:+917709053793">+91 7709053793</a>
              <a href="tel:+919823990793">+91 9823990793</a>
            </div>
          </div>
          
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          <span>© {foundingYear} - {currentYear} Neotech Embedded Services. All rights reserved.</span>
        </div>
        <div className={styles.socialLinks}>
            <a href="https://www.linkedin.com/in/bhagyashree-kulkarni-9b0214107/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M8 11v5M8 8v.01M12 16v-5c0-1 1-2 2-2s2 1 2 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/neotech_embedded_iot/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={styles.socialIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
                <circle cx="17" cy="7" r="1" fill="currentColor"/>
              </svg>
            </a>
          </div>
      </div>
    </footer>
  )
}
