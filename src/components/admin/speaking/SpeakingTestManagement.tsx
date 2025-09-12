
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SpeakingCategory, SpeakingQuestion, SpeakingTask } from "@/types/speaking";
import { PlusCircle, Save, Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const emptyQuestion: Omit<SpeakingQuestion, 'id'> = {
  part: 1,
  text: '',
  duration: 30
};

const emptyTask: Omit<SpeakingTask, 'id' | 'questions'> = {
  title: '',
  description: '',
  category: 'general'
};

export const SpeakingTestManagement = () => {
  const [activeTab, setActiveTab] = useState("tests");
  const [tasks, setTasks] = useState<SpeakingTask[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Omit<SpeakingTask, 'id'> & { id?: string }>({
    ...emptyTask,
    questions: []
  });
  const { toast } = useToast();

  // For demo purposes, we're loading data from local state
  // In a real app, this would come from an API
  const loadDemoData = () => {
    // Import test data
    import('@/data/speakingTaskData').then(({ speakingTaskData }) => {
      import('@/data/speakingTasksData').then(({ speakingTasksData }) => {
        const allTasks = [speakingTaskData, ...speakingTasksData];
        setTasks(allTasks);
        toast({
          title: "Demo data loaded",
          description: `Loaded ${allTasks.length} speaking tasks`,
        });
      });
    });
  };

  // Load demo data when component mounts
  React.useEffect(() => {
    loadDemoData();
  }, []);

  const handleSelectTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTaskId(taskId);
      setEditingTask({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        questions: [...task.questions]
      });
    }
  };

  const handleCreateNewTask = () => {
    setSelectedTaskId(null);
    setEditingTask({
      ...emptyTask,
      questions: []
    });
  };

  const handleAddQuestion = (part: 1 | 2 | 3) => {
    setEditingTask(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: `question-${Date.now()}`,
          part,
          text: '',
          duration: part === 2 ? 120 : 30,
          ...(part === 2 ? { preparation: 60, notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes." } : {})
        }
      ]
    }));
  };

  const handleQuestionChange = (index: number, field: keyof SpeakingQuestion, value: any) => {
    setEditingTask(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = {
        ...updatedQuestions[index],
        [field]: value
      };
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setEditingTask(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions.splice(index, 1);
      return {
        ...prev,
        questions: updatedQuestions
      };
    });
  };

  const handleSaveTask = () => {
    if (!editingTask.title || !editingTask.category) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (editingTask.questions.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one question",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send data to an API
    const updatedTask: SpeakingTask = {
      id: editingTask.id || `speaking-task-${Date.now()}`,
      title: editingTask.title,
      description: editingTask.description,
      category: editingTask.category,
      questions: editingTask.questions
    };

    // Update local state for demo purposes
    if (selectedTaskId) {
      // Update existing task
      setTasks(prev => prev.map(t => t.id === selectedTaskId ? updatedTask : t));
    } else {
      // Add new task
      setTasks(prev => [...prev, updatedTask]);
    }

    toast({
      title: "Success",
      description: selectedTaskId ? "Task updated successfully" : "New task created successfully",
    });

    // Reset form and selection
    setSelectedTaskId(updatedTask.id);
    setEditingTask({
      id: updatedTask.id,
      title: updatedTask.title,
      description: updatedTask.description,
      category: updatedTask.category,
      questions: [...updatedTask.questions]
    });
  };

  const renderTaskForm = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            value={editingTask.title}
            onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
            placeholder="e.g., IELTS Speaking Practice Test 1"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
          <Select
            value={editingTask.category}
            onValueChange={(value) => setEditingTask({ ...editingTask, category: value as SpeakingCategory })}
          >
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family">Family</SelectItem>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="hobbies">Hobbies</SelectItem>
              <SelectItem value="hometown">Hometown</SelectItem>
              <SelectItem value="travel">Travel</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="food">Food</SelectItem>
              <SelectItem value="general">General</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editingTask.description}
          onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
          placeholder="Provide a brief description of this speaking test"
          rows={2}
        />
      </div>
      
      <Tabs defaultValue="part1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="part1">Part 1</TabsTrigger>
          <TabsTrigger value="part2">Part 2</TabsTrigger>
          <TabsTrigger value="part3">Part 3</TabsTrigger>
        </TabsList>
        
        {[1, 2, 3].map((part) => (
          <TabsContent key={`part${part}`} value={`part${part}`} className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                Part {part} Questions
                {part === 1 && " (Introduction)"}
                {part === 2 && " (Individual Long Turn)"}
                {part === 3 && " (Discussion)"}
              </h3>
              <Button onClick={() => handleAddQuestion(part as 1 | 2 | 3)} size="sm" variant="outline" className="gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Question
              </Button>
            </div>
            
            {editingTask.questions
              .filter(q => q.part === part)
              .map((question, index) => {
                const questionIndex = editingTask.questions.indexOf(question);
                return (
                  <Card key={index} className="border border-gray-200">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-md">Question {index + 1}</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveQuestion(questionIndex)}
                          className="h-8 w-8 p-0 text-red-500"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Question Text</Label>
                        <Textarea
                          value={question.text}
                          onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                          rows={part === 2 ? 6 : 2}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Response Time (seconds)</Label>
                          <Input
                            type="number"
                            value={question.duration}
                            onChange={(e) => handleQuestionChange(questionIndex, 'duration', parseInt(e.target.value))}
                            min={10}
                          />
                        </div>
                        
                        {part === 2 && (
                          <div className="space-y-2">
                            <Label>Preparation Time (seconds)</Label>
                            <Input
                              type="number"
                              value={question.preparation || 60}
                              onChange={(e) => handleQuestionChange(questionIndex, 'preparation', parseInt(e.target.value))}
                              min={30}
                            />
                          </div>
                        )}
                      </div>
                      
                      {part === 1 && (
                        <div className="space-y-2">
                          <Label>Follow-up Questions (one per line)</Label>
                          <Textarea
                            value={question.followUp?.join('\n') || ''}
                            onChange={(e) => {
                              const followUpArray = e.target.value.split('\n').filter(line => line.trim() !== '');
                              handleQuestionChange(questionIndex, 'followUp', followUpArray.length > 0 ? followUpArray : undefined);
                            }}
                            rows={3}
                            placeholder="Add follow-up questions the examiner might ask"
                          />
                        </div>
                      )}
                      
                      {part === 2 && (
                        <div className="space-y-2">
                          <Label>Notes for Candidate</Label>
                          <Textarea
                            value={question.notes || ''}
                            onChange={(e) => handleQuestionChange(questionIndex, 'notes', e.target.value)}
                            rows={2}
                            placeholder="Instructions for the candidate"
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            
            {editingTask.questions.filter(q => q.part === part).length === 0 && (
              <div className="text-center py-8 border rounded-md bg-gray-50">
                <p className="text-muted-foreground">No questions added yet</p>
                <Button onClick={() => handleAddQuestion(part as 1 | 2 | 3)} variant="ghost" size="sm" className="mt-2">
                  Add your first question
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
      
      <div className="flex justify-end gap-2">
        <Button 
          variant="outline" 
          onClick={() => {
            if (selectedTaskId) {
              handleSelectTask(selectedTaskId);
            } else {
              handleCreateNewTask();
            }
          }}
        >
          Reset
        </Button>
        <Button onClick={handleSaveTask} className="gap-2">
          <Save className="h-4 w-4" />
          Save Test
        </Button>
      </div>
    </div>
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="tests">Speaking Tests</TabsTrigger>
        <TabsTrigger value="editor">{selectedTaskId ? 'Edit Test' : 'Create New Test'}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tests" className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Speaking Tests</h2>
          <Button onClick={handleCreateNewTask}>Create New Test</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <CardTitle>{task.title}</CardTitle>
                <CardDescription>
                  Category: {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>
                <div className="mt-2 flex gap-2">
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    Part 1: {task.questions.filter(q => q.part === 1).length} questions
                  </div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    Part 2: {task.questions.filter(q => q.part === 2).length} questions
                  </div>
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                    Part 3: {task.questions.filter(q => q.part === 3).length} questions
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    handleSelectTask(task.id);
                    setActiveTab("editor");
                  }}
                  className="w-full"
                >
                  Edit Test
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {tasks.length === 0 && (
          <div className="text-center py-12 border rounded-md bg-gray-50">
            <p className="text-muted-foreground">No speaking tests created yet</p>
            <Button onClick={handleCreateNewTask} variant="outline" size="sm" className="mt-2">
              Create your first test
            </Button>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="editor">
        {renderTaskForm()}
      </TabsContent>
    </Tabs>
  );
};
