import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Building2, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  Store, Trees, Dumbbell, Handshake, ArrowUp, Calendar, Route, Sun, Waves
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ФОНТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;

  document.title = "Курортный клуб «Удачное» — Алушта, село Виноградное (апартаменты)";

  const meta = [
    { name: "description", content: "«Удачное» в Алуште (Виноградное, ул. Сусловой): малоэтажный курортный клуб с апартаментами 57–140 м², террасами и автономным отоплением. Лесной массив, виды на море и горы, прогулочные дворы, коммерческие помещения. Ориентир сдачи — 3 кв. 2025 по данным витрин. Ипотека доступна." },
    { property: "og:title", content: "Курортный клуб «Удачное» — апартаменты в Алуште" },
    { property: "og:description", content: "Малоэтажные корпуса (2–3 этажа), свободные планировки, террасы и балконы, автономное отопление. Адрес: Алушта, с. Виноградное, ул. Сусловой." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-udachnoe.jpg" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://example.com/" }
  ];

  meta.forEach((m) => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://example.com/";

  // preload hero (замените на визуал проекта при наличии)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop"; // морской пейзаж — заглушка
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v as string));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full relative overflow-hidden"
      style={{ borderColor: "#BFDDE8", backgroundColor: "#FFFFFF", color: "#0D1B1F" }}>
      <div className="absolute -top-8 -right-8 opacity-10 pointer-events-none">
        <div className="w-28 h-28 rounded-full" style={{ background: "radial-gradient(closest-side, #0EA5B7 30%, transparent 70%)" }} />
      </div>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#3D6B78" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor: "#BFDDE8", backgroundColor: "#F0FAFD", color: "#0D1B1F" }}>
      {children}
    </div>
  );
}

/* ================= ПРИЛОЖЕНИЕ ================= */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    injectFonts();
    injectSEO();
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    const onScroll = () => setShowUp(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: "#F6FBFD", color: "#0D1B1F", fontFamily: "Montserrat, sans-serif" }}>

      {/* ДЕКОР: морской бриз */}
      <div className="pointer-events-none select-none absolute inset-0 -z-10">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #E6F5FB 0%, #F6FBFD 45%, #F6FBFD 100%)" }} />
        <motion.svg initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="absolute top-0 left-1/2 -translate-x-1/2" width="1200" height="240" viewBox="0 0 1200 240" fill="none">
          <path d="M0,120 C200,180 300,40 500,80 C700,120 800,200 1200,120 L1200,0 L0,0 Z" fill="#BFDDE8" opacity="0.8" />
          <path d="M0,160 C200,220 300,80 520,120 C740,160 820,220 1200,160 L1200,0 L0,0 Z" fill="#D6EDF6" opacity="0.8" />
        </motion.svg>
      </div>

      {/* NAVIGATION: просторная grid-шапка */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ backgroundColor: "rgba(246,251,253,0.9)", borderColor: "#BFDDE8" }}>
        <div className="max-w-7xl mx-auto px-5 py-3 grid grid-cols-12 items-center gap-4">
          <a href="#" className="col-span-8 sm:col-span-6 md:col-span-4 flex items-center gap-3 shrink-0 min-w-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow flex-none" style={{ backgroundColor: "#0D1B1F", color: "#E6F5FB" }}>U</div>
            <div className="leading-tight truncate">
              <div className="font-extrabold flex items-center gap-2 truncate" style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} className="flex-none" /> <span className="truncate">Курортный клуб «Удачное»</span>
              </div>
              <div className="text-[11px] truncate" style={{ color: "#3D6B78" }}>
                <MapPin size={12} className="inline mr-1" /> Алушта, с. Виноградное · ул. Сусловой
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex col-span-4 md:col-span-5 justify-center items-center text-[13px]" aria-label="Главное меню">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {["О проекте", "Форматы", "Удобства", "Локация", "Сроки", "FAQ"].map((t, i) => (
                <a key={i} href={['#about','#plans','#amen','#location','#phases','#faq'][i]} className="hover:text-cyan-700 whitespace-nowrap transition-colors" style={{ color: "#3D6B78" }}>{t}</a>
              ))}
            </div>
          </nav>

          <div className="col-span-4 sm:col-span-6 md:col-span-3 flex justify-end">
            <div className="hidden sm:flex flex-wrap gap-2 md:gap-3 justify-end">
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 md:px-4 py-2 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A9D3E1", color: "#0D1B1F" }}>WhatsApp</a>
              <a href="#cta" className="px-3 md:px-4 py-2 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0EA5B7", color: "#F6FBFD" }}>Подбор</a>
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)} className="sm:hidden ml-2" aria-label="Меню">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden bg-white shadow-md border-t" style={{ borderColor: '#BFDDE8' }}>
            <div className="px-4 py-3 flex flex-col gap-2">
              {[['О проекте','#about'],['Форматы','#plans'],['Удобства','#amen'],['Локация','#location'],['Сроки','#phases'],['FAQ','#faq'],['Контакты','#cta']].map(([t,href]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-cyan-50" style={{ color: '#3D6B78' }}>{t}</a>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-3 py-2 rounded-xl border text-center" style={{ borderColor: '#A9D3E1', color: '#0D1B1F' }}>WhatsApp</a>
                <a href="#cta" className="px-3 py-2 rounded-xl text-center" style={{ backgroundColor: '#0EA5B7', color: '#F6FBFD' }}>Подбор</a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 pt-10 pb-16 md:pb-24 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-extrabold tracking-tight" style={{ fontFamily: "Prata, serif", color: "#0D1B1F", fontSize: "clamp(28px, 5vw, 56px)", lineHeight: 1.1, maxWidth: "18ch" }}>
              «Удачное» — малоэтажные апартаменты среди гор и сосен
            </h1>
            <p className="mt-5 text-base md:text-lg" style={{ color: "#3D6B78", maxWidth: 720 }}>
              Апарт‑клуб в Виноградном: корпуса 2–3 этажа, свободные планировки 57–140 м², террасы и балконы, автономное отопление. Тихие дворы, хвойный воздух, близость моря и набережной Алушты.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[["2–3 этажа", <Building2 size={18} key="b" />],["57–140 м²", <Ruler size={18} key="r" />],["Автономное отопление", <Sun size={18} key="s" />],["Ипотека доступна", <ShieldCheck size={18} key="sh" />]].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white" style={{ borderColor: "#BFDDE8", color: "#0D1B1F" }}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md" style={{ backgroundColor: "#0EA5B7", color: "#F6FBFD" }}>Получить подборку</a>
              <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: "#A9D3E1", color: "#0D1B1F" }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border relative" style={{ height: 520, borderColor: "#BFDDE8" }} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <div className="absolute -top-1 left-0 right-0 h-10 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(191,221,232,0.7), transparent)" }} />
            <img src="https://images.unsplash.com/photo-1519677100203-a0e668c92439?q=80&w=1600&auto=format&fit=crop" alt="Алушта: море и горы рядом с комплексом" className="w-full h-full object-cover" loading="eager" fetchpriority="high" width={1600} height={1040} />
          </motion.div>
        </div>
      </section>

      {/* КЛЮЧЕВЫЕ ЧИСЛА */}
      <section id="benefits" className="py-10">
        <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full"><Stat value="малоэтажно" label="Формат" sub="2–3‑этажные корпуса" icon={<Building2 size={18} />} /></div>
          <div className="h-full"><Stat value="57–140 м²" label="Площади" sub="свободные планировки" icon={<Ruler size={18} />} /></div>
          <div className="h-full"><Stat value="3 кв. 2025" label="Ориентир сдачи" sub="по данным витрин" icon={<Calendar size={18} />} /></div>
          <div className="h-full"><Stat value="Лес/море" label="Окружение" sub="виды на горы и море" icon={<Waves size={18} />} /></div>
        </div>
      </section>

      {/* О ПРОЕКТЕ */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#3D6B78' }}>
              «Удачное» — курортный клуб с сервисом в Профессорском уголке Алушты. Низкая этажность, прогулочные дворы, хвойный массив вокруг и близость моря создают спокойную среду для отдыха и длительного проживания. На первых уровнях предусмотрены помещения под кафе и полезные сервисы.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Планировки', t: 'Свободные варианты от ~57 до ~140 м²; форматы с террасами и балконами.', icon: <Ruler size={18} /> },
                { h: 'Инженерия', t: 'Автономное отопление, панорамное остекление, современные лифты (по корпусам).', icon: <CircuitBoard size={18} /> },
                { h: 'Уютные дворы', t: 'Зоны отдыха, детские и спортивные площадки, ландшафтное озеленение.', icon: <Trees size={18} /> },
                { h: 'Финансы', t: 'Доступны ипотечные программы; детали и акционные условия — по запросу.', icon: <ShieldCheck size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ borderColor: '#BFDDE8', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#0D1B1F' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#3D6B78' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#E6F5FB', borderColor: '#BFDDE8' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0D1B1F' }}>
              <Store size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#3D6B78' }}>
              <li><MapPin size={14} className="inline mr-2" /> Алушта, с. Виноградное, ул. Сусловой</li>
              <li><Route size={14} className="inline mr-2" /> ~4 км до центра Алушты; доступ к набережной и пляжам</li>
              <li><ShieldCheck size={14} className="inline mr-2" /> Формат: апартаменты; ипотека доступна</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md" style={{ backgroundColor: '#0EA5B7', color: '#F6FBFD' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* УДОБСТВА И БЛАГОУСТРОЙСТВО */}
      <section id="amen" className="py-14 md:py-20" style={{ backgroundColor: '#E6F5FB' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Dumbbell size={22} /> Удобства и окружение</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3D6B78' }}>
              {[
                { t: 'Прогулочные дворы и детские площадки', icon: <Trees size={16} /> },
                { t: 'SPA/фитнес-зона и коммерция у дома (по проекту)', icon: <Store size={16} /> },
                { t: 'Террасы, балконы и панорамные окна', icon: <Sun size={16} /> },
                { t: 'Тихий квартал в хвойном массиве', icon: <Waves size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFDDE8' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0D1B1F' }}>
              <ParkingSquare size={18} /> Парковка и сервис
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#3D6B78' }}>
              {["Гостевые парковочные места", "Отдельные кладовые (по корпусам)", "Сервис‑менеджмент на локации", "Организованный двор без транзита"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#F6FBFD', borderColor: '#BFDDE8' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ПЛАНИРОВКИ */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Ruler size={22} /> Планировки и площади</h2>
          <p className="mt-3" style={{ color: '#3D6B78' }}>
            Свободные форматы апартаментов: студийные и 1–3‑комнатные решения, метражи ориентировочно 57–140 м². По запросу пришлём PDF‑подборку с планировками, этажами и видами.
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Стартовые форматы", d: "Рациональные студии и европланировки", icon: <Home size={18} /> },
              { t: "1–2‑комнатные", d: "Кухни‑гостиные, большие окна, балконы/террасы", icon: <Home size={18} /> },
              { t: "3‑комнатные", d: "Семейные сценарии, гардеробные и ниши хранения", icon: <Home size={18} /> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFDDE8' }}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{ color: '#0D1B1F' }}>{c.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3D6B78' }}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color: '#0E7490' }}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ЛОКАЦИЯ */}
      <section id="location" className="py-14 md:py-20" style={{ backgroundColor: '#E6F5FB' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><MapPin size={22} /> Локация и доступность</h2>
            <ul className="mt-4 space-y-2" style={{ color: '#3D6B78' }}>
              {[
                'Алушта, село Виноградное, ул. Сусловой (Профессорский уголок)',
                'Около 4 км до центра Алушты; набережная и пляжи — в досягаемости',
                'Рядом санаторно‑курортная инфраструктура, кафе и магазины',
              ].map((t, i) => (
                <li key={i} className="flex gap-3 items-start"><span className="mt-0.5"><Route size={16} /></span> {t}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#BFDDE8' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?text=%D0%90%D0%BB%D1%83%D1%88%D1%82%D0%B0%2C%20%D1%83%D0%BB.%20%D0%A1%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%BE%D0%B9&z=15" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* СРОКИ */}
      <section id="phases" className="py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Calendar size={22} /> Сроки и статус</h2>
          <div className="grid md:grid-cols-4 gap-4 mt-6">
            {[
              { t: "Ориентир сдачи", d: "3 квартал 2025 (по данным витрин)", icon: <Calendar size={18} /> },
              { t: "Формат", d: "Апартаменты (незжилой фонд)", icon: <FileText size={18} /> },
              { t: "Финансы", d: "Ипотечные программы доступны", icon: <ShieldCheck size={18} /> },
              { t: "Девелопер", d: "ГК «Монолит»", icon: <Building2 size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFDDE8' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#0D1B1F' }}>{s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#3D6B78' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 md:py-20" style={{ backgroundColor: '#E6F5FB' }}>
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>Вопросы и ответы</h2>
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              { q: "Где находится комплекс?", a: "Республика Крым, г. Алушта, с. Виноградное, ул. Сусловой (Профессорский уголок)." },
              { q: "Какая этажность?", a: "Корпуса малоэтажные — 2–3 этажа." },
              { q: "Какие метражи?", a: "Ориентировочно от ~57 до ~140 м²; уточняйте по корпусам и очередям." },
              { q: "Есть ли парковка и кладовые?", a: "Предусмотрены гостевые парковочные места и кладовые (по корпусам)." },
              { q: "Какой срок сдачи?", a: "По данным маркетплейсов — ориентир 3 квартал 2025." },
              { q: "Доступна ли ипотека?", a: "Да, программы кредитования доступны; детали пришлём вместе с подборкой." }
            ].map((i, idx) => (
              <details key={idx} className="p-5 rounded-2xl border bg-white" style={{ borderColor: '#BFDDE8' }}>
                <summary className="font-semibold cursor-pointer" style={{ color: '#0D1B1F' }}>{i.q}</summary>
                <p className="mt-2 text-sm" style={{ color: '#3D6B78' }}>{i.a}</p>
              </details>
            ))}
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            { "@type": "Question", "name": "Где находится комплекс?", "acceptedAnswer": { "@type": "Answer", "text": "Республика Крым, г. Алушта, с. Виноградное, ул. Сусловой." } },
            { "@type": "Question", "name": "Какая этажность?", "acceptedAnswer": { "@type": "Answer", "text": "Корпуса малоэтажные — 2–3 этажа." } },
            { "@type": "Question", "name": "Какие метражи?", "acceptedAnswer": { "@type": "Answer", "text": "Ориентировочно от ~57 до ~140 м²; детали уточняйте по корпусам." } },
            { "@type": "Question", "name": "Есть ли парковка и кладовые?", "acceptedAnswer": { "@type": "Answer", "text": "Гостевые парковки и кладовые — по корпусам." } },
            { "@type": "Question", "name": "Какой срок сдачи?", "acceptedAnswer": { "@type": "Answer", "text": "Ориентир 3 квартал 2025 (по данным витрин)." } },
            { "@type": "Question", "name": "Доступна ли ипотека?", "acceptedAnswer": { "@type": "Answer", "text": "Да, ипотечные программы доступны." } }
          ]
        }) }} />
      </section>

      {/* CTA + ФОРМА */}
      <section id="cta" className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#3D6B78' }}>
              Пришлём PDF с планировками и метражами, действующие предложения, варианты ипотечных программ и статус строительства.
            </p>
            <a href="https://wa.me/79124530205" target="_blank" rel="noopener noreferrer" className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md" style={{ borderColor: '#A9D3E1', color: '#0D1B1F' }}>Связаться в WhatsApp</a>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#BFDDE8' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#0D1B1F' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#3D6B78' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#0D1B1F' }}>Получить подборку</div>
                <p className="text-sm mt-1" style={{ color: '#3D6B78' }}>
                  Оставьте контакты — вышлем актуальные предложения по «Удачному».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFDDE8' }} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFDDE8' }} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFDDE8' }} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#BFDDE8' }} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending} className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70" style={{ backgroundColor: '#0EA5B7', color: '#F6FBFD' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>
                <a href="/policy.html" className="block text-xs mt-3 underline" style={{ color: '#4C7482' }}>Политика конфиденциальности</a>
                <a href="/consent.html" className="block text-xs underline" style={{ color: '#4C7482' }}>Согласие на обработку ПДн</a>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor: '#BFDDE8' }}>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#3D6B78' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#0D1B1F' }}>
              <Home size={16} /> Курортный клуб «Удачное»
            </div>
            <p className="mt-2">Республика Крым, г. Алушта, с. Виноградное, ул. Сусловой</p>
            <p className="mt-1">Девелопер: ГК «Монолит». Формат: апартаменты. Ипотека доступна.</p>
          </div>
          <div className="md:text-right">
            <a href="/policy.html" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD Residence */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Residence",
        "name": "Курортный клуб «Удачное»",
        "url": typeof location !== "undefined" ? location.href : "https://example.com/",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "ул. Сусловой",
          "addressLocality": "Алушта",
          "addressRegion": "Республика Крым",
          "addressCountry": "RU"
        }
      }) }} />

      {/* Scroll to top */}
      {showUp && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 right-5 rounded-full shadow-lg" style={{ backgroundColor: "#0EA5B7", color: "#F6FBFD", padding: 12 }} aria-label="Наверх">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
