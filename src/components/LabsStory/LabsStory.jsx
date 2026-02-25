import { useState, useEffect } from 'react'
import './LabsStory.css'

const LAB_ITEMS = [
  {
    id: 1,
    title: 'Idea / Experiment',
    subtitle: ' begins',
    description: 'Conceptualizing innovative IoT solutions from real-world challenges. We identify problems and brainstorm creative technological solutions.',
    color: 'rgba(255, 215, 0, 0.3)'
  },
  {
    id: 2,
    title: 'Learning & Building',
    subtitle: '',
    description: 'Mastering hardware-software integration and prototyping techniques. Hands-on experimentation with sensors, microcontrollers, and communication protocols.',
    color: 'rgba(0, 123, 255, 0.3)'
  },
  {
    id: 3,
    title: 'Hands-on Labs',
    subtitle: '',
    description: 'Rigorous debugging, signal analysis, and sensor protocol work. Deep dive into electronics, firmware development, and system optimization.',
    color: 'rgba(0, 255, 136, 0.3)'
  },
  {
    id: 4,
    title: 'Real Projects',
    subtitle: ' / Outcomes',
    description: 'Industry-aligned execution from design to deployment. Delivering scalable, production-ready IoT solutions that solve real-world problems.',
    color: 'rgba(255, 107, 53, 0.3)'
  }
]

export default function LabsStory() {
  const [activeIndex, setActiveIndex] = useState(0)

  const activeLab = LAB_ITEMS[activeIndex]

  return (
    <section id="labs-story" className="labs-section">
      {/* Left Panel - Dynamic Visual Area */}
      <div className="labs-left">
        {/* Floating Glow Shapes */}
        <div className="glow-shapes">
          <div className="glow-shape glow-shape-1"></div>
          <div className="glow-shape glow-shape-2"></div>
          <div className="glow-shape glow-shape-3"></div>
          <div className="glow-shape glow-shape-4"></div>
        </div>
        
        {/* Animated Grid Background */}
        <div className="grid-background"></div>
        
        {/* Active Content Display */}
        <div className="visual-content">
          <div className="content-details">
            <h3 className="visual-title">
              <span className="step-number">0{activeLab.id}</span>
              {activeLab.title}
              <span className="step-subtitle">{activeLab.subtitle}</span>
            </h3>
            <p className="visual-description">{activeLab.description}</p>
          </div>
          
          {/* Progress Indicators */}
          <div className="progress-dots">
            {LAB_ITEMS.map((_, index) => (
              <span 
                key={index} 
                className={`progress-dot ${index === activeIndex ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Stacked Lab Titles */}
      <div className="labs-right">
        <h2 className="section-heading">Our Labs Journey</h2>
        
        <div className="labs-list">
          {LAB_ITEMS.map((lab, index) => (
            <div 
              key={lab.id}
              className={`lab-item ${index === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(index)}
              style={{ '--accent-color': lab.color }}
            >
              <span className="lab-number">0{lab.id}</span>
              <h3 className="lab-title">
                {lab.title}
                <span className="lab-subtitle">{lab.subtitle}</span>
              </h3>
              {index === activeIndex && (
                <p className="lab-description">{lab.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
