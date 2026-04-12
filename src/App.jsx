import React, { useEffect, useState, useRef } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import "./index.css";

const translations = {
  ru: {
    nav: { consulting: "Консалтинг", pricing: "Прайс-лист" },
    footerNav: { services: "Наши возможности", audience: "Кому мы помогаем", methodology: "Методология", testimonials: "Отзывы" },
    hero: {
      badge: "Агентство YouTube & Shorts",
      title: "Контент, который превращается<br />в системный рост",
      text: "Мы создаём data-driven стратегию контента, которая пробивает алгоритмы, масштабирует охваты и превращает зрителей в фанатов.",
      btn: "Начать масштабирование"
    },
    chart: {
      title: "Динамика просмотров", subtitle: "Органический рост за 5 недель",
      before: "До нас", after: "С NKS", w1: "Неделя 1", w2: "Неделя 2", w3: "Неделя 3", w4: "Неделя 4", w5: "Неделя 5"
    },
    stats: [
      { number: "4+", label: "Года на рынке" }, { number: "120+", label: "Успешных проектов" },
      { number: "500M+", label: "Сгенерировано просмотров" }, { number: "15", label: "Экспертов в команде" }
    ],
    servicesTitle: "Наши возможности",
    services: [
      { title: "Вирусная аналитика", text: "Анализируем скрытые паттерны алгоритмов и создаём форматы, обреченные на виральность.", tags: ["#Тренды", "#Ресерч", "#Алгоритмы"] },
      { title: "Сценарии удержания", text: "Проектируем каждую секунду видео так, чтобы зритель не мог свайпнуть. Глубокая работа с триггерами.", tags: ["#Retention", "#Копирайтинг", "#Hooks"] },
      { title: "Премиальный монтаж", text: "Динамичный, но чистый эдит. Визуальные эффекты, которые удерживают внимание.", tags: ["#VFX", "#Саунд-дизайн", "#Dynamics"] },
      { title: "Комплексная стратегия", text: "Разрабатываем долгосрочную систему контента, которая регулярно генерирует целевой трафик.", tags: ["#Positioning", "#Воронки"] },
      { title: "Упаковка бренда", text: "Формируем сильную визуальную узнаваемость вашего проекта в медиа-пространстве.", tags: ["#Identity", "#Смыслы", "#Design"] },
      { title: "Deep Аналитика", text: "Докручиваем форматы и стратегии на основе реальных данных удержания.", tags: ["#A/B Tests", "#Metrics", "#Optimization"] }
    ],
    showcase1: "Создаем стратегию контента. Проектируем каждую секунду видео.",
    audienceTitle: "Кому мы помогаем",
    audience: [
      { title: "Бренды и Компании", text: "Конвертируем просмотры в лояльность. Построение HR-бренда.", stats: "Узнаваемость x3" },
      { title: "E-commerce", text: "Продуктовый контент, который продает нативно через тренды.", stats: "Lower CPA" },
      { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа.", stats: "Save 40h/month" },
      { title: "Инфлюенсеры", text: "Масштабирование личного бренда, выход на новые площадки.", stats: "New Markets" },
      { title: "Агентства", text: "Закрываем потребность в production под ключ для ваших клиентов.", stats: "White-label" },
      { title: "Стартапы", text: "Быстрый рост аудитории с нуля для валидации гипотез.", stats: "Quick Start" }
    ],
    methodologyTitle: "Методология",
    methodology: [
      { title: "Research", subtitle: "Stage 01", text: "Глубокий анализ ниши, конкурентов и трендов." },
      { title: "Script", subtitle: "Stage 02", text: "Сценарий с кривой удержания и сильными хуками." },
      { title: "Production", subtitle: "Stage 03", text: "Помощь со съемкой или полная генерация визуала." },
      { title: "Edit", subtitle: "Stage 04", text: "Сборка ролика: цветокоррекция, графика, саунд-дизайн." },
      { title: "Publishing", subtitle: "Stage 05", text: "SEO-оптимизация, теги, обложки и время публикации." },
      { title: "Analytics", subtitle: "Stage 06", text: "Сбор данных после публикации и корректировка спринта." }
    ],
    showcase2: "Премиальный монтаж. Data-driven решения для вирусных охватов.",
    testimonialsTitle: "Результаты и отзывы",
    testimonials: [
      // Славянская внешность (женский пол)
      { name: "Екатерина Миронова", role: "CEO TechStartup", text: "Команда NKS выстроила для нас предсказуемую систему роста. Наши последние Shorts пробили 1.5M просмотров, и мы видим реальный приток целевых заявок.", img: "/ru_female_1.png" },
      // Славянская внешность (мужской пол)
      { name: "Иван Петров", role: "Маркетинг-директор", text: "Мы не просто получаем миллионы просмотров; мы видим реальную конверсию в продажи. NKS полностью трансформировали наше восприятие контент-маркетинга.", img: "/ru_male_1.png" },
      // Славянская внешность (мужской пол)
      { name: "Илья Белов", role: "Крипто-инфлюенсер", text: "Парни знают магические паттерны алгоритмов Shorts. Я раньше тратил тысячи на рекламу, теперь просмотры растут органически. Аудитория выросла на 150к за месяц!", img: "/ru_male_2.png" },
      // Славянская внешность (женский пол)
      { name: "Елена Кович", role: "EdTech Platform Owner", text: "Нам нужна была сильная узнаваемость в СНГ. NKS Vector взяли на себя всё: от ресерча тем до финального саунд-дизайна. Стабильно по 3-4 вирусных ролика в месяц.", img: "/ru_female_2.png" },
      // Славянская внешность (мужской пол)
      { name: "Алексей Смирнов", role: " CEO Недвижимость", text: "Сделали упор на экспертные обзоры с премиальным монтажом. Закрыли две сделки чисто с органики канала. data-driven подход работает!", img: "/ru_male_3.png" },
      // Славянская внешность (женский пол)
      { name: "Мария Голубева", role: "Маркетолог", text: "Бренд стал визуально сильнее. Наши Shorts выглядят так вкусно, что столики теперь бронируют на неделю вперед. Анимации и ритмика монтажа — просто космос.", img: "/ru_female_3.png" }
    ],
    footer: "Системный рост контента."
  },
  en: {
    nav: { consulting: "Consulting", pricing: "Pricing" },
    footerNav: { services: "Our Capabilities", audience: "Who We Help", methodology: "Methodology", testimonials: "Reviews" },
    hero: {
      badge: "YouTube & Shorts Agency",
      title: "Content that turns into<br />systemic growth",
      text: "We create a data-driven content strategy that breaks through algorithms, scales reach, and turns viewers into loyal fans.",
      btn: "Start Scaling"
    },
    chart: {
      title: "View Dynamics", subtitle: "Organic growth over 5 weeks",
      before: "Before Us", after: "With NKS", w1: "Week 1", w2: "Week 2", w3: "Week 3", w4: "Week 4", w5: "Week 5"
    },
    stats: [
      { number: "4+", label: "Years on Market" }, { number: "120+", label: "Successful Projects" },
      { number: "500M+", label: "Views Generated" }, { number: "15", label: "Team Experts" }
    ],
    servicesTitle: "Our Capabilities",
    services: [
      { title: "Viral Analytics", text: "We analyze hidden algorithm patterns and create formats destined for virality.", tags: ["#Trends", "#Research", "#Algorithms"] },
      { title: "Retention Scripts", text: "We design every second of the video so the viewer can't swipe away.", tags: ["#Retention", "#Copywriting", "#Hooks"] },
      { title: "Premium Editing", text: "Dynamic yet clean edit. Visual effects that hold attention.", tags: ["#VFX", "#Sound Design", "#Dynamics"] },
      { title: "Complex Strategy", text: "We develop a long-term content system that regularly generates targeted traffic.", tags: ["#Positioning", "#Funnels"] },
      { title: "Brand Packaging", text: "We form strong visual recognition of your project in the media space.", tags: ["#Identity", "#Meanings", "#Design"] },
      { title: "Deep Analytics", text: "We tweak formats and strategies based on real retention data.", tags: ["#A/B Tests", "#Metrics", "#Optimization"] }
    ],
    showcase1: "We create content strategy. We design every second of the video.",
    audienceTitle: "Who We Help",
    audience: [
      { title: "Brands & Companies", text: "Convert views into loyalty. Building HR brand.", stats: "Brand awareness x3" },
      { title: "E-commerce", text: "Product content that sells natively through trends.", stats: "Lower CPA" },
      { title: "Creators", text: "We take over all routine from ideas to editing.", stats: "Save 40h/month" },
      { title: "Influencers", text: "Scaling personal brand, entering new platforms.", stats: "New Markets" },
      { title: "Agencies", text: "Close the need for turnkey production for your clients.", stats: "White-label" },
      { title: "Startups", text: "Fast audience growth from scratch to validate hypotheses.", stats: "Quick Start" }
    ],
    methodologyTitle: "Methodology",
    methodology: [
      { title: "Research", subtitle: "Stage 01", text: "Deep analysis of the niche, competitors, and trends." },
      { title: "Script", subtitle: "Stage 02", text: "Writing script with retention curve and strong hooks." },
      { title: "Production", subtitle: "Stage 03", text: "Assistance with shooting or full visual material generation." },
      { title: "Edit", subtitle: "Stage 04", text: "Video assembly: color correction, graphics, sound design." },
      { title: "Publishing", subtitle: "Stage 05", text: "SEO optimization, correct tags, thumbnail and publishing time." },
      { title: "Analytics", subtitle: "Stage 06", text: "Data collection after publication and adjustment of sprint." }
    ],
    showcase2: "Premium editing. Data-driven solutions for viral reach.",
    testimonialsTitle: "Results & Reviews",
    testimonials: [
      // Европейская внешность (женский пол)
      { name: "Jessica Bloom", role: "CEO TechStartup", text: "NKS completely flipped our content game. We don't just get millions of views; we see actual conversions. Sales are up 300%.", img: "/en_female_1.png" },
      // Европейская внешность (мужской пол)
      { name: "Michael Vance", role: "Venture Capitalist", text: "The team built a predictable system for us. We grew 10x in six months. data-driven magic!", img: "/en_male_1.png" },
      // Европейская внешность (женский пол)
      { name: "Chloe O'Donnell", role: "Fitness Influencer", text: "They completely transformed my personal brand. The 'Retention Scripts' they use for Shorts are mind-blowing. My community is thriving!", img: "/en_female_2.png" },
      // Европейская внешность (мужской пол)
      { name: "David Foster", role: "EdTech Platform", text: "We needed strong brand awareness. NKS Vector took over everything: from topic research to final sound design. CPA dropped to a third.", img: "/en_male_2.png" },
      // Европейская внешность (женский пол)
      { name: "Robert Davies", role: "Head of Marketing", text: "I doubted if YouTube was right for luxury real estate. I was wrong. We focused on expert reviews. Closed two high-ticket deals.", img: "/en_male_3.png" },
      // Европейская внешность (женский пол)
      { name: "Emily Watson", role: "Beauty Brand Owner", text: "I used to spend thousands on ads and shoutouts. Now, views grow organically. These guys know algorithm patterns.", img: "/en_female_3.png" }
    ],
    footer: "Systemic content growth."
  },
  uz: {
    nav: { consulting: "Konsalting", pricing: "Narxlar" },
    footerNav: { services: "Bizning imkoniyatlarimiz", audience: "Kimga yordam beramiz", methodology: "Metodologiya", testimonials: "Sharhlar" },
    hero: {
      badge: "YouTube va Shorts Agentligi",
      title: "Tizimli o'sishga olib keladigan<br />kontent",
      text: "Biz algoritmlarni yorib o'tuvchi, qamrovni kengaytiruvchi va tomoshabinlarni muxlislarga aylantiruvchi data-driven kontent strategiyasini yaratamiz.",
      btn: "Kengaytirishni boshlash"
    },
    chart: {
      title: "Ko'rishlar dinamikasi", subtitle: "5 hafta davomidagi organik o'sish",
      before: "Bizgacha", after: "NKS bilan", w1: "1-hafta", w2: "2-hafta", w3: "3-hafta", w4: "4-hafta", w5: "5-hafta"
    },
    stats: [
      { number: "4+", label: "Bozordagi yillar" }, { number: "120+", label: "Muvaffaqiyatli loyihalar" },
      { number: "500M+", label: "Yig'ilgan ko'rishlar" }, { number: "15", label: "Jamoadagi ekspertlar" }
    ],
    servicesTitle: "Bizning imkoniyatlarimiz",
    services: [
      { title: "Virusli tahlil", text: "Algoritmlarning yashirin naqshlarini tahlil qilamiz va virusli formatlarni yaratamiz.", tags: ["#Trendlar", "#Izlanish", "#Algoritmlar"] },
      { title: "Ushlab qolish ssenariylari", text: "Tomoshabin videoni o'tkazib yubormasligi uchun har bir soniyani loyihalashtiramiz.", tags: ["#Retention", "#Kopirayting", "#Huklar"] },
      { title: "Premium montaj", text: "Dinamik, ammo toza tahrir. E'tiborni tortadigan effectlar.", tags: ["#VFX", "#Ovoz dizayni", "#Dynamics"] },
      { title: "Kompleks strategiya", text: "Trafikni yaratadigan uзоq muddatli kontent tizimini ishlab chiqamiz.", tags: ["#Positioning", "#Voronkalar"] },
      { title: "Brend qadoqlash", text: "Media makonida loyihangizning kuchli vizual tan olinishini shakllantiramiz.", tags: ["#Identity", "#Meanings", "#Design"] },
      { title: "Chuqur tahlil", text: "Haqiqiy ma'lumotlar asosida formatlar va strategiyalarni moslashtiramiz.", tags: ["#A/B Tests", "#Metrics", "#Optimization"] }
    ],
    showcase1: "Kontent strategiyasini yaratamiz. Videoning har bir soniyasini loyihalashtiramiz.",
    audienceTitle: "Kimga yordam beramiz",
    audience: [
      { title: "Brendlar va Kompaniyalar", text: "Ko'rishlarni sodiqlik va mijozlarga aylantiramiz.", stats: "Taniqlik x3" },
      { title: "E-commerce", text: "sharhlar va trendlar orqali tabiiy ravishda sotadigan kontent.", stats: "Lower CPA" },
      { title: "Kreatorlar", text: "G'oyalardan tortib montajgacha bo'lgan barcha ishlarni zimmamizга olamiz.", stats: "Oyiga 40s tejash" },
      { title: "Infliuyenserlar", text: "Shaxsiy brendni kengaytirish, yangi platformalarga chiqish.", stats: "Yangi bozorlar" },
      { title: "Agentliklar", text: "Mijozlaringiz uchun tayyor prodyuserlik ehtiyojini yopamiz.", stats: "White-label" },
      { title: "Startaplar", text: "Gipotezalarni tasdiqlash uchun tezkor auditoriya o'sishi.", stats: "Tezkor start" }
    ],
    methodologyTitle: "Metodologiya",
    methodology: [
      { title: "Research", subtitle: "Stage 01", text: "Nisha, raqobatchilar va trendlarni tahlil qilish." },
      { title: "Script", subtitle: "Stage 02", text: "Ssenariy, ushlab qolish egri chizig'i va kuchli huklar." },
      { title: "Production", subtitle: "Stage 03", text: "Suratga olishda yordam berish yoki to'liq vizual generatsiya." },
      { title: "Edit", subtitle: "Stage 04", text: "Video montaj: rang berish, grafika, ovoz dizayni." },
      { title: "Publishing", subtitle: "Stage 05", text: "SEO optimallashtirish, teglar, muqovalar ва nashr vaqti." },
      { title: "Analytics", subtitle: "Stage 06", text: "Nashrdan keyin ma'lumotlarni yig'ish va sprintni tuzatish." }
    ],
    showcase2: "Premium montaj. Virusli qamrov uchun data-driven yechimlar.",
    testimonialsTitle: "Natijalar va sharhlar",
    testimonials: [
      // Азиатская/Узбекская внешность (мужской пол)
      { name: "Alisher Umarov", role: "Fintech Startap CEO", text: "NKS jamoasi biz uchun o'sish tizimini qurdi. Oxirgi Shorts videolrimiz 1.5M ko'rish yig'di, data-driven yondashuv amalda!", img: "/uz_male_1.png" },
      // Азиатская/Узбекская внешность (мужской пол)
      { name: "Jasur Atayev", role: "CEO", text: "Yigitlar bashorat qilinadigan tizim qurdilar. Yarim yilda 10 barobar o'sdik. Yaqinda YouTube kumush tugmasini oldik.", img: "/uz_male_2.png" },
      // Азиатская/Узбекская внешность (мужской пол)
      { name: "Rustam Soliyev", role: "Маркетолог", text: "Oldinlari reklamaga minglab dollar sarflardim. Hozir ko'rishlar о'z-o'zidan о'smoqda. Ajoyib natija!", img: "/uz_male_3.png" },
      // Азиатская/Узбекская внешность (женский пол)
      { name: "Madina Hakimova", role: "Бизнес Owner", text: "Shaxsiy brendimni kengaytirishda yordam berishdi. Shorts ushlab qolish ssenariylari aql bovar qilmaydi.", img: "/uz_female_1.png" },
      // Азиатская/Узбекская внешность (мужской пол)
      { name: "Aziz Rakhimov", role: "Finansist", text: "Ekspertlik sharhlari orqali kanalning o'zidan ikkita katta premium obyektni sotdik. YouTube rostdan ishlaydi.", img: "/uz_male_4.png" },
      // Азиатская/Узбекская внешность (женский пол)
      { name: "Malika Sharipova", role: "EdTech Platform", text: "Bizga kuchli taniqlilik kerak edi. NKS Vector toza montajgacha hammasini qildi. Kostenlar 3 barobar tushdi.", img: "/uz_female_2.png" }
    ],
    footer: "Kontentning tizimli o'sishi."
  }
};

const partners = ["NEXUS GLOBAL", "AURA FINANCE", "VERTEX MEDIA", "ELEVATE E-COM", "LUMINA AI", "QUANTUM DYNAMICS", "PINNACLE VENTURES"];
// Изменили на png и новые пути
const imgViralGrowth = "/showcase1.png"; 
const imgRhythmDynamics = "/showcase2.png"; 

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [lang, setLang] = useState("ru");

  useEffect(() => {
    const savedTheme = localStorage.getItem("nks-theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "light") document.body.classList.add("light-theme");

    const savedLang = localStorage.getItem("nks-lang") || "ru";
    setLang(savedLang);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('.card') || e.target.closest('.footer-links span') || e.target.closest('.footer-nav-grid span')) {
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

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem("nks-lang", newLang);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const t = translations[lang];

  const tgBtnText = lang === 'ru' ? 'Написать в Telegram' : lang === 'en' ? 'Contact on Telegram' : 'Telegram orqali yozish';

  const chartData = [
    { name: t.chart.w1, before: 1200, after: 1200 },
    { name: t.chart.w2, before: 1100, after: 1800 },
    { name: t.chart.w3, before: 900, after: 4200 },
    { name: t.chart.w4, before: 800, after: 9600 },
    { name: t.chart.w5, before: 700, after: 18500 }
  ];

  const axisColor = theme === 'dark' ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const gridColor = theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)";
  const tooltipBg = theme === 'dark' ? "rgba(10, 15, 30, 0.9)" : "rgba(255, 255, 255, 0.9)";
  const tooltipText = theme === 'dark' ? "#fff" : "#0f172a";

  const formatYAxis = (tickItem) => tickItem >= 1000 ? (tickItem / 1000) + 'k' : tickItem;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: tooltipBg, border: `1px solid rgba(14, 165, 233, 0.3)`, padding: "16px", borderRadius: "12px", backdropFilter: "blur(10px)", color: tooltipText, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600", fontSize: "14px", borderBottom: "1px solid rgba(14,165,233,0.2)", paddingBottom: "6px" }}>{label}</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: index === 0 ? "8px" : "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: entry.color }}></span><span style={{ fontSize: "14px", opacity: 0.8 }}>{entry.name}:</span></div>
              <span style={{ fontWeight: "700", fontSize: "16px", marginLeft: "auto" }}>{entry.value.toLocaleString('ru-RU')}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
          opacity: mousePosition.x === 0 ? 0 : 1
        }}
        transition={{ type: "tween", duration: 0 }}
      />

      <header className="header">
        <div className="header-inner">
          <div className="logo"><div className="logo-main">NKS</div><div className="logo-line"></div></div>
          <div className="buttons-group">
            <div className="lang-switcher">
              <button className={`lang-btn ${lang === 'ru' ? 'active' : ''}`} onClick={() => changeLanguage('ru')}>RU</button>
              <button className={`lang-btn ${lang === 'en' ? 'active' : ''}`} onClick={() => changeLanguage('en')}>EN</button>
              <button className={`lang-btn ${lang === 'uz' ? 'active' : ''}`} onClick={() => changeLanguage('uz')}>UZ</button>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              ) : (
                 <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
              )}
            </button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>{t.nav.consulting}</button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>{t.nav.pricing}</button>
          </div>
        </div>
      </header>

      <motion.section className="hero" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-badge">{t.hero.badge}</div>
        <h2 dangerouslySetInnerHTML={{ __html: t.hero.title }}></h2>
        <p className="hero-text">{t.hero.text}</p>
        <button className="button main-cta" onClick={() => window.open("https://t.me/NKSmanager")}>{t.hero.btn}</button>
        <motion.div className="chart-box" variants={fadeUp}>
          <div className="chart-header">
            <div><span className="chart-title">{t.chart.title}</span><span className="chart-subtitle">{t.chart.subtitle}</span></div>
            <div className="chart-legend">
              <span className="legend-item"><span className="dot dot-before"></span>{t.chart.before}</span>
              <span className="legend-item"><span className="dot dot-after"></span>{t.chart.after}</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dy={15} />
              <YAxis tickFormatter={formatYAxis} stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} width={40} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(14, 165, 233, 0.2)', strokeWidth: 2, strokeDasharray: '5 5' }} />
              <Line name={t.chart.before} type="monotone" dataKey="before" stroke="#64748b" strokeWidth={3} dot={{ r: 4, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line name={t.chart.after} type="monotone" dataKey="after" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 5, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 8, stroke: "#38bdf8", strokeWidth: 2, boxShadow: "0 0 10px #38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.section>

      <motion.section className="stats-section" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}>
        {t.stats.map((stat, idx) => (
          <motion.div key={idx} className="stat-block" variants={fadeUp}><div className="stat-number">{stat.number}</div><div className="stat-label">{stat.label}</div></motion.div>
        ))}
      </motion.section>

      <section className="partners-section">
        <div className="marquee-container">
          <div className="marquee-content">{partners.map((p, idx) => <span key={idx} className="partner-logo">{p}</span>)}</div>
          <div className="marquee-content" aria-hidden="true">{partners.map((p, idx) => <span key={idx} className="partner-logo">{p}</span>)}</div>
        </div>
      </section>

      <Section id="services" title={t.servicesTitle} data={t.services} />
      <ImageShowcase imgUrl={imgViralGrowth} headline={t.showcase1} />
      <Section id="audience" title={t.audienceTitle} data={t.audience} />
      <Section id="methodology" title={t.methodologyTitle} data={t.methodology} isNumbered />
      <ImageShowcase imgUrl={imgRhythmDynamics} headline={t.showcase2} isReversed />

      {/* СЕКЦИЯ ОТЗЫВОВ */}
      <section id="testimonials" className="testimonials-section">
        <h3>{t.testimonialsTitle}</h3>
        <div className="testimonials-marquee-container">
          <div className="testimonials-track">
            {t.testimonials.map((tItem, i) => (
              <div key={i} className="card testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar-frame">
                    <img src={tItem.img} className="avatar" alt={tItem.name} />
                  </div>
                  <div className="testimonial-info">
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">“{tItem.text}”</p>
              </div>
            ))}
          </div>
          <div className="testimonials-track" aria-hidden="true">
            {t.testimonials.map((tItem, i) => (
              <div key={i + 100} className="card testimonial-card">
                <div className="testimonial-header">
                  <div className="avatar-frame">
                    <img src={tItem.img} className="avatar" alt={tItem.name} />
                  </div>
                  <div className="testimonial-info">
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                    <div className="stars">★★★★★</div>
                  </div>
                </div>
                <p className="testimonial-text">“{tItem.text}”</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОБНОВЛЕННЫЙ FOOTER */}
      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="logo-main footer-logo">NKS</div>
            <p className="footer-slogan">{t.footer}</p>
          </div>
          
          <div className="footer-nav-grid">
            <span onClick={() => scrollToSection('services')}>{t.footerNav.services}</span>
            <span onClick={() => scrollToSection('audience')}>{t.footerNav.audience}</span>
            <span onClick={() => scrollToSection('methodology')}>{t.footerNav.methodology}</span>
            <span onClick={() => scrollToSection('testimonials')}>{t.footerNav.testimonials}</span>
          </div>

          <div className="footer-social">
            <button className="tg-button" onClick={() => window.open("https://t.me/NKSmanager")}>
              <span className="tg-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </span>
              <span className="tg-text">{tgBtnText}</span>
            </button>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} NKS Vector. All rights reserved.</p>
          <div className="footer-links">
            <span onClick={() => window.open("https://t.me/NKSmanager")}>{t.nav.consulting}</span>
            <span onClick={() => window.open("https://t.me/NKSmanager")}>{t.nav.pricing}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Добавили пропс `id` для функции скролла
function Section({ id, title, data, isNumbered }) {
  return (
    <motion.section id={id} className="content-section" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
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
            {item.tags && <div className="tags-container">{item.tags.map((tag, idx) => <span key={idx} className="tag">{tag}</span>)}</div>}
            {item.stats && <div className="stats-badge"><span className="stats-icon">↗</span> <span>{item.stats}</span></div>}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function ImageShowcase({ imgUrl, headline, isReversed }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const skewX = useTransform(smoothProgress, [0, 1], isReversed ? [25, -25] : [-25, 25]);
  const opacityText = useTransform(smoothProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

  return (
    <div ref={ref} className="image-showcase-container">
      <motion.div className="image-showcase-inner" style={{ rotateX: skewX, willChange: "transform" }}>
        <img src={imgUrl} alt="Showcase" className="showcase-bg-image" />
        <div className="image-overlay" />
        <motion.div className="showcase-text-content" style={{ opacity: opacityText, y: isReversed ? 60 : -60 }}>
          <span className="showcase-badge">NKS Vector Production</span>
          <h2 className="showcase-headline">{headline}</h2>
        </motion.div>
      </motion.div>
    </div>
  );
}
