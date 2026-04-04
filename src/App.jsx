import React, { useEffect, useState, useRef } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./index.css";

// --- ТВОИ ОРИГИНАЛЬНЫЕ ДАННЫЕ (БЕЗ ИЗМЕНЕНИЙ) ---
const fadeUp = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.8 } } };
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15 } } };

const data = [
  { name: "Неделя 1", До: 1200, После: 1200 },
  { name: "Неделя 2", До: 1100, После: 1800 },
  { name: "Неделя 3", До: 900, После: 4200 },
  { name: "Неделя 4", До: 800, После: 9600 },
  { name: "Неделя 5", До: 700, После: 18500 }
];

const companyStats = [
  { number: "4+", label: "Года на рынке" },
  { number: "120+", label: "Успешных проектов" },
  { number: "500M+", label: "Сгенерировано просмотров" },
  { number: "15", label: "Экспертов в команде" }
];

const partners = ["NEXUS GLOBAL", "AURA FINANCE", "VERTEX MEDIA", "ELEVATE E-COM", "LUMINA AI", "QUANTUM DYNAMICS", "PINNACLE VENTURES"];

const services = [
  { title: "Вирусная аналитика", text: "Анализируем скрытые паттерны алгоритмов и создаём форматы, обреченные на виральность.", tags: ["#Тренды", "#Ресерч", "#Алгоритмы"] },
  { title: "Сценарии удержания", text: "Проектируем каждую секунду видео так, чтобы зритель не мог свайпнуть.", tags: ["#Retention", "#Копирайтинг", "#Хуки"] },
  { title: "Премиальный монтаж", text: "Динамичный, но чистый эдит. Визуальные эффекты, которые удерживают внимание.", tags: ["#VFX", "#Саунд-дизайн", "#Динамика"] },
  { title: "Комплексная стратегия", text: "Разрабатываем долгосрочную систему контента.", tags: ["#Позиционирование", "#Воронки"] },
  { title: "Упаковка бренда", text: "Формируем сильную визуальную и смысловую узнаваемость.", tags: ["#Айдентика", "#Смыслы"] },
  { title: "Deep Аналитика", text: "Еженедельный разбор метрик.", tags: ["#A/B Тесты", "#Метрики"] }
];

const audience = [
  { title: "Бренды и Компании", text: "Конвертируем просмотры в лояльность.", stats: "Рост узнаваемости x3" },
  { title: "E-commerce", text: "Продуктовый контент, который продает нативно.", stats: "Снижение CPA" },
  { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа.", stats: "Экономия 40ч/мес" },
  { title: "Инфлюенсеры", text: "Масштабирование личного бренда.", stats: "Новые рынки" },
  { title: "Агентства", text: "White-label production под ключ.", stats: "B2B партнерство" },
  { title: "Стартапы", text: "Быстрый рост аудитории с нуля.", stats: "Быстрый старт" }
];

const methodology = [
  { title: "Research", subtitle: "Этап 01", text: "Анализ ниши и конкурентов." },
  { title: "Script", subtitle: "Этап 02", text: "Написание сценария с кривой удержания." },
  { title: "Production", subtitle: "Этап 03", text: "Помощь со съемкой или генерация материала." },
  { title: "Edit", subtitle: "Этап 04", text: "Сборка: цвет, графика, звук." },
  { title: "Publishing", subtitle: "Этап 05", text: "SEO-оптимизация и публикация." },
  { title: "Analytics", subtitle: "Этап 06", text: "Сбор данных и корректировка." }
];

const testimonials = [
  { name: "Алексей", role: "CEO TechStartup", text: "Контент стал предсказуемой системой. Рост х10.", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Мария", role: "Fashion Бренд", text: "Видим реальную конверсию в продажи.", img: "https://i.pravatar.cc/100?img=5" },
  { name: "Илья", role: "Крипто-инфлюенсер", text: "Просмотры растут без вливаний в рекламу.", img: "https://i.pravatar.cc/100?img=8" }
];

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);

    const updateMouse = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", updateMouse);
    return () => { lenis.destroy(); window.removeEventListener("mousemove", updateMouse); };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light-mode');
  };

  return (
    <div className="container">
      {/* КУРСОР */}
      <motion.div 
        className="custom-cursor" 
        animate={{ x: mousePosition.x - 10, y: mousePosition.y - 10, scale: isHovering ? 1.5 : 1 }} 
        transition={{ type: "spring", stiffness: 1200, damping: 35, mass: 0.1 }}
      />

      {/* ШАПКА */}
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-main">NKS</div>
            <div className="logo-line"></div>
          </div>
          <div className="buttons-group">
            <button className="theme-toggle" onClick={toggleTheme}>{isDarkMode ? "☀️" : "🌙"}</button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>Прайс-лист</button>
          </div>
        </div>
      </header>

      {/* ГЕРОЙ */}
      <motion.section className="hero" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-badge">Агентство YouTube & Shorts</div>
        <h2>Контент, который превращается<br />в системный рост</h2>
        <p className="hero-text">Мы создаём data-driven стратегию контента, которая пробивает алгоритмы.</p>
        <button className="button main-cta" onClick={() => window.open("https://t.me/NKSmanager")}>Начать масштабирование</button>

        {/* ГРАФИК */}
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"} vertical={false} />
              <XAxis dataKey="name" stroke={isDarkMode ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: isDarkMode ? '#0f172a' : '#fff', border: 'none', borderRadius: '12px' }} />
              <Line type="monotone" dataKey="После" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="До" stroke="#64748b" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      {/* ТВОИ СЕКЦИИ (ВОЗВРАЩЕНЫ ПОЛНОСТЬЮ) */}
      <section className="stats-section">
        {companyStats.map((stat, i) => (
          <div key={i} className="stat-block">
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </section>

      <section className="partners-section">
        <div className="marquee-container">
          <div className="marquee-content">
            {partners.concat(partners).map((p, i) => <span key={i} className="partner-logo">{p}</span>)}
          </div>
        </div>
      </section>

      <Section title="Наши возможности" data={services} onHover={setIsHovering} />
      
      <ImageShowcase imgUrl="https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg" headline="Проектируем каждую секунду видео." />

      <Section title="Кому мы помогаем" data={audience} onHover={setIsHovering} />
      
      <Section title="Методология" data={methodology} isNumbered onHover={setIsHovering} />

      <section className="testimonials-section">
        <h3>Результаты и отзывы</h3>
        <div className="grid">
          {testimonials.map((t, i) => (
            <div key={i} className="card testimonial-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <img src={t.img} className="avatar" style={{ width: '50px', borderRadius: '50%' }} alt="" />
                <div><h4 style={{ margin: 0 }}>{t.name}</h4><span>{t.role}</span></div>
              </div>
              <p>"{t.text}"</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        <div className="logo-main" style={{ fontSize: '24px' }}>NKS</div>
        <p>© {new Date().getFullYear()} NKS Vector.</p>
      </footer>
    </div>
  );
}

// Компоненты-хелперы (сохранены из твоего кода)
function Section({ title, data, isNumbered, onHover }) {
  return (
    <section className="content-section" onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}>
      <h3>{title}</h3>
      <div className="grid">
        {data.map((item, i) => (
          <div key={i} className="card">
            <div className="card-top">
              {isNumbered && <span className="card-number">0{i+1}</span>}
              <h4>{item.title}</h4>
            </div>
            <p>{item.text}</p>
            {item.tags && <div className="tags-container">{item.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}</div>}
            {item.stats && <div className="stats-badge">↗ {item.stats}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function ImageShowcase({ imgUrl, headline }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <div ref={ref} className="image-showcase-container">
      <motion.div className="image-showcase-inner" style={{ rotateX }}>
        <img src={imgUrl} className="showcase-bg-image" alt="" />
        <div className="image-overlay" />
        <div className="showcase-text-content">
          <h2 style={{ fontSize: '3.5rem', color: '#fff' }}>{headline}</h2>
        </div>
      </motion.div>
    </div>
  );
}
