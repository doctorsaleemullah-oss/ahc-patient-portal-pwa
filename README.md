# Advanced Heart Center — Patient Portal & Doctor Broadcast PWA

A standalone, multi-user Progressive Web App (PWA) with 3D Claymorphism UI, PostgreSQL/Supabase database schema, and offline-first support designed to connect with `Advanced-heart-center-two.vercel.app`.

### Key Features
* **3D Claymorphism UI/UX**: Soft pill curvatures, inflated tactile button pods, and clean contrast designed for mobile and desktop screens.
* **Unified Database Layer (`src/lib/db.js` & `schema.sql`)**: Supabase/PostgreSQL schema ready to share live data across your clinic and patient apps.
* **Offline Fallback**: Runs smoothly on local storage even before cloud API keys are added.
* **Patient Modules**: Appointment tracking, customizable medicine schedules, reports vault, and SOS 12-lead ECG/vitals emergency transmission.

---

### Deployment on Vercel
* Framework: Vite
* Build command: `npm run build`
* Output directory: `dist`
