import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, LogIn, User } from 'lucide-react';

import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const DEMO_ADMIN_USERNAME = "admin";
const DEMO_ADMIN_PASSWORD = "demo123";
const DEMO_USER_USERNAME = "user";
const DEMO_USER_PASSWORD = "demo123";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }).or(z.string().min(1, { message: "Username is required" })),
  password: z.string().min(1, { message: "Password is required." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    console.log("Form submitted:", data);
    setIsLoading(true);
    
    // Check for admin login
    if (data.email === DEMO_ADMIN_USERNAME && data.password === DEMO_ADMIN_PASSWORD) {
      setTimeout(() => {
        toast({
          title: "Admin Login Successful",
          description: "Welcome to the admin panel",
        });
        
        // Store admin login state in session storage by default
        sessionStorage.setItem('demoAdminLoggedIn', 'true');
        
        // If remember me is checked, also store in localStorage for persistence
        if (data.rememberMe) {
          localStorage.setItem('rememberAdminLogin', 'true');
          localStorage.setItem('adminUsername', DEMO_ADMIN_USERNAME);
        }
        
        setIsLoading(false);
        navigate('/admin');
      }, 1000);
      return;
    }
    
    // Check for demo user login
    if (data.email === DEMO_USER_USERNAME && data.password === DEMO_USER_PASSWORD) {
      setTimeout(() => {
        toast({
          title: "User Login Successful",
          description: "Welcome to your IELTS preparation dashboard",
        });
        
        // Set proper demo user login flags in localStorage
        localStorage.setItem('demoUserLoggedIn', 'true');
        localStorage.setItem('userEmail', 'demo@user.com');
        localStorage.setItem('userName', 'Demo User');
        
        if (data.rememberMe) {
          localStorage.setItem('rememberUser', 'true');
        } else {
          // Ensure rememberUser is removed if not checked
          localStorage.removeItem('rememberUser');
        }
        
        setIsLoading(false);
        navigate('/');
      }, 1000);
      return;
    }
    
    // Regular user login (simulate)
    setTimeout(() => {
      localStorage.setItem('userEmail', data.email);
      
      if (data.rememberMe) {
        localStorage.setItem('rememberUser', 'true');
      } else {
        localStorage.removeItem('rememberUser');
      }
      
      toast({
        title: "Success!",
        description: "You have successfully logged in.",
        duration: 3000,
      });
      
      setIsLoading(false);
      navigate(from);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    
    console.log(`Logging in with ${provider}`);
    
    toast({
      title: `${provider} Login`,
      description: `Authenticating via ${provider}...`,
      duration: 3000,
    });
    
    setTimeout(() => {
      localStorage.setItem('userEmail', `user@${provider.toLowerCase()}.com`);
      localStorage.setItem('socialProvider', provider);
      
      toast({
        title: "Success!",
        description: `You have successfully logged in with ${provider}.`,
        duration: 3000,
      });
      
      setIsLoading(false);
      navigate(from);
    }, 2000);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  React.useEffect(() => {
    // Check for remembered admin login
    const rememberedAdmin = localStorage.getItem('rememberAdminLogin');
    const adminUsername = localStorage.getItem('adminUsername');
    
    if (rememberedAdmin === 'true' && adminUsername === DEMO_ADMIN_USERNAME) {
      sessionStorage.setItem('demoAdminLoggedIn', 'true');
      
      // If we're on the login page and admin is remembered, redirect to admin panel
      if (location.pathname === '/login' || location.pathname === '/admin/login') {
        navigate('/admin');
      }
    }
    
    // Check for remembered user
    const rememberedUser = localStorage.getItem('rememberUser');
    const demoUserLoggedIn = localStorage.getItem('demoUserLoggedIn');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (rememberedUser === 'true' && savedEmail) {
      form.setValue('email', savedEmail);
      form.setValue('rememberMe', true);
      
      // If demo user is remembered and we're on login page, redirect to home
      if (demoUserLoggedIn === 'true' && location.pathname === '/login') {
        navigate('/');
      }
    }
  }, [form, navigate, location.pathname]);

  return (
    <Layout>
      <div className="container max-w-screen-xl mx-auto px-4 py-12 md:py-20">
        <div className="flex justify-center items-center">
          <Card className="w-full max-w-md shadow-lg animate-fade-in">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight text-indigo">Welcome Back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Log in with your email to continue your learning journey
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="relative h-44 w-full overflow-hidden rounded-lg mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo/80 to-teal/80 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white z-10">
                  <div className="text-center px-4">
                    <h3 className="text-xl font-bold mb-2">IELTS Excellence Awaits</h3>
                    <p className="text-sm opacity-90">Continue your preparation journey with personalized practice materials and expert guidance.</p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-coral rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo rounded-full opacity-50 blur-xl"></div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email or Username</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                            <Input 
                              placeholder="your.email@example.com or username" 
                              className="pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <div className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground">
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </div>
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex items-center justify-between">
                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-sm font-normal">
                              Remember me
                            </FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    <Link 
                      to="/forgot-password" 
                      className="text-sm font-medium text-indigo hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full gap-2 font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing In...
                      </div>
                    ) : (
                      <>
                        <LogIn className="h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </Form>
              
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('Google')}
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    <path d="M1 1h22v22H1z" fill="none"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={() => handleSocialLogin('Facebook')}
                  disabled={isLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Facebook
                </Button>
              </div>
              
              <p className="text-center text-sm text-muted-foreground mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="font-medium text-indigo hover:underline">
                  Sign up now
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
