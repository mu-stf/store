## Quick Project Summary

This is a small static sticker store that optionally integrates with Supabase (for auth, DB, Storage) and an example Stripe Checkout server for payments. Primary UI is served statically and written for RTL (Arabic). The static site is the primary runtime; server components are optional examples.

## Key components

- [cohee.html]: main storefront UI (lists products, cart UI).
- [product.html](product.html): product detail page (linked from `cohee.html`).
- [admin.html](admin.html): admin panel that uses Supabase to add/edit `stickers` (falls back to localStorage).
- [app.js](app.js): client logic — loads products, applies filters, manages cart and checkout flow. Look here for dataflow and localStorage keys.
- [supabase.js](supabase.js): sample client initializer — when populated it creates `window.supabase`. Must be loaded before `app.js` in HTML.
- [stripe-server/server.js](stripe-server/server.js): minimal Node/Express Stripe Checkout example; optional and requires `STRIPE_SECRET` env var.
- [styles.css](styles.css): RTL styling and layout conventions used across the UI.
- [README.md](README.md): contains dev run instructions and important notes (local server, stripe example usage).

## Important runtime patterns & conventions (do not change lightly)

- Supabase client presence is detected by `if (window.supabase)` in `app.js`. If absent the app falls back to localStorage. When editing, preserve this feature.
- LocalStorage keys used across the app:
  - `stickers_local` — fallback source of product data used when Supabase is not configured.
  - `cart_stickers` — current shopping cart contents.
  - `local_orders` — locally saved orders when no Supabase backend is available.
- Database table expectations (Supabase): `stickers` and `orders`.
  - `stickers` fields: `id`, `title`, `price`, `active`, `image_url`, `category` (see `README.md` for suggested schema).
  - `orders` stores `items` and `total` (see `app.js` insert logic).
- Image handling: `admin.html` will save to Supabase Storage when configured, otherwise images may be stored as data URLs in `stickers_local`.
- Currency & pricing: sample prices in `app.js` are integer values (e.g., `1500`) and displayed as `د.ع`. If integrating Stripe, convert amounts appropriately — the example `stripe-server` maps `price` directly; confirm currency units before charging.

## Developer workflows & run commands

- Local static preview (recommended): serve the repo root and open `cohee.html`:

```powershell
cd "c:\Users\mk2uu\OneDrive - AlShaab University\Desktop\edit2"
python -m http.server 8000
# open http://localhost:8000/cohee.html
```

- Stripe example server (optional):

```powershell
cd stripe-server
npm install
$env:STRIPE_SECRET = 'sk_test_your_secret_key'
node server.js
```

Note: `stripe-server` listens on port `4242` and exposes `POST /create-checkout-session`.

## Editing guidelines for AI agents

- Preserve the `supabase` presence check and local fallback logic in `app.js` when modifying data-loading code.
- When adding or changing DB fields, update both `supabase.js` usage and the localStorage fallback mappings in `app.js` (mapping logic at top of `loadProducts()`).
- Keep script order in HTML: include the `supabase-js` client + `supabase.js` (if used) before `app.js` so `window.supabase` is available.
- Avoid committing secrets. `supabase.js` intentionally warns when placeholders are present.

## Example code pointers

- To find product loading & fallback mapping, inspect `loadProducts()` in [app.js](app.js).
- To see how orders are saved to Supabase, see the `checkoutOrder()` function in [app.js](app.js).
- To run the Stripe integration reference, see [stripe-server/server.js](stripe-server/server.js) and the README snippet.

## What to ask the maintainer if unclear

- Do you want Stripe payments wired to the live store UI or kept as a separate reference server?
- Which Supabase project (URL/anon key) should be used for staging? If none, confirm local-only mode is acceptable.

---
If anything above is unclear or you want more examples (tests, CI steps, or a production deploy recipe), tell me which area to expand.


[def]: cohee.html