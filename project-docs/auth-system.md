
# Authentication System

## Current Implementation Status: UI Only

### What Exists
**File**: `src/pages/Auth.tsx`
- Login/signup form UI with username/password fields
- Tab switching between login and registration
- Form validation (client-side only)
- Password visibility toggles
- Loading states for forms
- Mock authentication flow using localStorage

### What's Missing
- Actual Supabase authentication integration
- Session management
- Protected routes
- User profile creation
- Password reset functionality

## Planned Authentication Flow

### User Registration
```typescript
// Planned implementation
const signUp = async (username: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: `${username}@haniwlou.local`, // Workaround for username-only auth
    password,
    options: {
      data: {
        username,
        display_name: username
      }
    }
  });
  
  if (!error) {
    // Create profile in public.profiles table
    await supabase.from('profiles').insert({
      id: data.user?.id,
      username
    });
  }
  
  return { data, error };
};
```

### User Login
```typescript
// Planned implementation  
const signIn = async (username: string, password: string) => {
  // Since Supabase requires email, we'll need to lookup username->email mapping
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .single();
    
  if (profile) {
    const email = `${username}@haniwlou.local`;
    return await supabase.auth.signInWithPassword({ email, password });
  }
  
  return { error: { message: 'User not found' } };
};
```

### Session Management
```typescript
// Auth context provider (planned)
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

## User Roles and Permissions

### Role System (Planned)
```sql
-- User roles enum
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');

-- Add role to profiles table
ALTER TABLE public.profiles ADD COLUMN role user_role DEFAULT 'user';

-- Role-based RLS policies
CREATE POLICY "Moderators can update report status" ON public.reports 
FOR UPDATE USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND role IN ('moderator', 'admin')
  )
);
```

### Permission Levels
1. **Anonymous Users**
   - View reports and map
   - Cannot submit reports
   - Cannot like or interact

2. **Registered Users** (`user` role)
   - All anonymous permissions
   - Submit reports (anonymous or with username)
   - Like/unlike reports
   - View own report history

3. **Moderators** (`moderator` role)
   - All user permissions
   - Update report status (pending → verified → resolved)
   - Hide inappropriate reports
   - View moderation dashboard

4. **Admins** (`admin` role)
   - All moderator permissions
   - User management
   - System configuration
   - Analytics access

## Protected Routes Implementation

### Route Guards (Planned)
```typescript
// Protected route component
const ProtectedRoute = ({ children, requireAuth = true, allowRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <LoadingSpinner />;
  
  if (requireAuth && !user) {
    return <Navigate to="/auth" replace />;
  }
  
  if (allowRoles.length > 0) {
    // Check user role from profile
    const hasPermission = useQuery({
      queryKey: ['userRole', user?.id],
      queryFn: async () => {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user?.id)
          .single();
        return allowRoles.includes(data?.role);
      },
      enabled: !!user
    });
    
    if (!hasPermission.data) {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};
```

### Route Configuration
```typescript
// App router with protected routes
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="/report" element={
    <ProtectedRoute requireAuth={true}>
      <Report />
    </ProtectedRoute>
  } />
  <Route path="/dashboard" element={
    <ProtectedRoute requireAuth={true}>
      <Dashboard />
    </ProtectedRoute>
  } />
  <Route path="/admin" element={
    <ProtectedRoute requireAuth={true} allowRoles={['admin', 'moderator']}>
      <AdminDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

## Security Considerations

### Password Security
- Minimum 6 characters (currently enforced in UI)
- No maximum length restriction
- Supabase handles hashing and salting
- Password reset via email (future implementation)

### Session Security
- JWT tokens managed by Supabase
- Automatic token refresh
- Secure httpOnly cookies option
- Session timeout configuration

### Anonymous Reporting Protection
- Reports can be submitted without authentication
- IP address tracking for abuse prevention
- Rate limiting on anonymous submissions
- No user identification stored with anonymous reports

### Data Privacy
- Username-only registration (no email required for users)
- Optional anonymous reporting
- Automatic user data cleanup options
- GDPR-style data export/deletion

## Integration Points

### Current Header Component
**File**: `src/components/Header.tsx`
- Shows login/logout buttons
- User profile dropdown (not functional)
- Needs integration with real auth state

### Current Auth Page
**File**: `src/pages/Auth.tsx`
- Complete UI for login/signup
- Form validation
- Loading states
- Needs backend integration

### Mock Authentication (Current)
```typescript
// Current mock implementation in Auth.tsx
const handleLogin = async (e: React.FormEvent) => {
  // Simulates login with localStorage
  localStorage.setItem("user", JSON.stringify({ username }));
  toast({ title: "تم تسجيل الدخول بنجاح" });
  navigate("/dashboard");
};
```

## Migration Strategy

### Phase 1: Basic Auth
1. Set up Supabase auth configuration
2. Implement username → email mapping
3. Connect login/signup forms to Supabase
4. Add session state management

### Phase 2: Enhanced Security
1. Implement protected routes
2. Add role-based access control
3. Set up proper error handling
4. Add password reset functionality

### Phase 3: Advanced Features
1. Social login options (optional)
2. Two-factor authentication
3. Account verification system
4. Advanced session management
