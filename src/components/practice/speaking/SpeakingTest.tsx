import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Mic, MicOff, Play, Pause, SkipForward, Save, CheckCircle, ArrowLeft, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { SpeakingResponse, SpeakingTask, SpeakingSubmission } from '@/types/speaking';
import { generateSpeakingQuestions, evaluateSpeakingSubmission } from '@/services/aiEvaluation';

interface SpeakingTestProps {
  task: SpeakingTask;
  onFinish: () => void;
  examType?: string;
}

export const SpeakingTest: React.FC<SpeakingTestProps> = ({ task, onFinish, examType = 'ielts' }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [recordedAudios, setRecordedAudios] = useState<Record<string, string>>({});
  const [timer, setTimer] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isPlayingBack, setIsPlayingBack] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [aiGeneratedQuestions, setAiGeneratedQuestions] = useState<string[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<any>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const timerIntervalRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  const currentQuestion = task.questions[currentQuestionIndex];
  
  useEffect(() => {
    if (!currentQuestion) return;
    
    if (currentQuestion.part === 2 && currentQuestion.preparation) {
      setIsPreparing(true);
      setTimer(currentQuestion.preparation);
      setMaxTime(currentQuestion.preparation);
    } else {
      setIsPreparing(false);
      setTimer(currentQuestion.duration || 60);
      setMaxTime(currentQuestion.duration || 60);
    }
    
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [currentQuestionIndex, currentQuestion]);
  
  useEffect(() => {
    const checkMicrophoneAccess = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (error) {
        console.error('Error accessing microphone', error);
        toast({
          title: "Microphone Access Required",
          description: "Please grant microphone access to use the speaking test.",
          variant: "destructive"
        });
      }
    };
    
    checkMicrophoneAccess();
  }, [toast]);
  
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudios(prev => ({
          ...prev,
          [currentQuestion.id]: audioUrl
        }));
        
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      startTimer();
      
      toast({
        title: "Recording Started",
        description: "Your microphone is now active.",
      });
    } catch (error) {
      console.error('Error starting recording', error);
      toast({
        title: "Recording Failed",
        description: "Could not start recording. Please check your microphone settings.",
        variant: "destructive"
      });
    }
  };
  
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      
      toast({
        title: "Recording Stopped",
        description: "Your response has been recorded.",
      });
    }
  };
  
  const startTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    timerIntervalRef.current = window.setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          if (isPreparing) {
            setIsPreparing(false);
            setTimer(currentQuestion.duration || 120);
            setMaxTime(currentQuestion.duration || 120);
            startRecording();
          } else if (isRecording) {
            stopRecording();
          }
          
          if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  const playRecording = () => {
    const audioUrl = recordedAudios[currentQuestion.id];
    if (audioUrl && audioPlayerRef.current) {
      audioPlayerRef.current.src = audioUrl;
      audioPlayerRef.current.play();
      setIsPlayingBack(true);
      
      audioPlayerRef.current.onended = () => {
        setIsPlayingBack(false);
      };
    }
  };
  
  const pausePlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingBack(false);
    }
  };
  
  const nextQuestion = () => {
    if (isRecording) {
      stopRecording();
    }
    if (isPlayingBack && audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      setIsPlayingBack(false);
    }
    
    if (currentQuestionIndex < task.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setTestCompleted(true);
    }
  };
  
  const submitTest = async () => {
    setIsSubmitting(true);
    
    try {
      const responses: SpeakingResponse[] = Object.keys(recordedAudios).map(questionId => ({
        questionId,
        audioUrl: recordedAudios[questionId],
        duration: currentQuestion.duration || 0,
        submittedAt: new Date()
      }));
      
      const submission: SpeakingSubmission = {
        id: `submission-${Date.now()}`,
        userId: 'current-user-id',
        taskId: task.id,
        responses,
        status: 'pending',
        submittedAt: new Date()
      };
      
      console.log('Submitting speaking test:', submission);
      
      setIsEvaluating(true);
      
      if (responses.length > 0) {
        const firstResponse = responses[0];
        const evaluation = await evaluateSpeakingSubmission(
          firstResponse.audioUrl,
          firstResponse.questionId
        );
        
        setAiEvaluation(evaluation);
      }
      
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);
        setIsEvaluating(false);
        
        toast({
          title: "Test Submitted Successfully",
          description: "Your speaking test has been submitted for review.",
        });
        
        console.log('Admin notification sent for new speaking submission');
      }, 1500);
    } catch (error) {
      console.error('Error submitting test', error);
      setIsSubmitting(false);
      setIsEvaluating(false);
      
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your test. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const generateAdditionalQuestions = async () => {
    if (isLoadingQuestions) return;
    
    setIsLoadingQuestions(true);
    try {
      const questions = await generateSpeakingQuestions(
        currentQuestion.category || 'general',
        currentQuestion.part
      );
      
      setAiGeneratedQuestions(questions);
      
      toast({
        title: "Questions Generated",
        description: "AI has suggested some additional questions for practice.",
      });
    } catch (error) {
      console.error('Error generating questions', error);
      toast({
        title: "Generation Failed",
        description: "Could not generate additional questions.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingQuestions(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getPart = () => {
    if (examType.toLowerCase() === 'toefl') {
      return `Task ${currentQuestion.part || 1}`;
    } else if (examType.toLowerCase() === 'pte') {
      const partMap: {[key: number]: string} = {
        1: 'Read Aloud',
        2: 'Repeat Sentence',
        3: 'Describe Image'
      };
      return partMap[currentQuestion.part || 1] || `Task ${currentQuestion.part || 1}`;
    } else if (['gre', 'gmat'].includes(examType.toLowerCase())) {
      return currentQuestion.part === 1 ? 'Analysis of an Issue' : 'Analysis of an Argument';
    }
    
    return `Part ${currentQuestion.part}`;
  };
  
  const getPartDescription = () => {
    if (examType.toLowerCase() === 'toefl') {
      const descMap: {[key: number]: string} = {
        1: 'Independent Speaking Task',
        2: 'Integrated Reading/Listening Task',
        3: 'Integrated Listening Task',
        4: 'Integrated Listening/Speaking Task'
      };
      return descMap[currentQuestion.part || 1] || '';
    } else if (examType.toLowerCase() === 'pte') {
      return '';  // PTE part names are self-descriptive
    } else if (['gre', 'gmat'].includes(examType.toLowerCase())) {
      return '';  // GRE/GMAT part names are self-descriptive
    }
    
    switch (currentQuestion.part) {
      case 1:
        return "Introduction and Interview";
      case 2:
        return "Individual Long Turn";
      case 3:
        return "Two-way Discussion";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      {!testCompleted ? (
        <>
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded text-sm font-medium">
                    {getPart()}{getPartDescription() ? ` - ${getPartDescription()}` : ''}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Question {currentQuestionIndex + 1} of {task.questions.length}
                  </span>
                </div>
              </div>
              
              <div className="mt-4 mb-6">
                <div className="text-lg font-medium mb-2">
                  {isPreparing ? 'Preparation Time' : 'Question'}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md whitespace-pre-line">
                  {currentQuestion.text}
                </div>
                
                {currentQuestion.notes && (
                  <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 italic">
                    {currentQuestion.notes}
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {isPreparing ? 'Preparation Time Remaining' : 'Speaking Time Remaining'}:
                  </div>
                  <div className={cn(
                    "font-mono text-lg",
                    timer < 10 && !isPreparing ? "text-red-500 dark:text-red-400" : ""
                  )}>
                    {formatTime(timer)}
                  </div>
                </div>
                
                <Progress value={(timer / maxTime) * 100} className="h-2" />
              </div>
            </CardContent>
            
            <CardFooter className="p-4 border-t bg-gray-50 dark:bg-gray-800">
              <div className="w-full flex items-center justify-between">
                <div className="space-x-2">
                  {isPreparing ? (
                    <Button 
                      onClick={() => {
                        setIsPreparing(false);
                        setTimer(currentQuestion.duration || 120);
                        setMaxTime(currentQuestion.duration || 120);
                        if (timerIntervalRef.current) {
                          clearInterval(timerIntervalRef.current);
                        }
                        startRecording();
                      }}
                    >
                      Skip Preparation
                    </Button>
                  ) : !isRecording && !recordedAudios[currentQuestion.id] ? (
                    <Button 
                      onClick={startRecording}
                      className="bg-indigo hover:bg-indigo-600"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Start Recording
                    </Button>
                  ) : isRecording ? (
                    <Button 
                      onClick={stopRecording}
                      variant="destructive"
                    >
                      <MicOff className="h-4 w-4 mr-2" />
                      Stop Recording
                    </Button>
                  ) : (
                    <div className="space-x-2">
                      <Button 
                        onClick={isPlayingBack ? pausePlayback : playRecording}
                        variant="outline"
                      >
                        {isPlayingBack ? (
                          <React.Fragment><Pause className="h-4 w-4 mr-2" /> Pause</React.Fragment>
                        ) : (
                          <React.Fragment><Play className="h-4 w-4 mr-2" /> Play Recording</React.Fragment>
                        )}
                      </Button>
                      
                      <Button 
                        onClick={startRecording}
                        variant="outline"
                      >
                        <Mic className="h-4 w-4 mr-2" />
                        Record Again
                      </Button>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={nextQuestion}
                  disabled={isPreparing && !currentQuestion.followUp}
                >
                  {currentQuestionIndex < task.questions.length - 1 ? (
                    <React.Fragment><SkipForward className="h-4 w-4 mr-2" /> Next Question</React.Fragment>
                  ) : (
                    "Finish Test"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <audio ref={audioPlayerRef} className="hidden" />
          
          {currentQuestion.followUp && (
            <Card>
              <CardContent className="p-4">
                <h3 className="font-medium mb-2">Possible Follow-up Questions:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {currentQuestion.followUp.map((question, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {question}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {aiGeneratedQuestions.length > 0 && (
            <Card className="bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800">
              <CardContent className="p-4">
                <h3 className="font-medium mb-2 flex items-center">
                  <span className="mr-2">AI Suggested Questions</span>
                  <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded text-xs">AI Generated</span>
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {aiGeneratedQuestions.map((question, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">
                      {question}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={generateAdditionalQuestions}
            disabled={isLoadingQuestions}
          >
            <HelpCircle className="h-4 w-4" />
            {isLoadingQuestions ? 'Generating Questions...' : 'Generate More Practice Questions with AI'}
          </Button>
        </>
      ) : (
        <Card className="mt-8 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6">
            <h3 className="text-xl font-medium text-green-800 dark:text-green-300 mb-2">
              {examType.toUpperCase()} Speaking Test Completed!
            </h3>
            <p className="text-green-700 dark:text-green-400 mb-4">
              You have completed all speaking questions. You can now review your recordings and submit your test.
            </p>
            
            <div className="space-y-4 mt-6">
              <h4 className="font-medium">Your Recordings</h4>
              {Object.keys(recordedAudios).length > 0 ? (
                <div className="space-y-4">
                  {task.questions.map((question, index) => (
                    recordedAudios[question.id] && (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-md">
                        <div className="mb-2 font-medium">Question {index + 1}</div>
                        <audio 
                          src={recordedAudios[question.id]} 
                          controls 
                          className="w-full"
                        />
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No recordings available.</p>
              )}
            </div>
            
            {isSubmitted && aiEvaluation && (
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-lg mb-3">AI Preliminary Evaluation</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium mb-2">Overall Score</h5>
                    <div className="text-3xl font-bold text-indigo-600">{aiEvaluation.score}</div>
                    <p className="text-sm text-gray-500 mt-1">
                      This is a preliminary score. An admin will review your submission for the final score.
                    </p>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Breakdown</h5>
                    <div className="space-y-2">
                      {aiEvaluation.details && Object.entries(aiEvaluation.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="capitalize">{key}</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h5 className="font-medium mb-2">Feedback</h5>
                  <p className="text-gray-700 dark:text-gray-300">{aiEvaluation.feedback}</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-3">
              {!isSubmitted ? (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setTestCompleted(false);
                      setCurrentQuestionIndex(0);
                    }}
                    disabled={isSubmitting || isEvaluating}
                  >
                    Retake Test
                  </Button>
                  
                  <Button 
                    onClick={submitTest}
                    disabled={isSubmitting || isEvaluating || Object.keys(recordedAudios).length === 0}
                    className="bg-green-600 hover:bg-green-700 gap-2"
                  >
                    {isSubmitting || isEvaluating ? (
                      <>
                        <span className="animate-spin">↻</span>
                        {isEvaluating ? 'AI Evaluating...' : 'Submitting...'}
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Submit Recordings
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="w-full">
                  <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-md text-center mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                    <h4 className="text-lg font-medium text-green-700 dark:text-green-300">Test Submitted Successfully</h4>
                    <p className="text-green-600 dark:text-green-400 mt-1">
                      Your recordings have been submitted for review. You will be notified when feedback is available.
                    </p>
                  </div>
                  
                  <Button 
                    onClick={onFinish}
                    className="w-full"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Categories
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
