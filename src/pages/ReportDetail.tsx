import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Eye, 
  Heart, 
  Share2, 
  Flag,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Car,
  Zap,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mockReports from "@/data/mockReports.json";
import { useToast } from "@/hooks/use-toast";

const ReportDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const report = mockReports.find(r => r.id === id);

  if (!report) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">التبليغ غير موجود</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            العودة للرئيسية
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "crime": return <AlertTriangle className="h-4 w-4" />;
      case "road": return <Car className="h-4 w-4" />;
      case "infrastructure": return <Zap className="h-4 w-4" />;
      case "environment": return <Trash2 className="h-4 w-4" />;
      default: return <MoreHorizontal className="h-4 w-4" />;
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
      case "resolved": return "bg-green-100 text-green-800 border-green-200";
      case "verified": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved": return "تم الحل ✅";
      case "verified": return "مؤكد ✓";
      default: return "قيد المراجعة ⏳";
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    toast({
      title: liked ? "تم إلغاء الإعجاب" : "تم الإعجاب بالتبليغ",
      description: liked ? "شكراً لمشاركتك" : "شكراً لدعمك للمجتمع",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "يمكنك الآن مشاركة هذا التبليغ",
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-DZ', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            العودة للرئيسية
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Media Carousel */}
              {report.media && report.media.length > 0 && (
                <Card className="overflow-hidden">
                  <div className="relative aspect-video bg-muted">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-4xl mb-2">📸</div>
                        <p className="text-muted-foreground">معاينة الصورة</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {report.media[currentImageIndex]}
                        </p>
                      </div>
                    </div>
                    
                    {report.media.length > 1 && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                          onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                          disabled={currentImageIndex === 0}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90"
                          onClick={() => setCurrentImageIndex(Math.min(report.media.length - 1, currentImageIndex + 1))}
                          disabled={currentImageIndex === report.media.length - 1}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    
                    {report.media.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {report.media.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              )}

              {/* Report Details */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-primary">
                          {getCategoryIcon(report.category)}
                          <span className="mr-1">{getCategoryLabel(report.category)}</span>
                        </Badge>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                          {getStatusText(report.status)}
                        </div>
                      </div>
                      <CardTitle className="text-2xl leading-tight text-right" dir="rtl">
                        {report.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Meta Info */}
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(report.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{report.views} مشاهدة</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{report.likes + (liked ? 1 : 0)} إعجاب</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold mb-3">تفاصيل التبليغ</h3>
                    <p className="text-muted-foreground leading-relaxed text-right" dir="rtl">
                      {report.description}
                    </p>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4">
                    <Button
                      variant={liked ? "default" : "outline"}
                      onClick={handleLike}
                      className="flex-1"
                    >
                      <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                      {liked ? 'معجب' : 'أعجبني'}
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      مشاركة
                    </Button>
                    <Button variant="outline">
                      <Flag className="mr-2 h-4 w-4" />
                      إبلاغ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    الموقع
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground text-right" dir="rtl">
                      {report.location.address}
                    </p>
                    
                    {/* Mock Map */}
                    <div className="aspect-square bg-muted rounded-lg relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                        <div className="absolute inset-0 opacity-10">
                          <svg viewBox="0 0 200 200" className="w-full h-full" fill="currentColor">
                            <path d="M50 100 Q100 50 150 100 T250 100" stroke="currentColor" strokeWidth="1" fill="none" />
                            <path d="M25 125 Q75 75 125 125 T225 125" stroke="currentColor" strokeWidth="0.5" fill="none" />
                          </svg>
                        </div>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <MapPin className="mr-2 h-4 w-4" />
                      فتح في خرائط جوجل
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Reports */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">تبليغات مشابهة</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockReports
                      .filter(r => r.id !== report.id && r.category === report.category)
                      .slice(0, 3)
                      .map((relatedReport) => (
                        <div 
                          key={relatedReport.id}
                          className="p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                          onClick={() => navigate(`/report/${relatedReport.id}`)}
                        >
                          <h4 className="font-medium text-sm mb-1 text-right" dir="rtl">
                            {relatedReport.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(relatedReport.date)}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ReportDetail;