import { useReveal } from '../../hooks/useReveal'

export default function CTA() {
  const ref = useReveal()

  return (
    <section id="contact" ref={ref} style={{ position: 'relative', zIndex: 2, padding: '100px 0', borderTop: '1px solid var(--line)' }} className="cta-section">
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 52px' }} className="cta-container">
        <div className="reveal cta-card" style={{
          background: 'linear-gradient(135deg, rgba(43,91,168,.22) 0%, rgba(90,140,46,.14) 100%)',
          border: '1px solid rgba(43,91,168,.35)',
          borderRadius: 24, padding: '70px 60px',
          textAlign: 'center', position: 'relative', overflow: 'hidden',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: 400, height: 400,
            background: 'radial-gradient(circle, rgba(90,140,46,.1), transparent 70%)',
            pointerEvents: 'none',
          }} />
          {/* Pattern overlay */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .5,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232B5BA8' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: 'var(--green-hi)', marginBottom: 20 }}>
              Ready to make the switch?
            </div>
            <h2 style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(38px, 6vw, 72px)', letterSpacing: 2, lineHeight: .95, marginBottom: 20,
            }}>
              GET YOUR<br />
              <span style={{ color: 'var(--green-hi)' }}>FREE QUOTE</span><br />
              TODAY
            </h2>
            <p style={{ fontSize: 16, color: 'var(--light)', maxWidth: 500, margin: '0 auto 44px', lineHeight: 1.7 }}>
              Whether you need an EV charger, a solar system, or both — our team will assess your property and deliver a tailored proposal at no cost.
            </p>
            <div className="cta-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:hello@wattenpower.co.uk" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--green)', color: '#fff',
                fontWeight: 500, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                padding: '15px 36px', borderRadius: 50, border: 'none', cursor: 'pointer',
                textDecoration: 'none', transition: 'all .25s',
                boxShadow: '0 8px 28px rgba(90,140,46,.35)',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--green-hi)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 14px 40px rgba(90,140,46,.45)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--green)'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 8px 28px rgba(90,140,46,.35)' }}
              >
                Book Free Survey →
              </a>
              <a href="tel:+44" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'transparent', color: 'var(--white)',
                fontWeight: 400, fontSize: 14, textTransform: 'uppercase', letterSpacing: 1,
                padding: '15px 36px', borderRadius: 50,
                border: '1px solid rgba(255,255,255,.2)', cursor: 'pointer',
                textDecoration: 'none', transition: 'all .25s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--blue-hi)'; e.currentTarget.style.color = 'var(--blue-hi)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)'; e.currentTarget.style.color = 'var(--white)' }}
              >
                Call Us ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .cta-section { padding: 70px 0 !important; }
          .cta-container { padding: 0 32px !important; }
          .cta-card { padding: 52px 36px !important; }
        }
        @media (max-width: 600px) {
          .cta-container { padding: 0 20px !important; }
          .cta-card { padding: 44px 24px !important; border-radius: 18px !important; }
          .cta-buttons {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .cta-buttons a {
            justify-content: center !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  )
}