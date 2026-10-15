"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Dumbbell, 
  Flame, 
  Clock, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  Coffee, 
  ShieldCheck, 
  Menu, 
  X,
  Zap,
  Sparkles,
  ShoppingBag
} from "lucide-react";
import { GYM_CONFIG } from "@/config/gym";

export default function HomePage() {
  const [selectedPlanType, setSelectedPlanType] = useState<"todos" | "diarios" | "mensuales">("todos");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPlans = GYM_CONFIG.plans.filter((plan) => {
    if (selectedPlanType === "diarios") return plan.category.includes("Pase Diario");
    if (selectedPlanType === "mensuales") return plan.category.includes("Plan Mensual") || plan.category.includes("Membresía Total");
    return true;
  });

  // Tomamos los primeros 4 productos del catálogo para el teaser
  const teaserProducts = GYM_CONFIG.products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col">
      {/* 1. Header / Navbar Industrial */}
      <header className="sticky top-0 z-50 bg-[#0D0F12]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#FF5E1A] to-amber-600 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-[#FF5E1A]/20">
            <Zap className="h-6 w-6 fill-current text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#FF5E1A] uppercase font-bold">
              Performance Center
            </span>
          </div>
        </div>

        {/* Enlaces Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#zonas" className="hover:text-white transition-colors">Zonas del Galpón</a>
          <a href="#membresias" className="hover:text-white transition-colors">Pases & Planes</a>
          <Link href="/tienda" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-[#FF5E1A]" />
            Shake Bar & Tienda
          </Link>
          <Link href="/reservas" className="hover:text-white transition-colors">Horarios & Clases</Link>
        </nav>

        {/* Acceso a Socios y Counter */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/recepcion"
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all"
            title="Panel de Recepcionista / Torniquete"
          >
            <span>Counter</span>
          </Link>
          <Link
            href="/mi-cuenta"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all"
          >
            <QrCode className="h-4 w-4 text-[#00E5FF]" />
            <span>Pase Socio (QR)</span>
          </Link>
          <a
            href="#membresias"
            className="rounded-xl bg-[#FF5E1A] hover:bg-[#ff7235] px-5 py-2 text-xs font-black uppercase tracking-wider text-zinc-950 transition-all shadow-lg shadow-[#FF5E1A]/25"
          >
            Inscribirme
          </a>
        </div>

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-zinc-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#16191F] border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-sm font-bold uppercase tracking-wider">
          <a href="#zonas" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300">Zonas del Galpón</a>
          <a href="#membresias" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300">Pases & Planes</a>
          <Link href="/tienda" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#FF5E1A] flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Shake Bar & Tienda
          </Link>
          <Link href="/reservas" onClick={() => setMobileMenuOpen(false)} className="py-2 text-zinc-300">Horarios & Clases</Link>
          <Link href="/mi-cuenta" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#00E5FF] flex items-center gap-2">
            <QrCode className="h-4 w-4" /> Pase Socio (QR)
          </Link>
        </div>
      )}

      {/* 2. Hero Section: Galpón Multizona */}
      <section className="relative px-6 lg:px-12 pt-16 pb-24 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#FF5E1A]/30 bg-[#FF5E1A]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#FF5E1A] mb-6">
          <Flame className="h-3.5 w-3.5 fill-current" />
          Galpón Multizona · Musculación & Box Funcional
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.05]">
          EL ESPACIO DONDE TU <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1A] to-amber-500">POTENCIAL</span> NO TIENE LÍMITES
        </h1>

        <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          {GYM_CONFIG.shortDesc}
        </p>

        {/* Botones de Acción */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#membresias"
            className="flex items-center gap-2 rounded-xl bg-[#FF5E1A] hover:bg-[#ff7235] px-8 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-950 transition-all shadow-xl shadow-[#FF5E1A]/20"
          >
            <span>Ver Tarifas & Pases</span>
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/tienda"
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all"
          >
            <ShoppingBag className="h-4 w-4 text-[#FF5E1A]" />
            Shake Bar & Tienda
          </Link>
        </div>

        {/* Métricas del Galpón */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-white/10">
          <div className="p-4 rounded-2xl bg-[#16191F]/60 border border-white/5">
            <span className="text-2xl sm:text-3xl font-black text-white block font-mono">1,200m²</span>
            <span className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">Galpón Climatizado</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#16191F]/60 border border-white/5">
            <span className="text-2xl sm:text-3xl font-black text-[#FF5E1A] block font-mono">2 ZONAS</span>
            <span className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">Hierro & Funcional</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#16191F]/60 border border-white/5">
            <span className="text-2xl sm:text-3xl font-black text-[#00E5FF] block font-mono">APP QR</span>
            <span className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">Check-in Digital</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#16191F]/60 border border-white/5">
            <span className="text-2xl sm:text-3xl font-black text-white block font-mono">SHAKE BAR</span>
            <span className="text-[11px] font-bold uppercase text-zinc-500 tracking-wider">Proteína & Cafetería</span>
          </div>
        </div>
      </section>

      {/* 3. Zonas Divididas del Galpón */}
      <section id="zonas" className="py-20 px-6 lg:px-12 bg-[#121419] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5E1A]">
              Espacios Diseñados para Exigirte
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              Dos Mundos en un Mismo Lugar
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Entrena en una sola área o combina ambas con nuestras opciones duales flexibles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {GYM_CONFIG.zones.map((zone) => (
              <div
                key={zone.id}
                className="rounded-3xl bg-[#16191F] border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all shadow-xl relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${zone.color} rounded-full blur-3xl pointer-events-none`} />
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white">
                      {zone.badge}
                    </span>
                    {zone.id === "iron-zone" ? (
                      <Dumbbell className="h-6 w-6 text-[#FF5E1A]" />
                    ) : (
                      <Flame className="h-6 w-6 text-[#00E5FF]" />
                    )}
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                    {zone.name}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mt-1">
                    {zone.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed">
                    {zone.desc}
                  </p>

                  <div className="mt-8 space-y-3">
                    {zone.features.map((feat) => (
                      <div key={feat} className="flex items-center gap-3 text-xs text-zinc-400">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                  <a
                    href="#membresias"
                    className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#FF5E1A] transition-colors flex items-center gap-2"
                  >
                    Ver planes para esta zona
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Matriz de Pases y Membresías Flexibles */}
      <section id="membresias" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
            Membresías Flexibles
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            Elige Cómo Quieres Entrenar
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Paga solo por el día que asistes o asegura tu mensualidad con acceso completo.
          </p>

          {/* Filtros de planes */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#16191F] border border-white/10">
            <button
              onClick={() => setSelectedPlanType("todos")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "todos" ? "bg-white text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todos los Planes
            </button>
            <button
              onClick={() => setSelectedPlanType("diarios")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "diarios" ? "bg-white text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Pases Diarios
            </button>
            <button
              onClick={() => setSelectedPlanType("mensuales")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "mensuales" ? "bg-white text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Mensualidades
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular
                  ? "bg-gradient-to-b from-[#1F1916] to-[#16191F] border-2 border-[#FF5E1A] shadow-2xl shadow-[#FF5E1A]/10 scale-105"
                  : "bg-[#16191F] border border-white/10 hover:border-white/20"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#FF5E1A] px-3.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-950 shadow-md">
                  Más Recomendado
                </span>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  {plan.category}
                </span>
                <h3 className="text-xl font-black uppercase text-white tracking-tight">
                  {plan.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 min-h-[32px]">
                  {plan.desc}
                </p>

                {/* Precio */}
                <div className="my-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black font-mono text-white">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">/{plan.period}</span>
                  </div>
                  <span className="text-[11px] text-zinc-500 font-mono block mt-0.5">
                    Aprox. {(plan.price * GYM_CONFIG.currency.exchangeRate).toFixed(0)} Bs
                  </span>
                </div>

                <div className="space-y-2.5 border-t border-white/10 pt-6">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <Link
                  href="/mi-cuenta"
                  className={`w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.popular
                      ? "bg-[#FF5E1A] text-zinc-950 hover:bg-[#ff7235] shadow-lg shadow-[#FF5E1A]/20"
                      : "bg-white/10 text-white hover:bg-white hover:text-zinc-950"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Teaser Shake Bar & Pro-Shop */}
      <section id="shakebar" className="py-20 px-6 lg:px-12 bg-[#121419] border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5E1A]">
              Nutrición & Accesorios
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              APEX Shake Bar & Pro-Shop
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
              Recarga energías al instante. Pide tus batidos de proteína isolatada, pre-entrenos, creatina y meriendas saludables directo en la barra o pre-ordénalos desde la app con Pago Móvil, Zelle, Efectivo o Binance Pay.
            </p>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                🥤 Merengadas Proteicas
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                ⚡ Pre-Entrenos & BCAA
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-zinc-300">
                🥊 Fajas, Toallas & Guantes
              </span>
            </div>

            <div className="mt-8">
              <Link
                href="/tienda"
                className="inline-flex items-center gap-2 rounded-xl bg-[#FF5E1A] px-6 py-3 text-xs font-black uppercase tracking-wider text-zinc-950 hover:bg-[#ff7235] transition-all shadow-lg"
              >
                <span>Ir al Menú de Barra & Tienda</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Menú Rápido conectado a GYM_CONFIG.products */}
          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {teaserProducts.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-[#16191F] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{item.image}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#FF5E1A]">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-base font-black font-mono text-white">
                    ${item.price.toFixed(2)}
                  </span>
                  <Link
                    href="/tienda"
                    className="text-[11px] font-bold text-[#00E5FF] hover:underline"
                  >
                    Pedir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Minimalista */}
      <footer id="horarios" className="border-t border-white/10 py-12 px-6 lg:px-12 bg-[#0D0F12] text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-sm font-black uppercase text-white block">
              {GYM_CONFIG.name}
            </span>
            <p className="mt-1 text-[11px] text-zinc-400">
              {GYM_CONFIG.address} · {GYM_CONFIG.city}
            </p>
          </div>
          <div className="text-[11px]">
            <p>Lunes a Viernes: 5:30 AM - 10:00 PM</p>
            <p>Sábados: 7:00 AM - 4:00 PM</p>
          </div>
          <div className="text-[11px]">
            © 2026 {GYM_CONFIG.name}. Sistema de Gestión Deportiva.
          </div>
        </div>
      </footer>
    </div>
  );
}