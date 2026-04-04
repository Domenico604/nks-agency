import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./index.css";

// ДАННЫЕ
const data = [
  { name: "Нед 1", До: 1200, После: 1200 }, { name: "Нед 2", До: 1100, После: 1800 },
  { name: "Нед 3", До: 900, После: 4200 }, { name: "Нед 4", До: 800, После: 9600 },
  { name: "Нед 5", До: 700, После: 18500 }
];

const partners = ["NEXUS GLOBAL", "AURA FINANCE", "VERTEX MEDIA", "ELEVATE E-COM", "LUMINA AI", "QUANTUM DYNAMICS", "PINNACLE VENTURES"];

const services = [
  { title: "Вирусная аналитика", text: "Анализируем скрытые паттерны алгоритмов и создаём форматы, обреченные на виральность.", tags: ["#Тренды", "#Алгоритмы"] },
  { title: "Сценарии удержания", text: "Проектируем каждую секунду видео так, чтобы зритель не мог свайпнуть.", tags: ["#Retention", "#Хуки"] },
  { title: "Премиальный монтаж", text: "Динамичный, но чистый эдит. Визуальные эффекты, которые удерживают внимание.", tags: ["#VFX", "#Динамика"] },
  { title: "Комплексная стратегия", text: "Разрабатываем долгосрочную систему контента для регулярного трафика.", tags: ["#Воронки"] },
  { title: "Упаковка бренда", text: "Формируем сильную визуальную узнаваемость вашего проекта.", tags: ["#Айдентика"] },
  { title: "Deep Аналитика", text: "Еженедельный разбор метрик и докрутка форматов на основе данных.", tags: ["#Метрики"] }
];

const audience = [
  { title: "Бренды и Компании", text: "Конвертируем просмотры в лояльность.", stats: "Рост узнаваемости x3" },
  { title: "E-commerce", text: "Создаем контент, который продает нативно.", stats: "Снижение CPA" },
  { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа.", stats: "Экономия 40ч/мес" },
  { title: "Инфлюенсеры", text: "Масштабирование личного бренда.", stats: "Новые рынки" },
  { title: "Агентства", text: "Production под ключ для ваших клиентов.", stats: "B2B партнерство" },
  { title: "Стартапы", text: "Быстрый рост аудитории для валидации гипотез.", stats: "Быстрый старт" }
];

const methodology = [
  { title: "Research", step: "01", text: "Анализ ниши, конкурентов и трендов." },
  { title: "Script", step: "02", text: "Сценарий с проработанной кривой удержания." },
  { title: "Production", step: "03", text: "Помощь со съемкой или полная генерация." },
  { title: "Edit", step: "04", text: "Цветокоррекция, графика и саунд-дизайн." },
  { title: "Publishing", step: "05", text: "SEO, теги и обложки." },
  { title: "Analytics", step: "06", text: "Сбор данных и корректировка стратегии." }
];

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    const handleMouse = (e) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => { lenis.destroy(); window.removeEventListener("mousemove", handleMouse); };
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.body.classList.toggle("light-mode");
  };

  return (
    <div className="container">
      <motion.div className="custom-cursor" animate={{ x: mousePos.x - 10, y: mousePos.y - 10 }} transition={{ type: "spring", stiffness: 1000, damping: 40 }} />
      
      <header className="header">
        <div className="header-inner">
          <div className="logo"><div className="logo-main">NKS</div></div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button className="theme-toggle" onClick={toggleTheme}>{isDark ? "☀️" : "🌙"}</button>
            <button className="button" onClick={() => window.open('https://t.me/NKSmanager')}>Консалтинг</button>
          </div>
        </div>
      </header>

      <section className="hero">
        <div style={{ textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '2px', marginBottom: '15px' }}>Agency for the Bold</div>
        <h2>Контент, который превращается <br /> в системный рост</h2>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 40px' }}>
          Мы строим системы захвата внимания, которые пробивают алгоритмы и масштабируют бренды.
        </p>
        <button className="button" style={{ padding: '18px 45px' }}>Начать проект</button>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-secondary)" tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'var(--bg-main)', border: '1px solid var(--card-border)', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="После" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="До" stroke="#64748b" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="partners-section">
        <div className="marquee-content">
          {partners.concat(partners).map((p, i) => <span key={i} className="partner-logo">{p}</span>)}
        </div>
      </section>

      <h3 style={{ marginTop: '100px' }}>Наши возможности</h3>
      <div className="grid">
        {services.map((s, i) => (
          <div key={i} className="card">
            <h4>{s.title}</h4>
            <p>{s.text}</p>
            <div style={{ marginTop: '20px' }}>{s.tags.map(t => <span className="tag">{t}</span>)}</div>
          </div>
        ))}
      </div>

      <ImageShowcase img="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg" title="Data-Driven Стратегия" />

      <h3>Кому мы помогаем</h3>
      <div className="grid">
        {audience.map((a, i) => (
          <div key={i} className="card">
            <h4>{a.title}</h4>
            <p>{a.text}</p>
            <div style={{ marginTop: '15px', color: '#34d399' }}>↗ {a.stats}</div>
          </div>
        ))}
      </div>

      <h3>Методология</h3>
      <div className="grid">
        {methodology.map((m, i) => (
          <div key={i} className="card">
            <span style={{ fontFamily: 'Bebas Neue', fontSize: '2rem', opacity: 0.1 }}>{m.step}</span>
            <h4>{m.title}</h4>
            <p>{m.text}</p>
          </div>
        ))}
      </div>

      <footer style={{ padding: '100px 0', borderTop: '1px solid var(--card-border)', marginTop: '100px' }}>
        <div className="logo-main" style={{ fontSize: '32px', marginBottom: '20px' }}>NKS VECTOR</div>
        <p style={{ color: 'var(--text-secondary)' }}>© 2026 Agency for the Bold. Built for Scale.</p>
      </footer>
    </div>
  );
}

function ImageShowcase({ img, title }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, -10]);

  return (
    <div ref={ref} className="image-showcase-container" style={{ margin: '100px 0' }}>
      <motion.div className="image-showcase-inner" style={{ rotateX }}>
        <img src={img} className="showcase-bg-image" alt="" />
        <div className="image-overlay" />
        <div style={{ position: 'absolute', zIndex: 10, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <h2 style={{ fontSize: '4rem', color: '#fff' }}>{title}</h2>
        </div>
      </motion.div>
    </div>
  );
}
