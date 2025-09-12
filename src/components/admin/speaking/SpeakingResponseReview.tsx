
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CustomProgress } from '@/components/ui/custom-progress';
import { Slider } from '@/components/ui/slider';
import { getSpeakingSubmissions } from '@/services/userProgressService';
import { useToast } from '@/hooks/use-toast';

interface SpeakingReviewProps {
  submissionId?: string;
}

const SpeakingResponseReview: React.FC<SpeakingReviewProps> = ({ submissionId }) => {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [currentSubmission, setCurrentSubmission] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [scores, setScores] = useState({
    fluency: 5,
    vocabulary: 5,
    grammar: 5,
    pronunciation: 5
  });
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const data = await getSpeakingSubmissions();
        setSubmissions(data);
        
        if (submissionId) {
          const selected = data.find(sub => sub.id === submissionId);
          if (selected) setCurrentSubmission(selected);
          else if (data.length > 0) setCurrentSubmission(data[0]);
        } else if (data.length > 0) {
          setCurrentSubmission(data[0]);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching speaking submissions:", error);
        setLoading(false);
      }
    }
    
    fetchSubmissions();
  }, [submissionId]);

  const handleScoreChange = (type: keyof typeof scores, value: number[]) => {
    setScores(prev => ({
      ...prev,
      [type]: value[0]
    }));
  };

  const handleSubmitReview = () => {
    // In a real app, this would save to backend
    toast({
      title: "Review submitted",
      description: "The speaking response has been reviewed and scored.",
    });
    
    // Mark as reviewed in our local state
    if (currentSubmission) {
      const updatedSubmission = { ...currentSubmission, reviewed: true };
      setSubmissions(prev => 
        prev.map(sub => sub.id === currentSubmission.id ? updatedSubmission : sub)
      );
      setCurrentSubmission(updatedSubmission);
    }
  };

  const calculateOverallScore = () => {
    const sum = Object.values(scores).reduce((acc, score) => acc + score, 0);
    return (sum / Object.keys(scores).length).toFixed(1);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-64">
            <p>Loading submissions...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!currentSubmission) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center items-center h-64">
            <p>No speaking submissions found.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>Student speaking submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {submissions.length === 0 ? (
              <p className="text-sm text-muted-foreground">No submissions available</p>
            ) : (
              submissions.map((sub, index) => (
                <Button 
                  key={index}
                  variant={currentSubmission.id === sub.id ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => setCurrentSubmission(sub)}
                >
                  <div className="flex justify-between w-full items-center">
                    <span className="truncate">Student {sub.userId.substring(0, 8)}</span>
                    {sub.reviewed ? (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-800 rounded-full">Reviewed</span>
                    ) : (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">Pending</span>
                    )}
                  </div>
                </Button>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Speaking Response Review</CardTitle>
          <CardDescription>
            Review and score this speaking response
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Question</h3>
            <p className="text-sm p-3 bg-muted rounded-md">
              {currentSubmission.question || "Describe a time when you had to learn something quickly. What was it and why did you need to learn it fast?"}
            </p>
          </div>

          <div>
            <h3 className="font-medium mb-2">Student Response</h3>
            <div className="border rounded-md p-3 bg-muted/50">
              <audio 
                src={currentSubmission.responseAudio} 
                controls 
                className="w-full mb-3"
              />
              <p className="text-sm">
                {currentSubmission.responseText}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <h3 className="font-medium mb-4">Scoring</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Fluency & Coherence</label>
                  <span className="text-sm">{scores.fluency}/9</span>
                </div>
                <Slider 
                  value={[scores.fluency]} 
                  min={0} 
                  max={9} 
                  step={0.5}
                  onValueChange={(value) => handleScoreChange('fluency', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Lexical Resource (Vocabulary)</label>
                  <span className="text-sm">{scores.vocabulary}/9</span>
                </div>
                <Slider 
                  value={[scores.vocabulary]} 
                  min={0} 
                  max={9} 
                  step={0.5}
                  onValueChange={(value) => handleScoreChange('vocabulary', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Grammatical Range & Accuracy</label>
                  <span className="text-sm">{scores.grammar}/9</span>
                </div>
                <Slider 
                  value={[scores.grammar]} 
                  min={0} 
                  max={9} 
                  step={0.5}
                  onValueChange={(value) => handleScoreChange('grammar', value)} 
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Pronunciation</label>
                  <span className="text-sm">{scores.pronunciation}/9</span>
                </div>
                <Slider 
                  value={[scores.pronunciation]} 
                  min={0} 
                  max={9} 
                  step={0.5}
                  onValueChange={(value) => handleScoreChange('pronunciation', value)} 
                />
              </div>
            </div>
            
            <div className="mt-6 p-4 border rounded-md bg-muted/50">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Overall Band Score</h4>
                <span className="text-xl font-bold">{calculateOverallScore()}</span>
              </div>
              <CustomProgress 
                value={Number(calculateOverallScore()) / 9 * 100} 
                className="h-2.5" 
                indicatorClassName="bg-indigo-600"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <label className="text-sm font-medium">Feedback for Student</label>
            <Textarea 
              placeholder="Provide detailed feedback on the student's performance..." 
              className="mt-2 min-h-[120px]"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 border-t pt-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleSubmitReview} disabled={currentSubmission.reviewed}>
            {currentSubmission.reviewed ? "Already Reviewed" : "Submit Review"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpeakingResponseReview;
