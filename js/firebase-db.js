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
            });
            
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error submitting admission:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get admission by ID
     */
    async getAdmission(admissionId) {
        try {
            const doc = await this.db.collection('admissions').doc(admissionId).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            } else {
                return { success: false, error: 'Admission not found' };
            }
        } catch (error) {
            console.error('Error getting admission:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get all admissions (admin only)
     */
    async getAllAdmissions() {
        try {
            const snapshot = await this.db.collection('admissions')
                .orderBy('submittedAt', 'desc')
                .get();
            
            const admissions = [];
            snapshot.forEach(doc => {
                admissions.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: admissions };
        } catch (error) {
            console.error('Error getting admissions:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Update admission status
     */
    async updateAdmissionStatus(admissionId, status) {
        try {
            // Normalize status to match admin dashboard format
            const normalizedStatus = status === 'pending' ? 'Pending' : 
                                   status === 'approved' ? 'Approved' : 
                                   status === 'rejected' ? 'Rejected' : status;
            
            await this.db.collection('admissions').doc(admissionId).update({
                status: normalizedStatus,
                reviewedAt: firebase.firestore.FieldValue.serverTimestamp(),
                reviewed: true
            });
            
            return { success: true };
        } catch (error) {
            console.error('Error updating admission:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Submit contact form
     */
    async submitContact(contactData) {
        try {
            const docRef = await this.db.collection('contacts').add({
                ...contactData,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp(),
                read: false
            });
            
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error submitting contact:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get all contacts (admin only)
     */
    async getAllContacts() {
        try {
            const snapshot = await this.db.collection('contacts')
                .orderBy('submittedAt', 'desc')
                .get();
            
            const contacts = [];
            snapshot.forEach(doc => {
                contacts.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: contacts };
        } catch (error) {
            console.error('Error getting contacts:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get news articles
     */
    async getNews(limit = 10) {
        try {
            const snapshot = await this.db.collection('news')
                .where('status', '==', 'published')
                .orderBy('date', 'desc')
                .limit(limit)
                .get();
            
            const news = [];
            snapshot.forEach(doc => {
                news.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: news };
        } catch (error) {
            console.error('Error getting news:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get single news article
     */
    async getNewsArticle(newsId) {
        try {
            const doc = await this.db.collection('news').doc(newsId).get();
            if (doc.exists) {
                return { success: true, data: doc.data() };
            } else {
                return { success: false, error: 'News article not found' };
            }
        } catch (error) {
            console.error('Error getting news article:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create/Update news article (admin only)
     */
    async saveNewsArticle(newsData, newsId = null) {
        try {
            const newsDoc = {
                ...newsData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            if (newsId) {
                await this.db.collection('news').doc(newsId).update(newsDoc);
                return { success: true, id: newsId };
            } else {
                newsDoc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                const docRef = await this.db.collection('news').add(newsDoc);
                return { success: true, id: docRef.id };
            }
        } catch (error) {
            console.error('Error saving news article:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get events
     */
    async getEvents(startDate = null, endDate = null) {
        try {
            let query = this.db.collection('events')
                .where('status', '==', 'published');
            
            if (startDate) {
                query = query.where('startDate', '>=', startDate);
            }
            
            if (endDate) {
                query = query.where('endDate', '<=', endDate);
            }
            
            query = query.orderBy('startDate', 'asc');
            
            const snapshot = await query.get();
            
            const events = [];
            snapshot.forEach(doc => {
                events.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: events };
        } catch (error) {
            console.error('Error getting events:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Create/Update event (admin only)
     */
    async saveEvent(eventData, eventId = null) {
        try {
            const eventDoc = {
                ...eventData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            if (eventId) {
                await this.db.collection('events').doc(eventId).update(eventDoc);
                return { success: true, id: eventId };
            } else {
                eventDoc.createdAt = firebase.firestore.FieldValue.serverTimestamp();
                const docRef = await this.db.collection('events').add(eventDoc);
                return { success: true, id: docRef.id };
            }
        } catch (error) {
            console.error('Error saving event:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get website settings
     */
    async getSettings() {
        try {
            const settingsDoc = await this.db.collection('settings').doc('website').get();
            if (settingsDoc.exists) {
                return { success: true, data: settingsDoc.data() };
            } else {
                return { success: true, data: {} };
            }
        } catch (error) {
            console.error('Error getting settings:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Update website settings (admin only)
     */
    async updateSettings(settings) {
        try {
            await this.db.collection('settings').doc('website').set({
                ...settings,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
            
            return { success: true };
        } catch (error) {
            console.error('Error updating settings:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get gallery images
     */
    async getGallery(category = 'all', limit = 20) {
        try {
            let query = this.db.collection('gallery')
                .where('status', '==', 'published');
            
            if (category !== 'all') {
                query = query.where('category', '==', category);
            }
            
            query = query.orderBy('uploadDate', 'desc').limit(limit);
            
            const snapshot = await query.get();
            
            const images = [];
            snapshot.forEach(doc => {
                images.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: images };
        } catch (error) {
            console.error('Error getting gallery:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Get faculty members
     */
    async getFaculty() {
        try {
            const snapshot = await this.db.collection('faculty')
                .where('status', '==', 'active')
                .orderBy('name', 'asc')
                .get();
            
            const faculty = [];
            snapshot.forEach(doc => {
                faculty.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            return { success: true, data: faculty };
        } catch (error) {
            console.error('Error getting faculty:', error);
            return { success: false, error: error.message };
        }
    }

    // ========== STUDENTS CRUD ==========
    async addStudent(studentData) {
        try {
            const docRef = await this.db.collection('students').add({
                ...studentData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding student:', error);
            return { success: false, error: error.message };
        }
    }

    async updateStudent(studentId, studentData) {
        try {
            await this.db.collection('students').doc(studentId).update({
                ...studentData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating student:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteStudent(studentId) {
        try {
            await this.db.collection('students').doc(studentId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting student:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllStudents() {
        try {
            const snapshot = await this.db.collection('students')
                .orderBy('enrollmentDate', 'desc')
                .get();
            
            const students = [];
            snapshot.forEach(doc => {
                students.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, data: students };
        } catch (error) {
            console.error('Error getting students:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for students
    onStudentsUpdate(callback) {
        return this.db.collection('students')
            .orderBy('enrollmentDate', 'desc')
            .onSnapshot((snapshot) => {
                const students = [];
                snapshot.forEach(doc => {
                    students.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: students });
            }, (error) => {
                console.error('Error in students listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // ========== CLASSES CRUD ==========
    async addClass(classData) {
        try {
            const docRef = await this.db.collection('classes').add({
                ...classData,
                students: classData.students || 0,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding class:', error);
            return { success: false, error: error.message };
        }
    }

    async updateClass(classId, classData) {
        try {
            await this.db.collection('classes').doc(classId).update({
                ...classData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating class:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteClass(classId) {
        try {
            await this.db.collection('classes').doc(classId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting class:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllClasses() {
        try {
            const snapshot = await this.db.collection('classes')
                .orderBy('name', 'asc')
                .get();
            
            const classes = [];
            snapshot.forEach(doc => {
                classes.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, data: classes };
        } catch (error) {
            console.error('Error getting classes:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for classes
    onClassesUpdate(callback) {
        return this.db.collection('classes')
            .orderBy('name', 'asc')
            .onSnapshot((snapshot) => {
                const classes = [];
                snapshot.forEach(doc => {
                    classes.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: classes });
            }, (error) => {
                console.error('Error in classes listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // ========== INSTRUCTORS CRUD ==========
    async addInstructor(instructorData) {
        try {
            const docRef = await this.db.collection('instructors').add({
                ...instructorData,
                classes: instructorData.classes || [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding instructor:', error);
            return { success: false, error: error.message };
        }
    }

    async updateInstructor(instructorId, instructorData) {
        try {
            await this.db.collection('instructors').doc(instructorId).update({
                ...instructorData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating instructor:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteInstructor(instructorId) {
        try {
            await this.db.collection('instructors').doc(instructorId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting instructor:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllInstructors() {
        try {
            const snapshot = await this.db.collection('instructors')
                .orderBy('lastName', 'asc')
                .get();
            
            const instructors = [];
            snapshot.forEach(doc => {
                instructors.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, data: instructors };
        } catch (error) {
            console.error('Error getting instructors:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for instructors
    onInstructorsUpdate(callback) {
        return this.db.collection('instructors')
            .orderBy('lastName', 'asc')
            .onSnapshot((snapshot) => {
                const instructors = [];
                snapshot.forEach(doc => {
                    instructors.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: instructors });
            }, (error) => {
                console.error('Error in instructors listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // ========== SCHEDULE CRUD ==========
    async addSchedule(scheduleData) {
        try {
            const docRef = await this.db.collection('schedules').add({
                ...scheduleData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding schedule:', error);
            return { success: false, error: error.message };
        }
    }

    async updateSchedule(scheduleId, scheduleData) {
        try {
            await this.db.collection('schedules').doc(scheduleId).update({
                ...scheduleData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating schedule:', error);
            return { success: false, error: error.message };
        }
    }

    async deleteSchedule(scheduleId) {
        try {
            await this.db.collection('schedules').doc(scheduleId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting schedule:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllSchedules() {
        try {
            const snapshot = await this.db.collection('schedules')
                .orderBy('day', 'asc')
                .orderBy('startTime', 'asc')
                .get();
            
            const schedules = [];
            snapshot.forEach(doc => {
                schedules.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, data: schedules };
        } catch (error) {
            console.error('Error getting schedules:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for schedules
    onSchedulesUpdate(callback) {
        return this.db.collection('schedules')
            .orderBy('day', 'asc')
            .orderBy('startTime', 'asc')
            .onSnapshot((snapshot) => {
                const schedules = [];
                snapshot.forEach(doc => {
                    schedules.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: schedules });
            }, (error) => {
                console.error('Error in schedules listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // ========== PAYMENTS CRUD ==========
    async addPayment(paymentData) {
        try {
            const docRef = await this.db.collection('payments').add({
                ...paymentData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true, id: docRef.id };
        } catch (error) {
            console.error('Error adding payment:', error);
            return { success: false, error: error.message };
        }
    }

    async updatePayment(paymentId, paymentData) {
        try {
            await this.db.collection('payments').doc(paymentId).update({
                ...paymentData,
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            return { success: true };
        } catch (error) {
            console.error('Error updating payment:', error);
            return { success: false, error: error.message };
        }
    }

    async deletePayment(paymentId) {
        try {
            await this.db.collection('payments').doc(paymentId).delete();
            return { success: true };
        } catch (error) {
            console.error('Error deleting payment:', error);
            return { success: false, error: error.message };
        }
    }

    async getAllPayments() {
        try {
            const snapshot = await this.db.collection('payments')
                .orderBy('date', 'desc')
                .get();
            
            const payments = [];
            snapshot.forEach(doc => {
                payments.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            return { success: true, data: payments };
        } catch (error) {
            console.error('Error getting payments:', error);
            return { success: false, error: error.message };
        }
    }

    // Real-time listener for payments
    onPaymentsUpdate(callback) {
        return this.db.collection('payments')
            .orderBy('date', 'desc')
            .onSnapshot((snapshot) => {
                const payments = [];
                snapshot.forEach(doc => {
                    payments.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: payments });
            }, (error) => {
                console.error('Error in payments listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // Real-time listener for admissions
    onAdmissionsUpdate(callback) {
        return this.db.collection('admissions')
            .orderBy('submittedAt', 'desc')
            .onSnapshot((snapshot) => {
                const admissions = [];
                snapshot.forEach(doc => {
                    admissions.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: admissions });
            }, (error) => {
                console.error('Error in admissions listener:', error);
                callback({ success: false, error: error.message });
            });
    }

    // Real-time listener for contacts
    onContactsUpdate(callback) {
        return this.db.collection('contacts')
            .orderBy('submittedAt', 'desc')
            .onSnapshot((snapshot) => {
                const contacts = [];
                snapshot.forEach(doc => {
                    contacts.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                callback({ success: true, data: contacts });
            }, (error) => {
                console.error('Error in contacts listener:', error);
                callback({ success: false, error: error.message });
            });
    }
}

// Initialize Firebase DB
let firebaseDB;
if (typeof window !== 'undefined' && window.firebaseDb) {
    firebaseDB = new FirebaseDB();
    window.firebaseDBInstance = firebaseDB;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FirebaseDB;
}

