/**
 * Admin Dashboard Configuration
 * Prima Academy Website
 * 
 * Centralized configuration for all admin dashboard settings
 * Modify values here to update the entire admin interface
 */

const AdminConfig = {
    // Application Information
    app: {
        name: 'Prima Academy',
        version: '1.0.0',
        adminEmail: 'admin@primaacademy.edu.gh',
        supportEmail: 'support@primaacademy.edu.gh'
    },

    // Grade Levels (GES Standards)
    gradeLevels: {
        earlyChildhood: ['KG 1', 'KG 2'],
        primary: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
        juniorHigh: ['JHS 1', 'JHS 2', 'JHS 3'],
        getAll: function() {
            return [...this.earlyChildhood, ...this.primary, ...this.juniorHigh];
        },
        getGrouped: function() {
            return {
                'Early Childhood': this.earlyChildhood,
                'Primary School': this.primary,
                'Junior High School': this.juniorHigh
            };
        }
    },

    // Status Options
    status: {
        student: ['Active', 'Inactive', 'Pending', 'Graduated'],
        class: ['Active', 'Inactive', 'Full'],
        instructor: ['Active', 'Inactive', 'On Leave'],
        payment: ['Completed', 'Pending', 'Failed', 'Refunded'],
        admission: ['Pending', 'Approved', 'Rejected', 'Waitlisted'],
        default: 'Active'
    },

    // Days of Week
    daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],

    // Time Settings
    time: {
        defaultStart: '08:00',
        defaultEnd: '15:00',
        defaultDuration: '1 hour',
        timeFormat: '12h', // '12h' or '24h'
        workingHours: {
            start: '08:00',
            end: '15:00'
        }
    },

    // Pagination & Limits
    pagination: {
        itemsPerPage: 10,
        maxItemsPerPage: 100,
        defaultPage: 1
    },

    // Dashboard Settings
    dashboard: {
        recentItemsLimit: 5,
        chartUpdateInterval: 30000, // 30 seconds
        statsRefreshInterval: 60000, // 1 minute
        dateRangePresets: {
            today: 'today',
            week: 'week',
            month: 'month',
            year: 'year',
            all: 'all'
        }
    },

    // Form Validation
    validation: {
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        phone: {
            pattern: /^[\d\s\-\+\(\)]+$/,
            message: 'Please enter a valid phone number'
        },
        name: {
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-Z\s\-'\.]+$/,
            message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, apostrophes, or periods'
        },
        amount: {
            min: 0,
            max: 1000000,
            message: 'Amount must be between 0 and 1,000,000'
        },
        capacity: {
            min: 1,
            max: 100,
            message: 'Class capacity must be between 1 and 100'
        }
    },

    // File Upload Settings
    upload: {
        maxFileSize: 10 * 1024 * 1024, // 10MB in bytes
        allowedImageTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
        allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        maxFilesPerUpload: 5
    },

    // Notification Settings
    notifications: {
        defaultDuration: 5000, // 5 seconds
        maxNotifications: 50,
        position: 'top-right', // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
        types: {
            success: { icon: 'check-circle', color: '#4cc9f0' },
            error: { icon: 'exclamation-circle', color: '#ef233c' },
            warning: { icon: 'exclamation-triangle', color: '#f72585' },
            info: { icon: 'info-circle', color: '#4895ef' }
        }
    },

    // Chart Configuration
    charts: {
        defaultType: 'line',
        availableTypes: ['line', 'bar', 'pie', 'doughnut', 'area'],
        colors: {
            primary: '#4361ee',
            secondary: '#3f37c9',
            success: '#4cc9f0',
            warning: '#f72585',
            info: '#4895ef',
            light: '#f8f9fa',
            dark: '#212529'
        },
        defaultOptions: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    enabled: true
                }
            }
        }
    },

    // Search & Filter Settings
    search: {
        minSearchLength: 2,
        debounceDelay: 300, // milliseconds
        highlightMatches: true
    },

    // Export Settings
    export: {
        defaultFormat: 'png', // 'png', 'jpg', 'pdf'
        imageQuality: 0.9,
        pdfOptions: {
            format: 'A4',
            orientation: 'landscape'
        }
    },

    // Date Formatting
    dateFormat: {
        display: 'MM/DD/YYYY',
        input: 'YYYY-MM-DD',
        time: 'HH:mm',
        datetime: 'MM/DD/YYYY HH:mm'
    },

    // Currency Settings
    currency: {
        symbol: '$',
        code: 'USD',
        position: 'before', // 'before' or 'after'
        decimals: 2,
        thousandSeparator: ',',
        decimalSeparator: '.'
    },

    // GES Subjects Configuration
    gesSubjects: {
        'KG 1': [
            'Language and Literacy',
            'Numeracy',
            'Creative Arts',
            'Environmental Studies',
            'Our World, Our People (OWOP)'
        ],
        'KG 2': [
            'Language and Literacy',
            'Numeracy',
            'Creative Arts',
            'Environmental Studies',
            'Our World, Our People (OWOP)'
        ],
        'P1': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'P2': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'P3': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'P4': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'P5': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'P6': [
            'English Language',
            'Mathematics',
            'Science',
            'History',
            'Creative Arts',
            'Our World, Our People (OWOP)',
            'Religious and Moral Education (RME)',
            'Physical Education',
            'French',
            'Ghanaian Language',
            'Computing'
        ],
        'JHS 1': {
            core: [
                'English Language',
                'Mathematics',
                'Integrated Science',
                'Social Studies',
                'Religious and Moral Education (RME)',
                'Computing (ICT)',
                'Physical Education and Health (PEH)'
            ],
            elective: [
                'Basic Design and Technology (BDT) - Home Economics',
                'Basic Design and Technology (BDT) - Pre-Technical Skills',
                'Basic Design and Technology (BDT) - Visual Arts',
                'Ghanaian Language and Culture',
                'French'
            ]
        },
        'JHS 2': {
            core: [
                'English Language',
                'Mathematics',
                'Integrated Science',
                'Social Studies',
                'Religious and Moral Education (RME)',
                'Computing (ICT)',
                'Physical Education and Health (PEH)'
            ],
            elective: [
                'Basic Design and Technology (BDT) - Home Economics',
                'Basic Design and Technology (BDT) - Pre-Technical Skills',
                'Basic Design and Technology (BDT) - Visual Arts',
                'Ghanaian Language and Culture',
                'French'
            ]
        },
        'JHS 3': {
            core: [
                'English Language',
                'Mathematics',
                'Integrated Science',
                'Social Studies',
                'Religious and Moral Education (RME)',
                'Computing (ICT)',
                'Physical Education and Health (PEH)'
            ],
            elective: [
                'Basic Design and Technology (BDT) - Home Economics',
                'Basic Design and Technology (BDT) - Pre-Technical Skills',
                'Basic Design and Technology (BDT) - Visual Arts',
                'Ghanaian Language and Culture',
                'French'
            ]
        }
    },

    // UI Messages
    messages: {
        success: {
            created: 'has been created successfully.',
            updated: 'has been updated successfully.',
            deleted: 'has been deleted successfully.',
            saved: 'Changes have been saved successfully.'
        },
        error: {
            create: 'Failed to create. Please try again.',
            update: 'Failed to update. Please try again.',
            delete: 'Failed to delete. Please try again.',
            load: 'Failed to load data. Please refresh the page.',
            network: 'Network error. Please check your connection.',
            validation: 'Please check your input and try again.',
            unauthorized: 'You do not have permission to perform this action.'
        },
        confirm: {
            delete: 'Are you sure? This action cannot be undone!',
            unsavedChanges: 'You have unsaved changes. Are you sure you want to leave?',
            logout: 'Are you sure you want to logout?'
        },
        empty: {
            students: 'No students found. Add your first student to get started.',
            classes: 'No classes found. Add your first class to get started.',
            instructors: 'No instructors found. Add your first instructor to get started.',
            schedule: 'No schedule found. Add your first schedule to get started.',
            payments: 'No payments found. Add your first payment to get started.',
            admissions: 'No admission applications found.',
            contacts: 'No contact messages found.'
        }
    },

    // Table Settings
    table: {
        defaultSort: {
            students: { field: 'enrollmentDate', order: 'desc' },
            classes: { field: 'name', order: 'asc' },
            instructors: { field: 'lastName', order: 'asc' },
            schedule: { field: 'day', order: 'asc' },
            payments: { field: 'date', order: 'desc' }
        },
        pageSize: 10,
        showRowNumbers: true
    },

    // Firebase Collections
    collections: {
        students: 'students',
        classes: 'classes',
        instructors: 'instructors',
        schedules: 'schedules',
        payments: 'payments',
        admissions: 'admissions',
        contacts: 'contacts',
        news: 'news',
        events: 'events',
        gallery: 'gallery',
        faculty: 'faculty',
        settings: 'settings',
        users: 'users'
    },

    // Feature Flags
    features: {
        realTimeUpdates: true,
        notifications: true,
        charts: true,
        export: true,
        search: true,
        filters: true,
        darkMode: true,
        userManagement: true,
        auditLog: false
    },

    // Environment Configuration
    environment: {
        development: {
            debug: true,
            logLevel: 'debug',
            apiTimeout: 30000
        },
        production: {
            debug: false,
            logLevel: 'error',
            apiTimeout: 10000
        }
    },

    // Helper Functions
    helpers: {
        formatCurrency: function(amount) {
            const formatted = parseFloat(amount).toFixed(this.currency.decimals);
            const parts = formatted.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.currency.thousandSeparator);
            return this.currency.position === 'before' 
                ? `${this.currency.symbol}${parts.join(this.currency.decimalSeparator)}`
                : `${parts.join(this.currency.decimalSeparator)}${this.currency.symbol}`;
        },

        formatDate: function(date, format = 'display') {
            if (!date) return '';
            const d = new Date(date);
            if (isNaN(d.getTime())) return '';
            
            const formatMap = {
                'display': 'MM/DD/YYYY',
                'input': 'YYYY-MM-DD',
                'datetime': 'MM/DD/YYYY HH:mm'
            };
            
            const fmt = formatMap[format] || format;
            // Simple date formatting (can be enhanced with a library)
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const year = d.getFullYear();
            const hours = String(d.getHours()).padStart(2, '0');
            const minutes = String(d.getMinutes()).padStart(2, '0');
            
            return fmt
                .replace('YYYY', year)
                .replace('MM', month)
                .replace('DD', day)
                .replace('HH', hours)
                .replace('mm', minutes);
        },

        validateEmail: function(email) {
            return this.validation.email.pattern.test(email);
        },

        validatePhone: function(phone) {
            return this.validation.phone.pattern.test(phone);
        },

        validateName: function(name) {
            const length = name.length;
            return length >= this.validation.name.minLength &&
                   length <= this.validation.name.maxLength &&
                   this.validation.name.pattern.test(name);
        }
    }
};

// Make config available globally
if (typeof window !== 'undefined') {
    window.AdminConfig = AdminConfig;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdminConfig;
}

