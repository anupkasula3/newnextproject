
import React from 'react';
import Layout from '@/components/Layout';
import ResourcesHero from '@/components/resources/ResourcesHero';
import ResourceCategories from '@/components/resources/ResourceCategories';
import PopularResources from '@/components/resources/PopularResources';
import ResourcesSearch from '@/components/resources/ResourcesSearch';
import ResourcesFAQ from '@/components/resources/ResourcesFAQ';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Download, Trophy, BookOpen, FileText, Clock, Star } from 'lucide-react';

// Resource category data
const featuredResources = [
  {
    id: "ielts-writing-task-2",
    title: "IELTS Writing Task 2 Guide",
    type: "Study Guide",
    rating: 4.9,
    downloads: "24.5K",
    badge: "Popular",
    badgeColor: "bg-amber-500",
    description: "Comprehensive guide to mastering IELTS Writing Task 2 with model answers and expert tips."
  },
  {
    id: "toefl-speaking-templates",
    title: "TOEFL Speaking Templates",
    type: "Speaking Guide",
    rating: 4.7,
    downloads: "18.3K",
    badge: "New",
    badgeColor: "bg-green-500",
    description: "Ready-to-use templates for all TOEFL speaking tasks to help structure your responses effectively."
  },
  {
    id: "pte-reading-practice",
    title: "PTE Reading Practice Set",
    type: "Practice Test",
    rating: 4.8,
    downloads: "15.2K",
    badge: "Premium",
    badgeColor: "bg-indigo-500",
    description: "Full-length PTE reading practice test with detailed answer explanations and scoring guide."
  }
];

const Resources = () => {
  const navigate = useNavigate();
  
  const handleGetResource = (resourceId: string) => {
    navigate(`/resources/${resourceId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <ResourcesHero />
        
        <Tabs defaultValue="all" className="w-full my-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Resource Library</h2>
            <TabsList>
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
              <TabsTrigger value="free">Free</TabsTrigger>
              <TabsTrigger value="new">New Arrivals</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all">
            <ResourcesSearch />
            <div className="my-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Featured Resources</h3>
                <Link to="/resources/all">
                  <Button variant="ghost" className="flex items-center gap-1 text-indigo-600">
                    View All <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredResources.map((resource, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{resource.title}</CardTitle>
                        <Badge className={`${resource.badgeColor} text-white`}>
                          {resource.badge}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        {resource.type} 
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Star size={14} className="text-amber-500 fill-amber-500 mr-1" />
                          {resource.rating}
                        </div>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Download size={14} className="mr-1" />
                          {resource.downloads}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {resource.description}
                      </p>
                      <Button 
                        className="w-full"
                        onClick={() => handleGetResource(resource.id)}
                      >
                        Get Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <ResourceCategories />
            <PopularResources />
          </TabsContent>
          
          <TabsContent value="premium">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 rounded-xl p-6 mb-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Trophy className="text-amber-500" size={20} />
                    Premium Resources
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                    Unlock our complete library of premium resources with expert-curated content for maximum score improvement.
                  </p>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    Upgrade Now
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-4 flex-1">
                  {[
                    { icon: <BookOpen size={18} />, text: "Complete Study Guides" },
                    { icon: <FileText size={18} />, text: "Full-Length Practice Tests" },
                    { icon: <Star size={18} />, text: "Tutor-Graded Writing Tasks" },
                    { icon: <Clock size={18} />, text: "Priority Support" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <div className="text-indigo-600 dark:text-indigo-400">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Please upgrade to access premium resources
            </p>
          </TabsContent>
          
          <TabsContent value="free">
            <ResourcesSearch />
            <PopularResources title="Popular Free Resources" />
          </TabsContent>
          
          <TabsContent value="new">
            <ResourcesSearch />
            <PopularResources title="New Arrivals" />
          </TabsContent>
        </Tabs>
        
        <ResourcesFAQ />
        
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Custom Learning Materials?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our team of expert educators can create customized learning resources tailored to your specific needs and learning goals.
          </p>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
            Contact Us
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Resources;
