import { useEffect, useState } from 'react'
import logo from '../../assets/logo.png'; 

const navItems = [
  { label: 'Solar', link: '/solar' },
  { label: 'Services', link: '#services' },
  { label: 'Process', link: '#process' },
  { label: 'Range', link: '#range' },
  { label: 'Support', link: '#support' },
];

const installSteps = [
  { num: '01', title: 'SITE SURVEY', desc: 'We assess your electrical capacity, parking layout, and installation feasibility.' },
  { num: '02', title: 'SYSTEM DESIGN', desc: 'We recommend the right charger type, power rating, and protection systems.' },
  { num: '03', title: 'DNO NOTIFICATION', desc: 'We handle Distribution Network Operator notifications for higher load installations.' },
  { num: '04', title: 'INSTALLATION', desc: 'Certified engineers complete installation including cabling, mounting, and connections.' },
  { num: '05', title: 'TESTING & CERT', desc: 'Full electrical testing is carried out and certification is issued.' },
  { num: '06', title: 'HANDOVER', desc: 'We guide you through charger usage, app setup, and safety procedures.' },
]

const chargerRanges = [
  {
    label: 'ENTRY',
    title: 'Simple & Reliable',
    sub: 'Cost-effective daily charging',
    features: ['Ideal for daily residential use', '7.4 kW single-phase systems', 'Basic smart functionality', 'Compact and practical design'],
    color: 'text-[#6a80a8]',
    bgAccent: 'bg-[#c8d8f0]/10',
    borderColor: 'border-[#c8d8f0]/20',
    hoverBorder: 'hover:border-[#c8d8f0]/40',
  },
  {
    label: 'SMART',
    title: 'Enhanced Control',
    sub: 'Performance meets intelligence',
    features: ['App-enabled charging control', 'Scheduling & off-peak optimisation', 'Energy usage monitoring', 'Suitable for homes & small businesses'],
    color: 'text-[#4a7fd4]',
    bgAccent: 'bg-[#2b5ba8]/15',
    borderColor: 'border-[#2b5ba8]/35',
    hoverBorder: 'hover:border-[#4a7fd4]/60',
  },
  {
    label: 'PREMIUM',
    title: 'Advanced Performance',
    sub: 'For a refined experience',
    features: ['Advanced smart features', 'Faster charging capability', 'Sleek modern design', 'Enhanced user interface & control'],
    color: 'text-[#79bc3c]',
    bgAccent: 'bg-[#2b5ba8]/15',
    borderColor: 'border-[#2b5ba8]/35',
    hoverBorder: 'hover:border-[#79bc3c]/60',
  },
  {
    label: 'COMMERCIAL',
    title: 'Built for Scale',
    sub: 'Workplace & fleet infrastructure',
    features: ['Multiple charger installations', 'Load balancing across units', 'User access control', 'Usage tracking and reporting'],
    color: 'text-[#4a7fd4]',
    bgAccent: 'bg-[#2b5ba8]/10',
    borderColor: 'border-[#2b5ba8]/25',
    hoverBorder: 'hover:border-[#4a7fd4]/50',
  },
  {
    label: 'FUTURE-READY',
    title: 'Integrated Energy',
    sub: 'Designed for smart ecosystems',
    features: ['Solar-compatible systems', 'Battery-ready integration', 'Smart energy ecosystem support', 'Ideal for long-term optimisation'],
    color: 'text-[#79bc3c]',
    bgAccent: 'bg-[#2b5ba8]/15',
    borderColor: 'border-[#2b5ba8]/35',
    hoverBorder: 'hover:border-[#79bc3c]/60',
  },
]

const afterSales = [
  { icon: '🛡️', title: 'WARRANTY SUPPORT', desc: 'We support manufacturer warranties and assist in resolving early-stage issues.' },
  { icon: '📞', title: 'TECHNICAL SUPPORT', desc: 'Remote and on-call assistance for charger faults, connectivity issues, and charging interruptions.' },
  { icon: '🔧', title: 'MAINTENANCE', desc: 'Periodic inspection, electrical safety checks, and cable & connection inspection.' },
  { icon: '⚡', title: 'TROUBLESHOOTING', desc: 'Fast response support for system faults and performance issues.' },
  { icon: '📈', title: 'SYSTEM UPGRADES', desc: 'Additional chargers, load balancing upgrades, and solar & battery integration.' },
]

const compliance = [
  { code: 'BS 7671', desc: 'IET Wiring Regulations' },
  { code: 'BS EN 61851', desc: 'EV Charging Systems' },
  { code: 'UK SCPR', desc: 'Smart Charge Point Regulations' },
  { code: 'G98/G99', desc: 'Grid Connection Compliance' },
  { code: 'OCPP 1.6J', desc: 'Open Charge Point Protocol' },
]

const whyUs = [
  { icon: '⚙️', title: 'ENGINEERING-LED', desc: 'Systems designed on actual load requirements, not generic templates.' },
  { icon: '✅', title: 'FULLY COMPLIANT', desc: 'Every installation meets UK electrical and safety regulations.' },
  { icon: '📐', title: 'SCALABLE', desc: 'Installations designed to support future solar and battery integration.' },
  { icon: '💬', title: 'TRANSPARENT', desc: 'Clear scope, clear pricing, no unnecessary upselling.' },
]

export default function EVPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-tw");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", "translate-y-7");
          e.target.classList.add("opacity-100", "translate-y-0");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10 bg-[#04101f] text-[#f2f7ff] font-['DM_Sans'] font-light leading-relaxed overflow-x-hidden selection:bg-[#2B5BA8] selection:text-white">
      
      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[70px] bg-[#04101f]/90 backdrop-blur-xl border-b border-[#2b5ba8]/20 transition-colors">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-[40px]" />
        </a>

        {/* Mobile Menu Button */}
        <button 
          className="flex lg:hidden flex-col gap-[5px] p-2 z-[101]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
        </button>

        {/* Links */}
        <ul className={`
          absolute lg:static top-[70px] inset-x-0 bg-[#04101f]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
          border-b lg:border-none border-[#2b5ba8]/20
          flex-col lg:flex-row p-6 lg:p-0 gap-6 lg:gap-9 items-start lg:items-center
          transition-all duration-300 ease-in-out lg:transform-none lg:opacity-100 lg:pointer-events-auto lg:flex
          ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto flex' : '-translate-y-full opacity-0 pointer-events-none hidden'}
        `}>
          {navItems.map((item) => (
            <li key={item.label} className="w-full lg:w-auto border-b lg:border-none border-[#2b5ba8]/10 pb-4 lg:pb-0">
              <a 
                href={item.link} 
                onClick={() => setIsMenuOpen(false)}
                className="text-[#6a80a8] hover:text-white text-sm tracking-wide transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2 lg:pt-0">
            <a 
              href="#survey" 
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#2B5BA8] hover:bg-[#4a7fd4] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 inline-block"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center pt-[120px] px-6 lg:px-12 pb-20 overflow-hidden border-b border-[#2b5ba8]/22">
        {/* Animated background grid */}
        <div className="absolute inset-0 pointer-events-none opacity-50 bg-[size:60px_60px] bg-[linear-gradient(rgba(43,91,168,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(43,91,168,0.15)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_60%_50%,black_30%,transparent_80%)]" />
        
        {/* Glow */}
        <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(43,91,168,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1140px] mx-auto w-full relative z-10">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 mb-8 font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] uppercase">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span className="text-[#2b5ba8]/50">→</span>
            <span className="text-[#4a7fd4]">EV Charger Installation</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="inline-flex items-center gap-2.5 border border-[#2b5ba8]/40 bg-[#2b5ba8]/10 rounded-full py-1.5 px-4 pl-2.5 mb-7 font-['Space_Mono'] font-mono text-[10px] tracking-widest uppercase text-[#4a7fd4]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4a7fd4] inline-block animate-pulse" />
                Residential · Commercial · Fleet
              </div>
              <h1 className="font-['Bebas_Neue'] text-[clamp(48px,6.5vw,88px)] leading-[0.92] tracking-wide mb-6">
                <span className="text-white block">EV CHARGER</span>
                <span className="text-[#4a7fd4] block">INSTALLATION</span>
              </h1>
              <p className="text-[17px] text-[#c8d8f0] font-light leading-relaxed max-w-lg mb-10">
                Reliable. Compliant. Future-Ready. Power your transition to electric mobility with professionally installed EV charging solutions by Watten Power Ltd.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#survey" className="inline-flex justify-center items-center gap-2 bg-gradient-to-br from-[#2B5BA8] to-[#4a7fd4] text-white font-medium text-sm uppercase tracking-wide py-3.5 px-8 rounded-full shadow-[0_8px_28px_rgba(43,91,168,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(43,91,168,0.55)] transition-all">
                  Request a Quote →
                </a>
                <a href="#services" className="inline-flex justify-center items-center gap-2 text-[#c8d8f0] text-sm uppercase tracking-wide py-3.5 px-8 rounded-full border border-white/15 hover:border-[#4a7fd4] hover:text-[#4a7fd4] transition-all">
                  Book Site Survey ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSTALL ── */}
      <section id="services" className="py-20 lg:py-24 px-6 lg:px-12 border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> What We Install
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,58px)] leading-[0.95] tracking-wide mb-12 lg:mb-14">
              CHARGING SOLUTIONS<br /><span className="text-[#4a7fd4]">FOR EVERY NEED</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { icon: '🏠', label: 'RESIDENTIAL', title: 'Home EV Charging', items: ['Smart home chargers (7.4 kW single-phase)', 'App-controlled charging systems', 'Off-peak tariff integration', 'OZEV grant eligible installs'], bg: 'bg-[#2b5ba8]/15', border: 'border-[#2b5ba8]/30', hover: 'hover:border-[#4a7fd4]/60' },
              { icon: '🏢', label: 'COMMERCIAL', title: 'Workplace & Fleet', items: ['7 kW to 22 kW systems', 'Multi-point installations', 'Load balancing for multiple vehicles', 'Fleet charging infrastructure'], bg: 'bg-[#2b5ba8]/15', border: 'border-[#2b5ba8]/30', hover: 'hover:border-[#4a7fd4]/60' },
              { icon: '🧠', label: 'SMART', title: 'Smart Charging', items: ['OCPP-enabled systems', 'Remote monitoring & control', 'Energy usage tracking', 'Solar & battery integration ready'], bg: 'bg-[#2b5ba8]/10', border: 'border-[#2b5ba8]/20', hover: 'hover:border-[#4a7fd4]/50' },
            ].map((item, i) => (
              <div key={i} className={`reveal-tw opacity-0 translate-y-7 transition-all duration-700 ${item.bg} border ${item.border} ${item.hover} rounded-[18px] p-8 hover:-translate-y-1`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-[32px] mb-4">{item.icon}</div>
                <div className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#4a7fd4] mb-2">{item.label}</div>
                <div className="font-['Bebas_Neue'] text-[22px] tracking-wide mb-5">{item.title}</div>
                <ul className="flex flex-col gap-2.5">
                  {item.items.map((f, j) => (
                    <li key={j} className="flex gap-2.5 text-[13px] text-[#6a80a8] items-start">
                      <span className="text-[#4a7fd4] shrink-0 font-['Space_Mono'] font-mono">→</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSTALLATION PROCESS ── */}
      <section id="process" className="py-20 lg:py-24 px-6 lg:px-12 bg-gradient-to-b from-[#081828] to-[#04101f] border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> Our Process
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,58px)] leading-[0.95] tracking-wide mb-12 lg:mb-14">
              ENGINEERING-LED<br /><span className="text-[#4a7fd4]">INSTALLATION</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#2b5ba8]/22 border border-[#2b5ba8]/22 rounded-[18px] overflow-hidden reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            {installSteps.map((s, i) => (
              <div key={i} className="bg-[#0b1830]/90 hover:bg-[#2b5ba8]/10 p-8 lg:p-7 transition-colors">
                <div className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#4a7fd4] mb-4">{s.num}</div>
                <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-2.5">{s.title}</div>
                <div className="text-[13px] text-[#6a80a8] leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARGER RANGES ── */}
      <section id="range" className="py-20 lg:py-24 px-6 lg:px-12 border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> Our Range
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,58px)] leading-[0.95] tracking-wide mb-3">
              CHARGER RANGE
            </h2>
            <p className="text-[15px] text-[#6a80a8] max-w-xl leading-relaxed mb-12 lg:mb-14">
              We take a consultative approach — recommending the most suitable charger based on your property, vehicle usage, and future energy plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5">
            {chargerRanges.slice(0, 3).map((r, i) => <RangeCard key={i} r={r} i={i} />)}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:w-2/3 lg:mx-auto">
            {chargerRanges.slice(3).map((r, i) => <RangeCard key={i + 3} r={r} i={i + 3} />)}
          </div>

          {/* CTA strip */}
          <div className="mt-10 p-7 lg:p-9 bg-[#2b5ba8]/10 border border-[#2b5ba8]/25 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div>
              <div className="font-['Bebas_Neue'] text-[22px] tracking-wide mb-1">NOT SURE WHICH OPTION IS RIGHT?</div>
              <div className="text-[13px] text-[#6a80a8]">Our team will assess your site and recommend the most suitable solution.</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <a href="#survey" className="inline-flex justify-center items-center gap-2 bg-[#2B5BA8] hover:bg-[#4a7fd4] text-white text-[13px] font-medium uppercase tracking-wide py-3 px-7 rounded-full transition-colors">
                Request a Quote →
              </a>
              <a href="#services" className="inline-flex justify-center items-center gap-2 border border-white/15 text-[#c8d8f0] hover:border-[#4a7fd4] hover:text-[#4a7fd4] text-[13px] uppercase tracking-wide py-3 px-7 rounded-full transition-colors">
                Book Site Survey
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── AFTER SALES ── */}
      <section id="support" className="py-20 lg:py-24 px-6 lg:px-12 bg-gradient-to-b from-[#04101f] to-[#081828] border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16 items-start">
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> After Sales
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,54px)] leading-[0.95] tracking-wide mb-4">
                ONGOING<br />SUPPORT
              </h2>
              <p className="text-[15px] text-[#c8d8f0] leading-relaxed">
                Installation is only the first step. Reliable performance depends on proper support and maintenance. We remain your partner for the long term.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {afterSales.map((a, i) => (
                <div key={i} className={`reveal-tw opacity-0 translate-y-7 transition-all duration-700 bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-[14px] p-5 hover:border-[#4a7fd4]/40 hover:-translate-y-1 ${i === 4 ? 'sm:col-span-2' : ''}`} style={{ transitionDelay: `${(i % 2) * 100}ms` }}>
                  <div className="text-[24px] mb-2.5">{a.icon}</div>
                  <div className="font-['Bebas_Neue'] text-[16px] tracking-wide mb-1.5">{a.title}</div>
                  <div className="text-[12px] text-[#6a80a8] leading-relaxed">{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-16 lg:py-20 px-6 lg:px-12 border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> Standards
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,58px)] leading-[0.95] tracking-wide mb-10">
              COMPLIANCE &<br /><span className="text-[#4a7fd4]">CERTIFICATIONS</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-4 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            {compliance.map((c, i) => (
              <div key={i} className="bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-xl p-5 min-w-[160px] flex-1 hover:border-[#4a7fd4]/50 hover:-translate-y-0.5 transition-all">
                <div className="font-['Space_Mono'] font-mono text-[12px] text-[#4a7fd4] tracking-wide mb-1.5">{c.code}</div>
                <div className="text-[12px] text-[#6a80a8]">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 lg:py-24 px-6 lg:px-12 border-b border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#4a7fd4] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> Why Watten Power
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(34px,5vw,58px)] leading-[0.95] tracking-wide mb-12">
              THE WATTEN<br /><span className="text-[#4a7fd4]">DIFFERENCE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <div key={i} className="reveal-tw opacity-0 translate-y-7 transition-all duration-700 bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-2xl p-7 hover:border-[#4a7fd4]/40 hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="text-[28px] mb-3.5">{w.icon}</div>
                <div className="font-['Bebas_Neue'] text-[17px] tracking-wide mb-2">{w.title}</div>
                <div className="text-[12px] text-[#6a80a8] leading-relaxed">{w.desc}</div>
              </div>
            ))}
          </div>

          {/* Future-ready strip */}
          <div className="mt-10 p-8 lg:p-9 bg-gradient-to-br from-[#2b5ba8]/15 to-[#5a8c2e]/10 border border-[#2b5ba8]/30 rounded-2xl reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Bebas_Neue'] text-[24px] tracking-wide mb-2">
              FUTURE-READY ENERGY INTEGRATION
            </div>
            <p className="text-[14px] text-[#6a80a8] leading-relaxed mb-5 max-w-2xl">
              Your EV charger is part of a wider energy ecosystem. Our systems are designed to integrate with solar PV, battery storage, and smart energy management platforms.
            </p>
            <div className="flex flex-wrap gap-4">
              {['☀️ Solar PV Systems', '🔋 Battery Storage', '⚡ Smart Energy Management'].map((t, i) => (
                <span key={i} className="font-['Space_Mono'] font-mono text-[11px] tracking-wide py-1.5 px-3.5 rounded-full bg-[#2b5ba8]/20 border border-[#2b5ba8]/30 text-[#4a7fd4]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section id="survey" className="py-20 lg:py-24 px-6 lg:px-12">
        <div className="max-w-[1140px] mx-auto">
          <div className="bg-gradient-to-br from-[#2b5ba8]/20 to-[#5a8c2e]/10 border border-[#2b5ba8]/35 rounded-[24px] p-10 sm:p-14 lg:p-16 text-center relative overflow-hidden reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="absolute -top-[80px] left-1/2 -translate-x-1/2 w-[400px] h-[300px] bg-[radial-gradient(circle,rgba(43,91,168,0.15),transparent_70%)] pointer-events-none" />
            
            <div className="relative z-10">
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] text-[#4a7fd4] uppercase mb-5 flex items-center justify-center gap-3">
                 <span className="block w-6 h-[1px] bg-[#4a7fd4]" /> Planning to install an EV charger? <span className="block w-6 h-[1px] bg-[#4a7fd4]" />
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,64px)] leading-[0.95] tracking-wide mb-4">
                GET STARTED<br />
                <span className="text-[#4a7fd4]">TODAY</span>
              </h2>
              <p className="text-[16px] text-[#c8d8f0] max-w-[480px] mx-auto mb-10 leading-relaxed">
                Speak with our team for a technical assessment and tailored recommendation — at no cost.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="mailto:hello@wattenpower.co.uk" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-gradient-to-br from-[#2B5BA8] to-[#4a7fd4] text-white font-medium text-[14px] uppercase tracking-wide py-3.5 px-9 rounded-full shadow-[0_8px_28px_rgba(43,91,168,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(43,91,168,0.55)] transition-all">
                  Request a Quote →
                </a>
                <a href="mailto:hello@wattenpower.co.uk" className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-transparent text-white text-[14px] uppercase tracking-wide py-3.5 px-9 rounded-full border border-white/20 hover:border-[#4a7fd4] hover:text-[#4a7fd4] transition-all">
                  Book Site Survey ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

function RangeCard({ r, i }) {
  return (
    <div className={`reveal-tw opacity-0 translate-y-7 transition-all duration-700 ${r.bgAccent} border ${r.borderColor} ${r.hoverBorder} rounded-2xl p-7 relative hover:-translate-y-1`} style={{ transitionDelay: `${(i % 3) * 100}ms` }}>
      {r.featured && (
        <div className="absolute top-4 right-4 font-['Space_Mono'] font-mono text-[9px] tracking-widest py-1 px-2.5 rounded-full bg-[#2b5ba8]/30 text-[#4a7fd4] border border-[#2b5ba8]/40 uppercase">
          Popular
        </div>
      )}
      <div className={`font-['Space_Mono'] font-mono text-[10px] tracking-widest mb-2.5 ${r.color}`}>{r.label}</div>
      <div className="font-['Bebas_Neue'] text-[22px] tracking-wide mb-1">{r.title}</div>
      <div className="text-[12px] text-[#6a80a8] mb-5">{r.sub}</div>
      <ul className="flex flex-col gap-2">
        {r.features.map((f, j) => (
          <li key={j} className="flex gap-2 text-[12px] text-[#6a80a8] items-start">
            <span className={`${r.color} shrink-0 font-['Space_Mono'] font-mono`}>→</span>{f}
          </li>
        ))}
      </ul>
    </div>
  )
}