
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, BookOpen, Edit, MessageSquare, Quote, ArrowRight, Trophy, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const practiceOptions = [
  {
    icon: Headphones,
    title: "Listening Practice",
    description: "Improve your ability to understand spoken English in various contexts.",
    path: "/practice/listening",
    fact: "Did you know? The IELTS Listening test includes a variety of accents from native English speakers.",
    color: "bg-indigo text-white"
  },
  {
    icon: BookOpen,
    title: "Reading Practice",
    description: "Enhance your reading comprehension with academic and general training texts.",
    path: "/practice/reading",
    fact: "IELTS Reading tests contain texts totaling 2,150-2,750 words. Practice makes perfect!",
    color: "bg-teal text-white"
  },
  {
    icon: Edit,
    title: "Writing Practice",
    description: "Develop your written English skills for academic and general purposes.",
    path: "/practice/writing",
    fact: "In the IELTS Writing test, Task 2 contributes twice as much to your writing score as Task 1.",
    color: "bg-coral text-white"
  },
  {
    icon: MessageSquare,
    title: "Speaking Practice",
    description: "Build confidence in your spoken English through interactive exercises.",
    path: "/practice/speaking",
    fact: "The IELTS Speaking test is a face-to-face interview that lasts between 11-14 minutes.",
    color: "bg-indigo text-white"
  },
  {
    icon: Trophy,
    title: "Full Mock Test",
    description: "Complete a full IELTS test under timed conditions to simulate the real exam.",
    path: "/practice/mock-test",
    fact: "Taking full mock tests is one of the most effective ways to prepare for the real IELTS exam.",
    color: "bg-yellow-500 text-white"
  }
];

const proficiencyExams = [
  {
    name: "IELTS",
    description: "International English Language Testing System",
    path: "/exams/ielts",
    sections: [
      { name: "Listening", path: "/practice/listening" },
      { name: "Reading", path: "/practice/reading" },
      { name: "Writing", path: "/practice/writing" },
      { name: "Speaking", path: "/practice/speaking" },
      { name: "Full Mock Test", path: "/practice/mock-test" }
    ]
  },
  {
    name: "TOEFL",
    description: "Test of English as a Foreign Language",
    path: "/exams/toefl",
    sections: [
      { name: "Listening", path: "/practice/listening?exam=toefl" },
      { name: "Reading", path: "/practice/reading?exam=toefl" },
      { name: "Writing", path: "/practice/writing?exam=toefl" },
      { name: "Speaking", path: "/practice/speaking?exam=toefl" }
    ]
  },
  {
    name: "PTE",
    description: "Pearson Test of English",
    path: "/exams/pte",
    sections: [
      { name: "Speaking & Writing", path: "/practice/speaking?exam=pte" },
      { name: "Reading", path: "/practice/reading?exam=pte" },
      { name: "Listening", path: "/practice/listening?exam=pte" }
    ]
  }
];

const academicExams = [
  {
    name: "SAT",
    description: "Scholastic Assessment Test",
    path: "/exams/sat",
    sections: [
      { name: "Math", path: "/practice/sat/math" },
      { name: "English", path: "/practice/sat/english" }
    ]
  },
  {
    name: "GRE",
    description: "Graduate Record Examination",
    path: "/exams/gre",
    sections: [
      { name: "Verbal Reasoning", path: "/practice/gre/verbal" },
      { name: "Quantitative Reasoning", path: "/practice/gre/quantitative" },
      { name: "Analytical Writing", path: "/practice/gre/analytical" }
    ]
  },
  {
    name: "GMAT",
    description: "Graduate Management Admission Test",
    path: "/exams/gmat",
    sections: [
      { name: "Verbal Reasoning", path: "/practice/gmat/verbal" },
      { name: "Quantitative Reasoning", path: "/practice/gmat/quantitative" },
      { name: "Integrated Reasoning", path: "/practice/gmat/integrated" },
      { name: "Analytical Writing", path: "/practice/gmat/analytical" }
    ]
  }
];

const quotes = [
  {
    text: "The more you practice, the more you realize what you need to improve.",
    author: "Sarah, Band 8 IELTS achiever"
  },
  {
    text: "Consistent practice is the secret to IELTS success. I practiced daily for three months.",
    author: "Michael, Band 7.5 IELTS achiever"
  },
  {
    text: "IELTS isn't just a test of English; it's a test of your preparation strategy.",
    author: "Priya, IELTS Instructor"
  }
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const PracticeSection = () => {
  const [selectedTab, setSelectedTab] = useState("skills");
  const [examType, setExamType] = useState('ielts');
  const location = useLocation();
  
  useEffect(() => {
    const savedExam = localStorage.getItem('selectedExam');
    
    if (savedExam) {
      let baseExamType = savedExam.split('-')[0];
      
      if (savedExam.startsWith('ielts')) {
        baseExamType = 'ielts';
      }
      
      setExamType(baseExamType);
    }
  }, []);

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[10%] -right-[20%] h-[400px] w-[400px] rounded-full bg-indigo/5 blur-3xl"></div>
        <div className="absolute bottom-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-teal/5 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Practice IELTS Skills
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Our comprehensive practice modules help you prepare for all sections of the IELTS exam
          </p>
          
          <div className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4">Choose Your Exam Type</h3>
            <NavigationMenu className="mb-6 max-w-full w-full flex justify-center">
              <NavigationMenuList className="flex-wrap justify-center">
                <NavigationMenuItem className="mb-2">
                  <NavigationMenuTrigger className="bg-indigo text-white hover:bg-indigo/90 hover:text-white">Proficiency Exams</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {proficiencyExams.map((exam) => (
                        <li key={exam.name} className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                              to={`/practice/${exam.name.toLowerCase()}`}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {exam.name}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {exam.description}
                              </p>
                              <div className="mt-4">
                                <ul className="grid gap-2">
                                  {exam.sections.map((section) => {
                                    const basePathParts = section.path.split('?');
                                    const basePath = basePathParts[0];
                                    const examParam = exam.name.toLowerCase();
                                    const finalPath = `${basePath}?exam=${examParam === 'ielts' ? 'ielts' : examParam}`;
                                    
                                    return (
                                      <li key={section.name}>
                                        <Link 
                                          to={finalPath}
                                          className="text-sm hover:underline flex items-center text-indigo"
                                        >
                                          <ChevronRight className="h-3 w-3 mr-1" />
                                          {section.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem className="mb-2">
                  <NavigationMenuTrigger className="bg-teal-600 text-white hover:bg-teal-700 hover:text-white">Academic Exams</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {academicExams.map((exam) => (
                        <li key={exam.name} className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md"
                              to={`/practice/${exam.name.toLowerCase()}`}
                            >
                              <div className="mb-2 mt-4 text-lg font-medium">
                                {exam.name}
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                {exam.description}
                              </p>
                              <div className="mt-4">
                                <ul className="grid gap-2">
                                  {exam.sections.map((section) => {
                                    const basePathParts = section.path.split('?');
                                    const basePath = basePathParts[0];
                                    const examParam = exam.name.toLowerCase();
                                    const finalPath = `${basePath}?exam=${examParam}`;
                                    
                                    return (
                                      <li key={section.name}>
                                        <Link 
                                          to={finalPath}
                                          className="text-sm hover:underline flex items-center text-indigo"
                                        >
                                          <ChevronRight className="h-3 w-3 mr-1" />
                                          {section.name}
                                        </Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          
            <Tabs defaultValue="skills" value={selectedTab} onValueChange={setSelectedTab} className="mb-4">
              <TabsList className="mb-4">
                <TabsTrigger value="skills">By Skills</TabsTrigger>
                <TabsTrigger value="exams">By Exam Type</TabsTrigger>
              </TabsList>
              
              <TabsContent value="skills">
                <Link to={`/practice?exam=${examType}`}>
                  <Button className="bg-indigo hover:bg-indigo-600">
                    View All Skills <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </TabsContent>
              
              <TabsContent value="exams">
                <Link to="/selection">
                  <Button className="bg-indigo hover:bg-indigo-600">
                    Choose Your Exam <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
          {practiceOptions.map((option, index) => {
            const basePath = option.path;
            const finalPath = `${basePath}?exam=${examType}`;
            
            return (
              <Link 
                key={index} 
                to={finalPath}
                className="block transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <Card className="overflow-hidden bg-white dark:bg-gray-800 border-none shadow-lg h-full">
                  <CardHeader className={`${option.color} p-6`}>
                    <div className="rounded-full bg-white/20 w-12 h-12 flex items-center justify-center mb-3">
                      <option.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardDescription className="text-gray-600 dark:text-gray-300 mb-4 text-base">
                      {option.description}
                    </CardDescription>
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm italic text-gray-700 dark:text-gray-300">
                      <p>✨ {option.fact}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div 
                      className="w-full py-2.5 px-4 text-center rounded-lg border-2 border-indigo text-indigo dark:text-indigo-300 dark:border-indigo-300 font-medium hover:bg-indigo hover:text-white dark:hover:bg-indigo-800 transition-colors"
                    >
                      Start Practice
                    </div>
                  </CardFooter>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {quotes.map((quote, index) => (
                <CarouselItem key={index}>
                  <div className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <Quote className="h-8 w-8 text-indigo" />
                    </div>
                    <blockquote className="text-xl md:text-2xl font-medium text-gray-900 dark:text-white mb-4">
                      "{quote.text}"
                    </blockquote>
                    <cite className="text-gray-600 dark:text-gray-400 not-italic">— {quote.author}</cite>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        </div>

        <div className="flex justify-center mt-8">
          <Link 
            to={`/practice/${examType}`}
            className="btn-primary inline-flex items-center text-lg px-8 py-3"
          >
            Explore All Practice Tests
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PracticeSection;
