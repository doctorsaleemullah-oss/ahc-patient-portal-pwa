# Advanced Heart Center — Patient Portal & Doctor Broadcast PWA

A standalone, multi-language (**English / اردو / پښتو**), **3D Claymorphic Patient Portal Progressive Web App (PWA)** designed for **Dr. Saleem Ullah** (Consultant Interventional Cardiologist, MBBS, FCPS Cardiology, Fellowship in Interventional Cardiology — NICVD Karachi) and synced with **`Advanced-heart-center-two.vercel.app`**.

## Key Modules
1. **Spacious 3D Claymorphism UI/UX**: Large, colorful, high-contrast tactile buttons and cards built for elderly and common patients across **Android, iPhone/iPad (iOS), and Desktop/Laptop PCs**.
2. **One-Click App Installation (`Install App`)**: Native `beforeinstallprompt` trigger for Android & Desktop Chrome/Edge + guided Safari "Add to Home Screen" modal for iPhone/iPad.
3. **Patient Self-Registration & Unique Login**: Log in via **Mobile Phone Number** or **Clinic MR#** (`AHC-2026-0842`, `AHC-2026-1109`, `AHC-2026-1420`) or register a new patient account directly on the phone.
4. **Doctor Admin Broadcast Studio**: Password/PIN-protected Admin mode (`PIN: 7860`) allowing the cardiologist to post live clinic announcements, YouTube/educational video lectures, and multilingual health articles that instantly appear on patients' phones.
5. **Customizable Medicine Alarms & Daily Checklist**: Interactive `<input type="time">` dose timing customization, phone alarm toggles, and bilingual Urdu/Pashto/English instructions.
6. **Disease & Functional-Capacity Specific Exercise & Diet Protocol**: Tailored to each patient's **Echo LVEF%**, **NYHA Class**, and **ETT METs** with a live walking rehab timer and 1.5L Heart Failure fluid tracker.
7. **SOS Emergency Vitals & 12-Lead ECG AI Triage**: Upload a 12-lead ECG photo or run clinical ECG strip simulations (**Acute Anterior STEMI**, **AFib with RVR**, **Normal Sinus Rhythm**) with BP-safe sublingual GTN/Aspirin instructions and 1-tap dispatch to the **Advanced Heart Center Cath Lab**, **On-Call Cardiologist WhatsApp**, and **Family Attendant**.

## Deploy Live to Vercel
1. Open [Vercel Dashboard](https://vercel.com/new)
2. Import this repository: `doctorsaleemullah-oss/ahc-patient-portal-pwa`
3. Click **Deploy** (Vite preset is automatically detected).
