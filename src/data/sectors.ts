import { Heart, Scale, Building, ShieldCheck, GraduationCap, Wrench, Landmark, Car, Utensils, Home } from "lucide-react";

export type Sector = {
  slug: string;
  name: string;
  icon: typeof Heart;
  tagline: string;
  description: string;
  heroTitle: string;
  heroHighlight: string;
  painPoints: string[];
  solutions: string[];
  stats: { value: string; label: string }[];
  cta: string;
};

export const sectors: Sector[] = [
  {
    slug: "salud",
    name: "Salud",
    icon: Heart,
    tagline: "Marketing médico que genera pacientes reales",
    description: "Estrategias de captación de pacientes para clínicas dentales, médicas, de fisioterapia y centros de rehabilitación.",
    heroTitle: "Más pacientes para tu",
    heroHighlight: "clínica de salud",
    painPoints: [
      "Dificultad para llenar la agenda con pacientes de alto valor",
      "Competencia agresiva de grandes cadenas",
      "Dependencia de boca a boca sin control",
      "Campañas anteriores sin ROI medible",
    ],
    solutions: [
      "Sistema de captación de pacientes con IA y automatización",
      "Campañas segmentadas por tratamiento y zona geográfica",
      "Funnel de pre-calificación para filtrar pacientes de alto valor",
      "Dashboard de métricas en tiempo real con coste por paciente",
    ],
    stats: [
      { value: "200+", label: "leads/mes para clínicas dentales" },
      { value: "$6", label: "coste por lead cualificado" },
      { value: "3x", label: "más citas que métodos tradicionales" },
    ],
    cta: "Quiero más pacientes",
  },
  {
    slug: "legal",
    name: "Legal",
    icon: Scale,
    tagline: "Casos cualificados para tu bufete",
    description: "Generación de leads para bufetes de abogados especializados en lesiones, inmigración, derecho familiar y más.",
    heroTitle: "Más casos para tu",
    heroHighlight: "bufete de abogados",
    painPoints: [
      "Leads de baja calidad que no se convierten en casos",
      "Coste por caso demasiado elevado",
      "Falta de diferenciación frente a otros bufetes",
      "Dependencia de directorios y referidos",
    ],
    solutions: [
      "Campañas de intent-based targeting para captar personas con necesidad legal real",
      "Pre-calificación automática de casos antes de la consulta",
      "Posicionamiento de marca como autoridad en tu especialidad",
      "Sistema de seguimiento y nurturing automatizado",
    ],
    stats: [
      { value: "45%", label: "reducción en coste por caso" },
      { value: "80+", label: "casos/mes generados" },
      { value: "5x", label: "ROI en los primeros 90 días" },
    ],
    cta: "Quiero más casos",
  },
  {
    slug: "inmobiliaria",
    name: "Inmobiliaria",
    icon: Building,
    tagline: "Compradores y vendedores cualificados",
    description: "Captación de propietarios vendedores y compradores cualificados para agencias inmobiliarias y promotoras.",
    heroTitle: "Más operaciones para tu",
    heroHighlight: "inmobiliaria",
    painPoints: [
      "Leads que solo quieren información pero no compran",
      "Dificultad para captar propietarios vendedores",
      "Ciclos de venta largos sin seguimiento efectivo",
      "Portales inmobiliarios cada vez más caros",
    ],
    solutions: [
      "Campañas de captación de propietarios con targeting por zona y tipo de propiedad",
      "Funnel de compradores con pre-calificación financiera",
      "Automatización de seguimiento durante todo el ciclo de compra",
      "Estrategias de retargeting para mantener el interés",
    ],
    stats: [
      { value: "$18K", label: "en ventas el primer mes" },
      { value: "$0.93", label: "coste por lead" },
      { value: "300+", label: "leads cualificados/mes" },
    ],
    cta: "Quiero más operaciones",
  },
  {
    slug: "seguros",
    name: "Seguros",
    icon: ShieldCheck,
    tagline: "Pólizas vendidas con sistema automatizado",
    description: "Generación de leads para agentes de seguros de vida, salud, auto y hogar con sistemas de citas automatizados.",
    heroTitle: "Más pólizas para tu",
    heroHighlight: "agencia de seguros",
    painPoints: [
      "Leads fríos que nunca contestan el teléfono",
      "Competencia de comparadores online",
      "Dificultad para escalar sin contratar más agentes",
      "Falta de sistema predecible de generación de citas",
    ],
    solutions: [
      "Sistema de appointment setting automatizado con confirmación",
      "Campañas segmentadas por tipo de seguro y perfil demográfico",
      "Chatbot de pre-calificación que filtra antes de la cita",
      "Retargeting inteligente para leads que no convirtieron",
    ],
    stats: [
      { value: "$26", label: "coste por cita agendada" },
      { value: "60%", label: "tasa de asistencia a citas" },
      { value: "4x", label: "más citas que cold calling" },
    ],
    cta: "Quiero más citas",
  },
  {
    slug: "educacion",
    name: "Educación",
    icon: GraduationCap,
    tagline: "Matrículas y alumnos con sistema probado",
    description: "Captación de alumnos para centros educativos, academias, tutorías y formación online.",
    heroTitle: "Más alumnos para tu",
    heroHighlight: "centro educativo",
    painPoints: [
      "Estacionalidad en la captación de alumnos",
      "Padres que comparan pero no se matriculan",
      "Coste por matrícula demasiado alto",
      "Falta de presencia digital efectiva",
    ],
    solutions: [
      "Campañas de captación durante todo el año con picos en temporada alta",
      "Funnel de decisión para padres con contenido de valor",
      "Sistema de seguimiento automatizado hasta la matrícula",
      "Estrategia de testimonios y prueba social",
    ],
    stats: [
      { value: "$5K", label: "en ventas la primera semana" },
      { value: "$30", label: "coste por lead cualificado" },
      { value: "25%", label: "tasa de conversión a matrícula" },
    ],
    cta: "Quiero más alumnos",
  },
  {
    slug: "servicios",
    name: "Servicios",
    icon: Wrench,
    tagline: "Presupuestos y clientes sin parar",
    description: "Generación de leads para fontaneros, electricistas, HVAC, limpieza y servicios del hogar.",
    heroTitle: "Más clientes para tu",
    heroHighlight: "empresa de servicios",
    painPoints: [
      "Dependencia de Yelp, Google Maps y boca a boca",
      "Leads que piden presupuesto pero nunca contratan",
      "Imposibilidad de predecir el volumen de trabajo",
      "Competencia de precios con empresas más baratas",
    ],
    solutions: [
      "Posicionamiento como servicio premium con enfoque en confianza",
      "Campañas geo-targeting por zona de servicio",
      "Sistema de presupuestos automatizado con seguimiento",
      "Reputación online gestionada para generar confianza",
    ],
    stats: [
      { value: "$7.2K", label: "en ventas en 14 días" },
      { value: "$6", label: "coste por lead" },
      { value: "$26", label: "coste por cita agendada" },
    ],
    cta: "Quiero más clientes",
  },
  {
    slug: "finanzas",
    name: "Finanzas",
    icon: Landmark,
    tagline: "Inversores y clientes financieros cualificados",
    description: "Captación de inversores acreditados, clientes de préstamos y servicios financieros con compliance integrado.",
    heroTitle: "Más clientes para tu",
    heroHighlight: "empresa financiera",
    painPoints: [
      "Regulaciones estrictas que limitan la publicidad",
      "Leads no cualificados que no pasan compliance",
      "Coste de adquisición de cliente muy elevado",
      "Dificultad para generar confianza online",
    ],
    solutions: [
      "Campañas compliant con pre-calificación regulatoria",
      "Targeting de inversores acreditados y perfiles financieros",
      "Estrategia de pre-framing y retargeting para generar confianza",
      "Funnel de educación financiera como puerta de entrada",
    ],
    stats: [
      { value: "$400K", label: "en capital captado" },
      { value: "<$15", label: "coste por lead de inversor" },
      { value: "$300K+", label: "en ingresos generados" },
    ],
    cta: "Quiero más inversores",
  },
  {
    slug: "automocion",
    name: "Automoción",
    icon: Car,
    tagline: "Test drives y ventas para tu concesionario",
    description: "Generación de tráfico cualificado para concesionarios, talleres y servicios de automoción.",
    heroTitle: "Más ventas para tu",
    heroHighlight: "concesionario",
    painPoints: [
      "Tráfico al showroom cada vez menor",
      "Compradores que investigan online pero compran en otro sitio",
      "Campañas de marca que no generan ventas directas",
      "Competencia de plataformas de venta online",
    ],
    solutions: [
      "Campañas de generación de test drives con cita previa",
      "Retargeting dinámico con el inventario actualizado",
      "Sistema de seguimiento post-visita automatizado",
      "Estrategia de trade-in para captar coches usados",
    ],
    stats: [
      { value: "40+", label: "test drives/mes generados" },
      { value: "22%", label: "tasa de cierre en test drives" },
      { value: "3x", label: "ROI vs publicidad tradicional" },
    ],
    cta: "Quiero más test drives",
  },
];
