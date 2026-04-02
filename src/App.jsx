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
  { name: "Неделя 1", До: 1200, После: 1200 },
  { name: "Неделя 2", До: 1100, После: 1800 },
  { name: "Неделя 3", До: 900, После: 4200 },
  { name: "Неделя 4", До: 800, После: 9600 },
  { name: "Неделя 5", До: 700, После: 18500 }
];

const services = [
  { title: "Вирусная аналитика", text: "Мы анализируем тренды и находим форматы, которые набирают миллионы просмотров." },
  { title: "Сценарии удержания", text: "Создаём сценарии, где каждая секунда удерживает внимание аудитории." },
  { title: "Монтаж высокого темпа", text: "Монтаж, который увеличивает удержание и вовлечённость зрителя." },
  { title: "Контент-стратегия", text: "Создаём систему публикаций, которая стабильно масштабирует охваты." },
  { title: "Рост бренда", text: "Помогаем брендам становиться узнаваемыми через вирусный контент." },
  { title: "Контент-аналитика", text: "Отслеживаем метрики и оптимизируем контент для максимального роста." }
];

const methodology = [
  { title: "Research", text: "Анализ трендов, ниши и конкурентов." },
  { title: "Script", text: "Сценарий с психологией удержания." },
  { title: "Edit", text: "Динамичный монтаж и высокий уровень вовлечённости." },
  { title: "Hook", text: "Первые секунды сконструированы для максимального удержания аудитории." },
  { title: "Analytics", text: "Отслеживание метрик и оптимизация контента." },
  { title: "Testing", text: "Проверка вовлечённости и A/B тесты контента." }
];

const testimonials = [
  { name: "Алексей", text: "Рост канала x10 после стратегии.", img: "https://i.pravatar.cc/100?img=12" },
  { name: "Мария", text: "Контент стал стабильно вирусным.", img: "https://i.pravatar.cc/100?img=5" },
  { name: "Илья", text: "Каждый ролик теперь залетает.", img: "https://i.pravatar.cc/100?img=8" }
];

export default function App() {
  return (
    <div className="container">

      {/* HEADER */}
     <header className="header">
  <div className="logo">
    <div className="logo-main">NKS</div>
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
      <section className="hero">
        <h2>
          Контент, который превращается<br />
          в системный рост
        </h2>

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
      </section>

      {/* SERVICES */}
      <section>
        <h3>Наши возможности</h3>
        <div className="grid">
          {services.map((item, i) => (
            <div className="card" key={i}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE HELP */}
      <section>
        <h3>Кому мы помогаем</h3>
        <div className="grid">
          <div className="card"><h4>Бренды</h4><p>Вирусный контент для роста узнаваемости.</p></div>
          <div className="card"><h4>Интернет-магазины</h4><p>Контент, который увеличивает продажи.</p></div>
          <div className="card"><h4>Креаторы</h4><p>Система роста охватов.</p></div>
          <div className="card"><h4>Инфлюенсеры</h4><p>Масштабируем личный бренд.</p></div>
          <div className="card"><h4>Агентства</h4><p>Контент для клиентов.</p></div>
          <div className="card"><h4>Стартапы</h4><p>Быстрый рост аудитории.</p></div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section>
        <h3>Методология успеха</h3>
        <div className="grid">
          {methodology.map((item, i) => (
            <div className="card" key={i}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
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

      {/* CTA */}
      <section className="cta">
        <h3>Есть ли вам что сказать?</h3>
        <p className="hero-text">
          Мы открыты к идеям, проектам и коллаборациям.
        </p>

        <a href="https://t.me/NKSmanager">
          <button className="button glow">Обсудить проект</button>
        </a>
      </section>

      <footer>
        © {new Date().getFullYear()} NKS
      </footer>

    </div>
  );
}
