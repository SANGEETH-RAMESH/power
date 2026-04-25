import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import logo from '../../assets/logo.png';

const navItems = [
  { label: 'Home', link: '/' },
  { label: 'EV Charger', link: '/ev-charger' },
  { label: "Solar Solution", link: "/solar" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[70px] backdrop-blur-xl border-b border-[#2b5ba8]/20 transition-all duration-300 ${scrolled ? 'bg-[#04101f]/95 shadow-lg' : 'bg-[#04101f]/90'
        }`}
    >
      {/* ── LOGO ── */}
      <Link to="/" className="flex items-center gap-3">
        <img src={logo} alt="logo" className="h-[40px]" />
      </Link>

      {/* ── MOBILE HAMBURGER BUTTON ── */}
      <button
        className="flex lg:hidden flex-col gap-[5px] p-2 z-[101]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
        <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${menuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
      </button>

      {/* ── UNIFIED LINKS (DESKTOP + MOBILE) ── */}
      <ul className={`
        absolute lg:static top-[70px] inset-x-0 bg-[#04101f]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
        border-b lg:border-none border-[#2b5ba8]/20
        flex-col lg:flex-row p-6 lg:p-0 gap-6 lg:gap-9 items-start lg:items-center
        transition-all duration-300 ease-in-out lg:transform-none lg:opacity-100 lg:pointer-events-auto lg:flex
        ${menuOpen ? 'translate-y-0 opacity-100 pointer-events-auto flex' : '-translate-y-full opacity-0 pointer-events-none hidden'}
      `}>
        {navItems.map((item) => (
          <li key={item.label} className="w-full lg:w-auto border-b lg:border-none border-[#2b5ba8]/10 pb-4 lg:pb-0">
            {item.link.startsWith('/') ? (
              <Link
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className={`text-sm tracking-wide transition-colors block ${location.pathname === item.link
                    ? "text-white font-semibold"  
                    : "text-[#6a80a8] hover:text-white"
                  }`}
              >
                {item.label}
              </Link>
            ) : (
              <a
                href={item.link}
                onClick={() => setMenuOpen(false)}
                className="text-[#6a80a8] hover:text-white text-sm tracking-wide transition-colors block"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
        {/* <li className="pt-2 lg:pt-0 w-full lg:w-auto">
          <a 
            href="#contact" 
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-full lg:w-auto bg-[#2B5BA8] hover:bg-[#4a7fd4] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5"
          >
            Get a Quote
          </a>
        </li> */}
      </ul>
    </nav>
  );
}