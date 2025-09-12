import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploadCard } from '@/components/admin/master/FileUploadCard';
import { LearningDashboard } from '@/components/admin/master/LearningDashboard';
import { AIAnalysisPanel } from '@/components/admin/master/AIAnalysisPanel';
import { 
  Brain, 
  Upload, 
  BookOpen, 
  BarChart3,
  FileText,
  Image,
  Files
} from 'lucide-react';

export interface UploadedFile {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'text';
  size: number;
  uploadDate: Date;
  analysisStatus: 'pending' | 'processing' | 'completed' | 'error';
  summary?: string;
  keyPoints?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

const MasterPanel = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);

  const handleFileUpload = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36),
      name: file.name,
      type: file.type.includes('pdf') ? 'pdf' : 
            file.type.includes('image') ? 'image' : 'text',
      size: file.size,
      uploadDate: new Date(),
      analysisStatus: 'pending'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate AI analysis
    newFiles.forEach(file => {
      setTimeout(() => {
        setUploadedFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { 
                ...f, 
                analysisStatus: 'processing' as const
              }
            : f
        ));
        
        // Complete analysis after 3 seconds
        setTimeout(() => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === file.id 
              ? { 
                  ...f, 
                  analysisStatus: 'completed' as const,
                  summary: `AI-generated summary for ${file.name}`,
                  keyPoints: [
                    'Key concept 1 from the content',
                    'Important topic 2 identified',
                    'Learning objective 3 extracted'
                  ],
                  difficulty: 'intermediate' as const,
                  tags: ['AI Generated', 'Study Material', 'Interactive']
                }
              : f
          ));
        }, 3000);
      }, 1000);
    });
  };

  const stats = [
    {
      title: 'Total Files',
      value: uploadedFiles.length.toString(),
      description: 'Files uploaded and processed',
      icon: <Files className="h-8 w-8 text-blue-500" />
    },
    {
      title: 'AI Analyses',
      value: uploadedFiles.filter(f => f.analysisStatus === 'completed').length.toString(),
      description: 'Completed AI analyses',
      icon: <Brain className="h-8 w-8 text-purple-500" />
    },
    {
      title: 'Learning Sessions',
      value: '24',
      description: 'Active learning sessions',
      icon: <BookOpen className="h-8 w-8 text-green-500" />
    },
    {
      title: 'Avg. Score',
      value: '87%',
      description: 'Student comprehension rate',
      icon: <BarChart3 className="h-8 w-8 text-orange-500" />
    }
  ];

  return (
    <AdminLayout>
      <div className="container p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Master Panel
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload files and let AI teach users about the content
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg">
            <Brain className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">AI-Powered Learning</span>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-indigo-50/50 dark:to-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 lg:w-[500px] mx-auto lg:mx-0 mb-8 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-1 rounded-xl">
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload & Process
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Learning Dashboard
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              AI Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <FileUploadCard 
              onFileUpload={handleFileUpload}
              uploadedFiles={uploadedFiles}
              onFileSelect={setSelectedFile}
            />
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <LearningDashboard 
              uploadedFiles={uploadedFiles}
              onFileSelect={setSelectedFile}
            />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <AIAnalysisPanel 
              selectedFile={selectedFile}
              uploadedFiles={uploadedFiles}
            />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default MasterPanel;