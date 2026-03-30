import { useState, useEffect } from "react";

/* ─── INJECT FONTS & BASE STYLES ─────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("ar-global-styles")) return;
  const s = document.createElement("style");
  s.id = "ar-global-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Syne:wght@500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    :root {
      --bg:       #0a0a0a;
      --surface:  #111111;
      --surface2: #181818;
      --border:   #222222;
      --border2:  #2c2c2c;
      --accent:   #c8f135;
      --blue:     #5bc8f5;
      --muted:    #4a4a4a;
      --text:     #e2e2e2;
      --text2:    #888888;
      --text3:    #555555;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'DM Sans', system-ui, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }
    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    .mono    { font-family: 'JetBrains Mono', monospace !important; }
    .display { font-family: 'Syne', sans-serif !important; }

    @keyframes fadeUp  { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn  { from { opacity:0; } to { opacity:1; } }
    @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0;} }
    @keyframes pulse-ring {
      0%   { box-shadow: 0 0 0 0   rgba(200,241,53,.5); }
      70%  { box-shadow: 0 0 0 8px rgba(200,241,53,0);  }
      100% { box-shadow: 0 0 0 0   rgba(200,241,53,0);   }
    }

    .blink      { animation: blink 1.2s step-end infinite; }
    .pulse-ring { animation: pulse-ring 2.2s infinite; }

    .ar-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 14px;
      transition: border-color .22s, transform .22s, box-shadow .22s;
      position: relative;
    }
    .ar-card:hover {
      border-color: rgba(200,241,53,.22);
      transform: translateY(-2px);
      box-shadow: 0 12px 40px rgba(0,0,0,.5);
    }

    .chip {
      display: inline-flex; align-items: center;
      padding: 4px 11px;
      background: var(--surface2);
      border: 1px solid var(--border2);
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px; color: var(--text3); letter-spacing: .3px;
      transition: all .15s; cursor: default; white-space: nowrap;
    }
    .chip:hover { border-color: rgba(200,241,53,.4); color: var(--accent); background: rgba(200,241,53,.05); }

    .nav-a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10.5px; letter-spacing: 1.2px; text-transform: uppercase;
      color: var(--text3); text-decoration: none;
      transition: color .18s; position: relative; padding-bottom: 2px;
    }
    .nav-a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--accent); transition:width .22s; }
    .nav-a:hover { color: #bbb; }
    .nav-a:hover::after { width: 100%; }

    .glow-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(200,241,53,.2), transparent); margin: 20px 0; }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9.5px; letter-spacing: 3.5px; text-transform: uppercase;
      color: var(--accent); margin-bottom: 12px; display: block;
    }

    .proj-tab {
      font-family: 'JetBrains Mono', monospace; font-size: 10.5px;
      background: transparent; border: 1px solid var(--border2);
      color: var(--text3); border-radius: 8px; padding: 8px 14px;
      cursor: pointer; white-space: nowrap; letter-spacing: .3px;
      transition: all .18s;
    }
    .proj-tab:hover  { border-color: rgba(200,241,53,.25); color: #999; }
    .proj-tab.active { background: rgba(200,241,53,.08); border-color: rgba(200,241,53,.45); color: var(--accent); }

    .cert-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; overflow: hidden; cursor: pointer;
      transition: all .22s;
    }
    .cert-card:hover { border-color: rgba(200,241,53,.32); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,.5); }

    .cert-modal-backdrop {
      position: fixed; inset: 0; z-index: 999;
      background: rgba(0,0,0,.92); backdrop-filter: blur(14px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
      animation: fadeIn .18s ease;
    }

    .noise {
      position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: .016;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      background-size: 180px;
    }

    .quiet-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1.5px; color: #3a3a3a;
      text-decoration: none; text-transform: uppercase;
      border-bottom: 1px solid #242424; padding-bottom: 1px;
      transition: color .18s, border-color .18s;
    }
    .quiet-link:hover { color: var(--accent); border-color: var(--accent); }

    .contact-row {
      display: flex; justify-content: space-between; align-items: center;
      width: 100%; max-width: 480px;
      padding: 16px 22px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; text-decoration: none;
      transition: all .18s;
    }
    .contact-row:hover { border-color: rgba(200,241,53,.28); background: rgba(200,241,53,.022); }

    .highlight-row {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 13px 15px;
      background: var(--surface2); border: 1px solid var(--border); border-radius: 10px;
      transition: border-color .18s;
    }
    .highlight-row:hover { border-color: rgba(200,241,53,.16); }

    @media (max-width: 640px) {
      .hide-sm { display: none !important; }
      .proj-tab { font-size: 10px; padding: 7px 10px; }
    }
    @media (min-width: 641px) {
      .show-sm { display: none !important; }
    }
  `;
  document.head.appendChild(s);
};

/* ─── BASE PATH ────────────────────────────────────────────────────────────── */
const BASE_URL = (() => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const b = import.meta.env.BASE_URL ?? "/";
    return b === "/" ? "" : b.replace(/\/$/, "");
  }
  return (typeof process !== "undefined" && process.env?.PUBLIC_URL) || "";
})();

const asset = (path) => `${BASE_URL}${path}`;

/* ─── DATA ─────────────────────────────────────────────────────────────────── */

// ✅ File names exactly match public/data/ — DSA.png, Java.png, etc.
const CERTS = [
  { name: "Data Structures & Algorithms", issuer: "Scaler · NSDC", file: "DSA.png",        color: "#c8f135" },
  { name: "Java",                          issuer: "Scaler · NSDC", file: "Java.png",       color: "#5bc8f5" },
  { name: "Javascript",                    issuer: "Scaler · NSDC", file: "Javascript.png", color: "#f7c948" },
  { name: "Low Level Design",              issuer: "Scaler · NSDC", file: "LLD.png",        color: "#b57bee" },
  { name: "Databases & SQL",               issuer: "Scaler · NSDC", file: "SQL.png",        color: "#ff9757" },
];

const SKILL_GROUPS = [
  { label: "Backend",       color: "#c8f135", items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "gRPC", "Microservices", "JWT / OAuth2"] },
  { label: "AI & Agentic",  color: "#b57bee", items: ["LLM APIs", "Tool Calling", "Prompt Engineering", "Voice AI Pipelines", "FastAPI", "Deepgram", "Groq"] },
  { label: "Messaging",     color: "#ff9757", items: ["Apache Kafka", "RabbitMQ", "Event-Driven Arch"] },
  { label: "Databases",     color: "#5bc8f5", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Aerospike", "Oracle SQL"] },
  { label: "DevOps & Cloud",color: "#ff9757", items: ["Docker", "Kubernetes", "AWS S3", "CI/CD", "NGINX", "ELK Stack", "Prometheus", "New Relic"] },
  { label: "Frontend",      color: "#38d9a9", items: ["React.js", "React Native", "Tailwind CSS", "HTML / CSS", "TypeScript"] },
  { label: "Languages",     color: "#f7c948", items: ["Java", "JavaScript", "TypeScript", "C++", "Python"] },
];

const PROJECTS = [
  {
    id: "01", title: "AI Cold Calling Agent", sub: "Voice AI · Agentic Systems", accent: "#b57bee",
    stack: ["Python", "FastAPI", "Groq Llama 3", "Deepgram", "Pipecat", "React"],
    desc: "Real-time AI voice agent conducting full cold-call simulations end-to-end — STT → LLM dialogue → TTS in under 200 ms.",
    points: [
      "Agentic workflow with tool-calling to classify call outcomes into structured JSON",
      "Singleton pattern for efficient shared LLM & pipeline instance management",
      "FastAPI async backend with timeout protection & graceful fault handling",
      "Deepgram STT + Groq Llama 3 + Pipecat for sub-200 ms full-duplex voice pipeline",
      "React dashboard to trigger simulations and visualise call analytics",
    ],
  },
  {
    id: "02", title: "Distributed Healthcare System", sub: "Microservices · Java · Kafka", accent: "#c8f135",
    stack: ["Java", "Spring Boot", "Kafka", "gRPC", "Docker", "PostgreSQL"],
    desc: "Production-grade distributed platform modularising healthcare workflows using Domain-Driven Design and clean service boundaries.",
    points: [
      "API Gateway + service discovery + centralised config for reliable orchestration",
      "gRPC inter-service calls for low-latency synchronous communication",
      "Kafka event bus for async communication across all microservices",
      "Service-level DB ownership ensuring data isolation (Domain-Driven Design)",
      "Strategy & Adapter patterns decoupling logic from external integrations",
    ],
  },
  {
    id: "03", title: "Kaveri", sub: "Enterprise Operations Platform", accent: "#5bc8f5",
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "ELK Stack", "Prometheus"],
    desc: "Internal enterprise platform handling compliance-heavy operational workflows with a strong focus on observability and reliability.",
    points: [
      "Kafka-based audit logs and reporting pipelines for full operational traceability",
      "Designed REST APIs for compliance-heavy workflows with structured validation",
      "Reduced production issues by 30% through Prometheus & ELK-based observability",
      "Structured logging and alerting pipelines for faster incident diagnosis",
      "Optimised database queries and backend workflows for measurable response time gains",
    ],
  },
  {
    id: "04", title: "Gia School Platform", sub: "EdTech · Full-Stack", accent: "#ff9757",
    stack: ["Node.js", "React", "React Native", "Docker", "AWS S3", "Nginx"],
    desc: "Scalable education platform handling thousands of concurrent learners — courses, enrollment, payments, and notifications.",
    points: [
      "Role-based access control (admin/user), JWT auth, payment integration",
      "SMS notifications, AWS S3 file handling, SQL-backed persistence",
      "40% performance improvement via async processing & Kafka-powered events",
      "Containerised with Docker, deployed via Nginx & AWS CI/CD pipelines",
      "React (Vite) frontend with reusable component system and API service layers",
    ],
  },
];

/* ─── NAV ─────────────────────────────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    ["#experience", "Experience"], ["#projects", "Projects"],
    ["#skills", "Skills"], ["#certs", "Certs"], ["#contact", "Contact"],
  ];

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      padding: "0 clamp(20px,6vw,64px)", height: 56,
      background: scrolled ? "rgba(10,10,10,.95)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid #1a1a1a" : "none",
      transition: "all .3s",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <span className="mono" style={{ fontSize: 13, color: "#c8f135", letterSpacing: 2 }}>
        AR<span style={{ color: "#2a2a2a" }}>.dev</span>
      </span>

      <div className="hide-sm" style={{ display: "flex", gap: 30 }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className="nav-a">{label}</a>
        ))}
      </div>

      {/* ✅ Fixed: lowercase filename matches public/data/ashhar-raza.pdf */}
      <a href={asset("/data/ashhar-raza.pdf")} target="_blank" rel="noreferrer" className="quiet-link hide-sm">
        Resume ↗
      </a>

      <button className="show-sm" onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", color: "#999", fontSize: 18, cursor: "pointer" }}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: 56, left: 0, right: 0,
          background: "#0a0a0a", borderBottom: "1px solid #1a1a1a",
          padding: "24px clamp(20px,6vw,64px)",
          display: "flex", flexDirection: "column", gap: 22,
        }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-a" style={{ fontSize: 12 }}
              onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href={asset("/data/ashhar-raza.pdf")} target="_blank" rel="noreferrer"
            className="quiet-link" style={{ fontSize: 10 }}>Resume ↗</a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ────────────────────────────────────────────────────────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Software Engineer";
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setTyped(full.slice(0, ++i));
        if (i >= full.length) clearInterval(iv);
      }, 60);
      return () => clearInterval(iv);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      padding: "clamp(110px,14vh,150px) clamp(24px,8vw,110px) clamp(60px,8vh,90px)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* grid bg */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 0,
        backgroundImage: `linear-gradient(rgba(200,241,53,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(200,241,53,.055) 1px,transparent 1px)`,
        backgroundSize: "64px 64px",
        WebkitMask: "radial-gradient(ellipse 75% 75% at 28% 45%, black 25%, transparent 100%)",
        mask: "radial-gradient(ellipse 75% 75% at 28% 45%, black 25%, transparent 100%)",
      }} />
      {/* glow */}
      <div style={{
        position: "absolute", top: "0%", left: "-12%", width: "550px", height: "550px",
        background: "radial-gradient(circle,rgba(200,241,53,.07) 0%,transparent 65%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>

        <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 40 }}>
          <span className="pulse-ring" style={{
            display: "inline-block", width: 7, height: 7,
            borderRadius: "50%", background: "#c8f135",
          }} />
          <span className="mono" style={{ fontSize: 9.5, color: "#3a3a3a", letterSpacing: 3 }}>
            BENGALURU · OPEN TO RELOCATION
          </span>
        </div>

        <h1 className="display" style={{
          fontSize: "clamp(58px,10.5vw,112px)", fontWeight: 800,
          lineHeight: .92, letterSpacing: -3, color: "#f0f0f0", marginBottom: 4,
        }}>Ashhar</h1>
        <h1 className="display" style={{
          fontSize: "clamp(58px,10.5vw,112px)", fontWeight: 800,
          lineHeight: .92, letterSpacing: -3, marginBottom: 36,
          background: "linear-gradient(125deg,#c8f135 0%,#5bc8f5 70%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        }}>Raza</h1>

        <p className="mono" style={{ fontSize: "clamp(11px,1.4vw,13.5px)", color: "#c8f135", marginBottom: 24, letterSpacing: 1.5 }}>
          {typed}{typed.length < full.length && <span className="blink" style={{ marginLeft: 1 }}>▊</span>}
        </p>

        {/* bio */}
        <p style={{
          fontFamily: "'DM Sans',sans-serif", fontWeight: 300,
          maxWidth: 500, lineHeight: 1.82, color: "#666",
          fontSize: "clamp(14px,1.6vw,16px)", marginBottom: 30,
        }}>
          I build distributed systems that hold up at scale — Java & Spring Boot backend,
          event-driven architecture with Kafka, AI pipelines, and cloud-native deployments.
          2+ years shipping production across enterprise and ed-tech.
        </p>

        {/* value props */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 50, maxWidth: 450 }}>
          {[
            ["🏗️", "Backend-first — APIs, microservices, clean architecture"],
            ["⚡", "Observability-minded — I reduce incidents, not just ship features"],
            ["🤖", "Building with AI — voice agents, LLM tool-calling, agentic systems"],
          ].map(([icon, text]) => (
            <div key={text} style={{
              display: "flex", gap: 11, alignItems: "center",
              padding: "10px 15px",
              background: "rgba(255,255,255,.018)",
              border: "1px solid #1e1e1e", borderRadius: 9,
            }}>
              <span style={{ fontSize: 14 }}>{icon}</span>
              <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, color: "#666", lineHeight: 1.5, fontWeight: 300 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* metrics */}
        <div style={{ display: "flex", gap: "clamp(22px,4vw,50px)", flexWrap: "wrap" }}>
          {[["8+", "Production\nSystems"], ["500+", "DSA\nProblems"], ["2+", "Years\nExp"], ["30%", "MTTR\nCut"]].map(([val, lbl]) => (
            <div key={val}>
              <div className="display" style={{
                fontSize: "clamp(28px,4vw,44px)", fontWeight: 800,
                color: "#c8f135", lineHeight: 1,
              }}>{val}</div>
              <div className="mono" style={{
                fontSize: 8.5, color: "#333", marginTop: 7,
                letterSpacing: 1.8, whiteSpace: "pre",
              }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" style={{ padding: "90px clamp(24px,8vw,110px)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <span className="section-label">Work History</span>
        <h2 className="display" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, marginBottom: 36, letterSpacing: -1 }}>
          Professional Experience
        </h2>

        <div className="ar-card" style={{ padding: "clamp(22px,4vw,36px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 8 }}>
            <div>
              <p className="mono" style={{ fontSize: 9.5, color: "#c8f135", letterSpacing: 2.5, marginBottom: 10 }}>OCT 2023 — PRESENT</p>
              <h3 className="display" style={{ fontSize: "clamp(18px,2.3vw,24px)", fontWeight: 700 }}>Software Developer</h3>
              <p className="mono" style={{ fontSize: 11, color: "#4a4a4a", marginTop: 5 }}>Peol Technologies · Bangalore, India</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignSelf: "flex-start" }}>
              {["Java", "Spring Boot", "Kafka", "Redis", "Docker", "K8s", "AWS", "Prometheus"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          {/* impact numbers */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "20px 0" }}>
            {[["30%", "MTTR reduction"], ["20%", "faster delivery"], ["8+", "systems shipped"]].map(([val, lbl]) => (
              <div key={val} style={{
                padding: "9px 16px",
                background: "rgba(200,241,53,.05)",
                border: "1px solid rgba(200,241,53,.13)",
                borderRadius: 9,
                display: "flex", gap: 8, alignItems: "baseline",
              }}>
                <span className="display" style={{ color: "#c8f135", fontSize: 20, fontWeight: 800 }}>{val}</span>
                <span className="mono" style={{ color: "#3a3a3a", fontSize: 8.5, letterSpacing: 1 }}>{lbl.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div className="glow-line" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 10 }}>
            {[
              ["⚙️", "Shipped 8+ full-stack production apps using Java, Node.js, React, and React Native."],
              ["📐", "Applied OOP & SOLID principles — cut duplication, accelerated feature delivery by 20%."],
              ["🔭", "Established observability via Prometheus, ELK Stack & New Relic — cut MTTR by 30%."],
              ["🤝", "Mentored junior engineers through code reviews and architecture discussions."],
              ["🏗️", "Engineered high-concurrency backend services handling async workloads at scale."],
              ["🌐", "Designed RESTful APIs backed by SQL & NoSQL — improved throughput and consistency."],
            ].map(([icon, text], i) => (
              <div key={i} className="highlight-row">
                <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "#777", fontWeight: 300 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* education */}
        <div className="ar-card" style={{ padding: "22px clamp(20px,3vw,32px)", marginTop: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <div>
              <p className="mono" style={{ fontSize: 9, color: "#5bc8f5", letterSpacing: 3, marginBottom: 8 }}>EDUCATION</p>
              <h4 className="display" style={{ fontSize: "clamp(14px,1.8vw,18px)", fontWeight: 700 }}>
                B.E. Computer Science & Engineering
              </h4>
              <p className="mono" style={{ fontSize: 10.5, color: "#444", marginTop: 4 }}>
                Visvesvaraya Technological University · 2019 – 2023
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="display" style={{ fontSize: 30, fontWeight: 800, color: "#5bc8f5" }}>8.0</div>
              <div className="mono" style={{ fontSize: 8.5, color: "#333", letterSpacing: 1.5 }}>CGPA / 10</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ────────────────────────────────────────────────────────────── */
function Projects() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <section id="projects" style={{ padding: "90px clamp(24px,8vw,110px)", background: "rgba(255,255,255,.008)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <span className="section-label">What I've Built</span>
        <h2 className="display" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>
          Featured Projects
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#484848", fontSize: 14, marginBottom: 28, fontWeight: 300 }}>
          A cross-section of backend systems, AI pipelines, and full-stack platforms.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 22 }}>
          {PROJECTS.map((pr, i) => (
            <button key={i} className={`proj-tab${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
              {pr.id} {pr.title}
            </button>
          ))}
        </div>

        <div className="ar-card" key={active} style={{
          padding: "clamp(22px,4vw,36px)",
          borderColor: p.accent + "40",
          background: `linear-gradient(135deg,${p.accent}05,#111111)`,
          animation: "fadeUp .3s ease both",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
            <div>
              <p className="mono" style={{ fontSize: 9, color: p.accent, letterSpacing: 2.5, marginBottom: 8 }}>
                {p.sub.toUpperCase()}
              </p>
              <h3 className="display" style={{ fontSize: "clamp(20px,2.8vw,28px)", fontWeight: 700, letterSpacing: -.5 }}>
                {p.title}
              </h3>
            </div>
            <div className="display" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 800, color: p.accent + "12", lineHeight: 1, alignSelf: "flex-end" }}>
              {p.id}
            </div>
          </div>

          <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#5a5a5a", lineHeight: 1.82, fontSize: 14.5, marginBottom: 18, maxWidth: 540, fontWeight: 300 }}>
            {p.desc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 18 }}>
            {p.stack.map(t => (
              <span key={t} className="chip" style={{ borderColor: p.accent + "28", color: p.accent + "bb" }}>{t}</span>
            ))}
          </div>

          <div className="glow-line" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 8 }}>
            {p.points.map((pt, i) => (
              <div key={i} className="highlight-row">
                <span className="mono" style={{ color: p.accent, fontSize: 11, marginTop: 3, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "#777", fontWeight: 300 }}>{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ──────────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" style={{ padding: "90px clamp(24px,8vw,110px)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <span className="section-label">Technical Stack</span>
        <h2 className="display" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>
          Skills & Technologies
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#484848", fontSize: 14, marginBottom: 32, fontWeight: 300 }}>
          Depth across the stack — from JVM internals to browser rendering.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(230px,1fr))", gap: 12 }}>
          {SKILL_GROUPS.map(({ label, color, items }) => (
            <div key={label} className="ar-card" style={{ padding: "18px 20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 3, height: 13, borderRadius: 2, background: color, flexShrink: 0 }} />
                <span className="mono" style={{ fontSize: 8.5, color, letterSpacing: 2.5 }}>{label.toUpperCase()}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map(item => <span key={item} className="chip">{item}</span>)}
              </div>
            </div>
          ))}
        </div>

        {/* DSA callout */}
        <div className="ar-card" style={{
          marginTop: 14, padding: "22px 24px",
          background: "linear-gradient(135deg,rgba(200,241,53,.03),rgba(91,200,245,.03))",
          borderColor: "rgba(200,241,53,.14)",
          display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap",
        }}>
          <span style={{ fontSize: 26 }}>🏆</span>
          <div style={{ flex: 1 }}>
            <h4 className="display" style={{ fontSize: 16, fontWeight: 700, marginBottom: 5 }}>Competitive Programming</h4>
            <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#555", fontSize: 13.5, lineHeight: 1.7, fontWeight: 300 }}>
              <span style={{ color: "#c8f135" }}>500+ problems</span> on LeetCode & CodeChef.
              DSA, OOP, and System Design applied consistently in production code.
            </p>
          </div>
          <a href="https://leetcode.com/u/raza_ashhar/" target="_blank" rel="noreferrer"
            className="quiet-link" style={{ fontSize: 9.5 }}>LeetCode ↗</a>
        </div>

        {/* Working style */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: 10 }}>
          {[
            { icon: "🔍", title: "Debugging mindset", desc: "I look for root causes, not quick patches." },
            { icon: "📖", title: "Documentation first", desc: "Clean READMEs and inline docs by default." },
            { icon: "🔄", title: "Iterates fast", desc: "Ship, observe, improve. Comfortable with ambiguity." },
            { icon: "🧩", title: "Systems thinker", desc: "Design decisions made with the whole in mind." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="ar-card" style={{ padding: "16px 18px" }}>
              <span style={{ fontSize: 18, display: "block", marginBottom: 9 }}>{icon}</span>
              <h5 className="display" style={{ fontSize: 13, fontWeight: 700, marginBottom: 5, color: "#ccc" }}>{title}</h5>
              <p style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12.5, color: "#484848", lineHeight: 1.68, fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ──────────────────────────────────────────────────────── */
function Certifications() {
  const [modal, setModal] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <section id="certs" style={{ padding: "90px clamp(24px,8vw,110px)", background: "rgba(255,255,255,.008)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <span className="section-label">Verified Skills</span>
        <h2 className="display" style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 700, marginBottom: 8, letterSpacing: -1 }}>
          Certifications
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#484848", fontSize: 14, marginBottom: 36, fontWeight: 300 }}>
          Issued by <span style={{ color: "#5bc8f5" }}>Scaler</span> &amp; co-certified by{" "}
          <span style={{ color: "#5bc8f5" }}>NSDC</span>. Click any card to view.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(165px,25%,220px),1fr))", gap: 12 }}>
          {CERTS.map((c) => (
            <div key={c.file} className="cert-card" onClick={() => setModal(c)}>
              <div style={{
                height: 125, overflow: "hidden", position: "relative",
                background: "#0d0d0d", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {imgErrors[c.file] ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: c.color + "22", border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <span style={{ fontSize: 14 }}>📜</span>
                    </div>
                    <span className="mono" style={{ fontSize: 8.5, color: "#333", letterSpacing: 1 }}>NO PREVIEW</span>
                  </div>
                ) : (
                  <img
                    src={asset(`/data/${c.file}`)}
                    alt={c.name}
                    onError={() => setImgErrors(prev => ({ ...prev, [c.file]: true }))}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .65, transition: "opacity .22s, transform .28s" }}
                    onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.target.style.opacity = .65; e.target.style.transform = "scale(1)"; }}
                  />
                )}
                <div style={{
                  position: "absolute", inset: 0, background: "rgba(0,0,0,.5)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: 0, transition: "opacity .18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
                >
                  <span className="mono" style={{ fontSize: 9.5, color: "#fff", letterSpacing: 2 }}>VIEW ↗</span>
                </div>
              </div>
              <div style={{ padding: "13px 15px" }}>
                <div style={{ width: 24, height: 2, borderRadius: 1, background: c.color, marginBottom: 9 }} />
                <h4 style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 4, color: "#ddd" }}>{c.name}</h4>
                <p className="mono" style={{ fontSize: 8.5, color: "#383838", letterSpacing: 1 }}>{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <div className="cert-modal-backdrop" onClick={() => setModal(null)}>
          <div style={{ position: "relative" }} onClick={e => e.stopPropagation()}>
            <img
              src={asset(`/data/${modal.file}`)}
              alt={modal.name}
              style={{ maxWidth: "min(800px,92vw)", maxHeight: "88vh", borderRadius: 12, boxShadow: "0 40px 120px rgba(0,0,0,.9)", objectFit: "contain" }}
            />
            <button onClick={() => setModal(null)} style={{
              position: "absolute", top: -14, right: -14,
              background: "#111", border: "1px solid #333",
              color: "#777", width: 30, height: 30, borderRadius: "50%",
              cursor: "pointer", fontSize: 12, transition: "all .18s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#666"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "#777"; e.currentTarget.style.borderColor = "#333"; }}
            >✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── CONTACT ─────────────────────────────────────────────────────────────── */
function Contact() {
  const links = [
    { label: "GitHub",   href: "https://github.com/ashhar-raza",          hint: "github.com/ashhar-raza" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashhar-raza", hint: "linkedin.com/in/ashhar-raza" },
    { label: "LeetCode", href: "https://leetcode.com/u/raza_ashhar/",     hint: "leetcode.com/u/raza_ashhar" },
    { label: "Email",    href: "mailto:razaashhar2002@gmail.com",         hint: "razaashhar2002@gmail.com" },
  ];

  return (
    <section id="contact" style={{ padding: "90px clamp(24px,8vw,110px) 72px", borderTop: "1px solid #161616" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <span className="section-label">Get In Touch</span>
        <h2 className="display" style={{ fontSize: "clamp(30px,5vw,54px)", fontWeight: 800, letterSpacing: -2, marginBottom: 14 }}>
          Let's{" "}
          <span style={{
            background: "linear-gradient(125deg,#c8f135,#5bc8f5)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Build</span>
        </h2>
        <p style={{ fontFamily: "'DM Sans',sans-serif", color: "#484848", fontSize: 14.5, lineHeight: 1.85, marginBottom: 40, fontWeight: 300 }}>
          Exploring senior & mid-level engineering roles at product companies working on real scale problems.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          {links.map(({ label, href, hint }) => (
            <a key={label} href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer"
              className="contact-row"
            >
              <span className="display" style={{ fontSize: 15, fontWeight: 700, color: "#d0d0d0" }}>{label}</span>
              <span className="mono" style={{ fontSize: 9.5, color: "#333" }}>{hint} ↗</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 22, flexWrap: "wrap" }}>
          {["ASHHAR AHMAD RAZA", "SOFTWARE ENGINEER", "BENGALURU"].map(t => (
            <span key={t} className="mono" style={{ fontSize: 8.5, color: "#1e1e1e", letterSpacing: 2 }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── APP ─────────────────────────────────────────────────────────────────── */
export default function Portfolio1() {
  injectStyles();
  return (
    <div style={{ position: "relative" }}>
      <div className="noise" />
      <NavBar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
    </div>
  );
}