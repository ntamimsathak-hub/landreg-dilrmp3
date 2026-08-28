# LandReg — DILRMP 3.0 🇮🇳
### AI-Powered Land Record Digitization, Multilingual Verification & Cadastral GIS Platform

**LandReg (DILRMP 3.0)** is an enterprise e-governance platform inspired by India's *Digital India Land Records Modernization Programme*.

---

## 🌟 Key Differentiators & Features

1. **AI Document Validation Layer (The Core Differentiator):**
   - **Pixel-Level Uncertainty Highlighting:** Directly surrounds ambiguous handwritten numbers/words on scanned deeds in color-coded bounding boxes.
   - **Alternative Readings:** Displays the AI's primary prediction and secondary possibilities (e.g. `'7'` vs `'1'`/`'9'`).
   - **Bidirectional Field Sync:** Synchronizes the scanned image highlights with editable form fields.
   - **Continuous Learning Loop:** Logs every human correction to train the OCR recognition models.

2. **Manigar (Village Land Revenue Surveyor & Land Scaling):**
   - Citizen portal to request an on-site **Manigar** allocation to scale, survey, and measure land parcel boundaries.
   - Department portal to assign certified revenue surveyors and certify land size accuracy against registered deeds.

3. **Multilingual Support (i18n):**
   - Fully translated across **English (EN)**, **Hindi (हिंदी)**, and **Tamil (தமிழ்)** with real-time switching.

4. **Cadastral GIS Mapping:**
   - Interactive 2D Cadastral blueprint revenue map overlaid with High-Resolution Satellite imagery.

5. **Citizen Services:**
   - Search legacy historical land records with side-by-side deed preview.
   - Dynamic **QR-certified Digital E-Patta / Chitta** certificate generation.
   - 5-stage validation status tracker and grievance redressal system.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Mapping & GIS:** Leaflet & SVG Cadastral Vector Engine
- **State Management:** React Context API
- **Internationalization:** Custom Multilingual i18n Engine (EN, HI, TA)
- **Accessibility:** WCAG AAA High-Contrast Mode & Text Scaler

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🏛️ Government Compliance & Architecture

- **Data Residency:** MeitY MeghRaj Sovereign Cloud / AWS Mumbai (ap-south-1)
- **Compliance:** DPDPA 2023 & ISO 27001
- **Database:** PostgreSQL + PostGIS with Read Replicas & PgBouncer
- **Storage:** S3 Immutable WORM Object Vault (600 DPI Scans)
