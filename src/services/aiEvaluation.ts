
export interface AIFeedback {
  score: number;
  feedback: string;
  suggestions: string[];
  improvedVersion?: string;
}

export interface SectionScore {
  score: number;
  feedback: string;
  details?: any;
}

export interface OverallScore {
  listening?: SectionScore;
  reading?: SectionScore;
  writing?: SectionScore;
  speaking?: SectionScore;
  overall: number;
}

// This would be a real AI API call in production
export const evaluateWritingSubmission = async (
  prompt: string,
  submission: string,
  minWords: number
): Promise<AIFeedback> => {
  console.log('Evaluating writing submission:', { prompt, submission, minWords });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock AI evaluation
  const wordCount = submission.split(/\s+/).filter(Boolean).length;
  let baseScore = 6.5; // Base IELTS score
  
  // Adjust score based on word count
  if (wordCount < minWords) {
    baseScore -= (minWords - wordCount) / minWords * 2;
  } else if (wordCount > minWords * 1.5) {
    baseScore += 0.5;
  }
  
  // Simulate different feedback based on some characteristics of the text
  let feedback = "Your response demonstrates a good understanding of the topic.";
  const suggestions = [];
  
  if (submission.split('.').length < 5) {
    feedback += " Consider developing your ideas further with more detailed examples.";
    suggestions.push("Add more complex sentence structures");
    baseScore -= 0.5;
  }
  
  if (!/however|nevertheless|although|despite|while|whereas|in contrast|on the other hand/i.test(submission)) {
    suggestions.push("Include more linking words to show contrast and comparison");
    baseScore -= 0.3;
  }
  
  if (wordCount > 0 && wordCount < minWords * 0.7) {
    feedback += " Your response is significantly under the minimum word count, which impacts your score.";
    suggestions.push(`Aim for at least ${minWords} words`);
  }
  
  // Cap score within IELTS range (0-9)
  const finalScore = Math.max(0, Math.min(9, Math.round(baseScore * 2) / 2));
  
  return {
    score: finalScore,
    feedback,
    suggestions,
    improvedVersion: submission.length > 50 ? 
      `An improved version might begin with: "${submission.substring(0, 50)}..." and develop key points more thoroughly using examples.` : 
      undefined
  };
};

// Generate speaking questions based on a category
export const generateSpeakingQuestions = async (
  category: string,
  part: 1 | 2 | 3
): Promise<string[]> => {
  console.log('Generating speaking questions for:', { category, part });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock questions based on category and part
  const questionsByCategory: Record<string, Record<number, string[]>> = {
    'family': {
      1: [
        "Do you come from a large family?",
        "How much time do you spend with your family?",
        "Who are you closest to in your family?"
      ],
      2: [
        "Describe a family tradition that is important to you.",
        "Talk about a memorable family gathering you attended.",
        "Describe a family member who has influenced you greatly."
      ],
      3: [
        "How has family structure changed in your country over the past few decades?",
        "Do you think family is as important to young people today as it was in the past?",
        "What challenges do modern families face in your country?"
      ]
    },
    'work': {
      1: [
        "What kind of work do you do?",
        "Do you enjoy your job? Why or why not?",
        "What would be your ideal job?"
      ],
      2: [
        "Describe a workplace you have enjoyed working in.",
        "Talk about a skill that is important in your job.",
        "Describe a challenging task you had to complete at work."
      ],
      3: [
        "How has technology changed the way people work in your country?",
        "Do you think people will work more from home in the future?",
        "What are the most important qualities employers look for in your country?"
      ]
    },
    'education': {
      1: [
        "What are you studying currently?",
        "Did you enjoy your time at school?",
        "What subject was your favorite at school?"
      ],
      2: [
        "Describe a teacher who influenced you.",
        "Talk about your experience of learning a new skill.",
        "Describe a memorable day at school or university."
      ],
      3: [
        "How has education changed in your country over the last few decades?",
        "Do you think online learning is as effective as traditional classroom learning?",
        "What changes would you like to see in the education system in your country?"
      ]
    }
  };
  
  // Default questions if category is not found
  const defaultQuestions = [
    "Tell me about yourself.",
    "What do you enjoy doing in your free time?",
    "Describe a skill you would like to learn."
  ];
  
  return questionsByCategory[category]?.[part] || defaultQuestions;
};

// Generate reading questions based on a category/topic
export const generateReadingQuestions = async (
  topic: string
): Promise<string[]> => {
  console.log('Generating reading questions for:', topic);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Mock questions based on topic
  const questionsByTopic: Record<string, string[]> = {
    'environment': [
      "What are the main causes of climate change according to the passage?",
      "How might rising sea levels affect coastal communities?",
      "What solutions does the author propose to address environmental challenges?"
    ],
    'technology': [
      "How has artificial intelligence changed the workplace according to the text?",
      "What ethical concerns does the passage raise about new technologies?",
      "What future developments in technology does the author predict?"
    ],
    'health': [
      "What factors contribute to a healthy lifestyle according to the passage?",
      "How does the author compare traditional and modern medicine?",
      "What recommendations does the text make for improving public health?"
    ],
    'education': [
      "What challenges in modern education does the passage identify?",
      "How does the author compare educational systems in different countries?",
      "What reforms to education does the passage suggest?"
    ]
  };
  
  // Default questions if topic is not found
  const defaultQuestions = [
    "What is the main idea of the passage?",
    "What evidence does the author provide to support their argument?",
    "How would you summarize the key points of the text?"
  ];
  
  return questionsByTopic[topic.toLowerCase()] || defaultQuestions;
};

// Generate listening questions based on audio content
export const generateListeningQuestions = async (
  contentType: string
): Promise<string[]> => {
  console.log('Generating listening questions for:', contentType);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1100));
  
  // Mock questions based on content type
  const questionsByContentType: Record<string, string[]> = {
    'conversation': [
      "What is the relationship between the speakers?",
      "What problem are the speakers trying to solve?",
      "What solution do they agree on?"
    ],
    'lecture': [
      "What is the main topic of the lecture?",
      "What examples does the speaker use to illustrate key points?",
      "What conclusion does the lecturer reach?"
    ],
    'interview': [
      "What is the purpose of the interview?",
      "What qualifications does the interviewee mention?",
      "What future plans does the interviewee discuss?"
    ],
    'news': [
      "What is the main news story being reported?",
      "What details support the main story?",
      "What different perspectives are presented in the report?"
    ]
  };
  
  // Default questions if content type is not found
  const defaultQuestions = [
    "What is the main topic of the audio?",
    "Who are the main speakers and what roles do they play?",
    "What key information is presented in the recording?"
  ];
  
  return questionsByContentType[contentType.toLowerCase()] || defaultQuestions;
};

// Evaluate speaking submission
export const evaluateSpeakingSubmission = async (
  audioUrl: string,
  questionId: string
): Promise<SectionScore> => {
  console.log('Evaluating speaking submission:', { audioUrl, questionId });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Mock speaking evaluation
  // In a real application, this would send the audio to an AI for transcription and evaluation
  const randomScore = 5 + Math.random() * 4;
  const finalScore = Math.round(randomScore * 2) / 2;
  
  return {
    score: finalScore,
    feedback: "Your speaking demonstrates good fluency and pronunciation. Consider using more complex vocabulary and developing your responses with more detailed examples.",
    details: {
      fluency: Math.round((finalScore + 0.5) * 2) / 2,
      pronunciation: Math.round((finalScore - 0.5) * 2) / 2,
      vocabulary: Math.round(finalScore * 2) / 2,
      grammar: Math.round((finalScore - 0.3) * 2) / 2
    }
  };
};

// Evaluate reading submission
export const evaluateReadingSubmission = async (
  answers: Record<string, string>,
  correctAnswers: Record<string, string>
): Promise<SectionScore> => {
  console.log('Evaluating reading submission:', { answers, correctAnswers });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1800));
  
  // Calculate score based on correct answers
  let correctCount = 0;
  const totalQuestions = Object.keys(correctAnswers).length;
  
  for (const [id, answer] of Object.entries(answers)) {
    if (correctAnswers[id] && answer.toLowerCase().trim() === correctAnswers[id].toLowerCase().trim()) {
      correctCount++;
    }
  }
  
  // Convert to IELTS band score (0-9)
  const percentageCorrect = correctCount / totalQuestions;
  let bandScore = Math.min(9, Math.max(0, Math.round((percentageCorrect * 9) * 2) / 2));
  
  // Adjust for very low scores to match IELTS bands
  if (percentageCorrect > 0 && bandScore < 1) {
    bandScore = 1;
  }
  
  return {
    score: bandScore,
    feedback: `You answered ${correctCount} out of ${totalQuestions} questions correctly. ${
      bandScore >= 7 
        ? "Excellent work! You demonstrated a strong understanding of the text."
        : bandScore >= 5 
          ? "Good effort. Work on improving your detailed comprehension of texts."
          : "You need to focus on improving your reading comprehension skills."
    }`,
    details: {
      correctAnswers: correctCount,
      totalQuestions,
      percentageCorrect: Math.round(percentageCorrect * 100)
    }
  };
};

// Evaluate listening submission
export const evaluateListeningSubmission = async (
  answers: Record<string, string>,
  correctAnswers: Record<string, string>
): Promise<SectionScore> => {
  console.log('Evaluating listening submission:', { answers, correctAnswers });
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1700));
  
  // Calculate score based on correct answers
  let correctCount = 0;
  const totalQuestions = Object.keys(correctAnswers).length;
  
  for (const [id, answer] of Object.entries(answers)) {
    if (correctAnswers[id] && answer.toLowerCase().trim() === correctAnswers[id].toLowerCase().trim()) {
      correctCount++;
    }
  }
  
  // Convert to IELTS band score (0-9)
  const percentageCorrect = correctCount / totalQuestions;
  let bandScore = Math.min(9, Math.max(0, Math.round((percentageCorrect * 9) * 2) / 2));
  
  return {
    score: bandScore,
    feedback: `You answered ${correctCount} out of ${totalQuestions} questions correctly. ${
      bandScore >= 7 
        ? "Excellent! You demonstrated strong listening comprehension skills."
        : bandScore >= 5 
          ? "Good effort. Continue practicing to improve your listening skills."
          : "You need to focus on developing your listening comprehension skills."
    }`,
    details: {
      correctAnswers: correctCount,
      totalQuestions,
      percentageCorrect: Math.round(percentageCorrect * 100)
    }
  };
};

// Calculate overall score from section scores
export const calculateOverallScore = (scores: OverallScore): number => {
  const validScores = [];
  
  if (scores.listening) validScores.push(scores.listening.score);
  if (scores.reading) validScores.push(scores.reading.score);
  if (scores.writing) validScores.push(scores.writing.score);
  if (scores.speaking) validScores.push(scores.speaking.score);
  
  if (validScores.length === 0) return 0;
  
  const sum = validScores.reduce((acc, score) => acc + score, 0);
  return Math.round((sum / validScores.length) * 2) / 2;
};
