"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { 
  ArrowLeft, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Coffee, 
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
  const [qrTimestamp, setQrTimestamp] = useState("2026-10-15T00:00:00.000Z");

  useEffect(() => {
    setQrTimestamp(new Date().toISOString());
  }, []);

  const toggleStatus = () => {
    if (member.status === "active") {
      setMember({
        ...member,
        status: "expired",
        remainingDaysOrClasses: "0 días (Vencido)",
      });
    } else {
      setMember(DEFAULT_MEMBER);
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
      <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2.5 rounded-2xl tactile-btn-dark text-zinc-400 hover:text-white transition-colors"
            title="Volver a la portada"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#FF5E1A] uppercase font-bold mt-0.5 block">
              Portal del Atleta
            </span>
          </div>
        </div>

        {/* Simulador de Estado (Demostración) */}
        <button
          onClick={toggleStatus}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl tactile-chip text-xs font-bold text-zinc-300 transition-all cursor-pointer"
          title="Simular cambio de estado de pago"
        >
          <RefreshCw className="h-3.5 w-3.5 text-[#00E5FF]" />
          <span className="hidden sm:inline">Simular:</span>
          <span className={member.status === "active" ? "text-emerald-400 font-black" : "text-rose-400 font-black"}>
            {member.status === "active" ? "Solvente" : "Vencido"}
          </span>
        </button>
      </header>

      {/* 2. Contenedor Principal */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col gap-8">
        
        {/* Credencial Digital / Carnet Táctil 3D */}
        <div className={`rounded-3xl overflow-hidden shadow-2xl relative transition-all duration-300 ${
          member.status === "active" ? "tactile-card-orange" : "tactile-card border-rose-500/50"
        }`}>
          
          {/* Banda Superior de Estado */}
          <div className={`px-6 py-3.5 flex items-center justify-between ${
            member.status === "active" 
              ? "bg-gradient-to-r from-emerald-600/30 via-emerald-500/10 to-transparent border-b border-emerald-500/30" 
              : "bg-gradient-to-r from-rose-600/30 via-rose-500/10 to-transparent border-b border-rose-500/30"
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
                {member.status === "active" ? "Membresía Activa · Acceso Concedido" : "Membresía Vencida · Pago Pendiente"}
              </span>
            </div>

            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-2.5 py-1 rounded-full tactile-inset">
              ID: {member.id}
            </span>
          </div>

          {/* Cuerpo del Carnet Digital */}
          <div className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 justify-between">
            
            {/* Datos del Atleta */}
            <div className="space-y-4 w-full md:w-3/5 text-center md:text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#FF5E1A]">
                  Socio Oficial
                </span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-0.5">
                  {member.name}
                </h1>
                <p className="text-xs text-zinc-400 font-mono mt-1">
                  C.I: {member.ci}
                </p>
              </div>

              {/* Caja de Datos Hundida */}
              <div className="p-4 rounded-2xl tactile-inset space-y-2.5">
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
                  <span className={`font-black ${member.status === "active" ? "text-emerald-400" : "text-rose-400"}`}>
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
                      className="px-3 py-1.5 rounded-xl tactile-chip text-[11px] font-semibold text-zinc-300 flex items-center gap-1.5"
                    >
                      <Zap className="h-3 w-3 text-[#FF5E1A]" />
                      {zone}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Código QR Dinámico en Placa Elevada */}
            <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-6 rounded-3xl bg-white text-zinc-950 shadow-[0_16px_40px_rgba(0,0,0,0.8),inset_0_2px_2px_rgba(255,255,255,0.9)]">
              <div className="p-2 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-inner">
                <QRCodeSVG
                  value={qrDataPayload}
                  size={175}
                  level="H"
                  includeMargin={false}
                />
              </div>

              <span className="mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-700 text-center block">
                Pase Digital de Torniquete
              </span>
              <span className="text-[9px] font-mono text-zinc-400 mt-0.5">
                Válido en torniquetes y counter
              </span>
            </div>

          </div>
        </div>

        {/* 3. Accesos Rápidos del Socio con Tarjetas Táctiles */}
        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500 mb-4 px-1">
            Gestión de Entrenamiento
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            {/* Reservar Clase */}
            <div className="p-6 rounded-3xl tactile-card flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl tactile-icon-box-cyan flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-[#00E5FF]" />
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
                className="mt-6 flex items-center justify-between w-full py-3 px-4 rounded-xl tactile-btn-dark text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Ver Horarios</span>
                <span className="text-[11px] font-black text-[#00E5FF]">Entrar →</span>
              </Link>
            </div>

            {/* Shake Bar */}
            <div className="p-6 rounded-3xl tactile-card flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl tactile-icon-box-orange flex items-center justify-center mb-4">
                  <Coffee className="h-6 w-6 text-[#FF5E1A]" />
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
                className="mt-6 flex items-center justify-between w-full py-3 px-4 rounded-xl tactile-btn-dark text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Pedir en Barra</span>
                <span className="text-[11px] font-black text-[#FF5E1A]">Entrar →</span>
              </Link>
            </div>

            {/* Renovar Membresía */}
            <div className="p-6 rounded-3xl tactile-card flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-2xl tactile-inset flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-emerald-400" />
                </div>
                <h3 className="text-base font-black uppercase text-white tracking-tight">
                  Renovar Membresía
                </h3>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Paga tu cuota vía Binance Pay, Pago Móvil, Zelle o Efectivo y mantén tu QR activo.
                </p>
              </div>

              <Link
                href="/tienda"
                className="mt-6 flex items-center justify-between w-full py-3 px-4 rounded-xl tactile-btn-dark text-xs font-bold uppercase tracking-wider text-white"
              >
                <span>Reportar Pago</span>
                <span className="text-[11px] font-black text-emerald-400">Pagar →</span>
              </Link>
            </div>

          </div>
        </div>

      </main>

      <footer className="border-t border-white/5 py-6 px-6 text-center text-[11px] text-zinc-600">
        Credencial digital personal e intransferible · {GYM_CONFIG.name}
      </footer>
    </div>
  );
}