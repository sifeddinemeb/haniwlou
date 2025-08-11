import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Upload, Shield, Clock, AlertTriangle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Report = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    anonymous: true
  });

  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Report submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Shield className="mr-2 h-4 w-4" />
              تبليغ آمن ومجهول
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              بلغ عن مشكلة في مجتمعك
            </h1>
            <p className="text-muted-foreground">
              ساعدنا في جعل الجزائر مكانا أكثر أمانا. تبليغك محمي ومجهول تماما.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${step >= stepNum 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`
                      w-12 h-0.5 mx-2
                      ${step > stepNum ? 'bg-primary' : 'bg-muted'}
                    `} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
                {step === 1 && "تفاصيل التبليغ"}
                {step === 2 && "الموقع والمرفقات"}
                {step === 3 && "المراجعة والإرسال"}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="title">عنوان التبليغ</Label>
                      <Input
                        id="title"
                        placeholder="مثال: حفرة كبيرة في الطريق"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="text-right"
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">نوع التبليغ</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع التبليغ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="crime">جريمة أو حادث أمني</SelectItem>
                          <SelectItem value="road">مشكلة في الطريق</SelectItem>
                          <SelectItem value="infrastructure">بنية تحتية</SelectItem>
                          <SelectItem value="environment">بيئة ونظافة</SelectItem>
                          <SelectItem value="other">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">وصف التبليغ</Label>
                      <Textarea
                        id="description"
                        placeholder="اوصف المشكلة بالتفصيل..."
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="min-h-32 text-right"
                        dir="rtl"
                      />
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="location">الموقع</Label>
                      <div className="flex gap-2">
                        <Input
                          id="location"
                          placeholder="الجزائر العاصمة، حي..."
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="text-right"
                          dir="rtl"
                        />
                        <Button type="button" variant="outline">
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>الصور أو الفيديوهات (اختياري)</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                        <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-muted-foreground mb-2">
                          اسحب الملفات هنا أو انقر للاختيار
                        </p>
                        <p className="text-xs text-muted-foreground">
                          سيتم تشويش الوجوه ولوحات الأرقام تلقائيا لحماية الخصوصية
                        </p>
                        <Button type="button" variant="outline" className="mt-4">
                          اختر الملفات
                        </Button>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-muted p-4 rounded-lg">
                      <h3 className="font-semibold mb-2">ملخص التبليغ</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>العنوان:</strong> {formData.title || "غير محدد"}</p>
                        <p><strong>النوع:</strong> {formData.category || "غير محدد"}</p>
                        <p><strong>الموقع:</strong> {formData.location || "غير محدد"}</p>
                        <p><strong>الوصف:</strong> {formData.description || "غير محدد"}</p>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-green-800 font-medium mb-1">
                            تبليغ آمن ومجهول
                          </h4>
                          <p className="text-green-700 text-sm">
                            تبليغك محمي تماما. لن نحفظ أي معلومات شخصية تكشف هويتك.
                            سيتم مراجعة التبليغ والرد عليه خلال 24 ساعة.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    السابق
                  </Button>
                  
                  {step < 3 ? (
                    <Button 
                      type="button"
                      onClick={() => setStep(Math.min(3, step + 1))}
                      disabled={
                        (step === 1 && (!formData.title || !formData.category)) ||
                        (step === 2 && !formData.location)
                      }
                    >
                      التالي
                      <ArrowRight className="ml-2 h-4 w-4 rotate-180" />
                    </Button>
                  ) : (
                    <Button type="submit" variant="hero" size="lg">
                      <Clock className="mr-2 h-4 w-4" />
                      إرسال التبليغ
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              من خلال إرسال هذا التبليغ، أنت توافق على 
              <a href="#" className="text-primary hover:underline mx-1">شروط الاستخدام</a>
              و
              <a href="#" className="text-primary hover:underline mx-1">سياسة الخصوصية</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Report;