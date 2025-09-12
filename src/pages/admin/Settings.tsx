import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import DatabaseSettings from '@/components/admin/DatabaseSettings';
import EmailMarketingSettings from '@/components/admin/EmailMarketingSettings';
import SocialAuthSettings from '@/components/admin/SocialAuthSettings';
import { Server } from 'lucide-react';

const Settings = () => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been saved successfully",
    });
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-muted-foreground">
            Manage your application settings, appearance, and configurations.
          </p>
        </div>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="auth">Authentication</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="database">Database</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your website general settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input id="site-name" placeholder="Neplia" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="site-description">Site Description</Label>
                  <Textarea 
                    id="site-description" 
                    placeholder="A comprehensive platform for language test preparation" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input id="contact-email" type="email" placeholder="contact@neplia.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Input id="timezone" placeholder="UTC" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Put the site in maintenance mode
                    </div>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how your website looks to users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input id="primary-color" placeholder="#3B82F6" />
                    <div className="w-10 h-10 rounded bg-blue-500"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo-upload">Logo</Label>
                  <Input id="logo-upload" type="file" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="favicon-upload">Favicon</Label>
                  <Input id="favicon-upload" type="file" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode">Default to Dark Mode</Label>
                    <div className="text-sm text-muted-foreground">
                      Set dark mode as the default theme
                    </div>
                  </div>
                  <Switch id="dark-mode" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure how and when to send notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Send important updates via email
                    </div>
                  </div>
                  <Switch id="email-notifications" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">New User Registration</Label>
                    <div className="text-sm text-muted-foreground">
                      Send notifications when new users register
                    </div>
                  </div>
                  <Switch id="user-registration" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="content-updates">Content Updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Send notifications when content is updated
                    </div>
                  </div>
                  <Switch id="content-updates" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-from">From Email Address</Label>
                  <Input id="email-from" type="email" placeholder="noreply@neplia.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email-template">Email Template</Label>
                  <Textarea id="email-template" placeholder="Enter your email template HTML" />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave}>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="auth" className="space-y-6">
            <SocialAuthSettings />
          </TabsContent>
          
          <TabsContent value="email" className="space-y-6">
            <EmailMarketingSettings />
          </TabsContent>
          
          <TabsContent value="database" className="space-y-6">
            <DatabaseSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
