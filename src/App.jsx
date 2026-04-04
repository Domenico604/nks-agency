import React, { useEffect, useState, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./index.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

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

const partners = [
  "NEXUS GLOBAL", 
  "AURA FINANCE", 
  "VERTEX MEDIA", 
  "ELEVATE E-COM", 
  "LUMINA AI", 
  "QUANTUM DYNAMICS", 
  "PINNACLE VENTURES"
];

const services = [
  { 
    title: "Вирусная аналитика", 
    text: "Анализируем скрытые паттерны алгоритмов и создаём форматы, обреченные на виральность.",
    tags: ["#Тренды", "#Ресерч", "#Алгоритмы"]
  },
  { 
    title: "Сценарии удержания", 
    text: "Проектируем каждую секунду видео так, чтобы зритель не мог свайпнуть. Глубокая работа с триггерами.",
    tags: ["#Retention", "#Копирайтинг", "#Хуки"]
  },
  { 
    title: "Премиальный монтаж", 
    text: "Динамичный, но чистый эдит. Визуальные эффекты, которые удерживают внимание, а не раздражают.",
    tags: ["#VFX", "#Саунд-дизайн", "#Динамика"]
  },
  { 
    title: "Комплексная стратегия", 
    text: "Разрабатываем долгосрочную систему контента, которая регулярно генерирует целевой трафик.",
    tags: ["#Позиционирование", "#Воронки"]
  },
  { 
    title: "Упаковка бренда", 
    text: "Формируем сильную визуальную и смысловую узнаваемость вашего проекта в медиа-пространстве.",
    tags: ["#Айдентика", "#Смыслы", "#Дизайн"]
  },
  { 
    title: "Deep Аналитика", 
    text: "Еженедельный разбор метрик. Докручиваем форматы и стратегии на основе реальных данных удержания.",
    tags: ["#A/B Тесты", "#Метрики", "#Оптимизация"]
  }
];

const audience = [
  { title: "Бренды и Компании", text: "Конвертируем просмотры в лояльность и клиентов. Построение HR-бренда.", stats: "Рост узнаваемости x3" },
  { title: "E-commerce", text: "Создаем продуктовый контент, который продает нативно через обзоры и тренды.", stats: "Снижение CPA" },
  { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа. Вы только снимаетесь.", stats: "Экономия 40ч/мес" },
  { title: "Инфлюенсеры", text: "Масштабирование личного бренда, выход на новые площадки и монетизация.", stats: "Новые рынки" },
  { title: "Агентства", text: "Закрываем потребность в production под ключ для ваших клиентов. White-label.", stats: "B2B партнерство" },
  { title: "Стартапы", text: "Быстрый рост аудитории с нуля для валидации гипотез и привлечения юзеров.", stats: "Быстрый старт" }
];

const methodology = [
  { title: "Research", subtitle: "Этап 01", text: "Глубокий анализ ниши, конкурентов и актуальных трендов платформы." },
  { title: "Script", subtitle: "Этап 02", text: "Написание сценария с проработанной кривой удержания и сильными хуками." },
  { title: "Production", subtitle: "Этап 03", text: "Помощь со съемкой или полная генерация визуального материала." },
  { title: "Edit", subtitle: "Этап 04", text: "Сборка ролика: цветокоррекция, графика, саунд-дизайн и ритмика." },
  { title: "Publishing", subtitle: "Этап 05", text: "SEO-оптимизация, правильные теги, обложки и время публикации." },
  { title: "Analytics", subtitle: "Этап 06", text: "Сбор данных после публикации и корректировка следующего спринта." }
];

const testimonials = [
  { name: "Алексей", role: "CEO TechStartup", text: "Контент стал предсказуемой системой. Рост х10 и стабильные рекомендации.", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Мария", role: "Fashion Бренд", text: "Каждый ролик работает как часть большой воронки — видим конверсию в продажи.", img: "https://i.pravatar.cc/100?img=5" },
  { name: "Илья", role: "Крипто-инфлюенсер", text: "Просмотры растут без вливаний в рекламу. Магия с удержанием аудитории.", img: "https://i.pravatar.cc/100?img=8" }
];

const imgViralGrowth = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600"; 
const imgRhythmDynamics = "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1600"; 

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Инициализация темы из localStorage
    const savedTheme = localStorage.getItem("nks-theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('.card') || e.target.closest('.theme-toggle')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      lenis.destroy();
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.body.classList.add("light-theme");
      localStorage.setItem("nks-theme", "light");
    } else {
      setTheme("dark");
      document.body.classList.remove("light-theme");
      localStorage.setItem("nks-theme", "dark");
    }
  };

  // Динамические цвета для графиков в зависимости от темы
  const axisColor = theme === 'dark' ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const gridColor = theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const tooltipBg = theme === 'dark' ? "rgba(10, 15, 30, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const tooltipBorder = theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = theme === 'dark' ? "#fff" : "#0f172a";

  return (
    <div className="container">
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - (isHovering ? 24 : 10),
          y: mousePosition.y - (isHovering ? 24 : 10),
          scale: isHovering ? 1.5 : 1,
          opacity: mousePosition.x === 0 ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 1200, damping: 35, mass: 0.1 }}
      />

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-main">NKS</div>
            <div className="logo-line"></div>
          </div>

          <div className="buttons-group">
            {/* Кнопка переключения темы */}
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>
              Консалтинг
            </button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>
              Прайс-лист
            </button>
          </div>
        </div>
      </header>

      <motion.section className="hero" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-badge">Агентство YouTube & Shorts</div>
        <h2>
          Контент, который превращается<br />
          в системный рост
        </h2>

        <p className="hero-text">
          Мы создаём data-driven стратегию контента, которая пробивает алгоритмы, масштабирует охваты и превращает зрителей в фанатов.
        </p>

        <button className="button main-cta" onClick={() => window.open("https://t.me/NKSmanager")}>
          Начать масштабирование
        </button>

        <motion.div className="chart-box" variants={fadeUp}>
          <div className="chart-header">
            <div>
              <span className="chart-title">Динамика просмотров</span>
              <span className="chart-subtitle">Органический рост за 5 недель</span>
            </div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot dot-before"></span>До нас</span>
              <span className="legend-item"><span className="dot dot-after"></span>С NKS</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: "12px", backdropFilter: "blur(10px)", color: tooltipText }} 
                itemStyle={{ color: tooltipText }}
              />
              <Line type="monotone" dataKey="До" stroke="#64748b" strokeWidth={2} dot={{ r: 4, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="После" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 5, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 8, stroke: "#38bdf8", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.section>

      <motion.section 
        className="stats-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {companyStats.map((stat, idx) => (
          <motion.div key={idx} className="stat-block" variants={fadeUp}>
            <div className="stat-number">{stat.number}</div>
            <div className="stat-label">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      <section className="partners-section">
        <div className="marquee-container">
          <div className="marquee-content">
            {partners.map((partner, idx) => (
              <span key={idx} className="partner-logo">{partner}</span>
            ))}
          </div>
          <div className="marquee-content" aria-hidden="true">
            {partners.map((partner, idx) => (
              <span key={idx} className="partner-logo">{partner}</span>
            ))}
          </div>
        </div>
      </section>

      <Section title="Наши возможности" data={services} />

      <ImageShowcase 
        imgUrl={imgViralGrowth}
        headline="Создаем стратегию контента. Проектируем каждую секунду видео."
      />

      <Section title="Кому мы помогаем" data={audience} />

      <Section title="Методология" data={methodology} isNumbered />

      <ImageShowcase 
        imgUrl={imgRhythmDynamics}
        headline="Премиальный монтаж. Data-driven решения для вирусных охватов."
        isReversed 
      />

      <motion.section 
        className="testimonials-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <h3>Результаты и отзывы</h3>
        <div className="grid">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="card testimonial-card"
              variants={fadeUp}
            >
              <div className="testimonial-header">
                <img src={t.img} className="avatar" alt={t.name} />
                <div>
                  <h4>{t.name}</h4>
                  <span className="testimonial-role">{t.role}</span>
                </div>
              </div>
              <p>"{t.text}"</p>
              <div className="stars">★★★★★</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <footer>
        <div className="footer-content">
          <div className="logo-main footer-logo">NKS</div>
          <p>© {new Date().getFullYear()} NKS Vector. Системный рост контента.</p>
        </div>
      </footer>
    </div>
  );
}

function Section({ title, data, isNumbered }) {
  return (
    <motion.section
      className="content-section"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={staggerContainer}
    >
      <h3>{title}</h3>
      <div className="grid">
        {data.map((item, i) => (
          <motion.div key={i} className="card" variants={fadeUp}>
            <div className="card-top">
              {item.subtitle && <span className="card-subtitle">{item.subtitle}</span>}
              {isNumbered && !item.subtitle && <span className="card-number">0{i + 1}</span>}
              <h4>{item.title}</h4>
            </div>
            <p>{item.text}</p>
            
            {item.tags && (
              <div className="tags-container">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            )}
            {item.stats && (
              <div className="stats-badge">
                <span className="stats-icon">↗</span> 
                <span>{item.stats}</span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ImageShowcase({ imgUrl, headline, isReversed }) {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const yRange = isReversed ? [25, -25] : [-25, 25]; 
  const skewX = useTransform(smoothProgress, [0, 1], yRange);
  const opacityText = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  return (
    <div ref={ref} className="image-showcase-container">
      <motion.div 
        className="image-showcase-inner"
        style={{
          rotateX: skewX,
          willChange: "transform"
        }}
      >
        <img src={imgUrl} alt="Showcase Background" className="showcase-bg-image" />

        <div className="image-overlay" />
        
        <motion.div 
          className="showcase-text-content"
          style={{ opacity: opacityText, y: isReversed ? 60 : -60 }}
        >
          <span className="showcase-badge">NKS Vector Production</span>
          <h2 className="showcase-headline">{headline}</h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
