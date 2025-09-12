
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmailMarketingSettings from '@/components/admin/EmailMarketingSettings';
import { Mail, MessageSquare, Edit } from 'lucide-react';

// Define types for our marketing campaigns
interface Campaign {
  id: string;
  name: string;
  description: string;
  scheduleType: string;
  isActive: boolean;
}

// Define types for subscribers
interface Subscriber {
  id: string;
  email: string;
  name: string;
  listId: string;
  dateAdded: string;
}

// Define types for subscriber lists
interface SubscriberList {
  id: string;
  name: string;
  subscriberCount: number;
}

const Marketing = () => {
  const { toast } = useToast();
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [subscriberLists, setSubscriberLists] = useState<SubscriberList[]>([]);
  const [campaignForm, setCampaignForm] = useState({
    name: '',
    description: '',
    scheduleType: 'immediate',
    isActive: false
  });
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('marketingCampaigns');
    if (savedCampaigns) {
      setCampaigns(JSON.parse(savedCampaigns));
    } else {
      // Set default campaigns if none exist
      const defaultCampaigns = [
        { id: "welcome", name: "Welcome Series", description: "Sent to new users after sign up", scheduleType: "immediate", isActive: true },
        { id: "retention", name: "User Retention", description: "Re-engage inactive users", scheduleType: "scheduled", isActive: false },
        { id: "exam-prep", name: "Exam Preparation", description: "Tips for upcoming exams", scheduleType: "recurring", isActive: true },
      ];
      setCampaigns(defaultCampaigns);
      localStorage.setItem('marketingCampaigns', JSON.stringify(defaultCampaigns));
    }
    
    const savedLists = localStorage.getItem('subscriberLists');
    if (savedLists) {
      setSubscriberLists(JSON.parse(savedLists));
    } else {
      // Set default subscriber lists if none exist
      const defaultLists = [
        { id: "main", name: "Main List", subscriberCount: 543 },
        { id: "ielts", name: "IELTS Students", subscriberCount: 212 },
        { id: "toefl", name: "TOEFL Students", subscriberCount: 189 },
        { id: "inactive", name: "Inactive Users", subscriberCount: 87 },
      ];
      setSubscriberLists(defaultLists);
      localStorage.setItem('subscriberLists', JSON.stringify(defaultLists));
    }
  }, []);

  // Update form when campaign selection changes
  useEffect(() => {
    if (selectedCampaign) {
      const campaign = campaigns.find(c => c.id === selectedCampaign);
      if (campaign) {
        setCampaignForm({
          name: campaign.name,
          description: campaign.description || '',
          scheduleType: campaign.scheduleType || 'immediate',
          isActive: campaign.isActive
        });
      }
    }
  }, [selectedCampaign, campaigns]);

  const handleSave = () => {
    if (selectedCampaign) {
      // Update existing campaign
      const updatedCampaigns = campaigns.map(campaign => {
        if (campaign.id === selectedCampaign) {
          return {
            ...campaign,
            name: campaignForm.name,
            description: campaignForm.description,
            scheduleType: campaignForm.scheduleType,
            isActive: campaignForm.isActive
          };
        }
        return campaign;
      });
      
      setCampaigns(updatedCampaigns);
      localStorage.setItem('marketingCampaigns', JSON.stringify(updatedCampaigns));
      
      toast({
        title: "Campaign Updated",
        description: "Your campaign has been updated successfully",
      });
    } else {
      // For other settings
      toast({
        title: "Settings Saved",
        description: "Your marketing settings have been saved successfully",
      });
    }
  };

  const handleCreateCampaign = () => {
    const newCampaign = {
      id: `campaign-${Date.now()}`,
      name: "New Campaign",
      description: "Campaign description",
      scheduleType: "immediate",
      isActive: false
    };
    
    const updatedCampaigns = [...campaigns, newCampaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem('marketingCampaigns', JSON.stringify(updatedCampaigns));
    setSelectedCampaign(newCampaign.id);
    
    toast({
      title: "Campaign Created",
      description: "New campaign has been created",
    });
  };

  const handleDeleteCampaign = () => {
    if (selectedCampaign) {
      const updatedCampaigns = campaigns.filter(campaign => campaign.id !== selectedCampaign);
      setCampaigns(updatedCampaigns);
      localStorage.setItem('marketingCampaigns', JSON.stringify(updatedCampaigns));
      setSelectedCampaign(null);
      
      toast({
        title: "Campaign Deleted",
        description: "The campaign has been deleted",
      });
    }
  };

  const handleFormChange = (field: string, value: string | boolean) => {
    setCampaignForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Marketing</h1>
          <p className="text-muted-foreground">
            Manage email campaigns, subscribers, and marketing automation.
          </p>
        </div>

        <Tabs defaultValue="campaigns" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="campaigns" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Campaigns
            </TabsTrigger>
            <TabsTrigger value="subscribers" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Subscribers
            </TabsTrigger>
            <TabsTrigger value="templates" className="flex items-center gap-2">
              <Edit className="h-4 w-4" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="campaigns" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-1">
                <Card>
                  <CardHeader>
                    <CardTitle>Email Campaigns</CardTitle>
                    <CardDescription>
                      Manage your marketing campaigns
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      variant="default"
                      onClick={handleCreateCampaign}
                    >
                      Create New Campaign
                    </Button>
                    <div className="space-y-2">
                      {campaigns.map(campaign => (
                        <div 
                          key={campaign.id}
                          className={`p-2 rounded cursor-pointer ${selectedCampaign === campaign.id ? 'bg-muted' : 'hover:bg-muted/50'}`}
                          onClick={() => setSelectedCampaign(campaign.id)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{campaign.name}</span>
                            {campaign.isActive && (
                              <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="md:col-span-3">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {selectedCampaign 
                        ? campaigns.find(c => c.id === selectedCampaign)?.name 
                        : "Campaign Details"}
                    </CardTitle>
                    <CardDescription>
                      {selectedCampaign 
                        ? "Edit your campaign settings and content" 
                        : "Select a campaign from the list or create a new one"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedCampaign ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="campaign-name">Campaign Name</Label>
                          <Input 
                            id="campaign-name" 
                            value={campaignForm.name}
                            onChange={(e) => handleFormChange('name', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="campaign-description">Description</Label>
                          <Textarea 
                            id="campaign-description" 
                            placeholder="Enter a description for this campaign..."
                            value={campaignForm.description}
                            onChange={(e) => handleFormChange('description', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schedule-type">Schedule Type</Label>
                          <Select 
                            value={campaignForm.scheduleType}
                            onValueChange={(value) => handleFormChange('scheduleType', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select schedule type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="immediate">Immediate</SelectItem>
                              <SelectItem value="scheduled">Scheduled</SelectItem>
                              <SelectItem value="recurring">Recurring</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="campaign-active">Active</Label>
                            <div className="text-sm text-muted-foreground">
                              Enable or disable this campaign
                            </div>
                          </div>
                          <Switch 
                            id="campaign-active" 
                            checked={campaignForm.isActive}
                            onCheckedChange={(checked) => handleFormChange('isActive', checked)}
                          />
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        Select a campaign from the list to view and edit details
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="justify-between">
                    {selectedCampaign && (
                      <>
                        <Button variant="outline">Preview</Button>
                        <div className="space-x-2">
                          <Button variant="destructive" onClick={handleDeleteCampaign}>Delete</Button>
                          <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                      </>
                    )}
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subscribers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscriber Management</CardTitle>
                <CardDescription>
                  Manage your subscriber lists and segments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subscriber-search">Search Subscribers</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="subscriber-search" 
                      placeholder="Search by name or email..." 
                      className="flex-1"
                    />
                    <Button>Search</Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Subscriber Lists</Label>
                  <div className="border rounded-md">
                    {subscriberLists.map(list => (
                      <div key={list.id} className="p-3 border-b flex justify-between items-center last:border-0">
                        <div className="font-medium">{list.name}</div>
                        <div className="text-sm text-muted-foreground">{list.subscriberCount} subscribers</div>
                      </div>
                    ))}
                  </div>
                </div>
                <Button onClick={() => {
                  toast({
                    title: "Feature Coming Soon",
                    description: "This feature is currently under development",
                  });
                }}>Create New List</Button>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => {
                  toast({
                    title: "Import Subscribers",
                    description: "Import feature will be available soon",
                  });
                }}>Import Subscribers</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>
                  Design and manage your email templates
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border border-dashed flex flex-col items-center justify-center p-6 h-40">
                    <Button variant="ghost" onClick={() => {
                      toast({
                        title: "Template Editor",
                        description: "Template editor will be available soon",
                      });
                    }}>+ New Template</Button>
                  </Card>
                  <Card className="border hover:border-primary/50 cursor-pointer h-40 overflow-hidden" onClick={() => {
                    toast({
                      title: "Template Editor",
                      description: "Template editor will be available soon",
                    });
                  }}>
                    <div className="h-24 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800"></div>
                    <div className="p-2">
                      <h3 className="font-medium">Welcome Email</h3>
                      <p className="text-xs text-muted-foreground">Last edited 3 days ago</p>
                    </div>
                  </Card>
                  <Card className="border hover:border-primary/50 cursor-pointer h-40 overflow-hidden" onClick={() => {
                    toast({
                      title: "Template Editor",
                      description: "Template editor will be available soon",
                    });
                  }}>
                    <div className="h-24 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800"></div>
                    <div className="p-2">
                      <h3 className="font-medium">Course Completion</h3>
                      <p className="text-xs text-muted-foreground">Last edited 1 week ago</p>
                    </div>
                  </Card>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleSave}>Manage Templates</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-6">
            <EmailMarketingSettings />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Marketing;
