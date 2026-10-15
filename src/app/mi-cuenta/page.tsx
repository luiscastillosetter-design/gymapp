"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { 
  ArrowLeft, 
  QrCode, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  Flame, 
  Dumbbell, 
  Coffee, 
  User, 
  CreditCard,
  Zap,
  RefreshCw
} from "lucide-react";
import { GYM_CONFIG } from "@/config/gym";

interface MemberData {
  id: string;
  name: string;
  ci: string;
  planName: string;
  planType: "all-access" | "iron" | "functional" | "day-pass";
  status: "active" | "expired";
  validUntil: string;
  allowedZones: string[];
  remainingDaysOrClasses: number | string;
}

const DEFAULT_MEMBER: MemberData = {
  id: "APEX-84920",
  name: "Carlos Mendoza",
  ci: "V-24.891.023",
  planName: "All-Access Black (Dual)",
  planType: "all-access",
  status: "active",
  validUntil: "30 Noviembre 2026",
  allowedZones: ["Zona Hierro (Musculación)", "Box Funcional (CrossFit/Pilates)"],
  remainingDaysOrClasses: "18 días restantes",
};

export default function MemberPortalPage() {
  const [member, setMember] = useState<MemberData>(DEFAULT_MEMBER);
  const [isSimulatingExpiry, setIsSimulatingExpiry] = useState(false);
  const [qrTimestamp, setQrTimestamp] = useState("2026-10-15T00:00:00.000Z");

  // El timestamp dinámico se asigna solo en el cliente tras el montaje, evitando el error de prerender
  useEffect(() => {
    setQrTimestamp(new Date().toISOString());
  }, []);

  // Toggle interactivo para demostrar al pastor cómo reacciona la app si está solvente o vencido
  const toggleStatus = () => {
    if (member.status === "active") {
      setMember({
        ...member,
        status: "expired",
        remainingDaysOrClasses: "0 días (Vencido)",
      });
      setIsSimulatingExpiry(true);
    } else {
      setMember(DEFAULT_MEMBER);
      setIsSimulatingExpiry(false);
    }
  };

  const qrDataPayload = JSON.stringify({
    memberId: member.id,
    name: member.name,
    ci: member.ci,
    status: member.status,
    plan: member.planName,
    timestamp: qrTimestamp,
  });

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col">
      {/* 1. Barra de Navegación del Socio */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Volver a la portada"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#FF5E1A] uppercase font-bold">
              Portal del Atleta
            </span>
          </div>
        </div>

        {/* Simulador de Estado (Demostración) */}
        <button
          onClick={toggleStatus}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold text-zinc-300 transition-all cursor-pointer"
          title="Simular cambio de estado de pago"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#00E5FF]" />
          <span className="hidden sm:inline">Simular:</span>
          <span className={member.status === "active" ? "text-emerald-400" : "text-rose-400"}>
            {member.status === "active" ? "Solvente" : "Vencido"}
          </span>
        </button>
      </header>

      {/* 2. Contenedor Principal */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col gap-8">
        
        {/* Credencial Digital / Pase de Torniquete */}
        <div className="rounded-3xl bg-[#16191F] border border-white/10 overflow-hidden shadow-2xl relative">
          
          {/* Banda Superior de Estado */}
          <div className={`px-6 py-3 flex items-center justify-between ${
            member.status === "active" 
              ? "bg-gradient-to-r from-emerald-600/30 via-emerald-500/20 to-transparent border-b border-emerald-500/30" 
              : "bg-gradient-to-r from-rose-600/30 via-rose-500/20 to-transparent border-b border-rose-500/30"
          }`}>
            <div className="flex items-center gap-2">
              {member.status === "active" ? (
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
              ) : (
                <AlertCircle className="h-4 w-4 text-rose-400" />
              )}
              <span className={`text-xs font-black uppercase tracking-wider ${
                member.status === "active" ? "text-emerald-300" : "text-rose-300"
              }`}>
                {member.status === "active" ? "Membresía Activa · Acceso Permitido" : "Membresía Vencida · Pago Pendiente"}
              </span>
            </div>

            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              ID: {member.id}
            </span>
          </div>

          {/* Cuerpo del Carnet Digital */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            
            {/* Datos del Atleta */}
            <div className="space-y-4 w-full md:w-3/5 text-center md:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5E1A]">
                  Socio Oficial
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                  {member.name}
                </h1>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  C.I: {member.ci}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#0D0F12] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Plan Actual:</span>
                  <span className="font-bold text-white">{member.planName}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Válido Hasta:</span>
                  <span className="font-mono text-zinc-300">{member.validUntil}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500 uppercase font-bold text-[10px]">Estado:</span>
                  <span className={`font-bold ${member.status === "active" ? "text-emerald-400" : "text-rose-400"}`}>
                    {member.remainingDaysOrClasses}
                  </span>
                </div>
              </div>

              {/* Zonas Autorizadas */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                  Áreas Incluidas en tu Acceso:
                </span>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {member.allowedZones.map((zone) => (
                    <span
                      key={zone}
                      className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5"
                    >
                      <Zap className="h-3 w-3 text-[#FF5E1A]" />
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Código QR Dinámico para el Torniquete */}
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-6 rounded-2xl bg-white text-zinc-950 shadow-xl">
              <div className="relative">
                <QRCodeSVG
                  value={qrDataPayload}
                  size={180}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-600 text-center block">
                Muestra este QR en el torniquete o recepción
              </span>
              <span className="text-[9px] font-mono text-zinc-400 mt-0.5">
                Valida en tiempo real
              </span>
            </div>

          </div>
        </div>

        {/* 3. Accesos Rápidos del Socio (Horarios, Reservas, Shake Bar) */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 px-1">
            Gestión de Entrenamiento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Botón Reservar Clase */}
            <div className="p-6 rounded-3xl bg-[#16191F] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-cyan-500/10 text-[#00E5FF] flex items-center justify-center mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black uppercase text-white tracking-tight">
                  Reservar Clase
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Aparta tu cupo en CrossFit, Pilates o consulta el aforo en Musculación.
                </p>
              </div>

              <Link
                href="/reservas"
                className="mt-6 flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                <span>Ver Horarios</span>
                <span className="text-[10px] text-[#00E5FF]">Entrar →</span>
              </Link>
            </div>

            {/* Pre-ordenar en Shake Bar */}
            <div className="p-6 rounded-3xl bg-[#16191F] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-orange-500/10 text-[#FF5E1A] flex items-center justify-center mb-4">
                  <Coffee className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black uppercase text-white tracking-tight">
                  Shake Bar & Pedidos
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Pre-ordena tu merengada proteica o compra accesorios (fajas, toallas).
                </p>
              </div>

              <Link
                href="/tienda"
                className="mt-6 flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                <span>Pedir en Barra</span>
                <span className="text-[10px] text-[#FF5E1A]">Entrar →</span>
              </Link>
            </div>

            {/* Renovar / Métodos de Pago */}
            <div className="p-6 rounded-3xl bg-[#16191F] border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="text-base font-black uppercase text-white tracking-tight">
                  Renovar Membresía
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Paga tu cuota vía Pago Móvil, Zelle o Tarjeta y mantén tu QR activo.
                </p>
              </div>

              <Link
                href="/tienda"
                className="mt-6 flex items-center justify-between w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
              >
                <span>Reportar Pago</span>
                <span className="text-[10px] text-emerald-400">Pagar →</span>
              </Link>
            </div>

          </div>
        </div>

      </main>

      {/* Footer Mínimo */}
      <footer className="border-t border-white/5 py-6 px-6 text-center text-[11px] text-zinc-600">
        Credencial digital personal e intransferible · {GYM_CONFIG.name}
      </footer>
    </div>
  );
}