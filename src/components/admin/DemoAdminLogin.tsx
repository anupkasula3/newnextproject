
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

// Demo credentials moved to a more secure location
const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "demo123";

export const DemoAdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simple demo validation
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      // In a real app, this would set authentication state
      // For demo, just show success and redirect
      setTimeout(() => {
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
        
        // Store demo login in session storage
        sessionStorage.setItem('demoAdminLoggedIn', 'true');
        
        navigate('/admin/dashboard');
        setIsLoading(false);
      }, 1000);
    } else {
      setTimeout(() => {
        toast({
          title: "Login failed",
          description: "Invalid username or password",
          variant: "destructive"
        });
        setIsLoading(false);
      }, 1000);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-block p-3 bg-indigo-600 text-white rounded-lg mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 22V16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 7L12 12L4 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 17L12 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Neplia Admin</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your credentials to continue</p>
        </div>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your admin credentials
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="mt-4 text-center text-sm text-gray-500">
          <p>This is a demo admin panel. No actual data is saved.</p>
          <p className="mt-2">
            <a href="/" className="text-indigo-600 hover:underline">Return to main site</a>
          </p>
        </div>
      </div>
    </div>
  );
};
