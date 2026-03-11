import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./index.css";

const data = [
  { name: "Неделя 1", До: 1200, После: 1200 },
  { name: "Неделя 2", До: 1100, После: 1800 },
  { name: "Неделя 3", До: 900, После: 4200 },
  { name: "Неделя 4", До: 800, После: 9600 },
  { name: "Неделя 5", До: 700, После: 18500 },
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

export default function App() {
  return (
    <div className="container">

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <div className="logo-main">NKS</div>
          <div className="logo-sub">CREATIVE AGENCY</div>
          <div className="logo-line"></div>
        </div>
        <div>
          <button className="button">Консалтинг</button>
          <button className="button">Прайс-лист</button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <h2>Контент, который превращается<br/>в системный рост</h2>
        <p>Мы создаём стратегию контента, которая масштабирует охваты и превращает просмотры в систему роста.</p>
        <button className="button">Начать масштабирование</button>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.15)" />
              <XAxis dataKey="name" stroke="white"/>
              <YAxis stroke="white"/>
              <Tooltip contentStyle={{backgroundColor:"black",border:"none"}}/>
              <Line type="monotone" dataKey="До" stroke="#ffffff" strokeWidth={2} />
              <Line type="monotone" dataKey="После" stroke="#38bdf8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* НАШИ ВОЗМОЖНОСТИ */}
      <section>
        <h3>Наши возможности</h3>
        <div className="grid">
          {services.map((item,index)=>(
            <div className="card" key={index}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* КОМУ МЫ ПОМОГАЕМ */}
      <section>
        <h3>Кому мы помогаем</h3>
        <div className="grid">
          <div className="card"><h4>Бренды</h4><p>Создаём вирусный контент для роста узнаваемости.</p></div>
          <div className="card"><h4>Интернет-магазины</h4><p>Контент, который увеличивает продажи.</p></div>
          <div className="card"><h4>Креаторы</h4><p>Система роста охватов и подписчиков.</p></div>
          <div className="card"><h4>Инфлюенсеры</h4><p>Масштабируем личный бренд.</p></div>
          <div className="card"><h4>Агентства</h4><p>Создаём вирусный контент для клиентов.</p></div>
          <div className="card"><h4>Стартапы</h4><p>Помогаем быстро набирать аудиторию.</p></div>
        </div>
      </section>

      {/* МЕТОДОЛОГИЯ */}
      <section>
        <h3>Методология успеха</h3>
        <div className="grid">
          {methodology.map((item,index)=>(
            <div className="card" key={index}>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <footer>
        © {new Date().getFullYear()} NKS Creative Agency
      </footer>
    </div>
  );
}