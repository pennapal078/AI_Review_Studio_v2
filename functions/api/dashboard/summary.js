const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestGet({ env }) {
  if (!env.DB) return json({ ok: false, code: "database_not_configured", message: "Dashboard จะเริ่มเก็บสถานะงานได้หลังผูก Cloudflare D1 กับ Binding ชื่อ DB", jobs: [], products: [] }, 503);
  try {
    const jobs = await env.DB.prepare("SELECT id, product_title, status, provider, scheduled_at, post_url, affiliate_url, created_at FROM jobs ORDER BY created_at DESC LIMIT 50").all();
    const products = await env.DB.prepare("SELECT id, title, product_url, image_url, affiliate_url, created_at FROM products ORDER BY created_at DESC LIMIT 50").all();
    return json({ ok: true, jobs: jobs.results || [], products: products.results || [] });
  } catch (error) {
    return json({ ok: false, code: "database_schema_missing", message: "ยังไม่ได้ติดตั้ง migrations/0001_initial.sql", jobs: [], products: [] }, 503);
  }
}
