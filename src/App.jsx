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
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const data = [
  { name: "Неделя 1", До: 1200, После: 1200 },
  { name: "Неделя 2", До: 1100, После: 1800 },
  { name: "Неделя 3", До: 900, После: 4200 },
  { name: "Неделя 4", До: 800, После: 9600 },
  { name: "Неделя 5", До: 700, После: 18500 }
];

const services = [
  { title: "Вирусная аналитика", text: "Мы анализируем тренды и находим форматы, которые стабильно выходят в рекомендации и формируют массовые охваты." },
  { title: "Сценарии удержания", text: "Каждое видео строится вокруг психологии внимания, чтобы зритель досматривал ролик до конца." },
  { title: "Монтаж высокого темпа", text: "Динамичный монтаж усиливает вовлечение и увеличивает retention аудитории." },
  { title: "Контент-стратегия", text: "Система публикаций превращает хаотичный контент в стабильный рост." },
  { title: "Рост бренда", text: "Формируем узнаваемость через вирусные форматы и системный контент." },
  { title: "Контент-аналитика", text: "Постоянная оптимизация контента через метрики и A/B тестирование." }
];

const testimonials = [
  {
    name: "Алексей",
    text: "После внедрения стратегии контент начал работать как система. Просмотры выросли в 10 раз, а каждый ролик стабильно попадает в рекомендации.",
    img: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Мария",
    text: "Контент стал структурированным и предсказуемым по результатам. Раньше это была случайность — сейчас это система роста.",
    img: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Илья",
    text: "Каждый ролик теперь удерживает внимание и приносит стабильные охваты без дополнительного продвижения.",
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
          <a href="https://t.me/NKSmanager">
            <button className="button">Консалтинг</button>
          </a>
          <a href="https://t.me/NKSmanager">
            <button className="button secondary">Прайс-лист</button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <motion.section
        initial="hidden"
        animate="show"
        variants={fadeUp}
      >
        <h2>Контент, который превращается<br />в системный рост</h2>

        <p className="hero-text">
          Мы создаём стратегию контента, которая масштабирует охваты и превращает просмотры в систему роста.
        </p>

        <a href="https://t.me/NKSmanager">
          <button className="button glow">Начать масштабирование</button>
        </a>

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

      {/* SERVICES */}
      <Section title="Наши возможности" data={services} />

      {/* WHO */}
      <Section
        title="Кому мы помогаем"
        data={[
          { title: "Бренды", text: "Рост узнаваемости через вирусный контент." },
          { title: "Интернет-магазины", text: "Контент, который увеличивает продажи." },
          { title: "Креаторы", text: "Стабильный рост охватов." },
          { title: "Инфлюенсеры", text: "Масштаб личного бренда." },
          { title: "Агентства", text: "Контент для клиентов." },
          { title: "Стартапы", text: "Быстрый рост аудитории." }
        ]}
      />

      {/* METHODOLOGY */}
      <Section
        title="Методология"
        data={[
          { title: "Research", text: "Анализ ниши и трендов." },
          { title: "Script", text: "Сценарий с удержанием внимания." },
          { title: "Edit", text: "Динамичный монтаж." },
          { title: "Hook", text: "Сильное начало видео." },
          { title: "Analytics", text: "Оптимизация через метрики." },
          { title: "Testing", text: "A/B тестирование форматов." }
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
            transition={{ delay: i * 0.1 }}
          >
            <img src={t.img} className="avatar" />
            <h4>{t.name}</h4>
            <p>{t.text}</p>
          </motion.div>
        ))}
      </motion.section>

      <footer>© {new Date().getFullYear()} NKS</footer>
    </div>
  );
}

/* reusable section */
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
          <motion.div
            key={i}
            className="card"
            whileHover={{ scale: 1.03 }}
          >
            <h4>{item.title}</h4>
            <p>{item.text}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
