import React, { useState, useEffect } from 'react';
import {
  Menu,
  Heart,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle2,
  FileText,
  Pill,
  Info,
  Headphones,
  Home,
  Check,
  ArrowRight,
  ShieldCheck,
  Lock,
  Plus,
  Activity,
  ShieldAlert,
  Megaphone,
  Video,
  Download,
  Smartphone,
  Apple,
  Monitor,
  PhoneCall,
  UserCheck,
  RotateCcw,
  Play,
  Pause,
  MapPin,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';

const INITIAL_PATIENTS = [
  {
    id: 'AHC-2026-0842',
    name: 'Muhammad Khan',
    phone: '03459876543',
    pin: '0842',
    age: 62,
    gender: 'Male',
    location: 'Saidu Sharif, Swat',
    diagnosis: 'Post-PCI (LAD DES Stent) • Ischemic Heart Disease',
    ef: 45,
    nyha: 'Class II',
    mets: 6.5,
    maxSafeHR: 112,
    fluidLimitMl: 2000,
    appointment: {
      doctor: 'Dr. Saleem Ullah',
      title: 'Consultant Cardiologist',
      clinic: 'Clinic No. 1',
      date: 'Tue, Nov 18, 2026',
      time: '10:30 AM',
      status: 'Confirmed',
    },
    vitals: { bpSys: 128, bpDia: 78, hr: 68, spo2: 97, sugar: 136, weight: 74 },
    echoSummary: 'Mildly reduced LV systolic function (LVEF 45%). Mild anterior hypokinesia. Grade I diastolic dysfunction.',
    ettSummary: 'Achieved 6.5 METs (Bruce Protocol Stage 2). Negative for inducible angina at target workload.',
    cathSummary: 'Successful PCI to mid-LAD with 3.0 x 28mm Drug-Eluting Stent (DES). TIMI-3 flow.',
    meds: [
      { id: 'm1', name: 'Tab. Loprin (Aspirin) 75mg', time: '08:30', period: 'Morning', ur: 'ناشتے کے بعد — خون پتلا کرنے والی دوا', taken: true },
      { id: 'm2', name: 'Tab. Brilinta (Ticagrelor) 90mg', time: '09:00', period: 'Morning & Night', ur: 'صبح اور رات — سٹنٹ کی حفاظت کے لیے لازمی', taken: true },
      { id: 'm3', name: 'Tab. Concor (Bisoprolol) 5mg', time: '08:30', period: 'Morning', ur: 'دل کی دھڑکن اور بلڈ پریشر کنٹرول', taken: false },
      { id: 'm4', name: 'Tab. Rovista (Rosuvastatin) 20mg', time: '21:30', period: 'Night', ur: 'رات سونے سے پہلے — کولیسٹرول کنٹرول', taken: false }
    ],
    dietRules: [
      'Low salt (< 3g/day) — strictly avoid pickles & salted snacks',
      'Daily 30 min brisk walk on flat ground, keeping pulse below 112 bpm',
      'Keep Angised (GTN) tablet readily available for sudden chest tightness'
    ]
  },
  {
    id: 'AHC-2026-1109',
    name: 'Bibi Halima',
    phone: '03001122334',
    pin: '1109',
    age: 56,
    gender: 'Female',
    location: 'Khwaza Khela, Swat',
    diagnosis: 'HFrEF (Heart Failure EF 30%) • GDMT',
    ef: 30,
    nyha: 'Class III',
    mets: 3.8,
    maxSafeHR: 98,
    fluidLimitMl: 1500,
    appointment: {
      doctor: 'Dr. Saleem Ullah',
      title: 'Consultant Cardiologist',
      clinic: 'Khwaza Khela Outreach Clinic',
      date: 'Sun, Nov 23, 2026',
      time: '11:00 AM',
      status: 'Confirmed',
    },
    vitals: { bpSys: 112, bpDia: 70, hr: 72, spo2: 95, sugar: 118, weight: 66 },
    echoSummary: 'Severely reduced LV systolic function (LVEF 30%). Functional mitral regurgitation.',
    ettSummary: 'Functional capacity 3.8 METs (6-Minute Walk Test distance 290m).',
    cathSummary: 'Non-obstructive coronaries; cardiomyopathy managed on 4-pillar GDMT.',
    meds: [
      { id: 'm201', name: 'Tab. Uperio (Sacubitril/Valsartan) 50mg', time: '08:30', period: 'Twice Daily', ur: 'صبح اور شام — دل کی طاقت بڑھانے کے لیے', taken: true },
      { id: 'm202', name: 'Tab. Forxiga (Dapagliflozin) 10mg', time: '09:00', period: 'Morning', ur: 'روزانہ صبح ایک گولی', taken: true },
      { id: 'm203', name: 'Tab. Lasix (Furosemide) 40mg', time: '08:00', period: 'Morning', ur: 'پھیپھڑوں اور پاؤں کی سوجن کم کرنے کے لیے', taken: false }
    ],
    dietRules: [
      'Strict 1.5 Liter daily fluid limit total (all water, tea & soup)',
      'Weigh yourself every morning before breakfast; notify clinic if weight increases by > 2 kg in 3 days',
      'Elevate legs on pillows when resting'
    ]
  }
];

const ECG_PRESETS = {
  stemi: {
    label: 'Acute Anterior STEMI (Precordial ST-Elevation)',
    urgency: 'CRITICAL EMERGENCY — CODE STEMI',
    summary: 'Elevated ST-segments in V1–V4 with acute ischemic presentation. High suspicion of coronary occlusion.',
    badgeColor: 'bg-red-500 text-white'
  },
  afib: {
    label: 'Atrial Fibrillation with Rapid Ventricular Rate (138 bpm)',
    urgency: 'URGENT REVIEW REQUIRED',
    summary: 'Irregular narrow-complex rhythm consistent with fast AFib. Clinical rate control needed.',
    badgeColor: 'bg-amber-500 text-white'
  },
  normal: {
    label: 'Normal Sinus Rhythm (HR 72 bpm)',
    urgency: 'STABLE RHYTHM',
    summary: 'Regular sinus rhythm with no acute ST-T wave abnormalities.',
    badgeColor: 'bg-emerald-500 text-white'
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'appointments' | 'reports' | 'medicines' | 'facilities' | 'more' | 'sos' | 'admin'
  const [patients, setPatients] = useState(() => {
    const saved = localStorage.getItem('ahc_patients_v3');
    return saved ? JSON.parse(saved) : INITIAL_PATIENTS;
  });
  const [currentPatientId, setCurrentPatientId] = useState('AHC-2026-0842');
  const [lang, setLang] = useState('en'); // 'en' | 'ur'

  // Modals & Sheets
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [loginInput, setLoginInput] = useState('');
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');

  // SOS ECG State
  const [selectedEcg, setSelectedEcg] = useState('stemi');
  const [sosBpSys, setSosBpSys] = useState(132);
  const [sosBpDia, setSosBpDia] = useState(82);
  const [sosSent, setSosSent] = useState(false);

  // Rehab Walking Timer
  const [walkSec, setWalkSec] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  // Broadcasts
  const [broadcasts, setBroadcasts] = useState([
    {
      id: 1,
      title: 'Sunday Outreach Cardiac Clinic — Khwaza Khela',
      body: 'Dr. Saleem Ullah will be available this Sunday at Dr. Abdul Basir Hospital for OPD consultations and Echocardiography.',
      date: 'Pinned Clinic Notice'
    },
    {
      id: 2,
      title: 'Post-Angioplasty Care: Dual Antiplatelet Therapy',
      body: 'Never stop Aspirin or Ticagrelor/Brilinta without consulting Dr. Saleem Ullah. Stent thrombosis can occur rapidly.',
      date: 'Patient Education'
    }
  ]);
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');

  const patient = patients.find((p) => p.id === currentPatientId) || patients[0];

  useEffect(() => {
    localStorage.setItem('ahc_patients_v3', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    if (!isWalking) return;
    const t = setInterval(() => setWalkSec((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [isWalking]);

  const toggleMed = (id) => {
    setPatients((prev) =>
      prev.map((p) =>
        p.id === patient.id
          ? { ...p, meds: p.meds.map((m) => (m.id === id ? { ...m, taken: !m.taken } : m)) }
          : p
      )
    );
  };

  const handlePublishPost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) return;
    setBroadcasts([
      { id: Date.now(), title: newTitle.trim(), body: newBody.trim(), date: 'Just Published' },
      ...broadcasts
    ]);
    setNewTitle('');
    setNewBody('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regPhone.trim()) return;
    const newId = `AHC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const created = {
      ...INITIAL_PATIENTS[0],
      id: newId,
      name: regName.trim(),
      phone: regPhone.trim(),
      appointment: {
        doctor: 'Dr. Saleem Ullah',
        title: 'Consultant Cardiologist',
        clinic: 'Clinic No. 1',
        date: 'Booking Pending',
        time: 'Pending Slot',
        status: 'Unconfirmed'
      }
    };
    setPatients([created, ...patients]);
    setCurrentPatientId(created.id);
    setShowAuthModal(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const found = patients.find(
      (p) => p.id.toLowerCase() === loginInput.trim().toLowerCase() || p.phone === loginInput.trim()
    );
    if (found) {
      setCurrentPatientId(found.id);
      setShowAuthModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F5FA] text-slate-800 pb-28 font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Navigation Bar Matching Exact Reference Design */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Hamburger Menu & Brand Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('more')}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition"
              aria-label="Open Menu"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>

            <div className="flex items-center gap-2.5">
              {/* Exact Red Heart + Blue Pulse Logo Icon */}
              <div className="relative w-11 h-11 flex items-center justify-center">
                <Heart className="w-10 h-10 text-rose-600 fill-rose-50" strokeWidth={2} />
                <Activity className="w-5 h-5 text-blue-700 absolute stroke-[2.5]" />
              </div>

              <div>
                <div className="flex items-baseline gap-1.5 leading-none">
                  <span className="text-[17px] font-black tracking-tight text-slate-900">Advanced</span>
                  <span className="text-[17px] font-black tracking-tight text-rose-600">Heart Center</span>
                </div>
                <div className="text-[11.5px] font-bold text-slate-700 leading-tight mt-0.5">
                  Swat International Hospital
                </div>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                  <MapPin className="w-3 h-3 text-rose-500" /> Saidu Sharif, Swat
                </div>
              </div>
            </div>
          </div>

          {/* User Welcome Pill Dropdown */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAuthModal(true)}
              className="flex items-center gap-2 bg-sky-50/80 hover:bg-sky-100/90 border border-sky-200/60 rounded-full px-3 py-1.5 transition text-left"
            >
              <div className="w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                {patient.name.charAt(0)}
              </div>
              <div className="hidden sm:block">
                <div className="text-[9.5px] text-slate-500 leading-none">Welcome Back</div>
                <div className="text-[12px] font-extrabold text-slate-900 leading-tight">
                  {patient.name}
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* HERO BANNER: 3D Anatomical Heart & Swat International Hospital Reference Artwork */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#DDEBFA] via-[#E8F1FC] to-[#F3F7FD] border border-blue-100 shadow-[0_12px_32px_-8px_rgba(2,132,199,0.12)] p-6 sm:p-8">
          {/* Subtle Heartbeat ECG wave across the background */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 200">
              <path
                d="M 0,100 L 250,100 L 270,70 L 290,140 L 310,20 L 330,170 L 350,100 L 800,100"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Your Heart Care
              </h1>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-rose-600 leading-[1.15]">
                Our Priority
              </h2>
              <p className="text-sm sm:text-base italic font-serif text-slate-600 pt-1">
                Healthy Heart... Healthier Life...
              </p>
              <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-white/90 text-slate-700 shadow-sm border border-slate-200/60">
                  MR# {patient.id}
                </span>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 shadow-sm">
                  LVEF {patient.ef}% • {patient.mets} METs
                </span>
              </div>
            </div>

            {/* Glowing 3D Heart Illustration with Swat International Hospital Backdrop */}
            <div className="relative shrink-0 flex items-center justify-center">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-tr from-rose-500/20 via-sky-400/20 to-white/40 p-2 backdrop-blur-sm shadow-xl flex items-center justify-center border border-white/80">
                <img
                  src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=500&q=80"
                  alt="Swat International Hospital & Cardiac Care"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent rounded-2xl flex items-end p-2.5">
                  <span className="text-[10px] font-black text-white tracking-wide">
                    Swat International Hospital
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6-CARD ACTION GRID — Exact Layout, Pill Arrows & Distinct Colors from Reference Image */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* 1. Book Appointment (Blue Pill Theme) */}
          <button
            onClick={() => setActiveTab('appointments')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-sky-200 border border-blue-200 flex items-center justify-center shadow-inner shrink-0">
                <Calendar className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-blue-600 transition">
                  Book Appointment
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">Select doctor & time</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-100/80 group-hover:bg-blue-600 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white transition" />
            </div>
          </button>

          {/* 2. My Appointments (Emerald Green Pill Theme) */}
          <button
            onClick={() => setActiveTab('appointments')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-200 border border-emerald-200 flex items-center justify-center shadow-inner shrink-0">
                <CheckCircle2 className="w-7 h-7 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-emerald-600 transition">
                  My Appointments
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">View & Manage</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-emerald-100/80 group-hover:bg-emerald-600 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:text-white transition" />
            </div>
          </button>

          {/* 3. View Reports (Lavender / Purple Pill Theme) */}
          <button
            onClick={() => setActiveTab('reports')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-100 to-indigo-200 border border-purple-200 flex items-center justify-center shadow-inner shrink-0">
                <FileText className="w-7 h-7 text-purple-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-purple-600 transition">
                  View Reports
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">Lab, Echo, ECG etc.</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-purple-100/80 group-hover:bg-purple-600 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-purple-600 group-hover:text-white transition" />
            </div>
          </button>

          {/* 4. Medicine Info (Warm Amber / Orange Pill Theme) */}
          <button
            onClick={() => setActiveTab('medicines')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-200 border border-amber-200 flex items-center justify-center shadow-inner shrink-0">
                <Pill className="w-7 h-7 text-amber-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-amber-600 transition">
                  Medicine Info
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">Search Medicines & Alarms</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-amber-100/80 group-hover:bg-amber-600 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-amber-600 group-hover:text-white transition" />
            </div>
          </button>

          {/* 5. Our Facilities (Teal / Cyan Pill Theme) */}
          <button
            onClick={() => setActiveTab('facilities')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-100 to-teal-200 border border-cyan-200 flex items-center justify-center shadow-inner shrink-0">
                <Info className="w-7 h-7 text-cyan-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-cyan-700 transition">
                  Our Facilities
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">Services & Departments</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-cyan-100/80 group-hover:bg-cyan-700 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-cyan-700 group-hover:text-white transition" />
            </div>
          </button>

          {/* 6. Help & Support (Violet / Support Pill Theme) */}
          <button
            onClick={() => setActiveTab('sos')}
            className="clay-grid-card p-4 flex items-center justify-between text-left group"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-100 to-purple-200 border border-violet-200 flex items-center justify-center shadow-inner shrink-0">
                <Headphones className="w-7 h-7 text-violet-700" />
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-slate-900 group-hover:text-violet-700 transition">
                  Help & Support
                </h3>
                <p className="text-[12px] text-slate-500 font-medium">Emergency ECG & Contact Us</p>
              </div>
            </div>
            <div className="w-9 h-9 rounded-full bg-violet-100/80 group-hover:bg-violet-700 flex items-center justify-center transition">
              <ArrowRight className="w-4 h-4 text-violet-700 group-hover:text-white transition" />
            </div>
          </button>
        </section>

        {/* YOUR NEXT APPOINTMENT CARD — Exact Navy Banner & Clean White Sub-Card */}
        <section className="rounded-3xl bg-[#0B254E] overflow-hidden shadow-lg border border-slate-200">
          {/* Header strip */}
          <div className="px-5 py-3.5 flex items-center justify-between text-white">
            <div className="flex items-center gap-2 font-bold text-sm sm:text-base">
              <Calendar className="w-5 h-5 text-sky-400" />
              <span>Your Next Appointment</span>
            </div>
            <button
              onClick={() => setActiveTab('appointments')}
              className="text-xs font-bold text-sky-300 hover:text-white flex items-center gap-1 transition"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Inner White Card */}
          <div className="p-4 sm:p-5 bg-white m-1.5 rounded-[22px] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 w-full md:w-auto">
              {/* Doctor Avatar */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80"
                  alt="Dr. Saleem Ullah"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-lg font-black text-slate-900">{patient.appointment.doctor}</h4>
                <p className="text-xs font-semibold text-slate-500">{patient.appointment.title}</p>
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-bold">
                  {patient.appointment.clinic}
                </span>
              </div>
            </div>

            {/* Date & Time Divider Section */}
            <div className="flex items-center gap-6 py-2 border-y md:border-y-0 md:border-x border-slate-100 px-0 md:px-6 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm">
                <Calendar className="w-4 h-4 text-sky-600" />
                <span>{patient.appointment.date}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold text-xs sm:text-sm">
                <Clock className="w-4 h-4 text-sky-600" />
                <span>{patient.appointment.time}</span>
              </div>
            </div>

            {/* Status & View Details Button */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black flex items-center gap-1.5 shadow-sm">
                <Check className="w-3.5 h-3.5 stroke-[3]" /> {patient.appointment.status}
              </span>
              <button
                onClick={() => setActiveTab('appointments')}
                className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-slate-800 text-xs font-black flex items-center gap-1 transition"
              >
                View Details <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* BOTTOM 3 TRUST PILLARS — Secure & Trusted | Quick Access | Better Care */}
        <section className="rounded-2xl bg-gradient-to-r from-sky-50 via-slate-50 to-rose-50 border border-slate-200/80 p-3 flex flex-wrap items-center justify-around gap-3 text-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900">Secure & Trusted</div>
              <div className="text-[10.5px] text-slate-500">Your data is safe</div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-slate-300" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900">Quick Access</div>
              <div className="text-[10.5px] text-slate-500">Save time</div>
            </div>
          </div>

          <div className="hidden sm:block h-7 w-[1px] bg-slate-300" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div className="text-left">
              <div className="text-xs font-black text-slate-900">Better Care</div>
              <div className="text-[10.5px] text-slate-500">A Healthier You</div>
            </div>
          </div>
        </section>

        {/* DYNAMIC CONTENT PANELS (When a specific category is selected) */}
        {activeTab === 'medicines' && (
          <section className="clay-grid-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">My Daily Cardiac Prescriptions</h3>
                <p className="text-xs text-slate-500">
                  Synced with Dr. Saleem Ullah’s Clinic Prescription Module
                </p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {patient.meds.map((m) => (
                <div
                  key={m.id}
                  className={`p-4 rounded-2xl border transition ${
                    m.taken ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-amber-600">{m.period} • {m.time}</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{m.name}</h4>
                    </div>
                    <button
                      onClick={() => toggleMed(m.id)}
                      className={`px-3 py-1.5 rounded-full text-xs font-black ${
                        m.taken ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {m.taken ? 'Taken ✓' : 'Mark Done'}
                    </button>
                  </div>
                  <p className="text-xs text-emerald-900 font-bold mt-2" dir="rtl">
                    {m.ur}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'reports' && (
          <section className="clay-grid-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-black text-slate-900">Diagnostic Reports & Investigations</h3>
                <p className="text-xs text-slate-500">Echo, ETT, Angiography & Lab Records</p>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-100 space-y-1">
                <span className="text-xs font-black text-sky-700">Echocardiography</span>
                <div className="text-2xl font-black text-slate-900">LVEF {patient.ef}%</div>
                <p className="text-xs text-slate-600 leading-relaxed">{patient.echoSummary}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100 space-y-1">
                <span className="text-xs font-black text-amber-700">Exercise Tolerance (ETT)</span>
                <div className="text-2xl font-black text-slate-900">{patient.mets} METs</div>
                <p className="text-xs text-slate-600 leading-relaxed">{patient.ettSummary}</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 space-y-1">
                <span className="text-xs font-black text-rose-700">Cath Lab Angiography</span>
                <div className="text-base font-black text-slate-900">Stent Record</div>
                <p className="text-xs text-slate-600 leading-relaxed">{patient.cathSummary}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'sos' && (
          <section className="clay-grid-card p-6 border-2 border-rose-300 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-black">
                  24/7 Cardiac Emergency & AI Triage
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">
                  Upload ECG & Vitals for Instant AI Review
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('home')}
                className="text-xs font-bold text-sky-600 hover:underline"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.entries(ECG_PRESETS).map(([k, v]) => (
                <button
                  key={k}
                  onClick={() => setSelectedEcg(k)}
                  className={`p-3 rounded-2xl text-left border text-xs font-bold ${
                    selectedEcg === k ? 'bg-rose-600 text-white border-rose-600' : 'bg-slate-50 text-slate-700'
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900">
                  {ECG_PRESETS[selectedEcg].urgency}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  BP: {sosBpSys}/{sosBpDia} mmHg
                </span>
              </div>
              <p className="text-xs text-slate-600">{ECG_PRESETS[selectedEcg].summary}</p>
            </div>

            {sosSent && (
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800 text-xs font-black">
                ✅ Emergency notification sent to Advanced Heart Center Cath Lab queue and on-call attendant!
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSosSent(true)}
                className="flex-1 py-3 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md"
              >
                🚨 Alert Cath Lab & Dr. Saleem’s Team
              </button>
              <a
                href={`https://wa.me/923459876543?text=${encodeURIComponent(
                  `URGENT CARDIAC ALERT: Patient ${patient.name} (${patient.id}), BP: ${sosBpSys}/${sosBpDia}, ECG: ${ECG_PRESETS[selectedEcg].label}`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5"
              >
                <PhoneCall className="w-4 h-4" /> WhatsApp Cardiologist
              </a>
            </div>
          </section>
        )}

        {/* DOCTOR BROADCASTS & CLINIC UPDATES FEED */}
        <section className="clay-grid-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-black text-slate-900">
                Dr. Saleem Ullah’s Clinic Bulletins & Videos
              </h3>
            </div>
            <button
              onClick={() => setActiveTab('admin')}
              className="text-xs font-extrabold text-sky-600 hover:underline"
            >
              + Admin Post
            </button>
          </div>

          <div className="space-y-3">
            {broadcasts.map((b) => (
              <div key={b.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-extrabold text-sm text-slate-900">{b.title}</h4>
                  <span className="text-[10px] font-bold text-slate-400">{b.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </section>

        {activeTab === 'admin' && (
          <section className="clay-grid-card p-6 border-2 border-sky-400 space-y-4">
            <h3 className="text-base font-black text-slate-900">
              Doctor Admin Broadcast Studio (Post to Patient Phones)
            </h3>
            <form onSubmit={handlePublishPost} className="space-y-3">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Announcement or Video Title..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              />
              <textarea
                rows={3}
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
                placeholder="Write your educational advice or clinic timing update..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-extrabold text-xs shadow"
              >
                Publish Live to All Patient Apps
              </button>
            </form>
          </section>
        )}
      </main>

      {/* FLOATING BLUE HEADSET EMERGENCY / TELE-SUPPORT BUTTON (Bottom Right from Image) */}
      <button
        onClick={() => setActiveTab('sos')}
        className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-[#0B254E] hover:bg-rose-600 text-white shadow-2xl flex items-center justify-center transition transform hover:scale-105 border-2 border-white"
        aria-label="Direct Cardiac Help & Support"
      >
        <Headphones className="w-6 h-6" />
      </button>

      {/* BOTTOM NAVIGATION BAR — Exact 6 Icons matching Reference Image */}
      <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'medicines', label: 'Medicines', icon: Pill },
            { id: 'facilities', label: 'Facilities', icon: Info },
            { id: 'more', label: 'More', icon: Activity }
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex flex-col items-center gap-0.5 py-1 px-2.5 transition text-center"
              >
                <div
                  className={`p-1.5 rounded-2xl transition ${
                    active ? 'tab-pill-active' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-sky-600' : 'text-slate-500'}`} />
                </div>
                <span
                  className={`text-[10px] font-bold ${
                    active ? 'text-sky-600' : 'text-slate-500'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* LOGIN / REGISTRATION MODAL */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-base text-slate-900">Patient Account</h3>
              <button onClick={() => setShowAuthModal(false)} className="text-slate-400 text-xs">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl text-xs font-bold">
              <button
                onClick={() => setAuthMode('login')}
                className={`py-1.5 rounded-xl ${authMode === 'login' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                Login (Phone/MR)
              </button>
              <button
                onClick={() => setAuthMode('register')}
                className={`py-1.5 rounded-xl ${authMode === 'register' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                Register
              </button>
            </div>

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-3">
                <input
                  type="text"
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  placeholder="Enter Phone (0345...) or MR#"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-3">
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="Mobile Phone"
                  className="w-full border border-slate-200 rounded-xl px-3 py-2 text-xs"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Create Account
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
