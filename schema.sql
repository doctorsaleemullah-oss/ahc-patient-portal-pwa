-- ========================================================
-- ADVANCED HEART CENTER: UNIFIED PATIENT PORTAL SCHEMA
-- Run this in your Supabase SQL Editor or PostgreSQL DB
-- to link with Advanced-heart-center-two.vercel.app
-- ========================================================

CREATE TABLE IF NOT EXISTS patients (
  id TEXT PRIMARY KEY, -- e.g. AHC-2026-0842
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  pin TEXT DEFAULT '1234',
  age INT,
  gender TEXT,
  location TEXT,
  diagnosis TEXT,
  ef INT DEFAULT 50,
  nyha TEXT DEFAULT 'Class I',
  mets NUMERIC(3,1) DEFAULT 7.0,
  max_safe_hr INT DEFAULT 115,
  fluid_limit_ml INT DEFAULT 2000,
  vitals JSONB DEFAULT '{}'::jsonb,
  appointment JSONB DEFAULT '{}'::jsonb,
  rehab_protocol JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS prescriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT REFERENCES patients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  time TEXT NOT NULL,
  period TEXT,
  urdu_instruction TEXT,
  taken BOOLEAN DEFAULT false,
  alarm BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS broadcasts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  title_ur TEXT,
  body TEXT NOT NULL,
  type TEXT DEFAULT 'announcement', -- announcement, video, article
  video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS emergency_triage_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id TEXT,
  patient_name TEXT,
  diagnosis TEXT,
  bp TEXT,
  ecg TEXT,
  urgency TEXT,
  status TEXT DEFAULT 'pending', -- pending, attended, admitted
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
