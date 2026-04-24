import { useReveal } from '../../hooks/useReveal'
import { useState } from 'react'

const installSteps = [
  { num: '01', title: 'SITE SURVEY', desc: 'We assess your electrical capacity, parking layout, and installation feasibility.' },
  { num: '02', title: 'SYSTEM DESIGN', desc: 'We recommend the right charger type, power rating, and protection systems.' },
  { num: '03', title: 'DNO NOTIFICATION', desc: 'We handle Distribution Network Operator notifications for higher load installations.' },
  { num: '04', title: 'INSTALLATION', desc: 'Certified engineers complete installation including cabling, mounting, and connections.' },
  { num: '05', title: 'TESTING & CERT', desc: 'Full electrical testing is carried out and certification is issued.' },
  { num: '06', title: 'HANDOVER', desc: 'We guide you through charger usage, app setup, and safety procedures.' },
]

const chargerRanges = [
  {
    label: 'ENTRY',
    title: 'Simple & Reliable',
    sub: 'Cost-effective daily charging',
    features: ['Ideal for daily residential use', '7.4 kW single-phase systems', 'Basic smart functionality', 'Compact and practical design'],
    color: 'var(--muted)',
    accent: 'rgba(200,216,240,.15)',
    border: 'rgba(200,216,240,.2)',
  },
  {
    label: 'SMART',
    title: 'Enhanced Control',
    sub: 'Performance meets intelligence',
    features: ['App-enabled charging control', 'Scheduling & off-peak optimisation', 'Energy usage monitoring', 'Suitable for homes & small businesses'],
    color: 'var(--blue-hi)',
    accent: 'rgba(43,91,168,.15)',
    border: 'rgba(43,91,168,.35)',
    featured: true,
  },
  {
    label: 'PREMIUM',
    title: 'Advanced Performance',
    sub: 'For a refined experience',
    features: ['Advanced smart features', 'Faster charging capability', 'Sleek modern design', 'Enhanced user interface & control'],
    color: 'var(--green-hi)',
    accent: 'rgba(90,140,46,.15)',
    border: 'rgba(90,140,46,.35)',
  },
  {
    label: 'COMMERCIAL',
    title: 'Built for Scale',
    sub: 'Workplace & fleet infrastructure',
    features: ['Multiple charger installations', 'Load balancing across units', 'User access control', 'Usage tracking and reporting'],
    color: 'var(--blue-hi)',
    accent: 'rgba(43,91,168,.12)',
    border: 'rgba(43,91,168,.25)',
  },
  {
    label: 'FUTURE-READY',
    title: 'Integrated Energy',
    sub: 'Designed for smart ecosystems',
    features: ['Solar-compatible systems', 'Battery-ready integration', 'Smart energy ecosystem support', 'Ideal for long-term optimisation'],
    color: 'var(--green-hi)',
    accent: 'rgba(90,140,46,.12)',
    border: 'rgba(90,140,46,.25)',
  },
]

const afterSales = [
  { icon: '🛡️', title: 'WARRANTY SUPPORT', desc: 'We support manufacturer warranties and assist in resolving early-stage issues.' },
  { icon: '📞', title: 'TECHNICAL SUPPORT', desc: 'Remote and on-call assistance for charger faults, connectivity issues, and charging interruptions.' },
  { icon: '🔧', title: 'MAINTENANCE', desc: 'Periodic inspection, electrical safety checks, and cable & connection inspection.' },
  { icon: '⚡', title: 'TROUBLESHOOTING', desc: 'Fast response support for system faults and performance issues.' },
  { icon: '📈', title: 'SYSTEM UPGRADES', desc: 'Additional chargers, load balancing upgrades, and solar & battery integration.' },
]

const compliance = [
  { code: 'BS 7671', desc: 'IET Wiring Regulations' },
  { code: 'BS EN 61851', desc: 'EV Charging Systems' },
  { code: 'UK SCPR', desc: 'Smart Charge Point Regulations' },
  { code: 'G98/G99', desc: 'Grid Connection Compliance' },
  { code: 'OCPP 1.6J', desc: 'Open Charge Point Protocol' },
]

const whyUs = [
  { icon: '⚙️', title: 'ENGINEERING-LED', desc: 'Systems designed on actual load requirements, not generic templates.' },
  { icon: '✅', title: 'FULLY COMPLIANT', desc: 'Every installation meets UK electrical and safety regulations.' },
  { icon: '📐', title: 'SCALABLE', desc: 'Installations designed to support future solar and battery integration.' },
  { icon: '💬', title: 'TRANSPARENT', desc: 'Clear scope, clear pricing, no unnecessary upselling.' },
]

export default function EVPage() {
  const ref = useReveal()

  return (
    <div ref={ref} style={{ position: 'relative', zIndex: 2 }}>

      {/* ── HERO ── */}
      <section className="ev-hero" style={{
        position: 'relative',
        minHeight: '88vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '120px 52px 80px',
        overflow: 'hidden',
        borderBottom: '1px solid var(--line)',
      }}>
        {/* Animated background grid */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `
            linear-gradient(rgba(43,91,168,.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,91,168,.06) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at 60% 50%, black 30%, transparent 80%)',
        }} />
        {/* Glow */}
        <div style={{
          position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)',
          width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(43,91,168,.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32,
            fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
            color: 'var(--muted)', textTransform: 'uppercase',
          }}>
            <a href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</a>
            <span style={{ color: 'var(--line)' }}>→</span>
            <span style={{ color: 'var(--blue-hi)' }}>EV Charger Installation</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="ev-hero-grid">
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: '1px solid rgba(43,91,168,.4)', background: 'rgba(43,91,168,.12)',
                borderRadius: 50, padding: '6px 16px 6px 10px', marginBottom: 28,
                fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
                textTransform: 'uppercase', color: 'var(--blue-hi)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue-hi)', display: 'inline-block' }} />
                Residential · Commercial · Fleet
              </div>
              <h1 className="anim-fade-up" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(48px, 6.5vw, 88px)',
                lineHeight: .92, letterSpacing: 2, margin: '0 0 24px',
              }}>
                <span style={{ color: 'var(--white)', display: 'block' }}>EV CHARGER</span>
                <span style={{ color: 'var(--blue-hi)', display: 'block' }}>INSTALLATION</span>
              </h1>
              <p style={{ fontSize: 17, color: 'var(--light)', fontWeight: 300, lineHeight: 1.75, maxWidth: 480, margin: '0 0 40px' }}>
                Reliable. Compliant. Future-Ready. Power your transition to electric mobility with professionally installed EV charging solutions by Watten Power Ltd.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }} className="ev-hero-cta">
                <a href="#contact" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'linear-gradient(135deg, var(--blue), var(--blue-hi))',
                  color: '#fff', fontWeight: 500, fontSize: 14,
                  textTransform: 'uppercase', letterSpacing: 1,
                  padding: '15px 36px', borderRadius: 50,
                  textDecoration: 'none', transition: 'all .25s',
                  boxShadow: '0 8px 28px rgba(43,91,168,.4)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(43,91,168,.55)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,168,.4)' }}
                >Request a Quote →</a>
                <a href="#survey" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  color: 'var(--light)', fontSize: 14,
                  textDecoration: 'none',
                  border: '1px solid rgba(255,255,255,.15)',
                  padding: '15px 28px', borderRadius: 50,
                  transition: 'all .25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-hi)'; e.currentTarget.style.color = 'var(--blue-hi)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'var(--light)' }}
                >Book Site Survey ↗</a>
              </div>
            </div>

            {/* Stats card */}
            <div className="ev-hero-card">
              <div style={{
                background: 'var(--panel)', border: '1px solid rgba(43,91,168,.3)',
                borderRadius: 20, padding: 32, backdropFilter: 'blur(20px)',
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'rgba(43,91,168,.2)', borderRadius: 14, overflow: 'hidden', marginBottom: 24 }}>
                  {[
                    { v: '7–22', u: 'kW OUTPUT' },
                    { v: '~50mi', u: 'PER HOUR' },
                    { v: '100%', u: 'UK COMPLIANT' },
                    { v: '0%', u: 'VAT ELIGIBLE' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'var(--panel)', padding: '22px 20px', textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, color: i % 2 === 0 ? 'var(--blue-hi)' : 'var(--green-hi)', letterSpacing: 1 }}>{s.v}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: 'var(--muted)', letterSpacing: 1.5, marginTop: 4 }}>{s.u}</div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {['Smart 7 kW home chargers', '22 kW commercial solutions', 'OZEV grant assistance', 'NAPIT certified engineers'].map((f, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 13, color: 'var(--muted)' }}>
                      <span style={{ color: 'var(--blue-hi)', fontFamily: "'Space Mono', monospace", flexShrink: 0 }}>→</span>{f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSTALL ── */}
      <section style={{ padding: '90px 52px', borderBottom: '1px solid var(--line)' }} className="ev-install-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="section-label reveal">What We Install</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(34px,5vw,58px)', letterSpacing: 2, lineHeight: .95, marginBottom: 56,
          }}>CHARGING SOLUTIONS<br /><span style={{ color: 'var(--blue-hi)' }}>FOR EVERY NEED</span></h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }} className="ev-install-grid">
            {[
              {
                icon: '🏠', label: 'RESIDENTIAL', title: 'Home EV Charging',
                items: ['Smart home chargers (7.4 kW single-phase)', 'App-controlled charging systems', 'Off-peak tariff integration', 'OZEV grant eligible installs'],
                color: 'rgba(43,91,168,.15)', border: 'rgba(43,91,168,.3)',
              },
              {
                icon: '🏢', label: 'COMMERCIAL', title: 'Workplace & Fleet',
                items: ['7 kW to 22 kW systems', 'Multi-point installations', 'Load balancing for multiple vehicles', 'Fleet charging infrastructure'],
                color: 'rgba(90,140,46,.12)', border: 'rgba(90,140,46,.3)',
              },
              {
                icon: '🧠', label: 'SMART', title: 'Smart Charging',
                items: ['OCPP-enabled systems', 'Remote monitoring & control', 'Energy usage tracking', 'Solar & battery integration ready'],
                color: 'rgba(43,91,168,.1)', border: 'rgba(43,91,168,.2)',
              },
            ].map((item, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: item.color, border: `1px solid ${item.border}`,
                borderRadius: 18, padding: '32px 28px',
                transition: 'transform .3s', cursor: 'default',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = ''}
              >
                <div style={{ fontSize: 32, marginBottom: 16 }}>{item.icon}</div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: 'var(--blue-hi)', marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 20 }}>{item.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {item.items.map((f, j) => (
                    <li key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--muted)', alignItems: 'flex-start' }}>
                      <span style={{ color: 'var(--blue-hi)', flexShrink: 0, fontFamily: "'Space Mono',monospace" }}>→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-install-grid{ grid-template-columns:1fr !important; } .ev-install-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-install-section{ padding:60px 20px !important; } }
        `}</style>
      </section>

      {/* ── INSTALLATION PROCESS ── */}
      <section style={{
        padding: '90px 52px',
        background: 'linear-gradient(180deg, var(--ink-2) 0%, var(--ink) 100%)',
        borderBottom: '1px solid var(--line)',
      }} className="ev-process-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="section-label reveal">Our Process</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(34px,5vw,58px)', letterSpacing: 2, lineHeight: .95, marginBottom: 56,
          }}>ENGINEERING-LED<br /><span style={{ color: 'var(--blue-hi)' }}>INSTALLATION</span></h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: 'var(--line)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden' }} className="ev-steps-grid">
            {installSteps.map((s, i) => (
              <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`} style={{
                background: 'var(--panel)', padding: '32px 28px',
                transition: 'background .25s', position: 'relative',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,91,168,.08)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--panel)'}
              >
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
                  color: 'var(--blue-hi)', marginBottom: 16,
                }}>{s.num}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1, marginBottom: 10 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.75 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-steps-grid{ grid-template-columns:1fr 1fr !important; } .ev-process-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-steps-grid{ grid-template-columns:1fr !important; } .ev-process-section{ padding:60px 20px !important; } }
        `}</style>
      </section>

      {/* ── CHARGER RANGES ── */}
      <section style={{ padding: '90px 52px', borderBottom: '1px solid var(--line)' }} className="ev-range-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="section-label reveal">Our Range</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(34px,5vw,58px)', letterSpacing: 2, lineHeight: .95, marginBottom: 12,
          }}>CHARGER RANGE</h2>
          <p className="reveal reveal-delay-2" style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 520, lineHeight: 1.75, marginBottom: 52 }}>
            We take a consultative approach — recommending the most suitable charger based on your property, vehicle usage, and future energy plans.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginBottom: 20 }} className="ev-range-grid-top">
            {chargerRanges.slice(0, 3).map((r, i) => (
              <RangeCard key={i} r={r} i={i} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="ev-range-grid-bot">
            {chargerRanges.slice(3).map((r, i) => (
              <RangeCard key={i + 3} r={r} i={i + 3} />
            ))}
          </div>

          {/* CTA strip */}
          <div className="reveal" style={{
            marginTop: 40, padding: '28px 36px',
            background: 'rgba(43,91,168,.1)', border: '1px solid rgba(43,91,168,.25)',
            borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap',
          }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 4 }}>NOT SURE WHICH OPTION IS RIGHT?</div>
              <div style={{ fontSize: 13, color: 'var(--muted)' }}>Our team will assess your site and recommend the most suitable solution.</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--blue)', color: '#fff',
                padding: '12px 28px', borderRadius: 50,
                fontSize: 13, fontWeight: 500, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: .5,
                transition: 'all .2s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--blue-hi)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--blue)'}
              >Request a Quote →</a>
              <a href="#survey" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,.15)', color: 'var(--light)',
                padding: '12px 28px', borderRadius: 50,
                fontSize: 13, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: .5,
                transition: 'all .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-hi)'; e.currentTarget.style.color = 'var(--blue-hi)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.15)'; e.currentTarget.style.color = 'var(--light)' }}
              >Book Site Survey</a>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-range-grid-top,.ev-range-grid-bot{ grid-template-columns:1fr 1fr !important; } .ev-range-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-range-grid-top,.ev-range-grid-bot{ grid-template-columns:1fr !important; } .ev-range-section{ padding:60px 20px !important; } }
        `}</style>
      </section>

      {/* ── AFTER SALES ── */}
      <section style={{
        padding: '90px 52px',
        background: 'linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%)',
        borderBottom: '1px solid var(--line)',
      }} className="ev-aftersales-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 72, alignItems: 'start' }} className="ev-aftersales-grid">
            <div>
              <div className="section-label reveal">After Sales</div>
              <h2 className="reveal reveal-delay-1" style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(34px,5vw,54px)', letterSpacing: 2, lineHeight: .95, marginBottom: 18,
              }}>ONGOING<br />SUPPORT</h2>
              <p className="reveal reveal-delay-2" style={{ fontSize: 15, color: 'var(--light)', lineHeight: 1.75 }}>
                Installation is only the first step. Reliable performance depends on proper support and maintenance. We remain your partner for the long term.
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="ev-aftersales-cards">
              {afterSales.map((a, i) => (
                <div key={i} className={`reveal reveal-delay-${(i % 2) + 1}`} style={{
                  background: 'var(--panel)', border: '1px solid var(--line)',
                  borderRadius: 14, padding: '22px 20px',
                  transition: 'border-color .25s, transform .25s',
                  gridColumn: i === 4 ? 'span 2' : undefined,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,91,168,.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = '' }}
                >
                  <div style={{ fontSize: 24, marginBottom: 10 }}>{a.icon}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: 1, marginBottom: 6 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-aftersales-grid{ grid-template-columns:1fr !important; gap:40px !important; } .ev-aftersales-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-aftersales-cards{ grid-template-columns:1fr !important; } .ev-aftersales-section{ padding:60px 20px !important; } .ev-aftersales-cards > div[style*="span 2"]{ grid-column: span 1 !important; } }
        `}</style>
      </section>

      {/* ── COMPLIANCE ── */}
      <section style={{ padding: '80px 52px', borderBottom: '1px solid var(--line)' }} className="ev-compliance-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="section-label reveal">Standards</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(34px,5vw,58px)', letterSpacing: 2, lineHeight: .95, marginBottom: 40,
          }}>COMPLIANCE &<br /><span style={{ color: 'var(--blue-hi)' }}>CERTIFICATIONS</span></h2>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }} className="reveal reveal-delay-2">
            {compliance.map((c, i) => (
              <div key={i} style={{
                background: 'var(--panel)', border: '1px solid var(--line)',
                borderRadius: 12, padding: '18px 24px', minWidth: 160,
                transition: 'border-color .2s, transform .2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,91,168,.5)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 12, color: 'var(--blue-hi)', letterSpacing: 1, marginBottom: 6 }}>{c.code}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-compliance-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-compliance-section{ padding:60px 20px !important; } }
        `}</style>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section style={{ padding: '90px 52px', borderBottom: '1px solid var(--line)' }} className="ev-why-section">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="section-label reveal">Why Watten Power</div>
          <h2 className="reveal reveal-delay-1" style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(34px,5vw,58px)', letterSpacing: 2, lineHeight: .95, marginBottom: 52,
          }}>THE WATTEN<br /><span style={{ color: 'var(--blue-hi)' }}>DIFFERENCE</span></h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }} className="ev-why-grid">
            {whyUs.map((w, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: 'var(--panel)', border: '1px solid var(--line)',
                borderRadius: 16, padding: '28px 24px',
                transition: 'border-color .25s, transform .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(43,91,168,.4)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{w.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: 1, marginBottom: 8 }}>{w.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{w.desc}</div>
              </div>
            ))}
          </div>

          {/* Future-ready strip */}
          <div className="reveal" style={{
            marginTop: 40, padding: '32px 36px',
            background: 'linear-gradient(135deg, rgba(43,91,168,.15), rgba(90,140,46,.1))',
            border: '1px solid rgba(43,91,168,.3)',
            borderRadius: 16,
          }}>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: 1, marginBottom: 8 }}>
              FUTURE-READY ENERGY INTEGRATION
            </div>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, marginBottom: 20, maxWidth: 600 }}>
              Your EV charger is part of a wider energy ecosystem. Our systems are designed to integrate with solar PV, battery storage, and smart energy management platforms.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {['☀️ Solar PV Systems', '🔋 Battery Storage', '⚡ Smart Energy Management'].map((t, i) => (
                <span key={i} style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 1,
                  padding: '6px 14px', borderRadius: 50,
                  background: 'rgba(43,91,168,.2)', border: '1px solid rgba(43,91,168,.3)',
                  color: 'var(--blue-hi)',
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-why-grid{ grid-template-columns:1fr 1fr !important; } .ev-why-section{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-why-grid{ grid-template-columns:1fr !important; } .ev-why-section{ padding:60px 20px !important; } }
        `}</style>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="survey" style={{ padding: '90px 52px' }} className="ev-final-cta">
        <div style={{ maxWidth: 1140, margin: '0 auto' }}>
          <div className="reveal" style={{
            background: 'linear-gradient(135deg, rgba(43,91,168,.22), rgba(90,140,46,.12))',
            border: '1px solid rgba(43,91,168,.35)',
            borderRadius: 24, padding: '64px 56px', textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)',
              width: 400, height: 300,
              background: 'radial-gradient(circle, rgba(43,91,168,.15), transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--blue-hi)', marginBottom: 20 }}>
                Planning to install an EV charger?
              </div>
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(36px,5vw,64px)', letterSpacing: 2, lineHeight: .95, marginBottom: 16,
              }}>
                GET STARTED<br />
                <span style={{ color: 'var(--blue-hi)' }}>TODAY</span>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--light)', maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.7 }}>
                Speak with our team for a technical assessment and tailored recommendation — at no cost.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="ev-final-btns">
                <a href="mailto:hello@wattenpower.co.uk" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'linear-gradient(135deg, var(--blue), var(--blue-hi))',
                  color: '#fff', fontWeight: 500, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                  padding: '15px 36px', borderRadius: 50, textDecoration: 'none', transition: 'all .25s',
                  boxShadow: '0 8px 28px rgba(43,91,168,.4)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(43,91,168,.55)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,168,.4)' }}
                >Request a Quote →</a>
                <a href="mailto:hello@wattenpower.co.uk" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'transparent', color: 'var(--white)',
                  fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                  padding: '15px 36px', borderRadius: 50,
                  border: '1px solid rgba(255,255,255,.2)',
                  textDecoration: 'none', transition: 'all .25s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-hi)'; e.currentTarget.style.color = 'var(--blue-hi)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)'; e.currentTarget.style.color = 'var(--white)' }}
                >Book Site Survey ↗</a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          @media(max-width:960px){ .ev-final-cta{ padding:70px 32px !important; } }
          @media(max-width:600px){ .ev-final-cta{ padding:60px 20px !important; } .ev-final-cta > div > div{ padding:44px 24px !important; border-radius:18px !important; } .ev-final-btns{ flex-direction:column !important; align-items:stretch !important; } .ev-final-btns a{ justify-content:center !important; } }
        `}</style>
      </section>

      {/* Hero responsive */}
      <style>{`
        @media(max-width:960px){ .ev-hero{ padding:100px 32px 64px !important; } .ev-hero-grid{ grid-template-columns:1fr !important; gap:40px !important; } .ev-hero-card{ display:block; } }
        @media(max-width:600px){ .ev-hero{ padding:100px 20px 56px !important; } .ev-hero-cta{ flex-direction:column !important; align-items:stretch !important; } .ev-hero-cta a{ justify-content:center !important; } }
      `}</style>
    </div>
  )
}

function RangeCard({ r, i }) {
  return (
    <div className={`reveal reveal-delay-${(i % 3) + 1}`} style={{
      background: r.accent, border: `1px solid ${r.border}`,
      borderRadius: 16, padding: '28px 24px', position: 'relative',
      transition: 'transform .3s', cursor: 'default',
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = ''}
    >
      {r.featured && (
        <div style={{
          position: 'absolute', top: 16, right: 16,
          fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: 1.5,
          padding: '4px 10px', borderRadius: 50,
          background: 'rgba(43,91,168,.3)', color: 'var(--blue-hi)',
          border: '1px solid rgba(43,91,168,.4)',
          textTransform: 'uppercase',
        }}>Popular</div>
      )}
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2, color: r.color, marginBottom: 10 }}>{r.label}</div>
      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 4 }}>{r.title}</div>
      <div style={{ fontSize: 12, color: 'var(--muted)', marginBottom: 20 }}>{r.sub}</div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {r.features.map((f, j) => (
          <li key={j} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--muted)', alignItems: 'flex-start' }}>
            <span style={{ color: r.color, flexShrink: 0, fontFamily: "'Space Mono',monospace" }}>→</span>{f}
          </li>
        ))}
      </ul>
    </div>
  )
}