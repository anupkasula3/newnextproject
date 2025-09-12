
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Question } from '@/types/listening';

interface ListeningQuestionsProps {
  questions: Question[];
  userAnswers: Record<string, string>;
  onAnswerChange: (questionId: string, answer: string) => void;
}

export const ListeningQuestions: React.FC<ListeningQuestionsProps> = ({
  questions,
  userAnswers,
  onAnswerChange,
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          {questions.map((question) => (
            <div key={question.id} className="space-y-3">
              <div className="flex items-start">
                <span className="font-medium mr-2">{question.number}.</span>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {question.text}
                  </p>
                  {question.instruction && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 italic mt-1">
                      {question.instruction}
                    </p>
                  )}
                </div>
              </div>
              
              {question.type === 'multiple-choice' && question.options && (
                <div className="ml-6 space-y-2">
                  {question.options.map((option) => (
                    <label 
                      key={option.value} 
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option.value}
                        checked={userAnswers[question.id] === option.value}
                        onChange={() => onAnswerChange(question.id, option.value)}
                        className="h-4 w-4 text-indigo border-gray-300 focus:ring-indigo"
                      />
                      <span className="text-gray-700 dark:text-gray-300">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              
              {question.type === 'fill-in-blank' && (
                <div className="ml-6">
                  <input
                    type="text"
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo focus:border-indigo"
                  />
                  {question.maxWords && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      Maximum {question.maxWords} word{question.maxWords !== 1 ? 's' : ''}
                    </p>
                  )}
                </div>
              )}
              
              {question.type === 'matching' && question.options && (
                <div className="ml-6">
                  <select
                    value={userAnswers[question.id] || ''}
                    onChange={(e) => onAnswerChange(question.id, e.target.value)}
                    className="w-full max-w-md px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo focus:border-indigo"
                  >
                    <option value="">Select an option</option>
                    {question.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
