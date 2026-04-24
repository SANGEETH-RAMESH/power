import { useReveal } from '../../hooks/useReveal'

const steps = [
  { num: '01', title: 'ASSESSMENT', desc: 'We survey your property, review your energy usage, and assess your requirements — residential or commercial.' },
  { num: '02', title: 'DESIGN', desc: 'Our engineers design a system tailored to your capacity and goals, with full compliance built in from the start.' },
  { num: '03', title: 'INSTALLATION', desc: 'Clean, professional installation by certified engineers. Minimal disruption, maximum reliability.' },
  { num: '04', title: 'HANDOVER', desc: "Full commissioning, documentation, compliance certificates, and a walkthrough so you're confident from day one." },
]

export default function Approach() {
  const ref = useReveal()

  return (
    <section id="approach" ref={ref} style={{
      position: 'relative', zIndex: 2,
      padding: '100px 0',
      borderTop: '1px solid var(--line)',
      background: 'linear-gradient(180deg, var(--ink) 0%, var(--ink-2) 100%)',
    }} className="approach-section">
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 52px' }} className="approach-container">
        <div className="section-label reveal">Our Approach</div>
        <h2 className="reveal reveal-delay-1" style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(34px, 5vw, 62px)', lineHeight: .95, letterSpacing: 2, marginBottom: 60,
        }}>HOW IT WORKS</h2>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4,1fr)',
          border: '1px solid var(--line)', borderRadius: 16, overflow: 'hidden',
        }} className="approach-steps">
          {steps.map((s, i) => (
            <div key={i} className={`reveal reveal-delay-${i + 1} approach-step`} style={{
              padding: '36px 28px',
              borderRight: i < 3 ? '1px solid var(--line)' : 'none',
              position: 'relative', transition: 'background .25s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,91,168,.06)'}
              onMouseLeave={e => e.currentTarget.style.background = ''}
            >
              {i < 3 && (
                <span className="approach-arrow" style={{ position: 'absolute', right: 20, top: 36, fontSize: 18, color: 'var(--line)' }}>→</span>
              )}
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2, color: 'var(--green-hi)', marginBottom: 20 }}>{s.num}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1, marginBottom: 12 }}>{s.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.75 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .approach-section { padding: 70px 0 !important; }
          .approach-container { padding: 0 32px !important; }
          .approach-steps {
            grid-template-columns: 1fr 1fr !important;
          }
          /* Reset borders for 2-col layout */
          .approach-step {
            border-right: none !important;
            border-bottom: 1px solid var(--line);
          }
          .approach-step:nth-child(1),
          .approach-step:nth-child(2) {
            border-bottom: 1px solid var(--line);
          }
          .approach-step:nth-child(3),
          .approach-step:nth-child(4) {
            border-bottom: none;
          }
          .approach-step:nth-child(odd) {
            border-right: 1px solid var(--line) !important;
          }
          .approach-arrow { display: none !important; }
        }
        @media (max-width: 600px) {
          .approach-container { padding: 0 20px !important; }
          .approach-steps { grid-template-columns: 1fr !important; }
          .approach-step {
            border-right: none !important;
            border-bottom: 1px solid var(--line) !important;
          }
          .approach-step:last-child {
            border-bottom: none !important;
          }
          .approach-step { padding: 28px 24px !important; }
        }
      `}</style>
    </section>
  )
}