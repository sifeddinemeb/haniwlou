import { Button } from "@/components/ui/button";
import { MapPin, Menu } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">حنيولو</h1>
              <p className="text-xs text-muted-foreground">7aniwlou</p>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            الخريطة
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            التبليغات
          </a>
          <a href="#" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            حول
          </a>
        </nav>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            تسجيل الدخول
          </Button>
          <Button className="btn-hero text-primary-foreground">
            بلغ الآن 🚨
          </Button>
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;