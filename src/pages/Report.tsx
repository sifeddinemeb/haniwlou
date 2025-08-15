import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, MapPin, Upload, Shield, Clock, AlertTriangle, Save } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput } from "@/lib/validations";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { wilayas } from "@/data/wilayas";
import FileUpload from "@/components/FileUpload";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Report = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Use localStorage for draft saving
  const [formData, setFormData] = useLocalStorage('report-draft', {
    title: "",
    description: "",
    category: "",
    location: "",
    wilaya: "",
    latitude: null as number | null,
    longitude: null as number | null,
    priority: "medium" as "low" | "medium" | "high",
    isAnonymous: true,
    mediaUrls: [] as string[]
  });

  const [step, setStep] = useState(1);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const categories = [
    { value: "infrastructure", label: "مشاكل البنية التحتية" },
    { value: "traffic", label: "مشاكل المرور" },
    { value: "security", label: "مشاكل أمنية" },
    { value: "environment", label: "مشاكل بيئية" },
    { value: "services", label: "مشاكل الخدمات العامة" },
    { value: "other", label: "أخرى" }
  ];

  const priorities = [
    { value: "low", label: "منخفضة", color: "text-green-600" },
    { value: "medium", label: "متوسطة", color: "text-yellow-600" },
    { value: "high", label: "عالية", color: "text-red-600" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim() || !formData.description.trim() || !formData.category || !formData.location.trim()) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Sanitize inputs
      const sanitizedData = {
        title: sanitizeInput(formData.title),
        description: sanitizeInput(formData.description),
        location: sanitizeInput(formData.location),
        category: formData.category,
        priority: formData.priority,
        latitude: formData.latitude,
        longitude: formData.longitude,
        is_anonymous: formData.isAnonymous,
        user_id: formData.isAnonymous ? null : user?.id || null,
        status: 'pending',
        media_urls: [...formData.mediaUrls, ...uploadedFiles]
      };

      // Insert report into database
      const { data, error } = await supabase
        .from('reports')
        .insert([sanitizedData])
        .select()
        .single();

      if (error) {
        console.error('Error submitting report:', error);
        toast({
          title: "خطأ في إرسال البلاغ",
          description: "حدث خطأ أثناء إرسال البلاغ. يرجى المحاولة مرة أخرى.",
          variant: "destructive"
        });
        return;
      }

      // Success
      toast({
        title: "تم إرسال البلاغ بنجاح",
        description: "شكراً لك على المساهمة في تحسين مجتمعك",
      });

      // Clear draft and navigate
      localStorage.removeItem('report-draft');
      
      // Navigate to report detail or dashboard
      if (data) {
        navigate(`/report/${data.id}`);
      } else {
        navigate('/reports');
      }

    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "خطأ غير متوقع",
        description: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }));
          setLoading(false);
          toast({
            title: "تم تحديد الموقع",
            description: "تم الحصول على موقعك الحالي بنجاح",
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          setLoading(false);
          toast({
            title: "تعذر تحديد الموقع",
            description: "لم نتمكن من الحصول على موقعك. يرجى إدخال العنوان يدوياً.",
            variant: "destructive"
          });
        }
      );
    } else {
      toast({
        title: "الموقع غير مدعوم",
        description: "متصفحك لا يدعم خدمات الموقع. يرجى إدخال العنوان يدوياً.",
        variant: "destructive"
      });
    }
  };

  const nextStep = () => {
    if (step === 1 && (!formData.title.trim() || !formData.description.trim())) {
      toast({
        title: "يرجى إكمال البيانات",
        description: "العنوان والوصف مطلوبان للمتابعة",
        variant: "destructive"
      });
      return;
    }
    if (step === 2 && (!formData.category || (!formData.location.trim() && !formData.wilaya))) {
      toast({
        title: "يرجى إكمال البيانات",
        description: "الفئة والموقع مطلوبان للمتابعة",
        variant: "destructive"
      });
      return;
    }
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-2 h-4 w-4" />
              تبليغ آمن ومحمي
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              بلغ عن مشكلة في مجتمعك
            </h1>
            <p className="text-muted-foreground">
              ساعدنا في جعل الجزائر مكاناً أكثر أماناً. تبليغك محمي ومجهول تماماً.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4 space-x-reverse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    step >= i ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i}
                  </div>
                  {i < 4 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      step > i ? 'bg-primary' : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <Progress value={(step / 4) * 100} className="h-2" />
            <p className="text-center text-sm text-muted-foreground mt-2">
              الخطوة {step} من 4
            </p>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 && "تفاصيل البلاغ"}
                {step === 2 && "الموقع والفئة"}
                {step === 3 && "الصور والفيديوهات"}
                {step === 4 && "مراجعة وإرسال"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Basic Details */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان البلاغ *</Label>
                      <Input
                        id="title"
                        type="text"
                        placeholder="وصف مختصر للمشكلة..."
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="text-right"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">وصف تفصيلي للمشكلة *</Label>
                      <Textarea
                        id="description"
                        placeholder="اشرح المشكلة بالتفصيل..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="text-right min-h-[120px]"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="priority">أولوية البلاغ</Label>
                      <Select value={formData.priority} onValueChange={(value: "low" | "medium" | "high") => setFormData({...formData, priority: value})}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          {priorities.map((priority) => (
                            <SelectItem key={priority.value} value={priority.value}>
                              <span className={priority.color}>{priority.label}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 2: Location and Category */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">فئة البلاغ *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger className="text-right">
                          <SelectValue placeholder="اختر فئة البلاغ" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع *</Label>
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Input
                            id="location"
                            type="text"
                            placeholder="العنوان أو الموقع..."
                            value={formData.location}
                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                            className="text-right flex-1"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={getCurrentLocation}
                            disabled={loading}
                          >
                            <MapPin className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="wilaya">أو اختر الولاية</Label>
                          <Select value={formData.wilaya} onValueChange={(value) => setFormData({...formData, wilaya: value})}>
                            <SelectTrigger className="text-right">
                              <SelectValue placeholder="اختر الولاية" />
                            </SelectTrigger>
                            <SelectContent>
                              {wilayas.map((wilaya) => (
                                <SelectItem key={wilaya.code} value={wilaya.nameAr}>
                                  {wilaya.nameAr}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {formData.latitude && formData.longitude && (
                          <p className="text-sm text-green-600">تم تحديد الموقع الجغرافي</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Media Upload */}
                {step === 3 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>إضافة صور أو فيديوهات (اختياري)</Label>
                      <p className="text-sm text-muted-foreground">
                        يمكنك إضافة صور أو فيديوهات توضيحية للمشكلة المبلغ عنها
                      </p>
                    </div>
                    <FileUpload
                      onFilesUploaded={(urls) => {
                        setUploadedFiles(urls);
                        setFormData({...formData, mediaUrls: [...formData.mediaUrls, ...urls]});
                      }}
                      maxFiles={5}
                      maxFileSize={10}
                      userId={user?.id}
                    />
                  </div>
                )}

                {/* Step 4: Review and Submit */}
                {step === 4 && (
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                      <div>
                        <h4 className="font-medium text-foreground">العنوان:</h4>
                        <p className="text-muted-foreground">{formData.title}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">الوصف:</h4>
                        <p className="text-muted-foreground">{formData.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">الفئة:</h4>
                        <p className="text-muted-foreground">
                          {categories.find(c => c.value === formData.category)?.label}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">الموقع:</h4>
                        <p className="text-muted-foreground">
                          {formData.location || formData.wilaya || "غير محدد"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">الأولوية:</h4>
                        <p className="text-muted-foreground">
                          {priorities.find(p => p.value === formData.priority)?.label}
                        </p>
                      </div>
                      
                      {(formData.mediaUrls.length > 0 || uploadedFiles.length > 0) && (
                        <div>
                          <h4 className="font-medium text-foreground">الملفات المرفقة:</h4>
                          <p className="text-muted-foreground">
                            {formData.mediaUrls.length + uploadedFiles.length} ملف مرفق
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Checkbox
                        id="anonymous"
                        checked={formData.isAnonymous}
                        onCheckedChange={(checked) => setFormData({...formData, isAnonymous: checked as boolean})}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        إرسال البلاغ بشكل مجهول
                      </Label>
                    </div>

                    {formData.isAnonymous && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-blue-600 mt-0.5" />
                          <p className="text-blue-800 text-sm">
                            سيتم إرسال بلاغك بشكل مجهول تماماً. لن نتمكن من ربطه بحسابك أو معلوماتك الشخصية.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={step === 1}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    السابق
                  </Button>

                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex items-center gap-2"
                    >
                      التالي
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex items-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4" />
                          إرسال البلاغ
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-green-800 font-medium mb-1 text-sm">
                  حماية خصوصيتك أولويتنا
                </h4>
                <p className="text-green-700 text-xs">
                  جميع البلاغات محمية ومشفرة. يمكنك الإبلاغ بشكل مجهول تماماً دون الكشف عن هويتك.
                  لن نشارك معلوماتك مع أي جهة خارجية.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Report;