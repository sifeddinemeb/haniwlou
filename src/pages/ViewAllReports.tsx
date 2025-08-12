import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc,
  MapPin, 
  Clock, 
  Eye, 
  Heart,
  AlertTriangle,
  Car,
  Zap,
  Trash2,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import mockReports from "@/data/mockReports.json";
import { useNavigate } from "react-router-dom";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const REPORTS_PER_PAGE = 6;

const ViewAllReports = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

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

  const filteredAndSortedReports = useMemo(() => {
    let filtered = mockReports.filter(report => {
      const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           report.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || report.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || report.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "date":
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case "likes":
          aValue = a.likes;
          bValue = b.likes;
          break;
        case "views":
          aValue = a.views;
          bValue = b.views;
          break;
        case "popularity": // Combined likes and views
          aValue = a.likes + a.views;
          bValue = b.likes + b.views;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
      }

      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    });

    return filtered;
  }, [searchTerm, categoryFilter, statusFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedReports.length / REPORTS_PER_PAGE);
  const paginatedReports = filteredAndSortedReports.slice(
    (currentPage - 1) * REPORTS_PER_PAGE,
    currentPage * REPORTS_PER_PAGE
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-DZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              جميع التبليغات
            </h1>
            <p className="text-muted-foreground">
              استعرض وابحث في جميع التبليغات المقدمة من المجتمع
            </p>
          </div>

          {/* Filters */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="ml-2 h-5 w-5" />
                البحث والتصفية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في التبليغات..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pr-10 text-right"
                    dir="rtl"
                  />
                </div>

                {/* Category Filter */}
                <Select value={categoryFilter} onValueChange={(value) => {
                  setCategoryFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأنواع</SelectItem>
                    <SelectItem value="crime">جريمة</SelectItem>
                    <SelectItem value="road">طريق</SelectItem>
                    <SelectItem value="infrastructure">بنية تحتية</SelectItem>
                    <SelectItem value="environment">بيئة</SelectItem>
                  </SelectContent>
                </Select>

                {/* Status Filter */}
                <Select value={statusFilter} onValueChange={(value) => {
                  setStatusFilter(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="verified">مؤكد</SelectItem>
                    <SelectItem value="resolved">تم الحل</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={(value) => {
                  setSortBy(value);
                  setCurrentPage(1);
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="ترتيب حسب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">التاريخ</SelectItem>
                    <SelectItem value="likes">الإعجابات</SelectItem>
                    <SelectItem value="views">المشاهدات</SelectItem>
                    <SelectItem value="popularity">الشعبية</SelectItem>
                  </SelectContent>
                </Select>

                {/* Sort Order */}
                <Button
                  variant="outline"
                  onClick={() => toggleSort(sortBy)}
                  className="flex items-center gap-2"
                >
                  {sortOrder === "desc" ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
                  {sortOrder === "desc" ? "تنازلي" : "تصاعدي"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              عرض {paginatedReports.length} من {filteredAndSortedReports.length} تبليغ
            </p>
            <div className="text-sm text-muted-foreground">
              الصفحة {currentPage} من {totalPages}
            </div>
          </div>

          {/* Reports Grid */}
          {paginatedReports.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">لا توجد نتائج</h3>
                <p className="text-muted-foreground">
                  جرب تغيير معايير البحث أو التصفية
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {paginatedReports.map((report) => (
                <Card 
                  key={report.id} 
                  className="cursor-pointer report-card transition-all duration-200"
                  onClick={() => navigate(`/report/${report.id}`)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-primary">
                          {getCategoryIcon(report.category)}
                          <span className="mr-1">{getCategoryLabel(report.category)}</span>
                        </Badge>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                        {getStatusText(report.status)}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight text-right line-clamp-2" dir="rtl">
                      {report.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 text-right line-clamp-2" dir="rtl">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        <span className="text-xs">
                          {report.location.address.split('،')[report.location.address.split('،').length - 1]}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(report.date)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Eye className="h-3 w-3" />
                          <span>{report.views}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="h-3 w-3" />
                          <span>{report.likes}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handlePageChange(currentPage - 1);
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={pageNum}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNum);
                          }}
                          isActive={currentPage === pageNum}
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage < totalPages) handlePageChange(currentPage + 1);
                      }}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ViewAllReports;