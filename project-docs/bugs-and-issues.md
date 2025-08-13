
# Bugs and Issues

## 🔴 Critical Bugs

### Navigation Issues (#navigation-bugs)
**File**: `src/components/Header.tsx`
- **Issue**: Emergency call buttons use `window.location.href = tel:` which may not work on all devices
- **Impact**: Emergency functionality unreliable
- **Fix**: Use proper phone link handling with fallback UI

### Form State Management (#form-bugs)
**File**: `src/pages/Report.tsx` (Lines 40-50)
- **Issue**: Multi-step form doesn't persist data when user navigates away
- **Impact**: Users lose progress when accidentally leaving page
- **Fix**: Implement localStorage persistence or form state management

### Mock Data Inconsistency (#data-bugs)
**File**: `src/data/mockReports.json`
- **Issue**: Date formats inconsistent (some ISO, some local)
- **Impact**: Sorting and filtering may break
- **Fix**: Standardize all dates to ISO format

## 🟡 UX Issues

### Loading States (#loading-ux)
**Files**: Multiple components
- **Issue**: No loading states for report submission, likes, or navigation
- **Impact**: Users don't get feedback during actions
- **Fix**: Add loading spinners and skeleton states

### Error Handling (#error-handling)
**Files**: All form components
- **Issue**: No error boundaries or user-friendly error messages
- **Impact**: App crashes aren't handled gracefully
- **Fix**: Implement error boundaries and toast notifications

### Mobile Navigation (#mobile-nav)
**File**: `src/components/Header.tsx` (Lines 25-35)
- **Issue**: Mobile menu doesn't close after navigation
- **Impact**: Poor mobile UX
- **Fix**: Add menu close handler on route change

## 🟢 Minor Issues

### Accessibility (#a11y-gaps)
- Missing alt text on some images
- No keyboard navigation for map interactions
- Color contrast issues in some text areas

### Performance (#perf-minor)
- Large mock data file loaded on every page
- No image optimization or lazy loading
- Unnecessary re-renders in map component

### Code Quality (#code-quality)
**Files**: `src/pages/Dashboard.tsx`, `src/pages/ViewAllReports.tsx`, `src/pages/ReportDetail.tsx`
- **Issue**: Files exceed 300+ lines and should be refactored
- **Impact**: Hard to maintain and debug
- **Fix**: Split into smaller, focused components

## Browser Compatibility
- **Tested**: Chrome, Firefox, Safari (desktop)
- **Not Tested**: IE11, older mobile browsers
- **Known Issues**: RTL layout quirks in older browsers

## Security Considerations
- No input sanitization implemented
- File upload has no type/size validation
- No rate limiting on form submissions
- Mock data exposes potentially sensitive information patterns
