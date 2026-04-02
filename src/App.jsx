import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

import { motion } from "framer-motion";
import "./index.css";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 }
  }
};

const data = [
  { name: "Неделя 1", До: 1200, После: 1200 },
  { name: "Неделя 2", До: 1100, После: 1800 },
  { name: "Неделя 3", До: 900, После: 4200 },
  { name: "Неделя 4", До: 800, После: 9600 },
  { name: "Неделя 5", До: 700, После: 18500 }
];

const services = [
  { title: "Вирусная аналитика", text: "Анализируем тренды и создаём форматы, которые залетают в рекомендации." },
  { title: "Сценарии удержания", text: "Каждое видео строится вокруг удержания внимания." },
  { title: "Монтаж", text: "Динамичный монтаж с высоким retention." },
  { title: "Стратегия", text: "Система контента, которая даёт рост." },
  { title: "Бренд", text: "Формируем узнаваемость через контент." },
  { title: "Аналитика", text: "Оптимизация через метрики." }
];

const testimonials = [
  {
    name: "Алексей",
    text: "После работы с командой NKS контент стал системой. Рост х10 и стабильные рекомендации.",
    img: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Мария",
    text: "Теперь каждый ролик работает как часть стратегии — рост стал управляемым.",
    img: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Илья",
    text: "Просмотры стабильно растут без рекламы — контент начал работать сам.",
    img: "https://i.pravatar.cc/100?img=8"
  }
];

export default function App() {
  return (
    <div className="container">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <div className="logo-main">NKS</div>
          <div className="logo-line"></div>
        </div>

        <div className="buttons-group">
          <button
            className="button"
            onClick={() => window.open("https://t.me/NKSmanager")}
          >
            Консалтинг
          </button>

          <button
            className="button secondary"
            onClick={() => window.open("https://t.me/NKSmanager")}
          >
            Прайс-лист
          </button>
        </div>
      </header>

      {/* HERO */}
      <motion.section initial="hidden" animate="show" variants={fadeUp}>
        <h2>
          Контент, который превращается<br />
          в системный рост
        </h2>

        <p className="hero-text">
          Мы создаём стратегию контента, которая масштабирует охваты и превращает просмотры в рост.
        </p>

        <button
          className="button"
          onClick={() => window.open("https://t.me/NKSmanager")}
        >
          Начать масштабирование
        </button>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.12)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip contentStyle={{ backgroundColor: "#0a0f1f", border: "none" }} />

              <Line type="monotone" dataKey="До" stroke="#a78bfa" strokeWidth={2} />
              <Line type="monotone" dataKey="После" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </motion.section>

      <Section title="Наши возможности" data={services} />

      <Section
        title="Кому мы помогаем"
        data={[
          { title: "Бренды", text: "Рост через вирусный контент." },
          { title: "Интернет-магазины", text: "Контент для увеличения продаж." },
          { title: "Креаторы", text: "Системный рост охватов." },
          { title: "Инфлюенсеры", text: "Личный бренд." },
          { title: "Агентства", text: "Контент под клиентов." },
          { title: "Стартапы", text: "Быстрый рост аудитории." }
        ]}
      />

      <Section
        title="Методология"
        data={[
          { title: "Research", text: "Анализ ниши и трендов." },
          { title: "Script", text: "Сценарий с удержанием." },
          { title: "Edit", text: "Динамичный монтаж." },
          { title: "Hook", text: "Сильный первый кадр." },
          { title: "Analytics", text: "Оптимизация через метрики." },
          { title: "Testing", text: "A/B тесты форматов." }
        ]}
      />

      {/* TESTIMONIALS */}
      <motion.section className="grid">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            className="card testimonial"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <img src={t.img} className="avatar" alt={t.name} />
            <h4>{t.name}</h4>
            <p>{t.text}</p>
          </motion.div>
        ))}
      </motion.section>

      <footer>© {new Date().getFullYear()} NKS</footer>
    </div>
  );
}

/* SECTION */
function Section({ title, data }) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <h3>{title}</h3>

      <div className="grid">
        {data.map((item, i) => (
          <motion.div key={i} className="card" whileHover={{ scale: 1.03 }}>
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
