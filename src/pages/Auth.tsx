import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  User, 
  Lock, 
  LogIn, 
  UserPlus,
  ArrowLeft,
  Eye,
  EyeOff,
  Check
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  
  const [signupData, setSignupData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!loginData.username || !loginData.password) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
        return;
      }

      // Mock successful login
      localStorage.setItem("user", JSON.stringify({ username: loginData.username }));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: `مرحباً بك ${loginData.username}`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: "تحقق من بيانات الدخول وحاول مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate passwords match
      if (signupData.password !== signupData.confirmPassword) {
        toast({
          title: "خطأ في كلمة المرور",
          description: "كلمتا المرور غير متطابقتين",
          variant: "destructive"
        });
        return;
      }

      if (signupData.password.length < 6) {
        toast({
          title: "كلمة مرور ضعيفة",
          description: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
          variant: "destructive"
        });
        return;
      }

      // Simulate signup API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!signupData.username || !signupData.password) {
        toast({
          title: "خطأ في البيانات",
          description: "يرجى ملء جميع الحقول المطلوبة",
          variant: "destructive"
        });
        return;
      }

      // Mock successful signup
      localStorage.setItem("user", JSON.stringify({ username: signupData.username }));
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً بك ${signupData.username}! يمكنك الآن استخدام المنصة`,
      });

      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "خطأ في إنشاء الحساب",
        description: "حدث خطأ أثناء إنشاء الحساب، حاول مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-warm-gradient" dir="rtl">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للرئيسية
          </Button>

          {/* Header */}
          <div className="text-center mb-8">
            <Badge variant="secondary" className="mb-4">
              <Shield className="ml-2 h-4 w-4" />
              حساب آمن ومحمي
            </Badge>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              انضم لمجتمع حنيولو
            </h1>
            <p className="text-muted-foreground">
              ساهم في جعل الجزائر مكاناً أكثر أماناً وشفافية
            </p>
          </div>

          {/* Auth Card */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-center">
                الدخول إلى حسابك
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    دخول
                  </TabsTrigger>
                  <TabsTrigger value="signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    تسجيل
                  </TabsTrigger>
                </TabsList>

                {/* Login Tab */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-username">اسم المستخدم</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-username"
                          type="text"
                          placeholder="أدخل اسم المستخدم"
                          value={loginData.username}
                          onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                          className="pr-10 text-right"
                          dir="rtl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="login-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="أدخل كلمة المرور"
                          value={loginData.password}
                          onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                          className="pr-10 pl-10 text-right"
                          dir="rtl"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-hero" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "جاري الدخول..." : "دخول"}
                    </Button>
                  </form>
                </TabsContent>

                {/* Signup Tab */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-username">اسم المستخدم</Label>
                      <div className="relative">
                        <User className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-username"
                          type="text"
                          placeholder="اختر اسم مستخدم"
                          value={signupData.username}
                          onChange={(e) => setSignupData({...signupData, username: e.target.value})}
                          className="pr-10 text-right"
                          dir="rtl"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="أدخل كلمة مرور قوية"
                          value={signupData.password}
                          onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                          className="pr-10 pl-10 text-right"
                          dir="rtl"
                          required
                          minLength={6}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-confirm-password">تأكيد كلمة المرور</Label>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="أعد إدخال كلمة المرور"
                          value={signupData.confirmPassword}
                          onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                          className="pr-10 pl-10 text-right"
                          dir="rtl"
                          required
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Password Requirements */}
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex items-center gap-2">
                        <Check className={`h-3 w-3 ${signupData.password.length >= 6 ? 'text-green-600' : 'text-muted-foreground'}`} />
                        <span>6 أحرف على الأقل</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Check className={`h-3 w-3 ${signupData.password === signupData.confirmPassword && signupData.confirmPassword ? 'text-green-600' : 'text-muted-foreground'}`} />
                        <span>تطابق كلمتي المرور</span>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full btn-hero" 
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <Separator className="my-6" />

              {/* Anonymous Option */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-3">
                  أو يمكنك استخدام المنصة بشكل مجهول
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")}
                  className="w-full"
                >
                  <Shield className="ml-2 h-4 w-4" />
                  استخدام مجهول
                </Button>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-green-800 font-medium mb-1 text-sm">
                      حماية خصوصيتك أولويتنا
                    </h4>
                    <p className="text-green-700 text-xs">
                      جميع بياناتك محمية ومشفرة. لن نشارك معلوماتك مع أي جهة خارجية.
                      يمكنك استخدام المنصة بشكل مجهول تماماً دون الحاجة لإنشاء حساب.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;