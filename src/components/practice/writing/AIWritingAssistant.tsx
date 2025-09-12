
import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

interface AIWritingAssistantProps {
  essayText: string;
  prompt: string;
  onFeedbackReceived: (feedback: string[]) => void;
}

export const AIWritingAssistant: React.FC<AIWritingAssistantProps> = ({ 
  essayText, 
  prompt, 
  onFeedbackReceived 
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const getAIFeedback = async () => {
    if (!essayText || essayText.trim() === '') {
      toast({
        title: "Error",
        description: "Please write your essay before requesting AI feedback.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content: "You are a helpful GRE analytical writing evaluator. Analyze essays and provide constructive feedback focusing on: argument structure, evidence usage, logical flow, and language clarity. Be specific and actionable in your suggestions."
            },
            {
              role: "user",
              content: `Please evaluate this GRE analytical writing essay for the following prompt: "${prompt}"\n\nEssay: ${essayText}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const feedback = data.choices[0].message.content;
        // Split the feedback into an array of paragraphs for better display
        const feedbackArray = feedback.split('\n').filter(line => line.trim() !== '');
        onFeedbackReceived(feedbackArray);
        
        toast({
          title: "AI Feedback Ready",
          description: "Your essay has been analyzed. View the detailed feedback below.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI feedback. Please try again later.",
        variant: "destructive",
      });
      console.error("AI feedback error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={getAIFeedback} 
      disabled={loading}
      variant="outline" 
      className="gap-2 mt-4"
    >
      {loading ? "Getting AI Feedback..." : "Get AI Feedback"}
    </Button>
  );
};
