# AI REVIEW STUDIO V2 — Integration foundation

This branch adds a safe server-side integration foundation. It does **not** claim that Shopee, Meta, or video rendering is live until credentials, account permissions, Cloudflare bindings, and provider adapters have been configured and tested.

## Current endpoints

- `GET /api/integrations/status`: reports whether required Cloudflare secrets and bindings exist. It never returns secret values.
- Shopee product input in the app is manual: users paste their own Shopee/Affiliate URL and upload the product image. No automatic product lookup or image scraping is performed.
- `GET /api/video/providers`: lists provider configuration. Google Flow and Meta AI are external/manual destinations, not callable render APIs.
- `GET /api/facebook/status`: checks presence of server-side Page configuration; it does not claim that OAuth/token validation succeeded.
- `GET /api/dashboard/summary`: reads recent products and jobs after D1 is bound and the migration is applied.

## Cloudflare Pages setup

In the Pages project, add these bindings (production and preview as appropriate):

| Binding | Type | Purpose |
|---|---|---|
| `DB` | D1 database | Product/job/dashboard metadata |
| `MEDIA_BUCKET` | R2 bucket | Product images and rendered MP4 files |

Add encrypted Secrets only when you have credentials issued to your own accounts:

- `SHOPEE_PARTNER_ID`
- `SHOPEE_PARTNER_KEY`
- `META_PAGE_ID`
- `META_PAGE_ACCESS_TOKEN`
- `GEMINI_API_KEY` (optional)
- `OPENAI_API_KEY` (optional)

Do not commit credentials or paste them into source code. Redeploy after adding bindings/secrets.

Apply `migrations/0001_initial.sql` to the D1 database using the Cloudflare D1 console or Wrangler.

## Integration phases

1. **Shopee:** V2 currently uses a user-pasted product/Affiliate URL and a user-uploaded image. This avoids dependence on Shopee API access for the review workflow. Automatic product metadata/image retrieval is intentionally out of scope unless approved Affiliate Open API access and its exact specification become available.
2. **Video:** provider adapters must declare supported inputs, output format, pricing/quota, and async job polling. Flow and Meta AI are currently treated as external/manual tools. A genuine MP4 export needs a provider API or a server-side media renderer; it cannot be inferred from a prompt.
3. **Voice:** use a Thai-capable TTS provider, or browser speech synthesis for preview only. Store generated audio with the job.
4. **MP4:** compose two scene clips, Thai voice audio, and optional subtitles into 1080x1920 (or provider-supported 9:16) MP4. Confirm codec/duration limits with the selected renderer.
5. **Facebook:** create a Meta Developer App, request required permissions, obtain a Page Access Token for the Page, validate it server-side, then implement Reel upload/publish and scheduled publishing. Keep tokens in encrypted Cloudflare Secrets.
6. **Affiliate/cart:** store the approved Shopee affiliate tracking URL with each product/job. Native Facebook product tagging or cart features are separate Meta commerce capabilities and cannot be promised from an affiliate URL alone.
7. **Dashboard:** show explicit states such as draft, queued, rendering, ready, scheduled, published, failed. Never display a success state until the external provider confirms it.

## Deployment

The feature branch is `feature/v2-integrations-foundation`. Review it before merging to `main`. Cloudflare Pages production deployments normally follow the configured production branch; this branch does not change production by itself.
