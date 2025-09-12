
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users,
  Settings as SettingsIcon,
  Headphones,
  Mic,
  FileBox,
  Sparkles,
  Plus,
  Globe,
  Activity,
  ChartBar,
  ChartLine
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PerformanceMetricsDetail from '@/components/admin/PerformanceMetricsDetail';

const AdminDashboard = () => {
  const [showDetailedMetrics, setShowDetailedMetrics] = useState(false);
  const navigate = useNavigate();

  const examTypes = [
    { id: 'ielts', name: 'IELTS', count: 42, path: '/admin/exams/ielts' },
    { id: 'toefl', name: 'TOEFL', count: 36, path: '/admin/exams/toefl' },
    { id: 'pte', name: 'PTE', count: 24, path: '/admin/exams/pte' },
    { id: 'sat', name: 'SAT', count: 18, path: '/admin/exams/sat' },
    { id: 'gre', name: 'GRE', count: 15, path: '/admin/exams/gre' },
    { id: 'gmat', name: 'GMAT', count: 12, path: '/admin/exams/gmat' },
  ];

  const stats = [
    { 
      title: 'Writing Tasks', 
      value: '24', 
      description: 'Total writing tasks',
      icon: <FileText className="h-8 w-8 text-blue-500" />,
      link: '/admin/exams/ielts/writing'
    },
    { 
      title: 'Reading Tasks', 
      value: '18', 
      description: 'Total reading tasks',
      icon: <BookOpen className="h-8 w-8 text-green-500" />,
      link: '/admin/exams/ielts/reading'
    },
    { 
      title: 'Listening Tasks', 
      value: '15', 
      description: 'Total listening tasks',
      icon: <Headphones className="h-8 w-8 text-purple-500" />,
      link: '/admin/exams/ielts/listening'
    },
    { 
      title: 'Speaking Tasks', 
      value: '12', 
      description: 'Total speaking tasks',
      icon: <Mic className="h-8 w-8 text-red-500" />,
      link: '/admin/exams/ielts/speaking'
    },
    { 
      title: 'Blog Posts', 
      value: '12', 
      description: 'Published blog posts',
      icon: <MessageSquare className="h-8 w-8 text-purple-500" />,
      link: '/admin/blog-posts'
    },
    { 
      title: 'Users', 
      value: '543', 
      description: 'Registered users',
      icon: <Users className="h-8 w-8 text-orange-500" />,
      link: '/admin/users'
    },
  ];

  const performanceMetrics = [
    { 
      title: 'Visitors', 
      value: '12,458', 
      change: '+14%', 
      trend: 'up',
      description: 'Total visitors this month',
      icon: <Users className="h-8 w-8 text-blue-500" />,
    },
    { 
      title: 'Countries', 
      value: '42', 
      change: '+3', 
      trend: 'up',
      description: 'Countries visitors are from',
      icon: <Globe className="h-8 w-8 text-green-500" />,
    },
    { 
      title: 'Session Duration', 
      value: '4:32', 
      change: '+0:48', 
      trend: 'up',
      description: 'Avg. time spent on platform',
      icon: <Activity className="h-8 w-8 text-purple-500" />,
    },
    { 
      title: 'Completion Rate', 
      value: '68%', 
      change: '+5%', 
      trend: 'up',
      description: 'Practice test completion',
      icon: <ChartBar className="h-8 w-8 text-amber-500" />,
    },
    { 
      title: 'User Growth', 
      value: '8.2%', 
      change: '+1.4%', 
      trend: 'up',
      description: 'Month-over-month growth',
      icon: <ChartLine className="h-8 w-8 text-indigo-500" />,
    }
  ];

  const handleExamTypeClick = (path: string) => {
    navigate(path);
  };

  const handleSectionClick = (examId: string, section: string) => {
    navigate(`/admin/exams/${examId}/${section.toLowerCase()}`);
  };

  return (
    <AdminLayout>
      <div className="container p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Admin Panel</h1>
          <Button onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" /> New Resource
          </Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-1 rounded-xl">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="upload">Upload Resource</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="mb-6">
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examTypes.map((exam) => (
                <Card 
                  key={exam.id}
                  className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-indigo-950/50 border border-indigo-100 dark:border-indigo-900"
                  onClick={() => handleExamTypeClick(exam.path)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-indigo-600 dark:text-indigo-400">{exam.name}</CardTitle>
                    <CardDescription>Manage {exam.name} exam content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-2">{exam.count}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Total tasks and questions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {['Reading', 'Writing', 'Listening', 'Speaking'].map((section) => (
                        <Button 
                          key={section}
                          variant="outline" 
                          size="sm" 
                          className="w-full bg-white/50 dark:bg-gray-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-950"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSectionClick(exam.id, section);
                          }}
                        >
                          {section}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-indigo-950/20 dark:to-pink-950/20 border-dashed">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-indigo-500" />
                    Add New Exam Type
                  </CardTitle>
                  <CardDescription>Expand your exam offerings</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Add support for additional standardized tests</p>
                  <Button className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Exam Type
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="upload">
          </TabsContent>

          <TabsContent value="categories">
          </TabsContent>
          
          <TabsContent value="analytics">
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
