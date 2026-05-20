import { Link } from "react-router-dom"
import logo from '../../assets/logo.png';

import termsPdf from '../../assets/pdfs/terms-and-conditions.pdf';
import privacyPdf from '../../assets/pdfs/privacy-policy.pdf';
import cookiePdf from '../../assets/pdfs/cookie-policy.pdf';
import salePdf from '../../assets/pdfs/terms-of-sale.pdf';
import refundPdf from '../../assets/pdfs/refunds-returns-policy.pdf';
import slaveryPdf from '../../assets/pdfs/modern-slavery.pdf';

export default function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      borderTop: '1px solid var(--line)',
      padding: '60px 52px 36px',
      background: 'var(--ink-2)',
    }} className="footer-root">
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-top">
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="logo" className="h-[44px] w-auto" />

              
            </Link>
          </div>
          <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
            Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV
            charging and solar installations for residential and commercial properties.
          </p>
        </div>

        {/* Services */}
        <FooterCol title="Services" links={[
          { label: 'EV Charger Installation', href: '/ev-charger' },
          { label: 'Solar System Installation', href: '/solar' },
          { label: 'Solar Estimator', href: '/solar-estimator' },
        ]} />

        {/* Contact Us */}
        <FooterCol title="Contact Us" links={[
          { label: '0208 001 1100', href: 'tel:02080011100' },
          { label: 'info@wattenpower.com', href: 'mailto:info@wattenpower.com' },
          {
            label: (
              <>
                Office 2, 60 Gold Street,<br />
                Northampton, NN1 1RS
              </>
            ), href: '#'
          },
        ]} />

        {/* Legal */}
        <FooterCol
          title="Legal"
          links={[
            {
              label: 'Terms & Conditions',
              href: termsPdf,
            },
            {
              label: 'Terms of Sale',
              href: salePdf,
            },
            {
              label: 'Cookie Policy',
              href: cookiePdf,
            },
            {
              label: 'Privacy Policy',
              href: privacyPdf,
            },
            {
              label: 'Refunds & Returns Policy',
              href: refundPdf,
            },
            {
              label: 'Modern Slavery Statement',
              href: slaveryPdf,
            },
          ]}
        />
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 28, borderTop: '1px solid var(--line)',
        fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap', gap: 12,
      }}>
        <span>© 2026 Watten Power Ltd. All rights reserved.</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1 }}>
          Made with ❤️ by poweroins
        </span>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-root { padding: 48px 32px 28px !important; }
          .footer-top { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 600px) {
          .footer-root { padding: 44px 20px 24px !important; }
          .footer-top { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 2,
        textTransform: 'uppercase', color: 'var(--light)', margin: '0 0 18px',
      }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l, i) => (
          <li key={i}>
            <a href={l.href} style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s', wordBreak: 'break-word' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}