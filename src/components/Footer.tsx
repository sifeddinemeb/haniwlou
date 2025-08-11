import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Github, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
                <MapPin className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">حنيولو</h3>
                <p className="text-xs text-secondary-foreground/70">7aniwlou</p>
              </div>
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              منصة مجتمعية آمنة للتبليغ المجهول عن الجرائم والمخاطر في الجزائر.
              نعمل معا لجعل مجتمعاتنا أكثر أمانا.
            </p>
            <div className="flex space-x-3">
              <Button variant="ghost" size="sm">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">الرئيسية</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">خريطة التبليغات</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">بلغ الآن</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">حول المشروع</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">تواصل معنا</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">الدعم والمساعدة</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">كيفية الاستخدام</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">شروط الاستخدام</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">الإبلاغ عن مشكلة</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-secondary-foreground/80">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>contact@7aniwlou.dz</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span dir="ltr">+213 XXX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>الجزائر العاصمة، الجزائر</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-2">اشترك في النشرة الإخبارية</h5>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-sm text-foreground"
                />
                <Button variant="hero" size="sm">
                  اشترك
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-secondary-foreground/60">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>
              © 2024 حنيولو (7aniwlou). جميع الحقوق محفوظة.
            </p>
            <p className="text-sm">
              مشروع مفتوح المصدر لخدمة المجتمع الجزائري 🇩🇿
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;