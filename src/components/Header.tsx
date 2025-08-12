import { Button } from "@/components/ui/button";
import { MapPin, Menu, User, Phone } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const handleEmergencyCall = (number: string) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" dir="rtl">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse cursor-pointer" onClick={() => navigate("/")}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg hero-gradient">
              <MapPin className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">حنيولو</h1>
              <p className="text-xs text-muted-foreground">7aniwlou</p>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <button 
            onClick={() => navigate("/")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            الخريطة
          </button>
          <button 
            onClick={() => navigate("/reports")}
            className="text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            جميع التبليغات
          </button>
          {user && (
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              لوحة التحكم
            </button>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3 space-x-reverse">
          {/* Emergency Calls - Desktop */}
          <div className="hidden lg:flex items-center space-x-2 space-x-reverse">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEmergencyCall("17")}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Phone className="ml-1 h-3 w-3" />
              17
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleEmergencyCall("14")}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <Phone className="ml-1 h-3 w-3" />
              14
            </Button>
          </div>

          {user ? (
            <div className="hidden sm:flex items-center space-x-2 space-x-reverse">
              <span className="text-sm text-muted-foreground">مرحباً، {user.username}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <Button 
              variant="outline" 
              size="sm" 
              className="hidden sm:flex"
              onClick={() => navigate("/auth")}
            >
              <User className="ml-2 h-4 w-4" />
              دخول
            </Button>
          )}
          
          <Button 
            className="btn-hero text-primary-foreground" 
            onClick={() => navigate('/report')}
            size="sm"
          >
            بلغ الآن 🚨
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container px-4 py-4 space-y-3">
            <button 
              onClick={() => {
                navigate("/");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              الخريطة
            </button>
            <button 
              onClick={() => {
                navigate("/reports");
                setMobileMenuOpen(false);
              }}
              className="block w-full text-right py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              جميع التبليغات
            </button>
            {user && (
              <button 
                onClick={() => {
                  navigate("/dashboard");
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-right py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                لوحة التحكم
              </button>
            )}
            
            {/* Emergency calls for mobile */}
            <div className="pt-2 border-t">
              <p className="text-xs text-muted-foreground mb-2">مكالمات الطوارئ:</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmergencyCall("17")}
                  className="flex-1 text-red-600 border-red-200"
                >
                  <Phone className="ml-1 h-3 w-3" />
                  شرطة 17
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEmergencyCall("14")}
                  className="flex-1 text-red-600 border-red-200"
                >
                  <Phone className="ml-1 h-3 w-3" />
                  إسعاف 14
                </Button>
              </div>
            </div>

            {user ? (
              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground mb-2">مرحباً، {user.username}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  تسجيل الخروج
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  navigate("/auth");
                  setMobileMenuOpen(false);
                }}
              >
                <User className="ml-2 h-4 w-4" />
                دخول / تسجيل
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;