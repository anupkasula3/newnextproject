
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, FileText, Eye, Save, ArrowLeft } from 'lucide-react';
import { listeningTestData } from '@/data/listeningTestData';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CustomProgress } from "@/components/ui/custom-progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ListeningTest, Section, Question } from '@/types/listening';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const ListeningTaskCMS = () => {
  // Start with listeningTestData and add any newly created tests
  const [listeningTests, setListeningTests] = useState<ListeningTest[]>([listeningTestData]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDifficulty, setNewTaskDifficulty] = useState("medium");
  const [newTaskType, setNewTaskType] = useState("academic");
  const [editMode, setEditMode] = useState(false);
  const [currentTest, setCurrentTest] = useState<ListeningTest | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load tests from localStorage if available
    const savedTests = localStorage.getItem('listeningTests');
    if (savedTests) {
      try {
        const parsedTests = JSON.parse(savedTests);
        if (Array.isArray(parsedTests) && parsedTests.length > 0) {
          setListeningTests(parsedTests);
        }
      } catch (e) {
        console.error("Error parsing saved tests:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save tests to localStorage when they change
    localStorage.setItem('listeningTests', JSON.stringify(listeningTests));
  }, [listeningTests]);
  
  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  
  // Mock statistics data for IELTS listening tasks
  const statisticsData = {
    totalTasks: listeningTests.length,
    academicTasks: listeningTests.filter(test => test.id.startsWith('lt')).length,
    generalTasks: listeningTests.filter(test => !test.id.startsWith('lt')).length,
    recentlyUpdated: 2,
    avgDifficulty: listeningTests.length > 0 ? 
      parseFloat((listeningTests.reduce((acc, test) => {
        // Estimate difficulty: Easy = 5.5, Medium = 7, Hard = 8.5
        const difficulty = test.id.toLowerCase().includes('easy') ? 5.5 : 
                          test.id.toLowerCase().includes('hard') ? 8.5 : 7;
        return acc + difficulty;
      }, 0) / listeningTests.length).toFixed(1)) : 6.5,
  };
  
  const filteredTests = listeningTests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddNewTask = () => {
    // Create a new listening test with basic structure
    const newTest: ListeningTest = {
      id: `lt-${Date.now()}`,
      title: newTaskTitle,
      description: `A new listening task with difficulty: ${newTaskDifficulty}`,
      totalQuestions: 0,
      duration: 30,
      sections: []
    };
    
    // Add the new test to the array
    setListeningTests(prev => [...prev, newTest]);
    
    toast({
      title: "Task created",
      description: `New listening task "${newTaskTitle}" has been created.`,
    });
    
    setNewTaskTitle("");
    setNewTaskDifficulty("medium");
    setIsAddTaskDialogOpen(false);
  };
  
  const handleDeleteTask = (testId: string) => {
    setListeningTests(prev => prev.filter(test => test.id !== testId));
    toast({
      title: "Task deleted",
      description: "The listening task has been removed.",
    });
  };

  const handleEditTest = (test: ListeningTest) => {
    setCurrentTest({...test});
    setEditMode(true);
  };

  const handleViewTest = (test: ListeningTest) => {
    setCurrentTest({...test});
    setEditMode(false);
  };

  const handleAddSection = () => {
    if (!currentTest) return;
    
    const newSection: Section = {
      id: `section-${Date.now()}`,
      title: "New Section",
      description: "Enter section description here...",
      audioUrl: "",
      questions: []
    };

    setCurrentTest({
      ...currentTest,
      sections: [...currentTest.sections, newSection]
    });
  };

  const handleUpdateSection = (index: number, field: keyof Section, value: any) => {
    if (!currentTest) return;
    
    const updatedSections = [...currentTest.sections];
    updatedSections[index] = {
      ...updatedSections[index],
      [field]: value
    };

    setCurrentTest({
      ...currentTest,
      sections: updatedSections
    });
  };

  const handleDeleteSection = (index: number) => {
    if (!currentTest) return;
    
    const updatedSections = [...currentTest.sections];
    updatedSections.splice(index, 1);

    setCurrentTest({
      ...currentTest,
      sections: updatedSections
    });
  };

  const handleAddQuestion = (sectionIndex: number) => {
    if (!currentTest) return;
    
    const newQuestion: Question = {
      id: `question-${Date.now()}`,
      number: currentTest.sections[sectionIndex].questions.length + 1,
      text: "New question",
      type: 'multiple-choice',
      options: [
        { value: "A", label: "Option A" },
        { value: "B", label: "Option B" },
        { value: "C", label: "Option C" }
      ],
      correctAnswer: "A"
    };

    const updatedSections = [...currentTest.sections];
    updatedSections[sectionIndex].questions.push(newQuestion);

    setCurrentTest({
      ...currentTest,
      sections: updatedSections,
      totalQuestions: currentTest.totalQuestions + 1
    });
  };

  const handleUpdateQuestion = (sectionIndex: number, questionIndex: number, field: keyof Question, value: any) => {
    if (!currentTest) return;
    
    const updatedSections = [...currentTest.sections];
    updatedSections[sectionIndex].questions[questionIndex] = {
      ...updatedSections[sectionIndex].questions[questionIndex],
      [field]: value
    };

    setCurrentTest({
      ...currentTest,
      sections: updatedSections
    });
  };

  const handleDeleteQuestion = (sectionIndex: number, questionIndex: number) => {
    if (!currentTest) return;
    
    const updatedSections = [...currentTest.sections];
    updatedSections[sectionIndex].questions.splice(questionIndex, 1);

    // Update question numbers
    updatedSections[sectionIndex].questions.forEach((question, idx) => {
      question.number = idx + 1;
    });

    setCurrentTest({
      ...currentTest,
      sections: updatedSections,
      totalQuestions: currentTest.totalQuestions - 1
    });
  };

  const handleSaveTest = () => {
    if (!currentTest) return;

    setListeningTests(prev => prev.map(test => 
      test.id === currentTest.id ? currentTest : test
    ));

    toast({
      title: "Changes saved",
      description: `Test "${currentTest.title}" has been updated.`,
    });

    setCurrentTest(null);
  };

  const renderQuestionEditor = (sectionIndex: number, questionIndex: number, question: Question) => {
    return (
      <Card key={question.id} className="mb-4">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Question {question.number}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive"
              onClick={() => handleDeleteQuestion(sectionIndex, questionIndex)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div>
            <FormLabel>Question Text</FormLabel>
            <Textarea 
              value={question.text}
              onChange={(e) => handleUpdateQuestion(sectionIndex, questionIndex, 'text', e.target.value)}
              rows={2}
            />
          </div>
          
          <div>
            <FormLabel>Question Type</FormLabel>
            <Select 
              value={question.type}
              onValueChange={(value) => handleUpdateQuestion(sectionIndex, questionIndex, 'type', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select question type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                <SelectItem value="fill-in-blank">Fill in the Blank</SelectItem>
                <SelectItem value="matching">Matching</SelectItem>
                <SelectItem value="true-false">True/False</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {question.type === 'multiple-choice' && (
            <div className="space-y-2">
              <FormLabel>Options</FormLabel>
              {question.options?.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-2 mb-2">
                  <Input 
                    value={option.value}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], value: e.target.value };
                      handleUpdateQuestion(sectionIndex, questionIndex, 'options', updatedOptions);
                    }}
                    className="w-16"
                  />
                  <Input 
                    value={option.label}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], label: e.target.value };
                      handleUpdateQuestion(sectionIndex, questionIndex, 'options', updatedOptions);
                    }}
                    className="flex-1"
                  />
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="h-10 w-10 p-0"
                    onClick={() => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions.splice(optionIdx, 1);
                      handleUpdateQuestion(sectionIndex, questionIndex, 'options', updatedOptions);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const updatedOptions = [...(question.options || [])];
                  const newOptionValue = String.fromCharCode(65 + updatedOptions.length); // A, B, C, ...
                  updatedOptions.push({ value: newOptionValue, label: `Option ${newOptionValue}` });
                  handleUpdateQuestion(sectionIndex, questionIndex, 'options', updatedOptions);
                }}
              >
                Add Option
              </Button>
            </div>
          )}
          
          {question.type === 'fill-in-blank' && (
            <div>
              <FormLabel>Max Words</FormLabel>
              <Input 
                type="number" 
                value={question.maxWords || 1}
                onChange={(e) => handleUpdateQuestion(sectionIndex, questionIndex, 'maxWords', Number(e.target.value))}
                min={1}
              />
            </div>
          )}
          
          <div>
            <FormLabel>Correct Answer</FormLabel>
            <Input 
              value={question.correctAnswer}
              onChange={(e) => handleUpdateQuestion(sectionIndex, questionIndex, 'correctAnswer', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderSectionEditor = (section: Section, index: number) => {
    const isCurrentSection = currentSectionIndex === index;
    
    return (
      <Card key={section.id} className="mb-6">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Section {index + 1}</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentSectionIndex(isCurrentSection ? null : index)}
              >
                {isCurrentSection ? "Collapse" : "Expand"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={() => handleDeleteSection(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4 mb-4">
            <div>
              <FormLabel>Section Title</FormLabel>
              <Input 
                value={section.title}
                onChange={(e) => handleUpdateSection(index, 'title', e.target.value)}
              />
            </div>
            
            <div>
              <FormLabel>Section Description</FormLabel>
              <Textarea 
                value={section.description}
                onChange={(e) => handleUpdateSection(index, 'description', e.target.value)}
                rows={isCurrentSection ? 4 : 2}
              />
            </div>

            <div>
              <FormLabel>Audio URL</FormLabel>
              <Input 
                value={section.audioUrl}
                onChange={(e) => handleUpdateSection(index, 'audioUrl', e.target.value)}
                placeholder="Enter audio file URL"
              />
            </div>
          </div>
          
          {isCurrentSection && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Questions ({section.questions.length})</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddQuestion(index)}
                >
                  Add Question
                </Button>
              </div>
              
              {section.questions.map((question, qIndex) => 
                renderQuestionEditor(index, qIndex, question)
              )}
              
              {section.questions.length === 0 && (
                <p className="text-center py-4 text-muted-foreground">
                  No questions added yet. Click "Add Question" to create one.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderTestEditor = () => {
    if (!currentTest) return null;
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                if (confirm('Discard changes?')) {
                  setCurrentTest(null);
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h2 className="text-2xl font-bold">{editMode ? "Edit" : "View"} Listening Test</h2>
          </div>
          
          {editMode && (
            <Button onClick={handleSaveTest}>
              <Save className="h-4 w-4 mr-2" /> Save Changes
            </Button>
          )}
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Test Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <FormLabel>Title</FormLabel>
                <Input 
                  value={currentTest.title}
                  onChange={(e) => setCurrentTest({...currentTest, title: e.target.value})}
                  disabled={!editMode}
                />
              </div>
              
              <div>
                <FormLabel>Duration (minutes)</FormLabel>
                <Input 
                  type="number"
                  value={currentTest.duration}
                  onChange={(e) => setCurrentTest({...currentTest, duration: Number(e.target.value)})}
                  disabled={!editMode}
                />
              </div>
              
              <div className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <Textarea 
                  value={currentTest.description}
                  onChange={(e) => setCurrentTest({...currentTest, description: e.target.value})}
                  disabled={!editMode}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
          
          {editMode && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={handleAddSection}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Section
              </Button>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sections ({currentTest.sections.length})</h3>
            
            {currentTest.sections.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">
                No sections added yet. Click "Add Section" to create one.
              </p>
            ) : (
              currentTest.sections.map((section, index) => 
                editMode ? renderSectionEditor(section, index) : (
                  <Card key={section.id} className="mb-4">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="whitespace-pre-wrap mb-4">{section.description.substring(0, 200)}...</p>
                      <p className="text-sm text-muted-foreground">Questions: {section.questions.length}</p>
                    </CardContent>
                  </Card>
                )
              )
            )}
          </div>
        </div>
      </div>
    );
  };
  
  if (currentTest) {
    return (
      <AdminLayout>
        {renderTestEditor()}
      </AdminLayout>
    );
  }
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">IELTS Listening Tasks</h1>
          <p className="text-muted-foreground">Manage all IELTS listening sections and questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tasks</CardTitle>
              <CardDescription>All listening tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.totalTasks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Academic IELTS</CardTitle>
              <CardDescription>Academic listening tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.academicTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.academicTasks / statisticsData.totalTasks * 100} indicatorClassName="bg-indigo-600" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">General IELTS</CardTitle>
              <CardDescription>General training tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.generalTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.generalTasks / statisticsData.totalTasks * 100} indicatorClassName="bg-blue-600" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Avg. Difficulty</CardTitle>
              <CardDescription>Band score difficulty</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.avgDifficulty}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.avgDifficulty / 9 * 100} indicatorClassName="bg-amber-500" />
            </CardContent>
          </Card>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((difficulty) => (
                  <SelectItem key={difficulty.value} value={difficulty.value}>{difficulty.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search tasks..." 
                className="h-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Listening Task</DialogTitle>
                <DialogDescription>
                  Add a new IELTS listening task. You'll be able to add sections and questions after creating the task.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium">Title</label>
                  <Input
                    id="title"
                    placeholder="Enter task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="difficulty" className="text-sm font-medium">Difficulty</label>
                  <Select value={newTaskDifficulty} onValueChange={setNewTaskDifficulty}>
                    <SelectTrigger id="difficulty">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy (Band 4-5)</SelectItem>
                      <SelectItem value="medium">Medium (Band 6-7)</SelectItem>
                      <SelectItem value="hard">Hard (Band 8-9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label htmlFor="task-type" className="text-sm font-medium">Task Type</label>
                  <Select value={newTaskType} onValueChange={setNewTaskType}>
                    <SelectTrigger id="task-type">
                      <SelectValue placeholder="Select task type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">Academic</SelectItem>
                      <SelectItem value="general">General Training</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddNewTask} disabled={!newTaskTitle}>Create Task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full md:w-auto grid grid-cols-4 md:flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="general">General Training</TabsTrigger>
            <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Sections</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No listening tasks found. Try a different search or add a new task.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.id.startsWith('lt') ? 'Academic' : 'General'}</TableCell>
                          <TableCell>{test.sections.length}</TableCell>
                          <TableCell>{test.totalQuestions}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">6.5-7.5</span>
                              <CustomProgress className="h-2 w-24" value={70} indicatorClassName="bg-amber-500" />
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleViewTest(test)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditTest(test)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleDeleteTask(test.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="academic" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Sections</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => test.id.startsWith('lt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No academic listening tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => test.id.startsWith('lt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.sections.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">7.0-8.0</span>
                                <CustomProgress className="h-2 w-24" value={78} indicatorClassName="bg-indigo-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewTest(test)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditTest(test)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="general" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Sections</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => !test.id.startsWith('lt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No general training listening tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => !test.id.startsWith('lt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.sections.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">5.5-6.5</span>
                                <CustomProgress className="h-2 w-24" value={60} indicatorClassName="bg-blue-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewTest(test)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditTest(test)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="practice" className="mt-4">
            <ScrollArea className="h-[calc(100vh-450px)]">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Sections</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => test.title.toLowerCase().includes("practice")).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No practice tests found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => test.title.toLowerCase().includes("practice"))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.id.startsWith('lt') ? 'Academic' : 'General'}</TableCell>
                            <TableCell>{test.sections.length}</TableCell>
                            <TableCell>{test.totalQuestions}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">6.0-7.0</span>
                                <CustomProgress className="h-2 w-24" value={65} indicatorClassName="bg-green-600" />
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleViewTest(test)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleEditTest(test)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0"
                                onClick={() => handleDeleteTask(test.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ListeningTaskCMS;
