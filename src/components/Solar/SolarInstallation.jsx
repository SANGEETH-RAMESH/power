import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';

/* ─── Circuit Canvas ─────────────────────────────────────────── */
function CircuitCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, lines = [], rafId;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    class Line {
      constructor() { this.reset(true); }
      reset(init = false) {
        this.x = Math.random() * W;
        this.y = init ? Math.random() * H : (Math.random() < .5 ? -10 : H + 10);
        this.dir = Math.random() < .5 ? 1 : -1;
        this.speed = .3 + Math.random() * .6;
        this.alpha = .12 + Math.random() * .18;
        this.color = Math.random() < .6 ? "43,91,168" : "90,140,46";
        this.segments = [];
        let cx = this.x, cy = this.y;
        for (let i = 0; i < 6; i++) {
          const horiz = Math.random() < .5;
          const d = (30 + Math.random() * 60) * (Math.random() < .5 ? 1 : -1);
          if (horiz) cx += d; else cy += d;
          this.segments.push({ x: cx, y: cy });
        }
      }
      draw() {
        ctx.strokeStyle = `rgba(${this.color},${this.alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        this.segments.forEach(s => ctx.lineTo(s.x, s.y));
        ctx.stroke();
        const last = this.segments[this.segments.length - 1];
        ctx.fillStyle = `rgba(${this.color},${this.alpha * 2})`;
        ctx.beginPath();
        ctx.arc(last.x, last.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      update() {
        this.y += this.speed * this.dir;
        this.segments.forEach(s => s.y += this.speed * this.dir);
        if (this.y > H + 200 || this.y < -200) this.reset();
      }
    }
    for (let i = 0; i < 28; i++) lines.push(new Line());
    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      lines.forEach(l => { l.update(); l.draw(); });
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(rafId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas className="fixed inset-0 z-0 pointer-events-none opacity-35" ref={canvasRef} />;
}

/* ─── Scroll Reveal Hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-tw");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0", "translate-y-7");
          e.target.classList.add("opacity-100", "translate-y-0");
          io.unobserve(e.target);
        }
      });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Data ───────────────────────────────────────────────────── */
const navItems = [
  // { label: 'Solar', link: '/solar' },
  { label: 'EV', link: '/ev-charging' },
  { label: 'Services', link: '#services' },
  { label: 'Process', link: '#process' },
  { label: 'Systems', link: '#range' },
  { label: 'Support', link: '#support' },
];

const TICKER_ITEMS = ["MCS Certified Installations", "Solar PV Systems", "Residential & Commercial", "G98 / G99 Compliant", "High-Efficiency Panels", "Hybrid & Battery-Ready", "EV Integration Ready", "UK-Wide Installations", "End-to-End Service", "ROI-Focused Design"];
const WHAT_WE_INSTALL = [
  { num: "01", icon: "🏠", theme: "blue", title: "RESIDENTIAL SOLAR SYSTEMS", items: ["Roof-mounted solar PV systems", "Single-phase inverter setups", "Optimised for household consumption", "Export-ready systems"] },
  { num: "02", icon: "🏭", theme: "green", title: "COMMERCIAL SOLAR SYSTEMS", items: ["Large-scale rooftop installations", "Three-phase systems", "Energy cost reduction for businesses", "Scalable infrastructure for future expansion"] },
];
const COMPONENTS = ["High-efficiency solar panels", "String inverters / hybrid inverters", "DC and AC protection systems", "Mounting structures and cabling", "Monitoring and performance tracking systems"];
const PROCESS_STEPS = [
  { num: "01", icon: "🔍", title: "Site Assessment", desc: "Roof orientation, shading, and structural suitability" },
  { num: "02", icon: "📐", title: "System Design", desc: "System sizing based on consumption and ROI" },
  { num: "03", icon: "📋", title: "DNO Application", desc: "G98/G99 grid approval where required" },
  { num: "04", icon: "🔧", title: "Installation", desc: "Panels, inverter, cabling, and protection systems" },
  { num: "05", icon: "⚡", title: "Testing & Commissioning", desc: "Full system testing and performance validation" },
  { num: "06", icon: "🤝", title: "Handover", desc: "System walkthrough and monitoring setup" },
];
const SYSTEM_RANGE = [
  { icon: "🌱", label: "Entry", title: "Entry System", tagline: "Affordable entry into solar", items: ["Ideal for small households", "Lower upfront investment", "Covers partial energy usage"] },
  { icon: "⚡", label: "Standard", title: "Standard System", tagline: "Balanced performance and value", items: ["Suitable for most homes", "Good return on investment", "Optimised for daily consumption"], featured: true },
  { icon: "💎", label: "Premium", title: "Premium System", tagline: "Maximum efficiency and output", items: ["Higher capacity systems", "Advanced inverter options", "Better long-term savings"] },
  { icon: "🏢", label: "Commercial", title: "Commercial System", tagline: "Designed for business efficiency", items: ["Large-scale installations", "Significant energy cost reduction", "Scalable for business growth"] },
  { icon: "🔋", label: "Hybrid", title: "Hybrid / Future-Ready", tagline: "Built for energy independence", items: ["Battery-ready systems", "EV charger integration ready", "Smart energy management"] },
];
const AFTER_SALES = [
  { icon: "📊", title: "System Monitoring", desc: "Guidance on tracking your system performance in real time" },
  { icon: "🔧", title: "Maintenance & Inspection", desc: "Periodic system health checks and safety inspections" },
  { icon: "🩺", title: "Fault Diagnosis & Repairs", desc: "Quick identification and resolution of performance issues" },
  { icon: "🛡️", title: "Warranty Support", desc: "Assistance with manufacturer warranties for panels and inverters" },
];
const EXPANSION_ITEMS = [
  { icon: "🔋", label: "Battery Storage" },
  { icon: "☀️", label: "Additional Panels" },
  { icon: "🚗", label: "EV Charger Integration" },
];
const COMPLIANCE = [
  { icon: "🏅", code: "MCS", name: "Microgeneration Certification Scheme" },
  { icon: "📘", code: "BS 7671", name: "Wiring Regulations" },
  { icon: "🌍", code: "IEC 61215", name: "Solar Panel Standard" },
  { icon: "🔗", code: "G98 / G99", name: "Grid Connection Standards" },
];
const WHY_PILLARS = [
  { icon: "📈", title: "ROI-Focused Design", desc: "We design systems based on actual energy usage and return potential." },
  { icon: "✅", title: "Fully Compliant", desc: "Aligned with UK regulations and certification requirements." },
  { icon: "🚀", title: "Future-Ready Systems", desc: "Prepared for battery storage and EV integration." },
  { icon: "🤝", title: "Long-Term Support", desc: "Ongoing assistance beyond installation." },
];
const ECO_NODES = [
  { icon: "🚗", label: "EV Charging" },
  { icon: "🔋", label: "Battery Storage" },
  { icon: "🧠", label: "Smart Energy" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SolarInstallation() {
  useReveal();
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-[#04101f] text-[#f2f7ff] font-['DM_Sans'] font-light leading-relaxed overflow-x-hidden selection:bg-[#2B5BA8] selection:text-white">
      <CircuitCanvas />

      {/* Texture Background */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none opacity-50 bg-[size:200px_200px]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }}
      />

      {/* ── NAV ── */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 lg:px-12 h-[70px] bg-[#04101f]/90 backdrop-blur-xl border-b border-[#2b5ba8]/20 transition-colors">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-[40px]" />
        </Link>

        <button
          className="flex lg:hidden flex-col gap-[5px] p-2 z-[101]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'translate-y-[7px] rotate-45' : ''}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`w-6 h-[2px] bg-white transition-all duration-300 ${isMenuOpen ? '-translate-y-[7px] -rotate-45' : ''}`}></span>
        </button>

        <ul className={`
          absolute lg:static top-[70px] inset-x-0 bg-[#04101f]/95 lg:bg-transparent backdrop-blur-xl lg:backdrop-blur-none
          border-b lg:border-none border-[#2b5ba8]/20
          flex-col lg:flex-row p-6 lg:p-0 gap-6 lg:gap-9 items-start lg:items-center
          transition-all duration-300 ease-in-out lg:transform-none lg:opacity-100 lg:pointer-events-auto lg:flex
          ${isMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto flex' : '-translate-y-full opacity-0 pointer-events-none hidden'}
        `}>
          {navItems.map((item) => (
            <li key={item.label} className="w-full lg:w-auto border-b lg:border-none border-[#2b5ba8]/10 pb-4 lg:pb-0">
              {item.link.startsWith('/') ? (
                <Link
                  to={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#6a80a8] hover:text-white text-sm tracking-wide transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  href={item.link}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#6a80a8] hover:text-white text-sm tracking-wide transition-colors"
                >
                  {item.label}
                </a>
              )}
            </li>
          ))}
          <li className="pt-2 lg:pt-0">
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="bg-[#5A8C2E] hover:bg-[#79bc3c] text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all hover:-translate-y-0.5 inline-block"
            >
              Get a Quote
            </a>
          </li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center px-6 lg:px-12 gap-12 lg:gap-16 pt-[120px] lg:pt-0 overflow-hidden">
        <div className="absolute top-1/2 left-[-100px] -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(90,140,46,0.14)_0%,transparent_70%)] pointer-events-none"></div>

        <div className="relative z-10 pt-10 lg:pt-[70px] reveal-tw opacity-0 translate-y-7 transition-all duration-[800ms]">
          <div className="inline-flex items-center gap-2.5 border border-[#5a8c2e]/28 bg-[#5a8c2e]/10 rounded-full py-1.5 px-4 pl-2.5 mb-8 font-['Space_Mono'] font-mono text-[10px] tracking-widest uppercase text-[#79bc3c]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#79bc3c] animate-pulse" />
            Solar PV Installation — UK Specialists
          </div>

          <h1 className="font-['Bebas_Neue'] text-[clamp(42px,7vw,88px)] leading-[0.95] tracking-wide mb-3">
            <span className="text-[#79bc3c] block">SOLAR PANEL</span>
            <span className="text-[#4a7fd4] block">INSTALLATION</span>
            <span className="text-[#f2f7ff] block">SERVICES</span>
          </h1>

          <p className="text-base text-[#c8d8f0] font-light max-w-md leading-relaxed my-6 lg:my-10">
            Generate Your Own Power. Reduce Your Costs. Future-Proof Your Energy.<br />
            Watten Power delivers professionally designed and installed solar PV systems for homes and businesses across the UK.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#5A8C2E] to-[#79bc3c] text-white font-medium text-sm uppercase tracking-wide py-3.5 px-8 rounded-full shadow-[0_8px_28px_rgba(90,140,46,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(90,140,46,0.45)] transition-all">
              ☀️ Request a Quote
            </a>
            <button className="inline-flex items-center gap-2 text-[#c8d8f0] hover:text-white text-sm pb-0.5 border-b border-[#c8d8f0]/30 hover:border-[#79bc3c] transition-all" onClick={() => document.getElementById("process")?.scrollIntoView({ behavior: "smooth" })}>
              View Our Process →
            </button>
          </div>
        </div>


      </section>

      {/* ── TICKER ── */}
      <div className="relative z-10 bg-[#1e4282] border-y border-[#2b5ba8]/40 py-3 overflow-hidden whitespace-nowrap">
        <div className="inline-flex animate-ticker">
          {tickerItems.map((item, i) => (
            <span className="inline-flex items-center gap-3 px-8 font-['Space_Mono'] font-mono text-[11px] tracking-widest uppercase text-white/60" key={i}>
              <span className="w-1 h-1 rounded-full bg-[#79bc3c] shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── SHARED CONTAINER CLASS ── */}
      <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">

        {/* ── WHAT WE INSTALL ── */}
        <section className="py-20 lg:py-28" id="services">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16 items-end reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div>
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Solar Installation Services
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide">WHAT WE<br /><span className="text-[#79bc3c]">INSTALL</span></h2>
            </div>
            <p className="text-base text-[#c8d8f0] font-light leading-relaxed max-w-xl">
              We provide end-to-end solar PV installation services, from system design to commissioning, ensuring maximum performance, safety, and long-term reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {WHAT_WE_INSTALL.map((card, i) => {
              const isGreen = card.theme === 'green';
              return (
                <div className={`bg-[#0b1830]/75 border rounded-2xl p-8 lg:p-10 backdrop-blur-xl relative overflow-hidden transition-all duration-300 hover:-translate-y-1 reveal-tw opacity-0 translate-y-7 transition-all duration-700 ${isGreen ? 'border-[#5a8c2e]/28 hover:border-[#5a8c2e]/50' : 'border-[#2b5ba8]/22 hover:border-[#2b5ba8]/50'}`} key={i}>
                  <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,${isGreen ? 'rgba(90,140,46,0.1)' : 'rgba(43,91,168,0.1)'},transparent_60%)] pointer-events-none`} />
                  <div className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#6a80a8] mb-6 relative z-10">{card.num} /</div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-6 relative z-10 border ${isGreen ? 'bg-[#5a8c2e]/20 border-[#5a8c2e]/35' : 'bg-[#2b5ba8]/20 border-[#2b5ba8]/40'}`}>
                    {card.icon}
                  </div>
                  <div className="font-['Bebas_Neue'] text-3xl tracking-wide mb-4 relative z-10">{card.title}</div>
                  <ul className="flex flex-col gap-3 relative z-10">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-[#6a80a8]">
                        <span className="text-[#79bc3c] font-['Space_Mono'] font-mono shrink-0">→</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-[#0b1830]/75 border border-[#5a8c2e]/28 rounded-2xl p-8 lg:p-10 backdrop-blur-xl flex flex-col md:flex-row gap-6 md:gap-10 items-start reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="text-4xl">⚙️</div>
            <div className="w-full">
              <div className="font-['Bebas_Neue'] text-2xl tracking-wide mb-5">SYSTEM COMPONENTS</div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-5">
                {COMPONENTS.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#6a80a8]">
                    <span className="text-[#4a7fd4] text-[8px] mt-1.5 shrink-0">◆</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>

      {/* ── PROCESS ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22 bg-gradient-to-b from-[#04101f] to-[#081828]" id="process">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Our Installation Process
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide">FROM SURVEY TO<br /><span className="text-[#79bc3c]">COMMISSIONING</span></h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-[1px] mt-12 lg:mt-16 bg-[#2b5ba8]/20 border border-[#2b5ba8]/20 rounded-2xl overflow-hidden reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            {PROCESS_STEPS.map((step, i) => (
              <div className="bg-[#0b1830] hover:bg-[#5a8c2e]/10 transition-colors p-6 lg:p-5 relative" key={i}>
                <div className="font-['Space_Mono'] font-mono text-[10px] tracking-widest text-[#79bc3c] mb-4">STEP {step.num}</div>
                <div className="text-2xl mb-3">{step.icon}</div>
                <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-2">{step.title}</div>
                <div className="text-[11px] text-[#6a80a8] leading-relaxed">{step.desc}</div>
                {i < PROCESS_STEPS.length - 1 && <div className="hidden lg:block absolute right-4 top-8 text-[#2b5ba8]/50">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM RANGE ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22" id="range">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12 lg:mb-16 items-end reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div>
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Our Solar System Range
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide">TAILORED<br /><span className="text-[#79bc3c]">SOLUTIONS</span></h2>
            </div>
            <p className="text-base text-[#c8d8f0] font-light leading-relaxed">
              We offer a range of solar solutions tailored to different energy needs and budgets, from entry-level residential systems to full commercial deployments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            {SYSTEM_RANGE.map((sys, i) => (
              <div className={`flex flex-col bg-[#0b1830]/75 border rounded-2xl p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#5a8c2e]/50 ${sys.featured ? "border-[#5a8c2e]/50 bg-[#5a8c2e]/10" : "border-[#2b5ba8]/22"}`} key={i}>
                <div className="text-3xl mb-5">{sys.icon}</div>
                <div className="font-['Space_Mono'] font-mono text-[9px] tracking-widest uppercase text-[#6a80a8] mb-2">{sys.label}</div>
                <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-1.5">{sys.title}</div>
                <div className="text-[11px] text-[#79bc3c] mb-4">{sys.tagline}</div>
                <ul className="flex flex-col gap-2 flex-1">
                  {sys.items.map((item, j) => (
                    <li key={j} className="text-[11px] text-[#6a80a8] flex gap-2 items-start">
                      <span className="text-[#79bc3c] font-['Space_Mono'] font-mono shrink-0">→</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-[#0b1830]/75 border border-[#5a8c2e]/28 rounded-2xl p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left backdrop-blur-md reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <p className="text-[15px] text-[#c8d8f0] max-w-2xl leading-relaxed">
              <strong className="text-white font-medium">Not sure what system size suits your property?</strong><br />
              We will analyse your usage and recommend the most efficient system for your home or business.
            </p>
            <a href="#contact" className="inline-flex shrink-0 items-center gap-2 bg-gradient-to-br from-[#5A8C2E] to-[#79bc3c] text-white font-medium text-sm uppercase tracking-wide py-3.5 px-8 rounded-full shadow-[0_8px_28px_rgba(90,140,46,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(90,140,46,0.45)] transition-all">
              Request a Quote →
            </a>
          </div>
        </div>
      </section>

      {/* ── AFTER SALES & EXPANSION ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22" id="support">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
              <span className="block w-6 h-[1px] bg-[#79bc3c]" /> After Sales & Support
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide mb-4">LONG-TERM<br /><span className="text-[#79bc3c]">PARTNERSHIP</span></h2>
            <p className="text-base text-[#c8d8f0] font-light leading-relaxed max-w-xl">Solar is a long-term investment, and performance depends on proper support and monitoring.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 lg:gap-20 mt-12 lg:mt-16 items-start">
            <div className="flex flex-col gap-4 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              {AFTER_SALES.map((s, i) => (
                <div className="bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-2xl p-5 lg:p-6 backdrop-blur-md flex gap-4 transition-all duration-300 hover:border-[#5a8c2e]/40 hover:translate-x-1" key={i}>
                  <div className="text-2xl shrink-0 mt-0.5">{s.icon}</div>
                  <div>
                    <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-1">{s.title}</div>
                    <div className="text-xs text-[#6a80a8] leading-relaxed">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#0b1830]/75 border border-[#5a8c2e]/28 rounded-2xl p-8 lg:p-10 backdrop-blur-xl reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="font-['Bebas_Neue'] text-3xl tracking-wide mb-2">SYSTEM EXPANSION</div>
              <div className="text-sm text-[#6a80a8] mb-8">Support for adding future capabilities to your installation</div>
              <div className="flex flex-col gap-3">
                {EXPANSION_ITEMS.map((e, i) => (
                  <div className="bg-[#2b5ba8]/10 border border-[#2b5ba8]/25 rounded-xl p-4 px-5 flex items-center gap-4 transition-all duration-200 hover:border-[#79bc3c] hover:bg-[#5a8c2e]/10" key={i}>
                    <div className="text-xl shrink-0">{e.icon}</div>
                    <div className="text-sm text-[#c8d8f0]">{e.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-16 lg:py-20 border-t border-[#2b5ba8]/22 bg-gradient-to-b from-[#081828] to-[#04101f]">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Compliance & Standards
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide mb-4">FULLY<br /><span className="text-[#79bc3c]">CERTIFIED</span></h2>
              <p className="text-base text-[#c8d8f0] font-light leading-relaxed max-w-md">All installations comply with UK and international standards, ensuring safety, performance, and grid compatibility.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              {COMPLIANCE.map((c, i) => (
                <div className="bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-2xl p-5 backdrop-blur-md flex items-center gap-4 transition-all hover:border-[#5a8c2e]/40" key={i}>
                  <div className="text-2xl shrink-0">{c.icon}</div>
                  <div>
                    <div className="font-['Space_Mono'] font-mono text-[11px] text-[#79bc3c] tracking-wide">{c.code}</div>
                    <div className="text-[11px] text-[#6a80a8] mt-0.5">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-center">
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Why Choose Watten Power
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide mb-4">THE WATTEN<br /><span className="text-[#79bc3c]">DIFFERENCE</span></h2>
              <p className="text-base text-[#c8d8f0] font-light leading-relaxed">Every installation is designed around your specific energy profile and long-term goals — not a one-size-fits-all package.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              {WHY_PILLARS.map((p, i) => (
                <div className="bg-[#0b1830]/75 border border-[#2b5ba8]/22 rounded-2xl p-6 lg:p-7 backdrop-blur-md transition-all hover:border-[#5a8c2e]/45 hover:-translate-y-1" key={i}>
                  <div className="text-3xl mb-4">{p.icon}</div>
                  <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-2">{p.title}</div>
                  <div className="text-xs text-[#6a80a8] leading-relaxed">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-4 flex items-center gap-3">
                <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Integrated Energy Ecosystem
              </div>
              <h2 className="font-['Bebas_Neue'] text-[clamp(36px,5vw,60px)] leading-[0.95] tracking-wide mb-4">THE SMART<br /><span className="text-[#79bc3c]">ENERGY SETUP</span></h2>
              <p className="text-base text-[#c8d8f0] font-light leading-relaxed">Your solar system is the foundation of a smarter, more connected energy setup — designed to integrate with EV charging, battery storage, and smart energy management platforms.</p>
            </div>

            <div className="bg-[#0b1830]/75 border border-[#5a8c2e]/28 rounded-3xl p-8 lg:p-10 backdrop-blur-xl relative reveal-tw opacity-0 translate-y-7 transition-all duration-700">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#5a8c2e]/20 border-2 border-[#79bc3c] flex items-center justify-center text-4xl mb-8 relative">
                <div className="absolute -inset-2 border border-[#5a8c2e]/35 rounded-full animate-ping opacity-75 duration-[2500ms]"></div>
                ☀️
              </div>
              <div className="text-center mb-6">
                <div className="font-['Bebas_Neue'] text-xl tracking-wide mb-1">SOLAR PV SYSTEM</div>
                <div className="text-xs text-[#6a80a8]">Your central energy source</div>
              </div>
              <div className="text-[10px] text-[#6a80a8] font-['Space_Mono'] font-mono tracking-widest text-center mb-4 uppercase">Designed to integrate with</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                {ECO_NODES.map((n, i) => (
                  <div className="bg-[#2b5ba8]/10 border border-[#2b5ba8]/30 rounded-xl py-4 px-3 text-center transition-all hover:border-[#79bc3c] hover:bg-[#5a8c2e]/10" key={i}>
                    <div className="text-2xl mb-2">{n.icon}</div>
                    <div className="text-[11px] text-[#c8d8f0] font-['Space_Mono'] font-mono tracking-wide">{n.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="py-20 lg:py-28 border-t border-[#2b5ba8]/22" id="contact">
        <div className="max-w-[1140px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-[#0b1830]/75 border border-[#5a8c2e]/28 rounded-3xl p-10 lg:p-16 backdrop-blur-xl text-center relative overflow-hidden reveal-tw opacity-0 translate-y-7 transition-all duration-700">
            <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(90,140,46,0.12)_0%,transparent_70%)] pointer-events-none"></div>

            <div className="font-['Space_Mono'] font-mono text-[10px] tracking-[3px] uppercase text-[#79bc3c] mb-5 flex items-center justify-center gap-3">
              <span className="block w-6 h-[1px] bg-[#79bc3c]" /> Get Started <span className="block w-6 h-[1px] bg-[#79bc3c]" />
            </div>
            <h2 className="font-['Bebas_Neue'] text-[clamp(42px,5vw,68px)] leading-[0.95] tracking-wide mb-5">THINKING ABOUT<br /><span className="text-[#79bc3c]">SOLAR PANELS?</span></h2>
            <p className="text-base text-[#c8d8f0] font-light leading-relaxed max-w-xl mx-auto mb-10">Speak with our team for a tailored system design and cost estimate. We'll analyse your usage and recommend the most efficient solution.</p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="mailto:hello@wattenpower.co.uk" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#5A8C2E] to-[#79bc3c] text-white font-medium text-sm uppercase tracking-wide py-3.5 px-8 rounded-full shadow-[0_8px_28px_rgba(90,140,46,0.35)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(90,140,46,0.45)] transition-all">
                ☀️ Book a Site Survey
              </a>
              <a href="mailto:hello@wattenpower.co.uk" className="inline-flex items-center gap-2 bg-gradient-to-br from-[#2B5BA8] to-[#4a7fd4] text-white font-medium text-sm uppercase tracking-wide py-3.5 px-8 rounded-full shadow-[0_8px_28px_rgba(43,91,168,0.4)] hover:-translate-y-0.5 hover:shadow-[0_14px_40px_rgba(43,91,168,0.5)] transition-all">
                📋 Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-[#2b5ba8]/22 pt-16 lg:pt-20 px-6 lg:px-12 pb-10 max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] gap-10 mb-16">
          <div>
            <div className="font-['Bebas_Neue'] text-2xl tracking-[2px] mb-4">
              <Link to="/" className="flex items-center gap-3">
                <img src={logo} alt="logo" className="h-[40px]" />
              </Link>
            </div>
            <p className="text-[13px] text-[#6a80a8] leading-relaxed max-w-[280px]">Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.</p>
          </div>

          {[
            { title: "Services", links: [{ n: "Solar Installation", h: "#services" }, { n: "System Range", h: "#range" }, { n: "After Sales", h: "#support" }, { n: "Our Process", h: "#process" }] },
            { title: "Company", links: [{ n: "About Us", h: "#" }, { n: "Compliance", h: "#" }, { n: "EV Charging", h: "/ev-charging" }, { n: "Battery Storage", h: "#" }] },
            { title: "Contact", links: [{ n: "hello@wattenpower.co.uk", h: "mailto:hello@wattenpower.co.uk" }, { n: "United Kingdom", h: "#" }, { n: "Privacy Policy", h: "#" }, { n: "Terms of Service", h: "#" }] }
          ].map((col, idx) => (
            <div key={idx}>
              <h4 className="font-['Space_Mono'] font-mono text-xs font-medium tracking-widest uppercase text-[#c8d8f0] mb-5">{col.title}</h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l, i) => (
                  <li key={i}>
                    {l.h.startsWith('/') ? (
                      <Link to={l.h} className="text-[13px] text-[#6a80a8] hover:text-white transition-colors">{l.n}</Link>
                    ) : (
                      <a href={l.h} className="text-[13px] text-[#6a80a8] hover:text-white transition-colors">{l.n}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-[#2b5ba8]/22 text-xs text-[#6a80a8] font-['Space_Mono'] font-mono gap-4 text-center sm:text-left">
          <span>© 2026 Watten Power Ltd. All rights reserved.</span>
          <span>Registered in England & Wales</span>
        </div>
      </footer>
    </div>
  );
}