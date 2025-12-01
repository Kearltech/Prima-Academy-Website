/**
 * Firebase Database Module (Firestore)
 * Prima Academy Website
 * 
 * Handles all database operations
 */

// Make sure firebase-config.js is loaded before this file

class FirebaseDB {
    constructor() {
        this.db = window.firebaseDb;
    }

    /**
     * Submit admission application
     */
    async submitAdmission(admissionData) {
        try {
            const docRef = await this.db.collection('admissions').add({
                ...admissionData,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
                status: admissionData.status || 'Pending', // Use 'Pending' to match admin dashboard
                reviewed: false
    // Make sure modular initializer exports are used
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
      onSnapshot,
      Timestamp
    } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js';

    class FirebaseDB {
      constructor() {
        this.db = db;
      }

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
          const docRef = doc(this.db, 'admissions', admissionId);
          const snap = await getDoc(docRef);
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
          snap.forEach(d => admissions.push({ id: d.id, ...d.data() }));
          return { success: true, data: admissions };
        } catch (error) {
          console.error('Error getting admissions:', error);
          return { success: false, error: error.message };
        }
      }

      async updateAdmissionStatus(admissionId, status) {
        try {
          const normalized = status === 'pending' ? 'Pending' : status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : status;
          const ref = doc(this.db, 'admissions', admissionId);
          await updateDoc(ref, { status: normalized, reviewedAt: serverTimestamp(), reviewed: true });
          return { success: true };
        } catch (error) {
          console.error('Error updating admission:', error);
          return { success: false, error: error.message };
        }
      }

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
          snap.forEach(d => contacts.push({ id: d.id, ...d.data() }));
          return { success: true, data: contacts };
        } catch (error) {
          console.error('Error getting contacts:', error);
          return { success: false, error: error.message };
        }
      }

      async getNews(limitNum = 10) {
        try {
          const q = query(collection(this.db, 'news'), where('status', '==', 'published'), orderBy('date', 'desc'), limit(limitNum));
          const snap = await getDocs(q);
          const news = [];
          snap.forEach(d => news.push({ id: d.id, ...d.data() }));
          return { success: true, data: news };
        } catch (error) {
          console.error('Error getting news:', error);
          return { success: false, error: error.message };
        }
      }

      async getNewsArticle(newsId) {
        try {
          const ref = doc(this.db, 'news', newsId);
          const snap = await getDoc(ref);
          if (snap.exists()) return { success: true, data: snap.data() };
          return { success: false, error: 'News article not found' };
        } catch (error) {
          console.error('Error getting news article:', error);
          return { success: false, error: error.message };
        }
      }

      async saveNewsArticle(newsData, newsId = null) {
        try {
          const payload = { ...newsData, updatedAt: serverTimestamp() };
          if (newsId) {
            const ref = doc(this.db, 'news', newsId);
            await updateDoc(ref, payload);
            return { success: true, id: newsId };
          } else {
            payload.createdAt = serverTimestamp();
            const ref = await addDoc(collection(this.db, 'news'), payload);
            return { success: true, id: ref.id };
          }
        } catch (error) {
          console.error('Error saving news article:', error);
          return { success: false, error: error.message };
        }
      }

      async getAllGalleryImages() {
        try {
          const q = query(collection(this.db, 'gallery'), orderBy('uploadDate', 'desc'));
          const snap = await getDocs(q);
          const images = [];
          snap.forEach(d => images.push({ id: d.id, ...d.data() }));
          return { success: true, data: images };
        } catch (error) {
          console.error('Error getting gallery images:', error);
          return { success: false, error: error.message };
        }
      }

      async getAllFacultyMembers() {
        try {
          const q = query(collection(this.db, 'faculty'), where('status', '==', 'active'), orderBy('name', 'asc'));
          const snap = await getDocs(q);
          const members = [];
          snap.forEach(d => members.push({ id: d.id, ...d.data() }));
          return { success: true, data: members };
        } catch (error) {
          console.error('Error getting faculty members:', error);
          return { success: false, error: error.message };
        }
      }

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

          // update counter
          const today = new Date().toISOString().split('T')[0];
          const counterRef = doc(this.db, 'visitCounters', today);
          await setDoc(counterRef, { date: today, count: increment(1), lastUpdated: serverTimestamp() }, { merge: true });

          return { success: true };
        } catch (error) {
          console.error('Error tracking page visit:', error);
          return { success: false, error: error.message };
        }
      }

      async getTotalPageVisits() {
        try {
          // Prefer visitCounters aggregation if present
          const snap = await getDocs(collection(this.db, 'visitCounters'));
          let total = 0;
          snap.forEach(d => {
            const data = d.data();
            total += (data.count || 0);
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
          const q = query(collection(this.db, 'pageVisits'), where('timestamp', '>=', Timestamp.fromDate(start)), where('timestamp', '<=', Timestamp.fromDate(end)));
          const snap = await getDocs(q);
          const visits = [];
          snap.forEach(d => visits.push({ id: d.id, ...d.data() }));
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
          snap.forEach(d => {
            const data = d.data();
            const p = data.page || 'unknown';
            pageCounts[p] = (pageCounts[p] || 0) + 1;
          });
          return { success: true, data: pageCounts };
        } catch (error) {
          console.error('Error getting page visits by page:', error);
          return { success: false, error: error.message, data: {} };
        }
      }
    }

    const firebaseDBInstance = new FirebaseDB();
    window.firebaseDBInstance = firebaseDBInstance;

    export default firebaseDBInstance;
        } catch (error) {

