/**
 * Supabase Authentication (ES module)
 * Prima Academy Website
 * 
 * Replaces Firebase Auth with Supabase Auth
 * Uses Supabase SDK methods: signInWithPassword, signOut, getSession
 */

import { supabase } from './supabase-init.js';

class SupabaseAuth {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        if (!supabase) {
            console.warn('Supabase client not initialized');
            return;
        }

        // Listen for auth state changes
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN' && session?.user) {
                this.currentUser = session.user;
                this.onAuthStateChanged(session.user);
            } else if (event === 'SIGNED_OUT') {
                this.currentUser = null;
                this.onAuthStateChanged(null);
            }
        });

        // Check for existing session
        this.checkSession();
    }

    async checkSession() {
        try {
            const { data: { session }, error } = await supabase.auth.getSession();
            if (session?.user) {
                this.currentUser = session.user;
                this.onAuthStateChanged(session.user);
            }
        } catch (error) {
            console.error('Error checking session:', error);
        }
    }

    onAuthStateChanged(user) {
        if (user) {
            console.log('User signed in:', user.email);
            this.updateUIForLoggedIn(user);
        } else {
            console.log('User signed out');
            this.updateUIForLoggedOut();
        }
    }

    async signIn(email, password) {
        try {
            if (!supabase) {
                return { success: false, error: 'Supabase client not initialized' };
            }

            // Sign in with email and password
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password
            });

            if (error) {
                console.error('Sign in error:', error);
                return { success: false, error: this.getErrorMessage(error) };
            }

            if (!data.user) {
                return { success: false, error: 'No user data returned' };
            }

            // Check admin role in users table
            try {
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('role')
                    .eq('id', data.user.id)
                    .single();

                if (userError || !userData) {
                    // User doesn't exist in users table, sign them out
                    await this.signOut();
                    return { success: false, error: 'User account not found. Please contact administrator.' };
                }

                if (userData.role !== 'admin') {
                    // User is not admin, sign them out
                    await this.signOut();
                    return { success: false, error: 'Access denied. Admin privileges required.' };
                }

                this.currentUser = data.user;
                return { success: true, user: data.user };
            } catch (err) {
                console.error('Error checking user role:', err);
                // Allow sign in but warn
                this.currentUser = data.user;
                return { success: true, user: data.user };
            }
        } catch (error) {
            console.error('Sign in error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    async signOut() {
        try {
            if (!supabase) {
                return { success: false, error: 'Supabase client not initialized' };
            }

            const { error } = await supabase.auth.signOut();
            
            if (error) {
                console.error('Sign out error:', error);
                return { success: false, error: this.getErrorMessage(error) };
            }

            this.currentUser = null;
            return { success: true };
        } catch (error) {
            console.error('Sign out error:', error);
            return { success: false, error: this.getErrorMessage(error) };
        }
    }

    async getCurrentUser() {
        try {
            if (!supabase) return null;
            
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error || !user) return null;
            
            this.currentUser = user;
            return user;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    async getSession() {
        try {
            if (!supabase) return null;
            
            const { data: { session }, error } = await supabase.auth.getSession();
            if (error || !session) return null;
            
            return session;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    async isAdmin() {
        if (!this.isAuthenticated()) return false;
        
        try {
            const user = await this.getCurrentUser();
            if (!user) return false;

            const { data: userData, error } = await supabase
                .from('users')
                .select('role')
                .eq('id', user.id)
                .single();

            if (error || !userData) return false;
            return userData.role === 'admin';
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    }

    async requireAuth() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin-login.html';
            return false;
        }
        return true;
    }

    async requireAdmin() {
        if (!this.isAuthenticated()) {
            window.location.href = 'admin-login.html';
            return false;
        }
        const admin = await this.isAdmin();
        if (!admin) {
            alert('Access denied. Admin privileges required.');
            window.location.href = 'index.html';
            return false;
        }
        return true;
    }

    updateUIForLoggedIn(user) {
        const userInfo = document.querySelector('.user-info');
        if (userInfo) {
            const userEmail = userInfo.querySelector('span');
            if (userEmail) userEmail.textContent = user.email;
        }
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) adminDashboard.classList.remove('hidden');
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.add('hidden');
    }

    updateUIForLoggedOut() {
        const loginPage = document.getElementById('loginPage');
        if (loginPage) loginPage.classList.remove('hidden');
        const adminDashboard = document.getElementById('adminDashboard');
        if (adminDashboard) adminDashboard.classList.add('hidden');
    }

    getErrorMessage(error) {
        // Map Supabase auth errors to user-friendly messages
        const errorMessages = {
            'Invalid login credentials': 'Invalid email or password. Please try again.',
            'Email not confirmed': 'Please verify your email address before signing in.',
            'User not found': 'No account found with this email address.',
            'Invalid email': 'Invalid email address format.',
            'Email rate limit exceeded': 'Too many requests. Please try again later.',
            'Signup disabled': 'New account registration is currently disabled.',
            'Email already registered': 'This email is already registered.',
            'Weak password': 'Password should be at least 6 characters.',
            'User already registered': 'This email is already registered.',
            'Token expired': 'Your session has expired. Please sign in again.',
            'Network request failed': 'Network error. Please check your internet connection.'
        };

        // Check for specific error messages
        const errorMessage = error.message || '';
        for (const [key, value] of Object.entries(errorMessages)) {
            if (errorMessage.toLowerCase().includes(key.toLowerCase())) {
                return value;
            }
        }

        // Check for error status codes
        if (error.status === 400) {
            return 'Invalid request. Please check your credentials.';
        } else if (error.status === 401) {
            return 'Invalid email or password. Please try again.';
        } else if (error.status === 429) {
            return 'Too many requests. Please try again later.';
        } else if (error.status >= 500) {
            return 'Server error. Please try again later.';
        }

        return error.message || 'An error occurred. Please try again.';
    }
}

// Create and expose instance
const supabaseAuthInstance = new SupabaseAuth();
window.supabaseAuthInstance = supabaseAuthInstance;

export default supabaseAuthInstance;

