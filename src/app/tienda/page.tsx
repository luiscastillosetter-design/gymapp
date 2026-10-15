"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Check, 
  Copy, 
  CreditCard, 
  Coins, 
  DollarSign, 
  Banknote, 
  CheckCircle2, 
  X,
  Clock,
  Sparkles
} from "lucide-react";
import { GYM_CONFIG } from "@/config/gym";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

export default function TiendaPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "shakebar" | "proshop">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"binance" | "pagomovil" | "zelle" | "cash">("binance");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [pickupTime, setPickupTime] = useState("al_terminar");

  const addToCart = (product: typeof GYM_CONFIG.products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, category: product.category }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalUsd = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalBs = (totalUsd * GYM_CONFIG.currency.exchangeRate).toFixed(0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderConfirmed(true);
  };

  const filteredProducts = GYM_CONFIG.products.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#0D0F12] text-zinc-100 flex flex-col">
      <header className="sticky top-0 z-40 bg-[#0D0F12]/90 backdrop-blur-xl border-b border-white/10 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/mi-cuenta"
            className="p-2.5 rounded-2xl tactile-btn-dark text-zinc-400 hover:text-white transition-colors"
            title="Volver a mi cuenta"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <span className="text-base font-black tracking-wider uppercase text-white block leading-none">
              {GYM_CONFIG.name}
            </span>
            <span className="text-[10px] tracking-widest text-[#FF5E1A] uppercase font-bold mt-0.5 block">
              Shake Bar & Pro-Shop
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-3 rounded-2xl tactile-btn-dark text-white flex items-center gap-2 cursor-pointer"
        >
          <ShoppingCart className="h-5 w-5 text-[#00E5FF]" />
          <span className="text-xs font-mono font-bold">${totalUsd.toFixed(2)}</span>
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full tactile-btn-orange text-zinc-950 font-black text-[10px] flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      <main className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col gap-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF5E1A]">
              Nutrición de Alto Rendimiento & Equipamiento
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white mt-1">
              Catálogo Oficial del Galpón
            </h1>
          </div>

          <div className="inline-flex p-1 rounded-2xl tactile-inset self-start sm:self-auto">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "all" ? "tactile-btn-orange text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              Todo
            </button>
            <button
              onClick={() => setSelectedCategory("shakebar")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "shakebar" ? "tactile-btn-orange text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              🥤 Shake Bar
            </button>
            <button
              onClick={() => setSelectedCategory("proshop")}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "proshop" ? "tactile-btn-cyan text-zinc-950" : "text-zinc-400 hover:text-white"
              }`}
            >
              🥊 Pro-Shop
            </button>
          </div>
        </div>

        {/* Cuadrícula de Productos con Relieve */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-3xl tactile-card p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-14 w-14 rounded-2xl tactile-inset flex items-center justify-center text-3xl">
                    {p.image}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full tactile-chip ${
                    p.category === "shakebar" ? "text-[#FF5E1A]" : "text-[#00E5FF]"
                  }`}>
                    {p.badge}
                  </span>
                </div>

                <h3 className="text-lg font-black uppercase text-white tracking-tight">
                  {p.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {p.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black font-mono text-white block">
                    ${p.price.toFixed(2)}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    ~{(p.price * GYM_CONFIG.currency.exchangeRate).toFixed(0)} Bs
                  </span>
                </div>

                <button
                  onClick={() => addToCart(p)}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl tactile-btn-orange text-zinc-950 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Agregar</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Panel Lateral del Carrito (Elevado sobre el BottomNav con z-[70]) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md bg-[#16191F] h-full p-6 pb-[max(env(safe-area-inset-bottom),1.75rem)] flex flex-col justify-between shadow-2xl border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-[#00E5FF]" />
                  <h2 className="text-lg font-black uppercase text-white tracking-tight">
                    Tu Pedido ({totalItems})
                  </h2>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-xl tactile-btn-dark text-zinc-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="py-4 space-y-3 max-h-[55vh] overflow-y-auto">
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-zinc-500 text-xs">
                    Tu carrito está vacío. Agrega una merengada o accesorio.
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.id}
                      className="p-3.5 rounded-2xl tactile-inset flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs font-bold text-white truncate">
                          {item.name}
                        </h4>
                        <span className="text-[11px] font-mono text-zinc-400">
                          ${item.price.toFixed(2)} c/u
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1.5 rounded-lg tactile-btn-dark text-zinc-300"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-mono font-bold text-white w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1.5 rounded-lg tactile-btn-dark text-zinc-300"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-zinc-500 hover:text-rose-400 ml-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="p-4 rounded-2xl tactile-inset space-y-1">
                  <div className="flex items-center justify-between text-xs text-zinc-400">
                    <span>Subtotal:</span>
                    <span className="font-mono">${totalUsd.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-black text-white">
                    <span>Total a Pagar:</span>
                    <div className="text-right">
                      <span className="font-mono text-lg">${totalUsd.toFixed(2)}</span>
                      <span className="block text-[10px] text-zinc-400 font-mono">~{totalBs} Bs</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-4 rounded-2xl tactile-btn-orange text-zinc-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continuar al Pago</span>
                  <span>→</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Checkout Multimoneda con Cajas Talladas (z-[80]) */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-[80] bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg tactile-card rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsCheckoutOpen(false);
                setOrderConfirmed(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-xl tactile-btn-dark text-zinc-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            {orderConfirmed ? (
              <div className="text-center py-8 space-y-4">
                <div className="h-16 w-16 rounded-3xl tactile-inset text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="h-9 w-9" />
                </div>
                <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                  ¡Pedido Recibido!
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                  Tu orden ha sido enviada al Shake Bar / Counter. Presenta tu nombre o tu Pase QR al retirar.
                </p>
                <div className="p-4 rounded-2xl tactile-inset text-xs font-mono text-zinc-300">
                  Total a verificar: <strong className="text-white">${totalUsd.toFixed(2)}</strong> ({paymentMethod.toUpperCase()})
                </div>
                <button
                  onClick={() => {
                    setCart([]);
                    setIsCheckoutOpen(false);
                    setOrderConfirmed(false);
                  }}
                  className="mt-4 px-8 py-3.5 rounded-2xl tactile-btn-orange text-zinc-950 font-black text-xs uppercase tracking-wider cursor-pointer"
                >
                  Listo / Volver a la Tienda
                </button>
              </div>
            ) : (
              <form onSubmit={handleConfirmOrder} className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#00E5FF]">
                    Paso Final
                  </span>
                  <h3 className="text-xl font-black uppercase text-white mt-0.5">
                    Método de Pago & Entrega
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Total: <strong className="text-white font-mono">${totalUsd.toFixed(2)}</strong> (~{totalBs} Bs)
                  </p>
                </div>

                {/* Momento de Retiro */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-2">
                    ¿Cuándo deseas retirar tu pedido?
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setPickupTime("al_terminar")}
                      className={`p-3.5 rounded-2xl text-left font-bold transition-all cursor-pointer ${
                        pickupTime === "al_terminar"
                          ? "tactile-card-orange text-white"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <Clock className="h-4 w-4 mb-1 text-[#FF5E1A]" />
                      Al terminar mi entrenamiento
                    </button>
                    <button
                      type="button"
                      onClick={() => setPickupTime("inmediato")}
                      className={`p-3.5 rounded-2xl text-left font-bold transition-all cursor-pointer ${
                        pickupTime === "inmediato"
                          ? "tactile-card-cyan text-white"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <Sparkles className="h-4 w-4 mb-1 text-[#00E5FF]" />
                      Preparar ahora mismo
                    </button>
                  </div>
                </div>

                {/* Selector de Método de Pago Neumórfico */}
                <div>
                  <label className="text-xs font-bold text-zinc-300 block mb-2">
                    Selecciona tu canal de pago:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("binance")}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === "binance"
                          ? "tactile-card-orange text-amber-300"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <Coins className="h-5 w-5 text-amber-400" />
                      <span>Binance</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("pagomovil")}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === "pagomovil"
                          ? "tactile-card-cyan text-cyan-300"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <CreditCard className="h-5 w-5 text-cyan-400" />
                      <span>Pago Móvil</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("zelle")}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === "zelle"
                          ? "tactile-card text-purple-300 border-purple-500/50"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <DollarSign className="h-5 w-5 text-purple-400" />
                      <span>Zelle</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("cash")}
                      className={`p-3 rounded-2xl text-xs font-bold text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        paymentMethod === "cash"
                          ? "tactile-card text-emerald-300 border-emerald-500/50"
                          : "tactile-inset text-zinc-400"
                      }`}
                    >
                      <Banknote className="h-5 w-5 text-emerald-400" />
                      <span>Efectivo</span>
                    </button>
                  </div>
                </div>

                {/* Caja de Datos Hundida */}
                <div className="p-4 rounded-2xl tactile-inset text-xs space-y-2">
                  {paymentMethod === "binance" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Binance Pay ID (0% comisión):</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(GYM_CONFIG.paymentMethods.binance.payId, "binance-id")}
                          className="text-amber-400 font-mono font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {GYM_CONFIG.paymentMethods.binance.payId}
                          {copiedKey === "binance-id" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Billetera USDT (TRC-20):</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(GYM_CONFIG.paymentMethods.binance.usdtTrc20, "usdt")}
                          className="text-amber-400 font-mono text-[10px] truncate max-w-[180px] flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {GYM_CONFIG.paymentMethods.binance.usdtTrc20}
                          {copiedKey === "usdt" ? <Check className="h-3 w-3 text-emerald-400 shrink-0" /> : <Copy className="h-3 w-3 shrink-0" />}
                        </button>
                      </div>
                      <span className="text-[10px] text-zinc-500 block pt-1 border-t border-white/5">
                        Titular: {GYM_CONFIG.paymentMethods.binance.holder}
                      </span>
                    </div>
                  )}

                  {paymentMethod === "pagomovil" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Banco:</span>
                        <span className="font-bold text-white">{GYM_CONFIG.paymentMethods.pagoMovil.bank}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Teléfono:</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(GYM_CONFIG.paymentMethods.pagoMovil.phone, "pm-tel")}
                          className="text-cyan-400 font-mono font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {GYM_CONFIG.paymentMethods.pagoMovil.phone}
                          {copiedKey === "pm-tel" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">RIF:</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(GYM_CONFIG.paymentMethods.pagoMovil.idDoc, "pm-rif")}
                          className="text-cyan-400 font-mono font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {GYM_CONFIG.paymentMethods.pagoMovil.idDoc}
                          {copiedKey === "pm-rif" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "zelle" && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Correo Zelle:</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(GYM_CONFIG.paymentMethods.zelle.email, "zelle-email")}
                          className="text-purple-400 font-mono font-bold flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          {GYM_CONFIG.paymentMethods.zelle.email}
                          {copiedKey === "zelle-email" ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 text-[11px]">Titular:</span>
                        <span className="font-bold text-white">{GYM_CONFIG.paymentMethods.zelle.holder}</span>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "cash" && (
                    <div className="space-y-1">
                      <span className="text-white font-bold block">{GYM_CONFIG.paymentMethods.cash.location}</span>
                      <p className="text-[11px] text-zinc-500">
                        Pagas en divisa o bolívares en efectivo al momento de retirar tu pedido en la barra.
                      </p>
                    </div>
                  )}
                </div>

                {paymentMethod !== "cash" && (
                  <div>
                    <label className="text-xs font-bold text-zinc-300 block mb-1">
                      Número de Referencia o Hash de Pago
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Últimos dígitos de la transacción"
                      className="w-full rounded-2xl tactile-inset p-3.5 text-xs text-white outline-none focus:border-[#FF5E1A]"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl tactile-btn-orange text-zinc-950 text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  Confirmar y Enviar Pedido
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <footer className="border-t border-white/5 py-6 px-6 text-center text-[11px] text-zinc-600">
        Pre-ordenes del Shake Bar sujetas a disponibilidad · {GYM_CONFIG.name}
      </footer>
    </div>
  );
}