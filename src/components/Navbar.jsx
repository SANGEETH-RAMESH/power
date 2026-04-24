import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 52px', height: '70px',
      background: scrolled ? 'rgba(4,16,31,.97)' : 'rgba(4,16,31,.88)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(43,91,168,.22)',
      transition: 'background .3s',
    }}>
      <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
        <span style={{
          fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 2, lineHeight: 1
        }}>
          <span style={{ color: 'var(--blue-hi)' }}>WATTEN </span>
          <span style={{ color: 'var(--green-hi)' }}>POWER</span>
        </span>
      </a>

      {/* Desktop links */}
      <ul style={{
        display: 'flex', alignItems: 'center', gap: 36, listStyle: 'none', margin: 0, padding: 0
      }} className="nav-links-desktop">
        {['Services', 'Why Us', 'Our Approach', 'Compliance'].map((item, i) => (
          <li key={i}>
            <a href={`#${item.toLowerCase().replace(/\s+/g, '').replace('whyus','why').replace('ourapproach','approach')}`}
              style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 13, fontWeight: 400, letterSpacing: .5, transition: 'color .2s' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{item}</a>
          </li>
        ))}
        <li>
          <a href="#contact" style={{
            background: 'var(--green)', color: '#fff', padding: '9px 22px',
            borderRadius: 50, fontWeight: 500, fontSize: 13, textDecoration: 'none',
            transition: 'background .2s, transform .2s', display: 'inline-block'
          }}
            onMouseEnter={e => { e.target.style.background = 'var(--green-hi)'; e.target.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.target.style.background = 'var(--green)'; e.target.style.transform = '' }}
          >Get a Quote</a>
        </li>
      </ul>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', flexDirection: 'column', gap: 5, cursor: 'pointer', padding: 4, background: 'none', border: 'none' }}
        className="nav-hamburger"
        aria-label="Toggle menu"
      >
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--muted)', borderRadius: 1 }} />
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--muted)', borderRadius: 1 }} />
        <span style={{ display: 'block', width: 24, height: 2, background: 'var(--muted)', borderRadius: 1 }} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          display: 'flex', flexDirection: 'column', position: 'fixed',
          top: 70, left: 0, right: 0,
          background: 'rgba(4,16,31,.97)', padding: '28px 24px', gap: 22,
          borderBottom: '1px solid rgba(43,91,168,.25)', backdropFilter: 'blur(20px)',
          zIndex: 99
        }}>
          {['Services', 'Why Us', 'Our Approach', 'Compliance'].map((item, i) => (
            <a key={i} href="#" onClick={() => setMenuOpen(false)}
              style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: 14 }}>
              {item}
            </a>
          ))}
          <a href="#contact" onClick={() => setMenuOpen(false)}
            style={{ color: 'var(--green-hi)', textDecoration: 'none', fontSize: 14 }}>
            Get a Quote
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </nav>
  )
}
