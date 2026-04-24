import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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
              <a href={`#${item.toLowerCase().replace(/\s+/g, '').replace('whyus', 'why').replace('ourapproach', 'approach')}`}
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
          style={{
            display: 'none', flexDirection: 'column', gap: 5,
            cursor: 'pointer', padding: 8, background: 'none', border: 'none',
            borderRadius: 8, transition: 'background .2s',
          }}
          className="nav-hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span style={{
            display: 'block', width: 24, height: 2,
            background: menuOpen ? 'var(--green-hi)' : 'var(--muted)',
            borderRadius: 1, transition: 'transform .3s, background .2s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : '',
          }} />
          <span style={{
            display: 'block', width: 24, height: 2,
            background: menuOpen ? 'var(--green-hi)' : 'var(--muted)',
            borderRadius: 1, transition: 'opacity .3s, background .2s',
            opacity: menuOpen ? 0 : 1,
          }} />
          <span style={{
            display: 'block', width: 24, height: 2,
            background: menuOpen ? 'var(--green-hi)' : 'var(--muted)',
            borderRadius: 1, transition: 'transform .3s, background .2s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : '',
          }} />
        </button>
      </nav>

      {/* Mobile menu — rendered outside nav to avoid z-index stacking issues */}
      <div style={{
        display: menuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'fixed',
        top: 70, left: 0, right: 0,
        background: 'rgba(4,16,31,.98)',
        padding: '28px 24px',
        gap: 0,
        borderBottom: '1px solid rgba(43,91,168,.25)',
        backdropFilter: 'blur(20px)',
        zIndex: 99,
      }}>
        {['Services', 'Why Us', 'Our Approach', 'Compliance'].map((item, i) => (
          <a
            key={i}
            href={`#${item.toLowerCase().replace(/\s+/g, '').replace('whyus', 'why').replace('ourapproach', 'approach')}`}
            onClick={closeMenu}
            style={{
              color: 'var(--muted)', textDecoration: 'none', fontSize: 15,
              padding: '14px 0',
              borderBottom: '1px solid rgba(43,91,168,.15)',
              transition: 'color .2s',
              display: 'block',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--white)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
          >
            {item}
          </a>
        ))}
        <a href="#contact" onClick={closeMenu}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 20,
            background: 'var(--green)', color: '#fff',
            padding: '13px 28px', borderRadius: 50,
            fontWeight: 500, fontSize: 14, textDecoration: 'none',
            textAlign: 'center',
          }}>
          Get a Quote
        </a>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </>
  )
}