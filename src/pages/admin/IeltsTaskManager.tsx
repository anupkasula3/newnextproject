
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  BookOpen,
  Headphones,
  FileText,
  Mic,
  Search,
  Filter, 
  ArrowRight
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IeltsSection, IeltsTask, IeltsQuestion, IeltsOption, QuestionType, IeltsPassage } from '@/types/ielts';

// Task Form Schema
const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  section: z.enum(['listening', 'reading', 'writing', 'speaking']),
  duration: z.string().min(1, 'Duration is required'),
});

// Question Form Schema
const questionFormSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  instruction: z.string().optional(),
  type: z.enum(['multiple-choice', 'fill-in-blank', 'matching', 'true-false', 'essay', 'speaking-prompt']),
  correctAnswer: z.string().min(1, 'Correct answer is required'),
  maxWords: z.string().optional(),
  category: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ).optional(),
});

// Passage Form Schema
const passageFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  text: z.string().min(1, 'Passage text is required'),
});

// Mock data - would be replaced with API calls in a real application
const mockTasks: IeltsTask[] = [
  {
    id: '1',
    title: 'Academic Reading - Science and Technology',
    description: 'Reading passage about recent technological advancements',
    section: 'reading',
    passages: [
      {
        id: 'p1',
        title: 'The Future of Artificial Intelligence',
        text: 'Long passage about AI...',
        questions: []
      }
    ],
    duration: 60,
    totalQuestions: 13,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Listening Section 1 - Conversation',
    description: 'A conversation between two people about university accommodation',
    section: 'listening',
    audioUrl: 'https://example.com/listening1.mp3',
    questions: [],
    duration: 30,
    totalQuestions: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Writing Task 1 - Graph Description',
    description: 'Describe the information in a graph or chart',
    section: 'writing',
    prompt: 'The graph below shows the population of different age groups in a city over time. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    duration: 20,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Speaking Part 2 - Long Turn',
    description: 'Speak for 2 minutes on a given topic',
    section: 'speaking',
    prompt: 'Describe a place you have visited that made a strong impression on you. You should say: where it is, when you went there, what you did there, and explain why it made such a strong impression on you.',
    duration: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const IeltsTaskManager = () => {
  const { sectionType } = useParams<{ sectionType: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('tasks');
  const [tasks, setTasks] = useState<IeltsTask[]>(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState<IeltsTask[]>([]);
  const [selectedSection, setSelectedSection] = useState<IeltsSection | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [isAddPassageDialogOpen, setIsAddPassageDialogOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<IeltsTask | null>(null);
  const [currentPassage, setCurrentPassage] = useState<IeltsPassage | null>(null);
  
  // Forms
  const taskForm = useForm<z.infer<typeof taskFormSchema>>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      section: 'reading',
      duration: '60',
    }
  });
  
  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      text: '',
      instruction: '',
      type: 'multiple-choice',
      correctAnswer: '',
      maxWords: '',
      category: '',
      difficulty: 'medium',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ]
    }
  });
  
  const passageForm = useForm<z.infer<typeof passageFormSchema>>({
    resolver: zodResolver(passageFormSchema),
    defaultValues: {
      title: '',
      text: ''
    }
  });
  
  // Filter tasks based on section and search query
  useEffect(() => {
    let filtered = tasks;
    
    if (selectedSection !== 'all') {
      filtered = filtered.filter(task => task.section === selectedSection);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) || 
        task.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredTasks(filtered);
  }, [tasks, selectedSection, searchQuery]);
  
  // Handle task form submission
  const handleAddTask = (data: z.infer<typeof taskFormSchema>) => {
    const newTask: IeltsTask = {
      id: String(tasks.length + 1),
      title: data.title,
      description: data.description,
      section: data.section as IeltsSection,
      duration: parseInt(data.duration),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    if (data.section === 'reading') {
      newTask.passages = [];
    } else if (data.section === 'listening') {
      newTask.audioUrl = '';
      newTask.questions = [];
    } else if (data.section === 'writing' || data.section === 'speaking') {
      newTask.prompt = '';
    }
    
    setTasks([...tasks, newTask]);
    setIsAddTaskDialogOpen(false);
    taskForm.reset();
    
    toast({
      title: "Task created",
      description: `${data.title} has been created successfully.`
    });
  };
  
  // Handle adding questions
  const handleAddQuestion = (data: z.infer<typeof questionFormSchema>) => {
    if (!selectedTask) return;
    
    const newQuestion: IeltsQuestion = {
      id: String(Date.now()),
      number: selectedTask.questions?.length ? selectedTask.questions.length + 1 : 1,
      text: data.text,
      instruction: data.instruction || undefined,
      type: data.type as QuestionType,
      correctAnswer: data.correctAnswer,
      maxWords: data.maxWords ? parseInt(data.maxWords) : undefined,
      category: data.category || undefined,
      difficulty: data.difficulty as 'easy' | 'medium' | 'hard',
    };
    
    if (['multiple-choice', 'matching', 'true-false'].includes(data.type)) {
      newQuestion.options = data.options?.filter(option => option.label.trim() !== '') as IeltsOption[];
    }
    
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        // If it's a reading task with passages
        if (task.section === 'reading' && currentPassage) {
          const updatedPassages = task.passages?.map(passage => {
            if (passage.id === currentPassage.id) {
              return {
                ...passage,
                questions: [...(passage.questions || []), newQuestion]
              };
            }
            return passage;
          });
          return { ...task, passages: updatedPassages };
        } 
        // For other sections with direct questions
        else {
          return { 
            ...task, 
            questions: [...(task.questions || []), newQuestion],
            totalQuestions: (task.totalQuestions || 0) + 1
          };
        }
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setIsAddQuestionDialogOpen(false);
    questionForm.reset({
      text: '',
      instruction: '',
      type: 'multiple-choice',
      correctAnswer: '',
      maxWords: '',
      category: '',
      difficulty: 'medium',
      options: [
        { value: 'A', label: '' },
        { value: 'B', label: '' },
        { value: 'C', label: '' },
        { value: 'D', label: '' }
      ]
    });
    
    toast({
      title: "Question added",
      description: "The question has been added successfully."
    });
  };
  
  // Handle adding passages
  const handleAddPassage = (data: z.infer<typeof passageFormSchema>) => {
    if (!selectedTask) return;
    
    const newPassage: IeltsPassage = {
      id: String(Date.now()),
      title: data.title,
      text: data.text,
      questions: []
    };
    
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          passages: [...(task.passages || []), newPassage]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setIsAddPassageDialogOpen(false);
    passageForm.reset();
    
    toast({
      title: "Passage added",
      description: `"${data.title}" has been added to the task.`
    });
  };
  
  // Delete task handler
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast({
      title: "Task deleted",
      description: "The task has been deleted successfully."
    });
  };
  
  // Delete question handler
  const handleDeleteQuestion = (questionId: string) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        // If it's a reading task with passages
        if (task.section === 'reading' && currentPassage) {
          const updatedPassages = task.passages?.map(passage => {
            if (passage.id === currentPassage.id) {
              return {
                ...passage,
                questions: passage.questions.filter(q => q.id !== questionId)
              };
            }
            return passage;
          });
          return { ...task, passages: updatedPassages };
        } 
        // For other sections with direct questions
        else {
          return { 
            ...task, 
            questions: task.questions?.filter(q => q.id !== questionId),
            totalQuestions: (task.totalQuestions || 0) - 1
          };
        }
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    toast({
      title: "Question deleted",
      description: "The question has been deleted successfully."
    });
  };
  
  // Delete passage handler
  const handleDeletePassage = (passageId: string) => {
    if (!selectedTask) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === selectedTask.id) {
        return {
          ...task,
          passages: task.passages?.filter(p => p.id !== passageId)
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setCurrentPassage(null);
    
    toast({
      title: "Passage deleted",
      description: "The passage has been deleted successfully."
    });
  };
  
  // Get section icon
  const getSectionIcon = (section: IeltsSection) => {
    switch (section) {
      case 'reading':
        return <BookOpen className="h-4 w-4" />;
      case 'listening':
        return <Headphones className="h-4 w-4" />;
      case 'writing':
        return <FileText className="h-4 w-4" />;
      case 'speaking':
        return <Mic className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  // Render question type
  const renderQuestionType = (type: QuestionType) => {
    switch (type) {
      case 'multiple-choice':
        return 'Multiple Choice';
      case 'fill-in-blank':
        return 'Fill in the Blanks';
      case 'matching':
        return 'Matching';
      case 'true-false':
        return 'True/False';
      case 'essay':
        return 'Essay';
      case 'speaking-prompt':
        return 'Speaking Prompt';
      default:
        return type;
    }
  };
  
  // Check if questions can be added directly to this task
  const canAddQuestionsDirectly = (task: IeltsTask) => {
    return task.section === 'listening' || 
           (task.section === 'reading' && task.passages && task.passages.length > 0);
  };
  
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">IELTS Test Management</h1>
          <p className="text-muted-foreground">Create and manage IELTS tasks, questions, and passages</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="tasks" className="mt-4 space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <Select value={selectedSection} onValueChange={(value) => setSelectedSection(value as IeltsSection | 'all')}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sections</SelectItem>
                    <SelectItem value="reading">Reading</SelectItem>
                    <SelectItem value="listening">Listening</SelectItem>
                    <SelectItem value="writing">Writing</SelectItem>
                    <SelectItem value="speaking">Speaking</SelectItem>
                  </SelectContent>
                </Select>
                
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks..."
                    className="pl-8 w-[200px] md:w-[300px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={() => setIsAddTaskDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 h-fit">
                <CardHeader className="pb-3">
                  <CardTitle>Available Tasks</CardTitle>
                  <CardDescription>
                    Select a task to manage its content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[calc(100vh-300px)]">
                    <div className="space-y-2">
                      {filteredTasks.length > 0 ? (
                        filteredTasks.map(task => (
                          <div 
                            key={task.id}
                            className={`p-3 rounded-md cursor-pointer border transition-colors ${
                              selectedTask?.id === task.id 
                                ? 'bg-primary/10 border-primary' 
                                : 'hover:bg-muted border-transparent'
                            }`}
                            onClick={() => {
                              setSelectedTask(task);
                              setCurrentPassage(null);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {getSectionIcon(task.section)}
                                <span className="font-medium">{task.title}</span>
                              </div>
                              <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                                {task.section}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {task.description}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">No tasks found</p>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                {selectedTask ? (
                  <>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle>{selectedTask.title}</CardTitle>
                          <CardDescription>
                            {selectedTask.description}
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Task</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete this task? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteTask(selectedTask.id)}>
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                      
                      <div className="flex gap-2 mt-2">
                        <div className="text-sm bg-muted px-2 py-1 rounded-md">
                          Section: <span className="font-medium capitalize">{selectedTask.section}</span>
                        </div>
                        <div className="text-sm bg-muted px-2 py-1 rounded-md">
                          Duration: <span className="font-medium">{selectedTask.duration} min</span>
                        </div>
                        {selectedTask.totalQuestions && (
                          <div className="text-sm bg-muted px-2 py-1 rounded-md">
                            Questions: <span className="font-medium">{selectedTask.totalQuestions}</span>
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Passage selection for reading tasks */}
                      {selectedTask.section === 'reading' && (
                        <div className="mb-6">
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Passages</h3>
                            <Button variant="outline" size="sm" onClick={() => setIsAddPassageDialogOpen(true)}>
                              <Plus className="h-3 w-3 mr-1" />
                              Add Passage
                            </Button>
                          </div>
                          
                          {selectedTask.passages && selectedTask.passages.length > 0 ? (
                            <div className="space-y-2">
                              {selectedTask.passages.map(passage => (
                                <div 
                                  key={passage.id}
                                  className={`p-3 rounded-md cursor-pointer border transition-colors ${
                                    currentPassage?.id === passage.id 
                                      ? 'bg-primary/10 border-primary' 
                                      : 'hover:bg-muted border-transparent'
                                  }`}
                                  onClick={() => setCurrentPassage(passage)}
                                >
                                  <div className="flex justify-between">
                                    <span className="font-medium">{passage.title}</span>
                                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                                      {passage.questions.length} questions
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 border border-dashed rounded-md">
                              <p className="text-muted-foreground">No passages added yet</p>
                              <Button variant="link" onClick={() => setIsAddPassageDialogOpen(true)}>
                                Add your first passage
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* Content area */}
                      {selectedTask.section === 'reading' && currentPassage ? (
                        <div>
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium">Passage: {currentPassage.title}</h3>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Pencil className="h-3 w-3 mr-1" />
                                Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="destructive" size="sm">
                                    <Trash2 className="h-3 w-3 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Passage</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      This will also delete all questions associated with this passage. This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeletePassage(currentPassage.id)}>
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                          
                          <div className="mb-4 p-4 bg-muted/30 rounded-md max-h-[200px] overflow-y-auto">
                            <p className="text-sm whitespace-pre-wrap">{currentPassage.text}</p>
                          </div>
                          
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Questions</h3>
                            <Button size="sm" onClick={() => setIsAddQuestionDialogOpen(true)}>
                              <Plus className="h-3 w-3 mr-1" />
                              Add Question
                            </Button>
                          </div>
                          
                          {currentPassage.questions && currentPassage.questions.length > 0 ? (
                            <div className="space-y-3">
                              {currentPassage.questions.map((question, index) => (
                                <div key={question.id} className="p-3 border rounded-md">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">Question {question.number}</span>
                                    <div className="flex gap-1">
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Pencil className="h-3 w-3" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete this question?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteQuestion(question.id)}>
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>
                                  <p className="text-sm mb-1">{question.text}</p>
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                      {renderQuestionType(question.type)}
                                    </span>
                                    {question.difficulty && (
                                      <span className={`px-2 py-0.5 rounded-full ${
                                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {question.difficulty}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 border border-dashed rounded-md">
                              <p className="text-muted-foreground">No questions added yet</p>
                              <Button variant="link" onClick={() => setIsAddQuestionDialogOpen(true)}>
                                Add your first question
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : selectedTask.section === 'listening' ? (
                        <div>
                          <div className="mb-4">
                            <h3 className="font-medium mb-2">Audio File</h3>
                            <div className="flex items-center gap-3">
                              <Input type="file" accept="audio/*" className="max-w-md" />
                              <Button variant="outline" size="sm">Upload</Button>
                            </div>
                            {selectedTask.audioUrl && (
                              <div className="mt-2">
                                <audio controls src={selectedTask.audioUrl} className="w-full max-w-md" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex justify-between items-center mb-3">
                            <h3 className="font-medium">Questions</h3>
                            <Button size="sm" onClick={() => setIsAddQuestionDialogOpen(true)}>
                              <Plus className="h-3 w-3 mr-1" />
                              Add Question
                            </Button>
                          </div>
                          
                          {selectedTask.questions && selectedTask.questions.length > 0 ? (
                            <div className="space-y-3">
                              {selectedTask.questions.map((question) => (
                                <div key={question.id} className="p-3 border rounded-md">
                                  <div className="flex justify-between mb-1">
                                    <span className="font-medium">Question {question.number}</span>
                                    <div className="flex gap-1">
                                      <Button variant="ghost" size="icon" className="h-6 w-6">
                                        <Pencil className="h-3 w-3" />
                                      </Button>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                                            <Trash2 className="h-3 w-3" />
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Delete Question</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to delete this question?
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDeleteQuestion(question.id)}>
                                              Delete
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                    </div>
                                  </div>
                                  <p className="text-sm mb-1">{question.text}</p>
                                  <div className="flex flex-wrap gap-2 text-xs">
                                    <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                      {renderQuestionType(question.type)}
                                    </span>
                                    {question.difficulty && (
                                      <span className={`px-2 py-0.5 rounded-full ${
                                        question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                                        question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {question.difficulty}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-center py-4 border border-dashed rounded-md">
                              <p className="text-muted-foreground">No questions added yet</p>
                              <Button variant="link" onClick={() => setIsAddQuestionDialogOpen(true)}>
                                Add your first question
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : selectedTask.section === 'writing' ? (
                        <div>
                          <h3 className="font-medium mb-2">Writing Prompt</h3>
                          <Textarea 
                            value={selectedTask.prompt || ''}
                            onChange={(e) => {
                              const updatedTasks = tasks.map(task => {
                                if (task.id === selectedTask.id) {
                                  return { ...task, prompt: e.target.value };
                                }
                                return task;
                              });
                              setTasks(updatedTasks);
                            }}
                            placeholder="Enter the writing prompt..."
                            className="min-h-[150px] mb-4"
                          />
                          <Button>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : selectedTask.section === 'speaking' ? (
                        <div>
                          <h3 className="font-medium mb-2">Speaking Prompt</h3>
                          <Textarea 
                            value={selectedTask.prompt || ''}
                            onChange={(e) => {
                              const updatedTasks = tasks.map(task => {
                                if (task.id === selectedTask.id) {
                                  return { ...task, prompt: e.target.value };
                                }
                                return task;
                              });
                              setTasks(updatedTasks);
                            }}
                            placeholder="Enter the speaking prompt..."
                            className="min-h-[150px] mb-4"
                          />
                          <Button>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-muted-foreground">Select a section or passage to manage content</p>
                        </div>
                      )}
                    </CardContent>
                  </>
                ) : (
                  <div className="py-16 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <CardTitle className="mb-2">No Task Selected</CardTitle>
                    <CardDescription>
                      Select a task from the left or create a new one to get started
                    </CardDescription>
                    <Button className="mt-4" onClick={() => setIsAddTaskDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Task
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>IELTS Test Settings</CardTitle>
                <CardDescription>
                  Configure global settings for IELTS test components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Section Defaults</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">Reading Section</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Duration:</span> 60 min
                          </div>
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Questions:</span> 40
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Listening Section</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Duration:</span> 30 min
                          </div>
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Questions:</span> 40
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Writing Section</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Duration:</span> 60 min
                          </div>
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Tasks:</span> 2
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-1 block">Speaking Section</label>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Duration:</span> 11-14 min
                          </div>
                          <div className="bg-muted p-2 rounded-md">
                            <span className="font-medium">Parts:</span> 3
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Scoring Settings</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Listening Band Scale</p>
                          <p className="text-sm text-muted-foreground">Score conversion for listening section</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Reading Band Scale</p>
                          <p className="text-sm text-muted-foreground">Score conversion for reading section</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Writing Assessment Criteria</p>
                          <p className="text-sm text-muted-foreground">Criteria for writing tasks evaluation</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 border rounded-md">
                        <div>
                          <p className="font-medium">Speaking Assessment Criteria</p>
                          <p className="text-sm text-muted-foreground">Criteria for speaking evaluation</p>
                        </div>
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto">Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        {/* Add Task Dialog */}
        <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>
                Create a new task for an IELTS test section
              </DialogDescription>
            </DialogHeader>
            
            <Form {...taskForm}>
              <form onSubmit={taskForm.handleSubmit(handleAddTask)} className="space-y-4">
                <FormField
                  control={taskForm.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <Select 
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a section" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="reading">Reading</SelectItem>
                          <SelectItem value="listening">Listening</SelectItem>
                          <SelectItem value="writing">Writing</SelectItem>
                          <SelectItem value="speaking">Speaking</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={taskForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={taskForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter task description"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={taskForm.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddTaskDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Create Task</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Add Question Dialog */}
        <Dialog open={isAddQuestionDialogOpen} onOpenChange={setIsAddQuestionDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Question</DialogTitle>
              <DialogDescription>
                Create a new question for this task
              </DialogDescription>
            </DialogHeader>
            
            <Form {...questionForm}>
              <form onSubmit={questionForm.handleSubmit(handleAddQuestion)} className="space-y-4">
                <FormField
                  control={questionForm.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question Text</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the question text"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={questionForm.control}
                  name="instruction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Instructions (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Additional instructions for the question" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={questionForm.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question Type</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value);
                            // Reset options if changing question type
                            if (value === 'multiple-choice' || value === 'true-false' || value === 'matching') {
                              if (value === 'true-false') {
                                questionForm.setValue('options', [
                                  { value: 'true', label: 'True' },
                                  { value: 'false', label: 'False' },
                                  { value: 'not-given', label: 'Not Given' }
                                ]);
                              } else {
                                questionForm.setValue('options', [
                                  { value: 'A', label: '' },
                                  { value: 'B', label: '' },
                                  { value: 'C', label: '' },
                                  { value: 'D', label: '' }
                                ]);
                              }
                            }
                          }}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select question type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                            <SelectItem value="fill-in-blank">Fill in the Blank</SelectItem>
                            <SelectItem value="matching">Matching</SelectItem>
                            <SelectItem value="true-false">True/False/Not Given</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={questionForm.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select 
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={questionForm.control}
                  name="correctAnswer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correct Answer</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter the correct answer" {...field} />
                      </FormControl>
                      <FormDescription>
                        For multiple choice, enter the option value (e.g., A, B, C, D)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {questionForm.watch('type') === 'fill-in-blank' && (
                  <FormField
                    control={questionForm.control}
                    name="maxWords"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Words (Optional)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="Maximum word count" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                {/* Options for multiple choice, matching, or true/false */}
                {(questionForm.watch('type') === 'multiple-choice' || 
                  questionForm.watch('type') === 'matching') && (
                  <div>
                    <FormLabel>Options</FormLabel>
                    <div className="space-y-2 mt-2">
                      {questionForm.watch('options')?.map((option, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-10 h-8 flex items-center justify-center bg-muted rounded-md">
                            {option.value}
                          </div>
                          <Input 
                            value={option.label}
                            onChange={(e) => {
                              const newOptions = [...(questionForm.watch('options') || [])];
                              newOptions[index] = { ...newOptions[index], label: e.target.value };
                              questionForm.setValue('options', newOptions);
                            }}
                            placeholder={`Option ${option.value}`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddQuestionDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Question</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Add Passage Dialog */}
        <Dialog open={isAddPassageDialogOpen} onOpenChange={setIsAddPassageDialogOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Add New Passage</DialogTitle>
              <DialogDescription>
                Add a reading passage to this task
              </DialogDescription>
            </DialogHeader>
            
            <Form {...passageForm}>
              <form onSubmit={passageForm.handleSubmit(handleAddPassage)} className="space-y-4">
                <FormField
                  control={passageForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passage Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter passage title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passageForm.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passage Text</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter the passage text"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddPassageDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Passage</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default IeltsTaskManager;
