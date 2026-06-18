import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink,
  FiTerminal,
  FiDatabase,
  FiLayers,
  FiServer,
  FiCode,
  FiActivity,
  FiAward,
  FiArrowUpRight,
  FiMenu,
  FiX,
  FiChevronRight,
} from "react-icons/fi";

/* ─── BASE PATH ─────────────────────────────────────────────────────────── */
const BASE_URL = (() => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    const b = import.meta.env.BASE_URL ?? "/";
    return b === "/" ? "" : b.replace(/\/$/, "");
  }
  return "";
})();
const asset = (path) => `${BASE_URL}${path}`;

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const EXPERIENCES = [
  {
    role: "Software Developer",
    company: "Peol Technologies",
    location: "Bangalore, India",
    date: "OCT 2023 — PRESENT",
    skills: ["Java", "Spring Boot", "Kafka", "Redis", "Docker", "K8s", "AWS", "Prometheus"],
    impact: [
      { metric: "30%", desc: "MTTR Reduction" },
      { metric: "20%", desc: "Faster Delivery" },
      { metric: "8+", desc: "Systems Shipped" },
    ],
    points: [
      "Shipped 8+ full-stack production apps using Java, Node.js, React, and React Native.",
      "Applied OOP & SOLID principles — cut duplication, accelerated feature delivery by 20%.",
      "Established observability via Prometheus, ELK Stack & New Relic — cut MTTR by 30%.",
      "Mentored junior engineers through code reviews and architecture discussions.",
      "Engineered high-concurrency backend services handling async workloads at scale.",
      "Designed RESTful APIs backed by SQL & NoSQL — improved throughput and consistency.",
    ],
  },
];

const PROJECTS = [
  {
    id: "01",
    title: "AI Cold Calling Agent",
    sub: "Voice AI · Agentic Systems",
    color: "#8B5CF6", // Purple
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
    id: "02",
    title: "Distributed Healthcare System",
    sub: "Microservices · Java · Kafka",
    color: "#3B82F6", // Blue
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
    id: "03",
    title: "Kaveri",
    sub: "Enterprise Operations Platform",
    color: "#F59E0B", // Amber
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
    id: "04",
    title: "Gia School Platform",
    sub: "EdTech · Full-Stack",
    color: "#10B981", // Emerald
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

const SKILL_GROUPS = [
  { label: "Backend", icon: FiServer, items: ["Java", "Spring Boot", "Node.js", "Express.js", "REST APIs", "gRPC", "Microservices", "JWT / OAuth2"] },
  { label: "AI & Agentic", icon: FiActivity, items: ["LLM APIs", "Tool Calling", "Prompt Engineering", "Voice AI Pipelines", "FastAPI", "Deepgram", "Groq"] },
  { label: "Messaging", icon: FiLayers, items: ["Apache Kafka", "RabbitMQ", "Event-Driven Arch"] },
  { label: "Databases", icon: FiDatabase, items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Aerospike", "Oracle SQL"] },
  { label: "DevOps & Cloud", icon: FiTerminal, items: ["Docker", "Kubernetes", "AWS S3", "CI/CD", "NGINX", "ELK Stack", "Prometheus", "New Relic"] },
  { label: "Frontend", icon: FiCode, items: ["React.js", "React Native", "Tailwind CSS", "HTML / CSS", "TypeScript"] },
  { label: "Languages", icon: FiCode, items: ["Java", "JavaScript", "TypeScript", "C++", "Python"] },
];

const CERTS = [
  { name: "Data Structures & Algorithms", issuer: "Scaler · NSDC", file: "DSA.png" },
  { name: "Java", issuer: "Scaler · NSDC", file: "Java.png" },
  { name: "Javascript", issuer: "Scaler · NSDC", file: "Javascript.png" },
  { name: "Low Level Design", issuer: "Scaler · NSDC", file: "LLD.png" },
  { name: "High Level Design", issuer: "Scaler · NSDC", file: "HLD.png" },
  { name: "Databases & SQL", issuer: "Scaler · NSDC", file: "SQL.png" },
];

/* ─── COMPONENTS ───────────────────────────────────────────────────────── */

// 1. Navigation
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = ["Experience", "Projects", "Skills", "Certs", "Contact"];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] group-hover:scale-105 transition-all">
            AR
          </div>
          <span className="font-bold text-white tracking-[0.2em] text-sm hidden sm:block">ASHHAR RAZA</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-xs uppercase tracking-[0.15em] font-medium text-gray-400 hover:text-white transition-colors relative group py-2"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-600 transition-all group-hover:w-full rounded-full"></span>
            </a>
          ))}
          <a
            href={asset("/data/ashhar-raza.pdf")}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-xs uppercase tracking-[0.1em] font-semibold hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 group"
          >
            Resume <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-300 hover:text-white block py-2 text-lg font-medium tracking-wide"
                >
                  {item}
                </a>
              ))}
              <a
                href={asset("/data/ashhar-raza.pdf")}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 mt-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center font-bold tracking-wide"
              >
                View Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// 2. Hero Section
const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden px-6 md:px-12 bg-[#050505]">
      {/* Dynamic Background */}
      <div className="absolute top-[20%] -left-[10%] w-[50vw] h-[50vw] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[10%] -right-[10%] w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-7 flex flex-col items-start gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs uppercase tracking-widest text-gray-300 font-medium">Bengaluru • Open to Relocation</span>
          </motion.div>

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white leading-[1.05] tracking-tighter mb-2"
            >
              Ashhar
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 italic pr-4">
                Raza.
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-6 mt-8"
            >
              <div className="h-[2px] w-16 bg-gradient-to-r from-blue-500 to-transparent"></div>
              <h2 className="text-xl md:text-2xl text-gray-300 font-mono tracking-widest uppercase">Software Engineer</h2>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light mt-2"
          >
            I build distributed systems that hold up at scale — Java & Spring Boot backend, event-driven architecture with Kafka, AI pipelines, and cloud-native deployments. 2+ years shipping production across enterprise and ed-tech.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-wrap gap-4 mt-4"
          >
            <a
              href="#projects"
              className="px-8 py-4 rounded-xl bg-white text-black font-bold uppercase text-sm tracking-widest hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center gap-2 group"
            >
              View Work <div className="w-2 h-2 rounded-full bg-black group-hover:scale-150 transition-transform"></div>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold uppercase text-sm tracking-widest hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-md flex items-center gap-2 group"
            >
              Contact Me <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Info Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4">
          {[
            { value: "8+", label: "Prod Systems", color: "from-blue-400 to-cyan-400" },
            { value: "500+", label: "DSA Problems", color: "from-purple-400 to-pink-400" },
            { value: "2+", label: "Years Exp", color: "from-emerald-400 to-teal-400" },
            { value: "30%", label: "MTTR Cut", color: "from-amber-400 to-orange-400" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:bg-white/[0.04] transition-colors relative overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity`}></div>
              <h3 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.color} mb-3`}>
                {stat.value}
              </h3>
              <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="col-span-2 p-8 rounded-3xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/10 backdrop-blur-xl mt-2 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:rotate-12 transition-transform duration-500">
              <FiTerminal size={100} className="text-blue-400" />
            </div>
            
            <h4 className="text-white font-bold text-lg mb-4 flex items-center gap-3 relative z-10">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <FiActivity size={18} />
              </div>
              Core Value Props
            </h4>
            <ul className="space-y-3 relative z-10">
              {[
                { t: "Backend-first", v: "APIs, microservices, clean architecture" },
                { t: "Observability-minded", v: "I reduce incidents, not just ship features" },
                { t: "Building with AI", v: "voice agents, LLM tool-calling, pipelines" },
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <FiArrowUpRight className="text-purple-400 shrink-0 mt-1" />
                  <span className="text-sm font-light text-gray-300">
                    <strong className="font-semibold text-white tracking-wide">{item.t}</strong> — {item.v}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 3. Experience Section
const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
    <div className="inline-flex items-center gap-4 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
       <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
       <span className="text-xs font-mono tracking-[0.2em] text-gray-300 uppercase">{subtitle}</span>
       <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
    </div>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter capitalize">{title}</h2>
  </div>
);

const Experience = () => {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Professional Trajectory" subtitle="Experience" />

        <div className="space-y-12">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="relative p-8 md:p-12 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all group overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500-[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors pointer-events-none"></div>

              <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 relative z-10">
                {/* Left Col */}
                <div>
                  <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest rounded-full mb-8">
                    {exp.date}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2 leading-tight">{exp.role}</h3>
                  <h4 className="text-xl text-gray-400 mb-8 font-light tracking-wide">
                    {exp.company} <span className="text-sm ml-2">({exp.location})</span>
                  </h4>

                  <div className="flex flex-wrap gap-2 mb-10">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 bg-white/5 border border-white/5 rounded-lg text-xs font-medium text-gray-300 hover:bg-white/10 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-6">
                    {exp.impact.map((imp, idx) => (
                      <div key={idx} className="flex items-center gap-5">
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">{imp.metric}</span>
                        <div className="h-[1px] flex-1 bg-white/10"></div>
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">{imp.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Col */}
                <div className="space-y-4 lg:mt-8">
                  {exp.points.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
                    >
                      <FiChevronRight className="text-blue-400 shrink-0 mt-1 text-lg" />
                      <p className="text-gray-300 leading-relaxed font-light">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Education block */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="p-8 md:p-10 rounded-[2rem] bg-gradient-to-r from-white/[0.02] to-white/[0.04] border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:border-white/20 transition-all"
          >
            <div>
              <p className="text-xs font-mono text-blue-400 tracking-[0.2em] mb-3 uppercase">Education</p>
              <h4 className="text-2xl font-bold text-white mb-2">B.E. Computer Science & Engineering</h4>
              <p className="text-gray-400 font-light">Visvesvaraya Technological University · 2019 – 2023</p>
            </div>
            <div className="md:text-right">
              <div className="text-5xl font-black text-white group-hover:text-blue-400 transition-colors">8.0</div>
              <div className="text-xs font-mono text-gray-500 uppercase tracking-widest mt-2">CGPA / 10</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// 4. Projects
const Projects = () => {
  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Selected Work" subtitle="Projects" />

        <div className="space-y-24 md:space-y-40">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center group"
            >
              {/* Graphic Side */}
              <div
                className={`relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl ${
                  i % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10 pointer-events-none"></div>
                
                {/* Abstract Glow */}
                <div
                  className="absolute -z-10 inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-[100px]"
                  style={{ backgroundColor: project.color }}
                ></div>

                <h2 className="text-[12rem] md:text-[16rem] font-black opacity-[0.08] leading-none select-none text-white absolute -right-10 md:-right-20 -bottom-10 group-hover:-translate-y-8 group-hover:-translate-x-8 transition-transform duration-700">
                  {project.id}
                </h2>

                <div className="p-8 text-center relative z-20">
                  <div
                    className="w-24 h-24 mx-auto rounded-3xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-500"
                  >
                    <FiCode size={40} color={project.color} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-3 px-4">{project.title}</h3>
                  <div className="inline-block px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-gray-300 font-mono text-xs tracking-widest uppercase">
                    {project.sub.split(' · ')[0]}
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className={`flex flex-col gap-6 ${i % 2 !== 0 ? "lg:order-1" : ""}`}>
                <div className="flex gap-4 items-center mb-4">
                  <span className="text-7xl font-black text-white/20 group-hover:text-white/40 transition-colors drop-shadow-lg">{project.id}</span>
                  <div className="h-[2px] w-full bg-white/10 rounded-r" />
                </div>

                <div>
                  <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">{project.title}</h3>
                  <p className="text-lg text-gray-400 leading-relaxed font-light">{project.desc}</p>
                </div>

                <div className="flex flex-wrap gap-2 my-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 border rounded-xl text-xs font-semibold tracking-wide"
                      style={{ borderColor: `${project.color}40`, color: project.color, backgroundColor: `${project.color}10` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-16 h-[1px] bg-white/10 my-4"></div>

                <ul className="space-y-4">
                  {project.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4 hover:bg-white/[0.02] p-2 rounded-lg transition-colors -ml-2">
                      <FiArrowUpRight className="mt-1.5 shrink-0 text-xl" style={{ color: project.color }} />
                      <span className="text-gray-300 font-light leading-relaxed">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 5. Skills
const Skills = () => {
  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Technical Arsenal" subtitle="Skills" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_GROUPS.map((group, i) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 md:p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] hover:border-white/20 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 group-hover:-rotate-6 duration-500">
                  <Icon size={160} />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/10 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-wide">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="px-4 py-2 bg-white/[0.05] border border-white/10 hover:border-white/30 rounded-xl text-sm font-medium text-gray-300 transition-colors shadow-sm cursor-default"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* LeetCode Callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-white/30 transition-colors"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-8">
            <div className="w-20 h-20 shrink-0 rounded-[1.5rem] bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-3xl shadow-[0_0_30px_rgba(245,158,11,0.3)] animate-bounce-slow">
              <FiAward />
            </div>
            <div>
              <h4 className="text-3xl font-black text-white mb-3">Competitive Programming</h4>
              <p className="text-gray-400 max-w-2xl text-lg font-light leading-relaxed">
                <strong className="text-amber-400 font-bold">500+ problems</strong> solved. Consistent application of DSA, OOP, and System Design principles in building robust production systems.
              </p>
            </div>
          </div>
          <a
            href="https://leetcode.com/u/raza_ashhar/"
            target="_blank"
            rel="noreferrer"
            className="shrink-0 px-8 py-4 rounded-full bg-white text-black font-black uppercase tracking-widest text-sm hover:bg-gray-200 hover:scale-105 transition-all flex items-center gap-3 shadow-xl"
          >
            LeetCode Profile <FiExternalLink size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// 6. Certifications
const Certifications = () => {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setModal(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section id="certs" className="py-24 px-6 md:px-12 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <SectionHeader title="Credentials" subtitle="Certifications" />
        <p className="text-center text-gray-400 font-light mb-16 max-w-2xl mx-auto">
          Issued by <strong className="text-white">Scaler</strong> & co-certified by <strong className="text-white">NSDC</strong>.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setModal(cert)}
              className="group cursor-pointer rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/30 overflow-hidden transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] flex flex-col"
            >
              <div className="aspect-[4/3] bg-white/5 flex items-center justify-center p-6 relative overflow-hidden flex-1">
                <FiAward className="text-white/10 w-16 h-16 group-hover:scale-125 transition-transform duration-500" />
                <img
                  src={asset(`/data/${cert.file}`)}
                  alt={cert.name}
                  onError={(e) => (e.target.style.display = "none")}
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm duration-300">
                  <span className="text-white font-mono text-xs tracking-[0.2em] px-5 py-2.5 bg-black/50 rounded-full border border-white/20 font-bold">
                    VIEW
                  </span>
                </div>
              </div>
              <div className="p-5 border-t border-white/5 bg-black/20">
                <h4 className="text-white font-bold text-sm mb-1 line-clamp-2 leading-snug">{cert.name}</h4>
                <p className="text-gray-500 text-xs font-mono uppercase tracking-wider">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModal(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh]"
            >
              <button
                onClick={() => setModal(null)}
                className="absolute -top-16 right-0 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all"
              >
                <FiX size={28} />
              </button>
              <img
                src={asset(`/data/${modal.file}`)}
                alt={modal.name}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML +=
                    '<div class="w-full aspect-[4/3] bg-white/5 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center text-white p-8"><h3 class="text-3xl font-bold mb-4">Image Not Found</h3><p class="text-gray-400 text-center font-light">The certification image could not be loaded. Ensure it exists in the public/data folder.</p></div>';
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

// 7. Contact
const Contact = () => {
  const links = [
    { name: "GitHub", icon: FiGithub, url: "https://github.com/ashhar-raza", text: "github.com/ashhar-raza" },
    { name: "LinkedIn", icon: FiLinkedin, url: "https://www.linkedin.com/in/ashhar-raza", text: "linkedin.com/in/ashhar-raza" },
    { name: "LeetCode", icon: FiCode, url: "https://leetcode.com/u/raza_ashhar/", text: "leetcode.com/u/raza_ashhar" },
    { name: "Email", icon: FiMail, url: "mailto:razaashhar2002@gmail.com", text: "razaashhar2002@gmail.com" },
  ];

  return (
    <section id="contact" className="py-32 px-6 md:px-12 relative z-10 overflow-hidden">
      {/* Footer Gradients */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-t from-blue-900/40 via-purple-900/20 to-transparent blur-3xl -z-10"></div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-4 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-sm font-mono tracking-[0.2em] text-gray-300 uppercase">Say Hello</span>
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-black text-white tracking-tighter mb-8 leading-none">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 italic">Connect.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
            Exploring senior & mid-level engineering roles at product companies working on real scale problems. Let's build something great.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith("mailto") ? "_self" : "_blank"}
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex flex-col items-center justify-center p-10 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.06] hover:border-white/20 transition-all group hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                >
                  <Icon className="text-5xl text-gray-400 group-hover:text-blue-400 mb-6 transition-colors" />
                  <span className="text-2xl font-bold text-white mb-2">{link.name}</span>
                  <span className="text-sm font-mono text-gray-500 group-hover:text-gray-300 transition-colors uppercase truncate w-full max-w-[200px] text-center tracking-wider">
                    {link.text}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        <div className="mt-32 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-gray-600 font-mono tracking-widest uppercase">
          <p>© {new Date().getFullYear()} Ashhar Ahmad Raza.</p>
          <p>
            Built with <span className="text-gray-300 font-bold">React & Tailwind v4</span>
          </p>
        </div>
      </div>
    </section>
  );
};

// --- APP ROOT ---
export default function Portfolio3() {
  return (
    <div className="bg-[#050505] min-h-screen text-slate-300 font-sans selection:bg-blue-500/40 selection:text-white overflow-x-hidden">
      <NavBar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Certifications />
        <Contact />
      </main>
    </div>
  );
}
