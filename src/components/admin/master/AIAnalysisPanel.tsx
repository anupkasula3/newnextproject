import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Lightbulb, 
  Target, 
  BookOpen,
  MessageCircle,
  Settings,
  Wand2,
  Download,
  Edit3,
  Save,
  RefreshCw
} from 'lucide-react';
import { UploadedFile } from '@/pages/admin/MasterPanel';

interface AIAnalysisPanelProps {
  selectedFile: UploadedFile | null;
  uploadedFiles: UploadedFile[];
}

export const AIAnalysisPanel: React.FC<AIAnalysisPanelProps> = ({
  selectedFile,
  uploadedFiles
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSummary, setEditedSummary] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  const completedFiles = uploadedFiles.filter(f => f.analysisStatus === 'completed');

  const handleEditSummary = () => {
    if (selectedFile?.summary) {
      setEditedSummary(selectedFile.summary);
      setIsEditing(true);
    }
  };

  const handleSaveSummary = () => {
    // In a real app, this would update the file's summary
    setIsEditing(false);
  };

  const mockAnalysisInsights = [
    {
      title: 'Content Complexity',
      value: 'Intermediate',
      description: 'Suitable for learners with basic foundation',
      icon: Target
    },
    {
      title: 'Learning Objectives',
      value: '5 identified',
      description: 'Clear objectives extracted from content',
      icon: BookOpen
    },
    {
      title: 'Teaching Style',
      value: 'Interactive',
      description: 'Best suited for hands-on learning',
      icon: MessageCircle
    },
    {
      title: 'Estimated Duration',
      value: '15-20 min',
      description: 'Average time to complete lesson',
      icon: Settings
    }
  ];

  const mockLearningPath = [
    { step: 1, title: 'Introduction & Overview', duration: '3 min', completed: true },
    { step: 2, title: 'Core Concepts', duration: '8 min', completed: true },
    { step: 3, title: 'Practical Examples', duration: '5 min', completed: false },
    { step: 4, title: 'Assessment & Review', duration: '4 min', completed: false }
  ];

  if (!selectedFile) {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Select a file to view AI analysis
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Choose a completed file from the upload section to see detailed AI insights
          </p>
          {completedFiles.length === 0 && (
            <p className="text-xs text-muted-foreground">
              No files have been processed yet
            </p>
          )}
        </div>
      </Card>
    );
  }

  if (selectedFile.analysisStatus !== 'completed') {
    return (
      <Card className="h-[600px] flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-16 w-16 text-blue-500 mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold mb-2">
            AI Analysis in Progress
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {selectedFile.name} is being processed...
          </p>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {selectedFile.analysisStatus}
          </Badge>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* File Header */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                AI Analysis: {selectedFile.name}
              </CardTitle>
              <CardDescription>
                Comprehensive AI-powered content analysis and learning recommendations
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Analysis Complete
              </Badge>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-1" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Analysis Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockAnalysisInsights.map((insight, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <insight.icon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{insight.title}</p>
                  <p className="text-lg font-bold text-primary">{insight.value}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detailed Analysis Tabs */}
      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="objectives">Learning Path</TabsTrigger>
          <TabsTrigger value="insights">Key Insights</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  AI-Generated Summary
                </CardTitle>
                <Button size="sm" variant="outline" onClick={handleEditSummary}>
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <div className="space-y-4">
                  <Textarea
                    value={editedSummary}
                    onChange={(e) => setEditedSummary(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveSummary}>
                      <Save className="h-4 w-4 mr-1" />
                      Save Changes
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedFile.summary}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="objectives" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-600" />
                Suggested Learning Path
              </CardTitle>
              <CardDescription>
                AI-recommended sequence for optimal learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLearningPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{step.title}</h4>
                      <p className="text-sm text-muted-foreground">{step.duration}</p>
                    </div>
                    <Badge variant={step.completed ? "default" : "secondary"}>
                      {step.completed ? "Completed" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-600" />
                Key Learning Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {selectedFile.keyPoints?.map((point, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <p className="text-sm">{point}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customize" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="h-5 w-5 text-indigo-600" />
                Customize AI Teaching
              </CardTitle>
              <CardDescription>
                Provide additional instructions to enhance the AI teaching experience
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Custom Teaching Instructions
                </label>
                <Textarea
                  placeholder="e.g., Focus on practical examples, use simple language, include interactive exercises..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="flex gap-2">
                <Button>
                  <Wand2 className="h-4 w-4 mr-1" />
                  Apply Customization
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Regenerate Analysis
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};