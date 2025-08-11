import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MapSection from "@/components/MapSection";
import RecentReports from "@/components/RecentReports";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <MapSection />
        <RecentReports />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
