export async function onRequestGet() {
  return Response.json({
    ok: true,
    app: "AI REVIEW STUDIO",
    version: "2",
    hosting: "Cloudflare Pages",
    message: "API พร้อมใช้งาน"
  }, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}