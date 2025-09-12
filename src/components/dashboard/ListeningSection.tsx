
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Headphones, Clock, ChevronRight, PlayCircle, BarChart2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { listeningTestData } from '@/data/listeningTestData';
import { Badge } from '@/components/ui/badge';

const ListeningSection = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const recentTests = listeningTestData.sections.slice(0, 2);
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl flex items-center">
              <Headphones className="h-5 w-5 mr-2 text-indigo-500" />
              Listening Practice
            </CardTitle>
            <CardDescription>
              Improve your listening comprehension skills
            </CardDescription>
          </div>
          <Link to="/practice/listening">
            <Button variant="ghost" size="sm" className="text-indigo hover:text-indigo-700">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="space-y-4">
          {recentTests.map((section) => (
            <div 
              key={section.id}
              className="border rounded-lg p-4 transition-all hover:border-indigo-200 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start">
                  <PlayCircle className="h-5 w-5 text-indigo-500 mt-1 mr-3" />
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">{section.title}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{section.description}</p>
                  </div>
                </div>
                <Badge variant="outline" className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{section.questions.length} Qs</span>
                </Badge>
              </div>
              
              {expandedSection === section.id && (
                <div className="mt-3 text-sm text-gray-600 dark:text-gray-300">
                  <p className="mb-2">This section contains {section.questions.length} questions to test your listening comprehension.</p>
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-indigo-500" />
                      <span className="text-xs text-gray-500">Completion Rate: 65%</span>
                    </div>
                    <Link to="/practice/listening">
                      <Button size="sm" className="bg-indigo hover:bg-indigo-600">
                        Start Practice
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-500 hover:text-indigo-700 p-0 h-auto mt-2"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              >
                {expandedSection === section.id ? "Show less" : "Show more"}
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="pt-2">
        <div className="w-full">
          <div className="flex justify-between items-center mb-2 text-sm">
            <span className="text-gray-600 dark:text-gray-400">Your listening progress</span>
            <span className="font-medium">65%</span>
          </div>
          <Progress value={65} className="h-2" />
          <div className="flex justify-between mt-4">
            <Link to="/practice/listening">
              <Button className="bg-indigo hover:bg-indigo-600">
                <Headphones className="mr-2 h-4 w-4" />
                Practice Listening
              </Button>
            </Link>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListeningSection;
