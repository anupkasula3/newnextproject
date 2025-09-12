import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  BookOpen, 
  Users, 
  Clock, 
  TrendingUp,
  Star,
  Eye,
  Play,
  Download,
  Share2
} from 'lucide-react';
import { UploadedFile } from '@/pages/admin/MasterPanel';

interface LearningDashboardProps {
  uploadedFiles: UploadedFile[];
  onFileSelect: (file: UploadedFile) => void;
}

export const LearningDashboard: React.FC<LearningDashboardProps> = ({
  uploadedFiles,
  onFileSelect
}) => {
  const completedFiles = uploadedFiles.filter(f => f.analysisStatus === 'completed');
  
  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const mockLearningStats = [
    { label: 'Active Learners', value: 127, icon: Users, change: '+12%' },
    { label: 'Avg. Session Time', value: '24m', icon: Clock, change: '+8%' },
    { label: 'Completion Rate', value: '89%', icon: TrendingUp, change: '+5%' },
    { label: 'Satisfaction Score', value: 4.7, icon: Star, change: '+0.3' }
  ];

  const mockRecentActivity = [
    { user: 'Sarah Johnson', action: 'Completed lesson', file: 'Advanced Grammar.pdf', time: '2 hours ago' },
    { user: 'Mike Chen', action: 'Started learning', file: 'Basic Math.pdf', time: '4 hours ago' },
    { user: 'Emily Davis', action: 'Scored 95%', file: 'History Notes.pdf', time: '6 hours ago' },
    { user: 'Alex Kumar', action: 'Downloaded material', file: 'Physics Concepts.pdf', time: '8 hours ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Learning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {mockLearningStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-green-600 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="p-3 bg-primary/10 rounded-lg">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Learning Materials */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              Learning Materials
            </CardTitle>
            <CardDescription>
              AI-processed content ready for teaching
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              {completedFiles.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-lg font-medium text-muted-foreground mb-2">
                    No learning materials yet
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Upload and process files to create interactive learning content
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedFiles.map((file) => (
                    <Card key={file.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onFileSelect(file)}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{file.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                            {file.summary}
                          </p>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary" className={getDifficultyColor(file.difficulty)}>
                              {file.difficulty}
                            </Badge>
                            <Badge variant="outline">AI Generated</Badge>
                          </div>
                        </div>
                      </div>
                      
                      {file.keyPoints && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-2">Key Learning Points:</p>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {file.keyPoints.slice(0, 2).map((point, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <div className="w-1 h-1 bg-primary rounded-full" />
                                {point}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>24 views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>~15 min</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="h-4 w-4 mr-1" />
                            Start Learning
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest learner interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[500px] pr-4">
              <div className="space-y-4">
                {mockRecentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-primary font-medium">{activity.file}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress Overview</CardTitle>
          <CardDescription>
            Track how users are progressing through the AI-generated content
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">127</div>
              <p className="text-sm text-muted-foreground">Active Learners</p>
              <Progress value={75} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">89%</div>
              <p className="text-sm text-muted-foreground">Avg. Completion</p>
              <Progress value={89} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">4.7</div>
              <p className="text-sm text-muted-foreground">Satisfaction Rating</p>
              <Progress value={94} className="mt-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};