import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface DashboardStats {
  totalReports: number;
  pendingReports: number;
  resolvedReports: number;
  totalViews: number;
  totalLikes: number;
  userReports: number;
}

interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  created_at: string;
  status: string;
  priority: string;
  media_urls: string[] | null;
  user_id?: string;
  views?: number;
  likes?: number;
}

export const useDashboardData = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    totalViews: 0,
    totalLikes: 0,
    userReports: 0,
  });
  const [recentReports, setRecentReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all reports for general stats
      const { data: reports, error: reportsError } = await supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;

      // Fetch report views count
      const { data: viewsData, error: viewsError } = await supabase
        .from('report_views')
        .select('report_id');

      if (viewsError) throw viewsError;

      // Fetch report likes count
      const { data: likesData, error: likesError } = await supabase
        .from('report_likes')
        .select('report_id');

      if (likesError) throw likesError;

      // Calculate stats
      const totalReports = reports?.length || 0;
      const pendingReports = reports?.filter(r => r.status === 'pending').length || 0;
      const resolvedReports = reports?.filter(r => r.status === 'resolved').length || 0;
      const totalViews = viewsData?.length || 0;
      const totalLikes = likesData?.length || 0;
      const userReports = user ? reports?.filter(r => r.user_id === user.id).length || 0 : 0;

      setStats({
        totalReports,
        pendingReports,
        resolvedReports,
        totalViews,
        totalLikes,
        userReports,
      });

      // Get recent reports with like and view counts
      const reportsWithCounts = await Promise.all(
        (reports || []).slice(0, 5).map(async (report) => {
          // Count views for this report
          const { count: viewCount } = await supabase
            .from('report_views')
            .select('*', { count: 'exact', head: true })
            .eq('report_id', report.id);

          // Count likes for this report
          const { count: likeCount } = await supabase
            .from('report_likes')
            .select('*', { count: 'exact', head: true })
            .eq('report_id', report.id);

          return {
            ...report,
            views: viewCount || 0,
            likes: likeCount || 0,
          };
        })
      );

      setRecentReports(reportsWithCounts);
    } catch (err: any) {
      console.error('Error fetching dashboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Set up real-time subscriptions for reports
    const reportsSubscription = supabase
      .channel('dashboard_reports')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'reports' },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    // Set up real-time subscriptions for likes
    const likesSubscription = supabase
      .channel('dashboard_likes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'report_likes' },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    // Set up real-time subscriptions for views
    const viewsSubscription = supabase
      .channel('dashboard_views')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'report_views' },
        () => {
          fetchDashboardData();
        }
      )
      .subscribe();

    return () => {
      reportsSubscription.unsubscribe();
      likesSubscription.unsubscribe();
      viewsSubscription.unsubscribe();
    };
  }, [user]);

  return {
    stats,
    recentReports,
    loading,
    error,
    refetch: fetchDashboardData,
  };
};