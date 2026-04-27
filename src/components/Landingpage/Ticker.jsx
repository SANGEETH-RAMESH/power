const items = [
  'EV Charger Installation', 'Solar System Installation', 'MCS Certified',
  'OZEV Grant Compliant', '0% VAT on Residential Solar', 'NAPIT Approved',
  'Smart Export Guarantee', 'UK Standards Compliant',
]

export default function Ticker() {
  const doubled = [...items, ...items]
  return (
    <div style={{
      position: 'relative', zIndex: 2,
      background: 'var(--blue-2)',
      borderTop: '1px solid rgba(43,91,168,.4)',
      borderBottom: '1px solid rgba(43,91,168,.4)',
      padding: '14px 0', overflow: 'hidden', whiteSpace: 'nowrap',
    }}>
      <div className="anim-ticker" style={{ display: 'inline-flex', gap: 0 }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', gap: 12, padding: '0 24px',
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 2,
            textTransform: 'uppercase', color: 'rgba(255,255,255,.6)',
          }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--green-hi)', flexShrink: 0, display: 'inline-block' }} />
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .anim-ticker span { font-size: 10px !important; padding: 0 16px !important; letter-spacing: 1px !important; }
        }
      `}</style>
    </div>
  )
}