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

// ==========================================
// СЛОВАРЬ ПЕРЕВОДОВ С УНИКАЛЬНЫМИ ТЕКСТАМИ ОТЗЫВОВ
// ==========================================
const translations = {
  ru: {
    nav: { consulting: "Консалтинг", pricing: "Прайс-лист" },
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
      { title: "Сценарии удержания", text: "Проектируем каждую секунду видео так, чтобы зритель не мог свайпнуть. Глубокая работа с триггерами.", tags: ["#Retention", "#Копирайтинг", "#Хуки"] },
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
      { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа.", stats: "Экономия 40ч/мес" },
      { title: "Инфлюенсеры", text: "Масштабирование личного бренда, выход на новые площадки.", stats: "Новые рынки" },
      { title: "Агентства", text: "Закрываем потребность в production под ключ для ваших клиентов.", stats: "White-label" },
      { title: "Стартапы", text: "Быстрый рост аудитории с нуля для валидации гипотез.", stats: "Быстрый старт" }
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
      { name: "Алексей", role: "CEO TechStartup", text: "Команда NKS выстроила для нас предсказуемую систему роста. Наши последние Shorts пробили 1.5M просмотров, и мы видим реальный приток целевых заявок. data-driven подход в действии!", img: "/Gemini_Generated_Image_lry8utlry8utlry8.png", bg_img: "/testimonial_bg_1.jpg" },
      { name: "Мария", role: "Fashion Бренд Owner", text: "Мы не просто получаем миллионы просмотров; мы видим реальную конверсию в продажи. NKS полностью трансформировали наше восприятие контент-маркетинга. Мой телефон просто разрывается от уведомлений!", img: "/Gemini_Generated_Image_wc2e9ewc2e9ewc2e.jpg", bg_img: "/testimonial_bg_2.jpg" },
      { name: "Илья", role: "Крипто-инфлюенсер", text: "Парни знают магические паттерны алгоритмов Shorts. Я раньше тратил тысячи на посевы, теперь просмотры растут органически. Аудитория выросла на 150к за месяц!", img: "/Gemini_Generated_Image_39zfrv39zfrv39zf (1).jpg", bg_img: "/testimonial_bg_3.jpg" },
      { name: "Елена", role: "EdTech Platform", text: "Нам нужна была сильная узнаваемость в СНГ. NKS Vector взяли на себя всё: от ресерча тем до финального саунд-дизайна. Стабильно по 3-4 вирусных ролика в месяц. Это уровень!", img: "/Gemini_Generated_Image_9hyfdg9hyfdg9hyf.jpg", bg_img: "/testimonial_bg_4.jpg" },
      { name: "Дмитрий", role: "Агентство Недвижимости", text: "Сделали упор на экспертные обзоры с премиальным монтажом. Закрыли две сделки чисто с органики канала. data-driven подход работает даже в такой сложной нише.", img: "/Gemini_Generated_Image_5pi73y5pi73y5pi7.jpg", bg_img: "/testimonial_bg_5.jpg" },
      { name: "Виктор", role: "Владелец сети ресторанов", text: "Бренд стал визуально сильнее и узнаваемее. Наши блюда выглядят так вкусно, что столики теперь бронируют на неделю вперед. Анимации и ритмика монтажа — просто космос.", img: "/Gemini_Generated_Image_j8qf0bj8qf0bj8qf.jpg", bg_img: "/testimonial_bg_6.jpg" }
    ],
    footer: "Системный рост контента."
  },
  en: {
    nav: { consulting: "Consulting", pricing: "Pricing" },
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
      { title: "Retention Scripts", text: "We design every second of the video so the viewer can't swipe away. Deep trigger work.", tags: ["#Retention", "#Copywriting", "#Hooks"] },
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
      { name: "Jessica", role: "Fashion Brand Owner", text: "NKS completely flipped our content game. We don't just get millions of views; we see actual conversions. Sales are up 300%. My phone just won't stop ringing!", img: "/Gemini_Generated_Image_kdczcfkdczcfkdcz (2).jpg", bg_img: "/testimonial_bg_1.jpg" },
      { name: "Michael", role: "CEO TechStartup", text: "The team built a predictable system for us. We grew 10x in six months, and I recently unboxed our YouTube Silver Play Button. data-driven magic!", img: "/Gemini_Generated_Image_u5wofeu5wofeu5wo.jpg", bg_img: "/testimonial_bg_2.jpg" },
      { name: "Chloe", role: "Fitness Coach", text: "They completely transformed my personal brand. The 'Retention Scripts' they use for Shorts are mind-blowing. My community is thriving!", img: "/Gemini_Generated_Image_gd8f93gd8f93gd8f.jpg", bg_img: "/testimonial_bg_3.jpg" },
      { name: "Sarah", role: "EdTech Platform", text: "We needed strong brand awareness. NKS Vector took over everything: from topic research to final sound design. CPA dropped to a third. Impeccable level!", img: "/Gemini_Generated_Image_7gbvpi7gbvpi7gbv.jpg", bg_img: "/testimonial_bg_4.jpg" },
      { name: "Robert", role: "Real Estate Agency", text: "doubted if YouTube was right for luxury real estate. I was wrong. We focused on expert reviews. Closed two high-ticket deals strictly from our organic audience.", img: "/Gemini_Generated_Image_9uwa6k9uwa6k9uwa.jpg", bg_img: "/testimonial_bg_5.jpg" },
      { name: "Emily", role: "Beauty Influencer", text: "I used to spend thousands on ads and shoutouts. Now, views grow organically. These guys know algorithm patterns. The editing and dynamics are just pure magic.", img: "/Gemini_Generated_Image_1042gz1042gz1042.jpg", bg_img: "/testimonial_bg_6.jpg" }
    ],
    footer: "Systemic content growth."
  },
  uz: {
    nav: { consulting: "Konsalting", pricing: "Narxlar" },
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
      { title: "Premium montaj", text: "Dinamik, ammo toza tahrir. E'tiborni tortadigan, bezovta qilmayдigan effektlar.", tags: ["#VFX", "#Ovoz dizayni", "#Dynamics"] },
      { title: "Kompleks strategiya", text: "Trafikni yaratadigan uzoq muddatli kontent tizimini ishlab chiqamiz.", tags: ["#Positioning", "#Voronkalar"] },
      { title: "Brend qadoqlash", text: "Media makonida loyihangizning kuchli vizual tan olinishini shakllantiramiz.", tags: ["#Identity", "#Meanings", "#Design"] },
      { title: "Chuqur tahlil", text: "Haqiqiy ma'lumotlar asosida formatlar va strategiyalarni moslashtiramiz.", tags: ["#A/B Tests", "#Metrics", "#Optimization"] }
    ],
    showcase1: "Kontent strategiyasini yaratamiz. Videoning har bir soniyasini loyihalashtiramiz.",
    audienceTitle: "Kimga yordam beramiz",
    audience: [
      { title: "Brendlar va Kompaniyalar", text: "Ko'rishlarni sodiqlik va mijozlarga aylantiramiz.", stats: "Taniqlik x3" },
      { title: "E-commerce", text: "Product content that sells natively through trends.", stats: "Lower CPA" },
      { title: "Kreatorlar", text: "G'oyalardan tortib montajgacha bo'lgan barcha ishlarni zimmamizga olamiz.", stats: "Oyiga 40s tejash" },
      { title: "Infliuyenserlar", text: "Shaxsiy brendni kengaytirish, yangi platformalarga chiqish.", stats: "Yangi bozorlar" },
      { title: "Agentliklar", text: "Mijozlaringiz uchun tayyor prodyuserlik ehtiyojini yopamiz.", stats: "White-label" },
      { title: "Startaplar", text: "Gipotezalarni tasdiqlash uchun tezkor auditoriya o'sishi.", stats: "Tezkor start" }
    ],
    methodologyTitle: "Metodologiya",
    methodology: [
      { title: "Izlanish", subtitle: "Stage 01", text: "Nisha, raqobatchilar va trendlarni tahlil qilish." },
      { title: "Ssenariy", subtitle: "Stage 02", text: "Writing script with retention curve and strong hooks." },
      { title: "Ishlab chiqarish", subtitle: "Stage 03", text: "Assistance with shooting or full visual material generation." },
      { title: "Montaj", subtitle: "Stage 04", text: "Video assembly: color correction, graphics, sound design." },
      { title: "Publishing", subtitle: "Stage 05", text: "SEO optimization, correct tags, thumbnail and publishing time." },
      { title: "Analytics", subtitle: "Stage 06", text: "Data collection after publication and adjustment of sprint." }
    ],
    showcase2: "Premium montaj. Virusli qamrov uchun data-driven yechimlar.",
    testimonialsTitle: "Natijalar va sharhlar",
    testimonials: [
      { name: "Alisher", role: "Kiyim brendi CEO", text: "NKS jamoasi biz uchun o'sish tizimini qurdi. Oxirgi Shorts videolrimiz 1.5M ko'rish yig'di, data-driven yondashuv amalda!", img: "/Gemini_Generated_Image_xbcbvaxbcbvaxbcb.jpg", bg_img: "/testimonial_bg_1.jpg" },
      { name: "Jasur", role: "TechStartup CEO", text: "Yigitlar bashorat qilinadigan tizim qurdilar. Yarim yilda 10 barobar o'sdik. Yaqinda YouTube kumush tugmasini oldik. Data-driven sehr!", img: "/Gemini_Generated_Image_ji05rlji05rlji05 (1).jpg", bg_img: "/testimonial_bg_2.jpg" },
      { name: "Rustam", role: "Kripto-infliuyenser", text: "Oldinlari reklamaga minglab dollar sarflardim. Hozir ko'rishlar о'z-o'zidan о'smoqda. Ajoyib natija!", img: "/Gemini_Generated_Image_4648gm4648gm4648.jpg", bg_img: "/testimonial_bg_3.jpg" },
      { name: "Madina", role: "Kiyim brendi asochisi", text: "Shaxsiy brendimni kengaytirishda yordam berishdi. Shorts ushlab qolish ssenariylari aql bovar qilmaydi. Telefonim tinmayapti.", img: "/Gemini_Generated_Image_ncpdc4ncpdc4ncpd.jpg", bg_img: "/testimonial_bg_4.jpg" },
      { name: "Aziz", role: "Ko'chmas mulk agentligi", text: "Ekspertlik sharhlari orqali kanalning o'zidan ikkita katta premium obyektni sotdik. YouTube rostdan ishlaydi.", img: "/Gemini_Generated_Image_2o04kw2o04kw2o04.jpg", bg_img: "/testimonial_bg_5.jpg" },
      { name: "Malika", role: "EdTech Platformasi", text: "Bizga O'zbekiston bo'ylab kuchli taniqlilik kerak edi. NKS toza montajgacha hammasini qildi. Kostenlar 3 barobar tushdi.", img: "/Gemini_Generated_Image_pu4kpkpu4kpkpu4k.jpg", bg_img: "/testimonial_bg_6.jpg" }
    ],
    footer: "Kontentning tizimli o'sishi."
  }
};

const partners = [
  "NEXUS GLOBAL", "AURA FINANCE", "VERTEX MEDIA", 
  "ELEVATE E-COM", "LUMINA AI", "QUANTUM DYNAMICS", "PINNACLE VENTURES"
];

const imgViralGrowth = "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=1600"; 
const imgRhythmDynamics = "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1600"; 

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
      wheelMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('button') || e.target.closest('.card')) {
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

  const t = translations[lang];

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

  const formatYAxis = (tickItem) => {
    if (tickItem >= 1000) {
      return (tickItem / 1000) + 'k';
    }
    return tickItem;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: tooltipBg, border: `1px solid rgba(14, 165, 233, 0.3)`, padding: "16px", borderRadius: "12px", backdropFilter: "blur(10px)", color: tooltipText, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600", fontSize: "14px", borderBottom: "1px solid rgba(14,165,233,0.2)", paddingBottom: "6px", color: theme === 'dark' ? '#cbd5e1' : '#64748b' }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: index === 0 ? "8px" : "0" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}` }}></span>
                <span style={{ fontSize: "14px", opacity: 0.8 }}>{entry.name}:</span>
              </div>
              <span style={{ fontWeight: "700", fontSize: "16px", marginLeft: "auto" }}>
                {entry.value.toLocaleString('ru-RU')}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      {/* ==========================================
         ИЗМЕНЕННЫЙ КУРСОР: ТЕПЕРЬ ЭТО СТРЕЛКА "PLAY"
         ========================================== */}
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 12, // Смещаем центрирование для иконки 24x24
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1, // Немного увеличиваем при наведении
          opacity: mousePosition.x === 0 ? 0 : 1
        }}
        transition={{ type: "spring", stiffness: 2000, damping: 20, mass: 0.05 }}
      />

      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-main">NKS</div>
            <div className="logo-line"></div>
          </div>

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
            
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>
              {t.nav.consulting}
            </button>
            <button className="button" onClick={() => window.open("https://t.me/NKSmanager")}>
              {t.nav.pricing}
            </button>
          </div>
        </div>
      </header>

      <motion.section className="hero" initial="hidden" animate="show" variants={fadeUp}>
        <div className="hero-badge">{t.hero.badge}</div>
        <h2 dangerouslySetInnerHTML={{ __html: t.hero.title }}></h2>

        <p className="hero-text">{t.hero.text}</p>

        <button className="button main-cta" onClick={() => window.open("https://t.me/NKSmanager")}>
          {t.hero.btn}
        </button>

        <motion.div className="chart-box" variants={fadeUp}>
          <div className="chart-header">
            <div>
              <span className="chart-title">{t.chart.title}</span>
              <span className="chart-subtitle">{t.chart.subtitle}</span>
            </div>
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

      <motion.section 
        className="stats-section"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        variants={staggerContainer}
      >
        {t.stats.map((stat, idx) => (
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

      <Section title={t.servicesTitle} data={t.services} />

      <ImageShowcase 
        imgUrl={imgViralGrowth}
        headline={t.showcase1}
      />

      <Section title={t.audienceTitle} data={t.audience} />

      <Section title={t.methodologyTitle} data={t.methodology} isNumbered />

      <ImageShowcase 
        imgUrl={imgRhythmDynamics}
        headline={t.showcase2}
        isReversed 
      />

      <section className="testimonials-section">
        <h3>{t.testimonialsTitle}</h3>
        <div className="testimonials-marquee-container">
          <div className="testimonials-track">
            {t.testimonials.map((tItem, i) => (
              /* ДОБАВЛЕН CSS-ПЕРЕМЕННАЯ ДЛЯ ФОНА */
              <div key={i} className="card testimonial-card" style={{ '--bg-img': `url(${tItem.bg_img})` }}>
                {/* ОВЕРЛЕЙ ДЛЯ ТЕКСТА */}
                <div className="testimonial-overlay"></div>
                
                {/* ТЕКСТ ОТЗЫВА - ТЕПЕРЬ ПЕРВЫМ */}
                <p className="testimonial-text">"{tItem.text}"</p>
                
                {/* ЗВЕЗДЫ */}
                <div className="stars">★★★★★</div>

                {/* ХЕДЕР С АВАТАРОМ И ИМЕНЕМ - ТЕПЕРЬ ВНИЗУ */}
                <div className="testimonial-footer">
                  <img src={tItem.img} className="avatar" alt={tItem.name} />
                  <div>
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* КЛОН КАРУСЕЛИ */}
          <div className="testimonials-track" aria-hidden="true">
            {t.testimonials.map((tItem, i) => (
              <div key={i + 100} className="card testimonial-card" style={{ '--bg-img': `url(${tItem.bg_img})` }}>
                <div className="testimonial-overlay"></div>
                <p className="testimonial-text">"{tItem.text}"</p>
                <div className="stars">★★★★★</div>
                <div className="testimonial-footer">
                  <img src={tItem.img} className="avatar" alt={tItem.name} />
                  <div>
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div className="logo-main footer-logo">NKS</div>
          <p>© {new Date().getFullYear()} NKS Vector. {t.footer}</p>
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
