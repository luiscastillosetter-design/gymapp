"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Dumbbell,
  Bike,
  Sparkles
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
  // Clases Grupales: CrossFit, Pilates, Zumba & Xtreme Bike
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
    activity: "Xtreme Bike: Sesión Intervalos & Potencia",
    coach: "Coach Andrés B.",
    capacity: 20,
    booked: 17,
    userBooked: false,
  },
  {
    id: "slot-3",
    time: "08:30 AM - 09:30 AM",
    zone: "functional",
    activity: "Pilates Reformer & Movilidad Articular",
    coach: "Coach Elena V.",
    capacity: 12,
    booked: 12, // Lleno
    userBooked: false,
  },
  {
    id: "slot-4",
    time: "09:45 AM - 10:45 AM",
    zone: "functional",
    activity: "Zumba Fitness: Cardio Bailable & Ritmo",
    coach: "Coach Karla M.",
    capacity: 25,
    booked: 18,
    userBooked: false,
  },
  {
    id: "slot-5",
    time: "05:00 PM - 06:00 PM",
    zone: "functional",
    activity: "Xtreme Bike: Sunset Ride & Luces",
    coach: "Coach Andrés B.",
    capacity: 20,
    booked: 19,
    userBooked: false,
  },
  {
    id: "slot-6",
    time: "06:15 PM - 07:15 PM",
    zone: "functional",
    activity: "CrossFit WOD: Resistencia Olímpica",
    coach: "Coach David P.",
    capacity: 16,
    booked: 11,
    userBooked: false,
  },
  {
    id: "slot-7",
    time: "07:30 PM - 08:30 PM",
    zone: "functional",
    activity: "Pilates Mat & Core Intenso",
    coach: "Coach Elena V.",
    capacity: 14,
    booked: 9,
    userBooked: false,
  },
  {
    id: "slot-8",
    time: "08:30 PM - 09:30 PM",
    zone: "functional",
    activity: "Zumba Night Party: Quema Calórica",
    coach: "Coach Karla M.",
    capacity: 25,
    booked: 21,
    userBooked: false,
  },

  // Zona Hierro (Musculación con Aforo del Galpón)
  {
    id: "iron-1",
    time: "06:00 AM - 08:00 AM",
    zone: "iron",
    activity: "Musculación: Mañana Temprana",
    capacity: 50,
    booked: 24,
    userBooked: false,
  },
  {
    id: "iron-2",
    time: "08:00 AM - 10:00 AM",
    zone: "iron",
    activity: "Musculación: Media Mañana",
    capacity: 50,
    booked: 18,
    userBooked: false,
  },
  {
    id: "iron-3",
    time: "05:00 PM - 07:00 PM",
    zone: "iron",
    activity: "Musculación: Hora Pico Tarde",
    capacity: 50,
    booked: 46,
    userBooked: false,
  },
  {
    id: "iron-4",
    time: "07:00 PM - 09:00 PM",
    zone: "iron",
    activity: "Musculación: Noche de Pesas",
    capacity: 50,
    booked: 38,
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
      <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/mi-cuenta"
            className="p-2.5 rounded-2xl tactile-btn-dark text-zinc-400 hover:text-white transition-colors"
            title="Volver a mi carnet"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#00E5FF] uppercase font-bold mt-0.5 block">
              Horarios & Clases
            </span>
          </div>
        </div>

        <Link
          href="/mi-cuenta"
          className="tactile-btn-dark px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white"
        >
          Mi Carnet QR →
        </Link>
      </header>

      {confirmationNotice && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 tactile-btn-orange text-zinc-950 px-5 py-2.5 rounded-full shadow-2xl text-xs font-black flex items-center gap-2 border border-amber-300 animate-bounce">
          <CheckCircle2 className="h-4 w-4" />
          {confirmationNotice}
        </div>
      )}

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col gap-6">
        
        {/* Cabecera y Filtros */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
              CrossFit · Pilates · Zumba · Xtreme Bike · Hierro
            </span>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white mt-1">
              Agenda tu Sesión
            </h1>
          </div>

          <div className="inline-flex p-1 rounded-2xl tactile-inset self-start sm:self-auto">
            <button
              onClick={() => setSelectedZone("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedZone === "all" ? "tactile-btn-orange text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setSelectedZone("functional")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedZone === "functional" ? "tactile-btn-cyan text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Flame className="h-3.5 w-3.5" />
              Clases & Box
            </button>
            <button
              onClick={() => setSelectedZone("iron")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1 ${
                selectedZone === "iron" ? "tactile-btn-orange text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              <Dumbbell className="h-3.5 w-3.5" />
              Hierro
            </button>
          </div>
        </div>

        {/* Selector de Días */}
        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none p-1.5 rounded-3xl tactile-inset">
          {WEEK_DAYS.map((item) => {
            const isSelected = selectedDay === item.date;
            return (
              <button
                key={item.date}
                onClick={() => setSelectedDay(item.date)}
                className={`flex-1 min-w-[70px] py-3 px-3 rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                  isSelected
                    ? "tactile-btn-orange text-zinc-950 scale-102"
                    : "tactile-btn-dark text-zinc-400 hover:text-white"
                }`}
              >
                <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? "text-zinc-950" : "text-zinc-500"}`}>
                  {item.day}
                </span>
                <span className={`text-sm font-black font-mono ${isSelected ? "text-zinc-950" : "text-zinc-200"}`}>
                  {item.date}
                </span>
              </button>
            );
          })}
        </div>

        {/* Lista de Slots */}
        <div className="space-y-4 mt-2">
          {filteredSlots.map((slot) => {
            const percent = Math.round((slot.booked / slot.capacity) * 100);
            const isFull = slot.booked >= slot.capacity;

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
                className={`p-6 rounded-3xl transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  slot.userBooked ? "tactile-card-cyan" : "tactile-card"
                }`}
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full tactile-chip ${
                      slot.zone === "functional" ? "text-[#00E5FF]" : "text-[#FF5E1A]"
                    }`}>
                      {slot.zone === "functional" ? "Clases Grupales" : "Zona Hierro"}
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

                  {/* Barra de Aforo */}
                  <div className="pt-2 max-w-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-zinc-500">
                        {slot.zone === "functional" ? "Cupos apartados:" : "Aforo del galpón:"}
                      </span>
                      <span className={`font-bold ${aforoColor}`}>
                        {slot.booked}/{slot.capacity} ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 w-full tactile-inset rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full ${aforoBg} rounded-full transition-all duration-500`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:self-center shrink-0">
                  {slot.userBooked ? (
                    <button
                      onClick={() => handleToggleBooking(slot.id)}
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl tactile-btn-dark border border-cyan-500/50 text-[#00E5FF] text-xs font-black uppercase tracking-wider hover:text-rose-400 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Reservado (Cancelar)</span>
                    </button>
                  ) : isFull ? (
                    <button
                      disabled
                      className="w-full sm:w-auto px-5 py-3 rounded-2xl tactile-inset text-zinc-600 text-xs font-bold uppercase tracking-wider cursor-not-allowed"
                    >
                      Clase Llena
                    </button>
                  ) : (
                    <button
                      onClick={() => handleToggleBooking(slot.id)}
                      className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        slot.zone === "functional"
                          ? "tactile-btn-cyan text-zinc-950"
                          : "tactile-btn-orange text-zinc-950"
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

      <footer className="border-t border-white/5 py-6 px-6 text-center text-[11px] text-zinc-600">
        Políticas de reserva: Cancelaciones permitidas hasta 2 horas antes de la sesión.
      </footer>
    </div>
  );
}