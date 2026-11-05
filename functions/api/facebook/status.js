const json = (data, status = 200) => new Response(JSON.stringify(data, null, 2), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

export async function onRequestGet({ env }) {
  const configured = Boolean(env.META_PAGE_ID && env.META_PAGE_ACCESS_TOKEN);
  return json({
    ok: true,
    connected: false,
    configured,
    pageIdPresent: Boolean(env.META_PAGE_ID),
    tokenPresent: Boolean(env.META_PAGE_ACCESS_TOKEN),
    requiredPermissions: ["pages_show_list", "pages_read_engagement", "pages_manage_posts"],
    message: configured ? "ตั้งค่าข้อมูลลับแล้ว แต่ยังต้องตรวจสอบ token และสิทธิ์กับ Meta ก่อนเปิดเผยแพร่" : "เชื่อม Page ใน Facebook แล้ว แต่ต้องสร้าง Meta Developer App และตั้งค่า Page ID / Page Access Token ฝั่งเซิร์ฟเวอร์"
  });
}
