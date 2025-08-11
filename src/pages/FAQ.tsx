import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Shield, 
  Lock, 
  Eye,
  UserX,
  Database,
  HelpCircle,
  MessageCircle,
  Mail
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const FAQ = () => {
  const faqs = [
    {
      question: "هل التبليغ آمن ومجهول حقاً؟",
      answer: "نعم، تماماً. نحن لا نحفظ أي معلومات شخصية تكشف هويتك. جميع التبليغات مشفرة ونحن نحذف بيانات الموقع الدقيقة (EXIF) من الصور تلقائياً."
    },
    {
      question: "كيف يتم التحقق من صحة التبليغات؟",
      answer: "فريقنا من المتطوعين والخبراء يراجع كل تبليغ قبل نشره. نتحقق من المصداقية ونقارن مع مصادر أخرى عند الحاجة."
    },
    {
      question: "ماذا يحدث بعد إرسال التبليغ؟",
      answer: "بعد الإرسال، يخضع تبليغك للمراجعة خلال 24 ساعة. إذا تم التحقق منه، سيظهر على الخريطة العامة ويمكن للسلطات المختصة رؤيته."
    },
    {
      question: "هل يمكنني حذف تبليغي بعد إرساله؟",
      answer: "نعم، يمكنك طلب حذف تبليغك بالتواصل معنا. ولكن إذا كان التبليغ مهماً للسلامة العامة، قد نحتفظ به مع حذف أي معلومات شخصية."
    },
    {
      question: "ما نوع المحتوى المسموح؟",
      answer: "نقبل التبليغات عن الجرائم، مشاكل الطرق، البنية التحتية، والقضايا البيئية. لا نسمح بالمحتوى المسيء أو الكاذب أو الذي يستهدف أفراد محددين."
    },
    {
      question: "كيف تحمون خصوصية الأشخاص في الصور؟",
      answer: "نستخدم تقنية الذكاء الاصطناعي لتشويش الوجوه ولوحات الأرقام تلقائياً قبل نشر أي صورة لحماية خصوصية الأفراد."
    },
    {
      question: "هل يمكن للسلطات معرفة هوية المبلغ؟",
      answer: "لا، إطلاقاً. نحن لا نحفظ أي معلومات تعريفية ولا نشاركها مع أي جهة. حتى لو طلبت السلطات، لا توجد معلومات للمشاركة."
    },
    {
      question: "ما هي تكلفة استخدام المنصة؟",
      answer: "المنصة مجانية تماماً. نحن مشروع مفتوح المصدر مدعوم من المجتمع ولا نهدف للربح."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            <HelpCircle className="mr-2 h-4 w-4" />
            الأسئلة الشائعة
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            كل ما تريد معرفته عن حنيولو
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            إجابات على الأسئلة الأكثر شيوعاً حول الأمان، الخصوصية، وكيفية عمل المنصة.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-right text-lg font-medium">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-right text-muted-foreground leading-relaxed" dir="rtl">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Privacy Assurance */}
            <Card className="report-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="mr-2 h-5 w-5 text-green-600" />
                  ضمان الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Lock className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">تشفير متقدم</p>
                      <p className="text-xs text-muted-foreground">جميع البيانات محمية</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <UserX className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">هوية مجهولة</p>
                      <p className="text-xs text-muted-foreground">لا نحفظ معلوماتك</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">حماية الخصوصية</p>
                      <p className="text-xs text-muted-foreground">تشويش تلقائي للوجوه</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="report-card">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                  تحتاج مساعدة؟
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4 text-right" dir="rtl">
                  إذا لم تجد إجابة لسؤالك، تواصل معنا وسنساعدك.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    تواصل عبر الإيميل
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    الدردشة المباشرة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Policy */}
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-800">
                  <Database className="mr-2 h-5 w-5" />
                  سياسة البيانات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700 text-right" dir="rtl">
                  نحن ملتزمون بحماية خصوصيتك. اقرأ سياسة الخصوصية الكاملة لمعرفة كيف نتعامل مع بياناتك.
                </p>
                <Button variant="outline" className="w-full mt-3 border-blue-300 text-blue-700 hover:bg-blue-100">
                  قراءة السياسة كاملة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Still Have Questions */}
        <div className="text-center mt-16 pt-16 border-t">
          <h2 className="text-2xl font-bold mb-4">
            لا تزال لديك أسئلة؟
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            فريقنا مستعد لمساعدتك. تواصل معنا وسنرد عليك خلال 24 ساعة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero">
              <Mail className="mr-2 h-4 w-4" />
              تواصل معنا
            </Button>
            <Button variant="outline">
              <MessageCircle className="mr-2 h-4 w-4" />
              انضم لمجتمعنا
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;