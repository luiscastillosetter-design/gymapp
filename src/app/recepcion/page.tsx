"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  QrCode, 
  Search, 
  CheckCircle2, 
  XCircle, 
  UserPlus, 
  Clock, 
  Users
} from "lucide-react";
import { GYM_CONFIG } from "@/config/gym";

interface ScanResult {
  status: "granted" | "denied";
  memberId: string;
  name: string;
  ci: string;
  plan: string;
  zone: string;
  reason?: string;
  timestamp: string;
}

interface RecentCheckIn {
  id: string;
  name: string;
  ci: string;
  plan: string;
  zone: string;
  time: string;
  status: "granted" | "denied";
}

const INITIAL_LOG: RecentCheckIn[] = [
  {
    id: "1",
    name: "Carlos Mendoza",
    ci: "V-24.891.023",
    plan: "All-Access Black (Dual)",
    zone: "Zona Hierro",
    time: "Hace 2 min",
    status: "granted",
  },
  {
    id: "2",
    name: "Valeria Gómez",
    ci: "V-27.102.441",
    plan: "CrossFit / Box Funcional",
    zone: "Box Funcional",
    time: "Hace 5 min",
    status: "granted",
  },
  {
    id: "3",
    name: "Pedro Quintana",
    ci: "V-19.450.812",
    plan: "Membresía Hierro",
    zone: "Zona Hierro",
    time: "Hace 12 min",
    status: "denied",
  },
  {
    id: "4",
    name: "Mariana Silva",
    ci: "V-26.331.009",
    plan: "Day Pass Total ($8)",
    zone: "Ambas Zonas",
    time: "Hace 18 min",
    status: "granted",
  },
];

export default function RecepcionPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [recentLog, setRecentLog] = useState<RecentCheckIn[]>(INITIAL_LOG);
  const [totalInside, setTotalInside] = useState(48);
  const [activeTab, setActiveTab] = useState<"checkin" | "pase-diario">("checkin");

  const [walkinName, setWalkinName] = useState("");
  const [walkinCi, setWalkinCi] = useState("");
  const [walkinPlan, setWalkinPlan] = useState("day-pass-single");
  const [walkinPayment, setWalkinPayment] = useState("cash");
  const [saleConfirmed, setSaleConfirmed] = useState(false);

  const simulateScanGranted = () => {
    const newEntry: ScanResult = {
      status: "granted",
      memberId: "APEX-84920",
      name: "Carlos Mendoza",
      ci: "V-24.891.023",
      plan: "All-Access Black (Dual)",
      zone: "Zona Hierro & Box Funcional",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setScanResult(newEntry);
    setTotalInside((prev) => prev + 1);
    setRecentLog((prev) => [
      {
        id: Date.now().toString(),
        name: newEntry.name,
        ci: newEntry.ci,
        plan: newEntry.plan,
        zone: "Zona Hierro",
        time: "Justo ahora",
        status: "granted",
      },
      ...prev.slice(0, 7),
    ]);
  };

  const simulateScanDenied = () => {
    const newEntry: ScanResult = {
      status: "denied",
      memberId: "APEX-10492",
      name: "Ricardo Morales",
      ci: "V-18.390.112",
      plan: "Membresía Hierro (Vencida)",
      zone: "Zona Hierro",
      reason: "Membresía expiró hace 3 días (Saldo adeudado: $35.00)",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setScanResult(newEntry);
    setRecentLog((prev) => [
      {
        id: Date.now().toString(),
        name: newEntry.name,
        ci: newEntry.ci,
        plan: newEntry.plan,
        zone: "Zona Hierro",
        time: "Justo ahora",
        status: "denied",
      },
      ...prev.slice(0, 7),
    ]);
  };

  const handleSellDayPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkinName || !walkinCi) return;

    const planData = GYM_CONFIG.plans.find((p) => p.id === walkinPlan);
    const newLogItem: RecentCheckIn = {
      id: Date.now().toString(),
      name: walkinName,
      ci: walkinCi,
      plan: `${planData?.name} ($${planData?.price})`,
      zone: walkinPlan === "day-pass-total" ? "Ambas Zonas" : "Zona Seleccionada",
      time: "Justo ahora",
      status: "granted",
    };

    setRecentLog((prev) => [newLogItem, ...prev.slice(0, 7)]);
    setTotalInside((prev) => prev + 1);
    setSaleConfirmed(true);
    setTimeout(() => {
      setSaleConfirmed(false);
      setWalkinName("");
      setWalkinCi("");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col font-sans">
      {/* 1. Header de Recepción Limpio y Desahogado */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/95 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 lg:px-12 py-3 flex items-center justify-between gap-3">
        {/* Lado Izquierdo: Volver + Marca */}
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <Link
            href="/"
            className="p-2 sm:p-2.5 rounded-2xl tactile-btn-dark text-zinc-400 hover:text-white transition-colors shrink-0"
            title="Volver a la portada"
            aria-label="Volver"
          >
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
          
          <div className="min-w-0">
            <span className="text-sm sm:text-base font-black tracking-wider uppercase text-white block leading-tight truncate">
              {GYM_CONFIG.name}
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF5E1A] animate-pulse shrink-0" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5E1A] truncate">
                Torniquete & Counter
              </span>
            </div>
          </div>
        </div>

        {/* Lado Derecho: Contador de Aforo (PC) + Botón de Acceso Rápido */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden md:flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl tactile-inset">
            <Users className="h-4 w-4 text-[#00E5FF]" />
            <div className="leading-tight">
              <span className="text-[9px] text-zinc-400 uppercase font-bold block">
                Aforo Galpón
              </span>
              <span className="text-xs font-black font-mono text-white">
                {totalInside} Atletas
              </span>
            </div>
          </div>

          <Link
            href="/mi-cuenta"
            className="tactile-btn-dark flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-white"
          >
            <QrCode className="h-3.5 w-3.5 text-[#00E5FF] shrink-0" />
            <span className="hidden sm:inline">Ver Carnet Socio</span>
            <span className="sm:hidden font-mono">Socio</span>
            <span className="hidden sm:inline">→</span>
          </Link>
        </div>
      </header>

      {/* 2. Contenedor de Operaciones */}
      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 flex-1 flex flex-col gap-6">
        
        {/* Selector de Pestañas: Check-in vs Venta de Pase Diario */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="inline-flex p-1.5 rounded-2xl tactile-inset w-full sm:w-auto">
            <button
              onClick={() => setActiveTab("checkin")}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "checkin" ? "tactile-btn-orange text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              <QrCode className="h-4 w-4" />
              <span>Escáner Torniquete</span>
            </button>
            <button
              onClick={() => setActiveTab("pase-diario")}
              className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                activeTab === "pase-diario" ? "tactile-btn-cyan text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Venta Pase Diario</span>
            </button>
          </div>

          {/* Botones de demostración rápida */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-[10px] font-bold uppercase text-zinc-500 hidden sm:inline">Simular:</span>
            <button
              onClick={simulateScanGranted}
              className="px-3 py-1.5 rounded-xl tactile-btn-dark text-emerald-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider cursor-pointer border-emerald-500/30"
            >
              Solvente (Verde)
            </button>
            <button
              onClick={simulateScanDenied}
              className="px-3 py-1.5 rounded-xl tactile-btn-dark text-rose-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider cursor-pointer border-rose-500/30"
            >
              Vencido (Rojo)
            </button>
          </div>
        </div>

        {activeTab === "checkin" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <div className="lg:col-span-7 space-y-4">
              
              {scanResult ? (
                <div className={`p-5 sm:p-8 rounded-3xl transition-all ${
                  scanResult.status === "granted" ? "tactile-card-cyan" : "tactile-card border-rose-500/60"
                }`}>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      {scanResult.status === "granted" ? (
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl tactile-btn-cyan text-zinc-950 flex items-center justify-center font-black shrink-0">
                          <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8" />
                        </div>
                      ) : (
                        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-rose-500 text-zinc-950 flex items-center justify-center font-black shadow-lg shrink-0">
                          <XCircle className="h-7 w-7 sm:h-8 sm:w-8" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <span className={`text-[10px] sm:text-[11px] font-black uppercase tracking-widest block truncate ${
                          scanResult.status === "granted" ? "text-[#00E5FF]" : "text-rose-400"
                        }`}>
                          {scanResult.status === "granted" ? "Torniquete Abierto · Pase Permitido" : "Acceso Denegado"}
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black uppercase tracking-tight text-white truncate">
                          {scanResult.name}
                        </h2>
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-zinc-400 px-2.5 py-1 rounded-full tactile-inset shrink-0">
                      {scanResult.timestamp}
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl tactile-inset space-y-2 mt-4 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">C.I / Documento:</span>
                      <span className="text-white font-bold">{scanResult.ci}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Membresía:</span>
                      <span className="text-white font-bold">{scanResult.plan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Áreas Habilitadas:</span>
                      <span className="text-[#00E5FF] font-bold">{scanResult.zone}</span>
                    </div>
                    {scanResult.reason && (
                      <div className="pt-2 border-t border-white/10 text-rose-300 font-bold">
                        Motivo: {scanResult.reason}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                    {scanResult.status === "denied" && (
                      <button
                        onClick={() => alert("Cobro de mensualidad registrado")}
                        className="flex-1 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-zinc-950 text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-lg"
                      >
                        Cobrar Mensualidad ($35)
                      </button>
                    )}
                    <button
                      onClick={() => setScanResult(null)}
                      className="flex-1 py-3.5 rounded-2xl tactile-btn-dark text-white text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      Limpiar / Siguiente Atleta
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-8 sm:p-12 rounded-3xl tactile-card text-center flex flex-col items-center justify-center min-h-[280px]">
                  <div className="h-16 w-16 rounded-3xl tactile-inset text-[#FF5E1A] flex items-center justify-center mb-4">
                    <QrCode className="h-8 w-8 animate-pulse" />
                  </div>
                  <h3 className="text-lg font-black uppercase text-white tracking-tight">
                    Esperando Escaneo de QR
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 max-w-sm leading-relaxed">
                    Apunta el lector láser o usa la cámara para validar el pase digital del atleta.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2.5 justify-center">
                    <button
                      onClick={simulateScanGranted}
                      className="px-4 py-2.5 rounded-2xl tactile-btn-dark text-emerald-400 text-xs font-black uppercase tracking-wider cursor-pointer border-emerald-500/30"
                    >
                      Probar Atleta Solvente
                    </button>
                    <button
                      onClick={simulateScanDenied}
                      className="px-4 py-2.5 rounded-2xl tactile-btn-dark text-rose-400 text-xs font-black uppercase tracking-wider cursor-pointer border-rose-500/30"
                    >
                      Probar Atleta Vencido
                    </button>
                  </div>
                </div>
              )}

              {/* Búsqueda Manual */}
              <div className="p-2 sm:p-2.5 rounded-2xl tactile-inset flex items-center gap-2">
                <Search className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-500 shrink-0 ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busca por Cédula (V-...) o Nombre..."
                  className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none py-1.5"
                />
                {searchQuery && (
                  <button
                    onClick={simulateScanGranted}
                    className="px-3.5 py-2 rounded-xl tactile-btn-cyan text-zinc-950 text-xs font-black uppercase tracking-wider cursor-pointer shrink-0"
                  >
                    Validar
                  </button>
                )}
              </div>
            </div>

            {/* Log de Entradas Recientes */}
            <div className="lg:col-span-5 rounded-3xl tactile-card p-5 sm:p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-[#FF5E1A]" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-white">
                      Entradas Recientes
                    </h3>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-mono">En Vivo</span>
                </div>

                <div className="space-y-2">
                  {recentLog.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-2xl tactile-inset flex items-center justify-between gap-2.5 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full shrink-0 ${item.status === "granted" ? "bg-emerald-400" : "bg-rose-400"}`} />
                          <h4 className="font-bold text-white truncate text-xs">{item.name}</h4>
                        </div>
                        <p className="text-[10px] text-zinc-500 font-mono mt-0.5 truncate">
                          {item.ci} · {item.plan}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-black uppercase block ${
                          item.status === "granted" ? "text-emerald-400" : "text-rose-400"
                        }`}>
                          {item.status === "granted" ? "OK" : "VENCIDO"}
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-white/5 text-center">
                <span className="text-[10px] font-mono text-zinc-500">
                  Torniquete sincronizado con base de datos central
                </span>
              </div>
            </div>

          </div>
        )}

        {/* Pestaña: Venta Rápida de Pase Diario */}
        {activeTab === "pase-diario" && (
          <div className="max-w-xl mx-auto w-full rounded-3xl tactile-card p-6 sm:p-8 shadow-2xl">
            <div className="mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
                Mostrador / Taquilla
              </span>
              <h2 className="text-xl font-black uppercase text-white mt-0.5">
                Emitir Pase Diario (Day Pass)
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                Registra a atletas visitantes que pagan por una jornada de entrenamiento.
              </p>
            </div>

            {saleConfirmed ? (
              <div className="py-8 text-center space-y-3">
                <div className="h-16 w-16 rounded-3xl tactile-inset text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-black uppercase text-white">
                  ¡Pase Diario Emitido!
                </h3>
                <p className="text-xs text-zinc-400 font-mono">
                  Atleta ingresado al galpón y registrado en el log del counter.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSellDayPass} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    value={walkinName}
                    onChange={(e) => setWalkinName(e.target.value)}
                    placeholder="Ej: Daniel Hernández"
                    className="w-full rounded-2xl tactile-inset p-3.5 text-xs text-white outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Cédula de Identidad *</label>
                  <input
                    type="text"
                    required
                    value={walkinCi}
                    onChange={(e) => setWalkinCi(e.target.value)}
                    placeholder="Ej: V-25.109.876"
                    className="w-full rounded-2xl tactile-inset p-3.5 text-xs text-white outline-none focus:border-[#00E5FF]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Tipo de Pase</label>
                  <select
                    value={walkinPlan}
                    onChange={(e) => setWalkinPlan(e.target.value)}
                    className="w-full rounded-2xl tactile-inset p-3.5 text-xs text-white outline-none focus:border-[#00E5FF] font-bold"
                  >
                    <option value="day-pass-single">Day Pass Simple ($5.00) - Una Sola Zona</option>
                    <option value="day-pass-total">Day Pass Total ($8.00) - Musculación + Funcional</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-1">Método de Pago Recibido</label>
                  <select
                    value={walkinPayment}
                    onChange={(e) => setWalkinPayment(e.target.value)}
                    className="w-full rounded-2xl tactile-inset p-3.5 text-xs text-white outline-none focus:border-[#00E5FF]"
                  >
                    <option value="cash">Efectivo (USD o Bs en caja)</option>
                    <option value="pagomovil">Pago Móvil</option>
                    <option value="zelle">Zelle</option>
                    <option value="binance">Binance Pay (USDT)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={!walkinName || !walkinCi}
                  className="w-full mt-2 py-4 rounded-2xl tactile-btn-cyan text-zinc-950 text-xs font-black uppercase tracking-wider transition-all disabled:opacity-40 cursor-pointer"
                >
                  Cobrar y Abrir Torniquete
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      <footer className="border-t border-white/5 py-4 px-6 text-center text-[10px] text-zinc-600 font-mono">
        Módulo Operativo de Recepción y Control de Aforo · {GYM_CONFIG.name}
      </footer>
    </div>
  );
}