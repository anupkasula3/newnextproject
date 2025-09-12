import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Flame, Target, BookOpen, Clock, Award, Zap } from 'lucide-react';

const AchievementsBadges = () => {
  const achievements = [
    {
      id: 'first-test',
      title: 'First Steps',
      description: 'Complete your first practice test',
      icon: Star,
      earned: true,
      earnedDate: '2024-01-15',
      color: 'bg-yellow-500',
      rarity: 'Common'
    },
    {
      id: 'study-streak',
      title: 'Dedicated Learner',
      description: 'Study for 7 consecutive days',
      icon: Flame,
      earned: true,
      earnedDate: '2024-01-22',
      color: 'bg-orange-500',
      rarity: 'Uncommon'
    },
    {
      id: 'band-7',
      title: 'Band 7 Master',
      description: 'Achieve Band 7.0 in any skill',
      icon: Trophy,
      earned: true,
      earnedDate: '2024-02-01',
      color: 'bg-blue-500',
      rarity: 'Rare'
    },
    {
      id: 'perfect-score',
      title: 'Perfectionist',
      description: 'Score 100% on a practice test section',
      icon: Target,
      earned: false,
      progress: 85,
      color: 'bg-green-500',
      rarity: 'Epic'
    },
    {
      id: 'reading-master',
      title: 'Reading Champion',
      description: 'Complete 50 reading exercises',
      icon: BookOpen,
      earned: false,
      progress: 32,
      maxProgress: 50,
      color: 'bg-purple-500',
      rarity: 'Rare'
    },
    {
      id: 'speed-demon',
      title: 'Speed Demon',
      description: 'Complete a test section in record time',
      icon: Zap,
      earned: false,
      progress: 0,
      color: 'bg-yellow-400',
      rarity: 'Legendary'
    },
    {
      id: 'study-time',
      title: 'Time Master',
      description: 'Study for 100 total hours',
      icon: Clock,
      earned: false,
      progress: 67,
      maxProgress: 100,
      color: 'bg-indigo-500',
      rarity: 'Epic'
    },
    {
      id: 'band-8',
      title: 'Excellence',
      description: 'Achieve Band 8.0 overall',
      icon: Award,
      earned: false,
      progress: 0,
      color: 'bg-gold',
      rarity: 'Legendary'
    }
  ];

  const earned = achievements.filter(a => a.earned);
  const inProgress = achievements.filter(a => !a.earned && a.progress > 0);
  const locked = achievements.filter(a => !a.earned && !a.progress);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'Common': return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'Uncommon': return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'Rare': return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      case 'Epic': return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'Legendary': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Achievement Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-3xl font-bold">{earned.length}</div>
            <div className="text-muted-foreground">Achievements Unlocked</div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-orange-500">{inProgress.length}</div>
                <div className="text-xs text-muted-foreground">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-500">{locked.length}</div>
                <div className="text-xs text-muted-foreground">Locked</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earned Achievements */}
      {earned.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Earned Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {earned.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border"
                >
                  <div className={`rounded-full p-2 ${achievement.color} text-white`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <Badge variant="secondary" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {achievement.description}
                    </p>
                    <div className="text-xs text-muted-foreground">
                      Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* In Progress Achievements */}
      {inProgress.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-orange-500" />
              In Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inProgress.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 rounded-lg border"
                >
                  <div className={`rounded-full p-2 ${achievement.color} text-white opacity-75`}>
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{achievement.title}</h4>
                      <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {achievement.description}
                    </p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {achievement.maxProgress 
                            ? `${achievement.progress}/${achievement.maxProgress}`
                            : `${achievement.progress}%`
                          }
                        </span>
                      </div>
                      <Progress 
                        value={achievement.maxProgress 
                          ? (achievement.progress / achievement.maxProgress) * 100
                          : achievement.progress
                        } 
                        className="h-2" 
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Locked Achievements */}
      {locked.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-muted-foreground">Locked Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {locked.map((achievement) => (
                <div
                  key={achievement.id}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 border opacity-60"
                >
                  <div className="rounded-full p-2 bg-gray-300 dark:bg-gray-700 text-gray-500">
                    <achievement.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm text-muted-foreground">
                        {achievement.title}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {achievement.rarity}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AchievementsBadges;