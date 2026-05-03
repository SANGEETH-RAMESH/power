import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/little_logo.png';

export default function ComingSoon() {
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                setProgress(p => { if (p >= 72) { clearInterval(interval); return 72; } return p + 1; });
            }, 28);
        }, 200);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const cv = canvasRef.current;
        const ctx = cv.getContext('2d');
        let nodes = [], W, H;
        const resize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
        resize();
        window.addEventListener('resize', resize);
        const n = Math.floor(window.innerWidth * window.innerHeight / 20000);
        for (let i = 0; i < n; i++)
            nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, p: Math.random() * Math.PI * 2 });
        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, W, H);
            nodes.forEach((a, i) => {
                a.x += a.vx; a.y += a.vy; a.p += .02;
                if (a.x < 0 || a.x > W) a.vx *= -1;
                if (a.y < 0 || a.y > H) a.vy *= -1;
                const g = (Math.sin(a.p) + 1) / 2;
                ctx.beginPath(); ctx.arc(a.x, a.y, 1.2 + g * .8, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(90,140,46,${.25 + g * .3})`; ctx.fill();
                for (let j = i + 1; j < nodes.length; j++) {
                    const b = nodes[j], d = Math.hypot(b.x - a.x, b.y - a.y);
                    if (d < 120) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(43,91,168,${(1 - d / 120) * .2})`; ctx.lineWidth = .5; ctx.stroke(); }
                }
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
    }, []);

    return (
        <>
            <style>{`
    @keyframes glow {
        0%,100%{ filter: drop-shadow(0 0 10px rgba(90,140,46,.3)); }
        50%{ filter: drop-shadow(0 0 26px rgba(90,140,46,.7)) brightness(1.15); }
    }
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(14px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: .2; }
    }
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0px 1000px rgba(10, 25, 47, 0.95) inset !important;
        -webkit-text-fill-color: #f0f6ff !important;
        caret-color: #f0f6ff;
        border: 1px solid rgba(43,91,168,.3) !important;
        transition: background-color 5000s ease-in-out 0s;
    }
`}</style>

            <main style={{ background: '#04101f', color: '#f0f6ff', fontFamily: "'DM Sans', sans-serif", minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 24px 80px', position: 'relative', overflowX: 'hidden' }}>

                <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: .4, pointerEvents: 'none' }} />

                <div style={{ position: 'relative', zIndex: 2, display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '44px', animation: 'fadeUp .7s ease both' }}>
                    <div style={{ position: 'relative', display: 'inline-block', padding: '20px 24px' }}>
                        <img
                            src={logo}
                            alt=""
                            style={{ display: 'block', height: '100px', mixBlendMode: 'screen', filter: 'brightness(1.15) contrast(1.1)', animation: 'glow 3s ease-in-out infinite' }}
                        />
                        <span style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #4a7fd4', borderLeft: '2px solid #4a7fd4' }}></span>
                        <span style={{ position: 'absolute', bottom: 0, left: 0, width: '20px', height: '20px', borderBottom: '2px solid #4a7fd4', borderLeft: '2px solid #4a7fd4' }}></span>
                        <span style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #79bc3c', borderRight: '2px solid #79bc3c' }}></span>
                        <span style={{ position: 'absolute', top: 0, right: 0, width: '20px', height: '20px', borderTop: '2px solid #79bc3c', borderRight: '2px solid #79bc3c' }}></span>
                    </div>
                    <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '5px', lineHeight: 1, margin: 0 }}>
                        <span style={{ color: '#4a7fd4' }}>WATTEN </span>
                        <span style={{ color: '#79bc3c' }}>POWER</span>
                    </h2>
                    <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '8px', letterSpacing: '3px', textTransform: 'uppercase', color: '#6278a0', margin: 0 }}>
                        Clean Energy Solutions
                    </p>
                </div>

                <div style={{ position: 'relative', zIndex: 2, fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: '#79bc3c', display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '18px', animation: 'fadeUp .7s .1s ease both' }}>
                    <span style={{ display: 'block', width: '28px', height: '1px', background: '#79bc3c', opacity: .5 }} />
                    Watten Power Ltd
                    <span style={{ display: 'block', width: '28px', height: '1px', background: '#79bc3c', opacity: .5 }} />
                </div>

                <h1 style={{ position: 'relative', zIndex: 2, fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(54px, 9vw, 100px)', lineHeight: .88, letterSpacing: '2px', marginBottom: '8px', animation: 'fadeUp .7s .16s ease both' }}>
                    <span style={{ display: 'block', color: '#f0f6ff' }}>POWERING UP</span>
                    <span style={{ display: 'block', color: '#79bc3c' }}>SOMETHING BIG</span>
                </h1>

                <div style={{ position: 'relative', zIndex: 2, fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(16px, 2.5vw, 24px)', letterSpacing: '4px', color: '#6278a0', marginBottom: '20px', animation: 'fadeUp .7s .22s ease both' }}>
                    Our website is being built
                </div>

                <p style={{ position: 'relative', zIndex: 2, fontSize: '15px', color: '#c2d4ee', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto 36px', animation: 'fadeUp .7s .28s ease both' }}>
                    We are working hard to bring you a brand new clean energy experience.{' '}
                    Our team is putting the final circuits in place — check back very soon.
                </p>

                <div style={{ position: 'relative', zIndex: 2, maxWidth: '400px', width: '100%', margin: '0 auto 32px', animation: 'fadeUp .7s .34s ease both' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '1.5px', textTransform: 'uppercase', color: '#6278a0', marginBottom: '8px' }}>
                        <span>Build Progress</span>
                        <span style={{ color: '#79bc3c' }}>{progress}%</span>
                    </div>
                    <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(43,91,168,.2)' }}>
                        <div style={{ height: '100%', borderRadius: '2px', width: `${progress}%`, background: 'linear-gradient(90deg, #4a7fd4, #79bc3c)', boxShadow: '0 0 10px rgba(90,140,46,.5)', transition: 'width 2.8s cubic-bezier(.4,0,.2,1)' }} />
                    </div>
                </div>

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '36px', animation: 'fadeUp .7s .4s ease both' }}>
                    {[
                        { label: 'Design', state: 'done' },
                        { label: 'EV Services', state: 'done' },
                        { label: 'Solar Services', state: 'done' },
                        { label: 'Going Live', state: 'wip' },
                        { label: 'Launch', state: 'todo' },
                    ].map((item) => (
                        <span key={item.label} style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            fontFamily: "'Space Mono', monospace", fontSize: '9px',
                            letterSpacing: '1px', textTransform: 'uppercase',
                            padding: '6px 14px', borderRadius: '50px', border: '1px solid',
                            ...(item.state === 'done' && { color: '#79bc3c', borderColor: 'rgba(90,140,46,.35)', background: 'rgba(90,140,46,.08)' }),
                            ...(item.state === 'wip' && { color: '#e8a838', borderColor: 'rgba(232,168,56,.3)', background: 'rgba(232,168,56,.07)' }),
                            ...(item.state === 'todo' && { color: '#6278a0', borderColor: 'rgba(98,120,160,.2)' }),
                        }}>
                            {item.state === 'done' && <span>✓&nbsp;&nbsp;{item.label}</span>}
                            {item.state === 'wip' && <span style={{ animation: 'blink 1.8s infinite' }}>●&nbsp;</span>}
                            {item.state === 'wip' && item.label}
                            {item.state === 'todo' && <span>○&nbsp;&nbsp;{item.label}</span>}
                        </span>
                    ))}
                </div>

                <div style={{ position: 'relative', zIndex: 2, marginBottom: '12px', animation: 'fadeUp .7s .46s ease both' }}>
                    {!submitted ? (
                        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Your email — get notified at launch"
                                style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(43,91,168,.3)', borderRadius: '50px', padding: '13px 22px', color: '#f0f6ff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 300, outline: 'none', width: '260px' }}
                            />
                            <button
                                onClick={() => { if (email && email.includes('@')) setSubmitted(true); }}
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'linear-gradient(135deg, #5A8C2E, #79bc3c)', color: '#fff', fontFamily: "'Bebas Neue', sans-serif", fontSize: '16px', letterSpacing: '1.5px', padding: '13px 28px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 6px 24px rgba(90,140,46,.35)' }}
                            >
                                Notify Me ⚡
                            </button>
                        </div>
                    ) : (
                        <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', letterSpacing: '1px', textTransform: 'uppercase', color: '#79bc3c', animation: 'fadeUp .4s ease both' }}>
                            ✓ &nbsp; You are on the list — we will be in touch!
                        </p>
                    )}
                </div>

                <div style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '22px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '4px', animation: 'fadeUp .7s .52s ease both' }}>
                    <a href="mailto:info@wattenpower.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6278a0', textDecoration: 'none' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(90,140,46,.1)', border: '1px solid rgba(90,140,46,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>✉️</div>
                        info@wattenpower.com
                    </a>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#6278a0' }}>
                        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(90,140,46,.1)', border: '1px solid rgba(90,140,46,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}>📍</div>
                        Northampton, NN1 1RS
                    </div>
                </div>

                <footer style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 2, padding: '14px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: "'Space Mono', monospace", fontSize: '9px', letterSpacing: '1px', color: 'rgba(98,120,160,.45)', borderTop: '1px solid rgba(43,91,168,.12)', flexWrap: 'wrap', gap: '8px', background: 'rgba(4,16,31,.7)', backdropFilter: 'blur(10px)' }}>
                    <span>© 2026 Watten Power Ltd — Registered in England & Wales</span>
                    <span>EV Charging · Solar Systems · Clean Energy</span>
                </footer>

            </main>
        </>
    );
}