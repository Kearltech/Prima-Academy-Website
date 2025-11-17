# Prima Academy Website - Project Structure

## 📁 Current Folder Structure

```
prima-academy-website/
│
├── 📄 Documentation Files
│   ├── README.md                    # Project overview and setup
│   ├── ANALYSIS_REPORT.md           # Comprehensive code analysis
│   ├── ACTION_PLAN.md               # Development roadmap
│   ├── PROJECT_STRUCTURE.md        # This file
│   └── .gitignore                   # Git ignore rules
│
├── 🎨 CSS Folder (to be populated)
│   ├── components/                  # Component-specific styles
│   │   └── .gitkeep
│   ├── utilities/                   # Utility classes
│   │   └── .gitkeep
│   ├── main.css                     # Main stylesheet (to be created)
│   └── .gitkeep
│
├── 📜 JavaScript Folder (to be populated)
│   ├── components/                  # Component scripts
│   │   └── .gitkeep
│   ├── utils/                       # Utility functions
│   │   └── .gitkeep
│   ├── main.js                      # Main JavaScript file (to be created)
│   └── .gitkeep
│
├── 🖼️ Images Folder
│   └── media/                        # Media files
│       ├── logo.png                 # School logo
│       └── landpage.jpg             # Landing page image
│
├── 📦 Assets Folder
│   └── fonts/                       # Custom fonts (if any)
│       └── .gitkeep
│
├── 📄 Pages Folder (optional)
│   └── .gitkeep                     # HTML pages can be moved here
│
├── 📚 Docs Folder
│   ├── ANALYSIS_REPORT.md           # Moved from root
│   └── ACTION_PLAN.md               # Moved from root
│
├── 🌐 HTML Pages (Root Level)
│   ├── index.html                   # Homepage
│   ├── admission.html               # Admissions page
│   ├── primary.html                 # Primary school program
│   ├── middle.html                  # Middle school program
│   ├── high.html                    # High school program
│   ├── extracurricular.html         # Extracurricular activities
│   ├── news.html                    # News & events
│   ├── admin.html                   # Admin panel
│   └── main.html                    # ⚠️ Review needed (duplicate?)
│
└── ⚠️ Files to Review
    ├── app.js                       # ❌ Contains React Native code (inappropriate)
    └── main.html                    # ⚠️ Duplicate of index.html?
```

## 📋 Folder Purposes

### `/css`
**Purpose**: All stylesheet files  
**Contents**:
- `main.css` - Main stylesheet (to be extracted from HTML)
- `components/` - Component-specific styles (header, footer, forms, etc.)
- `utilities/` - Utility classes (spacing, typography, etc.)

### `/js`
**Purpose**: All JavaScript files  
**Contents**:
- `main.js` - Main JavaScript file (to be extracted from HTML)
- `components/` - Component scripts (navigation, forms, modals, etc.)
- `utils/` - Utility functions (helpers, validators, etc.)

### `/images`
**Purpose**: All image assets  
**Contents**:
- `media/` - Media files (logos, photos, banners)
- Currently contains: `logo.png`, `landpage.jpg`

### `/assets`
**Purpose**: Additional static assets  
**Contents**:
- `fonts/` - Custom font files (if any)

### `/pages`
**Purpose**: Optional organization for HTML files  
**Note**: Moving HTML files here would require updating all internal links

### `/docs`
**Purpose**: Project documentation  
**Contents**:
- Analysis reports
- Action plans
- Development guides

## 🔄 Migration Plan

### Phase 1: CSS Extraction (Next Step)
1. Extract CSS from all HTML files
2. Create `css/main.css` with common styles
3. Create component CSS files in `css/components/`
4. Update all HTML files to link external CSS

### Phase 2: JavaScript Extraction
1. Extract JavaScript from all HTML files
2. Create `js/main.js` with common functionality
3. Create component JS files in `js/components/`
4. Update all HTML files to link external JS

### Phase 3: File Organization (Optional)
1. Move HTML files to `pages/` folder
2. Update all internal links
3. Configure web server routing (if needed)

## 📝 File Organization Best Practices

### CSS Organization
```
css/
├── main.css                    # Base styles, variables, reset
├── components/
│   ├── header.css
│   ├── footer.css
│   ├── forms.css
│   ├── modals.css
│   └── navigation.css
└── utilities/
    ├── spacing.css
    ├── typography.css
    └── colors.css
```

### JavaScript Organization
```
js/
├── main.js                     # Main app initialization
├── components/
│   ├── navigation.js
│   ├── forms.js
│   ├── modals.js
│   ├── gallery.js
│   └── calendar.js
└── utils/
    ├── validators.js
    ├── helpers.js
    └── api.js
```

## 🎯 Next Steps

1. ✅ Create folder structure - **COMPLETED**
2. ⏳ Extract CSS to external files
3. ⏳ Extract JavaScript to external files
4. ⏳ Remove/fix inappropriate files (app.js)
5. ⏳ Review and organize remaining files

## 📊 Current File Count

- **HTML Files**: 9
- **CSS Files**: 0 (all inline in HTML)
- **JavaScript Files**: 1 (app.js - needs review)
- **Image Files**: 2
- **Documentation Files**: 4

## 🔍 File Status

### ✅ Ready to Use
- `index.html` - Main homepage
- `admission.html` - Admissions form (fixed)
- `primary.html` - Primary school page
- `middle.html` - Middle school page
- `high.html` - High school page
- `extracurricular.html` - Extracurricular page
- `news.html` - News page
- `admin.html` - Admin panel

### ⚠️ Needs Review
- `main.html` - Appears to be duplicate/simplified version
- `app.js` - Contains React Native code (inappropriate for website)

### 📁 New Structure
- All folders created and ready for content
- `.gitkeep` files added to preserve empty directories
- Documentation files created

---

**Last Updated**: $(date)
**Status**: Folder structure created, ready for CSS/JS extraction

