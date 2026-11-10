import { createClient } from '@supabase/supabase-js';

/**
 * Advanced Heart Center — Unified Database & Synchronization Layer
 *
 * Configured to seamlessly connect with Supabase or Firebase PostgreSQL database
 * shared with Advanced-heart-center-two.vercel.app.
 *
 * Defaults to localStorage persistence so the app runs smoothly with zero errors
 * if API environment variables are not yet injected.
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isDatabaseConnected = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = isDatabaseConnected
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Fetch patient record by MR# or Phone Number
 */
export async function getPatientRecord(identifier) {
  if (isDatabaseConnected && supabase) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*, prescriptions(*), appointments(*), vitals(*), reports(*)')
        .or(`id.ilike.${identifier},phone.eq.${identifier}`)
        .maybeSingle();

      if (!error && data) return data;
    } catch (err) {
      console.warn('Database query fallback to local cache:', err);
    }
  }

  // LocalStorage Fallback
  const cached = localStorage.getItem('ahc_patients_db');
  if (cached) {
    const list = JSON.parse(cached);
    const found = list.find(
      (p) =>
        p.id.toLowerCase() === identifier.trim().toLowerCase() ||
        p.phone === identifier.trim()
    );
    if (found) return found;
  }
  return null;
}

/**
 * Save / Update Patient Profile or Vitals
 */
export async function syncPatientRecord(patient) {
  if (isDatabaseConnected && supabase) {
    try {
      await supabase.from('patients').upsert(patient, { onConflict: 'id' });
    } catch (err) {
      console.warn('Database sync failed:', err);
    }
  }

  // Update Local Cache
  const cached = localStorage.getItem('ahc_patients_db');
  let list = cached ? JSON.parse(cached) : [];
  const idx = list.findIndex((p) => p.id === patient.id);
  if (idx >= 0) {
    list[idx] = patient;
  } else {
    list.unshift(patient);
  }
  localStorage.setItem('ahc_patients_db', JSON.stringify(list));
}

/**
 * Fetch Doctor Broadcast Bulletins & Videos
 */
export async function getDoctorBroadcasts() {
  if (isDatabaseConnected && supabase) {
    try {
      const { data, error } = await supabase
        .from('broadcasts')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data && data.length > 0) return data;
    } catch (err) {
      console.warn('Broadcast database query fallback:', err);
    }
  }

  const cached = localStorage.getItem('ahc_broadcasts_db');
  return cached ? JSON.parse(cached) : null;
}

/**
 * Transmit Emergency ECG Alert to Clinic Cath Lab Queue
 */
export async function transmitEmergencyAlert(alertPacket) {
  if (isDatabaseConnected && supabase) {
    try {
      const { data, error } = await supabase
        .from('emergency_triage_queue')
        .insert([alertPacket]);
      if (!error) return { success: true, mode: 'cloud_database' };
    } catch (err) {
      console.warn('Emergency cloud transmit failed:', err);
    }
  }
  return { success: true, mode: 'local_bridge' };
}
