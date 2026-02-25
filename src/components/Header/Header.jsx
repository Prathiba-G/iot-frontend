import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.css'
import logoSrc from '../../assets/neotech_logo.png'

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const isActive = (path) => location.pathname === path

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenu} aria-label="Neotech Embedded Services">
          <img src={logoSrc} alt="Neotech Embedded Services" className={styles.logoImg} />
          <span className={styles.visuallyHidden}>Neotech Embedded Services</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={styles.navLink}
              data-active={isActive(link.path)}
              onClick={closeMenu}
            >
              <span className={styles.navLinkText}>{link.label}</span>
              <span className={styles.navLinkLine} />
            </Link>
          ))}
        </nav>

        <Link to="/contact" className={styles.cta} onClick={closeMenu}>
          Get in Touch
        </Link>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
          <span className={styles.menuLine} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden
            />
            <motion.div
              className={styles.panel}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <nav className={styles.panelNav}>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={styles.panelLink}
                    data-active={isActive(link.path)}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" className={styles.panelCta} onClick={closeMenu}>
                  Get in Touch
                </Link>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
