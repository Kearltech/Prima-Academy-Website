/**
 * Supabase Configuration
 * Prima Academy Website
 * 
 * This file contains Supabase initialization and configuration
 * 
 * IMPORTANT: These values are safe to expose in client-side code.
 * Security is enforced through Row Level Security (RLS) policies, not API key secrecy.
 * 
 * Get these values from Supabase Dashboard > Project Settings > API
 */

// Supabase configuration constants
// Replace with your actual Supabase project values
export const SUPABASE_URL = "https://mzaraudkhejqvbqaudgr.supabase.co";
export const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16YXJhdWRraGVqcXZicWF1ZGdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDc3NTYsImV4cCI6MjA4MDE4Mzc1Nn0.BI7WS--AWYgYk00OfSY2jdAj6CtWn_cksdKEN8QZ9gs";

// For backward compatibility, also export as SUPABASE_KEY
export const SUPABASE_KEY = SUPABASE_ANON_KEY;

