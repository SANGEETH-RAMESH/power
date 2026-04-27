export default function Hero() {
  return (
    <section style={{
      position: 'relative', zIndex: 2,
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      alignItems: 'center',
      padding: '0 52px',
      gap: 60,
      overflow: 'hidden',
    }} className="hero-section">
      {/* Glow orb */}
      <div style={{
        position: 'absolute', width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(43,91,168,.18) 0%, transparent 70%)',
        top: '50%', left: 0, transform: 'translateY(-50%)', pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, paddingTop: 70 }} className="hero-content">
        <div className="anim-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          border: '1px solid var(--line-g)', background: 'var(--green-dim)',
          borderRadius: 50, padding: '6px 16px 6px 10px', marginBottom: 32,
          fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
          textTransform: 'uppercase', color: 'var(--green-hi)',
        }}>
          <span className="anim-blink" style={{
            width: 6, height: 6, borderRadius: '50%', background: 'var(--green-hi)',
            display: 'inline-block'
          }} />
          UK-Based Clean Energy Specialists
        </div>

        <h1 className="anim-fade-up-1" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(48px, 7vw, 92px)',
          lineHeight: .95, letterSpacing: 2, marginBottom: 10, margin: 0,
        }}>
          <span style={{ color: 'var(--white)', display: 'block' }}>SMART</span>
          <span style={{ color: 'var(--blue-hi)', display: 'block' }}>ENERGY</span>
          <span style={{ color: 'var(--green-hi)', display: 'block' }}>SOLUTIONS</span>
        </h1>

        <p className="anim-fade-up-2" style={{
          fontSize: 16, color: 'var(--light)', fontWeight: 300,
          maxWidth: 460, lineHeight: 1.7, margin: '24px 0 44px',
        }}>
          Professional EV charger and solar system installation for residential and commercial properties across the UK. Safe, compliant, and future-ready.
        </p>

        <div className="anim-fade-up-3 hero-cta" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a href="#services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'linear-gradient(135deg, var(--blue), var(--blue-hi))',
            color: '#fff', fontWeight: 500, fontSize: 14,
            textTransform: 'uppercase', letterSpacing: 1,
            padding: '15px 36px', borderRadius: 50, border: 'none',
            cursor: 'pointer', textDecoration: 'none', transition: 'all .25s',
            boxShadow: '0 8px 28px rgba(43,91,168,.4)',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(43,91,168,.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(43,91,168,.4)' }}
          >
            Explore Services <span>→</span>
          </a>
          <a href="/contact-us" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--light)', fontSize: 14, fontWeight: 400,
            textDecoration: 'none', letterSpacing: .5,
            borderBottom: '1px solid rgba(200,216,240,.3)', paddingBottom: 2,
            transition: 'color .2s, border-color .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--white)'; e.currentTarget.style.borderColor = 'var(--green-hi)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--light)'; e.currentTarget.style.borderColor = 'rgba(200,216,240,.3)' }}
          >
            Get a Free Quote <span>↗</span>
          </a>
        </div>
      </div>

      {/* Visual cards */}
      <div className="anim-fade-up-v hero-visual" style={{ position: 'relative', zIndex: 2, paddingTop: 70 }}>
        <div style={{ position: 'relative' }}>
          {/* Main card */}
          <div style={{
            background: 'var(--panel)', border: '1px solid var(--line)',
            borderRadius: 20, backdropFilter: 'blur(20px)', padding: 28,
            transition: 'transform .4s ease',
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = ''}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
                background: 'rgba(43,91,168,.25)', border: '1px solid rgba(43,91,168,.4)',
              }}>⚡</div>
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1,
                padding: '4px 10px', borderRadius: 50,
                background: 'rgba(90,140,46,.2)', color: 'var(--green-hi)',
                border: '1px solid var(--line-g)',
              }}>● LIVE</span>
            </div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 4 }}>EV CHARGING SYSTEM</div>
            <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>
              Smart 7–22 kW home & commercial charger installations. OZEV-grant compliant, NAPIT-certified.
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
              marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--line)',
            }}>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 1, color: 'var(--green-hi)' }}>7–22 kW</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Space Mono', monospace" }}>CHARGE RATE</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 36, letterSpacing: 1, color: 'var(--blue-hi)' }}>~50mi</div>
                <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Space Mono', monospace" }}>PER HOUR</div>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div className="anim-float" style={{
            position: 'absolute', bottom: -30, right: -20, width: 220,
            background: 'var(--panel)', border: '1px solid var(--line-g)',
            borderRadius: 16, backdropFilter: 'blur(20px)', padding: '18px 20px',
          }}>
            <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginBottom: 8 }}>SOLAR OUTPUT</div>
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)', letterSpacing: 1 }}>4.2 kWp</div>
            <div style={{ fontSize: 11, color: 'var(--green-hi)', marginTop: 4 }}>↑ Saving £1,200/yr</div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="hero-scroll-hint" style={{
        position: 'absolute', bottom: 36, left: 52, display: 'flex', alignItems: 'center', gap: 12,
        fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 2,
        color: 'var(--muted)', textTransform: 'uppercase', zIndex: 2,
      }}>
        <div style={{ width: 40, height: 1, background: 'var(--muted)' }} />
        Scroll to explore
      </div>

      <style>{`
        /* Tablet */
        @media (max-width: 960px) {
          .hero-section {
            grid-template-columns: 1fr !important;
            padding: 0 32px !important;
            padding-top: 90px !important;
            padding-bottom: 60px !important;
            min-height: auto !important;
            gap: 0 !important;
            text-align: center;
          }
          .hero-content { padding-top: 0 !important; }
          .hero-visual { display: none !important; }
          .hero-cta { justify-content: center !important; }
          .hero-scroll-hint { display: none !important; }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .hero-section {
            padding: 0 20px !important;
            padding-top: 100px !important;
            padding-bottom: 60px !important;
          }
          .hero-cta {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 12px !important;
          }
          .hero-cta a:first-child {
            justify-content: center !important;
          }
          .hero-cta a:last-child {
            justify-content: center !important;
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}