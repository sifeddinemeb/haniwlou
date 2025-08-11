import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Eye, 
  MapPin, 
  Heart,
  CheckCircle,
  AlertTriangle,
  Globe,
  Smartphone
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6">
            <Shield className="mr-2 h-4 w-4" />
            حول المشروع
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            من نحن؟
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            حنيولو هي منصة مجتمعية مفتوحة المصدر تمكن المواطنين الجزائريين من التبليغ الآمن والمجهول 
            عن الجرائم والمخاطر ومشاكل البنية التحتية لجعل مجتمعاتنا أكثر أماناً.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="report-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Heart className="mr-3 h-6 w-6 text-primary" />
                رسالتنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-right" dir="rtl">
                تمكين المواطنين الجزائريين من الإبلاغ بأمان وبشكل مجهول عن الجرائم والمخاطر 
                ومشاكل البنية التحتية العامة، مما يجعل مجتمعاتهم أكثر أماناً وقابلية للعيش.
              </p>
            </CardContent>
          </Card>

          <Card className="report-card">
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <Eye className="mr-3 h-6 w-6 text-accent" />
                رؤيتنا
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed text-right" dir="rtl">
                بناء المنصة الأكثر موثوقية والمدفوعة بالمجتمع للشفافية والعمل في الجزائر، 
                حيث يمكن لكل مواطن أن يكون عيون المجتمع، والسلطات يمكن أن تتصرف بسرعة لتحسين السلامة العامة ونوعية الحياة.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا حنيولو؟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full hero-gradient mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">أمان تام</h3>
              <p className="text-muted-foreground">
                حماية المبلغين بهوية مجهولة وتشفير متقدم وتصميم يحافظ على الخصوصية أولاً.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-white mb-6">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">شفافية كاملة</h3>
              <p className="text-muted-foreground">
                وصول عام للتقارير المؤكدة، بدون رقابة على الحقائق، وتتبع حالة التبليغات.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary text-white mb-6">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-4">قوة المجتمع</h3>
              <p className="text-muted-foreground">
                المواطنون كمشاركين نشطين في تحسين مدنهم وحل المشاكل بشكل جماعي.
              </p>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            كيف يعمل حنيولو؟
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Smartphone, title: "1. بلغ", desc: "اكتب تبليغك أو احتج على صورة" },
                { icon: MapPin, title: "2. حدد الموقع", desc: "أضف الموقع الدقيق للمشكلة" },
                { icon: Eye, title: "3. المراجعة", desc: "فريقنا يراجع ويؤكد التبليغ" },
                { icon: Globe, title: "4. النشر", desc: "يظهر التبليغ على الخريطة العامة" }
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                    <step.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            قيمنا الأساسية
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "الأمان أولاً",
                description: "حماية المبلغين بهوية مجهولة وتشفير وتصميم يحافظ على الخصوصية أولاً.",
                icon: Shield
              },
              {
                title: "الحقيقة والشفافية",
                description: "وصول عام للتقارير المؤكدة، بدون رقابة على الحقائق.",
                icon: Eye
              },
              {
                title: "سرعة العمل",
                description: "جعل التبليغ سريع وسهل، مما يتيح الوعي في الوقت الفعلي.",
                icon: AlertTriangle
              },
              {
                title: "تمكين المجتمع",
                description: "المواطنون كمشاركين نشطين في تحسين مدنهم.",
                icon: Users
              }
            ].map((value, index) => (
              <Card key={index} className="report-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <value.icon className="mr-3 h-6 w-6 text-primary" />
                    {value.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-right" dir="rtl">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-12">
            إنجازاتنا حتى الآن
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,247+", label: "مواطن نشط" },
              { number: "856", label: "تبليغ تم حله" },
              { number: "12", label: "ولاية مغطاة" },
              { number: "100%", label: "آمن ومجهول" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            انضم إلى مجتمعنا اليوم
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            كن جزءاً من التغيير الإيجابي في مجتمعك. ابدأ بالتبليغ عن المشاكل وساعد في حلها.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="lg">
              بلغ الآن 🚨
            </Button>
            <Button variant="outline" size="lg">
              <MapPin className="mr-2 h-5 w-5" />
              استكشف الخريطة
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;