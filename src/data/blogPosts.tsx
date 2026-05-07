import { ReactNode } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  categoryColor: string;
  keywords: string[];
  content: ReactNode;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "coste-llamadas-perdidas",
    title: "El coste real de las llamadas perdidas: por qué tu negocio pierde dinero cada día",
    excerpt: "El 85% de los clientes que no logran comunicarse por teléfono nunca vuelven a llamar. Descubre cuánto dinero pierdes realmente y cómo solucionarlo.",
    date: "27 abril 2026",
    readTime: "5 min",
    category: "Negocio",
    categoryColor: "brand-amber",
    keywords: ["llamadas perdidas", "coste llamadas perdidas", "perder clientes teléfono"],
    content: (
      <>
        <p>
          Cada vez que suena el teléfono en tu negocio y nadie contesta, estás perdiendo mucho más que una simple llamada. Según un estudio de <strong>Forbes</strong>, el <strong>85% de los clientes que no logran comunicarse por teléfono con una empresa nunca vuelven a intentarlo</strong>. Se van directamente a la competencia.
        </p>

        <h2>El problema silencioso que afecta a miles de negocios</h2>
        <p>
          La mayoría de los negocios no son conscientes de cuántas llamadas pierden al día. Mientras atiendes a un cliente en persona, mientras almuerzas, o simplemente fuera de horario, el teléfono sigue sonando. Y cada llamada sin respuesta es una oportunidad de venta que desaparece.
        </p>
        <p>
          Las cifras son contundentes: un negocio medio pierde entre <strong>5 y 15 llamadas al día</strong>. Si cada llamada tiene un valor medio de 50-200 euros en facturación potencial, estamos hablando de entre <strong>250 y 3.000 euros que se esfuman diariamente</strong>.
        </p>

        <h2>El coste oculto va más allá de la venta directa</h2>
        <p>
          Perder llamadas no solo significa perder ventas inmediatas. El impacto se multiplica cuando consideramos:
        </p>
        <ul>
          <li><strong>Reputación dañada:</strong> Un cliente que no puede contactarte asume que no eres profesional o que no te importa su consulta.</li>
          <li><strong>Reseñas negativas:</strong> La frustración de no ser atendido se convierte en valoraciones de 1 estrella en Google.</li>
          <li><strong>Pérdida del valor de vida del cliente:</strong> No pierdes una venta, pierdes todas las compras futuras de ese cliente y sus referidos.</li>
          <li><strong>Dinero en marketing desperdiciado:</strong> Si inviertes en publicidad para que llamen a tu negocio y luego no contestas, estás tirando ese dinero a la basura.</li>
        </ul>

        <h2>Por qué contratar más personal no es la solución</h2>
        <p>
          La primera reacción suele ser: "Necesito contratar a alguien para el teléfono." Pero un recepcionista a tiempo completo cuesta entre <strong>1.500 y 2.000 euros al mes</strong>, solo trabaja 8 horas al día, necesita vacaciones, se pone enfermo y no puede atender múltiples llamadas simultáneas.
        </p>

        <h2>La solución: asistentes de voz con inteligencia artificial</h2>
        <p>
          La tecnología ha avanzado hasta un punto donde un <strong>asistente de voz con IA</strong> puede atender llamadas de forma natural, resolver dudas frecuentes, agendar citas y transferir llamadas importantes, todo ello <strong>24 horas al día, 7 días a la semana</strong>, sin descanso.
        </p>
        <p>
          A diferencia de un buzón de voz o un IVR tradicional ("pulse 1 para ventas, pulse 2 para..."), un asistente IA mantiene una conversación real. El cliente ni siquiera nota que habla con una máquina.
        </p>

        <h2>Deja de perder dinero hoy</h2>
        <p>
          En <strong>CALLA</strong> ayudamos a negocios como el tuyo a no perder ni una sola llamada. Nuestros empleados IA contestan el teléfono, agendan citas y cualifican leads automáticamente. Sin permanencia, sin inversión inicial elevada y con resultados desde el primer día.
        </p>
        <p>
          <strong>¿Quieres saber cuánto dinero estás perdiendo en llamadas sin contestar?</strong> Reserva una consulta gratuita y te lo calculamos en 10 minutos.
        </p>
      </>
    ),
  },
  {
    slug: "asistentes-voz-ia",
    title: "Asistentes de voz con IA: qué son, cómo funcionan y por qué están revolucionando la atención al cliente",
    excerpt: "La inteligencia artificial ya puede mantener conversaciones telefónicas naturales. Descubre cómo funciona esta tecnología y por qué las empresas la están adoptando masivamente.",
    date: "25 abril 2026",
    readTime: "6 min",
    category: "Tecnología",
    categoryColor: "brand-teal",
    keywords: ["asistente voz IA", "inteligencia artificial llamadas", "atención telefónica IA"],
    content: (
      <>
        <p>
          Imagina llamar a una clínica y que te atienda una voz amable que resuelve tu duda, consulta la agenda en tiempo real y te da cita para mañana. Todo en menos de dos minutos. Sin esperas, sin "su llamada es importante para nosotros", sin pulsar teclas. Eso es exactamente lo que hace un <strong>asistente de voz con inteligencia artificial</strong>.
        </p>

        <h2>¿Qué es un asistente de voz con IA?</h2>
        <p>
          Un asistente de voz con IA es un software que utiliza <strong>inteligencia artificial avanzada</strong> para mantener conversaciones telefónicas naturales con personas reales. No es un buzón de voz ni un menú de opciones. Es un agente virtual capaz de entender lo que el interlocutor dice, interpretar su intención y responder de forma coherente y útil.
        </p>

        <h2>¿Cómo funciona por dentro?</h2>
        <p>
          La magia ocurre gracias a la combinación de tres tecnologías clave:
        </p>
        <ul>
          <li><strong>STT (Speech-to-Text):</strong> Convierte la voz del interlocutor en texto escrito en tiempo real. Es el "oído" del asistente.</li>
          <li><strong>NLP/LLM (Procesamiento de Lenguaje Natural):</strong> El "cerebro" del sistema. Un modelo de lenguaje avanzado analiza el texto, entiende la intención y genera la respuesta más adecuada según el contexto del negocio.</li>
          <li><strong>TTS (Text-to-Speech):</strong> Convierte la respuesta generada en voz natural. Las voces actuales son prácticamente indistinguibles de una persona real.</li>
        </ul>
        <p>
          Todo esto ocurre en <strong>milisegundos</strong>. El resultado es una conversación fluida donde el interlocutor siente que habla con un humano.
        </p>

        <h2>¿Qué puede hacer un asistente de voz IA?</h2>
        <p>
          Las capacidades van mucho más allá de responder preguntas básicas:
        </p>
        <ul>
          <li><strong>Atender llamadas entrantes</strong> 24/7 sin tiempo de espera.</li>
          <li><strong>Agendar, modificar y cancelar citas</strong> conectándose al calendario del negocio.</li>
          <li><strong>Cualificar leads:</strong> hacer preguntas clave para determinar si el cliente potencial es adecuado antes de pasarlo al equipo comercial.</li>
          <li><strong>Realizar llamadas salientes:</strong> confirmar citas, hacer seguimiento post-venta o recuperar leads fríos.</li>
          <li><strong>Transferir llamadas</strong> a un humano cuando la situación lo requiere.</li>
          <li><strong>Integrarse con CRMs</strong> y herramientas de gestión para actualizar datos automáticamente.</li>
        </ul>

        <h2>¿Por qué las empresas están adoptando esta tecnología?</h2>
        <p>
          Los motivos son claros: <strong>reducción de costes</strong> (hasta un 80% respecto a personal telefónico), <strong>disponibilidad total</strong> (noches, fines de semana, festivos), <strong>escalabilidad infinita</strong> (puede atender 100 llamadas simultáneas) y <strong>consistencia</strong> (siempre sigue el protocolo, nunca tiene un mal día).
        </p>

        <h2>El futuro ya está aquí</h2>
        <p>
          En <strong>CALLA</strong> diseñamos e implementamos asistentes de voz con IA personalizados para cada negocio. Nuestros agentes hablan como tú quieres, siguen tus protocolos y se integran con tus herramientas. Y lo mejor: están listos en menos de 48 horas.
        </p>
        <p>
          <strong>¿Quieres ver cómo suena un asistente IA atendiendo llamadas de tu sector?</strong> Reserva una demo gratuita y te lo mostramos en directo.
        </p>
      </>
    ),
  },
  {
    slug: "clinica-dental-200-llamadas",
    title: "Cómo una clínica dental automatizó 200 llamadas al día sin contratar personal",
    excerpt: "Esta clínica dental recibía más de 200 llamadas diarias y perdía el 40%. Con un asistente de voz IA, redujo las llamadas perdidas a cero y aumentó sus citas un 35%.",
    date: "22 abril 2026",
    readTime: "5 min",
    category: "Casos de éxito",
    categoryColor: "brand-emerald",
    keywords: ["automatizar llamadas clínica", "IA para clínicas", "recepcionista virtual"],
    content: (
      <>
        <p>
          Una clínica dental con tres sedes en España se enfrentaba a un problema que muchos negocios del sector salud conocen bien: <strong>demasiadas llamadas y poco personal para atenderlas</strong>. Con más de 200 llamadas entrantes al día entre las tres sedes, su equipo de recepción estaba desbordado.
        </p>

        <h2>El problema: 40% de llamadas sin contestar</h2>
        <p>
          Antes de implementar la solución, la clínica realizó una auditoría de sus comunicaciones. Los resultados fueron alarmantes:
        </p>
        <ul>
          <li><strong>200+ llamadas diarias</strong> entre las tres sedes.</li>
          <li><strong>El 40% quedaban sin contestar</strong>, especialmente en las horas punta (9:00-11:00 y 16:00-18:00).</li>
          <li><strong>Tiempo medio de espera:</strong> 3 minutos y 20 segundos.</li>
          <li><strong>Motivo principal de las llamadas:</strong> agendar, cambiar o cancelar citas (72%).</li>
          <li><strong>Coste de personal telefónico:</strong> 4 recepcionistas dedicadas, más de 7.000 euros/mes solo en salarios.</li>
        </ul>
        <p>
          Cada llamada perdida representaba una cita no agendada, un paciente frustrado y un ingreso que se iba a otra clínica.
        </p>

        <h2>La solución: un empleado IA de CALLA</h2>
        <p>
          La clínica implementó un <strong>asistente de voz con IA de CALLA</strong> configurado específicamente para el sector dental. El agente fue entrenado para:
        </p>
        <ul>
          <li>Atender llamadas en español de forma natural y empática.</li>
          <li>Consultar disponibilidad en tiempo real en su software de gestión.</li>
          <li>Agendar primeras visitas, revisiones y urgencias.</li>
          <li>Modificar y cancelar citas existentes.</li>
          <li>Responder preguntas frecuentes sobre tratamientos, precios orientativos y ubicación.</li>
          <li>Transferir a recepción solo los casos que realmente necesitaban intervención humana.</li>
        </ul>

        <h2>Los resultados: transformación en 30 días</h2>
        <p>
          Tras un mes de funcionamiento, los números hablaban por sí solos:
        </p>
        <ul>
          <li><strong>Llamadas perdidas: de 80/día a prácticamente 0.</strong></li>
          <li><strong>Citas agendadas por IA: 68% del total</strong> (las recepcionistas solo gestionaban el 32% restante).</li>
          <li><strong>Incremento en citas totales: +35%</strong> al capturar pacientes que antes colgaban.</li>
          <li><strong>Tiempo medio de atención: 47 segundos</strong> (vs. 3:20 anteriores).</li>
          <li><strong>Ahorro mensual: 4.200 euros</strong> al reasignar a dos recepcionistas a tareas de mayor valor.</li>
          <li><strong>Satisfacción de pacientes: 4.8/5</strong> en encuesta post-llamada.</li>
        </ul>

        <h2>Lo que más sorprendió al equipo</h2>
        <p>
          La directora de la clínica reconoció que lo que más le sorprendió fue la <strong>naturalidad de las conversaciones</strong>. "Muchos pacientes ni siquiera saben que han hablado con una IA. Nos llaman para felicitarnos por lo amable que fue la chica del teléfono", comentó.
        </p>
        <p>
          Otro factor clave fue la <strong>atención fuera de horario</strong>. El 23% de las citas ahora se agendan entre las 20:00 y las 8:00, un tramo horario que antes estaba completamente desatendido.
        </p>

        <h2>¿Tu clínica tiene el mismo problema?</h2>
        <p>
          Si tu clínica, consultorio o centro médico pierde llamadas o tiene tiempos de espera altos, <strong>CALLA</strong> puede ayudarte a resolver el problema en menos de una semana. Nuestros agentes IA se adaptan a tu especialidad, tu software de gestión y tu forma de trabajar.
        </p>
        <p>
          <strong>¿Quieres ver resultados como estos en tu clínica?</strong> Reserva una consulta gratuita y te diseñamos una solución a medida.
        </p>
      </>
    ),
  },
];
