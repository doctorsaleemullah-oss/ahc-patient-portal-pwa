import React, { useState, useEffect } from 'react';
import {
  Heart, Activity, Pill, Calendar, ShieldAlert, FileText, Video,
  Bell, Clock, CheckCircle2, PhoneCall, Upload, UserCheck, Plus,
  Play, Pause, RotateCcw, Sparkles, Lock, LogOut, Smartphone,
  Apple, Monitor, Download, Megaphone, Send, MessageSquare, MapPin
} from 'lucide-react';

const INITIAL_PATIENTS = [
  {
    id: 'AHC-2026-0842',
    phone: '03459876543',
    pin: '0842',
    name: 'Haji Muhammad Yousaf',
    age: 62,
    gender: 'Male',
    location: 'Saidu Sharif, Swat',
    diagnosis: 'Post-PCI (LAD DES Stent) • Ischemic Heart Disease',
    ef: 45,
    nyha: 'Class II',
    mets: 6.5,
    maxSafeHR: 112,
    fluidLimitMl: 2000,
    tokenNumber: 14,
    currentServingToken: 11,
    clinicBranch: 'Advanced Heart Center (Mon–Sat) — Saidu Sharif',
    vitals: { bpSys: 128, bpDia: 78, hr: 68, spo2: 97, sugar: 136, weight: 74 },
    echoSummary: 'Mildly reduced LV systolic function (LVEF 45%). Mild anterior hypokinesia. Grade I diastolic dysfunction. No pericardial effusion.',
    ettSummary: 'Achieved 6.5 METs (Bruce Protocol Stage 2). Negative for inducible angina at target submaximal workload.',
    cathSummary: 'Successful PCI to mid-LAD with 3.0 x 28mm Drug-Eluting Stent (DES). TIMI-3 flow achieved.',
    meds: [
      { id: 'm1', name: 'Tab. Loprin (Aspirin) 75mg', time: '08:30', period: 'Morning', ur: 'ناشتے کے بعد — خون پتلا کرنے والی دوا', ps: 'له سهارنۍ وروسته — د وینې نري کولو دوا', taken: true, alarm: true },
      { id: 'm2', name: 'Tab. Brilinta (Ticagrelor) 90mg', time: '09:00', period: 'Morning & Night', ur: 'صبح اور رات — سٹنٹ کی حفاظت کے لیے لازمی', ps: 'سهار او شپه — د سټینټ ساتنې لپاره لازمي', taken: true, alarm: true },
      { id: 'm3', name: 'Tab. Concor (Bisoprolol) 5mg', time: '08:30', period: 'Morning', ur: 'دل کی دھڑکن اور بلڈ پریشر کنٹرول کرنے کے لیے', ps: 'د زړه ضربان او فشار کنټرول لپاره', taken: false, alarm: true },
      { id: 'm4', name: 'Tab. Rovista (Rosuvastatin) 20mg', time: '21:30', period: 'Night', ur: 'رات سونے سے پہلے — کولیسٹرول کم کرنے کے لیے', ps: 'د شپې له ویده کیدو مخکې — د کولیسټرول لپاره', taken: false, alarm: true },
    ],
    rehabProtocol: {
      walkMinutes: 30,
      pace: 'Brisk flat walk (Borg Scale 11–12 / Light-Moderate)',
      precautions: 'Warm up 5 mins. Do not lift heavy weights (>10 kg). Keep Angised (GTN) tablet in pocket.',
      dietRules: [
        'Low salt (< 3g/day) — avoid pickles, salted kehwa/tea, and bakery items',
        'Use olive or canola oil (< 2 tablespoons/day); avoid banaspati ghee',
        'Daily walk 30 mins on flat surface after morning or evening meal'
      ]
    }
  },
  {
    id: 'AHC-2026-1109',
    phone: '03001122334',
    pin: '1109',
    name: 'Bibi Halima',
    age: 56,
    gender: 'Female',
    location: 'Khwaza Khela, Swat',
    diagnosis: 'HFrEF (Heart Failure with Reduced EF 30%) • GDMT',
    ef: 30,
    nyha: 'Class III',
    mets: 3.8,
    maxSafeHR: 98,
    fluidLimitMl: 1500,
    tokenNumber: 7,
    currentServingToken: 5,
    clinicBranch: 'Sunday Outreach Clinic — Khwaza Khela Medical Center',
    vitals: { bpSys: 112, bpDia: 70, hr: 72, spo2: 95, sugar: 118, weight: 66 },
    echoSummary: 'Severely reduced LV systolic function (LVEF 30%). Global hypokinesia. Mild-to-moderate functional MR.',
    ettSummary: 'Functional capacity 3.8 METs (6-Minute Walk Test distance 290m).',
    cathSummary: 'Non-obstructive coronary arteries; dilated cardiomyopathy managed on 4-pillar GDMT.',
    meds: [
      { id: 'm201', name: 'Tab. Uperio (Sacubitril/Valsartan) 50mg', time: '08:30', period: 'Twice Daily', ur: 'صبح اور شام — دل کی طاقت بڑھانے کے لیے', ps: 'سهار او ماښام — د زړه د پمپ طاقت لپاره', taken: true, alarm: true },
      { id: 'm202', name: 'Tab. Dapagliflozin (Forxiga) 10mg', time: '09:00', period: 'Morning', ur: 'روزانہ صبح ایک گولی', ps: 'هره ورځ سهار یوه ګولۍ', taken: true, alarm: true },
      { id: 'm203', name: 'Tab. Lasix (Furosemide) 40mg', time: '08:00', period: 'Morning', ur: 'پھیپھڑوں اور پاؤں کی سوجن کم کرنے والی دوا', ps: 'د پښو او سږو پړسوب کمولو دوا', taken: false, alarm: true },
      { id: 'm204', name: 'Tab. Aldactone (Spironolactone) 25mg', time: '14:00', period: 'Afternoon', ur: 'دوپہر کے کھانے کے بعد', ps: 'له غرمې ډوډۍ وروسته', taken: false, alarm: true }
    ],
    rehabProtocol: {
      walkMinutes: 15,
      pace: 'Gentle interval walk (5 min walk + 2 min rest x 3)',
      precautions: 'Strict 1.5 Liter daily total fluid limit. Weigh yourself every morning before breakfast; alert clinic if weight rises by > 2 kg in 3 days.',
      dietRules: [
        'Strict fluid restriction: Maximum 6 glasses (1500 ml) of water/tea/soup combined per 24 hours',
        'Zero added table salt; check ankle swelling every evening',
        'Elevate legs on a pillow while sitting'
      ]
    }
  }
];

const INITIAL_BROADCASTS = [
  {
    id: 'b1',
    type: 'announcement',
    title: 'Sunday Outreach Cardiac Clinic — Khwaza Khela Medical Center',
    titleUr: 'اتوار آؤٹ ریچ کارڈیک کلینک — خوازہ خیلہ میڈیکل سینٹر',
    body: 'Dr. Saleem Ullah will be available every Sunday at Dr. Abdul Basir Hospital (Gaimon Road, Khwaza Khela) for Consultations, Echo & ECG. Online booking is open.',
    date: 'Pinned Clinic Update',
    videoUrl: ''
  },
  {
    id: 'b2',
    type: 'video',
    title: 'Post-Angioplasty (Stent) Care: Why Dual Blood Thinners Must Never Be Stopped',
    titleUr: 'انجیو پلاسٹی (سٹنٹ) کے بعد خون پتلا کرنے والی ادویات کی اہمیت',
    body: 'Learn why Aspirin and Ticagrelor/Clopidogrel protect your coronary stent from sudden clot formation and how to manage diet and walking after PCI.',
    date: 'Educational Lecture • 6 min watch',
    videoUrl: 'https://www.youtube.com'
  },
  {
    id: 'b3',
    type: 'article',
    title: 'Winter Blood Pressure Surge & Heart Attack Prevention in Swat',
    titleUr: 'سردیوں میں بلڈ پریشر اور دل کے دورے سے بچاؤ کی احتیاطی تدابیر',
    body: 'Cold weather constricts blood vessels and raises blood pressure. Take morning medications on time, dress warmly during Fajr walks, and avoid excess salt in winter soups.',
    date: 'Preventive Cardiology Guide',
    videoUrl: ''
  }
];

const ECG_PRESETS = {
  stemi: {
    label: 'Acute Anterior STEMI (ST-Elevation in V1–V4)',
    urgency: 'CRITICAL EMERGENCY — CODE STEMI',
    color: 'crimson',
    hr: 108,
    summaryEn: 'AI ECG & Vitals Triage detects significant ST-Segment Elevation in Anterior Precordial Leads (V1–V4) with reciprocal changes. High probability of acute LAD coronary occlusion / stent thrombosis.',
    summaryUr: 'ای سی جی میں دل کی شریان بند ہونے (STEMI) کی ہنگامی علامات ہیں! بالکل نہ چلیں، فوراً بیٹھ جائیں اور ہسپتال پہنچیں۔',
    summaryPs: 'په اي سي جي کې د زړه د رګ بندیدو خطرناک نښې دي! حرکت مه کوئ او سمدستي کلینیک او ایمرجنسي ته خبر ورکړئ۔'
  },
  afib: {
    label: 'Atrial Fibrillation with Rapid Ventricular Response (HR 138 bpm)',
    urgency: 'URGENT CARDIAC REVIEW REQUIRED',
    color: 'amber',
    hr: 138,
    summaryEn: 'Irregularly irregular narrow-complex tachycardia (HR ~138 bpm) with absent P-waves consistent with fast Atrial Fibrillation. Requires prompt rate control and clinical evaluation.',
    summaryUr: 'دل کی دھڑکن بے ترتیب اور تیز ہے (Atrial Fibrillation)۔ آرام سے بیٹھیں اور کلینک سے فوری رابطہ کریں۔',
    summaryPs: 'د زړه ضربان ګړندی او غیر منظم دی. آرام وکړئ او له ډاکټر سره اړیکه ونیسئ.'
  },
  normal: {
    label: 'Normal Sinus Rhythm (No Acute Ischemic ST-T Changes)',
    urgency: 'STABLE RHYTHM — CONTINUE MONITOR',
    color: 'emerald',
    hr: 72,
    summaryEn: 'Regular Sinus Rhythm at 72 bpm. Normal PR and QRS intervals without acute ST-segment elevation or depression.',
    summaryUr: 'ای سی جی نارمل ہے اور کوئی ہنگامی تبدیلی نظر نہیں آ رہی۔ اپنی ادویات وقت پر جاری رکھیں۔',
    summaryPs: 'ستاسو اي سي جي نورمال ده. خپل درمل پر خپل وخت وخورئ.'
  }
};

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' | 'ur' | 'ps'
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'meds' | 'rehab' | 'sos' | 'records' | 'admin'
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('ahc_patients_v2');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });
  const [currentPatientId, setCurrentPatientId] = useState('AHC-2026-0842');
  const [broadcasts, setBroadcasts] = useState(() => {
    const saved = localStorage.getItem('ahc_broadcasts_v2');
    return saved ? JSON.parse(saved) : INITIAL_BROADCASTS;
  });

  // Modals
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPin, setLoginPin] = useState('');
  const [regForm, setRegForm] = useState({ name: '', phone: '', age: '', location: 'Saidu Sharif, Swat', pin: '' });
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  // Rehab Timer & Fluid State
  const [walkSeconds, setWalkSeconds] = useState(0);
  const [walkRunning, setWalkRunning] = useState(false);
  const [fluidConsumedMl, setFluidConsumedMl] = useState(900);
  const [newLifestyleRule, setNewLifestyleRule] = useState('');

  // SOS ECG & Vitals State
  const [selectedEcgKey, setSelectedEcgKey] = useState('stemi');
  const [sosBpSys, setSosBpSys] = useState(134);
  const [sosBpDia, setSosBpDia] = useState(84);
  const [sosSymptoms, setSosSymptoms] = useState(['Central Chest Pressure / Heaviness', 'Sweating (Diaphoresis)']);
  const [sosSentBanner, setSosSentBanner] = useState('');

  // Doctor Broadcast Studio State
  const [newPost, setNewPost] = useState({ type: 'announcement', title: '', titleUr: '', body: '', videoUrl: '' });

  // AI Chat State
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiMessages, setAiMessages] = useState([
    {
      sender: 'ai',
      text: 'Assalam-o-Alaikum! I am your Advanced Heart Center AI Assistant synced with Dr. Saleem Ullah’s clinic. Ask me about your medicines, diet, safe walking, or symptoms in English, Urdu, or Pashto.'
    }
  ]);

  const patient = patients.find((p) => p.id === currentPatientId) || patients[0];

  useEffect(() => {
    localStorage.setItem('ahc_patients_v2', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('ahc_broadcasts_v2', JSON.stringify(broadcasts));
  }, [broadcasts]);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  useEffect(() => {
    if (!walkRunning) return;
    const interval = setInterval(() => setWalkSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [walkRunning]);

  const toggleMedicationTaken = (medId) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, meds: p.meds.map((m) => (m.id === medId ? { ...m, taken: !m.taken } : m)) }
          : p
      )
    );
  };

  const updateMedicationTime = (medId, newTime) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, meds: p.meds.map((m) => (m.id === medId ? { ...m, time: newTime } : m)) }
          : p
      )
    );
  };

  const handlePatientRegister = (e) => {
    e.preventDefault();
    if (!regForm.name || !regForm.phone) return;
    const newMr = `AHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const created = {
      ...INITIAL_PATIENTS[0],
      id: newMr,
      name: regForm.name,
      phone: regForm.phone,
      age: Number(regForm.age) || 50,
      location: regForm.location || 'Swat',
      pin: regForm.pin || '1234',
      tokenNumber: 19,
    };
    setPatients((prev) => [created, ...prev]);
    setCurrentPatientId(created.id);
    setShowAuthModal(false);
  };

  const handlePatientLogin = (e) => {
    e.preventDefault();
    const found = patients.find(
      (p) =>
        p.id.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
        p.phone === loginIdentifier.trim()
    );
    if (found) {
      setCurrentPatientId(found.id);
      setShowAuthModal(false);
    }
  };

  const handlePublishBroadcast = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.body) return;
    setBroadcasts((prev) => [
      {
        id: `b-${Date.now()}`,
        ...newPost,
        date: 'Just Published • Live on Patient Phones'
      },
      ...prev
    ]);
    setNewPost({ type: 'announcement', title: '', titleUr: '', body: '', videoUrl: '' });
  };

  const handleAiSend = (e) => {
    e.preventDefault();
    if (!aiQuestion.trim()) return;
    const q = aiQuestion.trim();
    const lower = q.toLowerCase();
    let reply =
      `For ${patient.name} (${patient.diagnosis}, LVEF ${patient.ef}%): Keep taking your prescribed medications on schedule, maintain low-salt intake, and stay within your safe target heart rate of ${patient.maxSafeHR} bpm during walks.`;

    if (lower.includes('pain') || lower.includes('chest') || lower.includes('sweat') || lower.includes('درد')) {
      reply =
        '⚠️ EMERGENCY RED FLAG: Acute chest pain or sweating requires immediate evaluation. Please open the red "SOS ECG AI" tab immediately, rest completely, and alert Advanced Heart Center or visit the nearest Emergency Room.';
    } else if (lower.includes('water') || lower.includes('fluid') || lower.includes('پانی') || lower.includes('سوجن')) {
      reply = `Your personalized daily fluid limit is ${patient.fluidLimitMl} ml (${Math.round(patient.fluidLimitMl / 250)} glasses/day total including water, tea, and soup) based on your LVEF of ${patient.ef}%. Weigh yourself every morning.`;
    } else if (lower.includes('walk') || lower.includes('exercise') || lower.includes('واک') || lower.includes('ورزش')) {
      reply = `Your safe functional capacity is ${patient.mets} METs. Walk for ${patient.rehabProtocol.walkMinutes} minutes at a ${patient.rehabProtocol.pace}, keeping your pulse below ${patient.maxSafeHR} bpm.`;
    }

    setAiMessages((prev) => [...prev, { sender: 'user', text: q }, { sender: 'ai', text: reply }]);
    setAiQuestion('');
  };

  const activeEcg = ECG_PRESETS[selectedEcgKey];
  const takenCount = patient.meds.filter((m) => m.taken).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071124] via-[#0B1B36] to-[#061224] text-white pb-28">
      {/* Top Clinical Header */}
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-[#08152C]/90 border-b border-white/10 px-4 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl clay-btn-gold flex items-center justify-center">
              <Heart className="w-6 h-6 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white">
                  ADVANCED HEART CENTER
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <Sparkles className="w-3 h-3" /> Synced with Clinic PWA
                </span>
              </div>
              <p className="text-xs text-amber-300/90 font-medium">
                Dr. Saleem Ullah • Consultant Interventional Cardiologist (Saidu Sharif & Khwaza Khela)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Language Pills */}
            <div className="flex bg-slate-900/90 p-1 rounded-2xl border border-white/15">
              {[
                { id: 'en', label: 'EN' },
                { id: 'ur', label: 'اردو' },
                { id: 'ps', label: 'پښتو' }
              ].map((l) => (
                <button
                  key={l.id}
                  onClick={() => setLang(l.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                    lang === l.id ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Patient Switcher */}
            <select
              value={currentPatientId}
              onChange={(e) => setCurrentPatientId(e.target.value)}
              className="bg-slate-900/90 text-xs sm:text-sm font-semibold text-amber-200 border border-amber-400/40 rounded-2xl px-3 py-2 focus:outline-none"
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — EF {p.ef}%
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowAuthModal(true)}
              className="clay-btn-blue px-3.5 py-2 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> Login / Register
            </button>

            <button
              onClick={() => setShowInstallModal(true)}
              className="clay-btn-emerald px-3.5 py-2 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Install App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Navigation + Patient Summary Card (Desktop 3 cols) */}
        <aside className="lg:col-span-3 space-y-5">
          <div className="clay-surface p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                MR# {patient.id}
              </span>
              <span className="text-xs font-bold text-emerald-300">NYHA {patient.nyha}</span>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">{patient.name}</h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {patient.age} yrs • {patient.gender} • {patient.location}
              </p>
            </div>
            <p className="text-xs bg-slate-900/75 p-3 rounded-2xl text-amber-200 border border-white/10 leading-relaxed">
              {patient.diagnosis}
            </p>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-white/10">
                <div className="text-xs text-slate-400">Echo LVEF</div>
                <div className="text-2xl font-black text-emerald-400">{patient.ef}%</div>
              </div>
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-white/10">
                <div className="text-xs text-slate-400">ETT Capacity</div>
                <div className="text-2xl font-black text-amber-400">{patient.mets} METs</div>
              </div>
            </div>
          </div>

          {/* Claymorphic Navigation Menu */}
          <nav className="hidden lg:flex flex-col gap-3">
            {[
              { id: 'home', label: 'Home & Live Queue', icon: Heart, badge: `Token #${patient.tokenNumber}` },
              { id: 'meds', label: 'Meds & Alarm Clock', icon: Pill, badge: `${takenCount}/${patient.meds.length}` },
              { id: 'rehab', label: 'Exercise & Diet Protocol', icon: Activity, badge: `${patient.mets} METs` },
              { id: 'sos', label: 'SOS ECG & Vitals AI', icon: ShieldAlert, badge: '24/7 Urgent' },
              { id: 'records', label: 'Reports & AI Doctor Chat', icon: FileText, badge: 'Echo/Cath' },
              { id: 'admin', label: 'Doctor Broadcast Studio', icon: Megaphone, badge: 'Admin' }
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl font-bold text-sm transition ${
                    item.id === 'sos'
                      ? 'clay-btn-crimson text-white'
                      : active
                      ? 'clay-btn-gold text-slate-950'
                      : 'clay-surface text-slate-200 hover:border-amber-400/40'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </span>
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-black/25 text-white">
                    {item.badge}
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Right Main Dynamic Workspace (9 cols) */}
        <section className="lg:col-span-9 space-y-6">
          {/* TAB 1: HOME, LIVE QUEUE & DOCTOR BROADCAST FEED */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Prominent 3D Clay Quick-Action Tiles for Common People */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab('meds')}
                  className="clay-btn-emerald p-5 text-left flex flex-col justify-between min-h-[120px] transition transform hover:-translate-y-0.5"
                >
                  <Pill className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xs font-semibold text-emerald-100">گولیاں اور ٹائم</div>
                    <div className="text-base font-extrabold text-white">Medicine Alarms</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('rehab')}
                  className="clay-btn-blue p-5 text-left flex flex-col justify-between min-h-[120px] transition transform hover:-translate-y-0.5"
                >
                  <Activity className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xs font-semibold text-blue-100">روزانہ ورزش اور پرہیز</div>
                    <div className="text-base font-extrabold text-white">Exercise & Diet</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('sos')}
                  className="clay-btn-crimson p-5 text-left flex flex-col justify-between min-h-[120px] transition transform hover:-translate-y-0.5"
                >
                  <ShieldAlert className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-xs font-semibold text-red-100">ہنگامی ای سی جی اور رابطہ</div>
                    <div className="text-base font-extrabold text-white">SOS ECG & Vitals</div>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('records')}
                  className="clay-btn-gold p-5 text-left flex flex-col justify-between min-h-[120px] transition transform hover:-translate-y-0.5"
                >
                  <FileText className="w-8 h-8 text-slate-950" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">ایکو، ای ٹی ٹی اور رپورٹس</div>
                    <div className="text-base font-extrabold text-slate-950">My Cardiac Reports</div>
                  </div>
                </button>
              </div>

              {/* Live Clinic Queue & Vitals Strip */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="clay-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" /> Live Reception Token Queue
                    </span>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                      Online Sync Active
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-200">{patient.clinicBranch}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-400/30 text-center">
                      <div className="text-xs text-slate-400">Your Token Number</div>
                      <div className="text-3xl font-black text-amber-400 mt-1">#{patient.tokenNumber}</div>
                    </div>
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-400/30 text-center">
                      <div className="text-xs text-slate-400">Now in Doctor Room</div>
                      <div className="text-3xl font-black text-emerald-400 mt-1">#{patient.currentServingToken}</div>
                    </div>
                  </div>
                </div>

                <div className="clay-surface p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                      Latest Synced Vitals (Clinic + Home)
                    </span>
                    <span className="text-xs text-slate-400">Target HR &lt; {patient.maxSafeHR} bpm</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/10">
                      <div className="text-xs text-slate-400">Blood Pressure</div>
                      <div className="text-lg font-extrabold text-white mt-1">
                        {patient.vitals.bpSys}/{patient.vitals.bpDia}
                      </div>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/10">
                      <div className="text-xs text-slate-400">Heart Rate</div>
                      <div className="text-lg font-extrabold text-emerald-400 mt-1">
                        {patient.vitals.hr} bpm
                      </div>
                    </div>
                    <div className="bg-slate-900/80 p-3.5 rounded-2xl border border-white/10">
                      <div className="text-xs text-slate-400">SpO2 / Sugar</div>
                      <div className="text-lg font-extrabold text-amber-300 mt-1">
                        {patient.vitals.spo2}% • {patient.vitals.sugar}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Doctor Broadcasts, Announcements & Educational Videos */}
              <div className="clay-surface p-6 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                      <Megaphone className="w-5 h-5 text-amber-400" />
                      Dr. Saleem Ullah’s Announcements, Videos & Heart Health Guides
                    </h3>
                    <p className="text-xs text-slate-300">
                      {lang === 'ur'
                        ? 'ڈاکٹر سلیم اللہ کے تازہ ترین اعلانات، معلوماتی ویڈیوز اور ہدایات'
                        : 'Directly published from the Doctor Broadcast Studio to all patient phones'}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('admin')}
                    className="clay-btn-gold px-4 py-2 text-xs font-extrabold text-slate-950"
                  >
                    + Post New Update (Doctor Admin)
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {broadcasts.map((b) => (
                    <div
                      key={b.id}
                      className="bg-slate-900/85 p-5 rounded-3xl border border-white/15 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-2">
                        <span className="inline-block text-[11px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-400/20 text-amber-300">
                          {b.type} • {b.date}
                        </span>
                        <h4 className="font-extrabold text-base text-white">{b.title}</h4>
                        {b.titleUr && (
                          <p className="text-sm font-bold text-emerald-300" dir="rtl">
                            {b.titleUr}
                          </p>
                        )}
                        <p className="text-xs text-slate-300 leading-relaxed">{b.body}</p>
                      </div>
                      {b.videoUrl && (
                        <a
                          href={b.videoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="clay-btn-blue py-2.5 px-4 text-xs font-bold text-white flex items-center justify-center gap-2"
                        >
                          <Video className="w-4 h-4" /> Watch Educational Video
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOMIZABLE MEDICINE SCHEDULE & ALARMS */}
          {activeTab === 'meds' && (
            <div className="clay-surface p-6 space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    My Prescription & Custom Medicine Alarm Timings
                  </h3>
                  <p className="text-xs text-slate-300">
                    Tap any clock time below to customize when your phone rings for each dose
                  </p>
                </div>
                <span className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold">
                  {takenCount} of {patient.meds.length} Doses Taken Today
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patient.meds.map((m) => (
                  <div
                    key={m.id}
                    className={`p-5 rounded-3xl border transition space-y-3 ${
                      m.taken
                        ? 'bg-emerald-950/40 border-emerald-400/40'
                        : 'bg-slate-900/85 border-white/15'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-amber-300">{m.period}</span>
                        <h4 className="text-base font-extrabold text-white mt-0.5">{m.name}</h4>
                      </div>
                      <input
                        type="time"
                        value={m.time}
                        onChange={(e) => updateMedicationTime(m.id, e.target.value)}
                        className="bg-slate-950 text-amber-300 font-bold text-xs px-3 py-1.5 rounded-xl border border-amber-400/40"
                      />
                    </div>
                    <p className="text-sm font-semibold text-emerald-200" dir="rtl">
                      {lang === 'ps' ? m.ps : m.ur}
                    </p>
                    <button
                      onClick={() => toggleMedicationTaken(m.id)}
                      className={`w-full py-3 rounded-2xl font-extrabold text-xs flex items-center justify-center gap-2 ${
                        m.taken ? 'clay-btn-emerald text-white' : 'clay-btn-gold text-slate-950'
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {m.taken ? 'Dose Taken Today ✓' : 'Mark Dose as Taken'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FUNCTIONAL CAPACITY EXERCISE & LIFESTYLE MODIFICATION */}
          {activeTab === 'rehab' && (
            <div className="space-y-6">
              <div className="clay-surface p-6 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold uppercase text-amber-300">
                      Tailored to LVEF {patient.ef}% • NYHA {patient.nyha} • ETT {patient.mets} METs
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      Daily Cardiac Exercise & Safe Heart-Rate Protocol
                    </h3>
                  </div>
                  <div className="bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-amber-400/40 text-right">
                    <div className="text-[11px] text-slate-400">Safe Max Exercise Pulse</div>
                    <div className="text-lg font-black text-amber-400">{patient.maxSafeHR} bpm</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-900/85 p-5 rounded-3xl border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-emerald-300 uppercase">
                      Interactive Guided Rehab Walk Timer ({patient.rehabProtocol.walkMinutes} Min Goal)
                    </div>
                    <div className="text-4xl font-black text-white">
                      {String(Math.floor(walkSeconds / 60)).padStart(2, '0')}:
                      {String(walkSeconds % 60).padStart(2, '0')}
                    </div>
                    <p className="text-xs text-slate-300">{patient.rehabProtocol.pace}</p>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => setWalkRunning(!walkRunning)}
                        className="clay-btn-emerald px-4 py-2.5 text-xs font-extrabold text-white flex items-center gap-1.5"
                      >
                        {walkRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        {walkRunning ? 'Pause Walk' : 'Start Rehab Walk'}
                      </button>
                      <button
                        onClick={() => {
                          setWalkRunning(false);
                          setWalkSeconds(0);
                        }}
                        className="px-4 py-2.5 rounded-2xl bg-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1"
                      >
                        <RotateCcw className="w-4 h-4" /> Reset
                      </button>
                    </div>
                  </div>

                  <div className="bg-slate-900/85 p-5 rounded-3xl border border-white/10 space-y-3">
                    <div className="text-xs font-bold text-amber-300 uppercase">
                      Daily Fluid Intake Ceiling ({patient.fluidLimitMl} ml Max)
                    </div>
                    <div className="text-2xl font-black text-white">
                      {fluidConsumedMl} / {patient.fluidLimitMl} ml
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 transition-all"
                        style={{
                          width: `${Math.min(100, Math.round((fluidConsumedMl / patient.fluidLimitMl) * 100))}%`
                        }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFluidConsumedMl((v) => v + 200)}
                        className="clay-btn-blue px-3.5 py-2 text-xs font-bold text-white"
                      >
                        + Add 1 Glass (200 ml)
                      </button>
                      <button
                        onClick={() => setFluidConsumedMl(0)}
                        className="px-3.5 py-2 rounded-2xl bg-slate-800 text-xs font-bold text-slate-300"
                      >
                        Reset Day
                      </button>
                    </div>
                  </div>
                </div>

                {/* Custom Lifestyle Rules */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-extrabold text-amber-300">
                    Personalized Lifestyle & Dietary Instructions
                  </h4>
                  <ul className="space-y-2">
                    {patient.rehabProtocol.dietRules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="bg-slate-900/80 px-4 py-3 rounded-2xl border border-white/10 text-xs sm:text-sm text-slate-200 flex items-center gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={newLifestyleRule}
                      onChange={(e) => setNewLifestyleRule(e.target.value)}
                      placeholder="Add your own personal lifestyle or diet target..."
                      className="flex-1 bg-slate-900/90 border border-white/15 rounded-2xl px-4 py-2.5 text-xs text-white"
                    />
                    <button
                      onClick={() => {
                        if (!newLifestyleRule.trim()) return;
                        setPatients((prev) =>
                          prev.map((p) =>
                            p.id === patient.id
                              ? {
                                  ...p,
                                  rehabProtocol: {
                                    ...p.rehabProtocol,
                                    dietRules: [...p.rehabProtocol.dietRules, newLifestyleRule.trim()]
                                  }
                                }
                              : p
                          )
                        );
                        setNewLifestyleRule('');
                      }}
                      className="clay-btn-gold px-4 py-2.5 text-xs font-extrabold text-slate-950"
                    >
                      + Save Goal
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SOS EMERGENCY VITALS & 12-LEAD ECG AI TRIAGE */}
          {activeTab === 'sos' && (
            <div className="clay-surface p-6 border-2 border-red-500/50 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-400/40">
                    24/7 Emergency Cardiac & ECG AI Triage
                  </span>
                  <h3 className="text-2xl font-black text-white mt-2">
                    Share Live Vitals & 12-Lead ECG Strip for Instant AI Interpretation
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {Object.entries(ECG_PRESETS).map(([key, item]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedEcgKey(key)}
                    className={`p-4 rounded-2xl text-left border text-xs font-bold transition ${
                      selectedEcgKey === key
                        ? 'clay-btn-crimson text-white'
                        : 'bg-slate-900/85 border-white/15 text-slate-300'
                    }`}
                  >
                    <div>Simulate / Upload ECG:</div>
                    <div className="text-sm font-extrabold mt-1">{item.label}</div>
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-4 rounded-2xl border border-white/10 space-y-3">
                  <label className="text-xs font-bold text-slate-300 block">
                    Enter Current Emergency Systolic / Diastolic BP (mmHg)
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      value={sosBpSys}
                      onChange={(e) => setSosBpSys(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-white/20 rounded-xl px-3 py-2 text-sm font-bold text-white"
                      placeholder="Systolic (e.g. 130)"
                    />
                    <input
                      type="number"
                      value={sosBpDia}
                      onChange={(e) => setSosBpDia(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-white/20 rounded-xl px-3 py-2 text-sm font-bold text-white"
                      placeholder="Diastolic (e.g. 80)"
                    />
                  </div>
                  <p className="text-xs text-amber-300">
                    {sosBpSys < 100
                      ? '⚠️ Systolic BP is < 100 mmHg: DO NOT take sublingual Angised (GTN) as it can drop blood pressure further.'
                      : '✓ Systolic BP is ≥ 100 mmHg: Safe threshold if sublingual Angised (GTN) is advised for chest pain.'}
                  </p>
                </div>

                <div className="bg-slate-900/90 p-4 rounded-2xl border border-red-400/40 space-y-2">
                  <div className="text-xs font-extrabold uppercase text-red-300">{activeEcg.urgency}</div>
                  <p className="text-xs text-white leading-relaxed">{activeEcg.summaryEn}</p>
                  <p className="text-sm font-bold text-amber-300" dir="rtl">
                    {lang === 'ps' ? activeEcg.summaryPs : activeEcg.summaryUr}
                  </p>
                </div>
              </div>

              {sosSentBanner && (
                <div className="p-4 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-xs font-bold text-emerald-200">
                  {sosSentBanner}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() =>
                    setSosSentBanner(
                      `✅ EMERGENCY PACKET TRANSMITTED: ${patient.name}'s ECG (${activeEcg.label}) & BP (${sosBpSys}/${sosBpDia}) sent to Advanced Heart Center Cath Lab & Reception Queue!`
                    )
                  }
                  className="clay-btn-crimson py-4 px-4 text-xs font-extrabold text-white flex items-center justify-center gap-2"
                >
                  <ShieldAlert className="w-5 h-5" /> 1. Alert Dr. Saleem’s Clinic & Cath Lab
                </button>
                <a
                  href={`https://wa.me/923459876543?text=${encodeURIComponent(
                    `EMERGENCY CARDIAC ALERT: Patient ${patient.name} (${patient.id}), Diagnosis: ${patient.diagnosis}, BP: ${sosBpSys}/${sosBpDia}, ECG Triage: ${activeEcg.label}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="clay-btn-emerald py-4 px-4 text-xs font-extrabold text-white flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-5 h-5" /> 2. WhatsApp On-Call Cardiologist
                </a>
                <button
                  onClick={() =>
                    setSosSentBanner(
                      `📍 Family Attendant SMS & GPS Location Alert dispatched for ${patient.name}.`
                    )
                  }
                  className="clay-btn-blue py-4 px-4 text-xs font-extrabold text-white flex items-center justify-center gap-2"
                >
                  <MapPin className="w-5 h-5" /> 3. Alert Family Attendant + GPS
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: DIAGNOSTIC REPORTS & 24/7 AI CARDIAC ASSISTANT */}
          {activeTab === 'records' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="clay-surface p-5 space-y-2">
                  <span className="text-xs font-bold text-emerald-300">Echocardiography Report</span>
                  <h4 className="text-lg font-extrabold text-white">LVEF {patient.ef}%</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{patient.echoSummary}</p>
                </div>
                <div className="clay-surface p-5 space-y-2">
                  <span className="text-xs font-bold text-amber-300">Exercise Tolerance Test (ETT)</span>
                  <h4 className="text-lg font-extrabold text-white">{patient.mets} METs Capacity</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{patient.ettSummary}</p>
                </div>
                <div className="clay-surface p-5 space-y-2">
                  <span className="text-xs font-bold text-blue-300">Cardiac Cath Lab Summary</span>
                  <h4 className="text-lg font-extrabold text-white">Coronary Intervention</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{patient.cathSummary}</p>
                </div>
              </div>

              {/* 24/7 AI Cardiac Health Chat */}
              <div className="clay-surface p-6 space-y-4">
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-amber-400" />
                  24/7 AI Cardiac Assistant (English / اردو / پښتو)
                </h3>
                <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                  {aiMessages.map((msg, i) => (
                    <div
                      key={i}
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'ai'
                          ? 'bg-slate-900/90 border border-white/10 text-slate-100'
                          : 'clay-btn-gold text-slate-950 font-bold ml-auto max-w-md'
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>
                <form onSubmit={handleAiSend} className="flex gap-2">
                  <input
                    type="text"
                    value={aiQuestion}
                    onChange={(e) => setAiQuestion(e.target.value)}
                    placeholder="Ask about chest pain, water limit, safe walk, or stent medicines..."
                    className="flex-1 bg-slate-900/90 border border-white/15 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white"
                  />
                  <button
                    type="submit"
                    className="clay-btn-emerald px-5 py-3 text-xs font-extrabold text-white flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" /> Ask AI
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 6: DOCTOR ADMIN BROADCAST STUDIO */}
          {activeTab === 'admin' && (
            <div className="clay-surface p-6 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase text-amber-300">
                  Admin Studio • Dr. Saleem Ullah
                </span>
                <h3 className="text-xl font-extrabold text-white mt-1">
                  Publish Educational Videos, Articles & Clinic Announcements to Patient Phones
                </h3>
              </div>

              <form onSubmit={handlePublishBroadcast} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <select
                    value={newPost.type}
                    onChange={(e) => setNewPost({ ...newPost, type: e.target.value })}
                    className="bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs font-bold text-amber-300"
                  >
                    <option value="announcement">Clinic Announcement</option>
                    <option value="video">Educational Video Lecture</option>
                    <option value="article">Heart Health Article / Diet Guide</option>
                  </select>
                  <input
                    type="text"
                    value={newPost.videoUrl}
                    onChange={(e) => setNewPost({ ...newPost, videoUrl: e.target.value })}
                    placeholder="Optional YouTube / Video Link (https://...)"
                    className="bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="English Title (e.g. Ramadan Fasting Guidelines for Heart Patients)"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <input
                  type="text"
                  value={newPost.titleUr}
                  onChange={(e) => setNewPost({ ...newPost, titleUr: e.target.value })}
                  placeholder="اردو عنوان / پشتو عنوان (اختیاری)"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                  dir="rtl"
                />
                <textarea
                  rows={3}
                  value={newPost.body}
                  onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
                  placeholder="Write your educational advice or clinic timing announcement..."
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <button
                  type="submit"
                  className="clay-btn-gold px-6 py-3.5 text-xs font-extrabold text-slate-950"
                >
                  Publish Live to All Patient Phones
                </button>
              </form>
            </div>
          )}
        </section>
      </main>

      {/* Mobile Floating Clay Bottom Bar */}
      <nav className="lg:hidden fixed bottom-3 inset-x-3 z-40 clay-surface p-2 flex items-center justify-around">
        {[
          { id: 'home', label: 'Home', icon: Heart },
          { id: 'meds', label: 'Meds', icon: Pill },
          { id: 'rehab', label: 'Exercise', icon: Activity },
          { id: 'sos', label: 'SOS ECG', icon: ShieldAlert },
          { id: 'records', label: 'Reports', icon: FileText },
          { id: 'admin', label: 'Doctor', icon: Megaphone }
        ].map((item) => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-2 rounded-2xl flex flex-col items-center gap-1 text-[11px] font-extrabold ${
                item.id === 'sos'
                  ? 'clay-btn-crimson text-white'
                  : active
                  ? 'clay-btn-gold text-slate-950'
                  : 'text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Patient Login / Self-Registration Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="clay-surface max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-white">
                Patient Account Login & Registration
              </h3>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 bg-slate-900 p-1 rounded-2xl">
              <button
                onClick={() => setAuthMode('login')}
                className={`py-2 rounded-xl text-xs font-extrabold ${
                  authMode === 'login' ? 'clay-btn-gold text-slate-950' : 'text-slate-300'
                }`}
              >
                Login (Phone / MR#)
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`py-2 rounded-xl text-xs font-extrabold ${
                  authMode === 'register' ? 'clay-btn-emerald text-white' : 'text-slate-300'
                }`}
              >
                New Patient Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handlePatientLogin} className="space-y-3">
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Enter Mobile Phone (e.g. 03459876543) or MR# (AHC-2026-0842)"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <input
                  type="password"
                  value={loginPin}
                  onChange={(e) => setLoginPin(e.target.value)}
                  placeholder="4-Digit PIN"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <button
                  type="submit"
                  className="w-full clay-btn-gold py-3 text-xs font-extrabold text-slate-950"
                >
                  Open My Patient Account
                </button>
              </form>
            ) : (
              <form onSubmit={handlePatientRegister} className="space-y-3">
                <input
                  type="text"
                  value={regForm.name}
                  onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                  placeholder="Full Name (مریض کا نام)"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <input
                  type="tel"
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                  placeholder="Mobile Phone Number (03xx-xxxxxxx)"
                  className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                    placeholder="Age (Years)"
                    className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                  />
                  <input
                    type="password"
                    value={regForm.pin}
                    onChange={(e) => setRegForm({ ...regForm, pin: e.target.value })}
                    placeholder="Create 4-Digit PIN"
                    className="w-full bg-slate-900 border border-white/15 rounded-2xl px-4 py-3 text-xs text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full clay-btn-emerald py-3 text-xs font-extrabold text-white"
                >
                  Create Patient Account & Generate MR#
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Install PWA on Android / iPhone / Desktop PC Modal */}
      {showInstallModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="clay-surface max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-extrabold text-white">
                Install Advanced Heart Center App on Your Device
              </h3>
              <button
                onClick={() => setShowInstallModal(false)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            {deferredPrompt && (
              <button
                onClick={() => {
                  deferredPrompt.prompt();
                }}
                className="w-full clay-btn-emerald py-3.5 text-sm font-extrabold text-white flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> 1-Tap Direct Install Now
              </button>
            )}

            <div className="space-y-3 text-xs text-slate-200">
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white">Android Phones (Chrome / Samsung)</div>
                  <p className="text-slate-300 mt-0.5">
                    Tap the 3-dot browser menu (⋮) at the top right and tap <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3">
                <Apple className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white">Apple iPhone & iPad (Safari)</div>
                  <p className="text-slate-300 mt-0.5">
                    Tap the <strong>Share icon (⬆️)</strong> at the bottom of Safari, scroll down, and tap <strong>"Add to Home Screen"</strong>.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 flex items-start gap-3">
                <Monitor className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-extrabold text-white">Laptop / Desktop PC (Chrome / Edge)</div>
                  <p className="text-slate-300 mt-0.5">
                    Click the <strong>Install icon (⊕)</strong> on the right side of the browser address bar to install as a standalone desktop app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
