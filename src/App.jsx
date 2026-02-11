import React, { useState } from "react";
import {
  FaBars, FaTimes, FaJava, FaReact, FaNodeJs, FaDatabase,
  FaDocker, FaGithub, FaHtml5, FaCss3Alt, FaAws
} from "react-icons/fa";
import {
  SiCplusplus, SiJavascript, SiTypescript, SiPython,
  SiKubernetes, SiMongodb, SiOracle, SiPostman,
  SiTailwindcss, SiApachekafka, SiRedis
} from "react-icons/si";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg rounded-b-3xl relative z-50">
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide">Ashhar Raza</h1>
          <p className="hidden md:block text-sm text-white/70">
            Software Engineer | Java Backend & Scalable Systems
          </p>
        </div>

        <div className="hidden md:flex gap-8">
          {["skills", "architecture", "projects", "contact"].map(s => (
            <a key={s} href={`#${s}`} className="hover:text-white transition">
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </a>
          ))}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-3xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <main className="px-6 md:px-20 py-10 space-y-14">

        {/* SUMMARY */}
        <section className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-teal-400/20 p-6 rounded-3xl shadow-xl 
        hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-teal-400 mb-3">Summary</h2>
          <p>
            Software Engineer with 2+ years of experience building scalable backend and full-stack systems.
            Strong expertise in Java, Spring Boot, System Design, and Microservices with hands-on experience
            using Kafka, Redis, Docker, Kubernetes, and AWS. Solved 500+ DSA problems and built real-time,
            cloud-deployed systems.
          </p>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Languages */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-red-500/10 to-pink-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Programming Languages</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <FaJava /><SiCplusplus /><SiJavascript /><SiTypescript /><SiPython />
              </div>
            </div>

            {/* Frontend */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-blue-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Frontend</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <FaHtml5 /><FaCss3Alt /><SiTailwindcss /><FaReact />
              </div>
              <p className="mt-2 text-sm">React.js, React Native, Responsive UI</p>
            </div>

            {/* Backend */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-green-500/10 to-green-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Backend</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <FaNodeJs /><SiApachekafka /><SiRedis />
              </div>
              <p className="mt-2 text-sm">
                Java, Spring Boot, Node.js, Microservices, Kafka, Redis, Multithreading
              </p>
            </div>

            {/* Database */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Database</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <SiMongodb /><FaDatabase /><SiOracle />
              </div>
              <p className="mt-2 text-sm">MySQL, PostgreSQL, MongoDB, Oracle SQL, Redis</p>
            </div>

            {/* DevOps */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-orange-500/10 to-red-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">DevOps & Cloud</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <FaDocker /><SiKubernetes /><FaAws />
              </div>
              <p className="mt-2 text-sm">Docker, Kubernetes, AWS, CI/CD, NGINX</p>
            </div>

            {/* Tools */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-gray-500/10 to-gray-400/20 p-6 rounded-3xl shadow-xl 
            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Tools</h3>
              <div className="flex flex-wrap gap-3 text-3xl">
                <FaGithub /><SiPostman />
              </div>
              <p className="mt-2 text-sm">Git, GitHub, Postman, JUnit, Mockito</p>
            </div>

          </div>
        </section>

        {/* ARCHITECTURE */}
        <section id="architecture" className="space-y-6">
          <h2 className="text-2xl font-semibold text-teal-400">Architecture & System Design</h2>

          <ArchitectureCard
            title="Event-Driven Microservices"
            desc="Kafka-based pipelines for real-time ingestion, fan-out processing, retries, and fault tolerance."
          />
          <ArchitectureCard
            title="Caching & Performance"
            desc="Redis used for hot data caching and rate limiting, reducing DB load and latency."
          />
          <ArchitectureCard
            title="Cloud Deployment"
            desc="Containerized services deployed on AWS using Docker, Kubernetes, and CI/CD pipelines."
          />
        </section>

        {/* PROJECTS */}
        <section id="projects" className="space-y-10">
          <h2 className="text-2xl font-semibold text-teal-400">Projects</h2>

          <ProjectCard
            title="CryptBuyer — Real-Time Cryptocurrency Exchange"
            bullets={[
              "Java & Spring Boot backend consuming live price feeds every second from 3rd-party providers.",
              "Kafka used for real-time streaming of market data and order events.",
              "Redis caching for latest prices and order books.",
              "Microservices for wallet, trades, pricing, and notifications.",
              "React.js web dashboard and React Native mobile app.",
              "Deployed on AWS with Docker & Kubernetes."
            ]}
          />

          <ProjectCard
            title="Gia School — Scalable EdTech Platform"
            bullets={[
              "Backend services handling thousands of concurrent users.",
              "Kafka-powered notifications and Redis caching.",
              "JWT authentication and role-based access control.",
              "40% performance improvement via async processing.",
              "Designed modular microservices to support future feature expansion.",
              "Deployed containerized services using Docker and Kubernetes for horizontal scaling."
            ]}
          />


          <ProjectCard
            title="Kaveri — Enterprise Operations Platform"
            bullets={[
              "Kafka-based audit logs and reporting pipelines.",
              "Designed REST APIs for compliance-heavy workflows.",
              "Reduced production issues by 30% using observability.",
              "Implemented structured logging and alerting for faster issue diagnosis.",
              "Optimized database queries and backend workflows to improve response times."
            ]}
          />


          <ProjectCard
            title="Zerox Point — Admin & Vendor Platform"
            bullets={[
              "Built a scalable role-based web platform for admins and vendors using React.js, Node.js, and SQL, improving task management efficiency by 30%.",
              "Implemented secure OTP-based authentication, reducing login failures by 20%.",
              "Designed responsive dashboards for desktop and mobile, increasing user retention by 15%.",
              "Developed real-time vendor task tracking with admin notifications, reducing response time by 25%.",
              "Created analytics-driven role-based dashboards for performance monitoring and task insights.",
              "Optimized backend APIs and SQL queries to ensure low-latency data access and system stability."
            ]}
          />

        </section>

        {/* Contact */}
        <section
          id="contact"
          className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-teal-400/20 p-6 rounded-3xl shadow-xl
             hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300 text-center"
        >
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Contact</h2>

          <p className="text-white mb-2">
            Phone :- <span>7277862662</span>
          </p>

          <p className="text-white">
            <a
              href="mailto:razaashhar2002@gmail.com"
              className="hover:underline mx-2"
            >
              Email
            </a>
            |
            <a
              href="https://www.linkedin.com/in/ashhar-raza"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-2"
            >
              LinkedIn
            </a>
            |
            <a
              href="https://github.com/ashhar-raza"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-2"
            >
              GitHub
            </a>
            |
            <a
              href="https://leetcode.com/u/raza_ashhar/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline mx-2"
            >
              LeetCode
            </a>
          </p>

        </section>

      </main>
    </div>
  );
}

/* ---------- REUSABLE ---------- */

const ProjectCard = ({ title, bullets }) => (
  <div className="backdrop-blur-lg bg-gradient-to-r from-indigo-500/10 to-cyan-400/20 p-6 rounded-3xl shadow-xl 
  hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
    <h3 className="font-bold text-lg mb-3">{title}</h3>
    <ul className="list-disc list-inside space-y-1">
      {bullets.map((b, i) => <li key={i}>{b}</li>)}
    </ul>
  </div>
);

const ArchitectureCard = ({ title, desc }) => (
  <div className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl">
    <h3 className="font-bold text-lg">{title}</h3>
    <p className="text-sm mt-2">{desc}</p>
  </div>
);
