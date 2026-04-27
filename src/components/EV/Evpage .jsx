import { useEffect, useState } from "react";
import logo from '../../assets/logo.png';
import { Link } from "react-router-dom";

function EVFooterCol({ title, links }) {
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

export default function EV() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <div className="ev-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');
        :root {
          --blue: #2B5BA8; --blue-2: #1e4282; --blue-hi: #4a7fd4; --blue-pale: rgba(43,91,168,.15);
          --green: #5A8C2E; --green-hi: #79bc3c; --green-dim: rgba(90,140,46,.13);
          --ink: #04101f; --ink-2: #071626; --panel: rgba(10,22,46,.78); --panel-2: rgba(14,28,58,.6);
          --line: rgba(43,91,168,.22); --line-g: rgba(90,140,46,.28);
          --muted: #6278a0; --light: #c2d4ee; --white: #f0f6ff;
          --r: 14px; --r2: 20px;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        .ev-page { background: var(--ink); color: var(--white); font-family: 'DM Sans', sans-serif; font-weight: 300; line-height: 1.65; overflow-x: hidden; min-height: 100vh; position:relative; }
        .ev-page::after{content:'';position:fixed;inset:0;z-index:1;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");background-size:200px;pointer-events:none;opacity:.5;}
        .ev-page ::selection { background: var(--blue); color: #fff; }
        .ev-page img { display: block; max-width: 100%; }
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:var(--ink-2);}
        ::-webkit-scrollbar-thumb{background:var(--blue);border-radius:2px;}
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .reveal.vis { opacity: 1; transform: translateY(0); }
        .rd1{transition-delay:.1s} .rd2{transition-delay:.2s} .rd3{transition-delay:.3s} .rd4{transition-delay:.4s} .rd5{transition-delay:.5s}
        .e-container { max-width: 1160px; margin: 0 auto; padding: 0 52px; }
        .sec-label { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 14px; display: flex; align-items: center; gap: 12px; }
        .sec-label::before { content: ''; display: block; width: 22px; height: 1px; background: var(--green-hi); }
        .sec-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(38px,5vw,60px); line-height: .95; letter-spacing: 2px; margin-bottom: 16px; }
        .sec-desc { font-size: 16px; color: var(--light); font-weight: 300; max-width: 560px; line-height: 1.75; }
        .btn-main { display: inline-flex; align-items: center; gap: 9px; background: linear-gradient(135deg,var(--blue),var(--blue-hi)); color: #fff; font-weight: 500; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 14px 34px; border-radius: 50px; border: none; cursor: pointer; text-decoration: none; transition: all .25s; box-shadow: 0 8px 28px rgba(43,91,168,.4); }
        .btn-main:hover { transform: translateY(-2px); box-shadow: 0 14px 40px rgba(43,91,168,.5); }
        .btn-green { background: linear-gradient(135deg,var(--green),var(--green-hi)); box-shadow: 0 8px 28px rgba(90,140,46,.35); }
        .btn-green:hover { box-shadow: 0 14px 40px rgba(90,140,46,.45); }
        .btn-outline { display: inline-flex; align-items: center; gap: 9px; background: transparent; color: var(--white); font-weight: 400; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; padding: 13px 30px; border-radius: 50px; border: 1px solid rgba(255,255,255,.18); cursor: pointer; text-decoration: none; transition: all .25s; }
        .btn-outline:hover { border-color: var(--green-hi); color: var(--green-hi); }
        section{position:relative;z-index:2;}

        /* NAV */
        .e-nav { position: fixed; top: 0; left: 0; right: 0; z-index: 200; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 52px; background: rgba(4,16,31,.9); backdrop-filter: blur(22px); border-bottom: 1px solid var(--line); transition: background .3s; }
        .e-nav.scrolled { background: rgba(4,16,31,.97); }
        .nav-logo { display: flex; align-items: center; gap: 11px; text-decoration: none; }
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
        .e-hero { position: relative; min-height: 88vh; display: flex; align-items: flex-end; overflow: hidden; }
        .e-hero-bg { position: absolute; inset: 0; z-index: 0; }
        .e-hero-bg img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.28) saturate(.8); }
        .e-hero-bg::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to right,rgba(4,16,31,.92) 42%,rgba(4,16,31,.35) 100%),linear-gradient(to top,rgba(4,16,31,.9) 0%,transparent 50%); }
        .e-hero-bg::before { content: ''; position: absolute; inset: 0; z-index: 2; background: repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(43,91,168,.02) 3px,transparent 4px); animation: scan 8s linear infinite; }
        @keyframes scan { from{background-position:0 0} to{background-position:0 100px} }
        .e-hero-content { position: relative; z-index: 3; padding: 140px 52px 80px; max-width: 700px; }
        .e-hero-breadcrumb { display: flex; align-items: center; gap: 8px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 28px; }
        .e-hero-breadcrumb a { color: var(--muted); text-decoration: none; transition: color .2s; }
        .e-hero-breadcrumb a:hover { color: var(--white); }
        .e-hero-breadcrumb .cur { color: var(--green-hi); }
        .e-hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; border: 1px solid var(--line-g); background: var(--green-dim); border-radius: 50px; padding: 6px 16px 6px 10px; margin-bottom: 24px; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: var(--green-hi); animation: fadeUp .8s ease both; }
        .e-hero-eyebrow .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-hi); animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        .e-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(56px,7.5vw,100px); line-height: .93; letter-spacing: 2px; margin-bottom: 10px; animation: fadeUp .8s .1s ease both; }
        .e-hero-title .ht-b { color: var(--blue-hi); display: block; }
        .e-hero-title .ht-g { color: var(--green-hi); display: block; }
        .e-hero-tagline { font-family: 'Bebas Neue', sans-serif; font-size: clamp(20px,2.5vw,28px); letter-spacing: 3px; color: var(--muted); margin-bottom: 24px; animation: fadeUp .8s .15s ease both; }
        .e-hero-desc { font-size: 17px; color: var(--light); max-width: 520px; line-height: 1.75; margin-bottom: 40px; animation: fadeUp .8s .2s ease both; }
        .e-hero-btns { display: flex; gap: 14px; flex-wrap: wrap; animation: fadeUp .8s .25s ease both; }
        .e-hero-stats { display: flex; gap: 20px; flex-wrap: wrap; margin-top: 44px; animation: fadeUp .8s .35s ease both; }
        .hs-pill { display: flex; align-items: center; gap: 10px; background: rgba(4,16,31,.6); border: 1px solid var(--line); border-radius: 50px; padding: 9px 18px; backdrop-filter: blur(10px); }
        .hs-val { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1px; color: var(--white); }
        .hs-label { font-size: 11px; color: var(--muted); font-family: 'Space Mono', monospace; letter-spacing: .5px; }
        .e-hero-img-accent { position: absolute; right: 0; top: 68px; bottom: 0; width: 44%; z-index: 2; overflow: hidden; }
        .e-hero-img-accent img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.55) saturate(.7); }
        .e-hero-img-accent::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to right,rgba(4,16,31,1) 0%,transparent 40%),linear-gradient(to top,rgba(4,16,31,.8) 0%,transparent 60%); z-index: 1; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        /* INTRO */
        .e-intro { padding: 100px 0; }
        .intro-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .intro-img { border-radius: var(--r2); overflow: hidden; position: relative; }
        .intro-img img { width: 100%; height: 420px; object-fit: cover; filter: brightness(.8) saturate(.85); }
        .intro-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg,rgba(43,91,168,.15),transparent 60%); }
        .intro-img-badge { position: absolute; bottom: 24px; left: 24px; background: rgba(4,16,31,.8); border: 1px solid var(--line-g); border-radius: 12px; padding: 14px 18px; backdrop-filter: blur(12px); z-index: 1; }
        .iib-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .iib-val { font-family: 'Bebas Neue', sans-serif; font-size: 26px; letter-spacing: 1px; color: var(--green-hi); }

        /* INSTALL */
        .e-install { padding: 90px 0; border-top: 1px solid var(--line); }
        .install-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 20px; margin-top: 52px; }
        .install-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; transition: transform .3s, border-color .3s; }
        .install-card:hover { transform: translateY(-4px); border-color: rgba(43,91,168,.5); }
        .ic-img { height: 200px; overflow: hidden; position: relative; }
        .ic-img img { width: 100%; height: 100%; object-fit: cover; filter: brightness(.65) saturate(.75); transition: transform .5s ease, filter .4s; }
        .install-card:hover .ic-img img { transform: scale(1.04); filter: brightness(.8) saturate(.9); }
        .ic-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top,rgba(10,22,46,.95) 0%,transparent 55%); }
        .ic-tag { position: absolute; top: 14px; left: 14px; font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--green-hi); background: rgba(4,16,31,.7); border: 1px solid var(--line-g); border-radius: 50px; padding: 4px 12px; backdrop-filter: blur(8px); }
        .ic-body { padding: 26px 24px; }
        .ic-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1.5px; margin-bottom: 10px; }
        .ic-desc { font-size: 16px; color: var(--muted); line-height: 1.7; margin-bottom: 18px; }
        .ic-features { list-style: none; display: flex; flex-direction: column; gap: 8px; }
        .ic-features li { font-size: 15px; color: var(--light); display: flex; align-items: flex-start; gap: 8px; }
        .ic-features li::before { content: '→'; color: var(--green-hi); font-family: 'Space Mono', monospace; flex-shrink: 0; font-size: 10px; margin-top: 2px; }

        /* PROCESS */
        .e-process { padding: 90px 0; border-top: 1px solid var(--line); background: linear-gradient(180deg,var(--ink) 0%,var(--ink-2) 100%); }
        .process-header { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; margin-bottom: 60px; }
        .process-steps { display: grid; gap: 0; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; }
        .ps { display: grid; grid-template-columns: 80px 1fr auto; align-items: center; gap: 0; border-bottom: 1px solid var(--line); transition: background .25s; cursor: default; }
        .ps:last-child { border-bottom: none; }
        .ps:hover { background: rgba(43,91,168,.06); }
        .ps-num { padding: 28px 24px; font-family: 'Bebas Neue', sans-serif; font-size: 32px; letter-spacing: 1px; color: var(--blue-pale); border-right: 1px solid var(--line); text-align: center; line-height: 1; }
        .ps:hover .ps-num { color: var(--blue-hi); }
        .ps-body { padding: 28px; }
        .ps-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; margin-bottom: 6px; }
        .ps-desc { font-size: 16px; color: var(--muted); line-height: 1.65; max-width: 480px; }
        .ps-icon { padding: 28px; font-size: 22px; color: var(--muted); }
        .process-visual { position: relative; }
        .process-visual img { width: 100%; height: 480px; object-fit: cover; border-radius: var(--r2); filter: brightness(.7) saturate(.8); }
        .process-visual::after { content: ''; position: absolute; inset: 0; border-radius: var(--r2); background: linear-gradient(135deg,rgba(43,91,168,.1),transparent 60%); }
        .pv-stat { position: absolute; background: var(--panel); border: 1px solid var(--line-g); border-radius: 14px; padding: 16px 20px; backdrop-filter: blur(14px); }
        .pv-stat-1 { top: 28px; right: 28px; }
        .pv-stat-2 { bottom: 28px; left: 28px; }
        .pvs-label { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: var(--muted); margin-bottom: 4px; }
        .pvs-val { font-family: 'Bebas Neue', sans-serif; font-size: 24px; letter-spacing: 1px; color: var(--green-hi); }
        .pvs-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }

        /* RANGE */
        .e-range { padding: 90px 0; border-top: 1px solid var(--line); }
        .range-intro { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: end; margin-bottom: 52px; }
        .range-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 14px; }
        .rc { background: var(--panel); border: 2px solid var(--line); border-radius: var(--r2); padding: 28px 22px; transition: all .28s; cursor: default; }
        .rc:hover { border-color: rgba(43,91,168,.55); transform: translateY(-4px); background: rgba(14,28,58,.85); }
        .rc.featured { border-color: var(--green); background: linear-gradient(135deg,rgba(90,140,46,.12),rgba(43,91,168,.08)); }
        .rc-badge { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 18px; color: var(--muted); }
        .rc.featured .rc-badge { color: var(--green-hi); }
        .rc-icon { font-size: 32px; margin-bottom: 14px; }
        .rc-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 1.5px; margin-bottom: 6px; }
        .rc-tagline { font-size: 14px; color: var(--muted); margin-bottom: 18px; line-height: 1.5; }
        .rc-feats { list-style: none; display: flex; flex-direction: column; gap: 7px; }
        .rc-feats li { font-size: 14px; color: var(--light); display: flex; align-items: flex-start; gap: 7px; }
        .rc-feats li::before { content: '·'; color: var(--green-hi); flex-shrink: 0; font-size: 14px; line-height: 1.1; }
        .range-cta-band { margin-top: 40px; background: linear-gradient(135deg,rgba(43,91,168,.15),rgba(90,140,46,.1)); border: 1px solid var(--line); border-radius: var(--r2); padding: 32px 36px; display: flex; align-items: center; justify-content: space-between; gap: 20px; flex-wrap: wrap; }
        .rcb-title { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 1px; margin-bottom: 4px; }
        .rcb-sub { font-size: 16px; color: var(--muted); }
        .rcb-btns { display: flex; gap: 12px; flex-shrink: 0; }

        /* BRANDS */
        .e-brands { padding: 70px 0; border-top: 1px solid var(--line); background: var(--ink-2); }
        .brands-header { text-align: center; margin-bottom: 44px; }
        .brands-header .sec-label { justify-content: center; }
        .brands-header .sec-label::before { display: none; }
        .brands-track { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
        .brand-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 22px 28px; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: all .28s; min-width: 120px; }
        .brand-card:hover { border-color: rgba(43,91,168,.5); transform: translateY(-3px); }
        .brand-logo { color: var(--light); height: 40px; display: flex; align-items: center; }
        .brand-logo svg { max-height: 40px; }
        .brand-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 2px; color: var(--light); }
        .brand-tag { font-family: 'Space Mono', monospace; font-size: 9px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--muted); }
        .brands-brochure { margin-top: 44px; text-align: center; }
        .brands-brochure p { font-size: 13px; color: var(--muted); margin-bottom: 18px; font-family: 'Space Mono', monospace; letter-spacing: 1px; text-transform: uppercase; }
        .brochure-btn { display: inline-flex; align-items: center; gap: 10px; background: var(--panel); border: 1px solid var(--line); border-radius: 50px; padding: 14px 28px; color: var(--light); text-decoration: none; font-size: 14px; font-weight: 500; transition: all .25s; }
        .brochure-btn:hover { border-color: rgba(43,91,168,.5); color: var(--white); }
        .brochure-btn-icon { color: var(--green-hi); display: flex; }
        .brochure-btn-arrow { color: var(--green-hi); font-family: 'Space Mono', monospace; }

        /* AFTER SALES */
        .e-aftersales { padding: 100px 0; border-top: 1px solid var(--line); }
        .aftersales-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .as-list { display: flex; flex-direction: column; gap: 0; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; }
        .asl-item { display: grid; grid-template-columns: 56px 1fr; gap: 0; border-bottom: 1px solid var(--line); padding: 22px 24px; align-items: flex-start; transition: background .25s; }
        .asl-item:last-child { border-bottom: none; }
        .asl-item:hover { background: rgba(43,91,168,.06); }
        .asl-num { font-family: 'Bebas Neue', sans-serif; font-size: 28px; letter-spacing: 1px; color: var(--blue-pale); line-height: 1; padding-top: 2px; }
        .asl-item:hover .asl-num { color: var(--blue-hi); }
        .asl-title { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; margin-bottom: 5px; }
        .asl-desc { font-size: 15px; color: var(--muted); line-height: 1.65; }
        .aftersales-visual { display: flex; flex-direction: column; gap: 20px; }
        .av-img { border-radius: var(--r2); overflow: hidden; }
        .av-img img { width: 100%; height: 260px; object-fit: cover; filter: brightness(.7) saturate(.8); }
        .av-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .av-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r); padding: 20px 18px; transition: border-color .25s; }
        .av-card:hover { border-color: rgba(43,91,168,.4); }
        .av-card-icon { font-size: 22px; margin-bottom: 10px; }
        .av-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; margin-bottom: 6px; }
        .av-card-desc { font-size: 14px; color: var(--muted); line-height: 1.6; }

        /* COMPLIANCE */
        .e-compliance { padding: 80px 0; border-top: 1px solid var(--line); background: var(--ink-2); }
        .compliance-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
        .compliance-note { font-size: 13px; color: var(--muted); max-width: 340px; line-height: 1.75; padding-left: 16px; border-left: 2px solid var(--line-g); margin-top: 20px; }
        .standards-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; align-self: start; }
        .std-card { background: var(--panel); border: 1px solid var(--line); border-radius: var(--r2); padding: 24px 18px; text-align: center; transition: all .28s; }
        .std-card:hover { border-color: rgba(43,91,168,.45); transform: translateY(-3px); }
        .std-icon { font-size: 28px; margin-bottom: 12px; }
        .std-name { font-family: 'Bebas Neue', sans-serif; font-size: 16px; letter-spacing: 1px; color: var(--blue-hi); margin-bottom: 5px; }
        .std-desc { font-size: 11px; color: var(--muted); line-height: 1.5; }

        /* WHY */
        .e-why { padding: 100px 0; border-top: 1px solid var(--line); }
        .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid var(--line); border-radius: var(--r2); overflow: hidden; margin-top: 52px; }
        .why-card { display: grid; grid-template-columns: 56px 1fr; gap: 20px; align-items: flex-start; padding: 36px 32px; border-bottom: 1px solid var(--line); border-right: 1px solid var(--line); transition: background .28s; position: relative; }
        .why-card:nth-child(2n) { border-right: none; }
        .why-card:nth-child(3), .why-card:nth-child(4) { border-bottom: none; }
        .why-card:hover { background: rgba(43,91,168,.06); }
        .why-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,var(--blue-hi),transparent); opacity: 0; transition: opacity .3s; }
        .why-card:hover::after { opacity: 1; }
        .wc-icon { font-size: 26px; padding-top: 2px; }
        .wc-title { font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 1px; margin-bottom: 10px; }
        .wc-desc { font-size: 15px; color: var(--muted); line-height: 1.7; }

        /* FUTURE */
        .e-future { padding: 100px 0; border-top: 1px solid var(--line); background: linear-gradient(180deg,var(--ink-2) 0%,var(--ink) 100%); }
        .future-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .future-img { border-radius: var(--r2); overflow: hidden; }
        .future-img img { width: 100%; height: 420px; object-fit: cover; filter: brightness(.7) saturate(.8); }
        .future-ecosystem { display: flex; flex-direction: column; gap: 18px; }
        .fe-item { display: flex; align-items: flex-start; gap: 16px; }
        .fe-icon { font-size: 24px; flex-shrink: 0; }
        .fe-text { font-size: 16px; color: var(--light); line-height: 1.65; }
        .fe-text strong { color: var(--white); font-weight: 500; }

        /* CTA */
        .e-cta { padding: 100px 0; border-top: 1px solid var(--line); background: linear-gradient(135deg,rgba(43,91,168,.08),rgba(90,140,46,.06)); text-align: center; }
        .cta-inner { max-width: 680px; margin: 0 auto; }
        .cta-eyebrow { font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: var(--green-hi); margin-bottom: 20px; }
        .cta-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(42px,6vw,72px); line-height: .93; letter-spacing: 2px; margin-bottom: 20px; }
        .cta-title .ac { color: var(--green-hi); }
        .cta-sub { font-size: 17px; color: var(--light); line-height: 1.75; margin-bottom: 40px; }
        .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }

        @media (max-width: 1024px) {
          .range-grid { grid-template-columns: repeat(3,1fr); }
        }
        @media (max-width: 900px) {
          .e-container { padding: 0 24px; }
          .e-nav { padding: 0 24px; }
          .e-hero-content { padding: 120px 24px 60px; }
          .intro-grid, .process-header, .range-intro, .aftersales-grid, .compliance-inner, .future-inner { grid-template-columns: 1fr; }
          .install-grid { grid-template-columns: 1fr; }
          .range-grid { grid-template-columns: 1fr 1fr; }
          .why-grid { grid-template-columns: 1fr; }
          .why-card { border-right: none; }
          .why-card:nth-child(3) { border-bottom: 1px solid var(--line); }
          .standards-grid { grid-template-columns: repeat(2,1fr); }
          .e-hero-img-accent { display: none; }
          .nav-links { display: none; }
          .nav-burger { display: flex; }
        }
        @media (max-width: 600px) {
          .range-grid { grid-template-columns: 1fr; }
          .av-cards { grid-template-columns: 1fr; }
          .standards-grid { grid-template-columns: 1fr 1fr; }
          .e-hero-stats { gap: 10px; }
          .range-cta-band { flex-direction: column; }
          .rcb-btns { flex-wrap: wrap; }
        }
      `}</style>

      {/* NAV */}
      <nav className={`e-nav${scrolled ? " scrolled" : ""}`}>
        <Link to="/" className="nav-logo">
          <img src={logo} alt="Watten Power" style={{ height: 40 }} />
        </Link>
        <ul className="nav-links">
          {[["Home", "/", ""], ["EV Charger", "/ev-charger", "active"], ["Solar Solution", "/solar", ""]].map(([label, href, cls]) => (
            <li key={label}><Link to={href} className={cls}>{label}</Link></li>
          ))}
        </ul>
        <button className="nav-burger" onClick={() => setNavOpen(!navOpen)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </nav>
      <ul className={`nav-mobile${navOpen ? " open" : ""}`}>
        {[["Home", "/", ""], ["EV Charger", "/ev-charger", "active"], ["Solar Solution", "/solar", ""], ["Contact", "/contact-us", ""]].map(([label, href, cls]) => (
          <li key={label}><Link to={href} className={cls} onClick={() => setNavOpen(false)}>{label}</Link></li>
        ))}
      </ul>

      {/* HERO */}
      <section className="e-hero">
        <div className="e-hero-bg">
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80" alt="EV charger" />
        </div>
        <div className="e-hero-img-accent">
          <img src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=900&q=80" alt="EV charging" />
        </div>
        <div className="e-hero-content">
          <div className="e-hero-breadcrumb">
            <Link to="/">Home</Link><span style={{ color: "var(--line)" }}>›</span><span className="cur">EV Charger Installation</span>
          </div>
          <div className="e-hero-eyebrow"><span className="dot" />Residential & Commercial</div>
          <h1 className="e-hero-title">
            <span className="ht-b">EV CHARGER</span>
            <span className="ht-g">INSTALLATION</span>
          </h1>
          <p className="e-hero-tagline">Reliable. Compliant. Future-Ready.</p>
          <p className="e-hero-desc">Power your transition to electric mobility with professionally installed EV charging solutions by Watten Power Ltd.</p>
          <div className="e-hero-btns">
            <Link to="/contact-us" className="btn-main btn-green">Get a Free Quote →</Link>
            <a href="#process" className="btn-outline">How It Works</a>
          </div>
          <div className="e-hero-stats">
            {[["7–22 kW", "Charge Rate"], ["~50 mi", "Per Hour (7kW)"], ["Smart", "Charge Ready"], ["BS7671", "Certified Install"]].map(([val, label]) => (
              <div key={label} className="hs-pill">
                <div><div className="hs-val">{val}</div><div className="hs-label">{label}</div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="e-intro">
        <div className="e-container">
          <div className="intro-grid">
            <div>
              <div className="sec-label reveal">EV Charger Installation Services</div>
              <h2 className="sec-title reveal rd1">EV CHARGER<br />INSTALLATION SERVICES</h2>
              <p className="sec-desc reveal rd2" style={{ marginBottom: 24 }}>We provide end-to-end EV charger installation services for residential, commercial, and fleet environments. Every installation is engineered for safety, efficiency, and long-term scalability.</p>
              <p className="sec-desc reveal rd3">Whether you are installing your first charger at home or deploying multiple units across a commercial site, our team ensures a seamless and compliant setup.</p>
            </div>
            <div className="intro-img reveal rd2">
              <img src="https://images.unsplash.com/photo-1647427060118-4911c9821b82?w=800&q=80" alt="EV charger at home" />
              <div className="intro-img-badge">
                <div className="iib-label">Typical Install Time</div>
                <div className="iib-val">Half Day</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE INSTALL */}
      <section className="e-install">
        <div className="e-container">
          <div className="sec-label reveal">What We Install</div>
          <h2 className="sec-title reveal rd1">THREE ENVIRONMENTS.<br />ONE SPECIALIST.</h2>
          <div className="install-grid">
            {[
              ["Residential", "RESIDENTIAL INSTALLATIONS", "Smart home EV charger installations designed for standard daily residential use with safe, reliable performance.", ["Smart home EV chargers (7.4 kW single-phase)", "App-controlled charging systems", "Integration with off-peak tariffs (e.g. time-of-use charging)", "Time-of-use optimisation"], "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=700&q=80"],
              ["Commercial", "COMMERCIAL & WORKPLACE CHARGING", "Commercial and workplace charging systems for offices, car parks, fleets, and multi-user environments.", ["7 kW to 22 kW charging systems", "Multi-point charger installations", "Load balancing for multiple vehicles", "Fleet charging infrastructure"], "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=700&q=80"],
              ["Smart Systems", "SMART CHARGING", "Smart charging capabilities with remote monitoring, usage tracking, and future solar or battery integration.", ["OCPP-enabled systems", "Remote monitoring and control", "Energy usage tracking", "Solar and battery integration ready"], "https://images.unsplash.com/photo-1609429019995-8c40f49535a5?w=700&q=80"],
            ].map(([tag, title, desc, feats, img], i) => (
              <div key={title} className={`install-card reveal rd${i + 1}`}>
                <div className="ic-img">
                  <img src={img} alt={title} />
                  <div className="ic-img-overlay" />
                  <div className="ic-tag">{tag}</div>
                </div>
                <div className="ic-body">
                  <div className="ic-title">{title}</div>
                  <div className="ic-desc">{desc}</div>
                  <ul className="ic-features">{feats.map(f => <li key={f}>{f}</li>)}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="e-process" id="process">
        <div className="e-container">
          <div className="process-header">
            <div>
              <div className="sec-label reveal">Installation Process</div>
              <h2 className="sec-title reveal rd1">HOW IT<br />WORKS</h2>
              <p className="sec-desc reveal rd2">We follow a structured engineering-led process to ensure safety, compliance, and performance.</p>
            </div>
            <div className="process-visual reveal rd2">
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" alt="EV charger installation engineer" />
              <div className="pv-stat pv-stat-1">
                <div className="pvs-label">Certification Issued</div>
                <div className="pvs-val">Same Day</div>
              </div>
              <div className="pv-stat pv-stat-2">
                <div className="pvs-label">Average Install</div>
                <div className="pvs-val">4–6 hrs</div>
                <div className="pvs-sub">Residential single unit</div>
              </div>
            </div>
          </div>
          <div className="process-steps reveal">
            {[
              ["01", "SITE SURVEY", "We assess your electrical capacity, parking layout, and installation feasibility.", "🔍"],
              ["02", "SYSTEM DESIGN", "We recommend the right charger type, power rating, and protection systems.", "📐"],
              ["03", "DNO NOTIFICATION", "We handle Distribution Network Operator notifications for higher load installations.", "📋"],
              ["04", "INSTALLATION", "Our certified engineers complete installation including cabling, mounting, and connections.", "🔧"],
              ["05", "TESTING & CERTIFICATION", "Full electrical testing is carried out and certification is issued.", "✅"],
              ["06", "HANDOVER", "We guide you through charger usage, app setup, and safety procedures.", "🤝"],
            ].map(([num, title, desc, icon], i, arr) => (
              <div key={num} className="ps" style={i === arr.length - 1 ? { borderBottom: "none" } : {}}>
                <div className="ps-num">{num}</div>
                <div className="ps-body">
                  <div className="ps-title">{title}</div>
                  <div className="ps-desc">{desc}</div>
                </div>
                <div className="ps-icon">{icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHARGER RANGE */}
      <section className="e-range">
        <div className="e-container">
          <div className="range-intro">
            <div>
              <div className="sec-label reveal">Our Charger Range</div>
              <h2 className="sec-title reveal rd1">OUR EV<br />CHARGER RANGE</h2>
            </div>
            <div className="reveal rd2">
              <p className="sec-desc">We offer a carefully selected range of EV chargers designed to suit different properties, usage patterns, and budgets. Rather than promoting a single product, we take a consultative approach. We assess your requirements and recommend the most suitable charger based on your electrical capacity, vehicle usage, and future energy plans.</p>
            </div>
          </div>
          <div className="range-grid">
            {[
              ["01 / ENTRY", "🔌", "ENTRY RANGE", "Simple, reliable and cost-effective", ["Ideal for daily residential use", "7.4 kW single-phase", "Basic smart functionality", "Compact and practical"], false],
              ["02 / SMART", "📱", "SMART RANGE", "Enhanced control and efficiency", ["App-enabled control", "Off-peak scheduling", "Energy monitoring", "Suitable for most homes and small businesses"], false],
              ["03 / PREMIUM ★", "⚡", "PREMIUM RANGE", "Advanced performance and design", ["Advanced smart features", "Faster charging capability (subject to supply)", "Sleek modern design", "Enhanced user interface"], true],
              ["04 / COMMERCIAL", "🏢", "COMMERCIAL", "Built for scale and reliability", ["Multiple charger installations", "Load balancing", "User access control", "Usage reporting"], false],
              ["05 / FUTURE", "🔋", "FUTURE-READY", "Designed for integrated energy", ["Solar-compatible", "Battery-ready integration", "Smart energy ecosystem", "Ideal for long-term energy optimisation"], false],
            ].map(([badge, icon, name, tagline, feats, featured], i) => (
              <div key={name} className={`rc reveal rd${i + 1}${featured ? " featured" : ""}`}>
                <div className="rc-badge">{badge}</div>
                <div className="rc-icon">{icon}</div>
                <div className="rc-name">{name}</div>
                <div className="rc-tagline">{tagline}</div>
                <ul className="rc-feats">{feats.map(f => <li key={f}>{f}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="range-cta-band reveal">
            <div>
              <div className="rcb-title">Not sure which option is right for you?</div>
              <div className="rcb-sub">Our team will assess your site and recommend the most suitable solution.</div>
            </div>
            <div className="rcb-btns">
              <Link to="/contact-us" className="btn-main btn-green">Request a Quote →</Link>
              <Link to="/contact-us" className="btn-outline">Book a Survey</Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="e-brands">
        <div className="e-container">
          <div className="brands-header">
            <div className="sec-label reveal">Charger Brands</div>
            <h2 className="sec-title reveal rd1" style={{ textAlign: "center" }}>BRANDS WE INSTALL</h2>
            <p className="reveal rd2" style={{ fontSize: 14, color: "var(--muted)", marginTop: 10 }}>We work with a carefully selected range of trusted manufacturers — recommending the right brand for your specific needs, property, and budget.</p>
          </div>
          <div className="brands-track">
            <div className="brand-card reveal rd1">
              <div className="brand-logo">
                <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="40">
                  <text x="0" y="32" fontFamily="Arial Black, sans-serif" fontWeight="900" fontSize="34" letterSpacing="-1">zappi</text>
                </svg>
              </div>
              <div className="brand-name">ZAPPI</div>
              <div className="brand-tag">Eco Smart</div>
            </div>
            <div className="brand-card reveal rd2">
              <div className="brand-logo">
                <svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="40">
                  <polygon points="18,2 6,22 14,22 2,38 22,16 13,16" />
                  <text x="28" y="30" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" letterSpacing="0">hypervolt</text>
                </svg>
              </div>
              <div className="brand-name">HYPERVOLT</div>
              <div className="brand-tag">Home &amp; Pro</div>
            </div>
            <div className="brand-card reveal rd3">
              <div className="brand-logo">
                <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="40">
                  <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="4" />
                  <text x="40" y="28" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="26" letterSpacing="1">ohme</text>
                </svg>
              </div>
              <div className="brand-name">OHME</div>
              <div className="brand-tag">Smart Tariff</div>
            </div>
            <div className="brand-card reveal rd4">
              <div className="brand-logo">
                <svg viewBox="0 0 100 48" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="40">
                  <path d="M50 6 C30 6 14 10 4 16 L8 20 C12 14 28 10 50 10 C72 10 88 14 92 20 L96 16 C86 10 70 6 50 6Z" />
                  <path d="M50 10 L50 48 L46 48 L46 14 C38 15 32 18 28 22 L24 18 C32 12 40 10 50 10Z M50 10 L50 48 L54 48 L54 14 C62 15 68 18 72 22 L76 18 C68 12 60 10 50 10Z" opacity=".7" />
                </svg>
              </div>
              <div className="brand-name">TESLA</div>
              <div className="brand-tag">Wall Connector</div>
            </div>
            <div className="brand-card reveal rd5">
              <div className="brand-logo">
                <svg viewBox="0 0 130 40" xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="40">
                  <rect x="0" y="8" width="24" height="24" rx="5" fill="none" stroke="currentColor" strokeWidth="3" />
                  <rect x="5" y="13" width="14" height="3" rx="1.5" />
                  <rect x="5" y="19" width="10" height="3" rx="1.5" />
                  <rect x="5" y="25" width="14" height="3" rx="1.5" />
                  <text x="32" y="29" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="22" letterSpacing="0">easee one</text>
                </svg>
              </div>
              <div className="brand-name">EASEE ONE</div>
              <div className="brand-tag">Compact</div>
            </div>
          </div>
          <div className="brands-brochure reveal">
            <p>Want to know more about the chargers we install?</p>
            <a href="#" className="brochure-btn" onClick={(e) => { e.preventDefault(); alert('Brochure coming soon — contact us at info@wattenpower.com for product details.'); }}>
              <span className="brochure-btn-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="12" y1="18" x2="12" y2="12" /><line x1="9" y1="15" x2="15" y2="15" /></svg>
              </span>
              View EV Charger Brochure
              <span className="brochure-btn-arrow">↓</span>
            </a>
          </div>
        </div>
      </section>

      {/* AFTER SALES */}
      <section className="e-aftersales">
        <div className="e-container">
          <div className="aftersales-grid">
            <div>
              <div className="sec-label reveal">After Sales Support</div>
              <h2 className="sec-title reveal rd1">BEYOND<br />INSTALLATION</h2>
              <p className="sec-desc reveal rd2" style={{ marginBottom: 36 }}>Installation is only the first step. Reliable performance depends on proper support and maintenance. At Watten Power Ltd, we provide structured after-sales support to ensure your system continues to operate safely and efficiently.</p>
              <div className="as-list reveal rd3">
                {[
                  ["01", "INSTALLATION WARRANTY SUPPORT", "We support manufacturer warranties and assist in resolving any early-stage issues."],
                  ["02", "TECHNICAL SUPPORT", "Remote and on-call assistance for charger faults, connectivity issues, app configuration, and charging interruptions."],
                  ["03", "MAINTENANCE & HEALTH CHECKS", "Periodic inspection recommended for commercial setups, including electrical safety checks, cable inspection, and connection inspection."],
                  ["04", "TROUBLESHOOTING & REPAIRS", "Fast response support for system faults and performance issues to minimise downtime."],
                  ["05", "UPGRADES & EXPANSION", "As your needs grow, we support additional charger installations, load balancing upgrades, and integration with solar and battery systems."],
                ].map(([num, title, desc]) => (
                  <div key={num} className="asl-item">
                    <div className="asl-num">{num}</div>
                    <div>
                      <div className="asl-title">{title}</div>
                      <div className="asl-desc">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="aftersales-visual">
              <div className="av-img reveal rd1">
                <img src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=700&q=80" alt="EV support technician" />
              </div>
              <div className="av-cards reveal rd2">
                {[
                  ["📞", "Remote Support", "On-call technical assistance without needing a site visit for most issues."],
                  ["🔧", "On-Site Repairs", "Fast dispatch for faults requiring physical inspection or component replacement."],
                  ["📊", "Usage Reports", "Energy and session data for commercial clients to track costs and usage."],
                  ["🔒", "Safety Checks", "Periodic electrical safety inspections aligned with BS 7671 recommendations."],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="av-card">
                    <div className="av-card-icon">{icon}</div>
                    <div className="av-card-title">{title}</div>
                    <div className="av-card-desc">{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPLIANCE */}
      <section className="e-compliance" id="compliance">
        <div className="e-container">
          <div className="compliance-inner">
            <div>
              <div className="sec-label reveal">Standards</div>
              <h2 className="sec-title reveal rd1">SAFE.<br />CERTIFIED.<br />COMPLIANT.</h2>
              <p className="sec-desc reveal rd2" style={{ marginBottom: 24 }}>All installations are carried out in accordance with UK regulations and industry standards:</p>
              <p className="compliance-note reveal rd3">Every installation is completed with safety, compliance, and long-term performance in mind.</p>
            </div>
            <div className="standards-grid">
              {[
                ["⚡", "BS 7671", "IET Wiring Regulations"],
                ["🔌", "BS EN 61851", "EV Charging Systems"],
                ["📱", "Smart CP Regs", "UK Smart Charge Point Regulations"],
                ["🌐", "G98 / G99", "Grid Connection Compliance"],
                ["🔋", "OCPP 1.6J", "Compatibility where applicable"],
              ].map(([icon, name, desc]) => (
                <div key={name} className="std-card reveal">
                  <div className="std-icon">{icon}</div>
                  <div className="std-name">{name}</div>
                  <div className="std-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="e-why">
        <div className="e-container">
          <div className="sec-label reveal">Why Watten Power</div>
          <h2 className="sec-title reveal rd1">WHY CHOOSE<br />WATTEN POWER?</h2>
          <div className="why-grid">
            {[
              ["🔍", "ENGINEERING-LED INSTALLATIONS", "We design systems based on actual load requirements, not generic templates."],
              ["✅", "FULLY COMPLIANT & CERTIFIED", "Every installation meets UK electrical and safety regulations."],
              ["📈", "SCALABLE INFRASTRUCTURE", "Our installations are designed to support future expansion including solar and battery integration."],
              ["💬", "TRANSPARENT APPROACH", "Clear scope, clear pricing, no unnecessary upselling."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="why-card">
                <div className="wc-icon">{icon}</div>
                <div>
                  <div className="wc-title">{title}</div>
                  <div className="wc-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUTURE READY */}
      <section className="e-future">
        <div className="e-container">
          <div className="future-inner">
            <div className="future-img reveal">
              <img src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&q=80" alt="Solar and EV integration" />
            </div>
            <div>
              <div className="sec-label reveal">Future-Ready</div>
              <h2 className="sec-title reveal rd1">FUTURE-READY<br />ENERGY INTEGRATION</h2>
              <p className="sec-desc reveal rd2" style={{ marginBottom: 28 }}>Your EV charger is not just a charging point. It is part of a wider energy ecosystem. Our systems are designed to integrate with solar PV systems, battery storage solutions, and smart energy management platforms.</p>
              <div className="future-ecosystem reveal rd3">
                {[
                  ["☀️", "Solar PV systems", "integrate EV charging with renewable energy generation"],
                  ["🔋", "Battery storage", "support battery storage solutions as part of your wider energy system"],
                  ["📊", "Smart energy platforms", "connect with smart energy management platforms for long-term flexibility"],
                ].map(([icon, bold, text]) => (
                  <div key={bold} className="fe-item">
                    <div className="fe-icon">{icon}</div>
                    <div className="fe-text"><strong>{bold}</strong> — {text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="e-cta" id="contact">
        <div className="e-container">
          <div className="cta-inner reveal">
            <div className="cta-eyebrow">Get Started</div>
            <h2 className="cta-title">PLANNING TO INSTALL<br /><span className="ac">AN EV CHARGER?</span></h2>
            <p className="cta-sub">Speak with our team for a technical assessment and tailored recommendation.</p>
            <div className="cta-btns">
              <Link to="/contact-us" className="btn-main btn-green">Request a Quote →</Link>
              <Link to="/contact-us" className="btn-outline">Book a Site Survey</Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        position: 'relative', zIndex: 2,
        borderTop: '1px solid var(--line)',
        padding: '60px 52px 36px',
        background: 'var(--ink-2)',
      }} className="ev-footer-root">
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="ev-footer-top">
          <div>
            <div style={{ marginBottom: 16 }}>
              <Link to="/"><img src={logo} alt="Watten Power" style={{ height: 40, display: 'block' }} /></Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
              Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.
            </p>
          </div>
          <EVFooterCol title="Services" links={[
            { label: 'EV Charger Installation', href: '/ev-charger' },
            { label: 'Solar System Installation', href: '/solar' },
            { label: 'Battery Storage', href: '/battery-storage' },
            { label: 'Solar Estimator', href: '/solar-estimator' },
          ]} />

          <EVFooterCol title="Contact Us" links={[
            { label: '0208 001 1100', href: 'tel:02080011100' },
            { label: 'info@wattenpower.com', href: 'mailto:info@wattenpower.com' },
            { label: 'Office 2, 60 Gold Street, Northampton, NN1 1RS', href: '#' },
          ]} />

          <EVFooterCol title="Legal" links={[
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
          paddingTop: 28, borderTop: '1px solid var(--line)',
          fontSize: 12, color: 'var(--muted)', flexWrap: 'wrap', gap: 12,
        }}>
          <span>© 2026 Watten Power Ltd. All rights reserved.</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, letterSpacing: 1 }}>Registered in England &amp; Wales</span>
        </div>
        <style>{`
          @media (max-width: 960px) {
            .ev-footer-root { padding: 48px 32px 28px !important; }
            .ev-footer-top { grid-template-columns: 1fr 1fr !important; gap: 36px !important; }
          }
          @media (max-width: 600px) {
            .ev-footer-root { padding: 44px 20px 24px !important; }
            .ev-footer-top { grid-template-columns: 1fr !important; gap: 32px !important; }
          }
        `}</style>
      </footer>
    </div>
  );
}