import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, AlertTriangle, Car, Zap, MoreHorizontal } from "lucide-react";

interface Report {
  id: string;
  title: string;
  description: string;
  category: "crime" | "road" | "infrastructure" | "other";
  location: string;
  time: string;
  status: "pending" | "verified" | "resolved";
}

const mockReports: Report[] = [
  {
    id: "1",
    title: "حفرة كبيرة في الطريق",
    description: "حفرة خطيرة في طريق العربي بن مهيدي تسبب أضرار للسيارات",
    category: "road",
    location: "الجزائر العاصمة، باب الوادي",
    time: "منذ ساعتين",
    status: "pending"
  },
  {
    id: "2", 
    title: "انقطاع الكهرباء",
    description: "انقطاع متكرر للكهرباء في منطقة سكنية منذ 3 أيام",
    category: "infrastructure",
    location: "وهران، حي السلام",
    time: "منذ 4 ساعات",
    status: "verified"
  },
  {
    id: "3",
    title: "سرقة دراجة نارية",
    description: "سرقة دراجة نارية من أمام مقهى شعبي بوضح النهار",
    category: "crime", 
    location: "قسنطينة، وسط المدينة",
    time: "منذ 6 ساعات",
    status: "verified"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "crime": return <AlertTriangle className="h-4 w-4" />;
    case "road": return <Car className="h-4 w-4" />;
    case "infrastructure": return <Zap className="h-4 w-4" />;
    default: return <MoreHorizontal className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "crime": return "destructive";
    case "road": return "secondary";
    case "infrastructure": return "default";
    default: return "outline";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "resolved": return "bg-green-100 text-green-800";
    case "verified": return "bg-blue-100 text-blue-800";
    default: return "bg-yellow-100 text-yellow-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "resolved": return "تم الحل";
    case "verified": return "مؤكد";
    default: return "قيد المراجعة";
  }
};

const RecentReports = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            آخر التبليغات
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            تابع أحدث التبليغات من مجتمعك وشاهد كيف نعمل معا لحل المشاكل
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {mockReports.map((report) => (
            <Card key={report.id} className="report-card hover:scale-105 transition-transform duration-300 cursor-pointer" onClick={() => window.location.href = `/report/${report.id}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge 
                    variant={getCategoryColor(report.category) as any}
                    className="mb-2"
                  >
                    {getCategoryIcon(report.category)}
                    <span className="mr-1">
                      {report.category === "crime" && "جريمة"}
                      {report.category === "road" && "طريق"}
                      {report.category === "infrastructure" && "بنية تحتية"}
                      {report.category === "other" && "أخرى"}
                    </span>
                  </Badge>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {getStatusText(report.status)}
                  </div>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {report.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {report.description}
                </p>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span className="truncate">{report.location}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{report.time}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    عرض التفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            عرض جميع التبليغات
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentReports;