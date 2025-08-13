
# Configuration and Environment Setup

## Build Configuration

### Vite Configuration
**File**: `vite.config.ts`
```typescript
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

### TypeScript Configuration
**Files**: `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- Strict TypeScript enabled
- Path aliases configured (`@/` maps to `src/`)
- React JSX transform
- ES2022 target

### TailwindCSS Configuration
**File**: `tailwind.config.ts`
- Custom color palette for Arabic theming
- RTL layout support
- Custom design tokens
- Responsive breakpoints
- Dark mode class strategy

## Package Management

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1", 
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "@supabase/supabase-js": "^2.54.0",
  "lucide-react": "^0.462.0"
}
```

### UI Framework
- **shadcn/ui**: Complete component library
- **TailwindCSS**: Utility-first styling
- **Tailwind Animate**: Animation utilities
- **class-variance-authority**: Component variants
- **clsx**: Conditional classes

### Development Tools
- **Vite**: Build tool and dev server
- **TypeScript**: Type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting (implied)

## Environment Variables

### Current Environment Variables
**File**: `.env.local` (not in repo)
```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://iineewmmosoieamczxga.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Development
VITE_DEV_MODE=true
VITE_MOCK_DATA=true
```

### Required Environment Variables (Production)
```bash
# Required for Supabase integration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional for enhanced features  
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_SENTRY_DSN=your_sentry_dsn
VITE_ANALYTICS_ID=your_analytics_id

# Feature flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=false
VITE_ENABLE_NOTIFICATIONS=false
```

### Environment-Specific Configuration
```typescript
// src/config/env.ts (planned)
export const config = {
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
  },
  app: {
    name: "7aniwlou",
    version: "1.0.0",
    environment: import.meta.env.MODE,
    isDevelopment: import.meta.env.DEV,
    isProduction: import.meta.env.PROD,
  },
  features: {
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    enablePWA: import.meta.env.VITE_ENABLE_PWA === 'true',
    enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS === 'true',
  },
  api: {
    mapboxToken: import.meta.env.VITE_MAPBOX_TOKEN,
  }
};
```

## Development Scripts

### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite --host 0.0.0.0 --port 8080",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}
```

### Custom Development Scripts (Planned)
```bash
# Database management
npm run db:reset        # Reset Supabase local database
npm run db:migrate      # Run database migrations  
npm run db:seed         # Seed database with mock data

# Code quality
npm run lint:fix        # Fix ESLint issues
npm run type-check      # Run TypeScript checks
npm run test            # Run unit tests
npm run test:e2e        # Run end-to-end tests

# Build and deployment
npm run build:staging   # Build for staging environment
npm run build:prod      # Build for production
npm run deploy          # Deploy to production
```

## IDE Configuration

### VS Code Settings (Recommended)
**File**: `.vscode/settings.json`
```json
{
  "typescript.preferences.importModuleSpecifier": "relative",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.formatOnSave": true,
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

### Recommended VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Bracket Pair Colorizer
- GitLens
- Thunder Client (API testing)

## Deployment Configuration

### Vercel Configuration
**File**: `vercel.json` (needed)
```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_SUPABASE_URL": "@supabase-url",
    "VITE_SUPABASE_ANON_KEY": "@supabase-anon-key"
  }
}
```

### Netlify Configuration  
**File**: `netlify.toml` (alternative)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

## CI/CD Pipeline (Planned)

### GitHub Actions Workflow
**File**: `.github/workflows/deploy.yml`
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run build
      - run: npm run lint
      - run: npm run type-check
      
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## Security Configuration

### Content Security Policy (Planned)
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://api.mapbox.com;
  style-src 'self' 'unsafe-inline' https://api.mapbox.com;
  img-src 'self' data: https://api.mapbox.com https://*.supabase.co;
  connect-src 'self' https://api.mapbox.com https://*.supabase.co;
  font-src 'self' https://fonts.gstatic.com;
">
```

### Environment Security
- Environment variables never committed to repo
- Sensitive keys stored in Vercel/Netlify dashboard
- Supabase RLS policies for data protection
- API rate limiting through Supabase

## Performance Configuration

### Bundle Optimization
- Tree shaking enabled in Vite
- Code splitting for routes
- Lazy loading for heavy components
- Image optimization for static assets

### Runtime Performance
- React Query for data caching
- Virtualization for large lists
- Debounced search inputs
- Optimized re-renders with React.memo
