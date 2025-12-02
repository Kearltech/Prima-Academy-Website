# Supabase Database Schema - Phase 2 Complete ✅

**Date:** December 1, 2025  
**Migration Phase:** Phase 2 - Database Schema Creation  
**Status:** ✅ Complete

---

## 📊 Summary

Successfully created all required database tables in Supabase with:
- ✅ UUID primary keys
- ✅ TIMESTAMPTZ for all date fields
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Proper indexes for performance
- ✅ Security policies matching Firebase rules

---

## 📋 Tables Created

### 1. **users** Table
**Purpose:** Admin user management (linked to Supabase Auth)

**Columns:**
- `id` (UUID, PK) - References `auth.users(id)`
- `email` (TEXT, NOT NULL)
- `role` (TEXT, NOT NULL) - CHECK constraint: 'user' or 'admin', default 'user'
- `created_at` (TIMESTAMPTZ, NOT NULL)
- `updated_at` (TIMESTAMPTZ, NOT NULL)
- `last_login` (TIMESTAMPTZ, nullable)

**RLS Policies:**
- ✅ Users can read their own record
- ✅ Admins can read all users
- ✅ Admins can manage users (INSERT, UPDATE, DELETE)

---

### 2. **admissions** Table
**Purpose:** Student admission applications

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `first_name` (TEXT, NOT NULL)
- `last_name` (TEXT, NOT NULL)
- `middle_name` (TEXT, nullable)
- `date_of_birth` (DATE, nullable)
- `gender` (TEXT, nullable)
- `nationality` (TEXT, nullable)
- `home_address` (TEXT, nullable)
- `city` (TEXT, nullable)
- `postal_code` (TEXT, nullable)
- `grade_level` (TEXT, NOT NULL)
- `parent_first_name` (TEXT, NOT NULL)
- `parent_last_name` (TEXT, NOT NULL)
- `relationship` (TEXT, nullable)
- `parent_phone` (TEXT, nullable)
- `parent_email` (TEXT, nullable)
- `parent_occupation` (TEXT, nullable)
- `parent_address` (TEXT, nullable)
- `emergency_name` (TEXT, nullable)
- `emergency_relationship` (TEXT, nullable)
- `emergency_phone` (TEXT, nullable)
- `status` (TEXT, NOT NULL) - CHECK: 'Pending', 'Approved', 'Rejected', 'Waitlisted', default 'Pending'
- `reviewed` (BOOLEAN, NOT NULL) - default FALSE
- `submitted_at` (TIMESTAMPTZ, NOT NULL) - default NOW()
- `reviewed_at` (TIMESTAMPTZ, nullable)
- `document_urls` (JSONB, nullable) - Array of document URLs, default '[]'
- `created_at` (TIMESTAMPTZ, NOT NULL)
- `updated_at` (TIMESTAMPTZ, NOT NULL)

**Indexes:**
- ✅ `idx_admissions_status` on `status`
- ✅ `idx_admissions_submitted_at` on `submitted_at DESC`
- ✅ `idx_admissions_grade_level` on `grade_level`

**RLS Policies:**
- ✅ Public can create admissions (INSERT)
- ✅ **Authenticated users can read admissions** (SELECT) - Requires `auth.uid() IS NOT NULL`
- ✅ Admins can update admissions (UPDATE)
- ✅ Admins can delete admissions (DELETE)

---

### 3. **contacts** Table
**Purpose:** Contact form submissions

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `name` (TEXT, NOT NULL)
- `email` (TEXT, NOT NULL)
- `subject` (TEXT, NOT NULL)
- `message` (TEXT, NOT NULL)
- `read` (BOOLEAN, NOT NULL) - default FALSE
- `submitted_at` (TIMESTAMPTZ, NOT NULL) - default NOW()
- `created_at` (TIMESTAMPTZ, NOT NULL)

**Indexes:**
- ✅ `idx_contacts_submitted_at` on `submitted_at DESC`
- ✅ `idx_contacts_read` on `read`

**RLS Policies:**
- ✅ Public can create contacts (INSERT)
- ✅ Admins can read contacts (SELECT)
- ✅ Admins can update contacts (UPDATE)
- ✅ Admins can delete contacts (DELETE)

---

### 4. **news** Table
**Purpose:** News articles and announcements

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `title` (TEXT, NOT NULL)
- `content` (TEXT, nullable)
- `excerpt` (TEXT, nullable)
- `image_url` (TEXT, nullable)
- `date` (DATE, NOT NULL)
- `status` (TEXT, NOT NULL) - CHECK: 'draft', 'published', 'archived', default 'draft'
- `author` (TEXT, nullable)
- `tags` (TEXT[], nullable) - Array of tags
- `created_at` (TIMESTAMPTZ, NOT NULL)
- `updated_at` (TIMESTAMPTZ, NOT NULL)

**Indexes:**
- ✅ `idx_news_status` on `status`
- ✅ `idx_news_date` on `date DESC`
- ✅ `idx_news_created_at` on `created_at DESC`

**RLS Policies:**
- ✅ **Public can read published news** (SELECT) - Only `status = 'published'`
- ✅ Admins can read all news (SELECT)
- ✅ Admins can manage news (INSERT, UPDATE, DELETE)

---

### 5. **gallery** Table
**Purpose:** Gallery images

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `image_url` (TEXT, NOT NULL)
- `title` (TEXT, nullable)
- `description` (TEXT, nullable)
- `category` (TEXT, nullable)
- `upload_date` (TIMESTAMPTZ, NOT NULL) - default NOW()
- `status` (TEXT, NOT NULL) - CHECK: 'draft', 'published', 'archived', default 'published'
- `created_at` (TIMESTAMPTZ, NOT NULL)
- `updated_at` (TIMESTAMPTZ, NOT NULL)

**Indexes:**
- ✅ `idx_gallery_status` on `status`
- ✅ `idx_gallery_upload_date` on `upload_date DESC`

**RLS Policies:**
- ✅ **Public can read published gallery images** (SELECT) - Only `status = 'published'`
- ✅ Admins can read all gallery images (SELECT)
- ✅ Admins can manage gallery (INSERT, UPDATE, DELETE)

---

### 6. **page_visits** Table
**Purpose:** Track page visits for analytics

**Columns:**
- `id` (UUID, PK) - Auto-generated
- `page` (TEXT, NOT NULL)
- `timestamp` (TIMESTAMPTZ, NOT NULL) - default NOW()
- `date` (DATE, NOT NULL) - default CURRENT_DATE
- `user_agent` (TEXT, nullable)
- `referrer` (TEXT, nullable)
- `additional_data` (JSONB, nullable) - default '{}'
- `created_at` (TIMESTAMPTZ, NOT NULL)

**Indexes:**
- ✅ `idx_page_visits_page` on `page`
- ✅ `idx_page_visits_timestamp` on `timestamp DESC`
- ✅ `idx_page_visits_date` on `date`

**RLS Policies:**
- ✅ Public can insert page visits (INSERT)
- ✅ Admins can read page visits (SELECT)

---

### 7. **visit_counters** Table
**Purpose:** Aggregate visit counters by date

**Columns:**
- `date` (DATE, PK)
- `count` (INTEGER, NOT NULL) - default 0
- `last_updated` (TIMESTAMPTZ, NOT NULL) - default NOW()
- `created_at` (TIMESTAMPTZ, NOT NULL)

**RLS Policies:**
- ✅ Public can insert and update visit counters (INSERT, UPDATE)
- ✅ Public can read visit counters (SELECT)

---

## 🔒 Security Features

### Helper Functions

**`public.is_admin()`**
- Checks if the current authenticated user has admin role
- Used in RLS policies
- Security: `SECURITY DEFINER` with `SET search_path = public` ✅

**`public.update_updated_at_column()`**
- Trigger function to automatically update `updated_at` timestamp
- Security: `SET search_path = public` ✅

### Automatic Triggers

All tables with `updated_at` columns have automatic triggers:
- ✅ `users` - Updates `updated_at` on UPDATE
- ✅ `admissions` - Updates `updated_at` on UPDATE
- ✅ `news` - Updates `updated_at` on UPDATE
- ✅ `gallery` - Updates `updated_at` on UPDATE

---

## 📝 Field Mapping: Firebase → Supabase

### Naming Convention Changes
- Firebase uses camelCase (e.g., `firstName`)
- Supabase uses snake_case (e.g., `first_name`)
- This matches PostgreSQL conventions

### Data Type Changes
- Firebase Timestamps → PostgreSQL `TIMESTAMPTZ`
- Firebase Auto IDs → PostgreSQL `UUID` with `uuid_generate_v4()`
- Firebase Arrays → PostgreSQL Arrays (`TEXT[]`)
- Firebase Objects → PostgreSQL `JSONB`

---

## ✅ Verification

All tables verified:
- ✅ 7 tables created successfully
- ✅ RLS enabled on all tables
- ✅ 20+ RLS policies created
- ✅ 10+ indexes created for performance
- ✅ Security functions properly configured
- ✅ Auto-update triggers working

---

## 🚀 Next Steps (Phase 3+)

1. **Phase 3: Storage Migration**
   - Create Supabase storage buckets
   - Set up storage policies

2. **Phase 4: Authentication Migration**
   - Migrate users from Firebase Auth
   - Set up admin users in `users` table

3. **Phase 5: Code Refactoring**
   - Update JavaScript modules to use Supabase client
   - Map field names (camelCase → snake_case)
   - Update queries to use Supabase syntax

---

## 📚 SQL Migration File

The migration was created as: `create_initial_schema`

You can view it in Supabase Dashboard → Database → Migrations

---

**Migration Status:** ✅ Complete  
**Ready for:** Phase 3 (Storage Migration) and Phase 4 (Auth Migration)

