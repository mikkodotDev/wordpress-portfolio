// ============================================================
// Mikko Dot Dev — Junior WordPress Developer Portfolio
// Stack: React + Tailwind CSS + Framer Motion + React Icons
// Theme: Light mode, Poppins, Blue/Indigo accents
// ============================================================

import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiX,
  FiExternalLink,
  FiGithub,
  FiMail,
  FiArrowRight,
  FiCode,
  FiLayers,
  FiSmartphone,
  FiShoppingCart,
  FiStar,
  FiCheck,
  FiZap,
  FiTarget,
} from "react-icons/fi";
import {
  FaWordpress,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaFigma,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaEnvelope,
  FaCanadianMapleLeaf,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiElementor,
  SiWoocommerce,
  SiVercel,
  SiCanva,
  SiSpectrum,
} from "react-icons/si";
import ProjectDetail from "./ProjectDetail";

// ─── Utility: fade-up animation variant ───────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// ─── Hook: animate section when in view ───────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: threshold });
  return [ref, inView];
}

// ─── Cursor Circle Component ───────────────────────────────
function CursorCircle() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed w-3 h-3 bg-blue-700 rounded-full transition-opacity duration-200 ${
        isVisible ? "opacity-60" : "opacity-0"
      }`}
      style={{
        left: `${position.x - 6}px`,
        top: `${position.y - 6}px`,
        zIndex: 50,
      }}
    />
  );
}

// ─── NAV LINKS ─────────────────────────────────────────────
const NAV_LINKS = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Services",
  "Contact",
];

// ─── SKILLS DATA ───────────────────────────────────────────
const SKILLS = {
  Frontend: [
    { label: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
    { label: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
    { label: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
    { label: "React", icon: <FaReact className="text-cyan-500" /> },
    {
      label: "Tailwind CSS",
      icon: <SiTailwindcss className="text-teal-500" />,
    },
  ],
  WordPress: [
    { label: "WordPress", icon: <FaWordpress className="text-blue-700" /> },
    { label: "Elementor", icon: <SiElementor className="text-pink-600" /> },
    { label: "Gutenberg", icon: <SiElementor className="text-black-600" /> },
    { label: "Spectra", icon: <SiSpectrum className="text-pink-600" /> },
    {
      label: "WooCommerce",
      icon: <SiWoocommerce className="text-purple-600" />,
    },
    {
      label: "Responsive Design",
      icon: <FiSmartphone className="text-indigo-600" />,
    },
    {
      label: "Basic SEO (Yoast, RankMath)",
      icon: <FiStar className="text-amber-500" />,
    },
  ],
  "Tools & Plugins": [
    { label: "LiteSpeed Cache", icon: <FiZap className="text-yellow-500" /> },
    { label: "WPForms", icon: <FiLayers className="text-blue-600" /> },
    { label: "Rank Math SEO", icon: <FiTarget className="text-red-600" /> },
    { label: "GitHub", icon: <FaGithub className="text-gray-800" /> },
    { label: "Vercel", icon: <SiVercel className="text-black" /> },
    { label: "Figma", icon: <FaFigma className="text-violet-600" /> },
  ],
};

// ─── SERVICES DATA ─────────────────────────────────────────
const SERVICES = [
  {
    icon: <FaWordpress size={32} />,
    title: "WordPress Website Development",
    description:
      "Custom WordPress websites tailored to your business needs — from blog setups to full business sites with plugins, themes, and performance optimization.",
    color: "blue",
  },
  {
    icon: <FiShoppingCart size={32} />,
    title: "eCommerce Website Design",
    description:
      "WooCommerce-powered online stores designed for conversions — featuring product pages, cart flows, and mobile-first shopping experiences.",
    color: "violet",
  },
  {
    icon: <FiSmartphone size={32} />,
    title: "Responsive Web Design",
    description:
      "Pixel-perfect, fully responsive websites that look and perform beautifully on every screen size — desktop, tablet, and mobile.",
    color: "indigo",
  },
];

// ─── COLOR MAP ─────────────────────────────────────────────
const colorMap = {
  blue: {
    bg: "bg-blue-50",
    border: "border-blue-100",
    icon: "text-blue-600",
    tag: "bg-blue-100 text-blue-700",
    hover: "group-hover:bg-blue-600",
    ring: "ring-blue-200",
  },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-100",
    icon: "text-violet-600",
    tag: "bg-violet-100 text-violet-700",
    hover: "group-hover:bg-violet-600",
    ring: "ring-violet-200",
  },
  indigo: {
    bg: "bg-indigo-50",
    border: "border-indigo-100",
    icon: "text-indigo-600",
    tag: "bg-indigo-100 text-indigo-700",
    hover: "group-hover:bg-indigo-600",
    ring: "ring-indigo-200",
  },
};

// ============================================================
// COMPONENTS
// ============================================================

// ─── NAVBAR ────────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = (link) => {
    setOpen(false);
    const el = document.getElementById(link.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-xl tracking-tight text-slate-900"
          >
            <span className="text-blue-600">Mikko</span>
            <span className="text-slate-400 font-light mx-0.5">.</span>
            <span>Dev</span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200"
              >
                {link}
              </button>
            ))}
            <button
              onClick={() => handleNav("Contact")}
              className="ml-3 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all duration-200 shadow-sm shadow-blue-200"
            >
              Hire Me
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white border-t border-slate-100 shadow-lg overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => handleNav(link)}
                  className="text-left py-3 px-3 text-slate-700 font-medium hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => handleNav("Contact")}
                className="mt-2 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-50/60 overflow-hidden pt-16"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-blue-100/60 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/4" />
        {/* Subtle dot grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.5" fill="#3b82f6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full ring-1 ring-blue-200">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Available for Freelance & Junior Roles
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-slate-900 tracking-tight"
            >
              Building Modern{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                WordPress
              </span>{" "}
              Websites for Businesses
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-slate-500 leading-relaxed max-w-xl font-normal"
            >
              Junior WordPress Developer focused on responsive websites,
              WordPress development, and modern frontend experiences.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-wrap gap-3 pt-2"
            >
              <button
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-200"
              >
                View Projects
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="flex items-center gap-2 px-6 py-3 bg-white text-slate-700 font-semibold hover:bg-slate-50 transition-all duration-200 shadow-sm ring-1 ring-slate-200"
              >
                Contact Me
              </button>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="flex flex-wrap gap-8 pt-4 border-t border-slate-200"
            >
              {[
                { num: "2+", label: "Projects Built" },
                { num: "100%", label: "Responsive" },
                { num: "WP", label: "Focused Dev" },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className="text-2xl font-bold text-slate-900">{num}</div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Developer visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[480px]">
              {/* Main card: About Me Image */}
              <img
                src="/images/AboutmeIMG.JPG"
                alt="Mikko - Junior WordPress Developer"
                className="w-full rounded-2xl shadow-2xl shadow-slate-300/60 ring-1 ring-slate-200 object-cover h-[480px]"
              />

              {/* Floating badge: WordPress */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "easeInOut",
                }}
                className="absolute -top-5 -left-6 bg-white rounded-xl px-4 py-2.5 shadow-lg ring-1 ring-slate-100 flex items-center gap-2"
              >
                <FaWordpress className="text-blue-600" size={20} />
                <span className="text-sm font-semibold text-slate-700">
                  WordPress
                </span>
              </motion.div>

              {/* Floating badge: React */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-5 -right-5 bg-white rounded-xl px-4 py-2.5 shadow-lg ring-1 ring-slate-100 flex items-center gap-2"
              >
                <FaReact
                  className="text-cyan-500 animate-spin"
                  style={{ animationDuration: "6s" }}
                  size={20}
                />
                <span className="text-sm font-semibold text-slate-700">
                  React
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── SECTION WRAPPER ───────────────────────────────────────
function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">{children}</div>
    </section>
  );
}

// ─── SECTION HEADING ───────────────────────────────────────
function SectionHeading({ badge, title, subtitle }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="text-center mb-16 space-y-4"
    >
      {badge && (
        <motion.span
          variants={fadeUp}
          className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full ring-1 ring-blue-100"
        >
          {badge}
        </motion.span>
      )}
      <motion.h2
        variants={fadeUp}
        custom={1}
        className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-slate-500 max-w-2xl mx-auto text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── ABOUT ─────────────────────────────────────────────────
function About() {
  const [ref, inView] = useReveal();
  return (
    <Section id="about" className="bg-white">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: Visual */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-10 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200/40 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/40 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative space-y-5">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                M
              </div>
              <div>
                <div className="text-xl font-bold text-slate-900">
                  Mikko Jardenico
                </div>
                <div className="text-blue-600 font-medium text-sm">
                  Junior WordPress Developer
                </div>
              </div>

              {/* Tech stack chips */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  "WordPress",
                  "Elementor",
                  "WooCommerce",
                  "React",
                  "Tailwind",
                  "Figma",
                ].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-white text-slate-700 text-xs font-semibold rounded-full shadow-sm ring-1 ring-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Check list */}
              <div className="space-y-2 pt-2">
                {[
                  "Open to freelance projects",
                  "Available for junior roles",
                  "Fast learner & team player",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <FiCheck className="text-green-500 shrink-0" size={16} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full ring-1 ring-blue-100">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Passionate About Building{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Great Websites
            </span>
          </h2>
          <div className="space-y-4 text-slate-500 leading-relaxed text-[15px]">
            <p>
              Hi! I'm Mikko Jardenico, a junior web developer with a strong
              focus on WordPress development. I enjoy crafting responsive,
              user-centered websites that look great and perform well on any
              device.
            </p>
            <p>
              I work primarily with WordPress — building custom themes, working
              with Elementor for visual layouts, and setting up WooCommerce
              stores for clients who need eCommerce solutions. I'm also
              expanding my skill set into modern frontend development with React
              and Tailwind CSS.
            </p>
            <p>
              I care deeply about clean code, pixel-perfect design, and
              delivering websites that truly serve the people who use them.
              Whether it's a business landing page or a full online store, I
              approach every project with attention to detail and a commitment
              to quality.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-full text-sm hover:bg-blue-700 transition shadow-sm shadow-blue-200"
            >
              See My Work{" "}
              <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-5 py-2.5 text-slate-700 font-semibold rounded-full text-sm hover:bg-slate-100 transition ring-1 ring-slate-200"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}

// ─── SKILLS ────────────────────────────────────────────────
function Skills() {
  const [ref, inView] = useReveal();
  return (
    <Section id="skills" className="bg-slate-50">
      <SectionHeading
        badge="Tech Stack"
        title="Skills & Technologies"
        subtitle="A curated set of tools and technologies I use to build modern, responsive websites."
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-3 gap-6"
      >
        {Object.entries(SKILLS).map(([category, items], ci) => (
          <motion.div
            key={category}
            variants={fadeUp}
            custom={ci}
            className="bg-white p-6 shadow-sm ring-1 ring-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                <FiCode className="text-blue-600" size={18} />
              </div>
              <h3 className="font-bold text-slate-900">{category}</h3>
            </div>
            <div className="space-y-3">
              {items.map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition group"
                >
                  <span className="text-xl">{icon}</span>
                  <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 transition">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ─── PROJECTS ──────────────────────────────────────────────
function Projects() {
  const [ref, inView] = useReveal();
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error loading projects:", err));
  }, []);

  return (
    <Section id="projects" className="bg-white">
      <SectionHeading
        badge="My Work"
        title="Featured Projects"
        subtitle="A look at some of the websites I've designed and developed."
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-2 gap-8"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            variants={fadeUp}
            custom={i}
            onClick={() => navigate(`/project/${project.id}`)}
            className="group bg-white overflow-hidden shadow-sm ring-1 ring-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-400 cursor-pointer"
          >
            {/* Project Image */}
            <div
              className="relative h-52 overflow-hidden bg-slate-200"
              style={{
                backgroundImage: `url('${project.image}')`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center top",
              }}
            >
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full ring-1 ring-white/30">
                  {project.category}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                {project.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      colorMap[project.accent].tag
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* View Project Link */}
              <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition pt-2">
                View Project{" "}
                <FiArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

// ─── SERVICES ──────────────────────────────────────────────
function Services() {
  const [ref, inView] = useReveal();
  return (
    <Section id="services" className="bg-slate-50">
      <SectionHeading
        badge="What I Offer"
        title="Services"
        subtitle="Professional web development services tailored for businesses and individuals."
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="grid md:grid-cols-3 gap-6"
      >
        {SERVICES.map((service, i) => {
          const c = colorMap[service.color];
          return (
            <motion.div
              key={service.title}
              variants={fadeUp}
              custom={i}
              className={`group bg-white p-7 shadow-sm ring-1 ${c.border} hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-default`}
            >
              <div
                className={`w-14 h-14 rounded-2xl ${c.bg} flex items-center justify-center mb-5 ${c.icon} group-hover:scale-110 transition-transform duration-300`}
              >
                {service.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-3 leading-snug">
                {service.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {service.description}
              </p>
              <div
                className={`mt-5 pt-5 border-t ${c.border} flex items-center gap-1 text-sm font-semibold ${c.icon}`}
              >
                Learn more{" "}
                <FiArrowRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </Section>
  );
}

// ─── CONTACT ───────────────────────────────────────────────
function Contact() {
  const [ref, inView] = useReveal();

  return (
    <Section id="contact" className="bg-white">
      <SectionHeading
        badge="Get In Touch"
        title="Let's Work Together"
        subtitle="Available for freelance and junior opportunities. Feel free to reach out!"
      />
      <motion.div
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="max-w-2xl"
      >
        {/* Contact info */}
        <motion.div variants={fadeUp} className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Contact Information
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              I'm currently looking for freelance projects and junior developer
              roles. Whether you have a project in mind or just want to connect,
              I'd love to hear from you.
            </p>
          </div>

          {/* Contact links */}
          <div className="space-y-4">
            {[
              {
                icon: <FaEnvelope size={18} />,
                label: "Email",
                value: "mjardenico.dev@gmail.com",
                href: "mailto:mjardenico.dev@gmail.com",
              },
              {
                icon: <FaLinkedin size={18} />,
                label: "LinkedIn",
                value: "linkedin.com/in/mikko-jardenico-3b3626403",
                href: "https://www.linkedin.com/in/mikko-jardenico-3b3626403",
              },
              {
                icon: <FaFacebook size={18} />,
                label: "Facebook",
                value: "facebook.com/ItzMikkoDaSecond",
                href: "https://www.facebook.com/ItzMikkoDaSecond/",
              },
            ].map(({ icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl ring-1 ring-slate-100 hover:bg-blue-50 hover:ring-blue-200 transition group"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {icon}
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-slate-700 group-hover:text-blue-600 transition">
                    {value}
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Availability badge */}
          <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl ring-1 ring-green-100">
            <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse shrink-0" />
            <p className="text-sm font-medium text-green-700">
              Available for freelance and junior opportunities.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-bold text-lg">
              <span className="text-blue-400">Mikko</span>
              <span className="text-slate-500 font-light mx-0.5">.</span>
              <span>Dev</span>
            </div>
            <p className="text-slate-400 text-sm mt-1">
              Junior WordPress Developer
            </p>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap justify-center gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() =>
                  document
                    .getElementById(link.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-slate-400 hover:text-white text-sm transition"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: <FaGithub size={18} />, href: "#" },
              { icon: <FaLinkedin size={18} />, href: "#" },
              { icon: <FaFacebook size={18} />, href: "#" },
              {
                icon: <FaEnvelope size={18} />,
                href: "mailto:mikko@example.com",
              },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Mikko Dot Dev. All rights reserved. Built
          with React & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}

// ─── SCROLL TO TOP BUTTON ──────────────────────────────────
function ScrollTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-10 h-10 bg-blue-600 text-white rounded-full shadow-lg shadow-blue-300/50 flex items-center justify-center hover:bg-blue-700 transition z-50"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ROOT ──────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isProjectPage = location.pathname.startsWith("/project/");

  return (
    <div
      className="font-poppins bg-white text-slate-900 antialiased"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      {/* Poppins font */}
      <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
          * { scroll-behavior: smooth; }
          body { font-family: 'Poppins', sans-serif; }
        `}</style>

      <CursorCircle />
      {!isProjectPage && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/project/:projectId" element={<ProjectDetail />} />
      </Routes>
      <Footer />
      <ScrollTop />
    </div>
  );
}

// ─── Home Page Component ────────────────────────────────────
function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <Contact />
    </main>
  );
}
