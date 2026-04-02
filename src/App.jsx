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
import "./index.css";

const data = [
  { name: "Неделя 1", before: 1200, after: 1200 },
  { name: "Неделя 2", before: 1100, after: 1800 },
  { name: "Неделя 3", before: 900, after: 4200 },
  { name: "Неделя 4", before: 800, after: 9600 },
  { name: "Неделя 5", before: 700, after: 18500 }
];

const services = [
  { title: "Вирусная аналитика", text: "Находим форматы, которые взрывают просмотры." },
  { title: "Сценарии удержания", text: "Каждая секунда удерживает внимание." },
  { title: "Монтаж", text: "Динамика, которая усиливает вовлечённость." }
];

const testimonials = [
  {
    name: "Алексей",
    text: "После работы с NKS мы получили 100k подписчиков и серебряную кнопку YouTube.",
    img: "https://i.pravatar.cc/100?img=12"
  },
  {
    name: "Мария",
    text: "Просмотры выросли в 8–12 раз. Контент стал вирусным.",
    img: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Илья",
    text: "Теперь каждый ролик стабильно набирает 1M+ просмотров.",
    img: "https://i.pravatar.cc/100?img=8"
  }
];

export default function App() {
  return (
    <div className="container">

      {/* HEADER (УЛУЧШЕННЫЙ, НО ТВОЙ СТИЛЬ) */}
      <header className="header">
        <div className="logo">
          <div className="logo-main">NKS</div>
          <div className="logo-sub">VECTOR</div>
        </div>

        <nav className="nav">
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* HERO (НЕ ТРОГАЕМ СТИЛЬ) */}
      <section className="hero">
        <h2>
          Контент, который превращается<br />
          в системный рост
        </h2>

        <p className="subtext">
          Мы создаём вирусный контент и стратегии роста для брендов и креаторов.
        </p>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />

              <Line type="monotone" dataKey="before" stroke="#888" />
              <Line type="monotone" dataKey="after" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* SERVICES (ТВОЙ СТИЛЬ + ЛЕГКИЙ UPGRADE) */}
      <section id="services">
        <h3>Наши возможности</h3>
        <div className="grid">
          {services.map((s, i) => (
            <div className="card" key={i}>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS (НОВАЯ ФИШКА CUBERTO СТИЛЯ) */}
      <section>
        <h3>Отзывы</h3>
        <div className="grid">
          {testimonials.map((t, i) => (
            <div className="card testimonial" key={i}>
              <img src={t.img} className="avatar" alt="" />
              <h4>{t.name}</h4>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT (БРЕНД-БЛОК КАК У ПРЕМИУМ САЙТОВ) */}
      <section id="about">
        <h3>О нас</h3>
        <p className="about-text">
          NKS Vector — это агентство, которое превращает контент в систему роста.
          Мы не просто делаем ролики — мы создаём стратегию внимания.
        </p>
      </section>

      {/* CTA (КАК У CUBERTO, НО В ТВОЁМ СТИЛЕ) */}
      <section id="contact" className="cta">
        <h3>Есть ли вам что сказать?</h3>
        <p className="about-text">
          Мы открыты к идеям, проектам и коллаборациям.
        </p>
        <button className="button">
          Готовы выслушать вашу идею
        </button>
      </section>

      {/* FOOTER */}
      <footer>
        © {new Date().getFullYear()} NKS Vector
      </footer>

    </div>
  );
}
