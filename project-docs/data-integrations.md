
# Data Integrations

## Database Strategy

### Current State: Mock Data Only
**File**: `src/data/mockReports.json`
- Contains 5 sample reports with realistic Algerian locations
- Used for development and UI testing
- No persistence or real data operations

### Planned: Supabase PostgreSQL

#### Core Tables Schema (Planned)

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Reports table
CREATE TABLE public.reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('crime', 'road', 'infrastructure', 'environment')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'resolved')),
  location_lat DECIMAL(10, 8) NOT NULL,
  location_lng DECIMAL(11, 8) NOT NULL,
  location_address TEXT NOT NULL,
  media_urls TEXT[],
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  anonymous BOOLEAN DEFAULT TRUE,
  likes_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Report Likes/Interactions
CREATE TABLE public.report_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(report_id, user_id)
);

-- Report Views (for analytics)
CREATE TABLE public.report_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Row Level Security (RLS) Policies

```sql
-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.report_views ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Reports policies
CREATE POLICY "Anyone can view reports" ON public.reports FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create reports" ON public.reports FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can update own reports" ON public.reports FOR UPDATE USING (auth.uid() = user_id);

-- Likes policies
CREATE POLICY "Anyone can view likes" ON public.report_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can like" ON public.report_likes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Users can delete own likes" ON public.report_likes FOR DELETE USING (auth.uid() = user_id);
```

#### Database Indexes (Performance)

```sql
-- Geographic queries (PostGIS extension recommended)
CREATE INDEX idx_reports_location ON public.reports USING GIST (
  ST_Point(location_lng, location_lat)
);

-- Filtering and sorting
CREATE INDEX idx_reports_category ON public.reports (category);
CREATE INDEX idx_reports_status ON public.reports (status);
CREATE INDEX idx_reports_created_at ON public.reports (created_at DESC);
CREATE INDEX idx_reports_likes_count ON public.reports (likes_count DESC);

-- User-specific queries
CREATE INDEX idx_reports_user_id ON public.reports (user_id);
CREATE INDEX idx_report_likes_user ON public.report_likes (user_id);
```

## File Storage Strategy

### Current State: No Storage
- Media upload UI exists but files aren't saved
- Mock URLs used for development

### Planned: Supabase Storage

#### Storage Buckets
```sql
-- Create storage bucket for report media
INSERT INTO storage.buckets (id, name, public) VALUES ('report-media', 'report-media', true);

-- Storage policies
CREATE POLICY "Anyone can view report media" ON storage.objects FOR SELECT USING (bucket_id = 'report-media');
CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'report-media' AND auth.role() = 'authenticated');
```

#### File Processing Pipeline
1. **Upload**: Direct upload to Supabase Storage
2. **Validation**: File type, size, and content validation
3. **Processing**: Automatic image resizing and optimization
4. **Privacy**: Face and license plate blurring (future feature)
5. **CDN**: Automatic CDN distribution for fast loading

## External Services Integration

### Map Services
- **Current**: Mock map display only
- **Planned**: Mapbox GL JS integration
- **Requirements**: Mapbox API key needed
- **Features**: Interactive maps, geocoding, reverse geocoding

### Notification Services (Future)
- **Email**: Supabase Auth email templates
- **Push**: Web Push API for browser notifications
- **SMS**: Twilio integration for emergency alerts

## Data Migration Strategy

### Development to Production
1. **Schema Migration**: Use Supabase CLI migrations
2. **Data Seeding**: Convert mock data to seed scripts
3. **User Migration**: Plan for username-only auth system
4. **Media Migration**: Batch upload existing mock media

### Backup and Recovery
- **Database**: Automatic Supabase backups
- **Storage**: S3-compatible backup strategy
- **Point-in-time**: Recovery capabilities for data loss

## Analytics and Monitoring

### Application Metrics
- Report submission rates
- User engagement metrics
- Geographic distribution of reports
- Category and status breakdowns

### Performance Monitoring
- Database query performance
- File upload success rates
- API response times
- Error rates and types

### Security Monitoring
- Failed authentication attempts
- Suspicious upload patterns
- Rate limiting violations
- Data access patterns

## Data Privacy Compliance

### User Data Protection
- Minimal data collection (username only)
- Anonymous reporting options
- Automatic data anonymization
- Right to deletion compliance

### Content Protection
- Automatic face blurring
- License plate redaction
- Sensitive information detection
- Content moderation tools

## API Integration Points

### Current Integrations
- **Supabase Client**: Configured but not used
- **React Query**: Set up for data fetching
- **Mock Data**: JSON file serving as temporary API

### Planned Integrations
- **Supabase Auth**: User authentication
- **Supabase Database**: Real-time data operations
- **Supabase Storage**: File upload and management
- **Mapbox**: Geographic services
- **Web Push**: Browser notifications
