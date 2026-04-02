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
  { name: "Week 1", before: 1200, after: 1200 },
  { name: "Week 2", before: 1100, after: 1800 },
  { name: "Week 3", before: 900, after: 4200 },
  { name: "Week 4", before: 800, after: 9600 },
  { name: "Week 5", before: 700, after: 18500 }
];

const testimonials = [
  {
    name: "Алексей",
    text: "Вышли на 100k+ подписчиков",
    img: "https://i.pravatar.cc/100?img=3"
  },
  {
    name: "Мария",
    text: "Просмотры выросли в 10 раз",
    img: "https://i.pravatar.cc/100?img=5"
  },
  {
    name: "Илья",
    text: "Миллионы просмотров стабильно",
    img: "https://i.pravatar.cc/100?img=8"
  }
];

export default function App() {
  return (
    <div className="container">

      {/* HEADER */}
      <header className="header">
        <div className="logo-main">NKS</div>

        <nav className="nav">
          <a href="#">Services</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Контент, который превращается в рост</h2>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />

              <Line type="monotone" dataKey="before" stroke="#888" />
              <Line type="monotone" dataKey="after" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section>
        <h3>Отзывы</h3>
        <div className="grid">
          {testimonials.map((t, i) => (
            <div className="card" key={i}>
              <img src={t.img} className="avatar" alt="" />
              <h4>{t.name}</h4>
              <p>{t.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <h3>О нас</h3>
        <p className="about-text">
          Мы создаём контент, который масштабирует бренды.
        </p>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>Есть ли вам что сказать?</h3>
        <button className="button">Готовы выслушать вашу идею</button>
      </section>

      <footer>
        © {new Date().getFullYear()} NKS Vector
      </footer>

    </div>
  );
}
