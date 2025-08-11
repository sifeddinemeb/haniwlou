import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Shield, AlertTriangle } from "lucide-react";
import heroImage from "@/assets/hero-algerian-city.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Algerian cityscape representing community engagement" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-accent/80" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
          <Shield className="mr-2 h-4 w-4" />
          منصة مجتمعية آمنة
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          <span className="block">حنيولو</span>
          <span className="block text-xl md:text-2xl font-normal text-white/90 mt-2">
            Catch the crime, fix the street — together
          </span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90 leading-relaxed">
          بلغ عن الجرائم، المخاطر، ومشاكل البنية التحتية بأمان وبشكل مجهول. 
          اجعل مجتمعك أكثر أمانا وقابلية للعيش.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            بلغ الآن 🚨
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4"
          >
            <MapPin className="mr-2 h-5 w-5" />
            شاهد الخريطة
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
          <div className="floating-card rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">1,247+</div>
            <div className="text-sm text-muted-foreground">مواطن نشط</div>
          </div>
          
          <div className="floating-card rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-foreground">856</div>
            <div className="text-sm text-muted-foreground">تبليغ تم حله</div>
          </div>
          
          <div className="floating-card rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-sm text-muted-foreground">آمن ومجهول</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;