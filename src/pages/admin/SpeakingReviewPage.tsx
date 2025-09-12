
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import SpeakingResponseReview from '@/components/admin/speaking/SpeakingResponseReview';
import { CustomProgress } from '@/components/ui/custom-progress';

const SpeakingReviewPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock statistics for speaking reviews
  const statistics = {
    totalSubmissions: 28,
    pendingReviews: 15,
    completedReviews: 13,
    avgScore: 6.2
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">IELTS Speaking Review</h1>
          <p className="text-muted-foreground">Review and grade student speaking responses</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Submissions</CardTitle>
              <CardDescription>All speaking responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statistics.totalSubmissions}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Reviews</CardTitle>
              <CardDescription>Awaiting instructor review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statistics.pendingReviews}</div>
              <CustomProgress 
                className="h-2 mt-2" 
                value={statistics.pendingReviews / statistics.totalSubmissions * 100} 
                indicatorClassName="bg-amber-500" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completed</CardTitle>
              <CardDescription>Reviews completed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statistics.completedReviews}</div>
              <CustomProgress 
                className="h-2 mt-2" 
                value={statistics.completedReviews / statistics.totalSubmissions * 100} 
                indicatorClassName="bg-green-600" 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Score</CardTitle>
              <CardDescription>Average band score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statistics.avgScore}</div>
              <CustomProgress 
                className="h-2 mt-2" 
                value={statistics.avgScore / 9 * 100} 
                indicatorClassName="bg-indigo-600" 
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search student submissions..." 
              className="h-9" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">Refresh List</Button>
          </div>
        </div>
        
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-3 md:flex">
            <TabsTrigger value="pending">Pending Review</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="all">All Submissions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending" className="mt-4">
            <SpeakingResponseReview />
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Reviews</CardTitle>
                <CardDescription>Speaking responses that have been reviewed</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Select a completed review from the list on the left to view details.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="all" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>All Submissions</CardTitle>
                <CardDescription>All student speaking submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  View all speaking submissions regardless of review status.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SpeakingReviewPage;
