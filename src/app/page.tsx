"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Dumbbell, 
  Flame, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  Menu, 
  X,
  Zap,
  ShoppingBag,
  Coffee,
  Bike
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

  const teaserProducts = GYM_CONFIG.products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col">
      {/* 1. Header / Navbar Táctil Industrial */}
      <header className="sticky top-0 z-50 bg-[#0D0F12]/90 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.75)] px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-2xl tactile-btn-orange flex items-center justify-center text-white font-black">
            <Zap className="h-6 w-6 fill-current drop-shadow" />
          </div>
          <div>
            <span className="text-xl font-black tracking-wider uppercase text-white block leading-none drop-shadow">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#FF5E1A] uppercase font-bold mt-0.5 block">
              Performance Center
            </span>
          </div>
        </div>

        {/* Pista Hundida de Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-2 p-1.5 rounded-2xl tactile-inset text-xs font-bold uppercase tracking-widest text-zinc-400">
          <a href="#zonas" className="px-4 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all">
            Las 3 Zonas
          </a>
          <a href="#membresias" className="px-4 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all">
            Planes & Membresías
          </a>
          <Link href="/tienda" className="px-4 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5">
            <ShoppingBag className="h-3.5 w-3.5 text-[#FF5E1A]" />
            La Barra
          </Link>
          <Link href="/reservas" className="px-4 py-2 rounded-xl hover:text-white hover:bg-white/5 transition-all">
            Horarios & Clases
          </Link>
        </nav>

        {/* Acceso a Socios y Counter */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/recepcion"
            className="tactile-btn-dark rounded-xl px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
            title="Panel de Recepcionista / Torniquete"
          >
            Counter
          </Link>
          <Link
            href="/mi-cuenta"
            className="tactile-btn-dark flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white"
          >
            <QrCode className="h-4 w-4 text-[#00E5FF]" />
            <span>Pase QR</span>
          </Link>
          <a
            href="#membresias"
            className="tactile-btn-orange rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider text-zinc-950"
          >
            Inscribirme
          </a>
        </div>

        {/* Botón Menú Móvil con Relieve */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl tactile-btn-dark text-zinc-300 hover:text-white"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Menú Desplegable Móvil */}
      {mobileMenuOpen && (
        <div className="md:hidden tactile-card mx-4 mt-2 rounded-3xl p-5 flex flex-col gap-3 text-xs font-bold uppercase tracking-wider z-40">
          <a href="#zonas" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl tactile-inset text-zinc-200">
            Las 3 Zonas del Galpón
          </a>
          <a href="#membresias" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl tactile-inset text-zinc-200">
            Pases & Planes
          </a>
          <Link href="/tienda" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl tactile-inset text-[#FF5E1A] flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" /> Shake Bar & Tienda
          </Link>
          <Link href="/reservas" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl tactile-inset text-[#00E5FF]">
            Horarios & Clases (CrossFit, Pilates, Bike, Zumba)
          </Link>
          <Link href="/recepcion" onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-xl tactile-inset text-zinc-400">
            Torre de Recepción (Counter)
          </Link>
        </div>
      )}

      {/* 2. Hero Section */}
      <section className="relative px-6 lg:px-12 pt-14 pb-20 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 rounded-full tactile-chip px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#FF5E1A] mb-6 border border-[#FF5E1A]/30 shadow-[0_0_20px_rgba(255,94,26,0.15)]">
          <Flame className="h-3.5 w-3.5 fill-current" />
          Galpón Multizona · Musculación · Box de Clases · La Barra
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white max-w-4xl leading-[1.05] drop-shadow-[0_6px_16px_rgba(0,0,0,0.9)]">
          EL ESPACIO DONDE TU{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1A] via-amber-400 to-[#FF5E1A]">
            POTENCIAL
          </span>{" "}
          NO TIENE LÍMITES
        </h1>

        <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          {GYM_CONFIG.shortDesc}
        </p>

        {/* Botones Táctiles 3D */}
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#membresias"
            className="tactile-btn-orange flex items-center gap-2.5 rounded-2xl px-8 py-4 text-xs font-black uppercase tracking-wider text-zinc-950"
          >
            <span>Ver Tarifas & Pases</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </a>
          <Link
            href="/tienda"
            className="tactile-btn-dark flex items-center gap-2.5 rounded-2xl px-8 py-4 text-xs font-bold uppercase tracking-wider text-white"
          >
            <ShoppingBag className="h-4 w-4 text-[#FF5E1A]" />
            <span>La Barra & Tienda</span>
          </Link>
        </div>

        {/* Tablero de Métricas (Las 3 Zonas) */}
        <div className="mt-16 p-3 sm:p-4 rounded-3xl tactile-card w-full max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl tactile-inset">
              <span className="text-2xl sm:text-3xl font-black text-white block font-mono">1,200m²</span>
              <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mt-1 block">
                Galpón Climatizado
              </span>
            </div>
            <div className="p-4 rounded-2xl tactile-inset">
              <span className="text-2xl sm:text-3xl font-black text-[#FF5E1A] block font-mono">3 ÁREAS</span>
              <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mt-1 block">
                Hierro, Clases & Barra
              </span>
            </div>
            <div className="p-4 rounded-2xl tactile-inset">
              <span className="text-2xl sm:text-3xl font-black text-[#00E5FF] block font-mono">4 DISCIPLINAS</span>
              <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mt-1 block">
                CrossFit, Pilates, Bike, Zumba
              </span>
            </div>
            <div className="p-4 rounded-2xl tactile-inset">
              <span className="text-2xl sm:text-3xl font-black text-white block font-mono">APP QR</span>
              <span className="text-[10px] font-bold uppercase text-zinc-400 tracking-wider mt-1 block">
                Check-in Digital
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Las 3 Zonas Oficiales del Galpón */}
      <section id="zonas" className="py-20 px-6 lg:px-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5E1A]">
              Distribución del Mega Galpón
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              Tres Espacios de Alto Rendimiento
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2">
              Elige tu área de especialidad o entrénalas todas con nuestro pase All-Access.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {GYM_CONFIG.zones.map((zone) => {
              const isIron = zone.id === "iron-zone";
              const isClasses = zone.id === "functional-classes";
              const isBar = zone.id === "shake-bar";

              return (
                <div
                  key={zone.id}
                  className={`rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                    isIron 
                      ? "tactile-card-orange" 
                      : isClasses 
                        ? "tactile-card-cyan" 
                        : "tactile-card border-amber-500/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full tactile-inset text-zinc-200">
                        {zone.badge}
                      </span>
                      <div
                        className={`h-12 w-12 rounded-2xl flex items-center justify-center ${
                          isIron 
                            ? "tactile-icon-box-orange" 
                            : isClasses 
                              ? "tactile-icon-box-cyan" 
                              : "tactile-inset"
                        }`}
                      >
                        {isIron && <Dumbbell className="h-6 w-6 text-[#FF5E1A]" />}
                        {isClasses && <Flame className="h-6 w-6 text-[#00E5FF]" />}
                        {isBar && <Coffee className="h-6 w-6 text-[#F59E0B]" />}
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white">
                      {zone.name}
                    </h3>
                    <span
                      className={`text-xs font-bold uppercase tracking-wider block mt-1 ${
                        isIron ? "text-[#FF5E1A]" : isClasses ? "text-[#00E5FF]" : "text-[#F59E0B]"
                      }`}
                    >
                      {zone.subtitle}
                    </span>

                    <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                      {zone.desc}
                    </p>

                    <div className="mt-6 space-y-2">
                      {zone.features.map((feat) => (
                        <div
                          key={feat}
                          className="p-2.5 rounded-xl tactile-inset flex items-center gap-2.5 text-xs text-zinc-300"
                        >
                          <CheckCircle2
                            className={`h-3.5 w-3.5 shrink-0 ${
                              isIron ? "text-[#FF5E1A]" : isClasses ? "text-[#00E5FF]" : "text-[#F59E0B]"
                            }`}
                          />
                          <span className="text-[11px]">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 pt-5 border-t border-white/10 flex items-center justify-between">
                    {isBar ? (
                      <Link
                        href="/tienda"
                        className="w-full py-2.5 rounded-xl tactile-btn-dark text-xs font-black uppercase tracking-wider text-center text-[#F59E0B] flex items-center justify-center gap-2"
                      >
                        <span>Ver Menú de Barra</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a
                        href="#membresias"
                        className={`w-full py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-center flex items-center justify-center gap-2 ${
                          isIron ? "tactile-btn-orange text-zinc-950" : "tactile-btn-cyan text-zinc-950"
                        }`}
                      >
                        <span>Ver Planes {isIron ? "Hierro" : "Clases"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Matriz de Membresías (5 Planes Completos) */}
      <section id="membresias" className="py-20 px-6 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#00E5FF]">
            Membresías Flexibles
          </span>
          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
            Elige Cómo Quieres Entrenar
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Paga solo por día, asegura tu zona preferida o ten acceso ilimitado a todo el galpón.
          </p>

          <div className="mt-8 inline-flex p-1.5 rounded-2xl tactile-inset">
            <button
              onClick={() => setSelectedPlanType("todos")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "todos"
                  ? "tactile-btn-orange text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Todos (5)
            </button>
            <button
              onClick={() => setSelectedPlanType("diarios")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "diarios"
                  ? "tactile-btn-orange text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Pases Diarios
            </button>
            <button
              onClick={() => setSelectedPlanType("mensuales")}
              className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedPlanType === "mensuales"
                  ? "tactile-btn-orange text-zinc-950"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Mensualidades
            </button>
          </div>
        </div>

        {/* Tarjetas de Precios con los 5 Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 relative ${
                plan.popular ? "tactile-card-orange xl:-translate-y-2" : "tactile-card"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full tactile-btn-orange px-3 py-1 text-[9px] font-black uppercase tracking-wider text-zinc-950 whitespace-nowrap">
                  Pase Definitivo
                </span>
              )}

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  {plan.category}
                </span>
                <h3 className="text-lg font-black uppercase text-white tracking-tight leading-tight">
                  {plan.name}
                </h3>
                <p className="text-[11px] text-zinc-400 mt-2 min-h-[34px] leading-snug">
                  {plan.desc}
                </p>

                {/* Caja de Precio */}
                <div className="my-4 p-3 rounded-2xl tactile-inset">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black font-mono text-white">
                      ${plan.price}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">/{plan.period}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono block mt-0.5">
                    ~{(plan.price * GYM_CONFIG.currency.exchangeRate).toFixed(0)} Bs
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {plan.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-2 text-[11px] text-zinc-300 leading-tight">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#00E5FF] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/mi-cuenta"
                  className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.popular
                      ? "tactile-btn-orange text-zinc-950"
                      : "tactile-btn-dark text-white"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Teaser Shake Bar & Pro-Shop */}
      <section id="shakebar" className="py-20 px-6 lg:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#FF5E1A]">
              Área 3 del Galpón
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mt-2">
              APEX Shake Bar & Pro-Shop
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-4 leading-relaxed">
              La barra de nutrición saludable ubicada dentro del mismo galpón. Pide tus batidos de proteína isolatada, pre-entrenos, creatina y meriendas directo en la barra o pre-ordénalos desde la app con Pago Móvil, Zelle, Efectivo o Binance Pay.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3.5 py-2 rounded-xl tactile-chip text-xs font-semibold text-zinc-200">
                🥤 Merengadas Proteicas
              </span>
              <span className="px-3.5 py-2 rounded-xl tactile-chip text-xs font-semibold text-zinc-200">
                ⚡ Pre-Entrenos & BCAA
              </span>
              <span className="px-3.5 py-2 rounded-xl tactile-chip text-xs font-semibold text-zinc-200">
                🥊 Fajas, Toallas & Guantes
              </span>
            </div>

            <div className="mt-8">
              <Link
                href="/tienda"
                className="tactile-btn-orange inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-xs font-black uppercase tracking-wider text-zinc-950"
              >
                <span>Ir al Menú de Barra & Tienda</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-5">
            {teaserProducts.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-3xl tactile-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-12 w-12 rounded-2xl tactile-inset flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <span className="px-3 py-1 rounded-full tactile-chip text-[10px] font-bold uppercase tracking-wider text-[#FF5E1A]">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-black uppercase text-white">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="text-lg font-black font-mono text-white">
                    ${item.price.toFixed(2)}
                  </span>
                  <Link
                    href="/tienda"
                    className="tactile-btn-dark px-3.5 py-1.5 rounded-xl text-[11px] font-bold text-[#00E5FF]"
                  >
                    Pedir →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer id="horarios" className="border-t border-white/10 py-12 px-6 lg:px-12 bg-[#090B0E] text-xs text-zinc-500">
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