# CrownTime Supply — Watch Price Checker

A responsive, static landing page for regular, wholesale and installment watch price calculations.

## Run
Open `index.html` in a browser. For local development, run `python -m http.server 8000` inside this folder and visit `http://localhost:8000`.

## Deploy
Upload `index.html`, `styles.css`, `script.js`, and the `assets` directory together to GitHub Pages, Netlify, Cloudflare Pages or another static host. No backend is required.

## Calculation
- Base price = RM × exchange rate (default 32 BDT/RM).
- Tier selected from base BDT price. Regular: 10%, 8%, 7%, 6%, 5%; Installment: 18%, 14%, 11%, 9%, 8%; Wholesale: flat 6%.
- Handling based on rounded subtotal (base plus percentage): 500 / 1000 / 1500 / 2000 / 3500 / 5000 BDT.
- Installment: 30% of final total upfront, remaining 70% in three installments over 90 days.
- Handling is applied to all three modes, as agreed.
- All amounts are estimates, with whole-taka rounding.

## Customization
Edit `styles.css` for colors and layout; `assets/watch-hero.webp` for the watch image; `script.js` for pricing tiers and exchange defaults.

No payment processing, account creation, or customer data storage is included.
