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
  { label: "Cuenta", href: "/mi-cuenta", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  if (pathname === "/recepcion") {
    return null;
  }

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 pointer-events-none pb-[max(env(safe-area-inset-bottom),0.75rem)] px-3">
      <nav
        aria-label="Navegación móvil"
        className="pointer-events-auto relative mx-auto max-w-md h-[68px] rounded-[28px] tactile-card flex items-center justify-around px-2 backdrop-blur-xl"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href) && !item.isCenter;
          const isCenterActive = item.isCenter && pathname === "/mi-cuenta";

          // Botón Central con Muesca Cóncava Profunda y Esfera 3D Naranja
          if (item.isCenter) {
            return (
              <div key={item.label} className="relative -top-5 flex flex-col items-center">
                {/* Cavidad tallada (Muesca curva) */}
                <div
                  className="absolute -top-2 w-[66px] h-[66px] rounded-full tactile-inset pointer-events-none"
                  aria-hidden="true"
                />

                <Link
                  href={item.href}
                  className="relative z-10 w-14 h-14 rounded-full tactile-btn-orange flex items-center justify-center text-white cursor-pointer"
                  aria-label="Abrir Pase QR digital"
                >
                  <motion.div
                    animate={isCenterActive ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 2.2 }}
                  >
                    <Icon className="h-6 w-6 stroke-[2.5] drop-shadow" />
                  </motion.div>
                </Link>

                <span className="text-[9px] font-black uppercase tracking-wider text-[#FF5E1A] mt-1.5 font-mono drop-shadow">
                  {item.label}
                </span>
              </div>
            );
          }

          // Botones Laterales con Cavidad Táctil al Seleccionar
          return (
            <Link
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-14 h-full py-1 cursor-pointer group"
            >
              <div className="relative flex items-center justify-center w-10 h-10">
                {isActive && (
                  <motion.div
                    layoutId="tactile-nav-slot"
                    className="absolute inset-0 rounded-2xl tactile-inset border border-[#00E5FF]/30 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-5 w-5 transition-all duration-200 ${
                    isActive
                      ? "text-[#00E5FF] scale-110 drop-shadow-[0_0_8px_rgba(0,229,255,0.6)]"
                      : "text-zinc-400 group-hover:text-zinc-200"
                  }`}
                />
              </div>

              <span
                className={`relative z-10 text-[9px] uppercase tracking-wider mt-0.5 transition-colors ${
                  isActive ? "text-white font-black" : "text-zinc-500 font-bold"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}