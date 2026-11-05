const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestGet({ env }) {
  return json({
    ok: true,
    providers: [
      { id: "gemini", label: "Google Gemini", configured: Boolean(env.GEMINI_API_KEY), mode: "prompt_and_script" },
      { id: "openai", label: "OpenAI", configured: Boolean(env.OPENAI_API_KEY), mode: "adapter_pending" },
      { id: "google-flow", label: "Google Flow", configured: false, mode: "external_manual" },
      { id: "meta-ai", label: "Meta AI", configured: false, mode: "external_manual" }
    ],
    render: { enabled: false, reason: "ต้องเชื่อมผู้ให้บริการสร้างวิดีโอที่มี API รองรับก่อน จึงจะเรนเดอร์ MP4 จริงได้" }
  });
}
