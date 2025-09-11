import React, { useState } from "react";
import { FaBars, FaTimes, FaJava, FaReact, FaNodeJs, FaDatabase, FaDocker, FaGithub, FaHtml5, FaCss3Alt } from "react-icons/fa";
import { SiCplusplus, SiJavascript, SiTypescript, SiPython, SiKubernetes, SiMongodb, SiOracle, SiPostman, SiTailwindcss } from "react-icons/si";

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6 bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg rounded-b-3xl relative z-50">
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          Ashhar Raza
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-white/90">
          <a href="#skills" className="relative group hover:text-white transition-colors duration-300">
            Skills
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#projects" className="relative group hover:text-white transition-colors duration-300">
            Projects
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="relative group hover:text-white transition-colors duration-300">
            Contact
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all group-hover:w-full"></span>
          </a>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-3xl focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu - Black Glass Overlay */}
        {menuOpen && (
          <div className="absolute top-full right-0 w-60 bg-black/60 backdrop-blur-md rounded-xl flex flex-col items-start py-6 px-4 space-y-4 md:hidden z-50 shadow-lg mt-2">
            <a href="#skills" onClick={toggleMenu} className="text-lg text-white hover:text-teal-400 transition-colors duration-300 w-full text-right">Skills</a>
            <a href="#projects" onClick={toggleMenu} className="text-lg text-white hover:text-teal-400 transition-colors duration-300 w-full text-right">Projects</a>
            <a href="#contact" onClick={toggleMenu} className="text-lg text-white hover:text-teal-400 transition-colors duration-300 w-full text-right">Contact</a>
          </div>
        )}


      </nav>

      <main className="px-6 md:px-20 py-10 space-y-12 relative z-10">
        {/* Summary */}
        <section className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-teal-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-teal-400 mb-3">Summary</h2>
          <p>
            Full Stack Developer with deep expertise in Java (OOP, Hibernate, Kafka) and the MERN stack (MongoDB, Express, ReactJS, NodeJS). Experienced in designing scalable web, mobile, and enterprise apps with a strong foundation in DSA, OOP, and System Design. Solved 500+ coding challenges and led end-to-end deployment and CI/CD pipelines for multiple projects.
          </p>
        </section>

        {/* Professional Experience */}
        <section className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
          <h2 className="text-2xl font-semibold text-teal-400 mb-3">Professional Experience</h2>
          <h3 className="font-bold">Software Developer — Peol Technologies Pvt. Ltd. (Oct 2023 – Present)</h3>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Delivered 8+ full stack applications using Java, MERN stack, and microservices architecture.</li>
            <li>Optimized APIs and database queries, boosting system efficiency by 40%.</li>
            <li>Implemented real-time systems using Kafka, WebSockets, and Redis caching.</li>
            <li>Automated deployments using Docker & Kubernetes CI/CD pipelines, reducing release time by 30%.</li>
            <li>Designed secure authentication, payment workflows, and interactive dashboards for end-users.</li>
          </ul>
        </section>

        {/* Skills */}
        <section id="skills">
          <h2 className="text-2xl font-semibold text-teal-400 mb-6">Skills</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Programming Languages */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-red-500/10 to-pink-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Programming Languages</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <div className="flex flex-col items-center"><FaJava /><span className="text-sm mt-1">Java</span></div>
                <div className="flex flex-col items-center"><SiCplusplus /><span className="text-sm mt-1">C++</span></div>
                <div className="flex flex-col items-center"><SiJavascript /><span className="text-sm mt-1">JS</span></div>
                <div className="flex flex-col items-center"><SiTypescript /><span className="text-sm mt-1">TS</span></div>
                <div className="flex flex-col items-center"><SiPython /><span className="text-sm mt-1">Python</span></div>
              </div>
            </div>

            {/* Frontend */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-blue-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Frontend</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <div className="flex flex-col items-center"><FaHtml5 /><span className="text-sm mt-1">HTML</span></div>
                <div className="flex flex-col items-center"><FaCss3Alt /><span className="text-sm mt-1">CSS</span></div>
                <div className="flex flex-col items-center"><SiTailwindcss /><span className="text-sm mt-1">Tailwind</span></div>
                <div className="flex flex-col items-center"><FaReact /><span className="text-sm mt-1">React</span></div>
              </div>
            </div>

            {/* Backend */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-green-500/10 to-green-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Backend</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <div className="flex flex-col items-center"><FaNodeJs /><span className="text-sm mt-1">Node.js</span></div>
                <div className="flex flex-col items-center"><FaReact /><span className="text-sm mt-1">Express</span></div>
              </div>
              <p className="mt-2 text-sm">Node.js, ExpressJS, REST APIs, WebSockets, JWT, Hibernate, Microservices</p>
            </div>

            {/* Database */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-purple-500/10 to-indigo-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Database</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <SiMongodb /><FaDatabase /><SiOracle />
              </div>
              <p className="mt-2 text-sm">MySQL, MongoDB, Oracle, Query Optimization</p>
            </div>

            {/* DevOps */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-orange-500/10 to-red-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">DevOps</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <FaDocker /><SiKubernetes />
              </div>
              <p className="mt-2 text-sm">Docker, Kubernetes, NGINX, CI/CD, Cloud Deployment</p>
            </div>

            {/* Tools */}
            <div className="backdrop-blur-lg bg-gradient-to-r from-gray-500/10 to-gray-400/20 p-6 rounded-3xl shadow-xl 
                            hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
              <h3 className="font-bold text-lg mb-3 text-teal-400">Tools</h3>
              <div className="flex flex-wrap gap-3 items-center text-white text-3xl">
                <FaGithub /><SiPostman />
              </div>
              <p className="mt-2 text-sm">Git, GitHub, Postman, VS Code, IntelliJ IDEA, JUnit</p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="space-y-8">
          <h2 className="text-2xl font-semibold text-teal-400">Projects</h2>

          {/* Gia School */}
          <div className="backdrop-blur-lg bg-gradient-to-r from-indigo-500/10 to-cyan-400/20 p-6 rounded-3xl shadow-xl 
                  hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-bold text-lg">Gia School (EdTech Platform)</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Built interactive web + mobile dashboards for students and teachers with 99% uptime using ReactJS and TailwindCSS.</li>
              <li>Implemented JWT authentication, RBAC, and Bcrypt encryption for secure login and data protection.</li>
              <li>Enabled real-time classrooms, chats, and notifications using Kafka streams & Redis caching for low-latency communication.</li>
              <li>Optimized React frontend with Query caching & offline-first mobile flows, improving UX by 50%.</li>
              <li>Designed modular backend APIs in Node.js and MongoDB, enabling seamless scalability for future growth.</li>
              <li>Implemented CI/CD pipelines using Docker & Kubernetes, reducing deployment time and downtime.</li>
            </ul>
          </div>

          {/* Kaveri */}
          <div className="backdrop-blur-lg bg-gradient-to-r from-teal-500/10 to-cyan-400/20 p-6 rounded-3xl shadow-xl 
                  hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-bold text-lg">Kaveri (Enterprise Operations Suite)</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Developed a web + mobile operations suite for logistics management, serving 500+ concurrent users.</li>
              <li>Built real-time reporting and audit trails using Kafka streams for operational analytics.</li>
              <li>Enhanced API security with JWT, RBAC, input sanitization, and OWASP-compliant hardening.</li>
              <li>Implemented modular architecture and CI/CD pipelines, improving release efficiency by 60%.</li>
              <li>Optimized database queries in MongoDB and Node.js backend to reduce latency and improve performance.</li>
              <li>Integrated Docker & Kubernetes for containerized deployment, ensuring consistent production environments.</li>
            </ul>
          </div>

          {/* Masthi Review W */}
          <div className="backdrop-blur-lg bg-gradient-to-r from-pink-500/10 to-red-400/20 p-6 rounded-3xl shadow-xl 
                  hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-bold text-lg">Masthi Review  (Movie Review Platform)</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Developed a full-stack movie review platform using ReactJS, Node.js, Express, and SQL, integrating APIs from IMDB, Google, and Rotten Tomatoes.</li>
              <li>Optimized API requests and caching strategies, increasing request efficiency by 30% and reducing response time.</li>
              <li>Enhanced dynamic UI with interactive charts, visual analytics, and movie ratings dashboards, boosting user engagement by 25%.</li>
              <li>Built an admin panel for CRUD operations on movies, allowing real-time updates and reducing administrative tasks by 40%.</li>
              <li>Implemented JWT-based authentication and role-based access control to secure sensitive admin operations.</li>
              <li>Utilized modern DevOps tools (Docker, GitHub Actions) to streamline deployment and ensure production stability.</li>
            </ul>
          </div>

          {/* Zerox Point W */}
          <div className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-teal-400/20 p-6 rounded-3xl shadow-xl 
                  hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-bold text-lg">Zerox Point  (Admin & Vendor Platform)</h3>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Created a scalable web application for admin and vendor roles using ReactJS, Node.js, and SQL, streamlining task management by 30%.</li>
              <li>Integrated real-time OTP-based login system to enhance security and reduce login failures by 20%.</li>
              <li>Designed a dynamic, responsive UI for both desktop and mobile, improving user experience and retention by 15%.</li>
              <li>Developed vendor task tracking features with real-time notifications to admins, reducing response time by 25%.</li>
              <li>Implemented role-based dashboards with analytics for task completion and performance monitoring.</li>
              <li>Optimized backend performance using Node.js and SQL query optimization, ensuring low-latency data retrieval and robust system stability.</li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="backdrop-blur-lg bg-gradient-to-r from-cyan-500/10 to-teal-400/20 p-6 rounded-3xl shadow-xl 
                                        hover:shadow-2xl hover:scale-105 hover:-translate-y-1 transition-transform duration-300 text-center">
          <h2 className="text-2xl font-semibold text-teal-400 mb-4">Contact</h2>
          <p>Email: <a href="mailto:razaashhar2002@gmail.com" className="text-white hover:underline">razaashhar2002@gmail.com</a></p>
          <p>Phone: <span className="text-white">+91 7277862662</span></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/ashhar-raza" target="_blank" className="text-white hover:underline">linkedin.com/in/ashhar-raza</a></p>
          <p>GitHub: <a href="https://github.com/ashhar-raza" target="_blank" className="text-white hover:underline">github.com/ashhar-raza</a></p>
        </section>
      </main>
    </div>
  );
}