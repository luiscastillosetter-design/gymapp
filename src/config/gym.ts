// src/config/gym.ts
// Configuración Central Marca Blanca - APEX HUB (Clonable para cualquier gimnasio)

export const GYM_CONFIG = {
  name: "APEX HUB",
  tagline: "Performance & Functional Center",
  shortDesc: "Mega centro de entrenamiento multizona: Galpón de Musculación de alto nivel, Box Funcional (CrossFit, Pilates, Circuitos) y Shake Bar saludable.",
  city: "Barquisimeto, Estado Lara",
  address: "Zona Industrial / Galpón Central, Barquisimeto",
  phone: "+58 412-0000000",
  whatsapp: "584120000000",
  social: {
    instagram: "https://instagram.com/apexhubgym",
  },
  currency: {
    symbol: "$",
    secondarySymbol: "Bs",
    exchangeRate: 36.5, // Tasa referencial configurable
  },

  // Cuentas de Pago Habilitadas (Configuración Central)
  paymentMethods: {
    pagoMovil: {
      bank: "Banco Provincial (0108)",
      phone: "0412-0000000",
      idDoc: "J-50123456-0",
      holder: "APEX HUB C.A.",
    },
    zelle: {
      email: "pagos@apexhubgym.com",
      holder: "APEX Hub Global LLC",
    },
    binance: {
      payId: "892019482",
      usdtTrc20: "TX9xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      holder: "APEX_HUB_OFFICIAL",
    },
    cash: {
      location: "Recepcion / Caja del Galpon (Pagar al retirar)",
    },
  },

  // Zonas del Mega Galpón
  zones: [
    {
      id: "iron-zone",
      name: "Zona Hierro",
      subtitle: "Musculación & Biomecánica",
      desc: "Área de peso libre, mancuernas hasta 60kg, máquinas de palanca convergente, poleas y zona de powerlifting.",
      badge: "Acceso Libre",
      features: [
        "Línea completa de máquinas guiadas y peso libre",
        "Área de cardio con caminadoras y escaladoras",
        "Pistas de trineo y zona de estiramiento",
        "Acceso desde las 5:30 AM hasta las 10:00 PM",
      ],
      color: "from-orange-500/20 to-transparent",
      accent: "#FF5E1A",
    },
    {
      id: "functional-box",
      name: "Box Funcional",
      subtitle: "CrossFit, Pilates & Circuitos",
      desc: "Galpón adaptado con jaulas profesionales, barras olímpicas, remadoras, assault bikes y reformer para pilates.",
      badge: "Clases Guiadas",
      features: [
        "WODs diarios dirigidos por coaches certificados",
        "Sesiones de Pilates y movilidad articular",
        "Circuitos HIIT para quema de grasa y resistencia",
        "Cupos limitados por hora para máxima atención",
      ],
      color: "from-cyan-500/20 to-transparent",
      accent: "#00E5FF",
    },
  ],

  // Catálogo de Membresías y Pases
  plans: [
    {
      id: "day-pass-single",
      name: "Day Pass Simple",
      category: "Pase Diario",
      price: 5,
      period: "por día",
      popular: false,
      desc: "Entrena un día completo en el área de tu preferencia.",
      features: [
        "Acceso a Zona Hierro O a 1 clase de CrossFit/Pilates",
        "Uso de duchas y lockers",
        "Sin matrícula de inscripción",
      ],
      cta: "Comprar Pase",
    },
    {
      id: "day-pass-total",
      name: "Day Pass Total",
      category: "Pase Diario Dual",
      price: 8,
      period: "por día",
      popular: false,
      desc: "Acceso libre a ambas zonas durante toda la jornada.",
      features: [
        "Musculación libre todo el día",
        "Participación en 1 clase del Box Funcional",
        "1 Bebida hidratante en el Shake Bar",
        "Uso completo de instalaciones",
      ],
      cta: "Comprar Pase Dual",
    },
    {
      id: "iron-monthly",
      name: "Membresía Hierro",
      category: "Plan Mensual",
      price: 35,
      period: "mes",
      popular: false,
      desc: "Para los apasionados de las pesas y el fisicoculturismo.",
      features: [
        "Acceso ilimitado a la Zona Hierro (Musculación)",
        "Entrada libre en todo el horario operativo",
        "Pase QR digital en la app",
        "Evaluación física inicial",
      ],
      cta: "Elegir Hierro",
    },
    {
      id: "all-access-black",
      name: "All-Access Black",
      category: "Membresía Total (Ambas Zonas)",
      price: 55,
      period: "mes",
      popular: true,
      desc: "El pase definitivo: entrena fuerza, asiste a CrossFit y Pilates sin restricciones.",
      features: [
        "Acceso ilimitado a Zona Hierro (Musculación)",
        "Reservas ilimitadas de clases (CrossFit, Pilates, HIIT)",
        "Pase QR prioritario en recepción",
        "10% de descuento continuo en el Shake Bar & Tienda",
        "Invita a un amigo 1 vez al mes",
      ],
      cta: "Obtener All-Access",
    },
  ],

  // Catálogo del Shake Bar & Pro-Shop
  products: [
    {
      id: "prod-1",
      name: "Batido Whey Isolate Gold",
      category: "shakebar",
      badge: "Más Vendido",
      desc: "25g de proteína isolatada, leche de almendras, cambur y crema de maní.",
      price: 4.5,
      image: "🥤",
    },
    {
      id: "prod-2",
      name: "Pre-Entreno Nitro Volcano",
      category: "shakebar",
      badge: "Energía Pura",
      desc: "Cafeína anhidra, beta-alanina, citrulina malato y electrolitos.",
      price: 3.0,
      image: "⚡",
    },
    {
      id: "prod-3",
      name: "Bowl Proteico Açaí & Creatina",
      category: "shakebar",
      badge: "Post-WOD",
      desc: "Açaí orgánico, 5g monohidrato de creatina Creapure, fresas y granola.",
      price: 5.5,
      image: "🍓",
    },
    {
      id: "prod-4",
      name: "Faja Lumbar Cuero Genuino 10mm",
      category: "proshop",
      badge: "Powerlifting",
      desc: "Soporte rígido para sentadillas y peso muerto con hebilla de acero inoxidable.",
      price: 28.0,
      image: "🏋️",
    },
    {
      id: "prod-5",
      name: "Calleras de Carbono 3 Hoyos",
      category: "proshop",
      badge: "CrossFit Box",
      desc: "Protección antideslizante para barras olímpicas, anillas y pull-ups.",
      price: 18.0,
      image: "🧤",
    },
    {
      id: "prod-6",
      name: "Toalla Deportiva Microfibra APEX",
      category: "proshop",
      badge: "Esencial",
      desc: "Secado ultra rápido, antimicrobial, 40x80cm con clip para colgar.",
      price: 8.0,
      image: "🧴",
    },
  ],
};