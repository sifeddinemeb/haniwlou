import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Navigation, Layers, Filter } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-16 warm-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            خريطة التبليغات التفاعلية
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            استكشف التبليغات في منطقتك باستخدام خريطتنا التفاعلية المحدثة في الوقت الفعلي
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardHeader className="bg-card border-b">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="flex items-center text-lg">
                  <Navigation className="mr-2 h-5 w-5 text-primary" />
                  خريطة الجزائر - التبليغات المباشرة
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    تصفية
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="mr-2 h-4 w-4" />
                    طبقات
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0">
              {/* Map Placeholder */}
              <div className="h-96 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
                {/* Mock Map Background */}
                <div className="absolute inset-0 opacity-10">
                  <svg 
                    viewBox="0 0 800 400" 
                    className="w-full h-full" 
                    fill="currentColor"
                  >
                    <path d="M100 200 Q200 100 300 200 T500 200 T700 200" stroke="currentColor" strokeWidth="2" fill="none" />
                    <path d="M50 250 Q150 150 250 250 T450 250 T650 250" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M150 300 Q250 200 350 300 T550 300 T750 300" stroke="currentColor" strokeWidth="1" fill="none" />
                  </svg>
                </div>
                
                {/* Mock Report Pins */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full">
                    {/* Algiers */}
                    <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <Badge variant="destructive" className="text-xs">
                            الجزائر العاصمة - 3 تبليغات
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Oran */}
                    <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <Badge variant="secondary" className="text-xs">
                            وهران - 2 تبليغات
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {/* Constantine */}
                    <div className="absolute top-2/5 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                          <Badge variant="default" className="text-xs">
                            قسنطينة - 1 تبليغ
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Map Controls */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
                    +
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white/90 backdrop-blur">
                    -
                  </Button>
                </div>
                
                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-2xl font-bold mb-2">قريباً</h3>
                    <p className="text-white/80">خريطة تفاعلية مع بيانات حقيقية</p>
                    <Button variant="hero" size="lg" className="mt-4">
                      كن أول من يجرب
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium">جرائم</div>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-yellow-500 rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium">طرق</div>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium">بنية تحتية</div>
          </div>
          <div className="text-center">
            <div className="w-4 h-4 bg-gray-500 rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium">أخرى</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;