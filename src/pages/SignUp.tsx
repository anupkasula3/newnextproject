import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Layout from '@/components/Layout';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  RadioGroup, 
  RadioGroupItem 
} from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Lock, 
  Phone, 
  Building, 
  MapPin, 
  Globe, 
  Calendar, 
  BookOpen, 
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." }),
  confirmPassword: z.string(),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  dateOfBirth: z.string().min(1, { message: "Please select your date of birth." }),
  gender: z.string({
    required_error: "Please select a gender option.",
  }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City must be at least 2 characters." }),
  state: z.string().min(2, { message: "State must be at least 2 characters." }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters." }),
  country: z.string().min(2, { message: "Please select a country." }),
  educationLevel: z.string({
    required_error: "Please select your highest education level.",
  }),
  englishProficiency: z.string({
    required_error: "Please select your English proficiency level.",
  }),
  targetExam: z.string({
    required_error: "Please select your target exam.",
  }),
  studyGoals: z.string().min(10, { message: "Study goals must be at least 10 characters." }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions to continue.",
  }),
  marketingAccepted: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const SignUp = () => {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      educationLevel: "",
      englishProficiency: "",
      targetExam: "",
      studyGoals: "",
      termsAccepted: false,
      marketingAccepted: false,
    },
  });

  const onSubmit = (values: FormValues) => {
    toast({
      title: "Account created successfully!",
      description: "Welcome to our IELTS preparation platform.",
    });
    console.log(values);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `Logging in with ${provider}`,
      description: "Redirecting to authentication provider...",
    });
    console.log(`Login with ${provider}`);
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-4 max-w-5xl animate-fade-in">
        <Card className="shadow-lg border-2 border-primary/10">
          <CardHeader className="bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="text-3xl font-heading">Create Your Account</CardTitle>
            <CardDescription className="text-white/90">Join our community of learners and begin your success journey</CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="mb-8 space-y-4">
              <h3 className="text-xl font-semibold border-b pb-2 text-indigo-700">Quick Sign Up</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2"
                  onClick={() => handleSocialLogin("Google")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                    <path d="M15.547 8.303A5.148 5.148 0 0 0 12.11 7C9.287 7 7 9.239 7 12s2.287 5 5.11 5c3.627 0 4.92-2.999 5.24-4.5h-4.86"></path>
                    <path d="M12 7v10"></path>
                    <circle cx="12" cy="12" r="10"></circle>
                  </svg>
                  <span className="text-gray-700">Continue with Google</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2"
                  onClick={() => handleSocialLogin("Facebook")}
                >
                  <Facebook className="text-blue-600" size={20} />
                  <span className="text-gray-700">Continue with Facebook</span>
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2"
                  onClick={() => handleSocialLogin("Twitter")}
                >
                  <Twitter className="text-blue-400" size={20} />
                  <span className="text-gray-700">Continue with Twitter</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border-2"
                  onClick={() => handleSocialLogin("LinkedIn")}
                >
                  <Linkedin className="text-blue-700" size={20} />
                  <span className="text-gray-700">Continue with LinkedIn</span>
                </Button>
              </div>
            </div>
            
            <div className="relative my-8">
              <Separator />
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-500">
                Or sign up with email
              </span>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2 text-indigo-700">Personal Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="John" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="Doe" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="email" placeholder="john.doe@example.com" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="+1 (555) 123-4567" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="date" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>Gender</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col md:flex-row gap-4 md:gap-6"
                            >
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="male" />
                                </FormControl>
                                <FormLabel className="font-normal">Male</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="female" />
                                </FormControl>
                                <FormLabel className="font-normal">Female</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="other" />
                                </FormControl>
                                <FormLabel className="font-normal">Other</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="prefer-not-to-say" />
                                </FormControl>
                                <FormLabel className="font-normal">Prefer not to say</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2 text-indigo-700">Address Information</h3>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input className="pl-10" placeholder="123 Main Street" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" placeholder="New York" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State/Province</FormLabel>
                          <FormControl>
                            <Input placeholder="NY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Zip/Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="10001" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <div className="relative">
                              <Globe className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <SelectTrigger className="pl-10">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </div>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="usa">United States</SelectItem>
                            <SelectItem value="canada">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="australia">Australia</SelectItem>
                            <SelectItem value="india">India</SelectItem>
                            <SelectItem value="china">China</SelectItem>
                            <SelectItem value="japan">Japan</SelectItem>
                            <SelectItem value="germany">Germany</SelectItem>
                            <SelectItem value="france">France</SelectItem>
                            <SelectItem value="brazil">Brazil</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2 text-indigo-700">Education & Test Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="educationLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Highest Education Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <div className="relative">
                                <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Select your education level" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high-school">High School</SelectItem>
                              <SelectItem value="diploma">Diploma</SelectItem>
                              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                              <SelectItem value="masters">Master's Degree</SelectItem>
                              <SelectItem value="phd">Ph.D</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="englishProficiency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current English Proficiency</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <div className="relative">
                                <BookOpen className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                <SelectTrigger className="pl-10">
                                  <SelectValue placeholder="Select your proficiency level" />
                                </SelectTrigger>
                              </div>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (A1)</SelectItem>
                              <SelectItem value="elementary">Elementary (A2)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (B1)</SelectItem>
                              <SelectItem value="upper-intermediate">Upper Intermediate (B2)</SelectItem>
                              <SelectItem value="advanced">Advanced (C1)</SelectItem>
                              <SelectItem value="proficient">Proficient (C2)</SelectItem>
                              <SelectItem value="native">Native Speaker</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="targetExam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Target Exam</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your target exam" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="ielts-academic">IELTS Academic</SelectItem>
                            <SelectItem value="ielts-general">IELTS General Training</SelectItem>
                            <SelectItem value="toefl">TOEFL</SelectItem>
                            <SelectItem value="pte">PTE Academic</SelectItem>
                            <SelectItem value="cambridge">Cambridge English</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="studyGoals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Study Goals</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please describe why you're preparing for IELTS and what you hope to achieve..."
                            className="resize-none min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          This helps us tailor our recommendations to your specific needs.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold border-b pb-2 text-indigo-700">Account Security</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="password" placeholder="••••••••" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters with uppercase, lowercase, number, and special character.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" type="password" placeholder="••••••••" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 p-4 bg-muted rounded-lg">
                  <h3 className="text-xl font-semibold text-indigo-700">Terms and Agreements</h3>
                  
                  <div className="max-h-40 overflow-y-auto p-3 bg-background border rounded mb-4 text-sm">
                    <p className="mb-2"><strong>Terms and Conditions</strong></p>
                    <p className="mb-2">Welcome to our IELTS preparation platform. By creating an account, you agree to be bound by the following terms and conditions:</p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>You must provide accurate and complete information when creating your account.</li>
                      <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
                      <li>You agree not to share your account or learning materials with others.</li>
                      <li>We reserve the right to modify or terminate the service for any reason without notice.</li>
                      <li>All content provided is for educational purposes only and should not be reproduced without permission.</li>
                      <li>We collect and process your personal information in accordance with our Privacy Policy.</li>
                      <li>You agree to use the platform in compliance with all applicable laws and regulations.</li>
                      <li>We may send you important notifications regarding your account or the service.</li>
                    </ol>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-indigo-50">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none">
                            I agree to the terms and conditions and privacy policy
                          </FormLabel>
                          <FormDescription>
                            By checking this box, you confirm that you have read and agree to our <Link to="#" className="text-indigo-600 underline">Terms of Service</Link> and <Link to="#" className="text-indigo-600 underline">Privacy Policy</Link>.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="marketingAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none">
                            I would like to receive emails about updates, special offers, and tips
                          </FormLabel>
                          <FormDescription>
                            We'll never spam you, and you can unsubscribe at any time.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                
                <CardFooter className="flex flex-col md:flex-row gap-4 pt-6 px-0">
                  <Button type="submit" className="w-full md:w-auto" size="lg">
                    Create Account
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-600 hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default SignUp;
