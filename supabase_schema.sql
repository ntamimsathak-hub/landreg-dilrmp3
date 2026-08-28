-- =========================================================================
-- LandReg (DILRMP 3.0) — Complete Supabase / PostgreSQL Database Schema
-- =========================================================================

-- Enable PostGIS for Cadastral Geo-Spatial & Boundary Polygons
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CITIZEN PROFILES TABLE
CREATE TABLE IF NOT EXISTS citizen_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    aadhaar_last4 VARCHAR(4) NOT NULL,
    address TEXT NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    tehsil VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. DEPARTMENT OFFICER PROFILES TABLE
CREATE TABLE IF NOT EXISTS officer_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    employee_id VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(150) NOT NULL,
    department VARCHAR(200) NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    tehsil_taluk VARCHAR(100) NOT NULL,
    badge_level VARCHAR(50) NOT NULL,
    role VARCHAR(50) DEFAULT 'officer' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. LAND RECORDS (CENTRAL MASTER LEDGER)
CREATE TABLE IF NOT EXISTS land_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    document_number VARCHAR(100) UNIQUE NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    document_type VARCHAR(100) NOT NULL,
    scanned_document_url TEXT NOT NULL,
    upload_date DATE DEFAULT CURRENT_DATE NOT NULL,
    uploaded_by VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'Needs Human Review' NOT NULL,
    overall_confidence NUMERIC(5,2) DEFAULT 0.0,
    unresolved_uncertainties_count INT DEFAULT 0,
    
    -- Extracted Structured Fields
    landowner_name VARCHAR(255) NOT NULL,
    father_husband_name VARCHAR(255),
    survey_number VARCHAR(50) NOT NULL,
    khasra_number VARCHAR(50),
    khata_number VARCHAR(50),
    patta_number VARCHAR(50),
    plot_area_hectares NUMERIC(10,4) NOT NULL,
    plot_area_cents NUMERIC(10,2),
    state VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    tehsil_taluk VARCHAR(100) NOT NULL,
    village VARCHAR(100) NOT NULL,
    land_classification VARCHAR(100) NOT NULL,
    ownership_type VARCHAR(100) NOT NULL,
    mutation_record_id VARCHAR(100),
    registration_number VARCHAR(100),
    registration_year INT,
    boundary_north TEXT,
    boundary_south TEXT,
    boundary_east TEXT,
    boundary_west TEXT,
    
    -- Verification & Security
    qr_verification_code TEXT NOT NULL,
    gis_plot_id VARCHAR(100),
    citizen_aadhaar_last4 VARCHAR(4),
    citizen_mobile VARCHAR(15),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. OCR BOUNDING BOXES & UNCERTAINTY ATTRIBUTES
CREATE TABLE IF NOT EXISTS ocr_bounding_boxes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_id UUID REFERENCES land_records(id) ON DELETE CASCADE,
    field_key VARCHAR(100) NOT NULL,
    label VARCHAR(150) NOT NULL,
    pos_x NUMERIC(6,2) NOT NULL,
    pos_y NUMERIC(6,2) NOT NULL,
    width NUMERIC(6,2) NOT NULL,
    height NUMERIC(6,2) NOT NULL,
    confidence NUMERIC(5,2) NOT NULL,
    confidence_level VARCHAR(20) NOT NULL,
    primary_reading TEXT NOT NULL,
    alternative_readings JSONB DEFAULT '[]'::jsonb,
    is_uncertain BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'ai_predicted',
    user_correction TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. AUDIT TRAIL LOGS
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    record_id UUID REFERENCES land_records(id) ON DELETE CASCADE,
    officer_id VARCHAR(100) NOT NULL,
    officer_name VARCHAR(255) NOT NULL,
    action TEXT NOT NULL,
    field_changed VARCHAR(100),
    old_value TEXT,
    new_value TEXT,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. CADASTRAL GIS PLOTS TABLE (With PostGIS Polygon Geometry)
CREATE TABLE IF NOT EXISTS cadastral_gis_plots (
    id VARCHAR(100) PRIMARY KEY,
    survey_number VARCHAR(50) NOT NULL,
    subdivision_number VARCHAR(50) NOT NULL,
    khasra_number VARCHAR(50),
    owner_name VARCHAR(255) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    area_acres NUMERIC(10,2) NOT NULL,
    land_type VARCHAR(100) NOT NULL,
    lat NUMERIC(10,6) NOT NULL,
    lng NUMERIC(10,6) NOT NULL,
    status VARCHAR(50) DEFAULT 'Verified',
    last_survey_date DATE,
    surveyor_id VARCHAR(100),
    boundary_geom GEOMETRY(Polygon, 4326),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. CITIZEN GRIEVANCES / CORRECTIONS TABLE
CREATE TABLE IF NOT EXISTS grievances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    grievance_number VARCHAR(100) UNIQUE NOT NULL,
    citizen_name VARCHAR(255) NOT NULL,
    citizen_mobile VARCHAR(15) NOT NULL,
    record_id UUID REFERENCES land_records(id) ON DELETE SET NULL,
    survey_number VARCHAR(50) NOT NULL,
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    issue_category VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    attached_file_url TEXT,
    submitted_date DATE DEFAULT CURRENT_DATE NOT NULL,
    status VARCHAR(50) DEFAULT 'Received' NOT NULL,
    assigned_officer VARCHAR(255),
    resolution_remarks TEXT,
    resolution_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. MANIGAR (LAND SURVEYOR & SIZE ACCURACY) TABLE
CREATE TABLE IF NOT EXISTS manigar_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    request_number VARCHAR(100) UNIQUE NOT NULL,
    citizen_id VARCHAR(100) NOT NULL,
    citizen_name VARCHAR(255) NOT NULL,
    citizen_mobile VARCHAR(15) NOT NULL,
    survey_number VARCHAR(50) NOT NULL,
    khasra_number VARCHAR(50),
    village VARCHAR(100) NOT NULL,
    district VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    deed_area_hectares NUMERIC(10,4) NOT NULL,
    measured_area_hectares NUMERIC(10,4),
    area_accuracy_percentage NUMERIC(5,2),
    requested_date DATE DEFAULT CURRENT_DATE NOT NULL,
    scheduled_inspection_date DATE,
    allocated_manigar_name VARCHAR(255),
    allocated_manigar_id VARCHAR(100),
    allocated_manigar_contact VARCHAR(20),
    status VARCHAR(50) DEFAULT 'Requested' NOT NULL,
    inspection_notes TEXT,
    verified_at TIMESTAMP WITH TIME ZONE,
    verified_by_officer VARCHAR(255),
    gps_north_west VARCHAR(50),
    gps_north_east VARCHAR(50),
    gps_south_east VARCHAR(50),
    gps_south_west VARCHAR(50),
    survey_tool_used VARCHAR(100) DEFAULT 'DGPS (Differential GPS)',
    accuracy_tolerance_status VARCHAR(100) DEFAULT 'Pending Measurement',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================
ALTER TABLE land_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE citizen_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE officer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE ocr_bounding_boxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cadastral_gis_plots ENABLE ROW LEVEL SECURITY;
ALTER TABLE grievances ENABLE ROW LEVEL SECURITY;
ALTER TABLE manigar_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access to verified land records (Public Land Ledger)
CREATE POLICY "Public Read Verified Records" ON land_records FOR SELECT USING (true);
CREATE POLICY "Public Read GIS Plots" ON cadastral_gis_plots FOR SELECT USING (true);
CREATE POLICY "Public Read Bounding Boxes" ON ocr_bounding_boxes FOR SELECT USING (true);
CREATE POLICY "Public Read Audit Logs" ON audit_logs FOR SELECT USING (true);
CREATE POLICY "Public Manage Manigar" ON manigar_requests FOR ALL USING (true);
CREATE POLICY "Public Manage Grievances" ON grievances FOR ALL USING (true);

-- =========================================================================
-- SEED SAMPLE DATA (Tamil Nadu, UP, Maharashtra)
-- =========================================================================
INSERT INTO land_records (
    id, document_number, document_title, document_type, scanned_document_url, 
    upload_date, uploaded_by, status, overall_confidence, unresolved_uncertainties_count,
    landowner_name, father_husband_name, survey_number, khasra_number, khata_number, patta_number,
    plot_area_hectares, plot_area_cents, state, district, tehsil_taluk, village, 
    land_classification, ownership_type, mutation_record_id, registration_number, registration_year,
    boundary_north, boundary_south, boundary_east, boundary_west, qr_verification_code, citizen_aadhaar_last4, citizen_mobile
) VALUES (
    '88421000-0000-0000-0000-000000000001',
    'TN/MDU/MLR/2026/88421',
    'Revenue Settlement Deed & Chitta Extract (Form 10)',
    'Patta Deed',
    '/scanned_docs/sample_patta_tamil_nadu.svg',
    '2026-08-20',
    'V. Meenakshi Sundaram (Tahsildar)',
    'Needs Human Review',
    76.40,
    3,
    'K. R. Sundaralingam',
    'Ramasamy Thevar',
    '142/7A',
    '142/7',
    '8842',
    'TN-88421',
    1.8400,
    454.60,
    'Tamil Nadu',
    'Madurai',
    'Melur',
    'Navinipatti',
    'Nanja (Wetland)',
    'Single Owner',
    'MUT-2026-9012',
    'DOC-8821/2025',
    2025,
    'Survey No 141 (Panchayat Channel Road)',
    'Survey No 143/2 (M. Muthiah Land)',
    'Irrigation Canal (Periyar Branch)',
    'Survey No 142/6 (Govt Poramboke)',
    'DILRMP-TN-MDU-88421-V3-VERIFIED-2026',
    '8842',
    '9876543210'
) ON CONFLICT (document_number) DO NOTHING;

INSERT INTO manigar_requests (
    request_number, citizen_id, citizen_name, citizen_mobile,
    survey_number, khasra_number, village, district, state,
    deed_area_hectares, measured_area_hectares, area_accuracy_percentage,
    scheduled_inspection_date, allocated_manigar_name, allocated_manigar_contact,
    status, inspection_notes, verified_by_officer, accuracy_tolerance_status
) VALUES (
    'MNG-TN-MDU-2026-0412',
    'cit-9842',
    'K. R. Sundaralingam',
    '9876543210',
    '142/7A',
    '142/7',
    'Navinipatti',
    'Madurai',
    'Tamil Nadu',
    1.8400,
    1.8380,
    99.89,
    '2026-08-22',
    'P. Muthuramalingam (Senior Manigar / Revenue Surveyor)',
    '+91 98421 77320',
    'Size Accuracy Verified',
    'Physical DGPS roamer survey completed. 1.838 Ha matches deed record within 0.11% variance.',
    'V. Meenakshi Sundaram (Tahsildar Melur)',
    'Within Legal Tolerance (±0.5%)'
) ON CONFLICT (request_number) DO NOTHING;
