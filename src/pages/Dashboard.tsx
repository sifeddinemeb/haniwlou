import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Users, 
  Phone,
  Plus,
  BarChart3,
  MapPin,
  Eye,
  Heart
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useDashboardData } from "@/hooks/useDashboardData";
import ErrorBoundary from "@/components/ErrorBoundary";
import LoadingSpinner from "@/components/LoadingSpinner";
import SkeletonCard from "@/components/SkeletonCard";
import { useAuth } from "@/hooks/useAuth";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, recentReports, loading, error, refetch } = useDashboardData();

  const handleEmergencyCall = (number: string) => {
    // Check if we're on mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // On mobile, try to open phone dialer
      window.location.href = `tel:${number}`;
    } else {
      // On desktop, show a message or copy number to clipboard
      navigator.clipboard.writeText(number).then(() => {
        // You could add a toast notification here
        alert(`تم نسخ الرقم ${number} إلى الحافظة`);
      }).catch(() => {
        // Fallback: show the number
        alert(`رقم الطوارئ: ${number}`);
      });
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "crime": return <AlertTriangle className="h-4 w-4" />;
      case "road": return <MapPin className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "crime": return "جريمة";
      case "road": return "طريق";
      case "infrastructure": return "بنية تحتية";
      case "environment": return "بيئة";
      default: return "أخرى";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved": return "text-green-600";
      case "verified": return "text-blue-600";
      default: return "text-yellow-600";
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              حدث خطأ أثناء تحميل البيانات: {error}
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 mr-2"
                onClick={refetch}
              >
                المحاولة مرة أخرى
              </Button>
            </AlertDescription>
          </Alert>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background" dir="rtl">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  لوحة التحكم
                </h1>
                <p className="text-muted-foreground">
                  مراقبة التبليغات والإحصائيات في مجتمعك
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
                <Button 
                  onClick={() => navigate("/report")}
                  className="btn-hero"
                  size="lg"
                >
                  <Plus className="ml-2 h-5 w-5" />
                  تبليغ جديد
                </Button>
              </div>
            </div>

            {/* Emergency Quick Actions */}
            <Card className="mb-8 bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <Phone className="ml-2 h-5 w-5" />
                  مكالمات الطوارئ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant="destructive"
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => handleEmergencyCall("17")}
                  >
                    <Phone className="ml-2 h-5 w-5" />
                    <div className="text-right">
                      <div className="font-bold">الشرطة</div>
                      <div className="text-sm opacity-90">17 أو 1548</div>
                    </div>
                  </Button>
                  <Button
                    variant="destructive"
                    size="lg"
                    className="w-full justify-start"
                    onClick={() => handleEmergencyCall("14")}
                  >
                    <Phone className="ml-2 h-5 w-5" />
                    <div className="text-right">
                      <div className="font-bold">الإسعاف / الحماية المدنية</div>
                      <div className="text-sm opacity-90">14 أو 1021</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
              {loading ? (
                <>
                  <SkeletonCard variant="stat" />
                  <SkeletonCard variant="stat" />
                  <SkeletonCard variant="stat" />
                  <SkeletonCard variant="stat" />
                  <SkeletonCard variant="stat" />
                  <SkeletonCard variant="stat" />
                </>
              ) : (
                <>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            إجمالي التبليغات
                          </p>
                          <div className="text-2xl font-bold">{stats.totalReports}</div>
                        </div>
                        <BarChart3 className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            قيد المراجعة
                          </p>
                          <div className="text-2xl font-bold text-yellow-600">
                            {stats.pendingReports}
                          </div>
                        </div>
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            تم الحل
                          </p>
                          <div className="text-2xl font-bold text-green-600">
                            {stats.resolvedReports}
                          </div>
                        </div>
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            إجمالي المشاهدات
                          </p>
                          <div className="text-2xl font-bold">{stats.totalViews}</div>
                        </div>
                        <Eye className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">
                            إجمالي الإعجابات
                          </p>
                          <div className="text-2xl font-bold">{stats.totalLikes}</div>
                        </div>
                        <Heart className="h-8 w-8 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>

                  {user && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">
                              تبليغاتي
                            </p>
                            <div className="text-2xl font-bold text-primary">
                              {stats.userReports}
                            </div>
                          </div>
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Reports */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center">
                        <TrendingUp className="ml-2 h-5 w-5" />
                        أحدث التبليغات
                      </CardTitle>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate("/reports")}
                      >
                        عرض الكل
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(5)].map((_, i) => (
                          <SkeletonCard key={i} variant="report" />
                        ))}
                      </div>
                    ) : recentReports.length === 0 ? (
                      <div className="text-center py-8">
                        <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-muted-foreground">لا توجد تبليغات حتى الآن</p>
                        <Button 
                          variant="outline" 
                          className="mt-4"
                          onClick={() => navigate("/report")}
                        >
                          إضافة أول تبليغ
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {recentReports.map((report) => (
                          <div 
                            key={report.id}
                            className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-muted/50 cursor-pointer transition-colors"
                            onClick={() => navigate(`/report/${report.id}`)}
                          >
                            <div className="flex-shrink-0">
                              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                {getCategoryIcon(report.category)}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-xs">
                                  {getCategoryLabel(report.category)}
                                </Badge>
                                <div className={`text-xs ${getStatusColor(report.status)}`}>
                                  {report.status === "resolved" ? "✅ تم الحل" : 
                                   report.status === "verified" ? "✓ مؤكد" : "⏳ قيد المراجعة"}
                                </div>
                              </div>
                              <h3 className="font-medium text-sm mb-1 text-right">
                                {report.title}
                              </h3>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{new Date(report.created_at).toLocaleDateString('ar-DZ')}</span>
                                <span>{report.views || 0} مشاهدة</span>
                                <span>{report.likes || 0} إعجاب</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions & Stats */}
              <div className="space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="ml-2 h-5 w-5" />
                      إجراءات سريعة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/reports")}
                    >
                      <BarChart3 className="ml-2 h-4 w-4" />
                      عرض جميع التبليغات
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/report")}
                    >
                      <Plus className="ml-2 h-4 w-4" />
                      إضافة تبليغ جديد
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => navigate("/")}
                    >
                      <MapPin className="ml-2 h-4 w-4" />
                      عرض الخريطة
                    </Button>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>توزيع التبليغات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="space-y-3">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <SkeletonCard />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {Object.entries(
                          recentReports.reduce((acc, report) => {
                            acc[report.category] = (acc[report.category] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {getCategoryIcon(category)}
                              <span className="text-sm">{getCategoryLabel(category)}</span>
                            </div>
                            <Badge variant="secondary">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default Dashboard;