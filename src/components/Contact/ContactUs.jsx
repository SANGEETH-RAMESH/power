import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/little_logo.png'

import img1 from '../../assets/images/solar/walking-solar-panels-morning-mist-mountain-view.png'


const navItems = [
  { label: "Home", link: "/" },
  { label: "EV Charger", link: "/ev-charger" },
  { label: "Solar Solution", link: "/solar" },
  { label: "Contact Us", link: "/contact-us" }

];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        .wp-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; height: 70px; backdrop-filter: blur(20px); border-bottom: 1px solid rgba(43,91,168,.2); transition: background .3s; }
        .wp-nav.scrolled { background: rgba(4,16,31,.95); box-shadow: 0 4px 24px rgba(0,0,0,.4); }
        .wp-nav.not-scrolled { background: rgba(4,16,31,.9); }
        .wp-nav-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }
        .wp-nav-logo img { height: 40px; display: block; }
        .wp-hamburger { display: none; flex-direction: column; gap: 5px; padding: 8px; background: none; border: none; cursor: pointer; z-index: 101; }
        .wp-hamburger span { display: block; width: 24px; height: 2px; background: #fff; transition: all .3s; border-radius: 2px; }
        .wp-hamburger span.top.open { transform: translateY(7px) rotate(45deg); }
        .wp-hamburger span.mid.open { opacity: 0; }
        .wp-hamburger span.bot.open { transform: translateY(-7px) rotate(-45deg); }
        .wp-nav-links { display: flex; flex-direction: row; align-items: center; gap: 36px; list-style: none; margin: 0; padding: 0; }
        .wp-nav-links li { border: none; padding: 0; }
        .wp-nav-link { font-size: 14px; letter-spacing: .3px; text-decoration: none; transition: color .2s; display: block; color: #6a80a8; }
        .wp-nav-link:hover { color: #f0f6ff; }
        .wp-nav-link.active { color: #f0f6ff; font-weight: 500; }
        @media (max-width: 900px) {
          .wp-nav { padding: 0 20px; }
          .wp-hamburger { display: flex; }
          .wp-nav-links { position: absolute; top: 70px; left: 0; right: 0; flex-direction: column; align-items: flex-start; gap: 0; background: rgba(4,16,31,.97); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(43,91,168,.2); padding: 0; overflow: hidden; max-height: 0; opacity: 0; pointer-events: none; transition: max-height .3s ease, opacity .3s ease; }
          .wp-nav-links.open { max-height: 400px; opacity: 1; pointer-events: all; }
          .wp-nav-links li { width: 100%; border-bottom: 1px solid rgba(43,91,168,.1); }
          .wp-nav-link { padding: 16px 24px; }
        }
      `}</style>

      <nav className={`wp-nav ${scrolled ? "scrolled" : "not-scrolled"}`}>
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-[34px] w-auto" />

          <span
            className="text-[#26599b] font-bold text-[23px] leading-none tracking-[0.02em] mt-[2px]"
            style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
          >
            WATTEN POWER
          </span>
        </Link>

        <button
          className="wp-hamburger"
          onClick={() => setMenuOpen((p) => !p)}
          aria-label="Toggle menu"
        >
          <span className={`top ${menuOpen ? "open" : ""}`} />
          <span className={`mid ${menuOpen ? "open" : ""}`} />
          <span className={`bot ${menuOpen ? "open" : ""}`} />
        </button>

        <ul className={`wp-nav-links ${menuOpen ? "open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.link}
                onClick={() => setMenuOpen(false)}
                className={`wp-nav-link ${location.pathname === item.link ? "active" : ""}`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}


function ContactFooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 2,
        textTransform: 'uppercase', color: '#c2d4ee', margin: '0 0 18px',
      }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l, i) => (
          <li key={i}>
            <a href={l.href}
              style={{ fontSize: 13, color: '#6278a0', textDecoration: 'none', transition: 'color .2s', wordBreak: 'break-word' }}
              onMouseEnter={e => e.target.style.color = '#f0f6ff'}
              onMouseLeave={e => e.target.style.color = '#6278a0'}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ fullName: "", phone: "", email: "", postcode: "", message: "" });
  const [services, setServices] = useState({ ev: false, solar: false });
  const [evDetails, setEvDetails] = useState({ property: "", parking: "", chargers: "", phase: "", hasEV: "" });
  const [solarDetails, setSolarDetails] = useState({ property: "", roof: "", bill: "", battery: "" });
  const [consented, setConsented] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [refCode, setRefCode] = useState("");
  const [files, setFiles] = useState([]);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".c-reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = "Please enter your full name";
    if (formData.phone.trim().length < 7) errs.phone = "Please enter your phone number";
    if (!formData.email.includes("@")) errs.email = "Please enter a valid email address";
    if (!formData.postcode.trim()) errs.postcode = "Please enter your address or postcode";
    if (!services.ev && !services.solar) errs.service = "Please select at least one service";
    if (!consented) errs.consent = "Please accept the terms to submit";
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      setRefCode("WP-" + Math.floor(100000 + Math.random() * 900000));
      setSubmitted(true);
      setSubmitting(false);
    }, 1800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ fullName: "", phone: "", email: "", postcode: "", message: "" });
    setServices({ ev: false, solar: false });
    setConsented(false);
    setErrors({});
    setFiles([]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const newFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...newFiles.filter(f => !prev.find(p => p.name === f.name))]);
  };

  const handleFileInput = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles.filter(f => !prev.find(p => p.name === f.name))]);
  };

  const rp = (label) => ({ onClick: () => { } });

  const navItems = [["Home", "/", ""], ["EV Charger", "/ev-charger", "active"], ["Solar Solution", "/solar", ""], ["Contact Us", "/contact-us", ""]]

  return (
    <div className="contact-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --blue:#2B5BA8; --blue-hi:#4a7fd4; --blue-dim:rgba(43,91,168,.14);
          --green:#5A8C2E; --green-hi:#79bc3c; --green-dim:rgba(90,140,46,.13);
          --ink:#04101f; --ink-2:#071626; --ink-3:#0d1f3c;
          --panel:rgba(10,22,46,.75); --line:rgba(43,91,168,.2);
          --line-g:rgba(90,140,46,.3); --muted:#6278a0;
          --light:#c2d4ee; --white:#f0f6ff;
          --r:10px; --r2:16px; --r3:22px;
        }
        .contact-page { background: var(--ink); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.65; overflow-x: hidden; min-height: 100vh; }
        .contact-page ::selection { background: var(--green); color: #fff; }
        .contact-page img { display: block; max-width: 100%; }
        .c-reveal { opacity: 0; transform: translateY(20px); transition: opacity .6s ease, transform .6s ease; }
        .c-reveal.vis { opacity: 1; transform: translateY(0); }

        /* HERO */
        .c-hero { position: relative; min-height: 100vh; padding-top: 68px; display: flex; flex-direction: column; overflow: hidden; }
        .c-hero-mosaic { position: absolute; inset: 0; z-index: 0; display: grid; grid-template-columns: 1fr 1fr 1fr; }
        .hm-cell { overflow: hidden; }
        .hm-cell img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.22) saturate(.6); }
        .hm-cell:nth-child(2) img { filter: brightness(.18) saturate(.5); }
        .c-hero-mosaic::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(4,16,31,.2) 0%, rgba(4,16,31,.5) 40%, rgba(4,16,31,.95) 100%), linear-gradient(to right, rgba(4,16,31,.3), transparent 40%, transparent 60%, rgba(4,16,31,.3)); }
        .c-hero-body { position: relative; z-index: 3; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 60px 40px 0; }
        .c-hero-kicker { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 22px; display: flex; align-items: center; gap: 14px; animation: fadeUp .7s ease both; }
        .c-hero-kicker::before, .c-hero-kicker::after { content: ''; display: block; width: 40px; height: 1px; background: var(--green-hi); opacity: .5; }
        .c-hero-h1 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px,9vw,120px); line-height: .9; letter-spacing: 3px; margin-bottom: 8px; animation: fadeUp .7s .08s ease both; }
        .c-hero-h1 .hl1 { display: block; color: var(--white); }
        .c-hero-h1 .hl2 { display: block; color: var(--green-hi); }
        .c-hero-sub { font-family: 'Bebas Neue', sans-serif; font-size: clamp(20px,3vw,34px); letter-spacing: 4px; color: var(--muted); margin-bottom: 24px; animation: fadeUp .7s .14s ease both; }
        .c-hero-desc { font-size: 16px; color: var(--light); max-width: 560px; margin: 0 auto 40px; line-height: 1.75; animation: fadeUp .7s .2s ease both; }
        .c-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; animation: fadeUp .7s .26s ease both; }
        .hbtn-primary { display: inline-flex; align-items: center; gap: 9px; background: linear-gradient(135deg,var(--green),var(--green-hi)); color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 1.5px; padding: 14px 36px; border-radius: 50px; border: none; cursor: pointer; text-decoration: none; transition: all .25s; box-shadow: 0 8px 28px rgba(90,140,46,.4); }
        .hbtn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(90,140,46,.5); }
        .hbtn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--white); font-family: 'Bebas Neue', sans-serif; font-size: 17px; letter-spacing: 1.5px; padding: 13px 32px; border-radius: 50px; border: 1px solid rgba(255,255,255,.2); cursor: pointer; text-decoration: none; transition: all .25s; }
        .hbtn-outline:hover { border-color: var(--green-hi); color: var(--green-hi); }
        .c-hero-photo-row { position: relative; z-index: 3; display: grid; grid-template-columns: 1fr 1fr 1fr; margin-top: auto; border-top: 1px solid rgba(43,91,168,.2); }
        .hpr-cell { padding: 20px 28px; border-right: 1px solid rgba(43,91,168,.2); display: flex; align-items: center; gap: 12px; background: rgba(4,16,31,.6); backdrop-filter: blur(12px); }
        .hpr-cell:last-child { border-right: none; }
        .hpr-icon { font-size: 20px; flex-shrink: 0; }
        .hpr-text { font-size: 12px; color: var(--muted); line-height: 1.4; }
        .hpr-text strong { display: block; font-size: 13px; color: var(--light); margin-bottom: 1px; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }

        /* WHAT HAPPENS NEXT */
        .c-next { position: relative; z-index: 2; padding: 64px 52px; background: linear-gradient(135deg,rgba(43,91,168,.1),rgba(90,140,46,.07)); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
        .c-next-inner { max-width: 1100px; margin: 0 auto; }
        .c-next-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); text-align: center; margin-bottom: 44px; }
        .c-next-timeline { display: grid; grid-template-columns: repeat(4,1fr); position: relative; gap: 0; }
        .c-next-timeline::before { content: ''; position: absolute; top: 24px; left: 12.5%; right: 12.5%; height: 1px; background: linear-gradient(to right,var(--blue),var(--green)); z-index: 0; }
        .nt-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 16px; position: relative; z-index: 1; }
        .nt-dot { width: 48px; height: 48px; border-radius: 50%; background: var(--ink-2); border: 2px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 18px; transition: border-color .3s; flex-shrink: 0; }
        .nt-item:hover .nt-dot { border-color: var(--green-hi); }
        .nt-title { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; margin-bottom: 8px; }
        .nt-desc { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* FORM WRAP */
        .form-wrap { max-width: 900px; margin: 0 auto; padding: 60px 52px; display: flex; flex-direction: column; gap: 48px; }
        .fsec { position: relative; background: var(--panel); border: 1px solid var(--line); border-radius: var(--r3); padding: 40px 36px; backdrop-filter: blur(14px); }
        .fsec-deco-num { position: absolute; top: -20px; right: 36px; font-family: 'Bebas Neue', sans-serif; font-size: 80px; line-height: 1; color: rgba(43,91,168,.08); pointer-events: none; user-select: none; }
        .fsec-head { display: flex; align-items: center; gap: 18px; margin-bottom: 32px; }
        .fsec-icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .blue-ic { background: var(--blue-dim); border: 1px solid var(--line); }
        .green-ic { background: var(--green-dim); border: 1px solid var(--line-g); }
        .gold-ic { background: rgba(255,180,0,.1); border: 1px solid rgba(255,180,0,.25); }
        .fsec-kicker { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .fsec-title { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1.5px; }
        .fg2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
        .fg1 { margin-bottom: 20px; }
        .fgroup { display: flex; flex-direction: column; gap: 8px; }
        .flabel { font-size: 13px; color: var(--light); font-weight: 400; letter-spacing: .3px; }
        .req { color: var(--green-hi); }
        .finput { background: rgba(4,16,31,.6); border: 1px solid var(--line); border-radius: var(--r); padding: 13px 16px; color: var(--white); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; transition: border-color .2s, box-shadow .2s; outline: none; }
        .finput:focus { border-color: var(--blue-hi); box-shadow: 0 0 0 3px rgba(43,91,168,.12); }
        .finput.err { border-color: #e05050; }
        .ftextarea { background: rgba(4,16,31,.6); border: 1px solid var(--line); border-radius: var(--r2); padding: 16px 18px; color: var(--white); font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 300; outline: none; resize: vertical; min-height: 120px; width: 100%; transition: border-color .2s; }
        .ftextarea:focus { border-color: var(--blue-hi); }
        .ferr { font-size: 12px; color: #e05050; display: none; margin-top: 2px; }
        .ferr.show { display: block; }
        .svc-ferr { font-size: 12px; color: #e05050; display: none; margin-top: 12px; }
        .svc-ferr.show { display: block; }

        /* SERVICE SELECTION */
        .svc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
        .svc-box { background: rgba(4,16,31,.5); border: 2px solid var(--line); border-radius: var(--r2); padding: 26px 22px; cursor: pointer; transition: all .25s; position: relative; }
        .svc-box:hover { border-color: rgba(43,91,168,.5); }
        .svc-box.selected { border-color: var(--green-hi); background: var(--green-dim); }
        .svc-big-icon { font-size: 36px; margin-bottom: 12px; }
        .svc-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1.5px; margin-bottom: 6px; }
        .svc-info { font-size: 13px; color: var(--muted); line-height: 1.5; }
        .svc-check-ic { position: absolute; top: 14px; right: 14px; width: 24px; height: 24px; border-radius: 50%; border: 2px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 12px; transition: all .25s; }
        .svc-box.selected .svc-check-ic { background: var(--green); border-color: var(--green); }

        /* CONDITIONAL */
        .cond-block { overflow: hidden; max-height: 0; transition: max-height .4s ease; }
        .cond-block.open { max-height: 600px; }
        .cond-inner { background: rgba(4,16,31,.4); border: 1px solid var(--line); border-radius: var(--r2); padding: 28px; margin-top: 20px; }
        .cond-banner { display: flex; align-items: center; gap: 10px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 22px; padding-bottom: 14px; border-bottom: 1px solid var(--line-g); }

        /* RADIO PILLS */
        .rpills { display: flex; gap: 8px; flex-wrap: wrap; }
        .rp-btn { padding: 9px 16px; background: rgba(4,16,31,.5); border: 1px solid var(--line); border-radius: 50px; font-size: 13px; color: var(--muted); cursor: pointer; transition: all .2s; white-space: nowrap; }
        .rp-btn:hover { border-color: rgba(43,91,168,.5); color: var(--light); }
        .rp-btn.selected { border-color: var(--green-hi); color: var(--green-hi); background: var(--green-dim); }

        /* UPLOAD */
        .upload-area { border: 2px dashed var(--line); border-radius: var(--r2); padding: 40px 28px; text-align: center; cursor: pointer; transition: all .25s; position: relative; }
        .upload-area:hover, .upload-area.drag { border-color: var(--green-hi); background: var(--green-dim); }
        .upload-area input[type="file"] { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .ua-icon { font-size: 40px; margin-bottom: 12px; }
        .ua-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; margin-bottom: 8px; }
        .ua-sub { font-size: 13px; color: var(--muted); margin-bottom: 16px; }
        .ua-tags { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; }
        .ua-tag { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; color: var(--green-hi); background: var(--green-dim); border: 1px solid var(--line-g); border-radius: 50px; padding: 4px 12px; }
        .file-list { display: flex; flex-direction: column; gap: 8px; margin-top: 14px; }
        .file-row { display: flex; justify-content: space-between; align-items: center; background: rgba(4,16,31,.5); border: 1px solid var(--line); border-radius: var(--r); padding: 10px 14px; font-size: 13px; color: var(--light); }
        .file-rm { background: none; border: none; cursor: pointer; color: var(--muted); font-size: 14px; padding: 0 4px; transition: color .2s; }
        .file-rm:hover { color: #e05050; }
        .upload-tip { display: flex; gap: 12px; align-items: flex-start; margin-top: 16px; background: rgba(43,91,168,.08); border: 1px solid var(--line); border-radius: var(--r); padding: 14px 16px; font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* CONSENT */
        .consent-row { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; padding: 2px; }
        .consent-cb { width: 22px; height: 22px; border-radius: 6px; border: 2px solid var(--line); background: rgba(4,16,31,.6); display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all .2s; margin-top: 1px; cursor: pointer; font-size: 13px; color: #fff; }
        .consent-cb.on { background: var(--green); border-color: var(--green); }
        .consent-txt { font-size: 13px; color: var(--muted); line-height: 1.65; }
        .consent-txt a { color: var(--blue-hi); text-decoration: none; }

        /* CTA BAND */
        .c-cta-band { display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; border-top: 1px solid var(--line); }
        .cta-photos { position: relative; overflow: hidden; min-height: 420px; display: grid; grid-template-columns: 1fr 1fr; }
        .cta-photos img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.5) saturate(.7); }
        .cta-content { background: linear-gradient(135deg,rgba(43,91,168,.1),rgba(90,140,46,.07)); display: flex; flex-direction: column; justify-content: center; padding: 60px 52px; gap: 40px; }
        .cta-content h2 { font-family: 'Bebas Neue', sans-serif; font-size: clamp(36px,4vw,52px); line-height: .95; letter-spacing: 2px; margin-bottom: 16px; }
        .cta-content h2 .ac { color: var(--green-hi); }
        .cta-content p { font-size: 15px; color: var(--light); line-height: 1.75; }
        .btn-submit { display: inline-flex; align-items: center; gap: 10px; background: linear-gradient(135deg,var(--green),var(--green-hi)); color: #fff; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1.5px; padding: 16px 38px; border-radius: 50px; border: none; cursor: pointer; transition: all .25s; box-shadow: 0 8px 28px rgba(90,140,46,.4); width: 100%; justify-content: center; margin-bottom: 14px; }
        .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(90,140,46,.5); }
        .btn-submit:disabled { opacity: .6; cursor: not-allowed; }
        .submit-note { text-align: center; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 1px; color: var(--muted); margin-bottom: 28px; }
        .contact-direct { background: rgba(4,16,31,.5); border: 1px solid var(--line); border-radius: var(--r2); padding: 20px 22px; }
        .cd-title { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 14px; }
        .cd-item { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .cd-item:last-child { margin-bottom: 0; }
        .cd-ic { font-size: 18px; }
        .cd-val a { color: var(--light); text-decoration: none; font-size: 15px; transition: color .2s; }
        .cd-val a:hover { color: var(--green-hi); }
        .spin { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,.3); border-top-color: #fff; border-radius: 50%; animation: spin .8s linear infinite; display: none; }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* SUCCESS */
        .success-overlay { position: fixed; inset: 0; z-index: 1000; background: rgba(4,16,31,.97); display: flex; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity .4s; }
        .success-overlay.show { opacity: 1; pointer-events: all; }
        .success-box { max-width: 520px; text-align: center; padding: 60px 40px; background: var(--panel); border: 1px solid var(--line-g); border-radius: var(--r3); }
        .success-icon { font-size: 60px; margin-bottom: 24px; }
        .success-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; letter-spacing: 2px; color: var(--green-hi); margin-bottom: 14px; }
        .success-desc { font-size: 15px; color: var(--light); line-height: 1.75; margin-bottom: 8px; }
        .success-ref { font-family: 'Space Mono', monospace; font-size: 11px; letter-spacing: 2px; color: var(--muted); margin-bottom: 36px; }

        /* FOOTER */
        .c-footer { display: flex; justify-content: space-between; align-items: center; padding: 24px 52px; border-top: 1px solid var(--line); background: var(--ink-2); font-size: 12px; color: var(--muted); }

        @media (max-width: 900px) {
          .form-wrap { padding: 32px 20px; }
          .fg2 { grid-template-columns: 1fr; }
          .svc-grid { grid-template-columns: 1fr; }
          .c-cta-band { grid-template-columns: 1fr; }
          .cta-photos { display: none; }
          .c-hero-photo-row { grid-template-columns: 1fr; }
          .c-next { padding: 40px 24px; }
          .c-next-timeline { grid-template-columns: 1fr 1fr; }
          .c-next-timeline::before { display: none; }
        }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="c-hero">
        {/* <div className="c-hero-mosaic">
          {["https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=600&q=80", "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=600&q=80", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"].map((src, i) => (
            <div key={i} className="hm-cell"><img src={src} alt="" /></div>
          ))}
        </div> */}
        <div className="c-hero-body">
          <div className="c-hero-kicker">Watten Power Ltd</div>
          <h1 className="c-hero-h1">
            <span className="hl1">GET IN TOUCH</span>
            <span className="hl2">& GET A QUOTE</span>
          </h1>
          <p className="c-hero-sub">FREE · NO OBLIGATION · 24HR RESPONSE</p>
          <p className="c-hero-desc">Whether you are interested in an EV charger or a solar system, our team is here to help you choose the right solution. Complete the form below and we will get back to you with a tailored recommendation.</p>
          <div className="c-hero-btns">
            <a href="#form-start" className="hbtn-primary">Complete the Form ↓</a>
            <a href="tel:07404378787" className="hbtn-outline">📞 07404 378787</a>
          </div>
        </div>
        <div className="c-hero-photo-row">
          {[["⚡", "EV Charger Installation", "Home & commercial solutions"], ["☀️", "Solar System Installation", "Residential & commercial PV"], ["🕐", "24-Hour Response", "Free, no-obligation consultation"]].map(([icon, strong, text]) => (
            <div key={strong} className="hpr-cell flex items-center justify-center">
              <div className="hpr-icon">{icon}</div>
              <div className="hpr-text"><strong>{strong}</strong>{text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <div className="c-next">
        <div className="c-next-inner">
          <div className="c-next-label">What Happens After You Submit</div>
          <div className="c-next-timeline">
            {[["🔍", "We Review Your Enquiry", "Our team carefully assesses your requirements and the details you have submitted"], ["📞", "We May Contact You", "For any clarification needed to prepare the most accurate recommendation"], ["🏠", "Site Survey If Required", "A site visit may be scheduled to assess your property and infrastructure"], ["✅", "Tailored Quote Delivered", "You receive a personalised recommendation and detailed quote"]].map(([icon, title, desc]) => (
              <div key={title} className="nt-item">
                <div className="nt-dot">{icon}</div>
                <div className="nt-title">{title}</div>
                <div className="nt-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FORM */}
      <div className="form-wrap" id="form-start">

        {/* Step 1: Basic Details */}
        <div className="fsec c-reveal">
          <div className="fsec-deco-num">01</div>
          <div className="fsec-head">
            <div className="fsec-icon blue-ic">👤</div>
            <div className="fsec-meta">
              <div className="fsec-kicker">Step 01</div>
              <div className="fsec-title">BASIC DETAILS</div>
            </div>
          </div>
          <div className="fg2">
            <div className="fgroup">
              <div className="flabel">Full Name <span className="req">*</span></div>
              <input className={`finput${errors.fullName ? " err" : ""}`} type="text" placeholder="e.g. James Mitchell" value={formData.fullName} onChange={e => { setFormData(p => ({ ...p, fullName: e.target.value })); setErrors(p => ({ ...p, fullName: "" })); }} />
              {errors.fullName && <div className="ferr show">{errors.fullName}</div>}
            </div>
            <div className="fgroup">
              <div className="flabel">Phone Number <span className="req">*</span></div>
              <input className={`finput${errors.phone ? " err" : ""}`} type="tel" placeholder="e.g. 07404 378787" value={formData.phone} onChange={e => { setFormData(p => ({ ...p, phone: e.target.value })); setErrors(p => ({ ...p, phone: "" })); }} />
              {errors.phone && <div className="ferr show">{errors.phone}</div>}
            </div>
          </div>
          <div className="fg2">
            <div className="fgroup">
              <div className="flabel">Email Address <span className="req">*</span></div>
              <input className={`finput${errors.email ? " err" : ""}`} type="email" placeholder="e.g. james@example.com" value={formData.email} onChange={e => { setFormData(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: "" })); }} />
              {errors.email && <div className="ferr show">{errors.email}</div>}
            </div>
            <div className="fgroup">
              <div className="flabel">Property Address / Postcode <span className="req">*</span></div>
              <input className={`finput${errors.postcode ? " err" : ""}`} type="text" placeholder="e.g. 12 Oak Road, SW1A 1AA" value={formData.postcode} onChange={e => { setFormData(p => ({ ...p, postcode: e.target.value })); setErrors(p => ({ ...p, postcode: "" })); }} />
              {errors.postcode && <div className="ferr show">{errors.postcode}</div>}
            </div>
          </div>
        </div>

        {/* Step 2: Service Required */}
        <div className="fsec c-reveal">
          <div className="fsec-deco-num">02</div>
          <div className="fsec-head">
            <div className="fsec-icon green-ic">⚡</div>
            <div className="fsec-meta">
              <div className="fsec-kicker">Step 02</div>
              <div className="fsec-title">SERVICE REQUIRED</div>
            </div>
          </div>
          <div className="flabel" style={{ marginBottom: 14 }}>Select one or both services <span className="req">*</span></div>
          <div className="svc-grid">
            {[["ev", "⚡", "EV CHARGER INSTALLATION", "Home or commercial EV charging point — 7 kW to 22 kW systems"], ["solar", "☀️", "SOLAR SYSTEM INSTALLATION", "Residential or commercial solar PV system — with optional battery storage"]].map(([key, icon, name, info]) => (
              <div key={key} className={`svc-box${services[key] ? " selected" : ""}`} onClick={() => { setServices(p => ({ ...p, [key]: !p[key] })); setErrors(p => ({ ...p, service: "" })); }}>
                <div className="svc-big-icon">{icon}</div>
                <div className="svc-name">{name}</div>
                <div className="svc-info">{info}</div>
                <div className="svc-check-ic">{services[key] ? "✓" : ""}</div>
              </div>
            ))}
          </div>
          {errors.service && <div className="svc-ferr show">{errors.service}</div>}

          {/* EV Details */}
          <div className={`cond-block${services.ev ? " open" : ""}`}>
            <div className="cond-inner">
              <div className="cond-banner"><span>⚡</span> EV Charger Installation Details</div>
              <div className="fg2" style={{ marginBottom: 18 }}>
                <div className="fgroup">
                  <div className="flabel">Property Type</div>
                  <div className="rpills">
                    {["🏠 House", "🏢 Flat", "🏭 Commercial"].map(v => <span key={v} className={`rp-btn${evDetails.property === v ? " selected" : ""}`} onClick={() => setEvDetails(p => ({ ...p, property: v }))}>{v}</span>)}
                  </div>
                </div>
                <div className="fgroup">
                  <div className="flabel">Parking Type</div>
                  <div className="rpills">
                    {["🏡 Driveway", "🚪 Garage", "🚗 Street"].map(v => <span key={v} className={`rp-btn${evDetails.parking === v ? " selected" : ""}`} onClick={() => setEvDetails(p => ({ ...p, parking: v }))}>{v}</span>)}
                  </div>
                </div>
              </div>
              <div className="fg2" style={{ marginBottom: 18 }}>
                <div className="fgroup">
                  <div className="flabel">Number of Chargers Required</div>
                  <div className="rpills">
                    {["1", "2", "3+"].map(v => <span key={v} className={`rp-btn${evDetails.chargers === v ? " selected" : ""}`} onClick={() => setEvDetails(p => ({ ...p, chargers: v }))}>{v}</span>)}
                  </div>
                </div>
                <div className="fgroup">
                  <div className="flabel">Electrical Supply</div>
                  <div className="rpills">
                    {["Single Phase", "Three Phase", "Not Sure"].map(v => <span key={v} className={`rp-btn${evDetails.phase === v ? " selected" : ""}`} onClick={() => setEvDetails(p => ({ ...p, phase: v }))}>{v}</span>)}
                  </div>
                </div>
              </div>
              <div className="fgroup">
                <div className="flabel">Do you already have an EV?</div>
                <div className="rpills">
                  {["✅ Yes", "⏳ No"].map(v => <span key={v} className={`rp-btn${evDetails.hasEV === v ? " selected" : ""}`} onClick={() => setEvDetails(p => ({ ...p, hasEV: v }))}>{v}</span>)}
                </div>
              </div>
            </div>
          </div>

          {/* Solar Details */}
          <div className={`cond-block${services.solar ? " open" : ""}`}>
            <div className="cond-inner">
              <div className="cond-banner"><span>☀️</span> Solar System Installation Details</div>
              <div className="fg2" style={{ marginBottom: 18 }}>
                <div className="fgroup">
                  <div className="flabel">Property Type</div>
                  <div className="rpills">
                    {["🏠 House", "🏢 Commercial"].map(v => <span key={v} className={`rp-btn${solarDetails.property === v ? " selected" : ""}`} onClick={() => setSolarDetails(p => ({ ...p, property: v }))}>{v}</span>)}
                  </div>
                </div>
                <div className="fgroup">
                  <div className="flabel">Roof Type</div>
                  <div className="rpills">
                    {["📐 Pitched", "▬ Flat", "❓ Not Sure"].map(v => <span key={v} className={`rp-btn${solarDetails.roof === v ? " selected" : ""}`} onClick={() => setSolarDetails(p => ({ ...p, roof: v }))}>{v}</span>)}
                  </div>
                </div>
              </div>
              <div className="fg2">
                <div className="fgroup">
                  <div className="flabel">Monthly Electricity Bill (Optional)</div>
                  <div className="rpills">
                    {["£50–£100", "£100–£200", "£200+"].map(v => <span key={v} className={`rp-btn${solarDetails.bill === v ? " selected" : ""}`} onClick={() => setSolarDetails(p => ({ ...p, bill: v }))}>{v}</span>)}
                  </div>
                </div>
                <div className="fgroup">
                  <div className="flabel">Battery Storage?</div>
                  <div className="rpills">
                    {["✅ Yes", "❌ No", "❓ Not Sure"].map(v => <span key={v} className={`rp-btn${solarDetails.battery === v ? " selected" : ""}`} onClick={() => setSolarDetails(p => ({ ...p, battery: v }))}>{v}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Step 3: Additional Info */}
        <div className="fsec c-reveal">
          <div className="fsec-deco-num">03</div>
          <div className="fsec-head">
            <div className="fsec-icon blue-ic">💬</div>
            <div className="fsec-meta">
              <div className="fsec-kicker">Step 03</div>
              <div className="fsec-title">ADDITIONAL INFORMATION</div>
            </div>
          </div>
          <div className="fg1">
            <div className="fgroup">
              <div className="flabel">Message / Requirements</div>
              <textarea className="ftextarea" placeholder="Any specific requirements, questions, access details, or anything else our team should know before preparing your recommendation..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* Step 4: File Upload */}
        <div className="fsec c-reveal">
          <div className="fsec-deco-num">04</div>
          <div className="fsec-head">
            <div className="fsec-icon gold-ic">📎</div>
            <div className="fsec-meta">
              <div className="fsec-kicker">Step 04 — Optional but Recommended</div>
              <div className="fsec-title">UPLOAD PHOTOS</div>
            </div>
          </div>
          <div className={`upload-area${dragging ? " drag" : ""}`} onDragOver={e => { e.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={handleDrop}>
            <input type="file" multiple accept="image/*,.pdf" onChange={handleFileInput} />
            <div className="ua-icon">📷</div>
            <div className="ua-title">DRAG & DROP OR CLICK TO UPLOAD</div>
            <div className="ua-sub">Upload photos to help us prepare a more accurate quote for your property</div>
            <div className="ua-tags">
              {["Fuse Board", "Parking Area (EV)", "Roof (Solar)", "Property Exterior"].map(t => <span key={t} className="ua-tag">{t}</span>)}
            </div>
          </div>
          {files.length > 0 && (
            <div className="file-list">
              {files.map((f, i) => (
                <div key={f.name} className="file-row">
                  <span>📄 {f.name} <span style={{ color: "var(--muted)", fontSize: 11 }}>({(f.size / 1024).toFixed(1)} KB)</span></span>
                  <button className="file-rm" onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))}>✕</button>
                </div>
              ))}
            </div>
          )}
          <div className="upload-tip">
            <span>💡</span>
            <span><strong>This significantly improves quote accuracy.</strong> Photos of your fuse board, parking area (for EV), and roof (for solar) help our engineers prepare a much more precise recommendation before visiting your property.</span>
          </div>
        </div>

        {/* Consent */}
        <div>
          <div className="consent-row" onClick={() => { setConsented(p => !p); setErrors(e => ({ ...e, consent: "" })); }}>
            <div className={`consent-cb${consented ? " on" : ""}`}>{consented ? "✓" : ""}</div>
            <div className="consent-txt">
              I agree to Watten Power Ltd contacting me regarding this enquiry. My information will be handled in accordance with the <a href="#" onClick={e => e.stopPropagation()}>Privacy Policy</a> and will not be shared with third parties. <span style={{ color: "var(--green-hi)" }}>*</span>
            </div>
          </div>
          {errors.consent && <div className="ferr show" style={{ paddingLeft: 34, marginTop: 6 }}>{errors.consent}</div>}
        </div>
      </div>

      {/* CTA BAND */}
      <div className="c-cta-band">
        <div style={{ height: "100%" }}>
          <img src={img1} alt="Solar install" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          {/* <img src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=700&q=80" alt="EV charger" /> */}
        </div>
        <div className="cta-content">
          <div>
            <h2>READY TO<br /><span className="ac">MOVE FORWARD?</span></h2>
            <p>Submit your enquiry and our team will get back to you shortly with a tailored recommendation for your property and energy needs. No obligation, no cost.</p>
          </div>
          <div>
            <button className="btn-submit" onClick={handleSubmit} disabled={submitting}>
              {submitting && <div className="spin" style={{ display: "block" }} />}
              {submitting ? "Sending..." : "Submit My Enquiry →"}
            </button>
            <div className="submit-note">Free &nbsp;·&nbsp; No Obligation &nbsp;·&nbsp; 24hr Response</div>
            <div className="contact-direct">
              <div className="cd-title">PREFER TO SPEAK DIRECTLY?</div>
              <div className="cd-item"><div className="cd-ic">📞</div><div className="cd-val"><a href="tel:07404378787">07404 378787</a></div></div>
              <div className="cd-item"><div className="cd-ic">✉️</div><div className="cd-val"><a href="mailto:info@wattenpower.com">info@wattenpower.com</a></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid rgba(43,91,168,.2)',
        padding: '60px 52px 36px',
        background: '#071626',
      }} className="sol-footer-root">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="sol-footer-top">
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-[34px] w-auto" />

                <span
                  className="text-[#26599b] font-bold text-[23px] leading-none tracking-[0.02em] mt-[2px]"
                  style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}
                >
                  WATTEN POWER
                </span>
              </Link>
            </div>
            <p style={{ fontSize: 13, color: '#6278a0', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
              Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.
            </p>
          </div>
          <ContactFooterCol title="Services" links={[
            { label: 'EV Charger Installation', href: '/ev-charger' },
            { label: 'Solar System Installation', href: '/solar' },
            { label: 'Solar Estimator', href: '/solar-estimator' },
          ]} />
          <ContactFooterCol title="Contact Us" links={[
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
          <ContactFooterCol title="Legal" links={[
            { label: 'Terms & Conditions', href: '/terms-and-conditions' },
            { label: 'Privacy Policy', href: '/privacy-policy' },
            { label: 'Cookie Policy', href: '/cookie-policy' },
            { label: 'Terms of Sale', href: '/terms-of-sale' },
            { label: 'Return Policy', href: '/return-policy' },
            { label: 'Modern Slavery Statement', href: '/modern-slavery-statement' },
          ]} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 28, borderTop: '1px solid rgba(43,91,168,.2)',
          fontSize: 12, color: '#6278a0', flexWrap: 'wrap', gap: 12,
        }}>
          <span>© 2026 Watten Power Ltd. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1 }}>
            Made with ❤️ by poweroins
          </span>
        </div>
        <style>{`
    @media (max-width: 960px) {
      .sol-footer-root { padding: 48px 32px 28px !important; }
      .sol-footer-top { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
    }
    @media (max-width: 600px) {
      .sol-footer-root { padding: 44px 20px 24px !important; }
      .sol-footer-top { grid-template-columns: 1fr !important; gap: 32px !important; }
    }
  `}</style>
      </footer>

      {/* SUCCESS OVERLAY */}
      <div className={`success-overlay${submitted ? " show" : ""}`}>
        <div className="success-box">
          <div className="success-icon">✅</div>
          <div className="success-title">ENQUIRY SENT!</div>
          <p className="success-desc">Thank you for your enquiry. Our team will review your details and get back to you within 24 hours with a tailored recommendation.</p>
          <p className="success-ref">{refCode}</p>
          <button className="btn-submit" onClick={handleReset} style={{ marginTop: 8 }}>Submit Another Enquiry</button>
        </div>
      </div>
    </div>
  );
}