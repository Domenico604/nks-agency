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
// СЛОВАРЬ ПЕРЕВОДОВ (RU, EN, UZ)
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
      { title: "Премиальный монтаж", text: "Динамичный, но чистый эдит. Визуальные эффекты, которые удерживают внимание, а не раздражают.", tags: ["#VFX", "#Саунд-дизайн", "#Динамика"] },
      { title: "Комплексная стратегия", text: "Разрабатываем долгосрочную систему контента, которая регулярно генерирует целевой трафик.", tags: ["#Позиционирование", "#Воронки"] },
      { title: "Упаковка бренда", text: "Формируем сильную визуальную и смысловую узнаваемость вашего проекта в медиа-пространстве.", tags: ["#Айдентика", "#Смыслы", "#Дизайн"] },
      { title: "Deep Аналитика", text: "Еженедельный разбор метрик. Докручиваем форматы и стратегии на основе реальных данных удержания.", tags: ["#A/B Тесты", "#Метрики", "#Оптимизация"] }
    ],
    showcase1: "Создаем стратегию контента. Проектируем каждую секунду видео.",
    audienceTitle: "Кому мы помогаем",
    audience: [
      { title: "Бренды и Компании", text: "Конвертируем просмотры в лояльность и клиентов. Построение HR-бренда.", stats: "Рост узнаваемости x3" },
      { title: "E-commerce", text: "Создаем продуктовый контент, который продает нативно через обзоры и тренды.", stats: "Снижение CPA" },
      { title: "Креаторы", text: "Берем на себя всю рутину от идей до монтажа. Вы только снимаетесь.", stats: "Экономия 40ч/мес" },
      { title: "Инфлюенсеры", text: "Масштабирование личного бренда, выход на новые площадки и монетизация.", stats: "Новые рынки" },
      { title: "Агентства", text: "Закрываем потребность в production под ключ для ваших клиентов. White-label.", stats: "B2B партнерство" },
      { title: "Стартапы", text: "Быстрый рост аудитории с нуля для валидации гипотез и привлечения юзеров.", stats: "Быстрый старт" }
    ],
    methodologyTitle: "Методология",
    methodology: [
      { title: "Research", subtitle: "Этап 01", text: "Глубокий анализ ниши, конкурентов и актуальных трендов платформы." },
      { title: "Script", subtitle: "Этап 02", text: "Написание сценария с проработанной кривой удержания и сильными хуками." },
      { title: "Production", subtitle: "Этап 03", text: "Помощь со съемкой или полная генерация визуального материала." },
      { title: "Edit", subtitle: "Этап 04", text: "Сборка ролика: цветокоррекция, графика, саунд-дизайн и ритмика." },
      { title: "Publishing", subtitle: "Этап 05", text: "SEO-оптимизация, правильные теги, обложки и время публикации." },
      { title: "Analytics", subtitle: "Этап 06", text: "Сбор данных после публикации и корректировка следующего спринта." }
    ],
    showcase2: "Премиальный монтаж. Data-driven решения для вирусных охватов.",
    testimonialsTitle: "Результаты и отзывы",
    testimonials: [
      { name: "Мария", role: "Основатель Fashion Бренда", text: "Работа с NKS перевернула наше представление о контенте. Мы не просто получаем миллионы просмотров, но и видим реальную конверсию. Мой телефон просто разрывается от уведомлений о новых заказах и подписчиках! Рост продаж составил 300% за первый квартал.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
      { name: "Алексей", role: "CEO TechStartup", text: "Ребята выстроили предсказуемую систему. Мы выросли в 10 раз за полгода, и недавно я распаковал серебряную кнопку YouTube. Это полностью заслуга их data-driven подхода к превью и удержанию аудитории. Лучшая инвестиция в маркетинг.", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" },
      { name: "Илья", role: "Крипто-инфлюенсер", text: "Раньше я тратил тысячи долларов на посевы и рекламу. Сейчас просмотры растут органически. Парни знают какие-то магические паттерны алгоритмов Shorts. За месяц пришло 150,000 живой аудитории абсолютно без вливаний в трафик.", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80" },
      { name: "Елена", role: "EdTech Платформа", text: "Нам нужна была сильная узнаваемость в СНГ. NKS взяли на себя всё: от ресерча тем до финального саунд-дизайна. У нас теперь стабильно по 3-4 вирусных ролика в месяц, а стоимость привлечения лида (CPA) упала в три раза.", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
      { name: "Дмитрий", role: "Агентство Недвижимости", text: "Долго сомневался, нужен ли недвижке YouTube. Оказалось, еще как нужен. Сделали упор на экспертные обзоры с премиальным монтажом. Как итог — закрыли две сделки на премиум-объекты чисто с органики канала.", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80" }
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
      { title: "Premium Editing", text: "Dynamic yet clean edit. Visual effects that hold attention, not irritate.", tags: ["#VFX", "#Sound Design", "#Dynamics"] },
      { title: "Complex Strategy", text: "We develop a long-term content system that regularly generates targeted traffic.", tags: ["#Positioning", "#Funnels"] },
      { title: "Brand Packaging", text: "We form strong visual and semantic recognition of your project in the media space.", tags: ["#Identity", "#Meanings", "#Design"] },
      { title: "Deep Analytics", text: "Weekly metrics review. We tweak formats and strategies based on real retention data.", tags: ["#A/B Tests", "#Metrics", "#Optimization"] }
    ],
    showcase1: "We create content strategy. We design every second of the video.",
    audienceTitle: "Who We Help",
    audience: [
      { title: "Brands & Companies", text: "Convert views into loyalty and clients. Building HR brand.", stats: "Brand awareness x3" },
      { title: "E-commerce", text: "Create product content that sells natively through reviews and trends.", stats: "Lower CPA" },
      { title: "Creators", text: "We take over all routine from ideas to editing. You just shoot.", stats: "Save 40h/month" },
      { title: "Influencers", text: "Scaling personal brand, entering new platforms and monetization.", stats: "New markets" },
      { title: "Agencies", text: "Close the need for turnkey production for your clients. White-label.", stats: "B2B partnership" },
      { title: "Startups", text: "Fast audience growth from scratch to validate hypotheses and attract users.", stats: "Quick start" }
    ],
    methodologyTitle: "Methodology",
    methodology: [
      { title: "Research", subtitle: "Stage 01", text: "Deep analysis of the niche, competitors, and current platform trends." },
      { title: "Script", subtitle: "Stage 02", text: "Writing a script with a well-developed retention curve and strong hooks." },
      { title: "Production", subtitle: "Stage 03", text: "Assistance with shooting or full generation of visual material." },
      { title: "Edit", subtitle: "Stage 04", text: "Video assembly: color correction, graphics, sound design, and rhythm." },
      { title: "Publishing", subtitle: "Stage 05", text: "SEO optimization, correct tags, thumbnails, and publishing time." },
      { title: "Analytics", subtitle: "Stage 06", text: "Data collection after publication and adjustment of the next sprint." }
    ],
    showcase2: "Premium editing. Data-driven solutions for viral reach.",
    testimonialsTitle: "Results & Reviews",
    testimonials: [
      { name: "Jessica", role: "Fashion Brand Owner", text: "Working with NKS completely flipped our content game. We don't just get millions of views; we see actual conversions. My phone screen is constantly lit up with new follower and order notifications! Sales are up 300%.", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" },
      { name: "Michael", role: "CEO TechStartup", text: "The team built a predictable system for us. We grew 10x in six months, and I recently unboxed our YouTube Silver Play Button. It's entirely thanks to their data-driven approach to thumbnails and audience retention.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
      { name: "David", role: "Crypto Influencer", text: "I used to spend thousands on ads and shoutouts. Now, views grow organically. These guys understand hidden algorithm patterns. We gained 150,000 active subscribers in just a month without any paid traffic.", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
      { name: "Sarah", role: "EdTech Platform", text: "We needed strong brand awareness. NKS took over everything: from topic research to final sound design. We consistently hit 3-4 viral videos a month, and our Cost Per Acquisition (CPA) dropped to a third of what it was.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
      { name: "Robert", role: "Real Estate Agency", text: "I doubted if YouTube was right for luxury real estate. I was wrong. We focused on expert reviews with premium editing. As a result, we closed two high-ticket deals strictly from organic channel traffic.", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=150&q=80" }
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
      { title: "Virusli tahlil", text: "Algoritmlarning yashirin naqshlarini tahlil qilamiz va virusli bo'lishga mo'ljallangan formatlarni yaratamiz.", tags: ["#Trendlar", "#Izlanish", "#Algoritmlar"] },
      { title: "Ushlab qolish ssenariylari", text: "Tomoshabin videoni o'tkazib yubormasligi uchun har bir soniyani loyihalashtiramiz. Triggerlar bilan chuqur ishlash.", tags: ["#Retention", "#Kopirayting", "#Huklar"] },
      { title: "Premium montaj", text: "Dinamik, ammo toza tahrir. E'tiborni tortadigan, bezovta qilmaydigan vizual effektlar.", tags: ["#VFX", "#Ovoz dizayni", "#Dinamika"] },
      { title: "Kompleks strategiya", text: "Muntazam ravishda maqsadli trafikni yaratadigan uzoq muddatli kontent tizimini ishlab chiqamiz.", tags: ["#Pozitsiyalash", "#Voronkalar"] },
      { title: "Brend qadoqlash", text: "Media makonida loyihangizning kuchli vizual va semantik tan olinishini shakllantiramiz.", tags: ["#Aydentika", "#Ma'nolar", "#Dizayn"] },
      { title: "Chuqur tahlil", text: "Haftalik ko'rsatkichlarni ko'rib chiqish. Haqiqiy ma'lumotlar asosida formatlar va strategiyalarni moslashtiramiz.", tags: ["#A/B Testlar", "#Metrikalar", "#Optimizatsiya"] }
    ],
    showcase1: "Kontent strategiyasini yaratamiz. Videoning har bir soniyasini loyihalashtiramiz.",
    audienceTitle: "Kimga yordam beramiz",
    audience: [
      { title: "Brendlar va Kompaniyalar", text: "Ko'rishlarni sodiqlik va mijozlarga aylantiramiz. HR brendini yaratish.", stats: "Taniqlik x3 o'sishi" },
      { title: "Elektron tijorat (E-com)", text: "Sharhlar va trendlar orqali tabiiy ravishda sotadigan mahsulot kontentini yaratamiz.", stats: "CPA pasayishi" },
      { title: "Kreatorlar", text: "G'oyalardan tortib montajgacha bo'lgan barcha ishlarni o'z zimmamizga olamiz. Siz faqat suratga tushasiz.", stats: "Oyiga 40s tejash" },
      { title: "Infliuyenserlar", text: "Shaxsiy brendni kengaytirish, yangi platformalarga chiqish va monetizatsiya.", stats: "Yangi bozorlar" },
      { title: "Agentliklar", text: "Mijozlaringiz uchun tayyor prodyuserlik ehtiyojini yopamiz. White-label.", stats: "B2B hamkorlik" },
      { title: "Startaplar", text: "Gipotezalarni tasdiqlash va foydalanuvchilarni jalb qilish uchun noldan tezkor auditoriya o'sishi.", stats: "Tezkor start" }
    ],
    methodologyTitle: "Metodologiya",
    methodology: [
      { title: "Izlanish", subtitle: "01-bosqich", text: "Nisha, raqobatchilar va platformaning joriy trendlarini chuqur tahlil qilish." },
      { title: "Ssenariy", subtitle: "02-bosqich", text: "Yaxshi ishlab chiqilgan ushlab qolish egri chizig'i va kuchli huklar bilan ssenariy yozish." },
      { title: "Ishlab chiqarish", subtitle: "03-bosqich", text: "Suratga olishda yordam berish yoki vizual materialni to'liq yaratish." },
      { title: "Montaj", subtitle: "04-bosqich", text: "Videoni yig'ish: ranglarni to'g'rilash, grafika, ovoz dizayni va ritm." },
      { title: "Nashr qilish", subtitle: "05-bosqich", text: "SEO optimallashtirish, to'g'ri teglar, muqovalar va nashr vaqti." },
      { title: "Tahlil", subtitle: "06-bosqich", text: "Nashrdan keyin ma'lumotlarni to'plash va keyingi sprintni moslashtirish." }
    ],
    showcase2: "Premium montaj. Virusli qamrov uchun data-driven yechimlar.",
    testimonialsTitle: "Natijalar va sharhlar",
    testimonials: [
      { name: "Madina", role: "Kiyim brendi asochisi", text: "NKS bilan ishlash kontentga bo'lgan qarashimizni butunlay o'zgartirdi. Biz nafaqat millionlab ko'rishlarga ega bo'lyapmiz, balki real sotuvlarni ham ko'ryapmiz. Telefonim ekranida har daqiqa yangi obunachilar va buyurtmalar xabarlari chiqib turadi!", img: "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?auto=format&fit=crop&w=150&q=80" },
      { name: "Jasur", role: "TechStartup CEO", text: "Yigitlar biznesimiz uchun bashorat qilinadigan tizim qurdilar. Biz yarim yil ichida 10 barobar o'sdik va yaqinda YouTube kumush tugmasini oldik. Bu to'lig'icha jamoaning ma'lumotlarga va tahlilga asoslangan yondashuvi natijasidir.", img: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?auto=format&fit=crop&w=150&q=80" },
      { name: "Rustam", role: "Kripto-infliuyenser", text: "Oldinlari reklamaga minglab dollar sarflardim. Hozir ko'rishlar o'z-o'zidan organik o'smoqda. NKS algoritmlarning yashirin sirlarini biladi. Bir oy ichida hech qanday reklamasiz 150,000 ta faol obunachi yig'dik.", img: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=150&q=80" },
      { name: "Laylo", role: "EdTech Platformasi", text: "Bizga O'zbekiston bo'ylab kuchli taniqlilik kerak edi. NKS mavzularni izlashdan tortib toza montajgacha hammasini o'z zimmasiga oldi. Mijoz jalb qilish narxi (CPA) 3 barobarga arzonlashdi. Ajoyib natija!", img: "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=150&q=80" },
      { name: "Aziz", role: "Ko'chmas mulk agentligi", text: "Boshida ko'chmas mulk uchun YouTube qanchalik kerakligiga shubha qilgan edim. Ammo ekspertlik sharhlari va premium montaj orqali kanalning o'zidan ikkita katta premium obyektni sotishga erishdik.", img: "https://images.unsplash.com/photo-1508341591423-4347099e1f19?auto=format&fit=crop&w=150&q=80" }
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
  const tooltipBorder = theme === 'dark' ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const tooltipText = theme === 'dark' ? "#fff" : "#0f172a";

  return (
    <div className="container">
      <motion.div
        className="custom-cursor"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
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
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
              <XAxis dataKey="name" stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke={axisColor} fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: tooltipBg, border: `1px solid ${tooltipBorder}`, borderRadius: "12px", backdropFilter: "blur(10px)", color: tooltipText }} 
                itemStyle={{ color: tooltipText }}
              />
              <Line name={t.chart.before} type="monotone" dataKey="before" stroke="#64748b" strokeWidth={2} dot={{ r: 4, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line name={t.chart.after} type="monotone" dataKey="after" stroke="#0ea5e9" strokeWidth={4} dot={{ r: 5, fill: theme === 'dark' ? "#0f172a" : "#fff", strokeWidth: 2 }} activeDot={{ r: 8, stroke: "#38bdf8", strokeWidth: 2 }} />
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
        {/* НОВЫЙ БЛОК: Бегущая строка для отзывов */}
        <div className="testimonials-marquee-container">
          <div className="testimonials-track">
            {t.testimonials.map((tItem, i) => (
              <div key={i} className="card testimonial-card">
                <div className="testimonial-header">
                  <img src={tItem.img} className="avatar" alt={tItem.name} />
                  <div>
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                  </div>
                </div>
                <p>"{tItem.text}"</p>
                <div className="stars">★★★★★</div>
              </div>
            ))}
          </div>
          <div className="testimonials-track" aria-hidden="true">
            {t.testimonials.map((tItem, i) => (
              <div key={i + 100} className="card testimonial-card">
                <div className="testimonial-header">
                  <img src={tItem.img} className="avatar" alt={tItem.name} />
                  <div>
                    <h4>{tItem.name}</h4>
                    <span className="testimonial-role">{tItem.role}</span>
                  </div>
                </div>
                <p>"{tItem.text}"</p>
                <div className="stars">★★★★★</div>
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
