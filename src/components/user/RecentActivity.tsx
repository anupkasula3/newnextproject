
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, FileText, Headphones, MessageSquare, Clock } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      type: "test",
      title: "Completed Listening Test",
      time: "Today",
      score: "24/30",
      icon: Headphones,
      color: "bg-purple-100 text-purple-600"
    },
    {
      type: "writing",
      title: "Submitted Writing Task 2",
      time: "Yesterday",
      status: "Pending Review",
      icon: FileText,
      color: "bg-pink-100 text-pink-500"
    },
    {
      type: "speaking",
      title: "Speaking Practice Session",
      time: "3 days ago",
      duration: "15 minutes",
      icon: MessageSquare,
      color: "bg-teal-100 text-teal-500"
    },
    {
      type: "test",
      title: "Completed Mock Test",
      time: "1 week ago",
      score: "Overall: 7.0",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <Card className="w-full shadow-sm h-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Activity className="mr-2 h-5 w-5 text-purple-600" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
              <div className={`rounded-full p-2 ${activity.color}`}>
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{activity.title}</p>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{activity.time}</span>
                  {activity.score && (
                    <span className="ml-2 px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded text-xs">
                      {activity.score}
                    </span>
                  )}
                  {activity.status && (
                    <span className="ml-2 px-1.5 py-0.5 bg-orange-50 dark:bg-orange-900/30 text-orange-500 rounded text-xs">
                      {activity.status}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="text-sm text-purple-600 dark:text-purple-400 mt-4 hover:underline w-full text-center">
          View All Activity
        </button>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
