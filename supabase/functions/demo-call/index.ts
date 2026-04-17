import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;

/** Hash a string with SHA-256 and return hex digest (truncated to 24 chars). */
async function hashIdentifier(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  const buf = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hex.slice(0, 24);
}

/** Extract the best-effort client IP from request headers. */
function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();

    // --- Validation ---
    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const phone = typeof body.phone === "string" ? body.phone.trim().slice(0, 30) : "";

    if (!name || name.length < 2) {
      return new Response(JSON.stringify({ error: "El nombre es obligatorio (mín. 2 caracteres)." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isWebCall = phone === "web-call";

    if (!isWebCall && (!phone || !PHONE_RE.test(phone))) {
      return new Response(JSON.stringify({ error: "Número de teléfono inválido." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // --- Rate limiting ---
    // For web calls (no real phone), rate-limit by a per-user fingerprint
    // (hashed IP + user-agent) stored in the `phone` column to avoid the
    // global "web-call" bucket that previously grouped all anonymous users.
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    let rateLimitKey: string;
    let storedPhone: string;

    if (isWebCall) {
      const ip = getClientIp(req);
      const ua = req.headers.get("user-agent") || "unknown";
      const fingerprint = await hashIdentifier(`${ip}|${ua}`);
      rateLimitKey = `web-call:${fingerprint}`;
      storedPhone = rateLimitKey;
    } else {
      rateLimitKey = phone;
      storedPhone = phone;
    }

    const { count } = await supabase
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("phone", rateLimitKey)
      .eq("source", "demo-call")
      .gte("created_at", oneHourAgo);

    if (count !== null && count >= 3) {
      return new Response(
        JSON.stringify({ error: "Has solicitado demasiadas demos. Inténtalo más tarde." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // --- Insert as lead ---
    const { error } = await supabase.from("contact_leads").insert({
      name,
      phone: storedPhone,
      email: `demo-${Date.now()}@placeholder.local`,
      source: "demo-call",
      message: isWebCall
        ? `Demo web call solicitada por ${name} (fingerprint: ${storedPhone})`
        : `Demo call solicitada por ${name} al número ${phone}`,
    });

    if (error) {
      console.error("Insert error:", error);
      return new Response(JSON.stringify({ error: "Error al procesar la solicitud." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, name, phone: storedPhone }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: "Error inesperado." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
