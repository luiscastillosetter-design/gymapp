"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Home, 
  Calendar, 
  QrCode, 
  ShoppingBag, 
  User 
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: typeof Home;
  isCenter?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", href: "/", icon: Home },
  { label: "Reservas", href: "/reservas", icon: Calendar },
  { label: "Pase QR", href: "/mi-cuenta", icon: QrCode, isCenter: true },
  { label: "Tienda", href: "/tienda", icon: ShoppingBag },
  { label: "Mi Cuenta", href: "/mi-cuenta", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  // En la pantalla de recepción de torniquete no mostramos la barra de socio
  if (pathname === "/recepcion") {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-[max(env(safe-area-inset-bottom),0.75rem)] px-4">
      <nav 
        aria-label="Navegación móvil"
        className="pointer-events-auto relative mx-auto max-w-md h-16 rounded-3xl bg-[#16191F]/90 backdrop-blur-xl border border-white/10 shadow-[0_-8px_30px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.12)] flex items-center justify-around px-2"
      >
        {NAV_ITEMS.map((item, index) => {
          const Icon = item.icon;
          const isActive = 
            item.href === "/" 
              ? pathname === "/" 
              : pathname.startsWith(item.href) && !item.isCenter;
          const isCenterActive = item.isCenter && pathname === "/mi-cuenta";

          // 1. Botón Central QR Elevado con Relieve Neumórfico
          if (item.isCenter) {
            return (
              <div key={item.label} className="relative -top-5 flex flex-col items-center">
                {/* Hendidura cóncava neumórfica detrás del botón central */}
                <div 
                  className="absolute -top-1.5 w-16 h-16 rounded-full bg-[#0D0F12] shadow-[inset_0_3px_6px_rgba(0,0,0,0.9),inset_0_-2px_4px_rgba(255,255,255,0.06)] border border-white/5 pointer-events-none" 
                  aria-hidden="true"
                />

                <Link
                  href={item.href}
                  className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center transition-transform active:scale-95 shadow-[0_8px_20px_rgba(255,94,26,0.4),inset_0_2px_3px_rgba(255,255,255,0.3),inset_0_-3px_5px_rgba(0,0,0,0.5)] bg-gradient-to-tr from-[#FF5E1A] to-[#ff7d45] text-zinc-950 cursor-pointer"
                  aria-label="Abrir Pase QR digital para torniquete"
                >
                  <motion.div
                    animate={isCenterActive ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                  >
                    <Icon className="h-6 w-6 stroke-[2.4] text-white" />
                  </motion.div>
                </Link>

                <span className="text-[9px] font-black uppercase tracking-wider text-[#FF5E1A] mt-1 font-mono">
                  {item.label}
                </span>
              </div>
            );
          }

          // 2. Botones Laterales con Indicador y Relieve Táctil
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-full py-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute -inset-2 rounded-2xl bg-[#0D0F12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] border border-white/5"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
                
                <Icon className={`relative z-10 h-5 w-5 transition-transform ${
                  isActive ? "text-[#00E5FF] scale-110" : "text-zinc-400"
                }`} />
              </div>

              <span className={`relative z-10 text-[9px] uppercase tracking-wider mt-1 transition-colors ${
                isActive ? "text-white font-black" : "text-zinc-500 font-bold"
              }`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}