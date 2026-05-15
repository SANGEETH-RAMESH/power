import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from '../../assets/little_logo.png';
import { Link } from "react-router-dom";
import { SolarEstimatorWizard } from './SolarEstimator';

import termsPdf from '../../assets/pdfs/terms-and-conditions.pdf';
import privacyPdf from '../../assets/pdfs/privacy-policy.pdf';
import cookiePdf from '../../assets/pdfs/cookie-policy.pdf';
import salePdf from '../../assets/pdfs/terms-of-sale.pdf';
import refundPdf from '../../assets/pdfs/refunds-returns-policy.pdf';
import slaveryPdf from '../../assets/pdfs/modern-slavery.pdf';

import searchIcon from '../../assets/new/search.svg';
import graphIcon from '../../assets/new/graph.svg';
import handShakeIcon from '../../assets/new/handShake1.svg';
import setSquare from '../../assets/new/SetSquare.svg';
import spanner from '../../assets/new/spanner.svg';
import phoneIcon from '../../assets/new/phonesetting.svg';
import lockIcon from '../../assets/new/locksafe.svg';
import houseIcon from '../../assets/new/house.svg';
import tickIcon from '../../assets/new/shield.svg';
import settingIcon from '../../assets/new/setting.svg';
import solar from '../../assets/new/sun.svg';
import targetIcon from '../../assets/new/target.svg';
import lightning from '../../assets/new/lightning.svg';
import money from '../../assets/new/lotmoney.svg';
import shieldIcon from '../../assets/new/shield1.svg';
import nutIcon from '../../assets/new/nut1.svg';
import batteryIcon from '../../assets/new/batterycharger.svg';
import buildingIcon from '../../assets/new/building.svg';
import leafIcon from '../../assets/new/leaf.svg';
import surveryIcon from '../../assets/new/sitesurvey.svg';
import trophyIcon from '../../assets/new/trophy.svg';
import moneyIcon from '../../assets/new/lotmoney.svg';
import leaf1Icon from '../../assets/new/leaf1.svg';
import phoneIcon2 from '../../assets/new/phonecall.svg';
import medalIcon from '../../assets/new/medal.svg';
import starIcon from '../../assets/new/star.svg';
import plugIcon from '../../assets/new/plug.svg';
import gbIcon from '../../assets/new/gb.svg';


import img1 from '../../assets/images/solar/man-worker-firld-by-solar-panels.jpg';
import img2 from '../../assets/images/solar/residental_2.jpeg';
import img3 from '../../assets/images/solar/medium-shot-men-shaking-hands.jpg';
import img4 from '../../assets/images/solar/modern-city-skyline-with-solar-panels-sustainable-future.jpeg';
import img6 from '../../assets/images/solar/young-man-with-arms-outstretched-standing-street.png';
import Navbar from "../Common/Navbar";

const ICON_FILTER = 'invert(62%) sepia(47%) saturate(500%) hue-rotate(50deg) brightness(95%)';

function SolFooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-[var(--light)] mb-[18px]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 2, textTransform: 'uppercase' }}>{title}</h4>
      <ul className="list-none p-0 m-0 flex flex-col gap-[10px]">
        {links.map((l, i) => (
          <li key={i}>
            <a
              href={l.href}
              className="text-[var(--muted)] no-underline transition-colors duration-200 hover:text-[var(--white)] break-words"
              style={{ fontSize: 13 }}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Solar() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showEstimator, setShowEstimator] = useState(false);
  const estimatorRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", handleScroll); };
  }, []);

  function handleEstimateClick() {
    setShowEstimator(true);
    setTimeout(() => {
      const isMobile = window.innerWidth <= 900;
      if (isMobile) {
        document.getElementById('estimator-wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }

  const navItems = [["Home", "/", ""], ["EV Charger", "/ev-charger", ""], ["Solar Solution", "/solar", "active"], ["Contact Us", "/contact-us", ""]];

  const estimatorCards = [
    [houseIcon, "Property Type", "Home, commercial or agricultural"],
    [money, "Monthly Bill", "We estimate your kWh usage"],
    [setSquare, "Roof Area", "Available m² for panels"],
    [solar, "UK Location", "Peak sun hours by region"],
    [lightning, "System Type", "Grid-tied, hybrid or off-grid"],
    [targetIcon, "Your Priority", "Savings, performance or cost"],
  ];

  return (
    <div className="solar-page">
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500&family=Space+Mono:wght@400;700&display=swap');
          :root {
            --blue: #2B5BA8; --blue-hi: #4a7fd4; --blue-pale: rgba(43,91,168,.15);
            --green: #5A8C2E; --green-hi: #79bc3c; --green-dim: rgba(90,140,46,.13);
            --ink: #04101f; --ink-2: #071626; --panel: rgba(10,22,46,.78);
            --line: rgba(43,91,168,.22); --line-g: rgba(90,140,46,.28);
            --muted: #6278a0; --light: #c2d4ee; --white: #f0f6ff;
            --r: 14px; --r2: 20px;
          }
          .solar-page { background: var(--ink); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.65; overflow-x: hidden; min-height: 100vh; }
          .solar-page ::selection { background: var(--green); color: #fff; }
          .solar-page img { display: block; max-width: 100%; }
          .solar-page img.svg-icon { display: inline-block !important; max-width: none !important; width: auto !important; }
          .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
          .reveal.vis { opacity: 1; transform: translateY(0); }
          .rd1{transition-delay:.1s} .rd2{transition-delay:.2s} .rd3{transition-delay:.3s} .rd4{transition-delay:.4s} .rd5{transition-delay:.5s}

          /* Buttons */
          .btn-main { display: inline-flex; align-items: center; gap: 9px; background: linear-gradient(135deg,var(--blue),var(--blue-hi)); color: #fff; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 0 34px; height: 52px; border-radius: 50px; border: none; cursor: pointer; text-decoration: none; transition: all .25s; box-shadow: 0 8px 28px rgba(43,91,168,.4); white-space: nowrap; }
          .btn-main:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(43,91,168,.5); }
          .btn-green { background: linear-gradient(135deg,var(--green),var(--green-hi)); box-shadow: 0 8px 28px rgba(90,140,46,.35); }
          .btn-green:hover { box-shadow: 0 14px 40px rgba(90,140,46,.45); }
          .btn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--white); font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 0 30px; height: 52px; border-radius: 50px; border: 1px solid rgba(255,255,255,.18); cursor: pointer; text-decoration: none; transition: all .25s; white-space: nowrap; }
          .btn-outline:hover { border-color: var(--green-hi); color: var(--green-hi); }

          /* Labels & Titles */
          .sec-label { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }
          .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(38px,5vw,60px); line-height: .95; letter-spacing: 2px; margin-bottom: 16px; }
          .sec-desc { font-size: 16px; color: var(--light); font-weight: 300; max-width: 560px; line-height: 1.75; }

          /* NAV mobile */
          .nav-mobile { display: none; flex-direction: column; position: fixed; top: 68px; left: 0; right: 0; background: rgba(4,16,31,.97); padding: 24px; gap: 20px; border-bottom: 1px solid rgba(43,91,168,.25); backdrop-filter: blur(20px); z-index: 199; list-style: none; }
          .nav-mobile.open { display: flex; }
          .nav-mobile a { color: var(--muted); text-decoration: none; font-size: 14px; }
          .nav-mobile a.active { color: var(--green-hi); }

          /* HERO */
          .s-hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: stretch; text-align: center; overflow: hidden; }
          .s-hero-bg { position: absolute; inset: 0; }
          .s-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.22) saturate(.8); }
          .s-hero-bg::after { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at center,rgba(4,16,31,.3) 0%,rgba(4,16,31,.85) 70%); }
          .s-hero-rays { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
          .s-hero-rays::before { content: ''; position: absolute; top: 50%; left: 50%; width: 200%; height: 200%; transform: translate(-50%,-50%); background: conic-gradient(from 0deg,transparent 0deg,rgba(90,140,46,.04) 10deg,transparent 20deg,rgba(90,140,46,.03) 30deg,transparent 40deg,rgba(43,91,168,.04) 50deg,transparent 60deg,rgba(90,140,46,.03) 70deg,transparent 80deg,transparent 360deg); animation: spin 30s linear infinite; }
          @keyframes spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
          .s-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px,10vw,130px); line-height: .9; letter-spacing: 3px; margin-bottom: 14px; animation: fadeUp .8s .1s ease both; }
          .s-hero-title .line-2 { display: block; color: var(--green-hi); }
          .s-hero-tagline { font-size: clamp(13px,1.8vw,17px); color: var(--light); max-width: 640px; margin: 0 auto 40px; line-height: 1.7; animation: fadeUp .8s .2s ease both; }
          .hb-val { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; background: linear-gradient(135deg,var(--blue-hi),var(--green-hi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
          .hb-divider { display: block; height: 1px; background: rgba(90,140,46,.35); margin: 5px auto 6px; width: 28px; }
          @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

          /* INTRO */
          .s-intro-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right,transparent 50%,var(--ink-2) 100%); }

          /* INSTALL */
          .install-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; height: 400px; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; margin-bottom: 24px; transition: border-color .3s; }
          .install-row:hover { border-color: rgba(90,140,46,.4); }
          .install-row.reverse { direction: rtl; }
          .install-row.reverse > * { direction: ltr; }
          .ir-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.6) saturate(.75); transition: transform .6s ease, filter .4s; }
          .install-row:hover .ir-img img { transform: scale(1.04); filter: brightness(.75) saturate(.9); }
          .ir-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right,transparent 40%,rgba(10,22,46,.6)); }
          .install-row.reverse .ir-img-overlay { background: linear-gradient(to left,transparent 40%,rgba(10,22,46,.6)); }

          /* PROCESS */
          .timeline { position: relative; padding-left: 80px; }
          .timeline::before { content: ''; position: absolute; left: 24px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom,var(--green),var(--blue),transparent); }
          .tl-dot { position: absolute; left: -56px; top: 0; width: 42px; height: 42px; border-radius: 50%; background: var(--ink-2); border: 2px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 14px; transition: border-color .3s, background .3s; }
          .tl-item:hover .tl-dot { border-color: var(--green-hi); background: var(--green-dim); }
          .tl-num { position: absolute; left: -100px; top: 6px; font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 1px; color: rgba(43,91,168,.35); transition: color .3s; }
          .tl-item:hover .tl-num { color: var(--green-hi); }
          .tl-connector { position: absolute; left: -41px; top: 32px; bottom: 0; width: 1px; background: var(--line); }
          .tl-item:hover .tl-content { border-color: rgba(90,140,46,.4); }

          /* RANGE */
          .range-showcase { display: grid; grid-template-columns: 1.6fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 16px; min-height: 600px; }
          .rs-main { grid-row: 1/3; }
          .rs-main::before { content: ''; position: absolute; top: -60px; right: -60px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle,rgba(90,140,46,.15),transparent 70%); }
          .rs-main-feats li::before { content: '✓'; color: var(--green-hi); flex-shrink: 0; font-weight: 700; }
          .rs-card-feats li::before { content: '·'; color: var(--green-hi); font-size: 18px; line-height: .9; flex-shrink: 0; }
          .rs-card:hover { border-color: rgba(90,140,46,.5); transform: translateY(-3px); }

          /* ESTIMATOR – live wizard wrapper */
          .est-live-wrap { position: relative; z-index: 2; animation: fadeUp .45s ease both; width: 100%; min-width: 0; overflow: visible; box-sizing: border-box; }
          .est-live-wrap > div { min-height: unset !important; background: transparent !important; overflow: visible !important; width: 100% !important; max-width: 100% !important; box-sizing: border-box !important; }
          .est-live-wrap > div > div:not(main) { display: none !important; }
          .est-live-wrap main { max-width: 100% !important; width: 100% !important; padding: 0 !important; margin: 0 !important; box-sizing: border-box !important; }

          /* SAVINGS */
          .s-savings::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(90,140,46,.08),rgba(43,91,168,.06)); }
          .sb-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(42px,5vw,62px); letter-spacing: -1px; line-height: 1; background: linear-gradient(135deg,var(--blue-hi),var(--green-hi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }

          /* COMPLIANCE */
          .std-status { display: inline-flex; align-items: center; gap: 5px; border-radius: 50px; padding: 5px 13px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase; font-weight: 700; }
          .std-status.in-progress { background: rgba(180,90,0,.2); border: 1px solid rgba(220,120,0,.5); color: #e07b20; }
          .std-status.compliant, .std-status.confirmed { background: rgba(90,140,46,.18); border: 1px solid rgba(90,140,46,.5); color: var(--green-hi); }

          /* WHY */
          .wr-item::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--green),transparent); opacity: 0; transition: opacity .3s; }
          .wr-item:hover::after { opacity: 1; }

          /* AFTER SALES */
          .sg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--green),var(--blue-hi)); opacity: 0; transition: opacity .3s; }
          .sg-card:hover::before { opacity: 1; }

          /* est-btn */
          .est-btn { background: linear-gradient(135deg, #5a8c2e, #72b038); box-shadow: 0 12px 48px rgba(90,140,46,.35), inset 0 1px 0 rgba(255,255,255,.15); }
          .est-btn::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(255,255,255,.25), rgba(255,255,255,.05)); opacity: 0; transition: opacity .3s; border-radius: 60px; }
          .est-btn:hover { transform: translateY(-4px); box-shadow: 0 20px 64px rgba(90,140,46,.45), inset 0 1px 0 rgba(255,255,255,.2); }
          .est-btn:hover::before { opacity: 1; }
          .est-btn:hover .est-btn-icon { transform: scale(1.2) rotate(15deg); background: rgba(255,255,255,.25); }

          /* ef-item */
          .ef-item::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, rgba(90,140,46,.1), transparent); opacity: 0; transition: opacity .3s; border-radius: 20px; }
          .ef-item:hover::before { opacity: 1; }

          /* RESPONSIVE */
          @media (max-width: 900px) {
            .install-row, .install-row.reverse { grid-template-columns: 1fr; height: auto; direction: ltr; }
            .install-row .ir-img, .install-row.reverse .ir-img { height: 220px; }
            .range-showcase { grid-template-columns: 1fr; grid-template-rows: auto; }
            .rs-main { grid-row: auto; }
            .timeline { padding-left: 60px; }
            .tl-num { left: -80px; }
            .s-hero-btns-group { flex-direction: column; align-items: center; }
            .s-hero-btns-group .btn-main, .s-hero-btns-group .btn-outline { width: 100%; max-width: 320px; justify-content: center; }
          }
          @media (max-width: 600px) {
            .range-cta-band { flex-direction: column; align-items: flex-start; padding: 24px; }
          }
        `}</style>

      <Navbar />
      <ul className={`nav-mobile${navOpen ? " open" : ""}`}>
        {navItems.map(([label, href, cls]) => (
          <li key={label}><Link to={href} className={cls} onClick={() => setNavOpen(false)}>{label}</Link></li>
        ))}
      </ul>

      {/* ── HERO ── */}
      <section className="s-hero">
        <div className="s-hero-bg">
          <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&q=80" alt="Solar panels" />
        </div>
        <div className="s-hero-rays" />
        <div className="relative z-[3] flex-1 flex flex-col items-center justify-center w-full max-w-[900px] mx-auto px-6 pt-[100px] pb-12" style={{ animation: 'fadeUp .8s ease both' }}>
          <div className="flex items-center justify-center gap-2 mb-7" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', animation: 'fadeUp .8s ease both' }}>
            <Link to="/" className="text-[var(--muted)] no-underline hover:text-[var(--white)] transition-colors">Home</Link>
            <span>›</span>
            <span style={{ color: 'var(--green-hi)' }}>Solar Installation</span>
          </div>
          <h1 className="s-hero-title">
            <span>SOLAR SYSTEM</span>
            <span className="line-2">INSTALLATION</span>
          </h1>
          <p className="s-hero-tagline">
            MCS-certified solar PV installation for residential and commercial properties across the UK — designed to deliver maximum performance and long-term returns.
          </p>
          <div className="s-hero-btns-group flex flex-wrap items-center justify-center gap-3 w-full" style={{ animation: 'fadeUp .8s .3s ease both' }}>
            <Link to="/contact-us" className="btn-main btn-green" style={{ width: 240, justifyContent: 'center' }}>Get a Free Quote →</Link>
            <a href="#process" className="btn-outline" style={{ width: 240, justifyContent: 'center' }}>How It Works</a>
            <a
              href="#estimator"
              className="btn-main btn-green"
              style={{ width: 240, justifyContent: 'center' }}
              onClick={(e) => {
                e.preventDefault();
                setShowEstimator(true);
                setTimeout(() => {
                  document.getElementById('estimator')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 300);
              }}
            >
              Estimate Your System →
            </a>
          </div>
        </div>
        <div className="relative z-[3] w-full flex flex-wrap justify-center border-t border-[rgba(43,91,168,.2)]" style={{ animation: 'fadeUp .8s .4s ease both' }}>
          {[["25+", "Years Panel Warranty"], ["MCS", "Certified Engineers"], ["0%", "VAT on Residential"], ["100%", "UK Installations"]].map(([val, label]) => (
            <div key={label} className="flex-1 min-w-[120px] max-w-[260px] px-6 py-5 text-center border-r border-[rgba(43,91,168,.2)] last:border-r-0 bg-[rgba(4,16,31,.85)] backdrop-blur-md">
              <div className="hb-val">{val}</div>
              <span className="hb-divider" />
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--muted)', lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="overflow-hidden border-b border-[var(--line)]">
        <div className="grid grid-cols-2 min-h-[560px] max-[900px]:grid-cols-1">
          <div className="relative overflow-hidden reveal">
            <img src={img1} alt="Solar install" className="w-full h-full object-cover" style={{ filter: 'brightness(.65) saturate(.8)' }} />
            <div className="absolute bottom-10 left-10 z-[2] rounded-[14px] p-4 backdrop-blur-md" style={{ background: 'rgba(4,16,31,.85)', border: '1px solid var(--line-g)' }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>Avg. System Size</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 1, color: 'var(--green-hi)' }}>4.2 kWp</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>UK residential average</div>
            </div>
          </div>
          <div className="flex flex-col justify-center px-[60px] py-[72px] bg-[var(--ink-2)] max-[600px]:px-5 max-[600px]:py-9">
            <div className="sec-label reveal">About Our Service</div>
            <h2 className="sec-title reveal rd1">ENGINEERING-LED SOLAR INSTALLATION</h2>
            <p className="reveal rd2 mb-[18px]" style={{ fontSize: 16, color: 'var(--light)', lineHeight: 1.75 }}>Watten Power Ltd provides complete solar PV installation services — from system design and DNO application through to commissioning and handover. Maximum performance, safety, and long-term reliability.</p>
            <p className="reveal rd3 mb-9" style={{ fontSize: 16, color: 'var(--light)', lineHeight: 1.75 }}>Our approach focuses on delivering systems that are not only compliant but also financially and technically optimised for your property and energy usage.</p>
            <div className="reveal rd4">
              <Link to="/contact-us" className="btn-main btn-green">Book a Site Survey →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE INSTALL ── */}
      <section className="py-[100px] border-t border-[var(--line)] max-[600px]:py-[60px]">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="sec-label reveal">What We Install</div>
          <h2 className="sec-title reveal rd1">SOLAR FOR EVERY<br />PROPERTY TYPE</h2>
          <div className="install-row reveal rd2">
            <div className="ir-img relative overflow-hidden">
              <img src={img2} alt="Residential solar" />
              <div className="ir-img-overlay" />
              <div className="absolute top-5 left-5 rounded-[50px] px-[14px] py-[5px] backdrop-blur-md" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--green-hi)', background: 'rgba(4,16,31,.75)', border: '1px solid var(--line-g)' }}>Residential</div>
            </div>
            <div className="flex flex-col justify-center px-10 py-9 backdrop-blur-md max-[600px]:px-5" style={{ background: 'var(--panel)' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: '1.5px', marginBottom: 14 }}>RESIDENTIAL SOLAR SYSTEMS</div>
              <div className="mb-6" style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75 }}>Roof-mounted solar PV systems designed and optimised for household energy consumption — with export capability to earn via the Smart Export Guarantee.</div>
              <ul className="list-none flex flex-col gap-[10px]">
                {["Roof-mounted solar PV systems", "Single-phase inverter setups", "Optimised for household consumption", "Export-ready — earn via Smart Export Guarantee"].map(f => (
                  <li key={f} className="flex items-start gap-[10px]" style={{ fontSize: 15, color: 'var(--light)' }}>
                    <span style={{ color: 'var(--green-hi)', fontFamily: "'Space Mono', monospace", fontSize: 10, marginTop: 3, flexShrink: 0 }}>→</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="install-row reverse reveal rd2">
            <div className="ir-img relative overflow-hidden">
              <img src={img4} alt="Commercial solar" />
              <div className="ir-img-overlay" />
              <div className="absolute top-5 left-5 rounded-[50px] px-[14px] py-[5px] backdrop-blur-md" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--green-hi)', background: 'rgba(4,16,31,.75)', border: '1px solid var(--line-g)' }}>Commercial</div>
            </div>
            <div className="flex flex-col justify-center px-10 py-9 backdrop-blur-md max-[600px]:px-5" style={{ background: 'var(--panel)' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 32, letterSpacing: '1.5px', marginBottom: 14 }}>COMMERCIAL SOLAR SYSTEMS</div>
              <div className="mb-6" style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.75 }}>Large-scale rooftop installations engineered to significantly reduce business energy costs with scalable three-phase infrastructure for the future.</div>
              <ul className="list-none flex flex-col gap-[10px]">
                {["Large-scale rooftop installations", "Three-phase systems", "Significant energy cost reduction", "Scalable for future business growth"].map(f => (
                  <li key={f} className="flex items-start gap-[10px]" style={{ fontSize: 15, color: 'var(--light)' }}>
                    <span style={{ color: 'var(--green-hi)', fontFamily: "'Space Mono', monospace", fontSize: 10, marginTop: 3, flexShrink: 0 }}>→</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="sec-label reveal mt-[52px]">System Components</div>
          <h3 className="reveal rd1 mb-6" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '1.5px' }}>EVERYTHING INCLUDED IN EVERY SYSTEM</h3>
          <div className="grid grid-cols-6 gap-3 mt-6 reveal rd2 max-[1024px]:grid-cols-3 max-[900px]:grid-cols-3 max-[600px]:grid-cols-2">
            {[[solar, "High-Efficiency Panels"], [lightning, "String / Hybrid Inverters"], [shieldIcon, "DC & AC Protection"], [nutIcon, "Mounting & Cabling"], [graphIcon, "Monitoring Systems"], [batteryIcon, "Battery Compatible"]].map(([icon, label]) => (
              <div key={label} className="rounded-[var(--r)] p-5 text-center transition-all duration-300 hover:-translate-y-[3px]" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.4)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div className="text-[28px] mb-[10px]">
                  <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />
                </div>
                <div style={{ fontSize: 9, color: 'var(--muted)', lineHeight: 1.5, fontFamily: "'Space Mono', monospace", letterSpacing: '.5px', textTransform: 'uppercase' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-[100px] border-t border-[var(--line)] bg-[var(--ink-2)] max-[600px]:py-[60px]" id="process">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-[60px] items-start mb-[70px] max-[900px]:grid-cols-1">
            <div>
              <div className="sec-label reveal">Installation Process</div>
              <h2 className="sec-title reveal rd1">HOW IT WORKS</h2>
              <p className="sec-desc reveal rd2">A structured, engineering-led process from initial assessment to final commissioning — ensuring safety, compliance, and long-term performance.</p>
            </div>
            <div className="rounded-[var(--r2)] overflow-hidden relative reveal rd2">
              <img src={img6} alt="Solar installation" className="w-full object-cover" style={{ minHeight: 300, maxHeight: 340, filter: 'brightness(.65) saturate(.8)' }} />
            </div>
          </div>
          <div className="timeline reveal rd3">
            {[
              ["01", houseIcon, "SITE ASSESSMENT", "Roof orientation, shading analysis, structural suitability, and electrical capacity review before any work begins."],
              ["02", setSquare, "SYSTEM DESIGN", "System sizing based on your consumption, budget, and return on investment targets — tailored to your property."],
              ["03", surveryIcon, "DNO APPLICATION", "G98 / G99 grid approval managed entirely on your behalf where required for the installation."],
              ["04", settingIcon, "INSTALLATION", "Panels, inverter, cabling, mounting structures, and all protection systems installed by certified engineers."],
              ["05", tickIcon, "TESTING & COMMISSIONING", "Full system electrical testing, performance validation, and certification issued on completion."],
              ["06", handShakeIcon, "HANDOVER", "System walkthrough, monitoring app setup, SEG registration guidance, and full documentation provided."],
            ].map(([num, icon, title, desc, type], i) => (
              <div key={num} className="tl-item relative pb-12 pl-12 last:pb-0">
                <div className="tl-num">{num}</div>
                <div className="tl-dot">
                  {console.log(icon, typeof icon, icon?.includes?.('.svg'))}

                  {type !== 'icon'
                    ? (
                      <img
                        src={icon}
                        alt=""
                        className="svg-icon"
                        style={{
                          width: 18,
                          height: 18,
                          flexShrink: 0,
                          filter: ICON_FILTER
                        }}
                      />
                    )
                    : <span>{icon}</span>
                  }
                </div>
                {i < 5 && <div className="tl-connector" />}
                <div className="tl-content rounded-[var(--r2)] p-7 transition-colors" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOLAR RANGE ── */}
      <section className="py-[100px] border-t border-[var(--line)] max-[600px]:py-[60px]">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="text-center mb-[60px] flex flex-col items-center">
            <div className="sec-label reveal vis justify-center">
              Our Solar Range
            </div>

            <h2 className="sec-title reveal vis rd1 text-center">
              THE RIGHT SYSTEM<br />
              FOR YOUR PROPERTY
            </h2>

            <p className="sec-desc reveal vis rd2 max-w-[600px] text-center">
              Tailored to different energy needs and budgets — we recommend the right system based on your consumption, roof size, and long-term goals.
            </p>
          </div>
          <div className="range-showcase max-[900px]:grid-cols-1">
            <div className="rs-main relative overflow-hidden rounded-[var(--r2)] p-[44px_36px] flex flex-col justify-between reveal rd1" style={{ background: 'linear-gradient(160deg,rgba(90,140,46,.2),rgba(43,91,168,.12))', border: '2px solid var(--green)' }}>
              <div>
                <div className="inline-block mb-6 px-[14px] py-[5px] rounded-[50px]" style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--green-hi)', background: 'var(--green-dim)', border: '1px solid var(--line-g)' }}>⭐ Most Popular</div>
                <div
                  className="mb-5 flex items-center justify-center"
                  style={{ width: 52, height: 52 }}
                >
                  <img
                    src={lightning}
                    alt=""
                    className="svg-icon"
                    style={{
                      width: 32,
                      height: 32,
                      objectFit: 'contain',
                      filter: ICON_FILTER
                    }}
                  />
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 40, letterSpacing: 2, marginBottom: 8 }}>PREMIUM SYSTEM</div>
                <div className="mb-7" style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.5 }}>Maximum efficiency and output</div>
                <ul className="list-none flex flex-col gap-[10px] rs-main-feats">
                  {["Higher capacity systems", "Advanced inverter options", "Best long-term savings", "Battery storage ready", "EV charger compatible"].map(f => (
                    <li key={f} className="flex items-start gap-[10px]" style={{ fontSize: 15, color: 'var(--light)' }}>{f}</li>
                  ))}
                </ul>
              </div>
              <Link to="/contact-us" className="btn-main btn-green mt-7 self-start">Get a Quote →</Link>
            </div>
            {[
              [leaf1Icon, "ENTRY SYSTEM", "Affordable entry into solar", ["Small households", "Lower upfront cost", "Export-ready"]],
              [solar, "STANDARD SYSTEM", "Balanced performance and value", ["Most UK homes", "Good ROI", "Daily consumption optimised"]],
              [buildingIcon, "COMMERCIAL SYSTEM", "Designed for business efficiency", ["Large-scale installs", "Three-phase systems", "Scalable for growth"]],
              [batteryIcon, "HYBRID / FUTURE-READY", "Built for energy independence", ["Battery-ready systems", "EV charger integration", "Smart energy management"]],
            ].map(([icon, name, tag, feats], i) => (
              <div key={name} className={`rs-card rounded-[var(--r2)] p-[26px_24px] flex flex-col gap-2 transition-all duration-300 reveal rd${i + 2}`} style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}>
                <div className="text-[26px]">
                  <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />
                </div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: '1.5px' }}>{name}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4 }}>{tag}</div>
                <ul className="list-none flex flex-col gap-[6px] mt-1 rs-card-feats">
                  {feats.map(f => <li key={f} className="flex gap-[7px] items-start" style={{ fontSize: 13, color: 'var(--light)' }}>{f}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="range-cta-band mt-9 flex items-center justify-between gap-5 px-9 py-7 rounded-[var(--r2)] flex-wrap reveal" style={{ background: 'linear-gradient(135deg,rgba(90,140,46,.12),rgba(43,91,168,.08))', border: '1px solid var(--line-g)' }}>
            <div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: 1, marginBottom: 4 }}>Not sure what system size suits your property?</div>
              <div style={{ fontSize: 16, color: 'var(--muted)' }}>We will analyse your usage and recommend the most efficient system.</div>
            </div>
            <Link to="/contact-us" className="btn-main btn-green">Request a Quote →</Link>
          </div>
        </div>
      </section>

      {/* ── ESTIMATOR ── */}
      <section
        className="border-t border-[rgba(43,91,168,.22)] relative overflow-hidden w-full"
        style={{ background: 'var(--ink)' }}
        id="estimator"
      >
        <style>{`
          .est-wrap {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
            width: 100%;
            max-width: 1160px;
            margin: 0 auto;
            padding: 0 52px;
            gap: 60px;
            box-sizing: border-box;
          }
          .est-left {
            padding: 80px 0;
            min-width: 0;
            width: 100%;
            position: relative;
            overflow: visible;
          }
          .est-left::after {
            content: '';
            position: absolute;
            top: 10%; right: -30px; bottom: 10%;
            width: 1px;
            background: linear-gradient(to bottom, transparent, rgba(90,140,46,.5), transparent);
            opacity: 0;
            transition: opacity .5s ease .2s;
            pointer-events: none;
          }
          .est-left.active::after { opacity: 1; }
          .est-btn-wrap { display: block; }
          .est-left.active .est-btn-wrap { display: none; }
          .est-right {
            padding: 80px 0;
            min-width: 0;
            width: 100%;
            overflow: visible;
          }
          .est-cards-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
            width: 100%;
            box-sizing: border-box;
          }
          @media (max-width: 1024px) { .est-wrap { padding: 0 32px; gap: 40px; } }
          @media (max-width: 900px) {
            .est-wrap { display: flex !important; flex-direction: column !important; gap: 0 !important; padding: 0 24px !important; }
            .est-left { padding: 52px 0 0; }
            .est-left::after { display: none; }
            .est-right { padding: 32px 0 52px; }
          }
          @media (max-width: 600px) {
            .est-wrap { padding: 0 20px !important; }
            .est-cards-grid { grid-template-columns: 1fr; }
          }
        `}</style>

        <div className="est-wrap">
          <div className={`est-left${showEstimator ? ' active' : ''}`} ref={estimatorRef}>
            <div className="reveal mb-4" style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--green-hi)' }}>
              Solar Cost Estimator
            </div>
            <h2 className="reveal rd1 mb-5" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(36px,4vw,56px)', letterSpacing: '2px', lineHeight: 1.05 }}>
              Estimate Your<br />
              <span style={{ background: 'linear-gradient(135deg,#72b038,#5a8c2e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', display: 'inline-block' }}>
                Solar System
              </span>
            </h2>
            <p className="reveal rd2 mb-9" style={{ fontSize: 15, color: 'var(--light)', lineHeight: 1.8, maxWidth: 440 }}>
              Not sure how much a solar installation will cost? Our free estimator gives you an instant, personalised estimate — including recommended system size, projected savings, and estimated payback period.
            </p>
            <div className="est-btn-wrap">
              <button
                className="est-btn relative inline-flex items-center gap-4 text-white rounded-[60px] border-none cursor-pointer overflow-hidden font-bold reveal rd3 px-10 py-5"
                style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '2.5px', textTransform: 'uppercase' }}
                onClick={handleEstimateClick}
              >
                <div className="est-btn-icon w-12 h-12 rounded-full flex items-center justify-center text-[22px] flex-shrink-0 transition-all duration-300" style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.1)' }}>
                  ☀️
                </div>
                Estimate Your System
              </button>
            </div>

            {/* Cards below content ONLY after button click */}
            {showEstimator && (
              <div className="est-cards-grid rd2" style={{ marginTop: 32 }}>
                {estimatorCards.map(([icon, strong, sub]) => (
                  <div
                    key={strong}
                    className="ef-item relative flex items-start gap-[12px] rounded-[16px] p-4 overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
                    style={{ background: 'rgba(90,140,46,.08)', border: '1px solid rgba(90,140,46,.25)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.45)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.25)'}
                  >
                    <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(90,140,46,.15)', border: '1px solid rgba(90,140,46,.3)' }}>
                      <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                      <strong className="block mb-[2px]" style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{strong}</strong>
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: cards by default, wizard after click */}
          <div className="est-right">
            <div id="estimator-wizard" />

            {/* Cards on right ONLY before button click */}
            {!showEstimator && (
              <div className="est-cards-grid rd2" style={{ marginTop: 0 }}>
                {estimatorCards.map(([icon, strong, sub]) => (
                  <div
                    key={strong}
                    className="ef-item relative flex items-start gap-[12px] rounded-[16px] p-4 overflow-hidden transition-all duration-300 hover:-translate-y-[2px]"
                    style={{ background: 'rgba(90,140,46,.08)', border: '1px solid rgba(90,140,46,.25)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.45)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.25)'}
                  >
                    <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(90,140,46,.15)', border: '1px solid rgba(90,140,46,.3)' }}>
                      <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--muted)', lineHeight: 1.5 }}>
                      <strong className="block mb-[2px]" style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>{strong}</strong>
                      {sub}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {showEstimator && (
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="est-live-wrap w-full">
                    <SolarEstimatorWizard
                      startFromStep={1}
                      onBack={() => setShowEstimator(false)}
                      embedded={true}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SAVINGS ── */}
      <section className="relative overflow-hidden border-t border-[var(--line)] border-b border-[var(--line)] s-savings">
        <div className="grid grid-cols-4 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
          {[[moneyIcon, "£816", "Average Annual Savings"], [leafIcon, "1.2T", "CO₂ Saved Per Year"], [graphIcon, "25%", "Return on Investment"], [lightning, "3,285", "kWh Generated Per Year"]].map(([icon, num, label]) => (
            <div key={label} className="px-10 py-14 text-center border-r border-[var(--line)] last:border-r-0 relative transition-colors duration-300 hover:bg-[rgba(90,140,46,.05)] max-[900px]:border-b max-[600px]:border-r-0">
              <div
                className="w-[58px] h-[58px] rounded-[16px] flex items-center justify-center mx-auto mb-5"
                style={{
                  background: 'rgba(90,140,46,.12)',
                  border: '1px solid rgba(90,140,46,.28)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <img
                  src={icon}
                  alt=""
                  className="svg-icon"
                  style={{
                    width: 26,
                    height: 26,
                    objectFit: 'contain',
                    filter: ICON_FILTER
                  }}
                />
              </div>
              <div className="sb-num">{num}</div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AFTER SALES ── */}
      <section className="py-[100px] border-t border-[var(--line)] max-[600px]:py-[60px]">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="grid grid-cols-2 gap-[60px] items-end mb-[56px] max-[900px]:grid-cols-1">
            <div>
              <div className="sec-label reveal">After Sales</div>
              <h2 className="sec-title reveal rd1">SUPPORT THAT LASTS AS LONG AS YOUR SYSTEM</h2>
              <p className="sec-desc reveal rd2">Every installation is backed by comprehensive warranties, monitoring, and ongoing support — giving you complete peace of mind.</p>
            </div>
            <div className="rounded-[var(--r2)] overflow-hidden reveal rd2">
              <img src={img3} alt="Support" className="w-full h-[300px] object-cover" style={{ filter: 'brightness(.65) saturate(.8)' }} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1">
            {[
              [lockIcon, "Workmanship Warranty", "10-year workmanship warranty on all installations covering materials and labour."],
              [solar, "Panel Warranty", "25-year manufacturer performance warranty on all solar panels supplied."],
              [lightning, "Inverter Warranty", "5–12 year inverter warranty depending on the manufacturer and model selected."],
              [graphIcon, "Monitoring", "Remote system monitoring to track generation and detect any performance issues."],
              [spanner, "Annual Servicing", "Optional annual servicing packages to keep your system performing at its best."],
              [phoneIcon, "24/7 Support", "Dedicated support line for any questions or issues that arise post-installation."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="sg-card relative overflow-hidden rounded-[var(--r2)] p-[32px_28px] transition-all duration-300 hover:-translate-y-1 reveal" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.45)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div className="w-[54px] h-[54px] rounded-[14px] flex items-center justify-center mb-5" style={{ background: 'var(--green-dim)', border: '1px solid var(--line-g)' }}>
                  <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />

                </div>
                <div className="mb-[10px]" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1 }}>{title}</div>
                <div style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="py-[80px] border-t border-[var(--line)] bg-[var(--ink-2)] max-[600px]:py-[60px]">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="grid grid-cols-2 gap-[60px] items-start mb-[56px] max-[900px]:grid-cols-1">
            <div>
              <div className="sec-label reveal">Standards</div>
              <h2 className="sec-title reveal rd1">BUILT TO<br />UK STANDARDS.<br />ALWAYS.</h2>
            </div>
            <p className="reveal pl-4 self-end" style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.75, borderLeft: '2px solid var(--line-g)' }}>
              Our MCS registration is currently in progress. All installations comply with applicable UK electrical and solar standards and regulations from day one.
            </p>
          </div>
          <div className="grid grid-cols-6 gap-3 max-[1024px]:grid-cols-3 max-[600px]:grid-cols-2">
            {[
              [medalIcon, "MCS", "Microgeneration Certification Scheme", "in-progress", "+ IN PROGRESS"],
              [lightning, "BS 7671", "IET Wiring Regulations 18th Edition", "compliant", "✓ COMPLIANT"],
              [starIcon, "IEC 61215", "Solar panel performance standard", "compliant", "✓ COMPLIANT"],
              [shieldIcon, "IEC 61730", "Solar module safety qualification", "compliant", "✓ COMPLIANT"],
              [plugIcon, "G98 / G99", "Grid connection compliance", "compliant", "✓ COMPLIANT"],
              [gbIcon, "0% VAT", "Qualifying residential installs", "confirmed", "✓ CONFIRMED"],
            ].map(([icon, name, desc, statusClass, statusLabel]) => (
              <div key={name} className="flex flex-col items-center text-center rounded-[var(--r2)] p-[28px_18px_20px] transition-all duration-300 hover:-translate-y-[3px] reveal" style={{ background: 'var(--panel)', border: '1px solid var(--line)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(90,140,46,.45)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}
              >
                <div className="text-[32px] mb-[14px]">
                  <img
                    src={icon}
                    alt=""
                    className="svg-icon"
                    style={{
                      width: 22,
                      height: 22,
                      flexShrink: 0,
                      filter: "brightness(0) saturate(100%) invert(67%) sepia(63%) saturate(1856%) hue-rotate(176deg) brightness(101%) contrast(101%)"
                    }}
                  />                  </div>
                <div className="mb-2" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: 1, color: 'var(--green-hi)' }}>{name}</div>
                <div className="mb-4 flex-1" style={{ fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{desc}</div>
                <span className={`std-status ${statusClass}`}>{statusLabel}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY WATTEN ── */}
      <section className="py-[100px] border-t border-[var(--line)] max-[600px]:py-[60px]">
        <div className="max-w-[1160px] mx-auto px-[52px] max-[1024px]:px-8 max-[900px]:px-6 max-[600px]:px-4">
          <div className="sec-label reveal">Why Watten Power</div>
          <h2 className="sec-title reveal rd1">THE WATTEN DIFFERENCE</h2>
          <div className="grid grid-cols-4 mt-[52px] rounded-[var(--r2)] overflow-hidden max-[900px]:grid-cols-2 max-[600px]:grid-cols-1" style={{ border: '1px solid var(--line)' }}>
            {[
              [trophyIcon, "MCS Certified", "Every installation carried out by MCS-certified engineers to the highest professional standard."],
              [setSquare, "Bespoke Design", "Each system is custom-designed for your specific property, energy usage, and financial goals."],
              [handShakeIcon, "End-to-End Service", "From initial survey to DNO application, installation, and handover — we manage everything."],
              [moneyIcon, "Transparent Pricing", "Clear, itemised quotes with no hidden costs. We explain every line of the proposal."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="wr-item relative px-8 py-10 border-r border-[var(--line)] last:border-r-0 transition-colors duration-300 hover:bg-[rgba(90,140,46,.06)] max-[900px]:even:border-r-0 max-[600px]:border-r-0 max-[600px]:border-b max-[600px]:last:border-b-0">
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[22px] mb-[22px]" style={{ background: 'var(--green-dim)', border: '1px solid var(--line-g)' }}>
                  <img src={icon} alt="" className="svg-icon" style={{ width: 22, height: 22, flexShrink: 0, filter: ICON_FILTER }} />
                </div>
                <div className="mb-3" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, letterSpacing: 1 }}>{title}</div>
                <div style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-[100px] border-t border-[var(--line)] text-center max-[600px]:py-[60px]" style={{ background: 'linear-gradient(135deg,rgba(90,140,46,.08),rgba(43,91,168,.06))' }}>
        <div className="max-w-[1160px] mx-auto px-[52px] max-[900px]:px-6 max-[600px]:px-4">
          <div className="sec-label reveal justify-center">Get Started</div>
          <h2 className="reveal rd1" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(42px,6vw,72px)', lineHeight: .93, letterSpacing: 2, marginBottom: 16 }}>READY TO GO SOLAR?</h2>
          <p className="sec-desc reveal rd2 mx-auto text-center mb-10">Book a free, no-obligation site survey and receive a tailored quote for your property. Our team will handle everything from start to finish.</p>
          <div className="flex gap-[14px] justify-center flex-wrap px-4 reveal rd3 max-[600px]:flex-col max-[600px]:items-center">
            <Link to="/contact-us" className="btn-main btn-green max-[600px]:w-full max-[600px]:max-w-[320px] max-[600px]:justify-center">Book a Free Survey →</Link>
            <a
              href="tel:07404378787"
              className="btn-outline max-[600px]:w-full max-[600px]:max-w-[320px] max-[600px]:justify-center"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}
            >
              <img
                src={phoneIcon2}
                alt=""
                className="svg-icon"
                style={{
                  width: 18,
                  height: 18,
                  objectFit: 'contain',
                  flexShrink: 0,
                  filter: ICON_FILTER
                }}
              />

              <span style={{ lineHeight: 1 }}>
                07404 378787
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-[2] border-t border-[var(--line)] bg-[var(--ink-2)] px-[52px] pt-[60px] pb-9 max-[960px]:px-8 max-[600px]:px-5">
        <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 mb-12 max-[960px]:grid-cols-2 max-[600px]:grid-cols-1">
          <div>
            <div className="mb-4">
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="logo" className="h-[34px] w-auto" />
                <span className="text-[#26599b] font-bold text-[23px] leading-none tracking-[0.02em] mt-[2px]" style={{ fontFamily: "'Montserrat', 'Poppins', sans-serif" }}>WATTEN POWER</span>
              </Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
              Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.
            </p>
          </div>
          <SolFooterCol title="Services" links={[
            { label: 'EV Charger Installation', href: '/ev-charger' },
            { label: 'Solar System Installation', href: '/solar' },
            { label: 'Solar Estimator', href: '/solar-estimator' },
          ]} />
          <SolFooterCol title="Contact Us" links={[
            { label: '0208 001 1100', href: 'tel:02080011100' },
            { label: 'info@wattenpower.com', href: 'mailto:info@wattenpower.com' },
            { label: <><span>Office 2, 60 Gold Street,</span><br /><span>Northampton, NN1 1RS</span></>, href: '#' },
          ]} />
          <SolFooterCol title="Legal" links={[
            { label: 'Terms & Conditions', href: termsPdf },
            { label: 'Terms of Sale', href: salePdf },
            { label: 'Cookie Policy', href: cookiePdf },
            { label: 'Privacy Policy', href: privacyPdf },
            { label: 'Refunds & Returns Policy', href: refundPdf },
            { label: 'Modern Slavery Statement', href: slaveryPdf },
          ]} />
        </div>
        <div className="flex items-center justify-between pt-7 border-t border-[var(--line)] flex-wrap gap-3" style={{ fontSize: 12, color: 'var(--muted)' }}>
          <span>© 2026 Watten Power Ltd. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1 }}>Made with ❤️ by poweroins</span>
        </div>
      </footer>
    </div>
  );
}