# FAR[M]ATE 2.1 - National Agro-Intelligence & Statutory Plant Protection Platform

FAR[M]ATE 2.1 is an AI-powered agrarian intelligence system designed for Indian farmers and agricultural extension officers. It integrates statutory CIBRC/FCO compliance, multi-factor counterfeit agrochemical detection, foliar disease diagnostics across 24 crops, knapsack sprayer tank dosage calculations, and 19-language real-time translation with cross-chat memory continuity.

---

## Key Features

- **Pest Doctor (Foliar Disease Diagnostic Engine)**:
  - Multi-crop visual disease identification across 24 major agricultural crops.
  - Grounded in ICAR-NBAIR, DPPQS, and CIBRC approved label claims.
  - Soil-type correlation (Black Cotton, Red Loam, Alluvial, Laterite, etc.) with Economic Threshold Level (ETL) action triggers.

- **Counterfeit Agrochemical Detector (VERIFY-X)**:
  - Forensic packaging analysis (3D kinetic diffractive hologram inspection, laser dot-matrix batch stamps, tamper-evident neck bands).
  - Statutory Section 9(3) CIBRC registration validation and FCO fertilizer compliance verification.

- **Verified Recommendation Engine & Multi-Tank Math**:
  - Calculates exact chemical, water, and acreage dilution rates for knapsack sprayers (5L, 10L, 12L, 15L, 16L, 20L, 200L).
  - Safety precautions, pre-harvest intervals (PHI), toxicity color triangles, and PPE instructions.

- **Cross-Chat Shared Agronomic Memory**:
  - Seamless memory transfer across all AI chat assistants: diagnoses made in the Pest Doctor automatically inform product recommendations and verification checks.

- **19-Language Dynamic Translation**:
  - Real-time localization across 19 languages (Hindi, Tamil, Telugu, Kannada, Bengali, Marathi, Gujarati, Punjabi, Malayalam, Odia, Spanish, French, etc.).
  - Automatic translation of historical chat messages and interactive quick-action buttons when switching languages.

- **Statutory Banned Agrochemicals Gazette Registry**:
  - Live gazette registry tracking banned and restricted pesticides under the Insecticides Act, 1968.

---

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide Icons, Vite
- **Backend**: Node.js, Express, tsx
- **AI & Vision**: Google Gemini API with Indic fallback translation engine
- **Voice & Acoustics**: Web Speech API with regional dialect guidance

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
   cd farmate-2.1
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Add your Gemini API key in `.env`:
     ```env
     GEMINI_API_KEY="your-gemini-api-key"
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

---

## License

MIT License. Designed for agricultural advancement and farmer protection.
