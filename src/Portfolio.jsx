import { useState, useEffect } from "react";

/* ─── INJECT FONTS & BASE STYLES ─────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("ar-global-styles")) return;
  const s = document.createElement("style");
  s.id = "ar-global-styles";
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Space+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

    :root {
      --bg:        #F5F1EB;
      --bg2:       #EDE8DF;
      --bg3:       #E5DFD4;
      --surface:   #FDFAF6;
      --surface2:  #F0EBE2;
      --border:    #D8D0C4;
      --border2:   #C8BEB0;
      --navy:      #1C2340;
      --navy2:     #2A3356;
      --copper:    #B87333;
      --copper2:   #D4924A;
      --copper3:   #8B5523;
      --muted:     #7A7266;
      --muted2:    #9E9488;
      --text:      #1C1915;
      --text2:     #4A4540;
      --text3:     #6E6860;
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Space Grotesk', system-ui, sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--copper); border-radius: 3px; }

    .serif    { font-family: 'Cormorant Garamond', Georgia, serif !important; }
    .mono     { font-family: 'JetBrains Mono', monospace !important; }
    .grotesk  { font-family: 'Space Grotesk', sans-serif !important; }

    @keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
    @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
    @keyframes blink    { 0%,100%{opacity:1;} 50%{opacity:0;} }
    @keyframes breathe  { 0%,100%{opacity:.6;} 50%{opacity:1;} }

    .blink      { animation: blink 1.2s step-end infinite; }
    .breathe    { animation: breathe 3s ease-in-out infinite; }

    /* Cards */
    .ar-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      transition: border-color .25s, box-shadow .25s, transform .25s;
    }
    .ar-card:hover {
      border-color: var(--copper);
      box-shadow: 0 8px 40px rgba(184,115,51,.12), 0 2px 8px rgba(28,35,64,.08);
      transform: translateY(-2px);
    }

    /* Chips */
    .chip {
      display: inline-flex; align-items: center;
      padding: 3px 10px;
      background: var(--bg2);
      border: 1px solid var(--border);
      border-radius: 999px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; color: var(--text3); letter-spacing: .2px;
      transition: all .15s;
    }
    .chip:hover { border-color: var(--copper); color: var(--copper3); background: rgba(184,115,51,.06); }

    /* Nav links */
    .nav-a {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px; letter-spacing: 1.8px; text-transform: uppercase;
      color: var(--muted); text-decoration: none;
      transition: color .18s; position: relative; padding-bottom: 2px;
    }
    .nav-a::after { content:''; position:absolute; bottom:0; left:0; width:0; height:1px; background:var(--copper); transition:width .22s; }
    .nav-a:hover { color: var(--text2); }
    .nav-a:hover::after { width: 100%; }

    /* Section label */
    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 4px; text-transform: uppercase;
      color: var(--copper); margin-bottom: 14px; display: flex; align-items: center; gap: 10px;
    }
    .section-label::before {
      content: ''; display: inline-block; width: 24px; height: 1px; background: var(--copper);
    }

    /* Project tabs */
    .proj-tab {
      font-family: 'JetBrains Mono', monospace; font-size: 10px;
      background: transparent; border: 1px solid var(--border);
      color: var(--muted); border-radius: 8px; padding: 7px 14px;
      cursor: pointer; white-space: nowrap; letter-spacing: .3px;
      transition: all .18s;
    }
    .proj-tab:hover  { border-color: var(--border2); color: var(--text2); }
    .proj-tab.active { background: var(--navy); border-color: var(--navy); color: #EDE8DF; }

    /* Cert card */
    .cert-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 14px; overflow: hidden; cursor: pointer;
      transition: all .22s;
    }
    .cert-card:hover { border-color: var(--copper); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(184,115,51,.15); }

    /* Modal */
    .cert-modal-backdrop {
      position: fixed; inset: 0; z-index: 999;
      background: rgba(28,25,21,.94); backdrop-filter: blur(20px);
      display: flex; align-items: center; justify-content: center; padding: 20px;
      animation: fadeIn .18s ease;
    }

    /* Divider */
    .rule {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border2), transparent);
      margin: 20px 0;
    }

    /* Contact row */
    .contact-row {
      display: flex; justify-content: space-between; align-items: center;
      width: 100%; max-width: 480px;
      padding: 16px 22px;
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 12px; text-decoration: none;
      transition: all .18s;
    }
    .contact-row:hover { border-color: var(--copper); box-shadow: 0 4px 20px rgba(184,115,51,.1); }

    /* Highlight row */
    .highlight-row {
      display: flex; gap: 12px; align-items: flex-start;
      padding: 12px 14px;
      background: var(--bg2); border: 1px solid var(--border); border-radius: 10px;
      transition: border-color .18s;
    }
    .highlight-row:hover { border-color: var(--border2); }

    /* Quiet link */
    .quiet-link {
      font-family: 'JetBrains Mono', monospace;
      font-size: 9px; letter-spacing: 2px; color: var(--muted2);
      text-decoration: none; text-transform: uppercase;
      border-bottom: 1px solid var(--border); padding-bottom: 1px;
      transition: color .18s, border-color .18s;
    }
    .quiet-link:hover { color: var(--copper); border-color: var(--copper); }

    @media (max-width: 640px) {
      .hide-sm { display: none !important; }
      .proj-tab { font-size: 9px; padding: 6px 10px; }
    }
    @media (min-width: 641px) {
      .show-sm { display: none !important; }
    }
  `;
  document.head.appendChild(s);
};

/* ─── BASE PATH ─────────────────────────────────────────────────────────── */
const BASE_URL = (() => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const b = import.meta.env.BASE_URL ?? "/";
    return b === "/" ? "" : b.replace(/\/$/, "");
  }
  return (typeof process !== "undefined" && process.env?.PUBLIC_URL) || "";
})();
const asset = (path) => `${BASE_URL}${path}`;

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const CERTS = [
  { name: "Data Structures & Algorithms", issuer: "Scaler · NSDC", file: "DSA.png",        color: "#B87333" },
  { name: "Java",                          issuer: "Scaler · NSDC", file: "Java.png",       color: "#1C2340" },
  { name: "Javascript",                    issuer: "Scaler · NSDC", file: "Javascript.png", color: "#8B5523" },
  { name: "Low Level Design",              issuer: "Scaler · NSDC", file: "LLD.png",        color: "#2A3356" },
  { name: "Databases & SQL",               issuer: "Scaler · NSDC", file: "SQL.png",        color: "#7A7266" },
];

const SKILL_GROUPS = [
  { label: "Backend",       color: "#1C2340", items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "gRPC", "Microservices", "JWT / OAuth2"] },
  { label: "AI & Agentic",  color: "#8B5523", items: ["LLM APIs", "Tool Calling", "Prompt Engineering", "Voice AI Pipelines", "FastAPI", "Deepgram", "Groq"] },
  { label: "Messaging",     color: "#B87333", items: ["Apache Kafka", "RabbitMQ", "Event-Driven Arch"] },
  { label: "Databases",     color: "#2A3356", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Aerospike", "Oracle SQL"] },
  { label: "DevOps & Cloud",color: "#7A7266", items: ["Docker", "Kubernetes", "AWS S3", "CI/CD", "NGINX", "ELK Stack", "Prometheus", "New Relic"] },
  { label: "Frontend",      color: "#B87333", items: ["React.js", "React Native", "Tailwind CSS", "HTML / CSS", "TypeScript"] },
  { label: "Languages",     color: "#1C2340", items: ["Java", "JavaScript", "TypeScript", "C++", "Python"] },
];

const PROJECTS = [
  {
    id: "01", title: "AI Cold Calling Agent", sub: "Voice AI · Agentic Systems", accent: "#8B5523",
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
    id: "02", title: "Distributed Healthcare System", sub: "Microservices · Java · Kafka", accent: "#1C2340",
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
    id: "03", title: "Kaveri", sub: "Enterprise Operations Platform", accent: "#B87333",
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
    id: "04", title: "Gia School Platform", sub: "EdTech · Full-Stack", accent: "#2A3356",
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

/* ─── NAV ─────────────────────────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
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
      padding: "0 clamp(20px,6vw,64px)", height: 60,
      background: scrolled ? "rgba(245,241,235,.97)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "all .3s",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
        <span className="serif" style={{ fontSize: 22, fontWeight: 700, color: "var(--navy)", letterSpacing: -.5 }}>AR</span>
        {/* <span className="mono" style={{ fontSize: 9, color: "var(--copper)", letterSpacing: 2 }}>PORTFOLIO</span> */}
      </div>

      <div className="hide-sm" style={{ display: "flex", gap: 28 }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className="nav-a">{label}</a>
        ))}
      </div>

      <a href={asset("/data/ashhar-raza.pdf")} target="_blank" rel="noreferrer" className="quiet-link hide-sm">
        Resume ↗
      </a>

      <button className="show-sm" onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: "none", border: "none", color: "var(--text2)", fontSize: 18, cursor: "pointer" }}>
        {menuOpen ? "✕" : "☰"}
      </button>

      {menuOpen && (
        <div style={{
          position: "absolute", top: 60, left: 0, right: 0,
          background: "var(--surface)", borderBottom: "1px solid var(--border)",
          padding: "24px clamp(20px,6vw,64px)",
          display: "flex", flexDirection: "column", gap: 22,
        }}>
          {links.map(([href, label]) => (
            <a key={href} href={href} className="nav-a" style={{ fontSize: 11 }}
              onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a href={asset("/data/ashhar-raza.pdf")} target="_blank" rel="noreferrer"
            className="quiet-link" style={{ fontSize: 9 }}>Resume ↗</a>
        </div>
      )}
    </nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────────────────── */
function Hero() {
  const [typed, setTyped] = useState("");
  const full = "Software Engineer";
  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setTyped(full.slice(0, ++i));
        if (i >= full.length) clearInterval(iv);
      }, 65);
      return () => clearInterval(iv);
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      padding: "clamp(110px,14vh,150px) clamp(24px,8vw,110px) clamp(60px,8vh,90px)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      background: "linear-gradient(160deg, var(--bg) 0%, var(--bg2) 100%)",
    }}>
      {/* Decorative vertical rule */}
      <div style={{
        position: "absolute", left: "clamp(24px,8vw,110px)", top: 0, bottom: 0,
        width: 1, background: "linear-gradient(180deg, transparent, var(--border) 20%, var(--border) 80%, transparent)",
        zIndex: 0,
      }} />
      {/* Copper accent blob */}
      <div style={{
        position: "absolute", top: "10%", right: "-8%", width: "480px", height: "480px",
        background: "radial-gradient(circle, rgba(184,115,51,.07) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      {/* Navy accent blob */}
      <div style={{
        position: "absolute", bottom: "5%", left: "15%", width: "360px", height: "360px",
        background: "radial-gradient(circle, rgba(28,35,64,.05) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 800, paddingLeft: 32 }}>

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 9, marginBottom: 48,
          padding: "6px 14px 6px 10px",
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: "999px",
        }}>
          <span className="breathe" style={{
            display: "inline-block", width: 6, height: 6,
            borderRadius: "50%", background: "#4CAF50",
          }} />
          <span className="mono" style={{ fontSize: 9, color: "var(--muted)", letterSpacing: 2.5 }}>
            BENGALURU · OPEN TO RELOCATION
          </span>
        </div>

        {/* Name */}
        <div style={{ marginBottom: 28 }}>
          <h1 className="serif" style={{
            fontSize: "clamp(64px,11vw,120px)", fontWeight: 700,
            lineHeight: .88, letterSpacing: -3, color: "var(--navy)",
          }}>Ashhar</h1>
          <h1 className="serif" style={{
            fontSize: "clamp(64px,11vw,120px)", fontWeight: 400,
            lineHeight: .88, letterSpacing: -3,
            color: "transparent",
            WebkitTextStroke: "2px var(--copper)",
            fontStyle: "italic",
          }}>Raza</h1>
        </div>

        {/* Typed role */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <div style={{ width: 32, height: 1, background: "var(--copper)" }} />
          <p className="mono" style={{ fontSize: "clamp(10px,1.3vw,12px)", color: "var(--copper3)", letterSpacing: 2.5 }}>
            {typed}{typed.length < full.length && <span className="blink" style={{ marginLeft: 1 }}>|</span>}
          </p>
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: "'Space Grotesk',sans-serif", fontWeight: 300,
          maxWidth: 520, lineHeight: 1.85, color: "var(--text3)",
          fontSize: "clamp(14px,1.6vw,16px)", marginBottom: 36,
        }}>
          I build distributed systems that hold up at scale — Java & Spring Boot backend,
          event-driven architecture with Kafka, AI pipelines, and cloud-native deployments.
          2+ years shipping production across enterprise and ed-tech.
        </p>

        {/* Value props */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 56, maxWidth: 460 }}>
          {[
            ["Backend-first", "APIs, microservices, clean architecture"],
            ["Observability-minded", "I reduce incidents, not just ship features"],
            ["Building with AI", "voice agents, LLM tool-calling, agentic systems"],
          ].map(([title, desc]) => (
            <div key={title} style={{
              display: "flex", gap: 14, alignItems: "center",
              padding: "11px 16px",
              background: "var(--surface)",
              border: "1px solid var(--border)", borderRadius: 10,
            }}>
              <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--copper)", flexShrink: 0 }} />
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, color: "var(--text2)", fontWeight: 500 }}>{title}</span>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, color: "var(--muted)", fontWeight: 300 }}>— {desc}</span>
            </div>
          ))}
        </div>

        {/* Metrics */}
        <div style={{ display: "flex", gap: "clamp(28px,5vw,60px)", flexWrap: "wrap", paddingLeft: 4 }}>
          {[["8+", "Production Systems"], ["500+", "DSA Problems"], ["2+", "Years Exp"], ["30%", "MTTR Cut"]].map(([val, lbl]) => (
            <div key={val}>
              <div className="serif" style={{
                fontSize: "clamp(32px,4.5vw,50px)", fontWeight: 700,
                color: "var(--copper)", lineHeight: 1,
              }}>{val}</div>
              <div className="mono" style={{
                fontSize: 8.5, color: "var(--muted2)", marginTop: 6,
                letterSpacing: 2, textTransform: "uppercase",
              }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────────────── */
function Experience() {
  return (
    <section id="experience" style={{ padding: "100px clamp(24px,8vw,110px)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="section-label">Work History</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, marginBottom: 40, letterSpacing: -.5, color: "var(--navy)" }}>
          Professional Experience
        </h2>

        <div className="ar-card" style={{ padding: "clamp(24px,4vw,40px)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 10 }}>
            <div>
              <p className="mono" style={{ fontSize: 9.5, color: "var(--copper)", letterSpacing: 3, marginBottom: 12 }}>OCT 2023 — PRESENT</p>
              <h3 className="serif" style={{ fontSize: "clamp(22px,2.8vw,30px)", fontWeight: 600, color: "var(--navy)" }}>Software Developer</h3>
              <p className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 6 }}>Peol Technologies · Bangalore, India</p>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignSelf: "flex-start" }}>
              {["Java", "Spring Boot", "Kafka", "Redis", "Docker", "K8s", "AWS", "Prometheus"].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>

          {/* Impact numbers */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "24px 0" }}>
            {[["30%", "MTTR reduction"], ["20%", "faster delivery"], ["8+", "systems shipped"]].map(([val, lbl]) => (
              <div key={val} style={{
                padding: "10px 18px",
                background: "var(--bg2)",
                border: "1px solid var(--border2)",
                borderRadius: 10,
                display: "flex", gap: 10, alignItems: "baseline",
              }}>
                <span className="serif" style={{ color: "var(--copper)", fontSize: 24, fontWeight: 700 }}>{val}</span>
                <span className="mono" style={{ color: "var(--muted)", fontSize: 8.5, letterSpacing: 1.2 }}>{lbl.toUpperCase()}</span>
              </div>
            ))}
          </div>

          <div className="rule" />

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(285px,1fr))", gap: 10 }}>
            {[
              ["Shipped 8+ full-stack production apps using Java, Node.js, React, and React Native."],
              ["Applied OOP & SOLID principles — cut duplication, accelerated feature delivery by 20%."],
              ["Established observability via Prometheus, ELK Stack & New Relic — cut MTTR by 30%."],
              ["Mentored junior engineers through code reviews and architecture discussions."],
              ["Engineered high-concurrency backend services handling async workloads at scale."],
              ["Designed RESTful APIs backed by SQL & NoSQL — improved throughput and consistency."],
            ].map(([text], i) => (
              <div key={i} className="highlight-row">
                <span className="mono" style={{ color: "var(--copper)", fontSize: 12, marginTop: 2, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "var(--text3)", fontWeight: 400 }}>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="ar-card" style={{ padding: "22px clamp(22px,3vw,34px)", marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 14 }}>
            <div>
              <p className="mono" style={{ fontSize: 9, color: "var(--navy2)", letterSpacing: 3, marginBottom: 10 }}>EDUCATION</p>
              <h4 className="serif" style={{ fontSize: "clamp(16px,2vw,22px)", fontWeight: 600, color: "var(--navy)" }}>
                B.E. Computer Science & Engineering
              </h4>
              <p className="mono" style={{ fontSize: 10.5, color: "var(--muted)", marginTop: 5 }}>
                Visvesvaraya Technological University · 2019 – 2023
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="serif" style={{ fontSize: 36, fontWeight: 700, color: "var(--navy)" }}>8.0</div>
              <div className="mono" style={{ fontSize: 8.5, color: "var(--muted2)", letterSpacing: 2 }}>CGPA / 10</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ───────────────────────────────────────────────────────── */
function Projects() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <section id="projects" style={{ padding: "100px clamp(24px,8vw,110px)", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div className="section-label">What I've Built</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, marginBottom: 10, letterSpacing: -.5, color: "var(--navy)" }}>
          Featured Projects
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--muted)", fontSize: 14, marginBottom: 32, fontWeight: 300 }}>
          A cross-section of backend systems, AI pipelines, and full-stack platforms.
        </p>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
          {PROJECTS.map((pr, i) => (
            <button key={i} className={`proj-tab${active === i ? " active" : ""}`} onClick={() => setActive(i)}>
              {pr.id} {pr.title}
            </button>
          ))}
        </div>

        <div className="ar-card" key={active} style={{
          padding: "clamp(24px,4vw,40px)",
          borderColor: p.accent + "55",
          animation: "fadeUp .3s ease both",
          position: "relative", overflow: "hidden",
        }}>
          {/* Large number watermark */}
          <div className="serif" style={{
            position: "absolute", top: -20, right: 20,
            fontSize: "clamp(100px,15vw,160px)", fontWeight: 700,
            color: p.accent + "08", lineHeight: 1, pointerEvents: "none",
            userSelect: "none",
          }}>{p.id}</div>

          <div style={{ position: "relative" }}>
            <div style={{ marginBottom: 20 }}>
              <p className="mono" style={{ fontSize: 9, color: p.accent, letterSpacing: 3, marginBottom: 10 }}>
                {p.sub.toUpperCase()}
              </p>
              <h3 className="serif" style={{ fontSize: "clamp(24px,3.2vw,34px)", fontWeight: 600, letterSpacing: -.5, color: "var(--navy)" }}>
                {p.title}
              </h3>
            </div>

            <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--text3)", lineHeight: 1.85, fontSize: 14.5, marginBottom: 20, maxWidth: 560, fontWeight: 300 }}>
              {p.desc}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
              {p.stack.map(t => (
                <span key={t} className="chip" style={{ borderColor: p.accent + "35", color: p.accent }}>{t}</span>
              ))}
            </div>

            <div className="rule" />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(265px,1fr))", gap: 8 }}>
              {p.points.map((pt, i) => (
                <div key={i} className="highlight-row">
                  <span className="mono" style={{ color: p.accent, fontSize: 12, marginTop: 3, flexShrink: 0 }}>→</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13.5, lineHeight: 1.75, color: "var(--text3)", fontWeight: 400 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────────────── */
function Skills() {
  return (
    <section id="skills" style={{ padding: "100px clamp(24px,8vw,110px)", background: "var(--surface)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div className="section-label">Technical Stack</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, marginBottom: 10, letterSpacing: -.5, color: "var(--navy)" }}>
          Skills & Technologies
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--muted)", fontSize: 14, marginBottom: 36, fontWeight: 300 }}>
          Depth across the stack — from JVM internals to browser rendering.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 12 }}>
          {SKILL_GROUPS.map(({ label, color, items }) => (
            <div key={label} className="ar-card" style={{ padding: "20px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 3, height: 16, borderRadius: 2, background: color, flexShrink: 0 }} />
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
          marginTop: 14, padding: "22px 26px",
          background: "var(--bg2)",
          borderColor: "var(--border2)",
          display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: "var(--navy)", display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <span style={{ fontSize: 22 }}>🏆</span>
          </div>
          <div style={{ flex: 1 }}>
            <h4 className="serif" style={{ fontSize: 18, fontWeight: 600, marginBottom: 5, color: "var(--navy)" }}>Competitive Programming</h4>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--text3)", fontSize: 13.5, lineHeight: 1.75, fontWeight: 300 }}>
              <span style={{ color: "var(--copper)", fontWeight: 500 }}>500+ problems</span> on LeetCode & CodeChef.
              DSA, OOP, and System Design applied consistently in production code.
            </p>
          </div>
          <a href="https://leetcode.com/u/raza_ashhar/" target="_blank" rel="noreferrer"
            className="quiet-link">LeetCode ↗</a>
        </div>

        {/* Working style */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10 }}>
          {[
            { icon: "🔍", title: "Debugging mindset", desc: "I look for root causes, not quick patches." },
            { icon: "📖", title: "Documentation first", desc: "Clean READMEs and inline docs by default." },
            { icon: "🔄", title: "Iterates fast", desc: "Ship, observe, improve. Comfortable with ambiguity." },
            { icon: "🧩", title: "Systems thinker", desc: "Design decisions made with the whole in mind." },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="ar-card" style={{ padding: "18px 20px" }}>
              <span style={{ fontSize: 18, display: "block", marginBottom: 10 }}>{icon}</span>
              <h5 className="serif" style={{ fontSize: 15, fontWeight: 600, marginBottom: 6, color: "var(--navy)" }}>{title}</h5>
              <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text3)", lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CERTIFICATIONS ──────────────────────────────────────────────────── */
function Certifications() {
  const [modal, setModal] = useState(null);
  const [imgErrors, setImgErrors] = useState({});

  useEffect(() => {
    const h = (e) => { if (e.key === "Escape") setModal(null); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <section id="certs" style={{ padding: "100px clamp(24px,8vw,110px)", background: "var(--bg2)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto" }}>
        <div className="section-label">Verified Skills</div>
        <h2 className="serif" style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 600, marginBottom: 10, letterSpacing: -.5, color: "var(--navy)" }}>
          Certifications
        </h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", color: "var(--muted)", fontSize: 14, marginBottom: 36, fontWeight: 300 }}>
          Issued by <span style={{ color: "var(--navy)", fontWeight: 500 }}>Scaler</span> &amp; co-certified by{" "}
          <span style={{ color: "var(--navy)", fontWeight: 500 }}>NSDC</span>. Click any card to view.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(clamp(165px,25%,210px),1fr))", gap: 12 }}>
          {CERTS.map((c) => (
            <div key={c.file} className="cert-card" onClick={() => setModal(c)}>
              <div style={{
                height: 130, overflow: "hidden", position: "relative",
                background: "var(--bg3)", display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {imgErrors[c.file] ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: c.color + "18", border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                      <span style={{ fontSize: 16 }}>📜</span>
                    </div>
                    <span className="mono" style={{ fontSize: 8.5, color: "var(--muted)", letterSpacing: 1 }}>NO PREVIEW</span>
                  </div>
                ) : (
                  <img
                    src={asset(`/data/${c.file}`)}
                    alt={c.name}
                    onError={() => setImgErrors(prev => ({ ...prev, [c.file]: true }))}
                    style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .7, transition: "opacity .22s, transform .28s" }}
                    onMouseEnter={e => { e.target.style.opacity = 1; e.target.style.transform = "scale(1.04)"; }}
                    onMouseLeave={e => { e.target.style.opacity = .7; e.target.style.transform = "scale(1)"; }}
                  />
                )}
                <div style={{
                  position: "absolute", inset: 0,
                  background: "rgba(28,35,64,.7)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  opacity: 0, transition: "opacity .18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = 0; }}
                >
                  <span className="mono" style={{ fontSize: 9.5, color: "#EDE8DF", letterSpacing: 2 }}>VIEW ↗</span>
                </div>
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ width: 28, height: 2, borderRadius: 1, background: c.color, marginBottom: 10 }} />
                <h4 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: 14, fontWeight: 600, lineHeight: 1.4, marginBottom: 5, color: "var(--navy)" }}>{c.name}</h4>
                <p className="mono" style={{ fontSize: 8.5, color: "var(--muted)", letterSpacing: 1 }}>{c.issuer}</p>
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
              style={{ maxWidth: "min(820px,93vw)", maxHeight: "88vh", borderRadius: 16, boxShadow: "0 40px 120px rgba(0,0,0,.7)", objectFit: "contain" }}
            />
            <button onClick={() => setModal(null)} style={{
              position: "absolute", top: -14, right: -14,
              background: "var(--surface)", border: "1px solid var(--border)",
              color: "var(--text3)", width: 32, height: 32, borderRadius: "50%",
              cursor: "pointer", fontSize: 12, transition: "all .18s",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--navy)"; e.currentTarget.style.borderColor = "var(--navy)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--text3)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >✕</button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────────────── */
function Contact() {
  const links = [
    { label: "GitHub",   href: "https://github.com/ashhar-raza",          hint: "github.com/ashhar-raza" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ashhar-raza", hint: "linkedin.com/in/ashhar-raza" },
    { label: "LeetCode", href: "https://leetcode.com/u/raza_ashhar/",     hint: "leetcode.com/u/raza_ashhar" },
    { label: "Email",    href: "mailto:razaashhar2002@gmail.com",         hint: "razaashhar2002@gmail.com" },
  ];

  return (
    <section id="contact" style={{
      padding: "100px clamp(24px,8vw,110px) 80px",
      background: "var(--navy)",
      position: "relative", overflow: "hidden",
    }}>
      {/* Decorative */}
      <div style={{
        position: "absolute", top: "-20%", right: "-10%", width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(184,115,51,.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div className="section-label" style={{ justifyContent: "center", color: "var(--copper2)" }}>Get In Touch</div>
        <h2 className="serif" style={{
          fontSize: "clamp(36px,6vw,64px)", fontWeight: 700,
          letterSpacing: -2, marginBottom: 14,
          color: "var(--bg)",
        }}>
          Let's{" "}
          <span style={{
            color: "transparent",
            WebkitTextStroke: "1.5px var(--copper2)",
            fontStyle: "italic",
          }}>Build</span>
        </h2>
        <p style={{
          fontFamily: "'Space Grotesk',sans-serif", color: "rgba(245,241,235,.45)",
          fontSize: 14.5, lineHeight: 1.85, marginBottom: 44, fontWeight: 300,
        }}>
          Exploring senior & mid-level engineering roles at product companies working on real scale problems.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
          {links.map(({ label, href, hint }) => (
            <a key={label} href={href}
              target={href.startsWith("mailto") ? "_self" : "_blank"}
              rel="noreferrer"
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                width: "100%", maxWidth: 480,
                padding: "16px 22px",
                background: "rgba(245,241,235,.06)",
                border: "1px solid rgba(245,241,235,.1)",
                borderRadius: 12, textDecoration: "none",
                transition: "all .18s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(184,115,51,.12)";
                e.currentTarget.style.borderColor = "rgba(184,115,51,.4)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(245,241,235,.06)";
                e.currentTarget.style.borderColor = "rgba(245,241,235,.1)";
              }}
            >
              <span className="serif" style={{ fontSize: 17, fontWeight: 600, color: "var(--bg)" }}>{label}</span>
              <span className="mono" style={{ fontSize: 9.5, color: "rgba(245,241,235,.3)" }}>{hint} ↗</span>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
          {["Ashhar Ahmad Raza", "Software Engineer", "Bengaluru"].map(t => (
            <span key={t} className="mono" style={{ fontSize: 8.5, color: "rgba(245,241,235,.15)", letterSpacing: 2, textTransform: "uppercase" }}>{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── APP ────────────────────────────────────────────────────────────── */
export default function Portfolio() {
  injectStyles();
  return (
    <div style={{ position: "relative" }}>
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