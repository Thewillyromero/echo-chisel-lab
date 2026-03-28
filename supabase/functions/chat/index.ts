import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Eres el asistente virtual de CALLA, una plataforma de IA conversacional para empresas. Tu nombre es ARIA.

CALLA ofrece:
- Atención telefónica automatizada con IA (inbound y outbound)
- Agendamiento automático de citas
- Campañas outbound para appointment setting y generación de leads
- Analítica en tiempo real de cada conversación
- Soporte post-llamada automatizado

Tienes 5 agentes IA: ARIA (llamadas entrantes), NOVA (campañas outbound), LUMI (agenda citas), BYTE (analítica) y CARE (soporte).

Responde siempre en español, de forma breve, amigable y profesional. Si el usuario pregunta algo que no sabes, invítale a contactar con el equipo. Máximo 3 frases por respuesta.

IMPORTANTE: Cuando detectes que el usuario muestra interés en los servicios (pregunta por precios, quiere una demo, quiere empezar, pregunta cómo contratar, etc.), incluye al final de tu respuesta la etiqueta [CAPTURE_EMAIL] para activar el formulario de captura. Solo inclúyela una vez por conversación.`;

function getSupabase() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { action } = body;

    // Route actions
    if (action === "create_conversation") {
      return await handleCreateConversation(body);
    }
    if (action === "save_message") {
      return await handleSaveMessage(body);
    }
    if (action === "capture_email") {
      return await handleCaptureEmail(body);
    }
    if (action === "load_conversation") {
      return await handleLoadConversation(body);
    }

    // Default: chat streaming
    return await handleChat(body);
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Error desconocido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleCreateConversation(body: any) {
  const sessionId = typeof body.session_id === "string" ? body.session_id.trim().slice(0, 100) : "";
  if (!sessionId) {
    return new Response(JSON.stringify({ error: "session_id required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getSupabase();

  // Check if conversation already exists for this session
  const { data: existing } = await supabase
    .from("chat_conversations")
    .select("id")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (existing) {
    return new Response(JSON.stringify({ conversation_id: existing.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("chat_conversations")
    .insert({ session_id: sessionId })
    .select("id")
    .single();

  if (error) {
    console.error("Create conversation error:", error);
    return new Response(JSON.stringify({ error: "Error creating conversation" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ conversation_id: data.id }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleSaveMessage(body: any) {
  const conversationId = typeof body.conversation_id === "string" ? body.conversation_id : "";
  const role = body.role === "user" || body.role === "assistant" ? body.role : "";
  const content = typeof body.content === "string" ? body.content.trim().slice(0, 5000) : "";

  if (!conversationId || !role || !content) {
    return new Response(JSON.stringify({ error: "Missing fields" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getSupabase();
  const { error } = await supabase
    .from("chat_messages")
    .insert({ conversation_id: conversationId, role, content });

  if (error) {
    console.error("Save message error:", error);
    return new Response(JSON.stringify({ error: "Error saving message" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Update conversation timestamp
  await supabase
    .from("chat_conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleCaptureEmail(body: any) {
  const conversationId = typeof body.conversation_id === "string" ? body.conversation_id : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 255) : "";
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!conversationId || !email || !emailRegex.test(email)) {
    return new Response(JSON.stringify({ error: "Email inválido" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getSupabase();

  // Update conversation with email
  const { error: convError } = await supabase
    .from("chat_conversations")
    .update({ visitor_email: email, visitor_name: name || null })
    .eq("id", conversationId);

  if (convError) console.error("Update conversation error:", convError);

  // Also save as a contact lead
  const { error: leadError } = await supabase
    .from("contact_leads")
    .insert({
      name: name || "Visitante chatbot",
      email,
      source: "chatbot",
    });

  if (leadError) console.error("Insert lead error:", leadError);

  return new Response(JSON.stringify({ success: true }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleLoadConversation(body: any) {
  const sessionId = typeof body.session_id === "string" ? body.session_id.trim() : "";
  if (!sessionId) {
    return new Response(JSON.stringify({ error: "session_id required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabase = getSupabase();

  const { data: conversation } = await supabase
    .from("chat_conversations")
    .select("id, visitor_email")
    .eq("session_id", sessionId)
    .maybeSingle();

  if (!conversation) {
    return new Response(JSON.stringify({ conversation_id: null, messages: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const { data: messages } = await supabase
    .from("chat_messages")
    .select("role, content, created_at")
    .eq("conversation_id", conversation.id)
    .order("created_at", { ascending: true })
    .limit(100);

  return new Response(JSON.stringify({
    conversation_id: conversation.id,
    visitor_email: conversation.visitor_email,
    messages: messages || [],
  }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleChat(body: any) {
  const { messages, conversation_id } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "Messages required" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY is not configured");
  }

  // Load conversation history from DB for memory
  let contextMessages = messages;
  if (conversation_id) {
    const supabase = getSupabase();
    const { data: dbMessages } = await supabase
      .from("chat_messages")
      .select("role, content")
      .eq("conversation_id", conversation_id)
      .order("created_at", { ascending: true })
      .limit(50);

    if (dbMessages && dbMessages.length > 0) {
      // Use DB history as context, append the latest user message
      const lastUserMsg = messages[messages.length - 1];
      contextMessages = [...dbMessages, lastUserMsg];
    }
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...contextMessages.slice(-30),
      ],
      stream: true,
    }),
  });

  if (!response.ok) {
    if (response.status === 429) {
      return new Response(JSON.stringify({ error: "Demasiadas solicitudes. Inténtalo en unos segundos." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (response.status === 402) {
      return new Response(JSON.stringify({ error: "Servicio temporalmente no disponible." }), {
        status: 402,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const t = await response.text();
    console.error("AI gateway error:", response.status, t);
    return new Response(JSON.stringify({ error: "Error del servicio de IA" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(response.body, {
    headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
  });
}
