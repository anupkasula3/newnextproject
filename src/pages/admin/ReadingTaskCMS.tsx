import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, FileText, Eye, Save, ArrowLeft } from 'lucide-react';
import { readingTestData } from '@/data/readingTestData';
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
import { CustomProgress } from '@/components/ui/custom-progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ReadingTest, ReadingPassage, ReadingQuestion } from '@/types/reading';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ReadingTaskCMS = () => {
  // Start with readingTestData and add any newly created tests
  const [readingTests, setReadingTests] = useState<ReadingTest[]>([readingTestData]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDifficulty, setNewTaskDifficulty] = useState("medium");
  const [newTaskType, setNewTaskType] = useState("academic");
  const [editMode, setEditMode] = useState(false);
  const [currentTest, setCurrentTest] = useState<ReadingTest | null>(null);
  const [currentPassageIndex, setCurrentPassageIndex] = useState<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    // Load tests from localStorage if available
    const savedTests = localStorage.getItem('readingTests');
    if (savedTests) {
      try {
        const parsedTests = JSON.parse(savedTests);
        if (Array.isArray(parsedTests) && parsedTests.length > 0) {
          setReadingTests(parsedTests);
        }
      } catch (e) {
        console.error("Error parsing saved tests:", e);
      }
    }
  }, []);

  useEffect(() => {
    // Save tests to localStorage when they change
    if (readingTests.length > 0) {
      localStorage.setItem('readingTests', JSON.stringify(readingTests));
    }
  }, [readingTests]);
  
  const difficulties = [
    { value: "all", label: "All Difficulties" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];
  
  // Mock statistics data for IELTS reading tasks
  const statisticsData = {
    totalTasks: readingTests.length,
    academicTasks: readingTests.filter(test => test.id.startsWith('rt')).length,
    generalTasks: readingTests.filter(test => !test.id.startsWith('rt')).length,
    recentlyUpdated: 3,
    avgDifficulty: readingTests.length > 0 ? 
      parseFloat((readingTests.reduce((acc, test) => {
        // Estimate difficulty: Easy = 5.5, Medium = 7, Hard = 8.5
        const difficulty = test.id.toLowerCase().includes('easy') ? 5.5 : 
                          test.id.toLowerCase().includes('hard') ? 8.5 : 7;
        return acc + difficulty;
      }, 0) / readingTests.length).toFixed(1)) : 6.8,
  };
  
  const filteredTests = readingTests.filter(test => 
    test.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddNewTask = () => {
    if (!newTaskTitle.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a task title",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new reading test with basic structure
    const newTest: ReadingTest = {
      id: `rt-${Date.now()}`,
      title: newTaskTitle,
      description: `A new reading task with difficulty: ${newTaskDifficulty}`,
      totalQuestions: 0,
      duration: 60,
      passages: []
    };
    
    // Add the new test to the array
    setReadingTests(prev => [...prev, newTest]);
    
    toast({
      title: "Task created",
      description: `New reading task "${newTaskTitle}" has been created.`,
    });
    
    // Clear form and close dialog
    setNewTaskTitle("");
    setNewTaskDifficulty("medium");
    setIsAddTaskDialogOpen(false);
    
    // Immediately open the new test for editing
    setCurrentTest({...newTest});
    setEditMode(true);
  };
  
  const handleDeleteTask = (testId: string) => {
    if (confirm("Are you sure you want to delete this task? This action cannot be undone.")) {
      setReadingTests(prev => prev.filter(test => test.id !== testId));
      toast({
        title: "Task deleted",
        description: "The reading task has been removed.",
      });
    }
  };

  const handleEditTest = (test: ReadingTest) => {
    setCurrentTest({...test});
    setEditMode(true);
  };

  const handleViewTest = (test: ReadingTest) => {
    setCurrentTest({...test});
    setEditMode(false);
  };

  const handleAddPassage = () => {
    if (!currentTest) return;
    
    const newPassage: ReadingPassage = {
      id: `passage-${Date.now()}`,
      title: "New Passage",
      text: "Enter passage text here...",
      questions: []
    };

    setCurrentTest({
      ...currentTest,
      passages: [...currentTest.passages, newPassage]
    });
    
    // Automatically expand the new passage for editing
    setCurrentPassageIndex(currentTest.passages.length);
  };

  const handleUpdatePassage = (index: number, field: keyof ReadingPassage, value: any) => {
    if (!currentTest) return;
    
    const updatedPassages = [...currentTest.passages];
    updatedPassages[index] = {
      ...updatedPassages[index],
      [field]: value
    };

    setCurrentTest({
      ...currentTest,
      passages: updatedPassages
    });
  };

  const handleDeletePassage = (index: number) => {
    if (!currentTest) return;
    
    if (confirm("Are you sure you want to delete this passage and all its questions?")) {
      const updatedPassages = [...currentTest.passages];
      const removedQuestions = updatedPassages[index].questions.length;
      updatedPassages.splice(index, 1);
  
      setCurrentTest({
        ...currentTest,
        passages: updatedPassages,
        totalQuestions: currentTest.totalQuestions - removedQuestions
      });
      
      // Reset current passage index if needed
      if (currentPassageIndex === index || updatedPassages.length === 0) {
        setCurrentPassageIndex(null);
      } else if (currentPassageIndex !== null && currentPassageIndex > index) {
        setCurrentPassageIndex(currentPassageIndex - 1);
      }
    }
  };

  const handleAddQuestion = (passageIndex: number) => {
    if (!currentTest) return;
    
    const newQuestion: ReadingQuestion = {
      id: `question-${Date.now()}`,
      number: currentTest.passages[passageIndex].questions.length + 1,
      text: "New question",
      type: 'multiple-choice',
      options: [
        { value: "A", label: "Option A" },
        { value: "B", label: "Option B" },
        { value: "C", label: "Option C" }
      ],
      correctAnswer: "A"
    };

    const updatedPassages = [...currentTest.passages];
    updatedPassages[passageIndex].questions.push(newQuestion);

    setCurrentTest({
      ...currentTest,
      passages: updatedPassages,
      totalQuestions: currentTest.totalQuestions + 1
    });
  };

  const handleUpdateQuestion = (passageIndex: number, questionIndex: number, field: keyof ReadingQuestion, value: any) => {
    if (!currentTest) return;
    
    const updatedPassages = [...currentTest.passages];
    updatedPassages[passageIndex].questions[questionIndex] = {
      ...updatedPassages[passageIndex].questions[questionIndex],
      [field]: value
    };

    setCurrentTest({
      ...currentTest,
      passages: updatedPassages
    });
  };

  const handleDeleteQuestion = (passageIndex: number, questionIndex: number) => {
    if (!currentTest) return;
    
    if (confirm("Are you sure you want to delete this question?")) {
      const updatedPassages = [...currentTest.passages];
      updatedPassages[passageIndex].questions.splice(questionIndex, 1);
  
      // Update question numbers
      updatedPassages[passageIndex].questions.forEach((question, idx) => {
        question.number = idx + 1;
      });
  
      setCurrentTest({
        ...currentTest,
        passages: updatedPassages,
        totalQuestions: currentTest.totalQuestions - 1
      });
    }
  };

  const handleSaveTest = () => {
    if (!currentTest) return;

    if (!currentTest.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Test title cannot be empty",
        variant: "destructive"
      });
      return;
    }

    // Check if this is an update or new addition
    const testExists = readingTests.some(test => test.id === currentTest.id);
    
    if (testExists) {
      setReadingTests(prev => prev.map(test => 
        test.id === currentTest.id ? currentTest : test
      ));
    } else {
      setReadingTests(prev => [...prev, currentTest]);
    }

    toast({
      title: "Changes saved",
      description: `Test "${currentTest.title}" has been ${testExists ? 'updated' : 'created'}.`,
    });
    
    // Keep the current test open for further editing
    // But set the mode back to view
    setEditMode(false);
  };

  const renderQuestionEditor = (passageIndex: number, questionIndex: number, question: ReadingQuestion) => {
    return (
      <Card key={question.id} className="mb-4">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Question {question.number}</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0 text-destructive"
              onClick={() => handleDeleteQuestion(passageIndex, questionIndex)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-3">
          <div>
            <Label>Question Text</Label>
            <Textarea 
              value={question.text}
              onChange={(e) => handleUpdateQuestion(passageIndex, questionIndex, 'text', e.target.value)}
              rows={2}
            />
          </div>
          
          <div>
            <Label>Question Type</Label>
            <Select 
              value={question.type}
              onValueChange={(value: any) => handleUpdateQuestion(passageIndex, questionIndex, 'type', value)}
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
              <Label>Options</Label>
              {question.options?.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-2 mb-2">
                  <Input 
                    value={option.value}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], value: e.target.value };
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
                    }}
                    className="w-16"
                  />
                  <Input 
                    value={option.label}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], label: e.target.value };
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
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
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
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
                  handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
                }}
              >
                Add Option
              </Button>
            </div>
          )}
          
          {question.type === 'fill-in-blank' && (
            <div>
              <Label>Max Words</Label>
              <Input 
                type="number" 
                value={question.maxWords || 1}
                onChange={(e) => handleUpdateQuestion(passageIndex, questionIndex, 'maxWords', Number(e.target.value))}
                min={1}
              />
            </div>
          )}

          {(question.type === 'matching' || question.type === 'true-false') && (
            <div className="space-y-2">
              <Label>Options</Label>
              {question.options?.map((option, optionIdx) => (
                <div key={option.value} className="flex gap-2 mb-2">
                  <Input 
                    value={option.value}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], value: e.target.value };
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
                    }}
                    className="w-16"
                  />
                  <Input 
                    value={option.label}
                    onChange={(e) => {
                      const updatedOptions = [...(question.options || [])];
                      updatedOptions[optionIdx] = { ...updatedOptions[optionIdx], label: e.target.value };
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
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
                      handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
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
                  if (question.type === 'true-false' && updatedOptions.length >= 2) return;
                  
                  if (question.type === 'true-false' && updatedOptions.length === 0) {
                    updatedOptions.push({ value: "true", label: "True" });
                    updatedOptions.push({ value: "false", label: "False" });
                  } else {
                    const newOptionValue = String.fromCharCode(65 + updatedOptions.length); // A, B, C, ...
                    updatedOptions.push({ value: newOptionValue, label: `Option ${newOptionValue}` });
                  }
                  handleUpdateQuestion(passageIndex, questionIndex, 'options', updatedOptions);
                }}
              >
                Add Option
              </Button>
            </div>
          )}
          
          <div>
            <Label>Correct Answer</Label>
            <Input 
              value={question.correctAnswer}
              onChange={(e) => handleUpdateQuestion(passageIndex, questionIndex, 'correctAnswer', e.target.value)}
            />
          </div>

          <div>
            <Label>Instructions (Optional)</Label>
            <Textarea 
              value={question.instruction || ''}
              onChange={(e) => handleUpdateQuestion(passageIndex, questionIndex, 'instruction', e.target.value)}
              placeholder="Optional instructions for this question"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPassageEditor = (passage: ReadingPassage, index: number) => {
    const isCurrentPassage = currentPassageIndex === index;
    
    return (
      <Card key={passage.id} className="mb-6">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Passage {index + 1}</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setCurrentPassageIndex(isCurrentPassage ? null : index)}
              >
                {isCurrentPassage ? "Collapse" : "Expand"}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-destructive"
                onClick={() => handleDeletePassage(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4 mb-4">
            <div>
              <Label>Passage Title</Label>
              <Input 
                value={passage.title}
                onChange={(e) => handleUpdatePassage(index, 'title', e.target.value)}
              />
            </div>
            
            <div>
              <Label>Passage Text</Label>
              <Textarea 
                value={passage.text}
                onChange={(e) => handleUpdatePassage(index, 'text', e.target.value)}
                rows={isCurrentPassage ? 8 : 3}
              />
            </div>
          </div>
          
          {isCurrentPassage && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-medium">Questions ({passage.questions.length})</h4>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleAddQuestion(index)}
                >
                  Add Question
                </Button>
              </div>
              
              {passage.questions.map((question, qIndex) => 
                renderQuestionEditor(index, qIndex, question)
              )}
              
              {passage.questions.length === 0 && (
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
                if (!editMode || confirm('Discard unsaved changes?')) {
                  setCurrentTest(null);
                  setCurrentPassageIndex(null);
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h2 className="text-2xl font-bold">{editMode ? "Edit" : "View"} Reading Test</h2>
          </div>
          
          <div className="flex gap-2">
            {editMode ? (
              <Button onClick={handleSaveTest}>
                <Save className="h-4 w-4 mr-2" /> Save Changes
              </Button>
            ) : (
              <Button onClick={() => setEditMode(true)}>
                <Edit className="h-4 w-4 mr-2" /> Edit Test
              </Button>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          <Card>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Test Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Title</Label>
                <Input 
                  value={currentTest.title}
                  onChange={(e) => setCurrentTest({...currentTest, title: e.target.value})}
                  disabled={!editMode}
                  placeholder="Enter a title for this test"
                />
              </div>
              
              <div>
                <Label>Duration (minutes)</Label>
                <Input 
                  type="number"
                  value={currentTest.duration}
                  onChange={(e) => setCurrentTest({...currentTest, duration: Number(e.target.value)})}
                  disabled={!editMode}
                  min={1}
                  max={180}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Textarea 
                  value={currentTest.description}
                  onChange={(e) => setCurrentTest({...currentTest, description: e.target.value})}
                  disabled={!editMode}
                  rows={2}
                  placeholder="Provide a description for this reading test"
                />
              </div>
            </CardContent>
          </Card>
          
          {editMode && (
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={handleAddPassage}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Passage
              </Button>
            </div>
          )}
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Passages ({currentTest.passages.length})</h3>
            
            {currentTest.passages.length === 0 ? (
              <p className="text-center py-6 text-muted-foreground">
                No passages added yet. {editMode ? "Click \"Add Passage\" to create one." : ""}
              </p>
            ) : (
              currentTest.passages.map((passage, index) => 
                editMode ? renderPassageEditor(passage, index) : (
                  <Card key={passage.id} className="mb-4">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-lg">{passage.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="whitespace-pre-wrap mb-4">{passage.text.substring(0, 200)}...</p>
                      <p className="text-sm text-muted-foreground">Questions: {passage.questions.length}</p>
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
          <h1 className="text-3xl font-bold">IELTS Reading Tasks</h1>
          <p className="text-muted-foreground">Manage all IELTS reading passages and questions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Tasks</CardTitle>
              <CardDescription>All reading tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.totalTasks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Academic IELTS</CardTitle>
              <CardDescription>Academic reading tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.academicTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.academicTasks / (statisticsData.totalTasks || 1) * 100} indicatorClassName="bg-indigo-600" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">General IELTS</CardTitle>
              <CardDescription>General training tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{statisticsData.generalTasks}</div>
              <CustomProgress className="h-2 mt-2" value={statisticsData.generalTasks / (statisticsData.totalTasks || 1) * 100} indicatorClassName="bg-blue-600" />
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
                <DialogTitle>Create New Reading Task</DialogTitle>
                <DialogDescription>
                  Add a new IELTS reading task. You'll be able to add passages and questions after creating the task.
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
                <Button onClick={handleAddNewTask} disabled={!newTaskTitle.trim()}>Create Task</Button>
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
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4 text-muted-foreground">
                          No reading tasks found. Try a different search or add a new task.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests.map((test) => (
                        <TableRow key={test.id}>
                          <TableCell className="font-medium">{test.title}</TableCell>
                          <TableCell>{test.id.startsWith('rt') ? 'Academic' : 'General'}</TableCell>
                          <TableCell>{test.passages.length}</TableCell>
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
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => test.id.startsWith('rt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No academic reading tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => test.id.startsWith('rt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
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
                      <TableHead>Passages</TableHead>
                      <TableHead>Questions</TableHead>
                      <TableHead>Band Score</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTests.filter(test => !test.id.startsWith('rt')).length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                          No general training reading tasks found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredTests
                        .filter(test => !test.id.startsWith('rt'))
                        .map((test) => (
                          <TableRow key={test.id}>
                            <TableCell className="font-medium">{test.title}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
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
                      <TableHead>Passages</TableHead>
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
                            <TableCell>{test.id.startsWith('rt') ? 'Academic' : 'General'}</TableCell>
                            <TableCell>{test.passages.length}</TableCell>
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

export default ReadingTaskCMS;
