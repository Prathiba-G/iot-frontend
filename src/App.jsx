import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useState, useEffect } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Home from './pages/Home'

// Lazy load non-critical pages for better performance
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const NotFound = lazy(() => import('./pages/NotFound'))

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error("VITE_API_URL is not defined");
}

export default function App() {
  const [images, setImages] = useState([])

  // load images once from backend if available
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/api/images`)
        if (res.ok) {
          const data = await res.json()
          // backend returns array of filenames
          setImages(data || [])
        }
      } catch (err) {
        // backend not available, keep images empty
        console.warn('Could not fetch gallery:', err)
      }
    })()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <AnimatePresence mode="wait">
      <main>
        <Suspense fallback={<div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          color: '#666'
        }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/gallery" element={<Gallery images={images} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard images={images} setImages={setImages} />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </main>

      </AnimatePresence>
      <Footer />
    </BrowserRouter>
  )
}
