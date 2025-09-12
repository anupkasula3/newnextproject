
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

const SocialAuthSettings = () => {
  const { toast } = useToast();
  const [authProviders, setAuthProviders] = useState({
    google: {
      enabled: true,
      clientId: "your-google-client-id",
      clientSecret: "your-google-client-secret",
      redirectUrl: "https://yourdomain.com/auth/google/callback"
    },
    facebook: {
      enabled: false,
      appId: "your-facebook-app-id",
      appSecret: "your-facebook-app-secret",
      redirectUrl: "https://yourdomain.com/auth/facebook/callback"
    },
    twitter: {
      enabled: false,
      apiKey: "your-twitter-api-key",
      apiSecret: "your-twitter-api-secret",
      redirectUrl: "https://yourdomain.com/auth/twitter/callback"
    },
    github: {
      enabled: false,
      clientId: "your-github-client-id",
      clientSecret: "your-github-client-secret",
      redirectUrl: "https://yourdomain.com/auth/github/callback"
    },
    linkedin: {
      enabled: false,
      clientId: "your-linkedin-client-id",
      clientSecret: "your-linkedin-client-secret",
      redirectUrl: "https://yourdomain.com/auth/linkedin/callback"
    }
  });

  const handleToggleProvider = (provider) => {
    setAuthProviders({
      ...authProviders,
      [provider]: {
        ...authProviders[provider],
        enabled: !authProviders[provider].enabled
      }
    });
  };

  const handleInputChange = (provider, field, value) => {
    setAuthProviders({
      ...authProviders,
      [provider]: {
        ...authProviders[provider],
        [field]: value
      }
    });
  };

  const handleSave = () => {
    // Here you would typically save to a database
    toast({
      title: "Social Authentication Settings Saved",
      description: "Your social authentication settings have been updated successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Authentication Settings</CardTitle>
        <CardDescription>
          Configure social media authentication providers for your application
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="google" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="google" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                <path d="M1 1h22v22H1z" fill="none"/>
              </svg>
              Google
            </TabsTrigger>
            <TabsTrigger value="facebook" className="flex items-center gap-2">
              <Facebook size={16} color="#1877F2" />
              Facebook
            </TabsTrigger>
            <TabsTrigger value="twitter" className="flex items-center gap-2">
              <Twitter size={16} color="#1DA1F2" />
              Twitter
            </TabsTrigger>
            <TabsTrigger value="github" className="flex items-center gap-2">
              <Github size={16} />
              GitHub
            </TabsTrigger>
            <TabsTrigger value="linkedin" className="flex items-center gap-2">
              <Linkedin size={16} color="#0A66C2" />
              LinkedIn
            </TabsTrigger>
          </TabsList>

          {/* Google Settings */}
          <TabsContent value="google">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Google Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable authentication via Google
                  </div>
                </div>
                <Switch 
                  checked={authProviders.google.enabled} 
                  onCheckedChange={() => handleToggleProvider('google')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-client-id">Client ID</Label>
                <Input 
                  id="google-client-id" 
                  value={authProviders.google.clientId} 
                  onChange={(e) => handleInputChange('google', 'clientId', e.target.value)} 
                  disabled={!authProviders.google.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-client-secret">Client Secret</Label>
                <Input 
                  id="google-client-secret" 
                  type="password"
                  value={authProviders.google.clientSecret} 
                  onChange={(e) => handleInputChange('google', 'clientSecret', e.target.value)} 
                  disabled={!authProviders.google.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="google-redirect">Redirect URL</Label>
                <Input 
                  id="google-redirect" 
                  value={authProviders.google.redirectUrl} 
                  onChange={(e) => handleInputChange('google', 'redirectUrl', e.target.value)} 
                  disabled={!authProviders.google.enabled}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The redirect URL must be configured in your Google Developer Console.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Facebook Settings */}
          <TabsContent value="facebook">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Facebook Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable authentication via Facebook
                  </div>
                </div>
                <Switch 
                  checked={authProviders.facebook.enabled} 
                  onCheckedChange={() => handleToggleProvider('facebook')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-app-id">App ID</Label>
                <Input 
                  id="facebook-app-id" 
                  value={authProviders.facebook.appId} 
                  onChange={(e) => handleInputChange('facebook', 'appId', e.target.value)} 
                  disabled={!authProviders.facebook.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-app-secret">App Secret</Label>
                <Input 
                  id="facebook-app-secret" 
                  type="password"
                  value={authProviders.facebook.appSecret} 
                  onChange={(e) => handleInputChange('facebook', 'appSecret', e.target.value)} 
                  disabled={!authProviders.facebook.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="facebook-redirect">Redirect URL</Label>
                <Input 
                  id="facebook-redirect" 
                  value={authProviders.facebook.redirectUrl} 
                  onChange={(e) => handleInputChange('facebook', 'redirectUrl', e.target.value)} 
                  disabled={!authProviders.facebook.enabled}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The redirect URL must be configured in your Facebook Developer Dashboard.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* Twitter Settings */}
          <TabsContent value="twitter">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Twitter Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable authentication via Twitter
                  </div>
                </div>
                <Switch 
                  checked={authProviders.twitter.enabled} 
                  onCheckedChange={() => handleToggleProvider('twitter')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-api-key">API Key</Label>
                <Input 
                  id="twitter-api-key" 
                  value={authProviders.twitter.apiKey} 
                  onChange={(e) => handleInputChange('twitter', 'apiKey', e.target.value)} 
                  disabled={!authProviders.twitter.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-api-secret">API Secret</Label>
                <Input 
                  id="twitter-api-secret" 
                  type="password"
                  value={authProviders.twitter.apiSecret} 
                  onChange={(e) => handleInputChange('twitter', 'apiSecret', e.target.value)} 
                  disabled={!authProviders.twitter.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="twitter-redirect">Redirect URL</Label>
                <Input 
                  id="twitter-redirect" 
                  value={authProviders.twitter.redirectUrl} 
                  onChange={(e) => handleInputChange('twitter', 'redirectUrl', e.target.value)} 
                  disabled={!authProviders.twitter.enabled}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The redirect URL must be configured in your Twitter Developer Portal.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* GitHub Settings */}
          <TabsContent value="github">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>GitHub Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable authentication via GitHub
                  </div>
                </div>
                <Switch 
                  checked={authProviders.github.enabled} 
                  onCheckedChange={() => handleToggleProvider('github')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github-client-id">Client ID</Label>
                <Input 
                  id="github-client-id" 
                  value={authProviders.github.clientId} 
                  onChange={(e) => handleInputChange('github', 'clientId', e.target.value)} 
                  disabled={!authProviders.github.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github-client-secret">Client Secret</Label>
                <Input 
                  id="github-client-secret" 
                  type="password"
                  value={authProviders.github.clientSecret} 
                  onChange={(e) => handleInputChange('github', 'clientSecret', e.target.value)} 
                  disabled={!authProviders.github.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="github-redirect">Redirect URL</Label>
                <Input 
                  id="github-redirect" 
                  value={authProviders.github.redirectUrl} 
                  onChange={(e) => handleInputChange('github', 'redirectUrl', e.target.value)} 
                  disabled={!authProviders.github.enabled}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The redirect URL must be configured in your GitHub OAuth Application settings.
                </p>
              </div>
            </div>
          </TabsContent>

          {/* LinkedIn Settings */}
          <TabsContent value="linkedin">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>LinkedIn Authentication</Label>
                  <div className="text-sm text-muted-foreground">
                    Enable authentication via LinkedIn
                  </div>
                </div>
                <Switch 
                  checked={authProviders.linkedin.enabled} 
                  onCheckedChange={() => handleToggleProvider('linkedin')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-client-id">Client ID</Label>
                <Input 
                  id="linkedin-client-id" 
                  value={authProviders.linkedin.clientId} 
                  onChange={(e) => handleInputChange('linkedin', 'clientId', e.target.value)} 
                  disabled={!authProviders.linkedin.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-client-secret">Client Secret</Label>
                <Input 
                  id="linkedin-client-secret" 
                  type="password"
                  value={authProviders.linkedin.clientSecret} 
                  onChange={(e) => handleInputChange('linkedin', 'clientSecret', e.target.value)} 
                  disabled={!authProviders.linkedin.enabled}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin-redirect">Redirect URL</Label>
                <Input 
                  id="linkedin-redirect" 
                  value={authProviders.linkedin.redirectUrl} 
                  onChange={(e) => handleInputChange('linkedin', 'redirectUrl', e.target.value)} 
                  disabled={!authProviders.linkedin.enabled}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  The redirect URL must be configured in your LinkedIn Developer Portal.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave}>Save Social Authentication Settings</Button>
      </CardFooter>
    </Card>
  );
};

export default SocialAuthSettings;
