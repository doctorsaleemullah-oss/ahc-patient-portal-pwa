# Advanced Heart Center — Patient Portal & Doctor Broadcast PWA

A standalone, multi-user Patient Progressive Web App (PWA) designed to pair with **`Advanced-heart-center-two.vercel.app`** without modifying or mixing with the existing clinic repository.

### Key Modules Included
1. **3D Claymorphism UI/UX (`src/index.css` & `src/App.jsx`)**:
   - Spacious, high-contrast, tactile 3D Claymorphic buttons and cards designed for effortless use on Android, Apple iPhone/iPad, and Desktop/Laptop PCs.
   - 1-Tap Multilingual switcher (**English / اردو / پښتو**).
2. **Unique Patient Login & Self-Registration**:
   - Patients can register with their **Phone Number** or log in using their **Clinic MR# (`AHC-2026-0842`) + 4-Digit PIN**.
3. **Customizable Medicine Alarms**:
   - Editable clock times for Morning, Afternoon, and Night cardiac medications with bilingual instructions and adherence tracking.
4. **Disease & Functional Capacity Rehab Protocol**:
   - Tailored to each patient's **Echo LVEF%**, **NYHA Class**, and **ETT METs capacity**, complete with a guided walking timer and a 1.5L/2.0L fluid ceiling tracker.
5. **SOS Emergency Vitals & 12-Lead ECG AI Triage**:
   - Evaluates ECG rhythms (**Acute Anterior STEMI**, **Fast AFib**, **Normal Sinus Rhythm**) alongside live Blood Pressure (with automatic nitrate safety check if Systolic BP < 100 mmHg) and provides 1-tap escalation to the Clinic Cath Lab, On-Call Cardiologist WhatsApp, and Family Attendant.
6. **Doctor Admin Broadcast Studio**:
   - Publish clinic announcements, YouTube educational videos, and preventive cardiology writings live to patient phones.
7. **Full PWA Install Support (`public/manifest.json` & `public/sw.js`)**:
   - Ready for 1-tap installation on Android, iOS Safari ("Add to Home Screen"), and Desktop Chrome/Edge.

---

### How to Deploy Live on Vercel in 1 Minute
1. Open [https://vercel.com/new](https://vercel.com/new)
2. Select **`doctorsaleemullah-oss/ahc-patient-portal-pwa`**
3. Framework Preset: **Vite** (detected automatically)
4. Click **Deploy**.
