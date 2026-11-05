const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestGet({ env }) {
  const has = (key) => typeof env[key] === "string" && env[key].length > 0;
  return json({
    ok: true,
    app: "AI REVIEW STUDIO",
    version: "2",
    integrations: {
      shopee: { configured: has("SHOPEE_PARTNER_ID") && has("SHOPEE_PARTNER_KEY"), status: "credentials_required" },
      facebook: { configured: has("META_PAGE_ID") && has("META_PAGE_ACCESS_TOKEN"), status: "credentials_required" },
      storage: { configured: Boolean(env.MEDIA_BUCKET), status: env.MEDIA_BUCKET ? "ready" : "binding_required" },
      database: { configured: Boolean(env.DB), status: env.DB ? "ready" : "binding_required" },
      video: {
        providers: {
          gemini: has("GEMINI_API_KEY"),
          googleFlow: false,
          metaAI: false,
          openai: has("OPENAI_API_KEY")
        },
        status: "provider_selection_required"
      }
    },
    note: "สถานะนี้ตรวจเฉพาะการตั้งค่า ไม่ได้ยืนยันการเชื่อมต่อหรือการเผยแพร่จริง"
  });
}
