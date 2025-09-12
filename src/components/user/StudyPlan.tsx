import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Circle, Clock, Calendar, BookOpen, Target, Play } from 'lucide-react';

const StudyPlan = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);

  const studyPlan = {
    goal: 'Achieve IELTS Band 7.5',
    duration: '8 weeks',
    currentWeek: 2,
    totalProgress: 18,
    weeklyPlans: [
      {
        week: 1,
        title: 'Foundation Building',
        status: 'completed',
        tasks: [
          { id: 1, title: 'Complete diagnostic test', type: 'test', duration: 120, completed: true },
          { id: 2, title: 'Learn IELTS format and structure', type: 'study', duration: 60, completed: true },
          { id: 3, title: 'Vocabulary: Academic Word List 1-50', type: 'vocab', duration: 90, completed: true },
          { id: 4, title: 'Reading: Skimming and scanning practice', type: 'practice', duration: 45, completed: true }
        ]
      },
      {
        week: 2,
        title: 'Reading & Listening Focus',
        status: 'current',
        tasks: [
          { id: 5, title: 'Reading: Multiple choice questions', type: 'practice', duration: 60, completed: true },
          { id: 6, title: 'Listening: Note completion exercises', type: 'practice', duration: 45, completed: true },
          { id: 7, title: 'Vocabulary: Academic Word List 51-100', type: 'vocab', duration: 90, completed: false },
          { id: 8, title: 'Grammar: Complex sentence structures', type: 'study', duration: 75, completed: false }
        ]
      },
      {
        week: 3,
        title: 'Writing Skills Development',
        status: 'upcoming',
        tasks: [
          { id: 9, title: 'Task 1: Describing charts and graphs', type: 'practice', duration: 90, completed: false },
          { id: 10, title: 'Task 2: Essay structure and planning', type: 'study', duration: 60, completed: false },
          { id: 11, title: 'Vocabulary: Topic-specific words', type: 'vocab', duration: 75, completed: false },
          { id: 12, title: 'Writing practice: Time management', type: 'practice', duration: 120, completed: false }
        ]
      },
      {
        week: 4,
        title: 'Speaking Confidence',
        status: 'upcoming',
        tasks: [
          { id: 13, title: 'Part 1: Personal questions practice', type: 'practice', duration: 30, completed: false },
          { id: 14, title: 'Part 2: Long turn preparation', type: 'practice', duration: 45, completed: false },
          { id: 15, title: 'Part 3: Discussion skills', type: 'practice', duration: 60, completed: false },
          { id: 16, title: 'Pronunciation: Word stress patterns', type: 'study', duration: 45, completed: false }
        ]
      }
    ]
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'test': return Target;
      case 'study': return BookOpen;
      case 'vocab': return BookOpen;
      case 'practice': return Play;
      default: return Circle;
    }
  };

  const getTaskColor = (type: string) => {
    switch (type) {
      case 'test': return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      case 'study': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'vocab': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'practice': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getWeekStatus = (status: string) => {
    switch (status) {
      case 'completed': return { color: 'bg-green-500', text: 'Completed' };
      case 'current': return { color: 'bg-blue-500', text: 'Current Week' };
      case 'upcoming': return { color: 'bg-gray-400', text: 'Upcoming' };
      default: return { color: 'bg-gray-400', text: 'Not Started' };
    }
  };

  const currentWeekPlan = studyPlan.weeklyPlans.find(plan => plan.week === selectedWeek);
  const completedTasks = currentWeekPlan?.tasks.filter(task => task.completed).length || 0;
  const totalTasks = currentWeekPlan?.tasks.length || 0;
  const weekProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Study Plan Overview */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div>
              <h2 className="text-2xl font-bold">{studyPlan.goal}</h2>
              <p className="text-muted-foreground">{studyPlan.duration} intensive preparation</p>
            </div>
            
            <div className="flex justify-center items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Week {studyPlan.currentWeek}</div>
                <div className="text-sm text-muted-foreground">Current</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{studyPlan.totalProgress}%</div>
                <div className="text-sm text-muted-foreground">Overall Progress</div>
              </div>
            </div>
            
            <Progress value={studyPlan.totalProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Week Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Study Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-2 mb-6">
            {studyPlan.weeklyPlans.map((week) => {
              const status = getWeekStatus(week.status);
              return (
                <Button
                  key={week.week}
                  variant={selectedWeek === week.week ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedWeek(week.week)}
                  className="flex flex-col h-auto py-3"
                >
                  <div className="font-medium">Week {week.week}</div>
                  <div className="text-xs">{week.title}</div>
                  <div className={`w-2 h-2 rounded-full mt-1 ${status.color}`}></div>
                </Button>
              );
            })}
          </div>

          {/* Selected Week Details */}
          {currentWeekPlan && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{currentWeekPlan.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getWeekStatus(currentWeekPlan.status).color}>
                      {getWeekStatus(currentWeekPlan.status).text}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {completedTasks} of {totalTasks} tasks completed
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{Math.round(weekProgress)}%</div>
                  <div className="text-sm text-muted-foreground">Week Progress</div>
                </div>
              </div>

              <Progress value={weekProgress} className="h-2" />

              {/* Task List */}
              <div className="space-y-3">
                {currentWeekPlan.tasks.map((task) => {
                  const TaskIcon = getTaskIcon(task.type);
                  return (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        task.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : 'bg-gray-50 dark:bg-gray-800/50'
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-400" />
                      )}
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </span>
                          <Badge variant="outline" className={getTaskColor(task.type)}>
                            {task.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{task.duration} minutes</span>
                        </div>
                      </div>

                      {!task.completed && (
                        <Button size="sm" variant="outline">
                          Start
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Study Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Week {selectedWeek} Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Daily Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Dedicate at least 2 hours daily to IELTS preparation for optimal results.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Balanced Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Focus on your weak areas while maintaining strength in your strong skills.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium">Regular Testing</h4>
                <p className="text-sm text-muted-foreground">
                  Take practice tests under timed conditions to simulate exam experience.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyPlan;