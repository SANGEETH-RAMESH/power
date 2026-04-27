import { useReveal } from '../../hooks/useReveal'
import { Link } from "react-router-dom"; 

const services = [
  {
    num: '01 / EV CHARGING',
    icon: '⚡',
    title: 'EV CHARGER INSTALLATION',
    desc: 'Home and commercial EV charger installation designed around your vehicle, property, and usage. We handle everything from survey to commissioning.',
    features: [
      '7 kW home chargers (Pod Point, Ohme, Zappi)',
      '22 kW commercial and workplace solutions',
      'OZEV grant assistance for eligible properties',
      'Load balancing and smart scheduling',
      'Full electrical compliance and NAPIT certification',
    ],
    cta: 'Request Installation →',
    green: false,
    link:'/contact-us'
  },
  {
    num: '02 / SOLAR POWER',
    icon: '☀️',
    title: 'SOLAR SYSTEM INSTALLATION',
    desc: 'Grid-tied, hybrid, and off-grid solar systems installed to MCS standards. Reduce your energy bills and earn from surplus generation via the Smart Export Guarantee.',
    features: [
      'Residential 1–6 kWp systems',
      'Commercial and agricultural large-scale arrays',
      'Battery storage integration (GivEnergy, Powerwall)',
      'SEG registration support — earn from export',
      '0% VAT on qualifying residential installations',
    ],
    cta: 'Get Solar Quote →',
    green: true,
    link:"/contact-us"
  },
]

export default function Services() {
  const ref = useReveal()

  return (
    <section
      id="services"
      ref={ref}
      style={{ position: 'relative', zIndex: 2, padding: '110px 0 100px' }}
      className="services-section"
    >
      {/* ✅ UPDATED: Used clamp() so padding shrinks from 52px to 20px on mobile */}
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 clamp(20px, 5vw, 52px)' }} className="services-container">
        
        <div className="section-label reveal">What We Do</div>

        <h2 className="reveal reveal-delay-1" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(34px, 5vw, 62px)',
          lineHeight: .95,
          letterSpacing: 2,
          marginBottom: 18,
        }}>
          TWO SERVICES.<br />ONE PARTNER.
        </h2>

        <p className="reveal reveal-delay-2" style={{
          fontSize: 16,
          color: 'var(--light)',
          fontWeight: 300,
          maxWidth: 520,
          lineHeight: 1.75
        }}>
          Professional installation for every stage of your clean energy journey — from charging your car to powering your property from the sun.
        </p>

        {/* ✅ UPDATED: Used auto-fit and minmax to automatically wrap cards on smaller screens */}
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
            gap: 24, 
            marginTop: 60 
          }} 
          className="services-grid"
        >
          
          {services.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} service-card`}
              style={{
                background: 'var(--panel)',
                border: `1px solid ${s.green ? 'var(--line-g)' : 'var(--line)'}`,
                borderRadius: 20,
                padding: '40px 36px',
                backdropFilter: 'blur(16px)',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform .3s, border-color .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.borderColor = s.green
                  ? 'rgba(90,140,46,.5)'
                  : 'rgba(43,91,168,.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = ''
                e.currentTarget.style.borderColor = s.green
                  ? 'var(--line-g)'
                  : 'var(--line)'
              }}
            >

              {/* Gradient background */}
              <div style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background: s.green
                  ? 'radial-gradient(ellipse at top left, rgba(90,140,46,.1), transparent 60%)'
                  : 'radial-gradient(ellipse at top left, rgba(43,91,168,.1), transparent 60%)',
              }} />

              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                color: 'var(--muted)',
                marginBottom: 28
              }}>
                {s.num}
              </div>

              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 32,
                marginBottom: 28,
                background: s.green
                  ? 'rgba(90,140,46,.2)'
                  : 'rgba(43,91,168,.2)',
                border: `1px solid ${s.green
                  ? 'rgba(90,140,46,.35)'
                  : 'rgba(43,91,168,.4)'}`
              }}>
                {s.icon}
              </div>

              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: 1.5,
                marginBottom: 14
              }}>
                {s.title}
              </div>

              <p style={{
                fontSize: 14,
                color: 'var(--light)',
                lineHeight: 1.75,
                marginBottom: 28
              }}>
                {s.desc}
              </p>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10
              }}>
                {s.features.map((f, j) => (
                  <li key={j} style={{
                    display: 'flex',
                    gap: 10,
                    fontSize: 13,
                    color: 'var(--muted)'
                  }}>
                    <span style={{ color: 'var(--green-hi)' }}>→</span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={s.link}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: .5,
                  color: s.green ? 'var(--green-hi)' : 'var(--blue-hi)',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${s.green
                    ? 'rgba(121,188,60,.3)'
                    : 'rgba(74,127,212,.3)'}`,
                  paddingBottom: 2,
                  transition: 'color .2s, border-color .2s',
                  position: 'relative',
                  zIndex: 2 // ensures the link is clickable above the absolute gradient
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.color = 'var(--white)'
                  e.currentTarget.style.borderColor = 'transparent'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = s.green
                    ? 'var(--green-hi)'
                    : 'var(--blue-hi)'
                }}
              >
                {s.cta}
              </Link>

            </div>
          ))}

        </div>
      </div>
    </section>
  )
}