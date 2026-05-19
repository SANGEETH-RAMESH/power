import { useReveal } from '../../hooks/useReveal';
import awardIcon from '../../assets/new/awards.svg';
import plugIcon from '../../assets/new/plug.svg';
import carIcon from '../../assets/new/vechile.svg';
import lightningIcon from '../../assets/new/lightning.svg';
import solarIcon from '../../assets/new/sun.svg';
import gbIcon from '../../assets/new/gb1.svg';


const certs = [
  { icon: awardIcon, name: 'MCS', desc: 'Microgeneration Certification Scheme for solar', status: 'in-progress' },
  { icon: plugIcon, name: 'NAPIT', desc: 'Approved Electrical Certification body', status: 'in-progress' },
  { icon: carIcon, name: 'OZEV', desc: 'EV Chargepoint Grant compliance', status: 'in-progress' },
  { icon: lightningIcon, name: 'BS 7671', desc: 'UK Wiring Regulations 18th Edition', status: 'compliant' },
  { icon: solarIcon, name: 'G98/G99', desc: 'DNO grid connection compliance', status: 'compliant' },
  { icon: gbIcon, name: '0% VAT', desc: 'Residential solar & qualifying installs', status: 'confirmed' },
]

const statusConfig = {
  'in-progress': {
    label: '+ IN PROGRESS',
    style: {
      background: 'rgba(255,140,0,0.15)',
      color: '#FFA500',
      border: '1px solid rgba(255,140,0,0.35)',
    },
  },
  compliant: {
    label: '✓ COMPLIANT',
    style: {
      background: 'rgba(90,140,46,0.15)',
      color: 'var(--green-hi)',
      border: '1px solid rgba(90,140,46,0.35)',
    },
  },
  confirmed: {
    label: '✓ CONFIRMED',
    style: {
      background: 'rgba(90,140,46,0.15)',
      color: 'var(--green-hi)',
      border: '1px solid rgba(90,140,46,0.35)',
    },
  },
}

export default function Compliance() {
  const ref = useReveal()

  return (
    <section id="compliance" ref={ref} style={{
      position: 'relative', zIndex: 2,
      padding: '80px 0',
      borderTop: '1px solid var(--line)',
    }} className="compliance-section">
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 52px' }} className="compliance-container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }} className="compliance-inner">
          <div>
            <div className="section-label reveal before:hidden" style={{ marginLeft: 0, paddingLeft: 0 }}>Standards & Compliance</div>
            <h2 className="reveal reveal-delay-1" style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(34px, 5vw, 62px)', lineHeight: .95, letterSpacing: 2, marginBottom: 18,
            }}>SAFE.<br />CERTIFIED.<br />RELIABLE.</h2>
            <p className="reveal reveal-delay-2" style={{ fontSize: 16, color: 'var(--light)', fontWeight: 300, maxWidth: 520, lineHeight: 1.75 }}>
              Our installations are aligned with UK electrical and safety standards, ensuring long-term performance you can trust.
            </p>
            <div className="reveal reveal-delay-3" style={{
              fontSize: 13, color: 'var(--muted)', marginTop: 20,
              lineHeight: 1.7, padding: 16, borderLeft: '2px solid var(--line-g)',
            }}>
              We are actively working towards full MCS, NAPIT, and OZEV certification. All current installations meet applicable UK electrical regulations and standards.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="cert-badges">
            {certs.map((c, i) => {
              const status = statusConfig[c.status]
              return (
                <div key={i} className={`reveal reveal-delay-${(i % 3) + 1}`} style={{
                  background: 'var(--panel)', border: '1px solid var(--line)',
                  borderRadius: 14, padding: '22px 16px', textAlign: 'center',
                  backdropFilter: 'blur(12px)', transition: 'border-color .25s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0,
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.4)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>
                    <img src={c.icon} alt="" style={{ width: 18, height: 18, filter: 'invert(32%) sepia(98%) saturate(1600%) hue-rotate(200deg) brightness(98%) contrast(98%)' }} />
                  </div>
                  <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1.5, color: 'var(--green-hi)', textTransform: 'uppercase', marginBottom: 4 }}>{c.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5, marginBottom: 14, flexGrow: 1 }}>{c.desc}</div>
                  <div style={{
                    ...status.style,
                    borderRadius: 999,
                    padding: '4px 10px',
                    fontSize: 9,
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: 1.2,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                  }}>
                    {status.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .compliance-section { padding: 70px 0 !important; }
          .compliance-container { padding: 0 32px !important; }
          .compliance-inner { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cert-badges { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .compliance-container { padding: 0 20px !important; }
          .cert-badges { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
        }
        @media (max-width: 380px) {
          .cert-badges { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}