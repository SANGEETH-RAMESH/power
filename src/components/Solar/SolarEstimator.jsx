import { useState, useRef } from "react";

const LOGO_SRC =
    "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/wAAACAAQABAAAAD/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AJWAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB//Z";

function calcResults(D) {
    const unitRate = 0.29;
    const segRate = 0.2;
    const sunMap = { sw: 4.0, se: 3.5, midlands: 3.1, north: 2.7 };
    const sunHrs = sunMap[D.sunlight] || 3.1;
    const sysEff = 0.8;
    const monthlyKWh = D.monthlyBill / unitRate;
    const dailyKWh = monthlyKWh / 30;
    let kW = dailyKWh / (sunHrs * sysEff);
    kW = Math.round(kW * 2) / 2;
    const maxFromArea = Math.floor(D.roofArea / 8);
    if (kW > maxFromArea && maxFromArea > 0) kW = maxFromArea;
    if (kW < 1) kW = 1;
    if (D.phase === "single" && kW > 6) kW = 6;
    const typeM = { "grid-tied": 1, hybrid: 1.4, "off-grid": 1.75 };
    const tm = typeM[D.systemType] || 1;
    const regionalFactor = { sw: 1.18, se: 1.12, midlands: 1.0, north: 0.88 };
    const rf = regionalFactor[D.sunlight] || 1.0;
    let panelTech, inverter, cpkwBase;
    if (D.priority === "performance") {
        panelTech = "Mono PERC / TOPCon (High Efficiency)";
        inverter = "Premium Hybrid Inverter";
        cpkwBase = 1600;
    } else if (D.priority === "budget") {
        panelTech = "Polycrystalline / Entry Mono";
        inverter = "Standard String Inverter";
        cpkwBase = 1250;
    } else {
        panelTech = "Monocrystalline PERC";
        inverter = "Efficient String Inverter";
        cpkwBase = 1450;
    }
    const cpkw = cpkwBase * rf;
    const cmin = kW * cpkw * 0.85 * tm;
    const cmax = kW * cpkw * 1.2 * tm;
    const annGen = kW * sunHrs * 365 * sysEff;
    const selfCons =
        D.systemType === "off-grid" ? 0.95 : D.systemType === "hybrid" ? 0.8 : 0.65;
    const exported = annGen * (1 - selfCons);
    const consumed = annGen * selfCons;
    const annSave = consumed * unitRate + exported * segRate;
    const mnthSave = annSave / 12;
    const segAnnual = exported * segRate;
    const avgCost = (cmin + cmax) / 2;
    const payYrs = avgCost / annSave;
    const co2T = (annGen * 25 * 0.233) / 1000;
    const treeEq = Math.round((co2T * 1000) / 21.7);
    const panelCnt = Math.ceil((kW * 1000) / 400);
    let battery = "None (Grid-Tied)";
    if (D.systemType === "hybrid")
        battery = Math.ceil(kW * 1.2) + " kWh Lithium (e.g. GivEnergy / Powerwall)";
    if (D.systemType === "off-grid")
        battery = Math.ceil(kW * 2.5) + " kWh Lithium Battery Bank";
    const typeLabel = {
        "grid-tied": "Grid-Tied (On-Grid)",
        hybrid: "Hybrid (Battery + Grid)",
        "off-grid": "Off-Grid (Standalone)",
    };
    const schemeText =
        D.propertyType === "residential"
            ? "🇬🇧  0% VAT on residential solar in Great Britain. You may also be eligible for the Smart Export Guarantee (SEG) — earn money exporting surplus power to the grid."
            : "🏢  Commercial systems may qualify for 50% First Year Capital Allowance on plant & machinery. Ask us about business energy schemes.";

    return {
        cmin: fmtGBP(cmin),
        cmax: fmtGBP(cmax),
        ssize: kW + " kWp",
        panels: panelCnt + " panels × 400 Wp each",
        msave: "£" + Math.round(mnthSave).toLocaleString("en-GB"),
        asave: "£" + Math.round(annSave).toLocaleString("en-GB") + " per year (bill savings + SEG)",
        payback: payYrs.toFixed(1) + " years",
        payPct: Math.min((payYrs / 25) * 100, 100),
        co2: co2T.toFixed(1) + " tonnes",
        trees: "≈ " + treeEq.toLocaleString("en-GB") + " trees planted",
        btype: typeLabel[D.systemType] || "—",
        bpanel: panelTech,
        binv: inverter,
        bbat: battery,
        bgen: Math.round(annGen).toLocaleString("en-GB") + " kWh / year",
        bseg: "~£" + Math.round(segAnnual).toLocaleString("en-GB") + " / year @ 20p/kWh",
        bph: D.phase === "single" ? "Single Phase (230V)" : "Three Phase (400V)",
        schemeText,
    };
}

function fmtGBP(n) {
    if (n >= 1000000) return "£" + (n / 1000000).toFixed(2) + "M";
    if (n >= 1000) return "£" + (n / 1000).toFixed(1) + "k";
    return "£" + Math.round(n).toLocaleString("en-GB");
}

function OptionCard({ icon, title, desc, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            style={{
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                borderRadius: 16,
                padding: 20,
                border: selected ? "2px solid #5A8C2E" : "2px solid rgba(43,91,168,0.18)",
                background: selected
                    ? "linear-gradient(135deg,rgba(90,140,46,0.13),rgba(43,91,168,0.1))"
                    : "rgba(15,36,71,0.72)",
                cursor: "pointer",
                transition: "all 0.2s",
                width: "100%",
                boxShadow: selected ? "0 0 0 1px #5A8C2E, 0 8px 32px rgba(90,140,46,0.15)" : "none",
            }}
        >
            <span style={{ fontSize: 28 }}>{icon}</span>
            <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 700, color: "#fff", fontSize: 15 }}>{title}</span>
            <span style={{ fontSize: 12, color: "#8999bb", lineHeight: 1.5 }}>{desc}</span>
        </button>
    );
}

function SliderStep({ question, hint, value, min, max, step, unit, prefix, labels, onBack, onNext }) {
    const [val, setVal] = useState(value);
    const handleChange = (e) => {
        setVal(+e.target.value);
        onNext(+e.target.value, false);
    };
    return (
        <div style={{ animation: "rise 0.4s ease both" }}>
            <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>{question}</p>
            <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 32, lineHeight: 1.6 }}>{hint}</p>
            <div style={{ marginBottom: 32 }}>
                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(36px,6vw,52px)", letterSpacing: "-2px", lineHeight: 1, marginBottom: 6, background: "linear-gradient(90deg,#4a7fd4,#72b038)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {prefix}{val.toLocaleString("en-GB")}
                </div>
                <div style={{ fontSize: 13, color: "#8999bb", marginBottom: 12, fontWeight: 500 }}>{unit}</div>
                <input
                    type="range" min={min} max={max} step={step} value={val}
                    onChange={handleChange}
                    style={{
                        width: "100%", height: 6, borderRadius: 3, outline: "none",
                        appearance: "none", WebkitAppearance: "none", cursor: "pointer",
                        background: `linear-gradient(to right, #5A8C2E ${((val - min) / (max - min)) * 100}%, rgba(43,91,168,0.2) ${((val - min) / (max - min)) * 100}%)`
                    }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#8999bb", marginTop: 10 }}>
                    {labels.map((l, i) => <span key={i}>{l}</span>)}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <button onClick={onBack} style={backBtnStyle}>← Back</button>
                <button onClick={() => onNext(val, true)} style={nextBtnStyle}>Next →</button>
            </div>
        </div>
    );
}

const backBtnStyle = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#8999bb",
    fontSize: 13,
    padding: "12px 24px",
    borderRadius: 50,
    cursor: "pointer",
    transition: "all 0.2s",
};

const nextBtnStyle = {
    background: "linear-gradient(90deg,#2B5BA8,#72b038)",
    border: "none",
    color: "#fff",
    fontFamily: "'Outfit',sans-serif",
    fontWeight: 700,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    padding: "14px 32px",
    borderRadius: 50,
    cursor: "pointer",
    transition: "all 0.2s",
    // boxShadow: "0 6px 24px rgba(43,91,168,0.35)",
};

function NavButtons({ onBack, onNext, nextDisabled, nextLabel = "Next →" }) {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={onBack} style={backBtnStyle}>← Back</button>
            <button
                onClick={onNext}
                disabled={nextDisabled}
                style={{ ...nextBtnStyle, opacity: nextDisabled ? 0.35 : 1, cursor: nextDisabled ? "not-allowed" : "pointer" }}
            >
                {nextLabel}
            </button>
        </div>
    );
}

function ResultCard({ label, children, hero }) {
    return (
        <div style={{
            borderRadius: 16,
            padding: 24,
            border: hero ? "1px solid #4a7fd4" : "1px solid rgba(43,91,168,0.28)",
            background: hero
                ? "linear-gradient(135deg,rgba(43,91,168,0.22),rgba(90,140,46,0.12))"
                : "rgba(15,36,71,0.72)",
            position: "relative",
            overflow: "hidden",
        }}>
            {hero && <div style={{ position: "absolute", top: "-50%", right: "-50%", width: "200%", height: "200%", background: "radial-gradient(ellipse at top right,rgba(90,140,46,0.08),transparent 60%)", pointerEvents: "none" }} />}
            {label && <div style={{ fontSize: 11, color: "#8999bb", textTransform: "uppercase", letterSpacing: 2, fontWeight: 600, marginBottom: 14 }}>{label}</div>}
            {children}
        </div>
    );
}

function BRow({ label, value }) {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid rgba(43,91,168,0.12)", fontSize: 13 }}>
            <span style={{ color: "#8999bb" }}>{label}</span>
            <span style={{ fontWeight: 600, color: "#fff", textAlign: "right", maxWidth: "55%" }}>{value}</span>
        </div>
    );
}

const TOTAL_STEPS = 7;
const INITIAL_DATA = {
    propertyType: null,
    monthlyBill: 135,
    roofArea: 30,
    systemType: null,
    sunlight: null,
    phase: null,
    priority: null,
};

function SolarEstimator({ startFromStep, onBack, embedded } = {}) {
    const [view, setView] = useState(startFromStep ? "wizard" : "intro");
    const [step, setStep] = useState(startFromStep || 1);
    const [data, setData] = useState({ ...INITIAL_DATA });
    const [results, setResults] = useState(null);
    const [pbWidth, setPbWidth] = useState(0);
    const mainRef = useRef(null);

    const scrollTop = () => mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });

    function startWiz() { setView("wizard"); setStep(1); }

    function restart() {
        setData({ ...INITIAL_DATA });
        setStep(1);
        setView(embedded ? "wizard" : "intro");
        setResults(null);
        setPbWidth(0);
    }

    function next() {
        if (step < TOTAL_STEPS) setStep((s) => s + 1);
        else {
            const r = calcResults(data);
            setResults(r);
            setView("results");
            scrollTop();
            setTimeout(() => setPbWidth(r.payPct), 400);
        }
    }

    function back() {
        if (step > 1) setStep((s) => s - 1);
        else if (onBack) onBack();
    }

    function pick(key, val) { setData((d) => ({ ...d, [key]: val })); }

    const progBars = Array.from({ length: TOTAL_STEPS }, (_, i) => {
        const idx = i + 1;
        if (idx < step) return "done";
        if (idx === step) return "active";
        return "idle";
    });

    const rootStyle = embedded
        ? { color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", overflow: "hidden", width: "100%" }
        : { minHeight: "100vh", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", overflowX: "hidden", background: "#07111f" };

    const mainStyle = embedded
        ? { position: "relative", zIndex: 10, width: "100%", padding: 0, margin: 0 }
        : { position: "relative", zIndex: 10, maxWidth: 860, margin: "0 auto", padding: "6rem 1.5rem 5rem" };

    return (
        <div style={rootStyle}>

            {/* Background elements — only when standalone */}
            {!embedded && <>
                <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, backgroundImage: "radial-gradient(rgba(43,91,168,0.15) 1px,transparent 1px)", backgroundSize: "36px 36px" }} />
                <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "rgba(43,91,168,0.12)", filter: "blur(130px)", top: -150, left: -150 }} />
                <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", pointerEvents: "none", zIndex: 0, background: "rgba(90,140,46,0.10)", filter: "blur(130px)", bottom: -100, right: -100 }} />
            </>}

            {/* Header — only when standalone */}
            {!embedded && (
                <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 32px", height: 68, borderBottom: "1px solid rgba(43,91,168,0.28)", background: "rgba(7,17,31,0.9)", backdropFilter: "blur(24px)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img src={LOGO_SRC} alt="Watten Power" style={{ height: 40, mixBlendMode: "screen" }} />
                        <span style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 20, letterSpacing: "-0.5px" }}>
                            <span style={{ color: "#4a7fd4" }}>Watten</span>{" "}
                            <span style={{ color: "#72b038" }}>Power</span>
                        </span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#8999bb", background: "rgba(43,91,168,0.12)", border: "1px solid rgba(43,91,168,0.28)", borderRadius: 50, padding: "6px 16px" }}>
                        ⚡ Solar Estimator
                    </div>
                </header>
            )}

            {/* Main */}
            <main ref={mainRef} style={mainStyle}>

                {/* ── INTRO ── */}
                {view === "intro" && (
                    <div style={{ textAlign: "center", padding: "48px 0", animation: "rise 0.5s ease both" }}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(90,140,46,0.32)", borderRadius: 50, padding: "8px 20px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#72b038", background: "rgba(90,140,46,0.15)", marginBottom: 28 }}>
                            <span style={{ animation: "pulse 2s infinite" }}>●</span> Free Instant Estimate
                        </div>
                        <h1 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, lineHeight: 1.04, letterSpacing: "-2.5px", marginBottom: 24, fontSize: "clamp(36px,6.5vw,66px)" }}>
                            Design your<br />
                            <span style={{ color: "#4a7fd4" }}>solar system</span><br />
                            <span style={{ color: "#72b038" }}>in 2 minutes.</span>
                        </h1>
                        <p style={{ fontSize: 17, color: "#8999bb", maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.75 }}>
                            Answer 7 quick questions. We instantly calculate your ideal system size, cost, monthly savings, and payback period — tailored for the UK.
                        </p>
                        <button onClick={startWiz} style={{ ...nextBtnStyle, fontSize: 15, padding: "17px 40px" }}>
                            Start My Free Estimate →
                        </button>
                        <div style={{ display: "flex", justifyContent: "center", marginTop: 56, background: "rgba(15,36,71,0.72)", border: "1px solid rgba(43,91,168,0.28)", borderRadius: 18, overflow: "hidden", flexWrap: "wrap" }}>
                            {[{ num: "Free", lbl: "Site Survey" }, { num: "0%", lbl: "VAT on Solar" }, { num: "25 yr", lbl: "Panel Warranty" }, { num: "24hr", lbl: "Response Time" }].map((s, i) => (
                                <div key={i} style={{ flex: "1 1 130px", padding: "24px 16px", textAlign: "center", borderRight: "1px solid rgba(43,91,168,0.28)" }}>
                                    <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 28, letterSpacing: "-1px", background: "linear-gradient(90deg,#4a7fd4,#72b038)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.num}</div>
                                    <div style={{ fontSize: 11, color: "#8999bb", marginTop: 4, fontWeight: 500, letterSpacing: 0.5 }}>{s.lbl}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* ── WIZARD ── */}
                {view === "wizard" && (
                    <div>
                        {/* Progress bar */}
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: embedded ? 24 : 40 }}>
                            <div style={{ display: "flex", gap: 6, flex: 1 }}>
                                {progBars.map((state, i) => (
                                    <div key={i} style={{
                                        flex: 1, height: 5, borderRadius: 3,
                                        background: state === "done" ? "#5A8C2E" : state === "active" ? "linear-gradient(90deg,#2B5BA8,#72b038)" : "rgba(43,91,168,0.2)",
                                        transition: "all 0.3s",
                                    }} />
                                ))}
                            </div>
                            <div style={{ fontSize: 12, color: "#8999bb", whiteSpace: "nowrap", fontWeight: 500 }}>
                                Step <strong style={{ color: "#72b038" }}>{step}</strong> / {TOTAL_STEPS}
                            </div>
                        </div>

                        {/* Q1 — Property Type */}
                        {step === 1 && (
                            <div style={{ animation: "rise 0.4s ease both" }}>
                                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>What type of property is this for?</p>
                                <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 28, lineHeight: 1.6 }}>Helps us understand your roof setup and any applicable UK schemes.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                                    {[
                                        { v: "residential", icon: "🏠", t: "Residential", d: "House, flat, bungalow" },
                                        { v: "commercial", icon: "🏢", t: "Commercial", d: "Office, shop, hotel, warehouse" },
                                    ].map(o => (
                                        <OptionCard key={o.v} icon={o.icon} title={o.t} desc={o.d}
                                            selected={data.propertyType === o.v}
                                            onClick={() => pick("propertyType", o.v)} />
                                    ))}
                                </div>
                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                    <button onClick={next} disabled={!data.propertyType}
                                        style={{ ...nextBtnStyle, opacity: !data.propertyType ? 0.35 : 1, cursor: !data.propertyType ? "not-allowed" : "pointer" }}>
                                        Next →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Q2 — Monthly Bill */}
                        {step === 2 && (
                            <SliderStep
                                question="What is your average monthly electricity bill?"
                                hint="Used to estimate your energy consumption. The UK average household spends around £135/month."
                                value={data.monthlyBill} min={30} max={3000} step={5}
                                prefix="£" unit="per month"
                                labels={["£30", "£1,500", "£3,000"]}
                                onBack={back}
                                onNext={(v, advance) => { pick("monthlyBill", v); if (advance) next(); }}
                            />
                        )}

                        {/* Q3 — Roof Area */}
                        {step === 3 && (
                            <SliderStep
                                question="How much roof or ground area is available?"
                                hint="You need approximately 8–10 sq. metres per 1 kW of solar capacity. A typical 4 kW home system needs ~28 m²."
                                value={data.roofArea} min={5} max={1000} step={5}
                                prefix="" unit="square metres (m²)"
                                labels={["5 m²", "500 m²", "1,000 m²"]}
                                onBack={back}
                                onNext={(v, advance) => { pick("roofArea", v); if (advance) next(); }}
                            />
                        )}

                        {/* Q4 — System Type */}
                        {step === 4 && (
                            <div style={{ animation: "rise 0.4s ease both" }}>
                                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>What type of solar system do you need?</p>
                                <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 28, lineHeight: 1.6 }}>Most UK homes go grid-tied or hybrid with battery storage for evening use.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
                                    {[
                                        { v: "grid-tied", icon: "🔌", t: "Grid-Tied", d: "Lowest cost. Exports surplus to grid via SEG. No power in outage." },
                                        { v: "hybrid", icon: "⚡", t: "Hybrid + Battery", d: "Store daytime solar for evening use. Best self-sufficiency." },
                                        { v: "off-grid", icon: "🏡", t: "Off-Grid", d: "Fully independent. Ideal for rural or remote properties." },
                                    ].map(o => (
                                        <OptionCard key={o.v} icon={o.icon} title={o.t} desc={o.d}
                                            selected={data.systemType === o.v}
                                            onClick={() => pick("systemType", o.v)} />
                                    ))}
                                </div>
                                <NavButtons onBack={back} onNext={next} nextDisabled={!data.systemType} />
                            </div>
                        )}

                        {/* Q5 — Location */}
                        {step === 5 && (
                            <div style={{ animation: "rise 0.4s ease both" }}>
                                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>Where in England is the property located?</p>
                                <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 28, lineHeight: 1.6 }}>Solar irradiance varies across England — the South West receives more sunshine than the North.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                                    {[
                                        { v: "sw", icon: "🌞", t: "South West England", d: "Cornwall, Devon, Bristol, Somerset (~4.0 hrs/day)" },
                                        { v: "se", icon: "☀️", t: "South East & East England", d: "London, Kent, Essex, Cambridge (~3.5 hrs/day)" },
                                        { v: "midlands", icon: "🌤️", t: "Midlands", d: "Birmingham, Coventry, Leicester, Nottingham (~3.1 hrs/day)" },
                                        { v: "north", icon: "⛅", t: "North England", d: "Manchester, Leeds, Sheffield, Newcastle (~2.7 hrs/day)" },
                                    ].map(o => (
                                        <OptionCard key={o.v} icon={o.icon} title={o.t} desc={o.d}
                                            selected={data.sunlight === o.v}
                                            onClick={() => pick("sunlight", o.v)} />
                                    ))}
                                </div>
                                <NavButtons onBack={back} onNext={next} nextDisabled={!data.sunlight} />
                            </div>
                        )}

                        {/* Q6 — Phase */}
                        {step === 6 && (
                            <div style={{ animation: "rise 0.4s ease both" }}>
                                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>What is your electricity supply phase?</p>
                                <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 28, lineHeight: 1.6 }}>Most UK homes are single phase. Check your fuse box or ask your DNO if unsure.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                                    {[
                                        { v: "single", icon: "🔋", t: "Single Phase", d: "Most UK homes — supports systems up to ~3.68 kW per inverter" },
                                        { v: "three", icon: "⚡", t: "Three Phase", d: "Larger homes & commercial — supports higher capacity systems" },
                                    ].map(o => (
                                        <OptionCard key={o.v} icon={o.icon} title={o.t} desc={o.d}
                                            selected={data.phase === o.v}
                                            onClick={() => pick("phase", o.v)} />
                                    ))}
                                </div>
                                <NavButtons onBack={back} onNext={next} nextDisabled={!data.phase} />
                            </div>
                        )}

                        {/* Q7 — Priority */}
                        {step === 7 && (
                            <div style={{ animation: "rise 0.4s ease both" }}>
                                <p style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 800, fontSize: "clamp(18px,3vw,26px)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.2, color: "#fff" }}>What matters most to you?</p>
                                <p style={{ fontSize: 13, color: "#8999bb", marginBottom: 28, lineHeight: 1.6 }}>This helps us select the right panel technology and inverter for your needs.</p>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 28 }}>
                                    {[
                                        { v: "savings", icon: "💰", t: "Best Savings", d: "Fastest payback, maximise long-term ROI" },
                                        { v: "performance", icon: "🚀", t: "Top Performance", d: "Premium panels — better output in low UK light" },
                                        { v: "budget", icon: "🎯", t: "Lowest Upfront Cost", d: "Affordable entry, solid UK-certified quality" },
                                    ].map(o => (
                                        <OptionCard key={o.v} icon={o.icon} title={o.t} desc={o.d}
                                            selected={data.priority === o.v}
                                            onClick={() => pick("priority", o.v)} />
                                    ))}
                                </div>
                                <NavButtons onBack={back} onNext={next} nextDisabled={!data.priority} nextLabel="Calculate My System →" />
                            </div>
                        )}
                    </div>
                )}

                {/* ── RESULTS ── */}
                {view === "results" && results && (
                    <div style={{ animation: "rise 0.5s ease both" }}>
                        {/* Hero header */}
                        <div style={{ textAlign: "center", paddingBottom: 36 }}>
                            <div style={{ width: 72, height: 72, border: "2px solid rgba(90,140,46,0.32)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px", background: "rgba(90,140,46,0.15)" }}>✅</div>
                            <h2 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 10, fontSize: "clamp(22px,4vw,38px)", color: "#fff" }}>
                                Your <em style={{ fontStyle: "normal", color: "#72b038" }}>Custom</em> Solar Estimate
                            </h2>
                            <p style={{ color: "#8999bb", fontSize: 14 }}>Tailored for the UK — here is what Watten Power recommends for you.</p>
                        </div>

                        {/* Cost card */}
                        <div style={{ marginBottom: 12 }}>
                            <ResultCard hero label="💰 Estimated Total System Cost">
                                <div style={{ display: "flex", gap: 0, alignItems: "stretch", flexWrap: "wrap" }}>
                                    <div style={{ flex: 1, minWidth: 120 }}>
                                        <div style={{ fontSize: 11, color: "#8999bb", marginBottom: 6, fontWeight: 500 }}>Minimum estimate</div>
                                        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,38px)", letterSpacing: "-1px", lineHeight: 1, background: "linear-gradient(90deg,#4a7fd4,#72b038)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{results.cmin}</div>
                                    </div>
                                    <div style={{ display: "flex", alignItems: "center", padding: "0 20px", color: "#8999bb", fontSize: 24 }}>–</div>
                                    <div style={{ flex: 1, minWidth: 120 }}>
                                        <div style={{ fontSize: 11, color: "#8999bb", marginBottom: 6, fontWeight: 500 }}>Maximum estimate</div>
                                        <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,38px)", letterSpacing: "-1px", lineHeight: 1, background: "linear-gradient(90deg,#4a7fd4,#72b038)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{results.cmax}</div>
                                    </div>
                                </div>
                                <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 14, fontSize: 13, color: "#72b038", lineHeight: 1.6, padding: "12px 16px", borderRadius: 12, border: "1px solid rgba(90,140,46,0.4)", background: "rgba(90,140,46,0.15)" }}>
                                    {results.schemeText}
                                </div>
                            </ResultCard>
                        </div>

                        {/* 2-col stats */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                            <ResultCard label="⚡ System Size">
                                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,36px)", letterSpacing: "-1px", lineHeight: 1, color: "#fff" }}>{results.ssize}</div>
                                <div style={{ fontSize: 13, color: "#8999bb", marginTop: 8 }}>{results.panels}</div>
                            </ResultCard>
                            <ResultCard label="📉 Monthly Savings">
                                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,36px)", letterSpacing: "-1px", lineHeight: 1, color: "#72b038" }}>{results.msave}</div>
                                <div style={{ fontSize: 13, color: "#8999bb", marginTop: 8 }}>{results.asave}</div>
                            </ResultCard>
                            <ResultCard label="📅 Payback Period">
                                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,36px)", letterSpacing: "-1px", lineHeight: 1, color: "#fff" }}>{results.payback}</div>
                                <div style={{ height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden", marginTop: 12 }}>
                                    <div style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg,#4a7fd4,#72b038)", width: `${pbWidth}%`, transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
                                </div>
                                <div style={{ fontSize: 13, color: "#8999bb", marginTop: 8 }}>Out of 25-year panel life</div>
                            </ResultCard>
                            <ResultCard label="🌍 CO₂ Saved (25 yrs)">
                                <div style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: "clamp(28px,4vw,36px)", letterSpacing: "-1px", lineHeight: 1, color: "#72b038" }}>{results.co2}</div>
                                <div style={{ fontSize: 13, color: "#8999bb", marginTop: 8 }}>{results.trees}</div>
                            </ResultCard>
                        </div>

                        {/* Breakdown */}
                        <div style={{ marginBottom: 12 }}>
                            <ResultCard label="📋 System Breakdown">
                                <BRow label="System Type" value={results.btype} />
                                <BRow label="Panel Technology" value={results.bpanel} />
                                <BRow label="Inverter" value={results.binv} />
                                <BRow label="Battery Storage" value={results.bbat} />
                                <BRow label="Annual Generation" value={results.bgen} />
                                <BRow label="SEG Export Earnings" value={results.bseg} />
                                <BRow label="Electricity Phase" value={results.bph} />
                            </ResultCard>
                        </div>

                        {/* CTA */}
                        <div style={{ position: "relative", overflow: "hidden", borderRadius: 18, padding: embedded ? "32px 24px" : "44px 40px", textAlign: "center", border: "1px solid rgba(43,91,168,0.28)", background: "linear-gradient(135deg,rgba(43,91,168,0.18),rgba(90,140,46,0.12))", marginBottom: 24 }}>
                            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 0%,rgba(90,140,46,0.1),transparent 70%)", pointerEvents: "none" }} />
                            <h3 style={{ fontFamily: "'Outfit',sans-serif", fontWeight: 900, fontSize: 24, letterSpacing: "-0.5px", marginBottom: 10, position: "relative", color: "#fff" }}>Ready for a precise quote?</h3>
                            <p style={{ color: "#8999bb", fontSize: 13, lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px", position: "relative" }}>
                                Our MCS-certified engineers will survey your property and deliver a detailed, no-obligation proposal — completely free of charge.
                            </p>
                            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
                                <button
                                    onClick={() => alert("Thank you! Our Watten Power team will be in touch within 24 hours.")}
                                    style={{ ...nextBtnStyle, fontSize: 14, padding: "16px 36px" }}>
                                    Book Free Survey →
                                </button>
                                <button onClick={restart} style={{ background: "transparent", border: "1px solid rgba(43,91,168,0.28)", color: "#fff", fontFamily: "'Outfit',sans-serif", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1, padding: "14px 28px", borderRadius: 50, cursor: "pointer", transition: "all 0.2s" }}>
                                    Recalculate
                                </button>
                            </div>
                        </div>

                        {/* Disclaimer */}
                        <div style={{ textAlign: "center", fontSize: 11, color: "#8999bb", lineHeight: 2, padding: "0 20px 20px" }}>
                            * Estimates are indicative, based on average England market rates and Ofgem tariff data (2024–25).<br />
                            Electricity unit rate assumed at 29p/kWh. SEG rate at 20p/kWh (illustrative).<br />
                            Typical payback period: 5–7 years depending on location, system type, and usage profile.<br />
                            VAT at 0% applies to residential solar installations in Great Britain.
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800;900&display=swap');
                @keyframes rise {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
                input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #5A8C2E;
    border: 2px solid #fff;
    cursor: pointer;
    margin-top: -6px;
}
input[type=range]::-webkit-slider-runnable-track {
    border-radius: 3px;
    height: 6px;
    background: transparent;
}
input[type=range]::-moz-range-thumb {
    width: 18px; height: 18px;
    border-radius: 50%;
    background: #5A8C2E;
    border: 2px solid #fff;
    cursor: pointer;
}
input[type=range]::-moz-range-track {
    height: 6px;
    border-radius: 3px;
    background: transparent;
}
                @media (max-width: 500px) {
                    .se-grid-3 { grid-template-columns: 1fr !important; }
                    .se-grid-2 { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}

export { SolarEstimator as SolarEstimatorWizard };
export default SolarEstimator;