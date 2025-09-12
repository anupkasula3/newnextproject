import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { 
  Mail, 
  Users, 
  Send, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Sparkles, 
  LineChart, 
  UserPlus, 
  Upload,
  Server,
  Shield,
  Database
} from 'lucide-react';

// Define form schema for SMTP settings
const smtpSettingsSchema = z.object({
  host: z.string().min(1, { message: "SMTP host is required." }),
  port: z.coerce.number().int().min(1).max(65535, { message: "Port number must be between 1 and 65535." }),
  username: z.string().min(1, { message: "SMTP username is required." }),
  password: z.string().min(1, { message: "SMTP password is required." }),
  encryption: z.enum(["none", "ssl", "tls"], { message: "Please select an encryption method." }),
  fromEmail: z.string().email({ message: "Please enter a valid email address." }),
  fromName: z.string().min(1, { message: "Sender name is required." }),
  replyToEmail: z.string().email({ message: "Please enter a valid reply-to email address." }),
  enableSmtp: z.boolean().optional(),
});

type SmtpSettingsFormValues = z.infer<typeof smtpSettingsSchema>;

// Define form schema for email settings
const emailSettingsSchema = z.object({
  senderName: z.string().min(2, { message: "Sender name must be at least 2 characters." }),
  senderEmail: z.string().email({ message: "Please enter a valid email address." }),
  replyToEmail: z.string().email({ message: "Please enter a valid reply-to email address." }),
  defaultSubjectLine: z.string().min(5, { message: "Subject line must be at least 5 characters." }),
  emailProvider: z.string().min(1, { message: "Please select an email provider." }),
  apiKey: z.string().min(1, { message: "API key is required." }),
  scheduledSending: z.boolean().optional(),
  trackOpenRates: z.boolean().optional(),
  trackClickRates: z.boolean().optional(),
  enableUnsubscribeLink: z.boolean().optional(),
  doubleOptIn: z.boolean().optional(),
});

type EmailSettingsFormValues = z.infer<typeof emailSettingsSchema>;

// Define form schema for campaign creation
const campaignSchema = z.object({
  campaignName: z.string().min(2, { message: "Campaign name must be at least 2 characters." }),
  subject: z.string().min(5, { message: "Subject line must be at least 5 characters." }),
  previewText: z.string().max(100, { message: "Preview text must be less than 100 characters." }),
  audienceSegment: z.string().min(1, { message: "Please select an audience segment." }),
  scheduledTime: z.string().optional(),
  emailTemplate: z.string().min(1, { message: "Please select an email template." }),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

const EmailMarketingSettings: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'settings' | 'campaigns' | 'templates' | 'subscribers' | 'smtp'>('settings');
  const [templates, setTemplates] = useState<{id: string, name: string}[]>([
    { id: 'welcome', name: 'Welcome Email' },
    { id: 'newsletter', name: 'Monthly Newsletter' },
    { id: 'promo', name: 'Promotional Offer' },
  ]);
  
  // Email Settings Form
  const emailSettingsForm = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      senderName: '',
      senderEmail: '',
      replyToEmail: '',
      defaultSubjectLine: '',
      emailProvider: '',
      apiKey: '',
      scheduledSending: true,
      trackOpenRates: true,
      trackClickRates: true,
      enableUnsubscribeLink: true,
      doubleOptIn: false,
    },
  });
  
  // SMTP Settings Form
  const smtpSettingsForm = useForm<SmtpSettingsFormValues>({
    resolver: zodResolver(smtpSettingsSchema),
    defaultValues: {
      host: '',
      port: 587,
      username: '',
      password: '',
      encryption: 'tls',
      fromEmail: '',
      fromName: '',
      replyToEmail: '',
      enableSmtp: false,
    },
  });
  
  // Campaign Creation Form
  const campaignForm = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      campaignName: '',
      subject: '',
      previewText: '',
      audienceSegment: '',
      scheduledTime: '',
      emailTemplate: '',
    }
  });
  
  // Load saved settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('emailMarketingSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        emailSettingsForm.reset(parsedSettings);
      } catch (e) {
        console.error('Failed to parse saved email marketing settings:', e);
      }
    }
    
    const savedSmtpSettings = localStorage.getItem('smtpSettings');
    if (savedSmtpSettings) {
      try {
        const parsedSettings = JSON.parse(savedSmtpSettings);
        smtpSettingsForm.reset(parsedSettings);
      } catch (e) {
        console.error('Failed to parse saved SMTP settings:', e);
      }
    }
  }, []);
  
  const saveEmailSettings = (values: EmailSettingsFormValues) => {
    localStorage.setItem('emailMarketingSettings', JSON.stringify(values));
    
    toast({
      title: "Email Settings Saved",
      description: "Your email marketing settings have been saved successfully",
    });
  };
  
  const saveSmtpSettings = (values: SmtpSettingsFormValues) => {
    localStorage.setItem('smtpSettings', JSON.stringify(values));
    
    toast({
      title: "SMTP Settings Saved",
      description: "Your SMTP server configuration has been saved successfully",
    });
  };
  
  const testSmtpConnection = () => {
    const values = smtpSettingsForm.getValues();
    
    // Simulate SMTP connection test
    toast({
      title: "Testing SMTP Connection",
      description: "Connecting to SMTP server...",
    });
    
    // In a real application, this would make an API call to test the connection
    setTimeout(() => {
      toast({
        title: "SMTP Connection Successful",
        description: `Successfully connected to ${values.host}:${values.port}`,
      });
    }, 1500);
  };
  
  const sendTestEmail = () => {
    const values = smtpSettingsForm.getValues();
    
    toast({
      title: "Sending Test Email",
      description: `Sending to ${values.fromEmail}...`,
    });
    
    // In a real application, this would make an API call to send a test email
    setTimeout(() => {
      toast({
        title: "Test Email Sent",
        description: "Please check your inbox to confirm receipt",
      });
    }, 2000);
  };
  
  const createCampaign = (values: CampaignFormValues) => {
    // In a real application, this would send data to an API
    console.log('Creating campaign:', values);
    
    toast({
      title: "Campaign Created",
      description: `Campaign "${values.campaignName}" has been created successfully`,
    });
    
    campaignForm.reset();
  };
  
  const importSubscribers = () => {
    toast({
      title: "Import Started",
      description: "Subscriber import process has begun",
    });
    
    // Simulate import process
    setTimeout(() => {
      toast({
        title: "Import Complete",
        description: "542 subscribers have been imported successfully",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex overflow-x-auto pb-2 mb-2 space-x-4">
        <Button 
          variant={activeTab === 'settings' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('settings')}
          className="whitespace-nowrap"
        >
          <Mail className="mr-2 h-4 w-4" />
          Email Settings
        </Button>
        <Button 
          variant={activeTab === 'smtp' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('smtp')}
          className="whitespace-nowrap"
        >
          <Server className="mr-2 h-4 w-4" />
          SMTP Configuration
        </Button>
        <Button 
          variant={activeTab === 'campaigns' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('campaigns')}
          className="whitespace-nowrap"
        >
          <Send className="mr-2 h-4 w-4" />
          Email Campaigns
        </Button>
        <Button 
          variant={activeTab === 'templates' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('templates')}
          className="whitespace-nowrap"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Email Templates
        </Button>
        <Button 
          variant={activeTab === 'subscribers' ? 'default' : 'outline'} 
          onClick={() => setActiveTab('subscribers')}
          className="whitespace-nowrap"
        >
          <Users className="mr-2 h-4 w-4" />
          Subscribers
        </Button>
      </div>
      
      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-indigo-600" />
              Email Marketing Settings
            </CardTitle>
            <CardDescription>
              Configure your email marketing settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...emailSettingsForm}>
              <form onSubmit={emailSettingsForm.handleSubmit(saveEmailSettings)} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Sender Information</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={emailSettingsForm.control}
                      name="senderName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Neplia Team" {...field} />
                          </FormControl>
                          <FormDescription>
                            Name that will appear in recipients' inboxes
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="senderEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sender Email</FormLabel>
                          <FormControl>
                            <Input placeholder="team@neplia.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address that will be used to send emails
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={emailSettingsForm.control}
                      name="replyToEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reply-To Email</FormLabel>
                          <FormControl>
                            <Input placeholder="support@neplia.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address for replies from recipients
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="defaultSubjectLine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Default Subject Line</FormLabel>
                          <FormControl>
                            <Input placeholder="News from Neplia" {...field} />
                          </FormControl>
                          <FormDescription>
                            Default subject line for emails (can be overridden per campaign)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Provider Integration</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={emailSettingsForm.control}
                      name="emailProvider"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Service Provider</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an email provider" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="mailchimp">Mailchimp</SelectItem>
                              <SelectItem value="sendgrid">SendGrid</SelectItem>
                              <SelectItem value="mailerlite">MailerLite</SelectItem>
                              <SelectItem value="campaignmonitor">Campaign Monitor</SelectItem>
                              <SelectItem value="awsses">Amazon SES</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose your email service provider for sending campaigns
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••••••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            API key for connecting to your email service provider
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Features</h3>
                  <div className="space-y-4">
                    <FormField
                      control={emailSettingsForm.control}
                      name="scheduledSending"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Scheduled Sending
                            </FormLabel>
                            <FormDescription>
                              Allow scheduling emails for future delivery
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="trackOpenRates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Track Open Rates
                            </FormLabel>
                            <FormDescription>
                              Track when recipients open your emails
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="trackClickRates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Track Click Rates
                            </FormLabel>
                            <FormDescription>
                              Track when recipients click links in your emails
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="enableUnsubscribeLink"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Unsubscribe Link
                            </FormLabel>
                            <FormDescription>
                              Include unsubscribe link in all emails (required for compliance)
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={emailSettingsForm.control}
                      name="doubleOptIn"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              Double Opt-In
                            </FormLabel>
                            <FormDescription>
                              Require subscribers to confirm their email address
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <Button type="submit" className="mt-6">Save Email Settings</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'smtp' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5 text-indigo-600" />
              SMTP Configuration
            </CardTitle>
            <CardDescription>
              Configure your SMTP server for reliable email delivery
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...smtpSettingsForm}>
              <form onSubmit={smtpSettingsForm.handleSubmit(saveSmtpSettings)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={smtpSettingsForm.control}
                    name="enableSmtp"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Enable SMTP
                          </FormLabel>
                          <FormDescription>
                            Use custom SMTP server for email delivery
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Server Configuration</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={smtpSettingsForm.control}
                        name="host"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Server Host</FormLabel>
                            <FormControl>
                              <Input placeholder="smtp.example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Your SMTP server hostname or IP address
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={smtpSettingsForm.control}
                        name="port"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Port</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                placeholder="587" 
                                {...field} 
                                onChange={e => {
                                  const value = parseInt(e.target.value);
                                  field.onChange(isNaN(value) ? '' : value);
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Common ports: 25, 465 (SSL), 587 (TLS)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={smtpSettingsForm.control}
                      name="encryption"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Encryption</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select encryption type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="ssl">SSL</SelectItem>
                              <SelectItem value="tls">TLS</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose the encryption method for your SMTP connection
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={smtpSettingsForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Username</FormLabel>
                            <FormControl>
                              <Input placeholder="username@example.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Username for SMTP authentication
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={smtpSettingsForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="••••••••••••" {...field} />
                            </FormControl>
                            <FormDescription>
                              Password for SMTP authentication
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Sender Information</h3>
                    <div className="grid gap-4 md:grid-cols-2">
                      <FormField
                        control={smtpSettingsForm.control}
                        name="fromName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Neplia Team" {...field} />
                            </FormControl>
                            <FormDescription>
                              Name that will appear in recipients' inboxes
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={smtpSettingsForm.control}
                        name="fromEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Email</FormLabel>
                            <FormControl>
                              <Input placeholder="noreply@neplia.com" {...field} />
                            </FormControl>
                            <FormDescription>
                              Email address that will appear as the sender
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={smtpSettingsForm.control}
                      name="replyToEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reply-To Email</FormLabel>
                          <FormControl>
                            <Input placeholder="support@neplia.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            Email address for replies from recipients (leave blank to use From Email)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <Button type="submit">Save SMTP Settings</Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={testSmtpConnection}
                  >
                    Test Connection
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={sendTestEmail}
                  >
                    Send Test Email
                  </Button>
                </div>
              </form>
            </Form>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">SMTP Delivery Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-muted-foreground">Emails Sent (24h)</div>
                  <div className="text-2xl font-bold">143</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-muted-foreground">Delivery Rate</div>
                  <div className="text-2xl font-bold">98.2%</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-muted-foreground">Bounce Rate</div>
                  <div className="text-2xl font-bold">1.8%</div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Recent Email Logs</h3>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Time</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Recipient</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Subject</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 align-middle">Today, 10:32 AM</td>
                        <td className="p-4 align-middle">user1@example.com</td>
                        <td className="p-4 align-middle">Welcome to Neplia</td>
                        <td className="p-4 align-middle">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Delivered</span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 align-middle">Today, 09:15 AM</td>
                        <td className="p-4 align-middle">user2@example.com</td>
                        <td className="p-4 align-middle">Password Reset</td>
                        <td className="p-4 align-middle">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Delivered</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 align-middle">Yesterday, 3:45 PM</td>
                        <td className="p-4 align-middle">invalid@example.net</td>
                        <td className="p-4 align-middle">April Newsletter</td>
                        <td className="p-4 align-middle">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Bounced</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'campaigns' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-indigo-600" />
              Email Campaigns
            </CardTitle>
            <CardDescription>
              Create and manage your email marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">Campaign Statistics</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Total Sent</div>
                  <div className="text-2xl font-bold">1,245</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Open Rate</div>
                  <div className="text-2xl font-bold">24.8%</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Click Rate</div>
                  <div className="text-2xl font-bold">3.2%</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Unsubscribes</div>
                  <div className="text-2xl font-bold">0.5%</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Create New Campaign</h3>
              <Form {...campaignForm}>
                <form onSubmit={campaignForm.handleSubmit(createCampaign)} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={campaignForm.control}
                      name="campaignName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Campaign Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Summer 2023 Newsletter" {...field} />
                          </FormControl>
                          <FormDescription>
                            Internal name to identify this campaign
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={campaignForm.control}
                      name="emailTemplate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Template</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {templates.map(template => (
                                <SelectItem key={template.id} value={template.id}>
                                  {template.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose a template for your campaign
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={campaignForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject Line</FormLabel>
                          <FormControl>
                            <Input placeholder="Check out our latest offers!" {...field} />
                          </FormControl>
                          <FormDescription>
                            The subject line recipients will see
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={campaignForm.control}
                      name="previewText"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preview Text</FormLabel>
                          <FormControl>
                            <Input placeholder="Special discounts inside!" {...field} />
                          </FormControl>
                          <FormDescription>
                            Text that appears after the subject line in some email clients
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={campaignForm.control}
                      name="audienceSegment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Audience Segment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select audience segment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="all">All Subscribers</SelectItem>
                              <SelectItem value="active">Active Users</SelectItem>
                              <SelectItem value="inactive">Inactive Users (30+ days)</SelectItem>
                              <SelectItem value="new">New Subscribers (last 7 days)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Choose which subscribers will receive this campaign
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={campaignForm.control}
                      name="scheduledTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Schedule Delivery</FormLabel>
                          <FormControl>
                            <Input type="datetime-local" {...field} />
                          </FormControl>
                          <FormDescription>
                            When to send this campaign (leave empty to send immediately)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end pt-4">
                    <Button type="submit">Create Campaign</Button>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Recent Campaigns</h3>
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">Campaign Name</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Sent</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Open Rate</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4 align-middle">April Newsletter</td>
                        <td className="p-4 align-middle"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Sent</span></td>
                        <td className="p-4 align-middle">542</td>
                        <td className="p-4 align-middle">26.4%</td>
                        <td className="p-4 align-middle">Apr 15, 2023</td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">View Report</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4 align-middle">Welcome Sequence</td>
                        <td className="p-4 align-middle"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Automated</span></td>
                        <td className="p-4 align-middle">128</td>
                        <td className="p-4 align-middle">42.1%</td>
                        <td className="p-4 align-middle">Ongoing</td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">View Report</Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 align-middle">Summer Sale</td>
                        <td className="p-4 align-middle"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Scheduled</span></td>
                        <td className="p-4 align-middle">--</td>
                        <td className="p-4 align-middle">--</td>
                        <td className="p-4 align-middle">Jun 1, 2023</td>
                        <td className="p-4 align-middle">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'templates' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-indigo-600" />
              Email Templates
            </CardTitle>
            <CardDescription>
              Manage email templates for your marketing campaigns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
              {templates.map((template) => (
                <div key={template.id} className="border rounded-lg overflow-hidden shadow-sm">
                  <div className="h-40 bg-gray-100 flex items-center justify-center">
                    <Mail className="h-16 w-16 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium mb-2">{template.name}</h4>
                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">Preview</Button>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border rounded-lg overflow-hidden border-dashed">
                <div className="h-40 bg-gray-50 flex items-center justify-center">
                  <div className="text-gray-400 text-center">
                    <Sparkles className="h-16 w-16 mx-auto mb-2" />
                    <span>Create Template</span>
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium mb-2">New Template</h4>
                  <Button className="w-full">Create New</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {activeTab === 'subscribers' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-600" />
              Email Subscribers
            </CardTitle>
            <CardDescription>
              Manage your email subscribers and list segments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h3 className="text-lg font-medium mb-2">Subscriber Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Total Subscribers</div>
                  <div className="text-2xl font-bold">2,458</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Active</div>
                  <div className="text-2xl font-bold">2,104</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Gained (30 days)</div>
                  <div className="text-2xl font-bold">+128</div>
                </div>
                <div className="bg-background p-4 rounded-lg shadow-sm">
                  <div className="text-sm text-muted-foreground">Lost (30 days)</div>
                  <div className="text-2xl font-bold">-24</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-4">
              <div className="flex gap-2">
                <Button onClick={importSubscribers}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Subscribers
                </Button>
                <Button variant="outline">
                  Export List
                </Button>
              </div>
              <div className="flex gap-2">
                <Input className="max-w-xs" placeholder="Search subscribers..." />
                <Button variant="secondary">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Subscriber
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Last Opened</th>
                      <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 align-middle">sarah.johnson@example.com</td>
                      <td className="p-4 align-middle">Sarah Johnson</td>
                      <td className="p-4 align-middle"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                      <td className="p-4 align-middle">Mar 15, 2023</td>
                      <td className="p-4 align-middle">May 2, 2023</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">michael.smith@example.com</td>
                      <td className="p-4 align-middle">Michael Smith</td>
                      <td className="p-4 align-middle"><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Active</span></td>
                      <td className="p-4 align-middle">Apr 3, 2023</td>
                      <td className="p-4 align-middle">Apr 28, 2023</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 align-middle">emma.davis@example.com</td>
                      <td className="p-4 align-middle">Emma Davis</td>
                      <td className="p-4 align-middle"><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Unsubscribed</span></td>
                      <td className="p-4 align-middle">Jan 12, 2023</td>
                      <td className="p-4 align-middle">Mar 8, 2023</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 align-middle">david.wilson@example.com</td>
                      <td className="p-4 align-middle">David Wilson</td>
                      <td className="p-4 align-middle"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Bounced</span></td>
                      <td className="p-4 align-middle">Feb 28, 2023</td>
                      <td className="p-4 align-middle">Never</td>
                      <td className="p-4 align-middle">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmailMarketingSettings;
