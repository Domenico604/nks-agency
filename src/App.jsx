import React, { useEffect, useState, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./index.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const data = [
  { name: "Нед 1", До: 1200, После: 1200 },
  { name: "Нед 2", До: 1100, После: 4200 },
  { name: "Нед 3", До: 900, После: 9600 },
  { name: "Нед 4", До: 800, После: 15500 },
  { name: "Нед 5", До: 700, После: 22000 }
];

const services = [
  { title: "Вирусная аналитика", text: "Анализируем тренды и создаём форматы, которые гарантированно попадают в рекомендации." },
  { title: "Сценарии удержания", text: "Проектируем видео так, чтобы зритель досматривал до последней секунды." },
  { title: "Премиальный монтаж", text: "Динамичный эдит с использованием топовых VFX и саунд-дизайна." },
  { title: "Data Strategy", text: "Принимаем решения на основе метрик и A/B тестов, а не интуиции." }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", updateMouse);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  const chartColors = {
    grid: isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
    text: isDarkMode ? "#94a3b8" : "#475569",
  };

  return (
    <div className="container">
      <motion.div 
        className="custom-cursor" 
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10 }} 
        transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.1 }}
      />

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-main">NKS</div>
            <div className="logo-line"></div>
          </div>
          <div className="buttons-group">
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? "☀️" : "🌙"}
            </button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>Обсудить проект</button>
          </div>
        </div>
      </header>

      <motion.section className="hero" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-badge">YouTube & Shorts Agency</div>
        <h2>Контент, который <br />строит империи</h2>
        <p className="hero-text">Мы помогаем брендам и креаторам захватывать внимание миллионов через системный подход к Reels и Shorts.</p>
        <button className="button main-cta" style={{ padding: '18px 45px', fontSize: '18px' }}>Начать рост</button>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="name" stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="После" stroke="#0ea5e9" strokeWidth={5} dot={{ r: 6, fill: "#0ea5e9" }} />
              <Line type="monotone" dataKey="До" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <Section title="Наши возможности" data={services} />

      <ImageShowcase 
        imgUrl="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600" 
        headline="Data-Driven подход к каждому кадру"
      />

      <section className="testimonials-section">
        <h3>Результаты и отзывы</h3>
        <div className="grid">
          <TestimonialCard 
            name="Алексей" 
            role="CEO Tech Co." 
            text="С NKS мы вышли на 1 млн просмотров в первый же месяц. Это система, а не удача." 
            img="https://i.pravatar.cc/100?img=12" 
          />
          <TestimonialCard 
            name="Мария" 
            role="Fashion Blogger" 
            text="Монтаж просто космос. Мои охваты выросли в 5 раз, и это только начало." 
            img="https://i.pravatar.cc/100?img=5" 
          />
          <TestimonialCard 
            name="Илья" 
            role="Crypto Expert" 
            text="Команда понимает алгоритмы лучше всех на рынке. Рекомендую!" 
            img="https://i.pravatar.cc/100?img=8" 
          />
        </div>
      </section>

      <footer>
        <div className="logo-main" style={{ fontSize: '24px' }}>NKS</div>
        <p>© {new Date().getFullYear()} NKS Vector. Все права защищены.</p>
      </footer>
    </div>
  );
}

function Section({ title, data }) {
  return (
    <motion.section className="content-section" initial="hidden" whileInView="show" viewport={{ once: true }} variants={fadeUp}>
      <h3>{title}</h3>
      <div className="grid">
        {data.map((item, i) => (
          <div key={i} className="card">
            <h4 style={{ color: '#0ea5e9', marginBottom: '10px' }}>{item.title}</h4>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

function TestimonialCard({ name, role, text, img }) {
  return (
    <motion.div className="card testimonial-card" whileHover={{ y: -10 }}>
      <div className="t-header">
        <img src={img} className="avatar" alt={name} />
        <div>
          <h4 style={{ margin: 0 }}>{name}</h4>
          <span style={{ fontSize: '13px', opacity: 0.6 }}>{role}</span>
        </div>
      </div>
      <p style={{ fontStyle: 'italic' }}>"{text}"</p>
      <div className="stars">★★★★★</div>
    </motion.div>
  );
}

function ImageShowcase({ imgUrl, headline }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(useSpring(scrollYProgress, { stiffness: 100, damping: 30 }), [0, 1], [15, -15]);

  return (
    <div ref={ref} className="image-showcase-container">
      <motion.div className="image-showcase-inner" style={{ rotateX }}>
        <img src={imgUrl} className="showcase-bg-image" alt="Background" />
        <div className="image-overlay" />
        <div className="showcase-text-content">
          <h2 style={{ fontSize: '4rem', color: 'white' }}>{headline}</h2>
        </div>
      </motion.div>
    </div>
  );
}
