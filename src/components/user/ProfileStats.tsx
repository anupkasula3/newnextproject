import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Target, Clock, Trophy, Flame, Calendar } from 'lucide-react';

const ProfileStats = () => {
  const stats = {
    studyStreak: 15,
    totalHours: 124,
    testsCompleted: 23,
    currentLevel: 'Intermediate',
    targetBand: 7.5,
    currentBand: 6.5,
    weeklyGoal: 10,
    weeklyProgress: 7,
    strongestSkill: 'Reading',
    weakestSkill: 'Speaking'
  };

  const skillProgress = [
    { skill: 'Listening', score: 6.5, progress: 72, color: 'bg-blue-500' },
    { skill: 'Reading', score: 7.0, progress: 78, color: 'bg-green-500' },
    { skill: 'Writing', score: 6.0, progress: 67, color: 'bg-orange-500' },
    { skill: 'Speaking', score: 6.0, progress: 67, color: 'bg-red-500' }
  ];

  const achievements = [
    { name: 'Study Streak', value: stats.studyStreak, unit: 'days', icon: Flame, color: 'text-orange-500' },
    { name: 'Practice Hours', value: stats.totalHours, unit: 'hours', icon: Clock, color: 'text-blue-500' },
    { name: 'Tests Completed', value: stats.testsCompleted, unit: 'tests', icon: Trophy, color: 'text-yellow-500' },
    { name: 'Weekly Goal', value: `${stats.weeklyProgress}/${stats.weeklyGoal}`, unit: 'hours', icon: Target, color: 'text-green-500' }
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((achievement) => (
          <Card key={achievement.name} className="text-center">
            <CardContent className="pt-6 pb-4">
              <div className={`w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-3`}>
                <achievement.icon className={`h-6 w-6 ${achievement.color}`} />
              </div>
              <div className="text-2xl font-bold">{achievement.value}</div>
              <div className="text-xs text-muted-foreground">{achievement.unit}</div>
              <div className="text-sm font-medium mt-1">{achievement.name}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Band Score Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            IELTS Band Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Current Overall Band</div>
                <div className="text-2xl font-bold text-blue-600">{stats.currentBand}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Target Band</div>
                <div className="text-2xl font-bold text-green-600">{stats.targetBand}</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Progress to Target</span>
                <span>{Math.round((stats.currentBand / stats.targetBand) * 100)}%</span>
              </div>
              <Progress value={(stats.currentBand / stats.targetBand) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center">
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Strongest
                </Badge>
                <div className="font-medium mt-1">{stats.strongestSkill}</div>
              </div>
              <div className="text-center">
                <Badge variant="secondary" className="bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300">
                  Needs Work
                </Badge>
                <div className="font-medium mt-1">{stats.weakestSkill}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Skill Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {skillProgress.map((skill) => (
              <div key={skill.skill} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{skill.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Band {skill.score}</span>
                    <Badge variant="outline" className="text-xs">
                      {skill.progress}%
                    </Badge>
                  </div>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Study Hours</span>
              <span className="font-medium">{stats.weeklyProgress} / {stats.weeklyGoal} hours</span>
            </div>
            <Progress value={(stats.weeklyProgress / stats.weeklyGoal) * 100} className="h-3" />
            <div className="text-sm text-muted-foreground">
              {stats.weeklyGoal - stats.weeklyProgress} hours remaining to reach your weekly goal
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileStats;