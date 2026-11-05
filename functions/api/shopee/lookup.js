const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ ok: false, code: "invalid_json", message: "กรุณาส่งข้อมูล JSON" }, 400); }
  const url = String(body?.url || "").trim();
  let parsed;
  try { parsed = new URL(url); } catch { return json({ ok: false, code: "invalid_url", message: "ลิงก์สินค้าไม่ถูกต้อง" }, 400); }
  if (!["shopee.co.th", "www.shopee.co.th", "s.shopee.co.th"].includes(parsed.hostname.toLowerCase())) {
    return json({ ok: false, code: "unsupported_host", message: "รองรับเฉพาะลิงก์ Shopee ประเทศไทย" }, 400);
  }
  if (!env.SHOPEE_PARTNER_ID || !env.SHOPEE_PARTNER_KEY) {
    return json({ ok: false, code: "shopee_api_not_configured", message: "ยังไม่ได้ตั้งค่า Shopee Affiliate Open API ที่ได้รับอนุญาต กรุณาตั้งค่า Partner ID และ Partner Key ใน Cloudflare Secrets" }, 503);
  }
  return json({ ok: false, code: "shopee_adapter_pending", message: "พบการตั้งค่า API แล้ว แต่ยังต้องเปิดใช้งาน adapter ตามเอกสารและสิทธิ์ของบัญชี Shopee ก่อน ระบบจะไม่ดึงข้อมูลด้วยวิธี scraping ที่อาจละเมิดเงื่อนไขบริการ" }, 501);
}
