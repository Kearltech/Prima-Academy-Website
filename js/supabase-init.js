/**
 * Supabase initialization module (ES module using CDN)
 * Prima Academy Website
 * 
 * Usage in an HTML page:
 * <script type="module">
 *   import { supabase } from './js/supabase-init.js';
 *   // use supabase.auth, supabase.from('table'), etc.
 * </script>
 * 
 * Or for backward compatibility:
 * <script type="module">
 *   import './js/supabase-init.js';
 *   // use window.supabaseClient
 * </script>
 */

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './supabase-config.js';

// Initialize Supabase client
let supabaseClient = null;

try {
    // Create Supabase client instance
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
        }
    });

    // Expose globally for backward compatibility with existing code
    // This allows code that expects window.supabaseClient to work
    if (typeof window !== 'undefined') {
        window.supabaseClient = supabaseClient;
        window.supabase = supabaseClient; // Common alias
        console.log('Supabase client initialized successfully');
    }
} catch (error) {
    console.error('Supabase initialization error:', error);
    console.error('Error details:', {
        message: error.message,
        stack: error.stack
    });
    
    // Set null values to prevent errors in code that checks for supabaseClient
    if (typeof window !== 'undefined') {
        window.supabaseClient = null;
        window.supabase = null;
    }
}

// Export the Supabase client instance
export const supabase = supabaseClient;

// Export individual services for convenience (similar to Firebase pattern)
export const auth = supabaseClient?.auth || null;
export const db = supabaseClient || null; // Supabase client handles both auth and database
export const storage = supabaseClient?.storage || null;

// Default export
export default supabaseClient;

