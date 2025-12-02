// Firestore helper module for Prima Academy (modular SDK)
// Uses the db instance exported from firebase-init.js

import { db } from './firebase-init.js';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  setDoc,
  serverTimestamp,
  increment,
  Timestamp
} from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

class FirebaseDB {
  constructor() {
    this.db = db;
  }

  // Admissions ----------------------------------------------------------------
  async submitAdmission(admissionData) {
    try {
      const ref = await addDoc(collection(this.db, 'admissions'), {
        ...admissionData,
        submittedAt: serverTimestamp(),
        status: admissionData.status || 'Pending',
        reviewed: false
      });
      return { success: true, id: ref.id };
    } catch (error) {
      console.error('Error submitting admission:', error);
      return { success: false, error: error.message };
    }
  }

  async getAdmission(admissionId) {
    try {
      const ref = doc(this.db, 'admissions', admissionId);
      const snap = await getDoc(ref);
      if (snap.exists()) return { success: true, data: snap.data() };
      return { success: false, error: 'Admission not found' };
    } catch (error) {
      console.error('Error getting admission:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllAdmissions() {
    try {
      const q = query(collection(this.db, 'admissions'), orderBy('submittedAt', 'desc'));
      const snap = await getDocs(q);
      const admissions = [];
      snap.forEach((d) => admissions.push({ id: d.id, ...d.data() }));
      return { success: true, data: admissions };
    } catch (error) {
      console.error('Error getting admissions:', error);
      return { success: false, error: error.message };
    }
  }

  async updateAdmissionStatus(admissionId, status) {
    try {
      const normalized =
        status === 'pending'
          ? 'Pending'
          : status === 'approved'
          ? 'Approved'
          : status === 'rejected'
          ? 'Rejected'
          : status;
      const ref = doc(this.db, 'admissions', admissionId);
      await updateDoc(ref, {
        status: normalized,
        reviewedAt: serverTimestamp(),
        reviewed: true
      });
      return { success: true };
    } catch (error) {
      console.error('Error updating admission:', error);
      return { success: false, error: error.message };
    }
  }

  // Contacts ------------------------------------------------------------------
  async submitContact(contactData) {
    try {
      const ref = await addDoc(collection(this.db, 'contacts'), {
        ...contactData,
        submittedAt: serverTimestamp(),
        read: false
      });
      return { success: true, id: ref.id };
    } catch (error) {
      console.error('Error submitting contact:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllContacts() {
    try {
      const q = query(collection(this.db, 'contacts'), orderBy('submittedAt', 'desc'));
      const snap = await getDocs(q);
      const contacts = [];
      snap.forEach((d) => contacts.push({ id: d.id, ...d.data() }));
      return { success: true, data: contacts };
    } catch (error) {
      console.error('Error getting contacts:', error);
      return { success: false, error: error.message };
    }
  }

  // News ----------------------------------------------------------------------
  async getNews(limitNum = 10) {
    try {
      const q = query(
        collection(this.db, 'news'),
        where('status', '==', 'published'),
        orderBy('date', 'desc'),
        limit(limitNum)
      );
      const snap = await getDocs(q);
      const items = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return { success: true, data: items };
    } catch (error) {
      console.error('Error getting news:', error);
      return { success: false, error: error.message };
    }
  }

  // Fallback used in some older code
  async getAllNewsArticles() {
    try {
      const q = query(
        collection(this.db, 'news'),
        where('status', '==', 'published'),
        orderBy('date', 'desc')
      );
      const snap = await getDocs(q);
      const items = [];
      snap.forEach((d) => items.push({ id: d.id, ...d.data() }));
      return { success: true, data: items };
    } catch (error) {
      console.error('Error getting all news articles:', error);
      return { success: false, error: error.message };
    }
  }

  // Gallery & Faculty ---------------------------------------------------------
  async getAllGalleryImages() {
    try {
      const q = query(collection(this.db, 'gallery'), orderBy('uploadDate', 'desc'));
      const snap = await getDocs(q);
      const images = [];
      snap.forEach((d) => images.push({ id: d.id, ...d.data() }));
      return { success: true, data: images };
    } catch (error) {
      console.error('Error getting gallery images:', error);
      return { success: false, error: error.message };
    }
  }

  async getAllFacultyMembers() {
    try {
      const q = query(
        collection(this.db, 'faculty'),
        where('status', '==', 'active'),
        orderBy('name', 'asc')
      );
      const snap = await getDocs(q);
      const members = [];
      snap.forEach((d) => members.push({ id: d.id, ...d.data() }));
      return { success: true, data: members };
    } catch (error) {
      console.error('Error getting faculty members:', error);
      return { success: false, error: error.message };
    }
  }

  // Notifications / Admissions updates ---------------------------------------
  async getAllNotifications() {
    try {
      const q = query(collection(this.db, 'notifications'), orderBy('scheduledFor', 'desc'));
      const snap = await getDocs(q);
      const notifications = [];
      snap.forEach((d) => notifications.push({ id: d.id, ...d.data() }));
      return { success: true, data: notifications };
    } catch (error) {
      console.error('Error getting notifications:', error);
      return { success: false, error: error.message };
    }
  }

  // Analytics -----------------------------------------------------------------
  async trackPageVisit(pageName, additionalData = {}) {
    try {
      const visit = {
        page: pageName,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0],
        userAgent: navigator.userAgent,
        referrer: document.referrer || 'direct',
        ...additionalData
      };
      await addDoc(collection(this.db, 'pageVisits'), visit);

      const today = new Date().toISOString().split('T')[0];
      const counterRef = doc(this.db, 'visitCounters', today);
      await setDoc(
        counterRef,
        { date: today, count: increment(1), lastUpdated: serverTimestamp() },
        { merge: true }
      );

      return { success: true };
    } catch (error) {
      console.error('Error tracking page visit:', error);
      return { success: false, error: error.message };
    }
  }

  async getTotalPageVisits() {
    try {
      const snap = await getDocs(collection(this.db, 'visitCounters'));
      let total = 0;
      snap.forEach((d) => {
        const data = d.data();
        total += data.count || 0;
      });
      return { success: true, count: total };
    } catch (error) {
      console.error('Error getting total page visits:', error);
      return { success: false, error: error.message, count: 0 };
    }
  }

  async getPageVisitsByDateRange(startDate, endDate) {
    try {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      const q = query(
        collection(this.db, 'pageVisits'),
        where('timestamp', '>=', Timestamp.fromDate(start)),
        where('timestamp', '<=', Timestamp.fromDate(end))
      );
      const snap = await getDocs(q);
      const visits = [];
      snap.forEach((d) => visits.push({ id: d.id, ...d.data() }));
      return { success: true, data: visits };
    } catch (error) {
      console.error('Error getting page visits by date range:', error);
      return { success: false, error: error.message, data: [] };
    }
  }

  async getPageVisitsByPage() {
    try {
      const snap = await getDocs(collection(this.db, 'pageVisits'));
      const pageCounts = {};
      snap.forEach((d) => {
        const data = d.data();
        const page = data.page || 'unknown';
        pageCounts[page] = (pageCounts[page] || 0) + 1;
      });
      return { success: true, data: pageCounts };
    } catch (error) {
      console.error('Error getting page visits by page:', error);
      return { success: false, error: error.message, data: {} };
    }
  }
}

// Create and export a shared instance, and also expose globally for existing inline code.
const firebaseDBInstance = new FirebaseDB();
// Note: this assignment is safe in module context; window is available in browser.
if (typeof window !== 'undefined') {
  window.firebaseDBInstance = firebaseDBInstance;
}

export default firebaseDBInstance;


