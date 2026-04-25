import { useEffect, useRef, useState } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

function SolFooterCol({ title, links }) {
  return (
    <div>
      <h4 style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: 2,
        textTransform: 'uppercase', color: 'var(--light)', margin: '0 0 18px',
      }}>{title}</h4>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {links.map((l, i) => (
          <li key={i}>
            <a href={l.href}
              style={{ fontSize: 13, color: 'var(--muted)', textDecoration: 'none', transition: 'color .2s', wordBreak: 'break-word' }}
              onMouseEnter={e => e.target.style.color = 'var(--white)'}
              onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Solar() {
  const revealRef = useRef([]);
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("vis")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.vis { opacity: 1; transform: translateY(0); }
        .rd1 { transition-delay: .1s } .rd2 { transition-delay: .2s } .rd3 { transition-delay: .3s } .rd4 { transition-delay: .4s } .rd5 { transition-delay: .5s }
        .s-container { max-width: 1160px; margin: 0 auto; padding: 0 52px; }
        .sec-label { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }
        .sec-label::before { content: ''; display: block; width: 22px; height: 1px; background: var(--green-hi); }
        .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(38px,5vw,60px); line-height: .95; letter-spacing: 2px; margin-bottom: 16px; }
        .sec-desc { font-size: 16px; color: var(--light); font-weight: 300; max-width: 560px; line-height: 1.75; }
        .btn-main { display: inline-flex; align-items: center; gap: 9px; background: linear-gradient(135deg,var(--blue),var(--blue-hi)); color: #fff; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 34px; border-radius: 50px; border: none; cursor: pointer; text-decoration: none; transition: all .25s; box-shadow: 0 8px 28px rgba(43,91,168,.4); white-space: nowrap; }
        .btn-main:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(43,91,168,.5); }
        .btn-green { background: linear-gradient(135deg,var(--green),var(--green-hi)); box-shadow: 0 8px 28px rgba(90,140,46,.35); }
        .btn-green:hover { box-shadow: 0 14px 40px rgba(90,140,46,.45); }
        .btn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--white); font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 13px 30px; border-radius: 50px; border: 1px solid rgba(255,255,255,.18); cursor: pointer; text-decoration: none; transition: all .25s; white-space: nowrap; }
        .btn-outline:hover { border-color: var(--green-hi); color: var(--green-hi); }

        /* NAV */
        .s-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 52px; background: rgba(4,16,31,.9); backdrop-filter: blur(22px); border-bottom: 1px solid var(--line); transition: background .3s; }
        .s-nav.scrolled { background: rgba(4,16,31,.97); }
        .nav-links { display: flex; align-items: center; gap: 32px; list-style: none; }
        .nav-links a { color: var(--muted); text-decoration: none; font-size: 13px; font-weight: 400; letter-spacing: .3px; transition: color .2s; }
        .nav-links a:hover { color: var(--white); }
        .nav-links a.active { color: var(--green-hi); }
        .nav-burger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; }
        .nav-burger span { display: block; width: 22px; height: 2px; background: var(--muted); border-radius: 1px; }
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
        .s-hero-content { position: relative; z-index: 3; flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; max-width: 900px; width: 100%; margin: 0 auto; padding: 100px 24px 48px; }
        .s-hero-breadcrumb { display: flex; align-items: center; justify-content: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 28px; animation: fadeUp .8s ease both; }
        .s-hero-breadcrumb a { color: var(--muted); text-decoration: none; transition: color .2s; }
        .s-hero-breadcrumb .cur { color: var(--green-hi); }
        .s-hero-sun { width: 80px; height: 80px; margin: 0 auto 28px; border-radius: 50%; background: radial-gradient(circle,rgba(90,140,46,.4),rgba(90,140,46,.1) 60%,transparent); border: 1px solid rgba(90,140,46,.3); display: flex; align-items: center; justify-content: center; font-size: 36px; animation: fadeUp .8s .05s ease both, pulse-sun 3s ease-in-out infinite; }
        @keyframes pulse-sun { 0%,100%{box-shadow:0 0 0 0 rgba(90,140,46,.3)} 50%{box-shadow:0 0 40px 10px rgba(90,140,46,.15)} }
        .s-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px,10vw,130px); line-height: .9; letter-spacing: 3px; margin-bottom: 14px; animation: fadeUp .8s .1s ease both; }
        .s-hero-title .line-2 { display: block; color: var(--green-hi); -webkit-text-stroke: 1px var(--green); }
        .s-hero-tagline { font-size: clamp(13px,1.8vw,17px); color: var(--light); max-width: 640px; margin: 0 auto 40px; line-height: 1.7; animation: fadeUp .8s .2s ease both; }
        .s-hero-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; padding: 0 16px; animation: fadeUp .8s .3s ease both; width: 100%; }
        .s-hero-bottom { position: relative; z-index: 3; width: 100%; display: flex; flex-wrap: wrap; justify-content: center; border-top: 1px solid rgba(43,91,168,.2); animation: fadeUp .8s .4s ease both; }
        .hb-stat { flex: 1 1 140px; min-width: 120px; max-width: 260px; padding: 20px 24px; text-align: center; border-right: 1px solid rgba(43,91,168,.2); background: rgba(4,16,31,.85); backdrop-filter: blur(16px); }
        .hb-stat:last-child { border-right: none; }
        .hb-val { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; background: linear-gradient(135deg,var(--blue-hi),var(--green-hi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .hb-divider { display: block; height: 1px; background: rgba(90,140,46,.35); margin: 5px auto 6px; width: 28px; }
        .hb-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); line-height: 1.5; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* INTRO */
        .s-intro { padding: 0; overflow: hidden; border-bottom: 1px solid var(--line); }
        .s-intro-split { display: grid; grid-template-columns: 1fr 1fr; min-height: 560px; }
        .s-intro-img { position: relative; overflow: hidden; }
        .s-intro-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.8); }
        .s-intro-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right,transparent 50%,var(--ink-2) 100%); }
        .s-intro-img .img-badge { position: absolute; bottom: 40px; left: 40px; z-index: 2; background: rgba(4,16,31,.85); border: 1px solid var(--line-g); border-radius: 14px; padding: 16px 22px; backdrop-filter: blur(14px); }
        .img-badge-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .img-badge-val { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; color: var(--green-hi); }
        .img-badge-sub { font-size: 12px; color: var(--muted); margin-top: 2px; }
        .s-intro-text { background: var(--ink-2); display: flex; flex-direction: column; justify-content: center; padding: 72px 60px; }
        .s-intro-text p { font-size: 16px; color: var(--light); line-height: 1.75; margin-bottom: 18px; }
        .s-intro-text p:last-of-type { margin-bottom: 36px; }

        /* INSTALL */
        .s-install { padding: 100px 0; border-top: 1px solid var(--line); }
        .install-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; height: 400px; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; margin-bottom: 24px; transition: border-color .3s; }
        .install-row:hover { border-color: rgba(90,140,46,.4); }
        .install-row.reverse { direction: rtl; }
        .install-row.reverse > * { direction: ltr; }
        .ir-img { position: relative; overflow: hidden; }
        .ir-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.6) saturate(.75); transition: transform .6s ease, filter .4s; }
        .install-row:hover .ir-img img { transform: scale(1.04); filter: brightness(.75) saturate(.9); }
        .ir-img-overlay { position: absolute; inset: 0; background: linear-gradient(to right,transparent 40%,rgba(10,22,46,.6)); }
        .install-row.reverse .ir-img-overlay { background: linear-gradient(to left,transparent 40%,rgba(10,22,46,.6)); }
        .ir-tag { position: absolute; top: 20px; left: 20px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--green-hi); background: rgba(4,16,31,.75); border: 1px solid var(--line-g); border-radius: 50px; padding: 5px 14px; backdrop-filter: blur(8px); }
        .ir-body { background: var(--panel); padding: 36px 40px; display: flex; flex-direction: column; justify-content: center; backdrop-filter: blur(12px); }
        .ir-num { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--muted); margin-bottom: 20px; }
        .ir-title { font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 1.5px; margin-bottom: 14px; }
        .ir-desc { font-size: 16px; color: var(--muted); line-height: 1.75; margin-bottom: 24px; }
        .ir-features { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .ir-features li { font-size: 15px; color: var(--light); display: flex; align-items: flex-start; gap: 10px; }
        .ir-features li::before { content: '→'; color: var(--green-hi); font-family: 'Space Mono', monospace; font-size: 10px; margin-top: 3px; flex-shrink: 0; }
        .comp-strip { display: grid; grid-template-columns: repeat(6,1fr); gap: 12px; margin-top: 24px; }
        .cs-item { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 20px 16px; text-align: center; transition: all .25s; }
        .cs-item:hover { border-color: rgba(90,140,46,.4); transform: translateY(-3px); }
        .cs-icon { font-size: 28px; margin-bottom: 10px; }
        .cs-label { font-size: 9px; color: var(--muted); line-height: 1.5; font-family: 'Space Mono', monospace; letter-spacing: .5px; text-transform: uppercase; }

        /* PROCESS */
        .s-process { padding: 100px 0; border-top: 1px solid var(--line); background: var(--ink-2); }
        .process-header { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; align-items: start; margin-bottom: 70px; }
        .timeline { position: relative; padding-left: 80px; }
        .timeline::before { content: ''; position: absolute; left: 24px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom,var(--green),var(--blue),transparent); }
        .tl-item { position: relative; margin-bottom: 0; padding: 0 0 48px 48px; }
        .tl-item:last-child { padding-bottom: 0; }
        .tl-dot { position: absolute; left: -56px; top: 0; width: 32px; height: 32px; border-radius: 50%; background: var(--ink-2); border: 2px solid var(--line); display: flex; align-items: center; justify-content: center; font-size: 14px; transition: border-color .3s, background .3s; }
        .tl-item:hover .tl-dot { border-color: var(--green-hi); background: var(--green-dim); }
        .tl-num { position: absolute; left: -100px; top: 6px; font-family: 'Bebas Neue', sans-serif; font-size: 14px; letter-spacing: 1px; color: rgba(43,91,168,.35); transition: color .3s; }
        .tl-item:hover .tl-num { color: var(--green-hi); }
        .tl-connector { position: absolute; left: -41px; top: 32px; bottom: 0; width: 1px; background: var(--line); }
        .tl-item:last-child .tl-connector { display: none; }
        .tl-content { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 28px; transition: border-color .3s; }
        .tl-item:hover .tl-content { border-color: rgba(90,140,46,.4); }
        .tl-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 8px; }
        .tl-desc { font-size: 16px; color: var(--muted); line-height: 1.7; }
        .process-img { border-radius: var(--r2); overflow: hidden; position: relative; }
        .process-img img { width: 100%; min-height: 300px; max-height: 340px; object-fit: cover; filter: brightness(.65) saturate(.8); }
        .process-img-badge { position: absolute; bottom: 28px; right: 28px; background: rgba(4,16,31,.85); border: 1px solid var(--line-g); border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(14px); }

        /* RANGE */
        .s-range { padding: 100px 0; border-top: 1px solid var(--line); }
        .range-header { text-align: center; margin-bottom: 60px; }
        .range-header .sec-label { justify-content: center; }
        .range-header .sec-label::before { display: none; }
        .range-showcase { display: grid; grid-template-columns: 1.6fr 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 16px; min-height: 600px; }
        .rs-main { grid-row: 1/3; background: linear-gradient(160deg,rgba(90,140,46,.2),rgba(43,91,168,.12)); border: 2px solid var(--green); border-radius: var(--r2); padding: 44px 36px; display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; }
        .rs-main::before { content: ''; position: absolute; top: -60px; right: -60px; width: 240px; height: 240px; border-radius: 50%; background: radial-gradient(circle,rgba(90,140,46,.15),transparent 70%); }
        .rs-main-badge { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--green-hi); background: var(--green-dim); border: 1px solid var(--line-g); border-radius: 50px; padding: 5px 14px; display: inline-block; margin-bottom: 24px; }
        .rs-main-icon { font-size: 52px; margin-bottom: 20px; }
        .rs-main-name { font-family: 'Bebas Neue', sans-serif; font-size: 40px; letter-spacing: 2px; margin-bottom: 8px; }
        .rs-main-tag { font-size: 15px; color: var(--muted); margin-bottom: 28px; line-height: 1.5; }
        .rs-main-feats { list-style: none; display: flex; flex-direction: column; gap: 10px; }
        .rs-main-feats li { font-size: 15px; color: var(--light); display: flex; align-items: flex-start; gap: 10px; }
        .rs-main-feats li::before { content: '✓'; color: var(--green-hi); flex-shrink: 0; font-weight: 700; }
        .rs-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 26px 24px; transition: all .28s; display: flex; flex-direction: column; gap: 8px; }
        .rs-card:hover { border-color: rgba(90,140,46,.5); transform: translateY(-3px); }
        .rs-card-num { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; color: var(--muted); text-transform: uppercase; }
        .rs-card-icon { font-size: 26px; }
        .rs-card-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1.5px; }
        .rs-card-tag { font-size: 13px; color: var(--muted); line-height: 1.4; }
        .rs-card-feats { list-style: none; display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
        .rs-card-feats li { font-size: 13px; color: var(--light); display: flex; gap: 7px; align-items: flex-start; }
        .rs-card-feats li::before { content: '·'; color: var(--green-hi); font-size: 18px; line-height: .9; flex-shrink: 0; }
        .range-cta-band { margin-top: 36px; display: flex; align-items: center; justify-content: space-between; gap: 20px; padding: 28px 36px; background: linear-gradient(135deg,rgba(90,140,46,.12),rgba(43,91,168,.08)); border: 1px solid var(--line-g); border-radius: var(--r2); flex-wrap: wrap; }
        .rcb-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 4px; }
        .rcb-sub { font-size: 16px; color: var(--muted); }

        /* SAVINGS */
        .s-savings { padding: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); position: relative; overflow: hidden; }
        .s-savings::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(90,140,46,.08),rgba(43,91,168,.06)); }
        .savings-inner { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; }
        .sb-item { padding: 56px 40px; text-align: center; border-right: 1px solid var(--line); position: relative; transition: background .3s; }
        .sb-item:last-child { border-right: none; }
        .sb-item:hover { background: rgba(90,140,46,.05); }
        .sb-icon { font-size: 32px; margin-bottom: 16px; }
        .sb-num { font-family: 'Bebas Neue', sans-serif; font-size: clamp(42px,5vw,62px); letter-spacing: -1px; line-height: 1; background: linear-gradient(135deg,var(--blue-hi),var(--green-hi)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 8px; }
        .sb-label { font-size: 13px; color: var(--muted); line-height: 1.5; }

        /* AFTERSALES */
        .s-aftersales { padding: 100px 0; border-top: 1px solid var(--line); }
        .aftersales-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 56px; }
        .aftersales-img { border-radius: var(--r2); overflow: hidden; }
        .aftersales-img img { width: 100%; height: 300px; object-fit: cover; filter: brightness(.65) saturate(.8); }
        .support-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; }
        .sg-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 32px 28px; transition: all .28s; position: relative; overflow: hidden; }
        .sg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--green),var(--blue-hi)); opacity: 0; transition: opacity .3s; }
        .sg-card:hover { border-color: rgba(90,140,46,.45); transform: translateY(-4px); }
        .sg-card:hover::before { opacity: 1; }
        .sg-icon-wrap { width: 54px; height: 54px; border-radius: 14px; background: var(--green-dim); border: 1px solid var(--line-g); display: flex; align-items: center; justify-content: center; font-size: 24px; margin-bottom: 20px; }
        .sg-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; margin-bottom: 10px; }
        .sg-desc { font-size: 15px; color: var(--muted); line-height: 1.7; }

        /* COMPLIANCE */
        .s-compliance { padding: 80px 0; border-top: 1px solid var(--line); background: var(--ink-2); }
        .compliance-top { display: flex; align-items: flex-end; justify-content: space-between; gap: 40px; margin-bottom: 48px; flex-wrap: wrap; }
        .compliance-note { font-size: 13px; color: var(--muted); max-width: 340px; line-height: 1.75; padding-left: 16px; border-left: 2px solid var(--line-g); }
        .standards-row { display: grid; grid-template-columns: repeat(6,1fr); gap: 12px; }
        .std-pill { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 24px 18px; text-align: center; transition: all .28s; }
        .std-pill:hover { border-color: rgba(90,140,46,.45); transform: translateY(-3px); }
        .std-pill-icon { font-size: 28px; margin-bottom: 12px; }
        .std-pill-name { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; color: var(--green-hi); margin-bottom: 5px; }
        .std-pill-desc { font-size: 11px; color: var(--muted); line-height: 1.5; }

        /* WHY */
        .s-why { padding: 100px 0; border-top: 1px solid var(--line); }
        .why-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 0; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; margin-top: 52px; }
        .wr-item { padding: 40px 32px; border-right: 1px solid var(--line); transition: background .28s; position: relative; }
        .wr-item:last-child { border-right: none; }
        .wr-item:hover { background: rgba(90,140,46,.06); }
        .wr-item::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--green),transparent); opacity: 0; transition: opacity .3s; }
        .wr-item:hover::after { opacity: 1; }
        .wr-icon { width: 52px; height: 52px; border-radius: 14px; background: var(--green-dim); border: 1px solid var(--line-g); display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 22px; }
        .wr-title { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; margin-bottom: 12px; }
        .wr-desc { font-size: 16px; color: var(--muted); line-height: 1.7; }

        /* CTA */
        .s-cta { padding: 100px 0; border-top: 1px solid var(--line); text-align: center; background: linear-gradient(135deg,rgba(90,140,46,.08),rgba(43,91,168,.06)); }
        .s-cta .sec-label { justify-content: center; }
        .s-cta .sec-label::before { display: none; }
        .s-cta .sec-title { font-size: clamp(42px,6vw,72px); }
        .s-cta .sec-desc { margin: 0 auto 40px; text-align: center; }
        .s-cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; padding: 0 16px; }

        @media (max-width: 1024px) {
          .s-container { padding: 0 32px; }
          .comp-strip { grid-template-columns: repeat(3,1fr); }
          .standards-row { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 900px) {
          .s-container { padding: 0 24px; }
          .s-nav { padding: 0 24px; }
          .s-hero-content { padding: 80px 20px 40px; }
          .s-hero-btns { flex-direction: column; align-items: center; gap: 12px; }
          .s-hero-btns .btn-main, .s-hero-btns .btn-outline { width: 100%; max-width: 320px; justify-content: center; }
          .hb-stat { flex: 1 1 50%; max-width: 50%; border-bottom: 1px solid rgba(43,91,168,.2); }
          .hb-stat:nth-child(2n) { border-right: none; }
          .hb-stat:nth-child(3), .hb-stat:nth-child(4) { border-bottom: none; }
          .s-intro-split { grid-template-columns: 1fr; }
          .s-intro-img { min-height: 300px; }
          .s-intro-text { padding: 48px 32px; }
          .process-header { grid-template-columns: 1fr; }
          .aftersales-header { grid-template-columns: 1fr; }
          .install-row, .install-row.reverse { grid-template-columns: 1fr; height: auto; direction: ltr; }
          .install-row .ir-img, .install-row.reverse .ir-img { height: 220px; }
          .ir-body { padding: 28px 24px; }
          .range-showcase { grid-template-columns: 1fr; grid-template-rows: auto; }
          .rs-main { grid-row: auto; }
          .savings-inner { grid-template-columns: 1fr 1fr; }
          .sb-item { border-bottom: 1px solid var(--line); }
          .sb-item:nth-child(2n) { border-right: none; }
          .sb-item:nth-child(3), .sb-item:nth-child(4) { border-bottom: none; }
          .support-grid { grid-template-columns: 1fr 1fr; }
          .standards-row { grid-template-columns: repeat(3,1fr); }
          .why-row { grid-template-columns: 1fr 1fr; }
          .wr-item:nth-child(2) { border-right: none; }
          .wr-item:nth-child(1), .wr-item:nth-child(2) { border-bottom: 1px solid var(--line); }
          .comp-strip { grid-template-columns: repeat(3,1fr); }
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }
        @media (max-width: 600px) {
          .s-container { padding: 0 16px; }
          .s-install, .s-process, .s-range, .s-aftersales, .s-compliance, .s-why, .s-cta { padding: 60px 0; }
          .hb-stat { flex: 1 1 100%; max-width: 100%; border-right: none; border-bottom: 1px solid rgba(43,91,168,.2); }
          .hb-stat:last-child { border-bottom: none; }
          .savings-inner { grid-template-columns: 1fr; }
          .sb-item { border-right: none; border-bottom: 1px solid var(--line); }
          .sb-item:last-child { border-bottom: none; }
          .support-grid { grid-template-columns: 1fr; }
          .standards-row { grid-template-columns: repeat(2,1fr); }
          .why-row { grid-template-columns: 1fr; border-radius: var(--r2); }
          .wr-item { border-right: none; border-bottom: 1px solid var(--line); }
          .wr-item:last-child { border-bottom: none; }
          .comp-strip { grid-template-columns: repeat(2,1fr); }
          .timeline { padding-left: 60px; }
          .tl-num { left: -80px; }
          .s-cta-btns { flex-direction: column; align-items: center; }
          .s-cta-btns .btn-main, .s-cta-btns .btn-outline { width: 100%; max-width: 320px; justify-content: center; }
          .range-cta-band { flex-direction: column; align-items: flex-start; padding: 24px; }
          .s-intro-text { padding: 36px 20px; }
          .ir-body { padding: 24px 20px; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`s-nav${scrolled ? " scrolled" : ""}`}>
        <Link to="/">
          <img src={logo} alt="Watten Power" style={{ height: 40, display: 'block' }} />
        </Link>
        <ul className="nav-links">
          {[["Home", "/", ""], ["EV Charger", "/ev-charger", ""], ["Solar Solution", "/solar", "active"]].map(([label, href, cls]) => (
            <li key={label}><Link to={href} className={cls}>{label}</Link></li>
          ))}
        </ul>
        <button className="nav-burger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <ul className={`nav-mobile${navOpen ? " open" : ""}`}>
        {[["Home", "/", ""], ["EV Charger", "/ev-charger", ""], ["Solar Solution", "/solar", "active"], ["Contact", "/contact-us", ""]].map(([label, href, cls]) => (
          <li key={label}><Link to={href} className={cls} onClick={() => setNavOpen(false)}>{label}</Link></li>
        ))}
      </ul>

      {/* HERO */}
      <section className="s-hero">
        <div className="s-hero-bg">
          <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1600&q=80" alt="Solar panels" />
        </div>
        <div className="s-hero-rays" />
        <div className="s-hero-content">
          <div className="s-hero-breadcrumb">
            <Link to="/">Home</Link><span>›</span><span className="cur">Solar Installation</span>
          </div>
          <div className="s-hero-sun">☀️</div>
          <h1 className="s-hero-title">
            <span className="line-1">SOLAR SYSTEM</span>
            <span className="line-2">INSTALLATION</span>
          </h1>
          <p className="s-hero-tagline">MCS-certified solar PV installation for residential and commercial properties across the UK — designed to deliver maximum performance and long-term returns.</p>
          <div className="s-hero-btns">
            <Link to="/contact-us" className="btn-main btn-green">Get a Free Quote →</Link>
            <a href="#process" className="btn-outline">How It Works</a>
          </div>
        </div>
        <div className="s-hero-bottom">
          {[["25+", "Years Panel Warranty"], ["MCS", "Certified Engineers"], ["0%", "VAT on Residential"], ["100%", "UK Installations"]].map(([val, label]) => (
            <div key={label} className="hb-stat">
              <div className="hb-val">{val}</div>
              <span className="hb-divider" />
              <div className="hb-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      <section className="s-intro">
        <div className="s-intro-split">
          <div className="s-intro-img reveal">
            <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80" alt="Solar install" />
            <div className="img-badge">
              <div className="img-badge-label">Avg. System Size</div>
              <div className="img-badge-val">4.2 kWp</div>
              <div className="img-badge-sub">UK residential average</div>
            </div>
          </div>
          <div className="s-intro-text">
            <div className="sec-label reveal">About Our Service</div>
            <h2 className="sec-title reveal rd1">ENGINEERING-LED SOLAR INSTALLATION</h2>
            <p className="reveal rd2">Watten Power Ltd provides complete solar PV installation services — from system design and DNO application through to commissioning and handover. Maximum performance, safety, and long-term reliability.</p>
            <p className="reveal rd3">Our approach focuses on delivering systems that are not only compliant but also financially and technically optimised for your property and energy usage.</p>
            <div className="reveal rd4">
              <Link to="/contact-us" className="btn-main btn-green">Book a Site Survey →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE INSTALL */}
      <section className="s-install">
        <div className="s-container">
          <div className="sec-label reveal">What We Install</div>
          <h2 className="sec-title reveal rd1">SOLAR FOR EVERY<br />PROPERTY TYPE</h2>
          <div className="install-row reveal rd2">
            <div className="ir-img">
              <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=700&q=80" alt="Residential solar" />
              <div className="ir-img-overlay" />
              <div className="ir-tag">Residential</div>
            </div>
            <div className="ir-body">
              <div className="ir-num">01 / Residential</div>
              <div className="ir-title">RESIDENTIAL SOLAR SYSTEMS</div>
              <div className="ir-desc">Roof-mounted solar PV systems designed and optimised for household energy consumption — with export capability to earn via the Smart Export Guarantee.</div>
              <ul className="ir-features">
                <li>Roof-mounted solar PV systems</li>
                <li>Single-phase inverter setups</li>
                <li>Optimised for household consumption</li>
                <li>Export-ready — earn via Smart Export Guarantee</li>
              </ul>
            </div>
          </div>
          <div className="install-row reverse reveal rd2">
            <div className="ir-img">
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80" alt="Commercial solar" />
              <div className="ir-img-overlay" />
              <div className="ir-tag">Commercial</div>
            </div>
            <div className="ir-body">
              <div className="ir-num">02 / Commercial</div>
              <div className="ir-title">COMMERCIAL SOLAR SYSTEMS</div>
              <div className="ir-desc">Large-scale rooftop installations engineered to significantly reduce business energy costs with scalable three-phase infrastructure for the future.</div>
              <ul className="ir-features">
                <li>Large-scale rooftop installations</li>
                <li>Three-phase systems</li>
                <li>Significant energy cost reduction</li>
                <li>Scalable for future business growth</li>
              </ul>
            </div>
          </div>
          <div className="sec-label reveal" style={{ marginTop: 52 }}>System Components</div>
          <h3 className="reveal rd1" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 28, letterSpacing: "1.5px", marginBottom: 24 }}>EVERYTHING INCLUDED IN EVERY SYSTEM</h3>
          <div className="comp-strip reveal rd2">
            {[["☀️", "High-Efficiency Panels"], ["⚡", "String / Hybrid Inverters"], ["🛡️", "DC & AC Protection"], ["🔩", "Mounting & Cabling"], ["📊", "Monitoring Systems"], ["🔋", "Battery Compatible"]].map(([icon, label]) => (
              <div key={label} className="cs-item"><div className="cs-icon">{icon}</div><div className="cs-label">{label}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="s-process" id="process">
        <div className="s-container">
          <div className="process-header">
            <div>
              <div className="sec-label reveal">Installation Process</div>
              <h2 className="sec-title reveal rd1">HOW IT WORKS</h2>
              <p className="sec-desc reveal rd2">A structured, engineering-led process from roof assessment to final handover — every stage handled professionally.</p>
            </div>
            <div className="process-img reveal rd2">
              <img src="https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=700&q=80" alt="Solar installation" />
              <div className="process-img-badge">
                <div className="img-badge-label">Typical Install</div>
                <div className="img-badge-val">1–2 Days</div>
                <div className="img-badge-sub">Residential system</div>
              </div>
            </div>
          </div>
          <div className="timeline reveal rd3">
            {[
              ["01", "🏠", "SITE ASSESSMENT", "Roof orientation, shading analysis, structural suitability, and electrical capacity review before any work begins."],
              ["02", "📐", "SYSTEM DESIGN", "System sizing based on your consumption, budget, and return on investment targets — tailored to your property."],
              ["03", "📋", "DNO APPLICATION", "G98 / G99 grid approval managed entirely on your behalf where required for the installation."],
              ["04", "🔧", "INSTALLATION", "Panels, inverter, cabling, mounting structures, and all protection systems installed by certified engineers."],
              ["05", "✅", "TESTING & COMMISSIONING", "Full system electrical testing, performance validation, and certification issued on completion."],
              ["06", "🤝", "HANDOVER", "System walkthrough, monitoring app setup, SEG registration guidance, and full documentation provided."],
            ].map(([num, icon, title, desc], i) => (
              <div key={num} className="tl-item">
                <div className="tl-num">{num}</div>
                <div className="tl-dot">{icon}</div>
                {i < 5 && <div className="tl-connector" />}
                <div className="tl-content">
                  <div className="tl-title">{title}</div>
                  <div className="tl-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLAR RANGE */}
      <section className="s-range">
        <div className="s-container">
          <div className="range-header">
            <div className="sec-label reveal">Our Solar Range</div>
            <h2 className="sec-title reveal rd1">THE RIGHT SYSTEM<br />FOR YOUR PROPERTY</h2>
            <p className="sec-desc reveal rd2" style={{ margin: "0 auto", textAlign: "center", maxWidth: 600 }}>Tailored to different energy needs and budgets — we recommend the right system based on your consumption, roof size, and long-term goals.</p>
          </div>
          <div className="range-showcase">
            <div className="rs-main reveal rd1">
              <div>
                <div className="rs-main-badge">⭐ Most Popular</div>
                <div className="rs-main-icon">⚡</div>
                <div className="rs-main-name">PREMIUM SYSTEM</div>
                <div className="rs-main-tag">Maximum efficiency and output</div>
                <ul className="rs-main-feats">
                  {["Higher capacity systems", "Advanced inverter options", "Best long-term savings", "Battery storage ready", "EV charger compatible"].map(f => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <Link to="/contact-us" className="btn-main btn-green" style={{ marginTop: 28, alignSelf: "flex-start" }}>Get a Quote →</Link>
            </div>
            {[
              ["01 / Entry", "🌱", "ENTRY SYSTEM", "Affordable entry into solar", ["Small households", "Lower upfront cost", "Export-ready"]],
              ["02 / Standard", "☀️", "STANDARD SYSTEM", "Balanced performance and value", ["Most UK homes", "Good ROI", "Daily consumption optimised"]],
              ["04 / Commercial", "🏢", "COMMERCIAL SYSTEM", "Designed for business efficiency", ["Large-scale installs", "Three-phase systems", "Scalable for growth"]],
              ["05 / Hybrid", "🔋", "HYBRID / FUTURE-READY", "Built for energy independence", ["Battery-ready systems", "EV charger integration", "Smart energy management"]],
            ].map(([num, icon, name, tag, feats], i) => (
              <div key={num} className={`rs-card reveal rd${i + 2}`}>
                <div className="rs-card-num">{num}</div>
                <div className="rs-card-icon">{icon}</div>
                <div className="rs-card-name">{name}</div>
                <div className="rs-card-tag">{tag}</div>
                <ul className="rs-card-feats">{feats.map(f => <li key={f}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="range-cta-band reveal">
            <div>
              <div className="rcb-title">Not sure what system size suits your property?</div>
              <div className="rcb-sub">We will analyse your usage and recommend the most efficient system.</div>
            </div>
            <Link to="/contact-us" className="btn-main btn-green">Request a Quote →</Link>
          </div>
        </div>
      </section>

      {/* SAVINGS */}
      <section className="s-savings">
        <div className="savings-inner">
          {[["💷", "£816", "Average Annual Savings"], ["🌿", "1.2T", "CO₂ Saved Per Year"], ["📈", "25%", "Return on Investment"], ["⚡", "3,285", "kWh Generated Per Year"]].map(([icon, num, label]) => (
            <div key={label} className="sb-item">
              <div className="sb-icon">{icon}</div>
              <div className="sb-num">{num}</div>
              <div className="sb-label">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* AFTER SALES */}
      <section className="s-aftersales">
        <div className="s-container">
          <div className="aftersales-header">
            <div>
              <div className="sec-label reveal">After Sales</div>
              <h2 className="sec-title reveal rd1">SUPPORT THAT LASTS AS LONG AS YOUR SYSTEM</h2>
              <p className="sec-desc reveal rd2">Every installation is backed by comprehensive warranties, monitoring, and ongoing support — giving you complete peace of mind.</p>
            </div>
            <div className="aftersales-img reveal rd2">
              <img src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=700&q=80" alt="Support" />
            </div>
          </div>
          <div className="support-grid">
            {[
              ["🛡️", "Workmanship Warranty", "10-year workmanship warranty on all installations covering materials and labour."],
              ["☀️", "Panel Warranty", "25-year manufacturer performance warranty on all solar panels supplied."],
              ["⚡", "Inverter Warranty", "5–12 year inverter warranty depending on the manufacturer and model selected."],
              ["📊", "Monitoring", "Remote system monitoring to track generation and detect any performance issues."],
              ["🔧", "Annual Servicing", "Optional annual servicing packages to keep your system performing at its best."],
              ["📞", "24/7 Support", "Dedicated support line for any questions or issues that arise post-installation."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="sg-card reveal">
                <div className="sg-icon-wrap">{icon}</div>
                <div className="sg-title">{title}</div>
                <div className="sg-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="s-compliance">
        <div className="s-container">
          <div className="compliance-top">
            <div>
              <div className="sec-label reveal">Compliance & Standards</div>
              <h2 className="sec-title reveal rd1">FULLY CERTIFIED &<br />COMPLIANT</h2>
            </div>
            <p className="compliance-note reveal">All installations are carried out to the highest industry standards — fully compliant with UK regulations and certified by recognised authorities.</p>
          </div>
          <div className="standards-row">
            {[["🏅", "MCS", "Microgeneration Certification Scheme"], ["⚡", "G98/G99", "Grid Connection Standards"], ["🔌", "BS7671", "Wiring Regulations"], ["📋", "NAPIT", "Registered Installer"], ["☀️", "PAS 2030", "Energy Efficiency Standard"], ["🏢", "OZEV", "EV Charger Approved"]].map(([icon, name, desc]) => (
              <div key={name} className="std-pill reveal">
                <div className="std-pill-icon">{icon}</div>
                <div className="std-pill-name">{name}</div>
                <div className="std-pill-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY WATTEN */}
      <section className="s-why">
        <div className="s-container">
          <div className="sec-label reveal">Why Watten Power</div>
          <h2 className="sec-title reveal rd1">THE WATTEN DIFFERENCE</h2>
          <div className="why-row">
            {[
              ["🏆", "MCS Certified", "Every installation carried out by MCS-certified engineers to the highest professional standard."],
              ["📐", "Bespoke Design", "Each system is custom-designed for your specific property, energy usage, and financial goals."],
              ["🤝", "End-to-End Service", "From initial survey to DNO application, installation, and handover — we manage everything."],
              ["💷", "Transparent Pricing", "Clear, itemised quotes with no hidden costs. We explain every line of the proposal."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="wr-item">
                <div className="wr-icon">{icon}</div>
                <div className="wr-title">{title}</div>
                <div className="wr-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="s-cta">
        <div className="s-container">
          <div className="sec-label reveal">Get Started</div>
          <h2 className="sec-title reveal rd1">READY TO GO SOLAR?</h2>
          <p className="sec-desc reveal rd2">Book a free, no-obligation site survey and receive a tailored quote for your property. Our team will handle everything from start to finish.</p>
          <div className="s-cta-btns reveal rd3">
            <Link to="/contact-us" className="btn-main btn-green">Book a Free Survey →</Link>
            <a href="tel:07404378787" className="btn-outline">📞 07404 378787</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid var(--line)',
        padding: '60px 52px 36px',
        background: 'var(--ink-2)',
      }} className="sol-footer-root">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="sol-footer-top">
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link to="/"><img src={logo} alt="Watten Power" style={{ height: 40, display: 'block' }} /></Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
              Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.
            </p>
          </div>
          <SolFooterCol title="Services" links={[
            { label: 'EV Charger Installation', href: '/ev-charger' },
            { label: 'Solar Panel Installation', href: '/solar' },
          ]} />
          <SolFooterCol title="Company" links={[
            { label: 'About Us', href: '#why' },
            { label: 'Our Approach', href: '#process' },
            { label: 'Compliance', href: '#compliance' },
            { label: 'Contact', href: '/contact-us' },
          ]} />
          <SolFooterCol title="Contact" links={[
            { label: 'info@wattenpower.com', href: 'mailto:info@wattenpower.com' },
            { label: 'United Kingdom', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
          ]} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          paddingTop: 28, borderTop: '1px solid var(--line)',
          fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap', gap: 12,
        }}>
          <span>© 2026 Watten Power Ltd. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1 }}>Registered in England &amp; Wales</span>
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
    </div>
  );
}