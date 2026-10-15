"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Calendar as CalendarIcon, 
  Clock, 
  Users, 
  CheckCircle2, 
  Flame, 
  Dumbbell, 
  Filter, 
  AlertCircle,
  X,
  Zap
} from "lucide-react";
import { GYM_CONFIG } from "@/config/gym";

interface TimeSlot {
  id: string;
  time: string;
  zone: "functional" | "iron";
  activity: string;
  coach?: string;
  capacity: number;
  booked: number;
  userBooked?: boolean;
}

const INITIAL_SLOTS: TimeSlot[] = [
  // Box Funcional (Clases con Coach)
  {
    id: "slot-1",
    time: "06:00 AM - 07:00 AM",
    zone: "functional",
    activity: "CrossFit WOD: Fuerza & Metcon",
    coach: "Coach Marcos R.",
    capacity: 16,
    booked: 14,
    userBooked: false,
  },
  {
    id: "slot-2",
    time: "07:15 AM - 08:15 AM",
    zone: "functional",
    activity: "Pilates Reformer & Movilidad",
    coach: "Coach Elena V.",
    capacity: 12,
    booked: 12, // Lleno
    userBooked: false,
  },
  {
    id: "slot-3",
    time: "08:30 AM - 09:30 AM",
    zone: "functional",
    activity: "Circuitos HIIT Quema Grasa",
    coach: "Coach Marcos R.",
    capacity: 18,
    booked: 8,
    userBooked: false,
  },
  {
    id: "slot-4",
    time: "05:00 PM - 06:00 PM",
    zone: "functional",
    activity: "CrossFit WOD: Resistencia Olímpica",
    coach: "Coach David P.",
    capacity: 16,
    booked: 11,
    userBooked: false,
  },
  {
    id: "slot-5",
    time: "06:15 PM - 07:15 PM",
    zone: "functional",
    activity: "Pilates Mat & Core Intenso",
    coach: "Coach Elena V.",
    capacity: 14,
    booked: 9,
    userBooked: false,
  },
  {
    id: "slot-6",
    time: "07:30 PM - 08:30 PM",
    zone: "functional",
    activity: "CrossFit Night WOD",
    coach: "Coach David P.",
    capacity: 16,
    booked: 15,
    userBooked: false,
  },

  // Zona Hierro (Musculación Libre con Aforo)
  {
    id: "iron-1",
    time: "06:00 AM - 08:00 AM",
    zone: "iron",
    activity: "Musculación: Mañana Temprana",
    capacity: 50,
    booked: 24, // 48% aforo
    userBooked: false,
  },
  {
    id: "iron-2",
    time: "08:00 AM - 10:00 AM",
    zone: "iron",
    activity: "Musculación: Media Mañana",
    capacity: 50,
    booked: 18, // 36% aforo
    userBooked: false,
  },
  {
    id: "iron-3",
    time: "05:00 PM - 07:00 PM",
    zone: "iron",
    activity: "Musculación: Hora Pico Tarde",
    capacity: 50,
    booked: 46, // 92% aforo casi lleno
    userBooked: false,
  },
  {
    id: "iron-4",
    time: "07:00 PM - 09:00 PM",
    zone: "iron",
    activity: "Musculación: Noche de Pesas",
    capacity: 50,
    booked: 38, // 76% aforo
    userBooked: false,
  },
];

const WEEK_DAYS = [
  { day: "Lun", date: "19 Oct" },
  { day: "Mar", date: "20 Oct" },
  { day: "Mié", date: "21 Oct" },
  { day: "Jue", date: "22 Oct" },
  { day: "Vie", date: "23 Oct" },
  { day: "Sáb", date: "24 Oct" },
];

export default function ReservasPage() {
  const [selectedDay, setSelectedDay] = useState("19 Oct");
  const [selectedZone, setSelectedZone] = useState<"all" | "functional" | "iron">("all");
  const [slots, setSlots] = useState<TimeSlot[]>(INITIAL_SLOTS);
  const [confirmationNotice, setConfirmationNotice] = useState<string | null>(null);

  // Manejo de reserva / cancelación
  const handleToggleBooking = (slotId: string) => {
    setSlots((prev) =>
      prev.map((slot) => {
        if (slot.id === slotId) {
          const isNowBooked = !slot.userBooked;
          const updatedBooked = isNowBooked ? slot.booked + 1 : slot.booked - 1;

          setConfirmationNotice(
            isNowBooked
              ? `¡Cupo reservado con éxito para ${slot.activity} (${slot.time})!`
              : `Has cancelado tu reserva en ${slot.activity}.`
          );

          setTimeout(() => setConfirmationNotice(null), 4000);

          return {
            ...slot,
            booked: updatedBooked,
            userBooked: isNowBooked,
          };
        }
        return slot;
      })
    );
  };

  const filteredSlots = slots.filter((slot) => {
    if (selectedZone === "all") return true;
    return slot.zone === selectedZone;
  });

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col">
      {/* 1. Header con retorno al portal */}
      <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/mi-cuenta"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Volver a mi carnet"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#00E5FF] uppercase font-bold">
              Horarios & Reservas
            </span>
          </div>
        </div>

        <Link
          href="/mi-cuenta"
          className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
        >
          Mi Carnet QR →
        </Link>
      </header>

      {/* Notificación de Confirmación en Pantalla */}
      {confirmationNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-[#FF5E1A] text-zinc-950 px-5 py-2.5 rounded-full shadow-2xl text-xs font-black flex items-center gap-2 border border-amber-400 animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          {confirmationNotice}
        </div>
      )}

      {/* 2. Contenido de Reservas */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col gap-6">
        
        {/* Cabecera de la sección */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
              Control de Aforo y Clases
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
              Agenda tu Sesión
            </h1>
          </div>

          {/* Filtro por Zona */}
          <div className="inline-flex p-1 rounded-2xl bg-[#16191F] border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setSelectedZone("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedZone === "all" ? "bg-white text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setSelectedZone("functional")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedZone === "functional" ? "bg-[#00E5FF] text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Funcional
            </button>
            <button
              onClick={() => setSelectedZone("iron")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedZone === "iron" ? "bg-[#FF5E1A] text-zinc-950 shadow-md" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              Hierro
            </button>
          </div>
        </div>

        {/* 3. Selector de Días de la Semana */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {WEEK_DAYS.map((item) => {
            const isSelected = selectedDay === item.date;
            return (
              <button
                key={item.date}
                onClick={() => setSelectedDay(item.date)}
                className={`flex-1 min-w-[70px] py-3 px-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? "bg-gradient-to-b from-[#1F1916] to-[#16191F] border-[#FF5E1A] shadow-lg shadow-[#FF5E1A]/10"
                    : "bg-[#16191F] border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-[#FF5E1A]" : "text-zinc-500"}`}>
                  {item.day}
                </span>
                <span className={`text-sm font-black font-mono ${isSelected ? "text-white" : "text-zinc-300"}`}>
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* 4. Lista de Slots / Clases del Día */}
        <div className="space-y-3.5 mt-2">
          {filteredSlots.map((slot) => {
            const percent = Math.round((slot.booked / slot.capacity) * 100);
            const isFull = slot.booked >= slot.capacity;

            // Color del termómetro de aforo
            let aforoColor = "text-emerald-400";
            let aforoBg = "bg-emerald-500";
            if (percent >= 70 && percent < 90) {
              aforoColor = "text-amber-400";
              aforoBg = "bg-amber-500";
            } else if (percent >= 90) {
              aforoColor = "text-rose-400";
              aforoBg = "bg-rose-500";
            }

            return (
              <div
                key={slot.id}
                className={`p-5 rounded-3xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  slot.userBooked
                    ? "bg-[#1A2226] border-cyan-500/50 shadow-xl"
                    : "bg-[#16191F] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Datos de la Clase / Slot */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      slot.zone === "functional"
                        ? "bg-cyan-500/10 text-[#00E5FF] border border-cyan-500/20"
                        : "bg-orange-500/10 text-[#FF5E1A] border border-orange-500/20"
                    }`}>
                      {slot.zone === "functional" ? "Box Funcional" : "Zona Hierro"}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-zinc-500" />
                      {slot.time}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-white">
                    {slot.activity}
                  </h3>

                  {slot.coach && (
                    <p className="text-xs text-zinc-400">
                      Instructor: <span className="font-semibold text-zinc-200">{slot.coach}</span>
                    </p>
                  )}

                  {/* Barra de Aforo en Vivo */}
                  <div className="pt-2 max-w-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">
                        {slot.zone === "functional" ? "Cupos ocupados:" : "Aforo del galpón:"}
                      </span>
                      <span className={`font-bold ${aforoColor}`}>
                        {slot.booked}/{slot.capacity} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${aforoBg} transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Botón de Acción */}
                <div className="sm:self-center shrink-0">
                  {slot.userBooked ? (
                    <button
                      onClick={() => handleToggleBooking(slot.id)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-[#00E5FF] text-xs font-black uppercase tracking-wider hover:bg-rose-500/20 hover:border-rose-500/40 hover:text-rose-400 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Reservado (Cancelar)</span>
                    </button>
                  ) : isFull ? (
                    <button
                      disabled
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/5 border border-white/5 text-zinc-600 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      Clase Llena
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleBooking(slot.id)}
                      className={`w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer ${
                        slot.zone === "functional"
                          ? "bg-[#00E5FF] text-zinc-950 hover:bg-[#33ebff]"
                          : "bg-[#FF5E1A] text-zinc-950 hover:bg-[#ff7638]"
                      }`}
                    >
                      Apartar Cupo
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer Mínimo */}
      <footer className="border-t border-white/5 py-6 px-6 text-center text-[11px] text-zinc-600">
        Políticas de reserva: Cancelaciones permitidas hasta 2 horas antes de la sesión.
      </footer>
    </div>
  );
}