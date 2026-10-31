# Project Guidelines: Dubai Local Repair Services

This directory (`c:\Users\PMLS\Downloads\repair`) is dedicated to building and maintaining high-converting local home and appliance repair websites targeting **Dubai, United Arab Emirates (UAE)**.

All agents operating in this workspace must strictly adhere to the following directives:

---

## 1. Local Service Mindset (POV: NOT an Agency)
- The audience consists of residential tenants, villa owners, and property managers in Dubai in urgent need of repair.
- Do **not** create Web3/AI SaaS agency structures (no portfolio case studies, no 3D Three.js canvas blobs, no dark obsidian/cyberpunk purple `#150a35` themes, no $1,000/mo subscription cards).
- Maintain an emergency, high-trust, fast-dispatch service orientation ("Technician at your door in 30 minutes").

---

## 2. Mandatory 6 Core Services
Every website in this workspace must feature these 6 core appliance repair services:
1. **Washing Machine Repair & Servicing** (Drainage issues, drum noise, spin failure, PCB)
2. **Refrigerator & Freezer Repair** (Compressor cooling, gas recharge, thermostat, defrost)
3. **Dishwasher Repair & Descaling** (Drainage pumps, heating element, leakage)
4. **AC Repair & Deep Maintenance** (Split/Central AC chemical coil wash, gas top-up, compressor — critical in Dubai)
5. **Cooking Range, Stove & Oven Repair** (Gas ignition, safety thermocouple, bake element)
6. **Clothes Dryer Repair** (Heating elements, drive belt, moisture sensor, vent cleaning)

---

## 3. Contact & Phone Integration (Hywiz)
- Official Contact Number: **`+92 314 3110259`**
- All phone links must be clickable: `<a href="tel:+923143110259">`
- All WhatsApp buttons must have prefilled message parameters:  
  `<a href="https://wa.me/923143110259?text=Hello%2C%20I%20need%20urgent%20appliance%20repair%20in%20Dubai">`
- Always provide:
  1. Sticky top emergency phone bar
  2. Hero quick-booking WhatsApp trigger
  3. Floating bottom-corner WhatsApp widget and sticky mobile emergency bar

---

## 4. Dubai, UAE Local Geotargeting
- Highlight major Dubai residential hubs:
  *Dubai Marina, Downtown Dubai, Palm Jumeirah, JLT, Al Barsha, JVC, Business Bay, Arabian Ranches, Dubai Hills, Deira, Mirdif.*
- All pricing must be displayed in **AED (UAE Dirham)** with transparent upfront quotes.
- Emphasize local trust signals: "Licensed UAE Technicians", "30–45 Min Doorstep Arrival", "90-Day Warranty on Genuine Parts", "No Fix, No Fee".

---

## 5. Visual Aesthetics & Design Uniqueness
- Choose any fresh, high-contrast, professional palette:
  - **Trust Blue & Rapid Amber**: `#1e40af` / `#0284c7` + `#ea580c` / `#f97316` (Crisp white backgrounds)
  - **Modern UAE Emerald & Coral**: `#0f766e` + `#f43f5e`
  - **Royal Navy & Safety Gold**: `#0a192f` + `#eab308`
- The design must be completely unique and not replicate previous agency projects.

---

## 6. Directory & Asset Standards
Never place loose media files in the root folder. Follow this strict hierarchy:
```text
repair/
├── index.html
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── images/
│       ├── hero/
│       ├── services/
│       ├── brands/
│       └── icons/
└── GEMINI.md
```

---

## 7. Universal Pre-Footer CTA Card Consistency
- The standalone elevated Red CTA card (`.cta-ref-card` / `.about-cta-section` featuring *"Need Your Appliance Fixed Today? Prompt Same-Day Doorstep Service"*) must be placed directly before `<footer class="site-footer-ref">` on **all pages** (`index.html`, `about.html`, `services.html`, `portfolio.html`, `blog.html`).
- **STRICT EXCEPTION**: **Never add this CTA card to `contact.html`** (contact page already serves as the direct contact interface, so adding it creates redundant clutter).

