import { useReveal } from '../hooks/useReveal'

const pillars = [
  { icon: '🔍', title: 'NEEDS-BASED DESIGN', desc: 'Systems sized and configured based on your actual energy usage and property, not generic packages.' },
  { icon: '✅', title: 'FULLY COMPLIANT', desc: 'Aligned with UK electrical standards, building regulations, and DNO requirements from day one.' },
  { icon: '📈', title: 'BUILT FOR SCALE', desc: 'Infrastructure designed with future capacity in mind — add battery storage, more panels, or EV chargers later.' },
  { icon: '🤝', title: 'ONGOING SUPPORT', desc: 'We remain your partner beyond installation — monitoring, maintenance, and technical advice when you need it.' },
]

const stats = [
  { num: '100%', label: 'UK COMPLIANT' },
  { num: '25yr', label: 'PANEL WARRANTY' },
  { num: '0%', label: 'VAT RESIDENTIAL' },
]

export default function WhyUs() {
  const ref = useReveal()

  return (
    <section id="why" ref={ref} style={{
      position: 'relative', zIndex: 2,
      padding: '100px 0',
      borderTop: '1px solid var(--line)',
    }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 52px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'center' }} className="why-grid">
          {/* Left */}
          <div>
            <div className="section-label reveal">Why Watten Power</div>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(38px,5vw,62px)', lineHeight: .95, letterSpacing: 2, marginBottom: 18,
            }}>ENGINEERING-<br />LED.<br />ALWAYS.</h2>
            <p className="reveal reveal-delay-2" style={{ fontSize: 16, color: 'var(--light)', fontWeight: 300, maxWidth: 520, lineHeight: 1.75 }}>
              We don't believe in off-the-shelf solutions. Every installation is designed around your actual usage, capacity, and long-term goals.
            </p>

            {/* Stats */}
            <div className="reveal reveal-delay-3" style={{
              display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
              gap: 1, background: 'var(--line)',
              border: '1px solid var(--line)', borderRadius: 16,
              overflow: 'hidden', marginTop: 48,
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: i === 0 ? 'rgba(43,91,168,.12)' : 'var(--ink-2)',
                  padding: '28px 24px', textAlign: 'center',
                }}>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 1,
                    background: 'linear-gradient(135deg,var(--blue-hi),var(--green-hi))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>{s.num}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', fontFamily: "'Space Mono', monospace", letterSpacing: 1, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right pillars */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }} className="why-right">
            {pillars.map((p, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1}`} style={{
                background: 'var(--panel)', border: '1px solid var(--line)',
                borderRadius: 16, padding: '26px 24px', backdropFilter: 'blur(12px)',
                transition: 'border-color .25s, transform .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,140,46,.45)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--line)'; e.currentTarget.style.transform = '' }}
              >
                <div style={{ fontSize: 26, marginBottom: 14 }}>{p.icon}</div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: 1, marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 960px) {
          .why-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .why-right { grid-template-columns: 1fr 1fr !important; }
          section > div { padding: 0 24px !important; }
        }
        @media (max-width: 600px) {
          .why-right { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
