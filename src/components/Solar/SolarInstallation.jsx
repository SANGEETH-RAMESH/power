import { useEffect, useRef, useState } from "react";

/* ─── Google Fonts ─────────────────────────────────────────── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&family=Space+Mono:wght@400;700&display=swap');

    :root {
      --blue:      #2B5BA8;
      --blue-2:    #1e4282;
      --blue-3:    #0d2554;
      --blue-hi:   #4a7fd4;
      --green:     #5A8C2E;
      --green-hi:  #79bc3c;
      --green-dim: rgba(90,140,46,.14);
      --ink:       #04101f;
      --ink-2:     #081828;
      --panel:     rgba(11,24,48,.75);
      --line:      rgba(43,91,168,.22);
      --line-g:    rgba(90,140,46,.28);
      --muted:     #6a80a8;
      --light:     #c8d8f0;
      --white:     #f2f7ff;
      --r:         14px;
    }

    *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
    html { scroll-behavior:smooth; }

    body {
      background: var(--ink);
      color: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-weight: 300;
      line-height: 1.6;
      overflow-x: hidden;
    }

    ::selection { background:var(--blue); color:#fff; }
    ::-webkit-scrollbar { width:4px; }
    ::-webkit-scrollbar-track { background:var(--ink-2); }
    ::-webkit-scrollbar-thumb { background:var(--blue); border-radius:2px; }

    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
    @keyframes fadeSlideUp {
      from { opacity:0; transform:translateY(24px); }
      to   { opacity:1; transform:translateY(0); }
    }
    @keyframes floatCard { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes pulseRing {
      0%   { transform:scale(1);   opacity:.7; }
      100% { transform:scale(1.8); opacity:0;  }
    }
    @keyframes rotateSun {
      from { transform:rotate(0deg); }
      to   { transform:rotate(360deg); }
    }

    .reveal { opacity:0; transform:translateY(28px); transition:opacity .65s ease, transform .65s ease; }
    .reveal.visible { opacity:1; transform:translateY(0); }

    /* NAV */
    .sp-nav {
      position:fixed; top:0; left:0; right:0; z-index:100;
      display:flex; align-items:center; justify-content:space-between;
      padding:0 52px; height:70px;
      background:rgba(4,16,31,.88);
      backdrop-filter:blur(20px);
      border-bottom:1px solid var(--line);
      transition:background .3s;
    }
    .sp-nav-logo {
      display:flex; align-items:center; gap:12px;
      text-decoration:none; color:inherit;
    }
    .sp-nav-brand {
      font-family:'Bebas Neue',sans-serif;
      font-size:22px; letter-spacing:2px; line-height:1;
    }
    .sp-nav-links {
      display:flex; align-items:center; gap:36px; list-style:none;
    }
    .sp-nav-links a {
      color:var(--muted); text-decoration:none;
      font-size:13px; font-weight:400; letter-spacing:.5px;
      transition:color .2s;
    }
    .sp-nav-links a:hover { color:var(--white); }
    .sp-nav-cta {
      background:var(--green); color:#fff !important;
      padding:9px 22px !important; border-radius:50px;
      font-weight:500 !important;
      transition:background .2s, transform .2s !important;
    }
    .sp-nav-cta:hover { background:var(--green-hi) !important; transform:translateY(-1px); }

    /* HERO */
    .sp-hero {
      position:relative; z-index:2;
      min-height:100vh;
      display:grid; grid-template-columns:1fr 1fr;
      align-items:center; padding:0 52px; gap:60px;
      overflow:hidden;
    }
    .sp-hero::before {
      content:''; position:absolute;
      width:700px; height:700px;
      background:radial-gradient(circle, rgba(90,140,46,.14) 0%, transparent 70%);
      top:50%; left:-100px; transform:translateY(-50%);
      pointer-events:none;
    }
    .sp-hero-content { position:relative; z-index:2; padding-top:70px; }
    .sp-eyebrow {
      display:inline-flex; align-items:center; gap:10px;
      border:1px solid var(--line-g); background:var(--green-dim);
      border-radius:50px; padding:6px 16px 6px 10px;
      margin-bottom:32px;
      font-family:'Space Mono',monospace;
      font-size:10px; letter-spacing:2px; text-transform:uppercase;
      color:var(--green-hi);
      animation:fadeSlideUp .8s ease both;
    }
    .sp-eyebrow-dot {
      width:6px; height:6px; border-radius:50%;
      background:var(--green-hi); animation:blink 2s infinite;
    }
    .sp-headline {
      font-family:'Bebas Neue',sans-serif;
      font-size:clamp(52px,7vw,88px);
      line-height:.95; letter-spacing:2px;
      margin-bottom:10px;
      animation:fadeSlideUp .8s .1s ease both;
    }
    .sp-headline .l-green { color:var(--green-hi); display:block; }
    .sp-headline .l-blue  { color:var(--blue-hi);  display:block; }
    .sp-headline .l-white { color:var(--white);    display:block; }
    .sp-sub {
      font-size:16px; color:var(--light); font-weight:300;
      max-width:460px; line-height:1.75; margin:24px 0 44px;
      animation:fadeSlideUp .8s .2s ease both;
    }
    .sp-hero-btns {
      display:flex; align-items:center; gap:16px; flex-wrap:wrap;
      animation:fadeSlideUp .8s .3s ease both;
    }
    .btn-main {
      display:inline-flex; align-items:center; gap:10px;
      background:linear-gradient(135deg,var(--blue),var(--blue-hi));
      color:#fff; font-weight:500; font-size:14px;
      text-transform:uppercase; letter-spacing:1px;
      padding:15px 36px; border-radius:50px; border:none;
      cursor:pointer; text-decoration:none; transition:all .25s;
      box-shadow:0 8px 28px rgba(43,91,168,.4);
    }
    .btn-main:hover { transform:translateY(-2px); box-shadow:0 14px 40px rgba(43,91,168,.5); }
    .btn-green {
      background:linear-gradient(135deg,var(--green),var(--green-hi));
      box-shadow:0 8px 28px rgba(90,140,46,.35);
    }
    .btn-green:hover { box-shadow:0 14px 40px rgba(90,140,46,.45); }
    .btn-sec {
      display:inline-flex; align-items:center; gap:8px;
      color:var(--light); font-size:14px; font-weight:400;
      text-decoration:none; letter-spacing:.5px;
      border-bottom:1px solid rgba(200,216,240,.3); padding-bottom:2px;
      transition:color .2s,border-color .2s; background:none; border-left:none; border-right:none; border-top:none; cursor:pointer;
    }
    .btn-sec:hover { color:var(--white); border-color:var(--green-hi); }

    /* Hero Visual */
    .sp-hero-visual {
      position:relative; z-index:2; padding-top:70px;
      animation:fadeSlideUp .8s .15s ease both;
    }
    .sp-solar-card {
      background:var(--panel);
      border:1px solid var(--line-g);
      border-radius:20px; backdrop-filter:blur(20px);
      padding:32px; position:relative; overflow:hidden;
      transition:transform .4s ease;
    }
    .sp-solar-card:hover { transform:translateY(-4px); }
    .sp-solar-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse at top left, rgba(90,140,46,.1),transparent 60%);
      pointer-events:none;
    }
    .sp-solar-icon-row {
      display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;
    }
    .sp-solar-icon {
      width:52px; height:52px; border-radius:14px;
      background:rgba(90,140,46,.2); border:1px solid rgba(90,140,46,.4);
      display:flex; align-items:center; justify-content:center; font-size:26px;
    }
    .sp-badge-live {
      font-family:'Space Mono',monospace; font-size:10px; letter-spacing:1px;
      padding:4px 12px; border-radius:50px;
      background:rgba(90,140,46,.2); color:var(--green-hi); border:1px solid var(--line-g);
    }
    .sp-card-title { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:1px; margin-bottom:6px; }
    .sp-card-desc  { font-size:12px; color:var(--muted); line-height:1.6; }
    .sp-metrics-row {
      display:grid; grid-template-columns:1fr 1fr 1fr;
      gap:1px; background:var(--line);
      border:1px solid var(--line); border-radius:12px;
      overflow:hidden; margin-top:24px;
    }
    .sp-metric-box { background:var(--ink-2); padding:18px 14px; text-align:center; }
    .sp-metric-val {
      font-family:'Bebas Neue',sans-serif; font-size:30px; letter-spacing:1px;
      background:linear-gradient(135deg,var(--green-hi),var(--blue-hi));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
    }
    .sp-metric-label { font-size:10px; color:var(--muted); font-family:'Space Mono',monospace; letter-spacing:1px; margin-top:4px; }

    .sp-float-card {
      position:absolute; bottom:-28px; right:-16px; width:210px;
      background:var(--panel); border:1px solid var(--line);
      border-radius:16px; backdrop-filter:blur(20px); padding:18px 20px;
      animation:floatCard 4s ease-in-out infinite;
    }
    .sp-fc-label { font-size:11px; color:var(--muted); font-family:'Space Mono',monospace; letter-spacing:1px; margin-bottom:8px; }
    .sp-fc-val   { font-family:'Bebas Neue',sans-serif; font-size:28px; color:var(--white); letter-spacing:1px; }
    .sp-fc-sub   { font-size:11px; color:var(--green-hi); margin-top:4px; }

    /* TICKER */
    .sp-ticker {
      position:relative; z-index:2;
      background:var(--blue-2);
      border-top:1px solid rgba(43,91,168,.4);
      border-bottom:1px solid rgba(43,91,168,.4);
      padding:14px 0; overflow:hidden; white-space:nowrap;
    }
    .sp-ticker-inner {
      display:inline-flex; gap:0;
      animation:ticker 24s linear infinite;
    }
    .sp-ticker-item {
      display:inline-flex; align-items:center; gap:12px; padding:0 36px;
      font-family:'Space Mono',monospace;
      font-size:11px; letter-spacing:2px; text-transform:uppercase;
      color:rgba(255,255,255,.6);
    }
    .t-dot { width:4px; height:4px; border-radius:50%; background:var(--green-hi); flex-shrink:0; }

    /* SHARED SECTION */
    section { position:relative; z-index:2; }
    .container { max-width:1140px; margin:0 auto; padding:0 52px; }
    .section-label {
      font-family:'Space Mono',monospace;
      font-size:10px; letter-spacing:3px; text-transform:uppercase;
      color:var(--green-hi); margin-bottom:16px;
      display:flex; align-items:center; gap:12px;
    }
    .section-label::before { content:''; display:block; width:24px; height:1px; background:var(--green-hi); }
    .section-title {
      font-family:'Bebas Neue',sans-serif;
      font-size:clamp(36px,5vw,60px);
      line-height:.95; letter-spacing:2px; margin-bottom:18px;
    }
    .section-desc { font-size:16px; color:var(--light); font-weight:300; max-width:520px; line-height:1.75; }

    /* WHAT WE INSTALL */
    .install-section { padding:110px 0 100px; }
    .install-header { display:grid; grid-template-columns:1fr 1fr; gap:60px; margin-bottom:60px; align-items:end; }
    .install-grid { display:grid; grid-template-columns:1fr 1fr; gap:24px; }
    .install-card {
      background:var(--panel); border:1px solid var(--line);
      border-radius:20px; padding:36px 32px;
      backdrop-filter:blur(16px); position:relative; overflow:hidden;
      transition:transform .3s,border-color .3s;
    }
    .install-card::before {
      content:''; position:absolute; inset:0;
      background:radial-gradient(ellipse at top left,rgba(43,91,168,.1),transparent 60%);
      pointer-events:none; transition:opacity .3s;
    }
    .install-card.green-c::before { background:radial-gradient(ellipse at top left,rgba(90,140,46,.1),transparent 60%); }
    .install-card:hover { transform:translateY(-4px); border-color:rgba(43,91,168,.5); }
    .install-card.green-c:hover { border-color:rgba(90,140,46,.5); }
    .ic-num { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:2px; color:var(--muted); margin-bottom:22px; }
    .ic-icon-wrap {
      width:60px; height:60px; border-radius:16px;
      display:flex; align-items:center; justify-content:center;
      font-size:30px; margin-bottom:24px;
    }
    .ic-icon-wrap.blue-bg { background:rgba(43,91,168,.2); border:1px solid rgba(43,91,168,.4); }
    .ic-icon-wrap.green-bg { background:rgba(90,140,46,.2); border:1px solid rgba(90,140,46,.35); }
    .ic-title { font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:1.5px; margin-bottom:12px; }
    .ic-list { list-style:none; display:flex; flex-direction:column; gap:8px; }
    .ic-list li {
      display:flex; align-items:flex-start; gap:10px;
      font-size:13px; color:var(--muted);
    }
    .ic-list li::before { content:'→'; color:var(--green-hi); flex-shrink:0; font-family:'Space Mono',monospace; }

    /* Components full-width card */
    .comp-card {
      margin-top:24px;
      background:var(--panel); border:1px solid var(--line-g);
      border-radius:20px; padding:36px 40px;
      backdrop-filter:blur(16px);
      display:grid; grid-template-columns:auto 1fr;
      gap:40px; align-items:start;
    }
    .comp-icon { font-size:40px; }
    .comp-title { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:1.5px; margin-bottom:16px; }
    .comp-list {
      display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px 20px; list-style:none;
    }
    .comp-list li {
      display:flex; align-items:flex-start; gap:8px;
      font-size:13px; color:var(--muted);
    }
    .comp-list li::before { content:'◆'; color:var(--blue-hi); font-size:8px; margin-top:5px; flex-shrink:0; }

    /* PROCESS STEPS */
    .process-section { padding:100px 0; border-top:1px solid var(--line); background:linear-gradient(180deg,var(--ink) 0%,var(--ink-2) 100%); }
    .process-steps {
      display:grid; grid-template-columns:repeat(6,1fr);
      gap:0; margin-top:60px;
      border:1px solid var(--line); border-radius:16px; overflow:hidden;
    }
    .process-step {
      padding:32px 22px; border-right:1px solid var(--line);
      position:relative; transition:background .25s;
    }
    .process-step:last-child { border-right:none; }
    .process-step:hover { background:rgba(90,140,46,.06); }
    .ps-num { font-family:'Space Mono',monospace; font-size:11px; letter-spacing:2px; color:var(--green-hi); margin-bottom:18px; }
    .ps-icon { font-size:22px; margin-bottom:14px; }
    .ps-title { font-family:'Bebas Neue',sans-serif; font-size:17px; letter-spacing:1px; margin-bottom:10px; }
    .ps-desc { font-size:11px; color:var(--muted); line-height:1.75; }
    .ps-arrow { position:absolute; right:14px; top:32px; font-size:16px; color:var(--line); }

    /* SYSTEM RANGE */
    .range-section { padding:100px 0; border-top:1px solid var(--line); }
    .range-header { display:grid; grid-template-columns:1fr 1fr; gap:60px; margin-bottom:60px; align-items:end; }
    .range-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:16px; }
    .range-card {
      background:var(--panel); border:1px solid var(--line);
      border-radius:16px; padding:28px 22px;
      backdrop-filter:blur(12px);
      transition:transform .3s,border-color .3s;
      display:flex; flex-direction:column;
    }
    .range-card:hover { transform:translateY(-4px); border-color:rgba(90,140,46,.5); }
    .range-card.featured { border-color:rgba(90,140,46,.5); background:rgba(90,140,46,.07); }
    .rc-icon { font-size:28px; margin-bottom:18px; }
    .rc-label {
      font-family:'Space Mono',monospace; font-size:9px; letter-spacing:2px; text-transform:uppercase;
      color:var(--muted); margin-bottom:8px;
    }
    .rc-title { font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:1px; margin-bottom:6px; }
    .rc-tagline { font-size:11px; color:var(--green-hi); margin-bottom:18px; }
    .rc-list { list-style:none; display:flex; flex-direction:column; gap:7px; flex:1; }
    .rc-list li { font-size:11px; color:var(--muted); display:flex; gap:8px; align-items:flex-start; }
    .rc-list li::before { content:'→'; color:var(--green-hi); flex-shrink:0; font-family:'Space Mono',monospace; }

    .range-cta-band {
      margin-top:40px;
      background:var(--panel); border:1px solid var(--line-g);
      border-radius:16px; padding:32px 40px;
      display:flex; align-items:center; justify-content:space-between; gap:24px;
      backdrop-filter:blur(12px);
    }
    .rcb-text { font-size:15px; color:var(--light); max-width:600px; line-height:1.7; }
    .rcb-text strong { color:var(--white); font-weight:500; }

    /* AFTER SALES */
    .aftersales-section { padding:100px 0; border-top:1px solid var(--line); }
    .aftersales-grid { display:grid; grid-template-columns:1fr 1.3fr; gap:80px; margin-top:60px; align-items:start; }
    .support-card-list { display:flex; flex-direction:column; gap:16px; }
    .support-card {
      background:var(--panel); border:1px solid var(--line);
      border-radius:14px; padding:22px 24px;
      backdrop-filter:blur(12px); display:flex; gap:18px;
      transition:border-color .25s,transform .25s;
    }
    .support-card:hover { border-color:rgba(90,140,46,.4); transform:translateX(4px); }
    .sc-ico { font-size:22px; flex-shrink:0; margin-top:2px; }
    .sc-info-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:1px; margin-bottom:4px; }
    .sc-info-desc  { font-size:12px; color:var(--muted); line-height:1.65; }

    .expansion-card {
      background:var(--panel); border:1px solid var(--line-g);
      border-radius:20px; padding:36px 32px; backdrop-filter:blur(16px);
    }
    .exp-title { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:1px; margin-bottom:8px; }
    .exp-subtitle { font-size:13px; color:var(--muted); margin-bottom:24px; }
    .exp-items { display:flex; flex-direction:column; gap:12px; }
    .exp-item {
      background:rgba(43,91,168,.1); border:1px solid rgba(43,91,168,.25);
      border-radius:12px; padding:16px 18px;
      display:flex; align-items:center; gap:14px;
      transition:border-color .2s, background .2s;
    }
    .exp-item:hover { border-color:var(--green-hi); background:rgba(90,140,46,.08); }
    .exp-item-icon { font-size:20px; flex-shrink:0; }
    .exp-item-label { font-size:13px; color:var(--light); font-weight:400; }

    /* COMPLIANCE */
    .compliance-section {
      padding:80px 0; border-top:1px solid var(--line);
      background:linear-gradient(180deg,var(--ink-2) 0%,var(--ink) 100%);
    }
    .compliance-inner {
      display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center;
    }
    .compliance-badges { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
    .comp-badge {
      background:var(--panel); border:1px solid var(--line);
      border-radius:14px; padding:20px 22px;
      backdrop-filter:blur(12px);
      display:flex; align-items:center; gap:14px;
      transition:border-color .25s;
    }
    .comp-badge:hover { border-color:rgba(90,140,46,.4); }
    .cb-icon { font-size:20px; flex-shrink:0; }
    .cb-code { font-family:'Space Mono',monospace; font-size:11px; color:var(--green-hi); letter-spacing:1px; }
    .cb-name { font-size:11px; color:var(--muted); margin-top:2px; }

    /* WHY CHOOSE */
    .why-section { padding:100px 0; border-top:1px solid var(--line); }
    .why-grid { display:grid; grid-template-columns:1fr 1.4fr; gap:80px; align-items:center; }
    .why-pillars { display:grid; grid-template-columns:1fr 1fr; gap:20px; }
    .pillar {
      background:var(--panel); border:1px solid var(--line);
      border-radius:16px; padding:26px 24px;
      backdrop-filter:blur(12px);
      transition:border-color .25s,transform .25s;
    }
    .pillar:hover { border-color:rgba(90,140,46,.45); transform:translateY(-3px); }
    .pillar-icon { font-size:26px; margin-bottom:14px; }
    .pillar-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:1px; margin-bottom:8px; }
    .pillar-desc   { font-size:12px; color:var(--muted); line-height:1.7; }

    /* ECOSYSTEM */
    .eco-section { padding:100px 0; border-top:1px solid var(--line); }
    .eco-inner { display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center; }
    .eco-diagram {
      background:var(--panel); border:1px solid var(--line-g);
      border-radius:20px; padding:40px; backdrop-filter:blur(16px);
      position:relative;
    }
    .eco-center {
      width:80px; height:80px; border-radius:50%;
      background:rgba(90,140,46,.2); border:2px solid var(--green-hi);
      display:flex; align-items:center; justify-content:center;
      font-size:36px; margin:0 auto 32px;
      position:relative;
    }
    .eco-center::before {
      content:''; position:absolute; inset:-8px;
      border:1px solid rgba(90,140,46,.35); border-radius:50%;
      animation:pulseRing 2.5s ease-out infinite;
    }
    .eco-nodes { display:grid; grid-template-columns:1fr 1fr 1fr; gap:14px; }
    .eco-node {
      background:rgba(43,91,168,.1); border:1px solid rgba(43,91,168,.3);
      border-radius:12px; padding:16px 14px; text-align:center;
      transition:border-color .2s,background .2s;
    }
    .eco-node:hover { border-color:var(--green-hi); background:rgba(90,140,46,.08); }
    .eco-node-icon { font-size:22px; margin-bottom:8px; }
    .eco-node-label { font-size:11px; color:var(--light); font-family:'Space Mono',monospace; letter-spacing:.5px; }

    /* CTA BAND */
    .cta-section { padding:100px 0; border-top:1px solid var(--line); }
    .cta-band {
      background:var(--panel); border:1px solid var(--line-g);
      border-radius:24px; padding:64px 60px;
      backdrop-filter:blur(20px);
      text-align:center; position:relative; overflow:hidden;
    }
    .cta-band::before {
      content:''; position:absolute;
      width:600px; height:400px;
      background:radial-gradient(circle,rgba(90,140,46,.12) 0%,transparent 70%);
      top:-100px; left:50%; transform:translateX(-50%);
      pointer-events:none;
    }
    .cta-label {
      font-family:'Space Mono',monospace; font-size:10px; letter-spacing:3px;
      text-transform:uppercase; color:var(--green-hi);
      display:flex; align-items:center; gap:12px; justify-content:center; margin-bottom:20px;
    }
    .cta-label::before,.cta-label::after { content:''; display:block; width:24px; height:1px; background:var(--green-hi); }
    .cta-title {
      font-family:'Bebas Neue',sans-serif;
      font-size:clamp(42px,5vw,68px); letter-spacing:2px; margin-bottom:18px;
    }
    .cta-sub { font-size:16px; color:var(--light); max-width:480px; margin:0 auto 44px; line-height:1.75; }
    .cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }

    /* FOOTER */
    .sp-footer {
      position:relative; z-index:2;
      border-top:1px solid var(--line);
      padding:70px 52px 40px;
    }
    .footer-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px; margin-bottom:60px; }
    .footer-brand { font-family:'Bebas Neue',sans-serif; font-size:20px; letter-spacing:2px; margin-bottom:16px; }
    .footer-desc { font-size:13px; color:var(--muted); line-height:1.75; max-width:280px; }
    .footer-col h4 { font-size:12px; font-weight:500; letter-spacing:2px; text-transform:uppercase; color:var(--light); margin-bottom:20px; font-family:'Space Mono',monospace; }
    .footer-col ul { list-style:none; display:flex; flex-direction:column; gap:10px; }
    .footer-col ul li a { font-size:13px; color:var(--muted); text-decoration:none; transition:color .2s; }
    .footer-col ul li a:hover { color:var(--white); }
    .footer-bottom { display:flex; justify-content:space-between; align-items:center; padding-top:28px; border-top:1px solid var(--line); font-size:12px; color:var(--muted); font-family:'Space Mono',monospace; }

    /* CANVAS */
    #sp-circuit-canvas { position:fixed; inset:0; z-index:0; pointer-events:none; opacity:.35; }
    .sp-grain {
      position:fixed; inset:0; z-index:1; pointer-events:none; opacity:.5;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
      background-size:200px 200px;
    }

    @media(max-width:960px){
      .sp-hero,.install-header,.range-header,.why-grid,.eco-inner,.compliance-inner,.aftersales-grid { grid-template-columns:1fr; }
      .sp-hero { padding:100px 24px 60px; }
      .sp-hero-visual { display:none; }
      .process-steps { grid-template-columns:repeat(3,1fr); }
      .range-grid { grid-template-columns:repeat(2,1fr); }
      .container { padding:0 24px; }
      .sp-nav { padding:0 24px; }
      .sp-footer { padding:60px 24px 32px; }
      .footer-grid { grid-template-columns:1fr 1fr; }
      .install-grid { grid-template-columns:1fr; }
      .comp-list { grid-template-columns:1fr 1fr; }
      .range-cta-band { flex-direction:column; text-align:center; }
    }
  `}</style>
);

/* ─── Circuit Canvas ─────────────────────────────────────────── */
function CircuitCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H, lines = [], rafId;
    const resize = () => {
      W = canvas.width  = window.innerWidth;
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
  return <canvas id="sp-circuit-canvas" ref={canvasRef} />;
}

/* ─── Scroll Reveal Hook ─────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } });
    }, { threshold: .12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─── Data ───────────────────────────────────────────────────── */
const TICKER_ITEMS = ["MCS Certified Installations","Solar PV Systems","Residential & Commercial","G98 / G99 Compliant","High-Efficiency Panels","Hybrid & Battery-Ready","EV Integration Ready","UK-Wide Installations","End-to-End Service","ROI-Focused Design"];

const WHAT_WE_INSTALL = [
  { num:"01", icon:"🏠", bg:"blue-bg", title:"RESIDENTIAL SOLAR SYSTEMS", color:"", items:["Roof-mounted solar PV systems","Single-phase inverter setups","Optimised for household consumption","Export-ready systems"] },
  { num:"02", icon:"🏭", bg:"green-bg", title:"COMMERCIAL SOLAR SYSTEMS", color:"green-c", items:["Large-scale rooftop installations","Three-phase systems","Energy cost reduction for businesses","Scalable infrastructure for future expansion"] },
];

const COMPONENTS = ["High-efficiency solar panels","String inverters / hybrid inverters","DC and AC protection systems","Mounting structures and cabling","Monitoring and performance tracking systems"];

const PROCESS_STEPS = [
  { num:"01", icon:"🔍", title:"Site Assessment",     desc:"Roof orientation, shading, and structural suitability" },
  { num:"02", icon:"📐", title:"System Design",       desc:"System sizing based on consumption and ROI" },
  { num:"03", icon:"📋", title:"DNO Application",     desc:"G98/G99 grid approval where required" },
  { num:"04", icon:"🔧", title:"Installation",        desc:"Panels, inverter, cabling, and protection systems" },
  { num:"05", icon:"⚡", title:"Testing & Commissioning", desc:"Full system testing and performance validation" },
  { num:"06", icon:"🤝", title:"Handover",            desc:"System walkthrough and monitoring setup" },
];

const SYSTEM_RANGE = [
  { icon:"🌱", label:"Entry", title:"Entry System",        tagline:"Affordable entry into solar",         items:["Ideal for small households","Lower upfront investment","Covers partial energy usage"] },
  { icon:"⚡", label:"Standard", title:"Standard System",  tagline:"Balanced performance and value",      items:["Suitable for most homes","Good return on investment","Optimised for daily consumption"], featured:true },
  { icon:"💎", label:"Premium", title:"Premium System",    tagline:"Maximum efficiency and output",       items:["Higher capacity systems","Advanced inverter options","Better long-term savings"] },
  { icon:"🏢", label:"Commercial", title:"Commercial System", tagline:"Designed for business efficiency", items:["Large-scale installations","Significant energy cost reduction","Scalable for business growth"] },
  { icon:"🔋", label:"Hybrid", title:"Hybrid / Future-Ready", tagline:"Built for energy independence",   items:["Battery-ready systems","EV charger integration ready","Smart energy management"] },
];

const AFTER_SALES = [
  { icon:"📊", title:"System Monitoring",       desc:"Guidance on tracking your system performance in real time" },
  { icon:"🔧", title:"Maintenance & Inspection", desc:"Periodic system health checks and safety inspections" },
  { icon:"🩺", title:"Fault Diagnosis & Repairs", desc:"Quick identification and resolution of performance issues" },
  { icon:"🛡️", title:"Warranty Support",        desc:"Assistance with manufacturer warranties for panels and inverters" },
];

const EXPANSION_ITEMS = [
  { icon:"🔋", label:"Battery Storage" },
  { icon:"☀️", label:"Additional Panels" },
  { icon:"🚗", label:"EV Charger Integration" },
];

const COMPLIANCE = [
  { icon:"🏅", code:"MCS",         name:"Microgeneration Certification Scheme" },
  { icon:"📘", code:"BS 7671",     name:"Wiring Regulations" },
  { icon:"🌍", code:"IEC 61215",   name:"Solar Panel Standard" },
  { icon:"🔗", code:"G98 / G99",   name:"Grid Connection Standards" },
];

const WHY_PILLARS = [
  { icon:"📈", title:"ROI-Focused Design",       desc:"We design systems based on actual energy usage and return potential." },
  { icon:"✅", title:"Fully Compliant",           desc:"Aligned with UK regulations and certification requirements." },
  { icon:"🚀", title:"Future-Ready Systems",     desc:"Prepared for battery storage and EV integration." },
  { icon:"🤝", title:"Long-Term Support",        desc:"Ongoing assistance beyond installation." },
];

const ECO_NODES = [
  { icon:"🚗", label:"EV Charging" },
  { icon:"🔋", label:"Battery Storage" },
  { icon:"🧠", label:"Smart Energy" },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function SolarInstallation() {
  useReveal();
  const tickerItems = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <>
      <FontLoader />
      <CircuitCanvas />
      <div className="sp-grain" />

      {/* ── NAV ── */}
      <nav className="sp-nav">
        <a href="#" className="sp-nav-logo">
          <div className="sp-nav-brand">
            <span style={{color:"var(--blue-hi)"}}>WATTEN </span>
            <span style={{color:"var(--green-hi)"}}>POWER</span>
          </div>
        </a>
        <ul className="sp-nav-links">
          <li><a href="#services">Services</a></li>
          <li><a href="#process">Process</a></li>
          <li><a href="#range">Systems</a></li>
          <li><a href="#support">Support</a></li>
          <li><a href="#contact" className="sp-nav-cta">Get a Quote</a></li>
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section className="sp-hero">
        <div className="sp-hero-content">
          <div className="sp-eyebrow">
            <span className="sp-eyebrow-dot" />
            Solar PV Installation — UK Specialists
          </div>
          <h1 className="sp-headline">
            <span className="l-green">SOLAR PANEL</span>
            <span className="l-blue">INSTALLATION</span>
            <span className="l-white">SERVICES</span>
          </h1>
          <p className="sp-sub">
            Generate Your Own Power. Reduce Your Costs. Future-Proof Your Energy.<br />
            Watten Power delivers professionally designed and installed solar PV systems for homes and businesses across the UK.
          </p>
          <div className="sp-hero-btns">
            <a href="#contact" className="btn-main btn-green">☀️ &nbsp;Request a Quote</a>
            <button className="btn-sec" onClick={() => document.getElementById("process")?.scrollIntoView({behavior:"smooth"})}>
              View Our Process →
            </button>
          </div>
        </div>

        <div className="sp-hero-visual">
          <div className="sp-solar-card">
            <div className="sp-solar-icon-row">
              <div className="sp-solar-icon">☀️</div>
              <span className="sp-badge-live">● LIVE GENERATION</span>
            </div>
            <div className="sp-card-title">Solar PV System</div>
            <div className="sp-card-desc">Real-time monitoring and performance tracking across your installation</div>
            <div className="sp-metrics-row">
              <div className="sp-metric-box">
                <div className="sp-metric-val">4.8kW</div>
                <div className="sp-metric-label">Output Now</div>
              </div>
              <div className="sp-metric-box">
                <div className="sp-metric-val">28kWh</div>
                <div className="sp-metric-label">Today</div>
              </div>
              <div className="sp-metric-box">
                <div className="sp-metric-val">£342</div>
                <div className="sp-metric-label">Saved / Mo.</div>
              </div>
            </div>
          </div>
          <div className="sp-float-card">
            <div className="sp-fc-label">ANNUAL SAVINGS</div>
            <div className="sp-fc-val">£4,100</div>
            <div className="sp-fc-sub">↑ 18% vs last year</div>
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="sp-ticker">
        <div className="sp-ticker-inner">
          {tickerItems.map((item, i) => (
            <span className="sp-ticker-item" key={i}>
              <span className="t-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── WHAT WE INSTALL ── */}
      <section className="install-section" id="services">
        <div className="container">
          <div className="install-header reveal">
            <div>
              <div className="section-label">Solar Installation Services</div>
              <h2 className="section-title">WHAT WE<br /><span style={{color:"var(--green-hi)"}}>INSTALL</span></h2>
            </div>
            <p className="section-desc">
              We provide end-to-end solar PV installation services, from system design to commissioning, ensuring maximum performance, safety, and long-term reliability. Our approach focuses on delivering systems that are not only compliant but also financially and technically optimised.
            </p>
          </div>

          <div className="install-grid">
            {WHAT_WE_INSTALL.map((card, i) => (
              <div className={`install-card ${card.color} reveal`} key={i}>
                <div className="ic-num">{card.num} /</div>
                <div className={`ic-icon-wrap ${card.bg}`}>{card.icon}</div>
                <div className="ic-title">{card.title}</div>
                <ul className="ic-list">
                  {card.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="comp-card reveal">
            <div className="comp-icon">⚙️</div>
            <div>
              <div className="comp-title">SYSTEM COMPONENTS</div>
              <ul className="comp-list">
                {COMPONENTS.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="process-section" id="process">
        <div className="container">
          <div className="reveal">
            <div className="section-label">Our Installation Process</div>
            <h2 className="section-title">FROM SURVEY TO<br /><span style={{color:"var(--green-hi)"}}>COMMISSIONING</span></h2>
          </div>
          <div className="process-steps reveal">
            {PROCESS_STEPS.map((step, i) => (
              <div className="process-step" key={i}>
                <div className="ps-num">STEP {step.num}</div>
                <div className="ps-icon">{step.icon}</div>
                <div className="ps-title">{step.title}</div>
                <div className="ps-desc">{step.desc}</div>
                {i < PROCESS_STEPS.length - 1 && <div className="ps-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYSTEM RANGE ── */}
      <section className="range-section" id="range">
        <div className="container">
          <div className="range-header reveal">
            <div>
              <div className="section-label">Our Solar System Range</div>
              <h2 className="section-title">TAILORED<br /><span style={{color:"var(--green-hi)"}}>SOLUTIONS</span></h2>
            </div>
            <p className="section-desc">We offer a range of solar solutions tailored to different energy needs and budgets, from entry-level residential systems to full commercial deployments.</p>
          </div>
          <div className="range-grid reveal">
            {SYSTEM_RANGE.map((sys, i) => (
              <div className={`range-card ${sys.featured ? "featured" : ""}`} key={i}>
                <div className="rc-icon">{sys.icon}</div>
                <div className="rc-label">{sys.label}</div>
                <div className="rc-title">{sys.title}</div>
                <div className="rc-tagline">{sys.tagline}</div>
                <ul className="rc-list">
                  {sys.items.map((item, j) => <li key={j}>{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="range-cta-band reveal">
            <p className="rcb-text">
              <strong>Not sure what system size suits your property?</strong><br />
              We will analyse your usage and recommend the most efficient system for your home or business.
            </p>
            <a href="#contact" className="btn-main btn-green">Request a Quote →</a>
          </div>
        </div>
      </section>

      {/* ── AFTER SALES ── */}
      <section className="aftersales-section" id="support">
        <div className="container">
          <div className="reveal">
            <div className="section-label">After Sales &amp; Support</div>
            <h2 className="section-title">LONG-TERM<br /><span style={{color:"var(--green-hi)"}}>PARTNERSHIP</span></h2>
            <p className="section-desc" style={{marginBottom:0}}>Solar is a long-term investment, and performance depends on proper support and monitoring.</p>
          </div>
          <div className="aftersales-grid">
            <div className="support-card-list reveal">
              {AFTER_SALES.map((s, i) => (
                <div className="support-card" key={i}>
                  <div className="sc-ico">{s.icon}</div>
                  <div>
                    <div className="sc-info-title">{s.title}</div>
                    <div className="sc-info-desc">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="expansion-card reveal">
              <div className="exp-title">SYSTEM EXPANSION</div>
              <div className="exp-subtitle">Support for adding future capabilities to your installation</div>
              <div className="exp-items">
                {EXPANSION_ITEMS.map((e, i) => (
                  <div className="exp-item" key={i}>
                    <div className="exp-item-icon">{e.icon}</div>
                    <div className="exp-item-label">{e.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="compliance-section">
        <div className="container">
          <div className="compliance-inner">
            <div className="reveal">
              <div className="section-label">Compliance &amp; Standards</div>
              <h2 className="section-title">FULLY<br /><span style={{color:"var(--green-hi)"}}>CERTIFIED</span></h2>
              <p className="section-desc">All installations comply with UK and international standards, ensuring safety, performance, and grid compatibility.</p>
            </div>
            <div className="compliance-badges reveal">
              {COMPLIANCE.map((c, i) => (
                <div className="comp-badge" key={i}>
                  <div className="cb-icon">{c.icon}</div>
                  <div>
                    <div className="cb-code">{c.code}</div>
                    <div className="cb-name">{c.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="why-section">
        <div className="container">
          <div className="why-grid">
            <div className="reveal">
              <div className="section-label">Why Choose Watten Power</div>
              <h2 className="section-title">THE WATTEN<br /><span style={{color:"var(--green-hi)"}}>DIFFERENCE</span></h2>
              <p className="section-desc">Every installation is designed around your specific energy profile and long-term goals — not a one-size-fits-all package.</p>
            </div>
            <div className="why-pillars reveal">
              {WHY_PILLARS.map((p, i) => (
                <div className="pillar" key={i}>
                  <div className="pillar-icon">{p.icon}</div>
                  <div className="pillar-title">{p.title}</div>
                  <div className="pillar-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ECOSYSTEM ── */}
      <section className="eco-section">
        <div className="container">
          <div className="eco-inner">
            <div className="reveal">
              <div className="section-label">Integrated Energy Ecosystem</div>
              <h2 className="section-title">THE SMART<br /><span style={{color:"var(--green-hi)"}}>ENERGY SETUP</span></h2>
              <p className="section-desc">Your solar system is the foundation of a smarter, more connected energy setup — designed to integrate with EV charging, battery storage, and smart energy management platforms.</p>
            </div>
            <div className="eco-diagram reveal">
              <div className="eco-center">☀️</div>
              <div style={{textAlign:"center",marginBottom:"24px"}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:"18px",letterSpacing:"1px",marginBottom:"4px"}}>SOLAR PV SYSTEM</div>
                <div style={{fontSize:"12px",color:"var(--muted)"}}>Your central energy source</div>
              </div>
              <div style={{fontSize:"11px",color:"var(--muted)",fontFamily:"'Space Mono',monospace",letterSpacing:"1px",textAlign:"center",marginBottom:"16px",textTransform:"uppercase"}}>Designed to integrate with</div>
              <div className="eco-nodes">
                {ECO_NODES.map((n, i) => (
                  <div className="eco-node" key={i}>
                    <div className="eco-node-icon">{n.icon}</div>
                    <div className="eco-node-label">{n.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section" id="contact">
        <div className="container">
          <div className="cta-band reveal">
            <div className="cta-label">Get Started</div>
            <h2 className="cta-title">THINKING ABOUT<br /><span style={{color:"var(--green-hi)"}}>SOLAR PANELS?</span></h2>
            <p className="cta-sub">Speak with our team for a tailored system design and cost estimate. We'll analyse your usage and recommend the most efficient solution.</p>
            <div className="cta-btns">
              <a href="mailto:hello@wattenpower.co.uk" className="btn-main btn-green">☀️ &nbsp;Book a Site Survey</a>
              <a href="mailto:hello@wattenpower.co.uk" className="btn-main">📋 &nbsp;Request a Quote</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="sp-footer">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span style={{color:"var(--blue-hi)"}}>WATTEN </span>
              <span style={{color:"var(--green-hi)"}}>POWER</span>
            </div>
            <p className="footer-desc">Watten Power Ltd is a UK-based clean energy solutions provider specialising in EV charging and solar installations for residential and commercial properties.</p>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Solar Installation</a></li>
              <li><a href="#range">System Range</a></li>
              <li><a href="#support">After Sales</a></li>
              <li><a href="#process">Our Process</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Compliance</a></li>
              <li><a href="#">EV Charging</a></li>
              <li><a href="#">Battery Storage</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:hello@wattenpower.co.uk">hello@wattenpower.co.uk</a></li>
              <li><a href="#">United Kingdom</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 Watten Power Ltd. All rights reserved.</span>
          <span>Registered in England &amp; Wales</span>
        </div>
      </footer>
    </>
  );
}