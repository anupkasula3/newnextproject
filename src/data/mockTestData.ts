import { MockTest } from '../types/mockTest';

export const mockTestData: MockTest = {
  id: 'mock-test-1',
  title: 'IELTS Academic Mock Test',
  description: 'Complete IELTS Academic mock test simulating the real exam experience',
  totalDuration: 170, // 2h 50m
  sections: [
    {
      id: 'listening-section',
      title: 'Listening Test',
      type: 'listening',
      description: 'Listen to four recordings and answer questions based on what you hear',
      duration: 30,
      questions: [
        {
          id: 'l-q1',
          text: 'What is the woman\'s student ID number?',
          type: 'fill-in-blank',
          correctAnswer: '7856321'
        },
        {
          id: 'l-q2',
          text: 'Which course is the woman interested in?',
          type: 'multiple-choice',
          options: [
            { id: 'l-q2-a', text: 'Business Administration' },
            { id: 'l-q2-b', text: 'International Relations' },
            { id: 'l-q2-c', text: 'Computer Science' }
          ],
          correctAnswer: 'l-q2-c'
        },
        {
          id: 'l-q3',
          text: 'When is the library open on weekends?',
          type: 'multiple-choice',
          options: [
            { id: 'l-q3-a', text: '9am - 5pm' },
            { id: 'l-q3-b', text: '10am - 4pm' },
            { id: 'l-q3-c', text: '11am - 3pm' }
          ],
          correctAnswer: 'l-q3-b'
        }
      ]
    },
    {
      id: 'reading-section',
      title: 'Reading Test',
      type: 'reading',
      description: 'Read three passages and answer questions to demonstrate your comprehension',
      duration: 60,
      questions: [
        {
          id: 'r-q1',
          text: 'According to the passage, what is the main cause of deforestation in the Amazon?',
          type: 'multiple-choice',
          options: [
            { id: 'r-q1-a', text: 'Climate change' },
            { id: 'r-q1-b', text: 'Agricultural expansion' },
            { id: 'r-q1-c', text: 'Urban development' }
          ],
          correctAnswer: 'r-q1-b'
        },
        {
          id: 'r-q2',
          text: 'The author suggests that coral reefs are:',
          type: 'multiple-choice',
          options: [
            { id: 'r-q2-a', text: 'Resilient to all environmental changes' },
            { id: 'r-q2-b', text: 'Threatened by multiple factors' },
            { id: 'r-q2-c', text: 'Only important for tourism' }
          ],
          correctAnswer: 'r-q2-b'
        },
        {
          id: 'r-q3',
          text: 'Complete the summary using words from the passage: The researcher concluded that the experiment was ____.',
          type: 'fill-in-blank',
          correctAnswer: 'inconclusive'
        }
      ]
    },
    {
      id: 'writing-section',
      title: 'Writing Test',
      type: 'writing',
      description: 'Complete two writing tasks to demonstrate your writing skills',
      duration: 60,
      questions: [
        {
          id: 'w-q1',
          text: 'The graph below shows the percentage of households with internet access in three different countries between 2000 and 2020. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
          type: 'essay',
          maxWords: 150
        },
        {
          id: 'w-q2',
          text: 'Some people believe that universities should focus more on academic subjects, while others think they should prepare students for their future careers. Discuss both views and give your opinion.',
          type: 'essay',
          maxWords: 250
        }
      ]
    },
    {
      id: 'speaking-section',
      title: 'Speaking Test',
      type: 'speaking',
      description: 'Complete a face-to-face interview with three parts',
      duration: 14,
      questions: [
        {
          id: 's-q1',
          text: 'Let\'s talk about your hometown. What do you like most about living there?',
          type: 'speaking-prompt'
        },
        {
          id: 's-q2',
          text: 'Describe a time when you helped someone. You should say: who you helped, how you helped them, why they needed help, and explain how you felt about helping them.',
          type: 'speaking-prompt'
        },
        {
          id: 's-q3',
          text: 'Do you think people help each other more or less than they did in the past? Why do you think this is?',
          type: 'speaking-prompt'
        }
      ]
    },
    {
      id: 'sat-math-section',
      title: 'SAT Math Test',
      type: 'reading', // Using reading type for SAT Math to render in the current UI
      description: 'Solve a variety of math problems testing your knowledge of algebra, problem solving, and advanced mathematics',
      duration: 80,
      questions: [
        {
          id: 'sat-m-q1',
          text: 'If 3x + 5y = 15 and 2x - 3y = -13, what is the value of x?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q1-a', text: '0' },
            { id: 'sat-m-q1-b', text: '1' },
            { id: 'sat-m-q1-c', text: '2' },
            { id: 'sat-m-q1-d', text: '3' }
          ],
          correctAnswer: 'sat-m-q1-a'
        },
        {
          id: 'sat-m-q2',
          text: 'A rectangular garden has a length that is 4 feet more than its width. If 26 feet of fencing is needed to enclose the garden, what is the width of the garden in feet?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q2-a', text: '3.5' },
            { id: 'sat-m-q2-b', text: '4.5' },
            { id: 'sat-m-q2-c', text: '5.5' },
            { id: 'sat-m-q2-d', text: '6.5' }
          ],
          correctAnswer: 'sat-m-q2-b'
        },
        {
          id: 'sat-m-q3',
          text: 'What is the solution to the equation 2x² - 5x - 3 = 0?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q3-a', text: 'x = -3 or x = 0.5' },
            { id: 'sat-m-q3-b', text: 'x = 3 or x = -0.5' },
            { id: 'sat-m-q3-c', text: 'x = -1 or x = 3' },
            { id: 'sat-m-q3-d', text: 'x = 1 or x = -3' }
          ],
          correctAnswer: 'sat-m-q3-b'
        },
        {
          id: 'sat-m-q4',
          text: 'In the xy-plane, the point (3, 4) lies on the graph of the function f. If f(x) = ax² + b, where a and b are constants, and f(0) = 5, what is the value of a?',
          type: 'fill-in-blank',
          correctAnswer: '-1/3'
        },
        {
          id: 'sat-m-q5',
          text: 'If sin(x) = 0.6 and x is in the first quadrant, what is the value of cos(x)?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q5-a', text: '0.8' },
            { id: 'sat-m-q5-b', text: '0.6' },
            { id: 'sat-m-q5-c', text: '0.5' },
            { id: 'sat-m-q5-d', text: '0.4' }
          ],
          correctAnswer: 'sat-m-q5-a'
        },
        {
          id: 'sat-m-q6',
          text: 'A line passes through the points (2, 3) and (4, 7). What is the equation of this line in slope-intercept form?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q6-a', text: 'y = 2x - 1' },
            { id: 'sat-m-q6-b', text: 'y = 2x + 1' },
            { id: 'sat-m-q6-c', text: 'y = 2x - 2' },
            { id: 'sat-m-q6-d', text: 'y = 2x' }
          ],
          correctAnswer: 'sat-m-q6-a'
        },
        {
          id: 'sat-m-q7',
          text: 'A factory produces widgets at a rate of 12 per hour. How many widgets will be produced in 7.5 hours?',
          type: 'fill-in-blank',
          correctAnswer: '90'
        },
        {
          id: 'sat-m-q8',
          text: 'The expression (2x³ - 3x² + 4x - 1) - (x³ + 2x² - 5x + 3) can be simplified to:',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q8-a', text: 'x³ - 5x² + 9x - 4' },
            { id: 'sat-m-q8-b', text: 'x³ - 5x² - 9x - 4' },
            { id: 'sat-m-q8-c', text: '3x³ - 5x² - x - 4' },
            { id: 'sat-m-q8-d', text: '3x³ - 5x² + 9x - 4' }
          ],
          correctAnswer: 'sat-m-q8-a'
        },
        {
          id: 'sat-m-q9',
          text: 'What is the area of a circle with diameter 8 units?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-m-q9-a', text: '16π square units' },
            { id: 'sat-m-q9-b', text: '4π square units' },
            { id: 'sat-m-q9-c', text: '64π square units' },
            { id: 'sat-m-q9-d', text: '8π square units' }
          ],
          correctAnswer: 'sat-m-q9-a'
        },
        {
          id: 'sat-m-q10',
          text: 'If a vehicle travels 240 miles in 4 hours, what is its average speed in miles per hour?',
          type: 'fill-in-blank',
          correctAnswer: '60'
        }
      ]
    },
    {
      id: 'sat-english-section',
      title: 'SAT English Test',
      type: 'writing', // Using writing type for SAT English to render in the current UI
      description: 'Assess your reading comprehension, grammar, vocabulary, and writing skills',
      duration: 65,
      questions: [
        {
          id: 'sat-e-q1',
          text: 'Read the following passage and answer: The author\'s tone in the second paragraph can best be described as:',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q1-a', text: 'Critical' },
            { id: 'sat-e-q1-b', text: 'Nostalgic' },
            { id: 'sat-e-q1-c', text: 'Objective' },
            { id: 'sat-e-q1-d', text: 'Enthusiastic' }
          ],
          correctAnswer: 'sat-e-q1-c'
        },
        {
          id: 'sat-e-q2',
          text: 'Choose the option that best corrects the underlined portion: "The committee, frustrated by the lack of progress, have decided to extend the deadline."',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q2-a', text: 'have decided' },
            { id: 'sat-e-q2-b', text: 'has decided' },
            { id: 'sat-e-q2-c', text: 'had decided' },
            { id: 'sat-e-q2-d', text: 'having decided' }
          ],
          correctAnswer: 'sat-e-q2-b'
        },
        {
          id: 'sat-e-q3',
          text: 'Which choice most effectively combines the following sentences? "Marie Curie discovered radium. She was awarded two Nobel Prizes for her work."',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q3-a', text: 'Marie Curie, she discovered radium and was awarded two Nobel Prizes for her work.' },
            { id: 'sat-e-q3-b', text: 'Marie Curie discovered radium, but she was awarded two Nobel Prizes for her work.' },
            { id: 'sat-e-q3-c', text: 'Marie Curie discovered radium and was awarded two Nobel Prizes for her work.' },
            { id: 'sat-e-q3-d', text: 'Marie Curie discovering radium, was awarded two Nobel Prizes for her work.' }
          ],
          correctAnswer: 'sat-e-q3-c'
        },
        {
          id: 'sat-e-q4',
          text: 'Based on the passage, what can be inferred about the author\'s attitude toward traditional farming methods?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q4-a', text: 'They are obsolete and should be abandoned.' },
            { id: 'sat-e-q4-b', text: 'They are valuable but need to be supplemented with modern techniques.' },
            { id: 'sat-e-q4-c', text: 'They are superior to modern industrial farming methods.' },
            { id: 'sat-e-q4-d', text: 'They are only appropriate in developing countries.' }
          ],
          correctAnswer: 'sat-e-q4-b'
        },
        {
          id: 'sat-e-q5',
          text: 'Which choice provides the most relevant information to support the main argument of the passage?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q5-a', text: 'A statistic showing the decline in literacy rates over the past decade.' },
            { id: 'sat-e-q5-b', text: 'An anecdote about a successful community literacy program.' },
            { id: 'sat-e-q5-c', text: 'A quote from a professor discussing educational theory.' },
            { id: 'sat-e-q5-d', text: 'A description of the author\'s personal educational background.' }
          ],
          correctAnswer: 'sat-e-q5-a'
        },
        {
          id: 'sat-e-q6',
          text: 'Write a short essay analyzing how the author builds an argument to persuade their audience. Your essay should examine the author\'s use of evidence, reasoning, and stylistic elements.',
          type: 'essay',
          maxWords: 200
        },
        {
          id: 'sat-e-q7',
          text: 'The word "elucidate" as used in line 34 of the passage most nearly means:',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q7-a', text: 'Confuse' },
            { id: 'sat-e-q7-b', text: 'Explain' },
            { id: 'sat-e-q7-c', text: 'Debate' },
            { id: 'sat-e-q7-d', text: 'Contradict' }
          ],
          correctAnswer: 'sat-e-q7-b'
        },
        {
          id: 'sat-e-q8',
          text: 'Which sentence should be removed to improve the cohesion of the third paragraph?',
          type: 'multiple-choice',
          options: [
            { id: 'sat-e-q8-a', text: 'Sentence 1' },
            { id: 'sat-e-q8-b', text: 'Sentence 3' },
            { id: 'sat-e-q8-c', text: 'Sentence 5' },
            { id: 'sat-e-q8-d', text: 'Sentence 7' }
          ],
          correctAnswer: 'sat-e-q8-c'
        }
      ]
    }
  ]
};

export const getRecommendationForBand = (band: number): string => {
  if (band >= 8) {
    return "Your English language skills are exceptional. Consider applying for universities or jobs with high language requirements. To maintain your proficiency, engage with complex academic texts, participate in debates, and practice formal writing.";
  } else if (band >= 7) {
    return "You have a good command of English with occasional inaccuracies. Focus on improving complex grammatical structures, expanding academic vocabulary, and enhancing your writing coherence and cohesion.";
  } else if (band >= 6) {
    return "You have a generally effective command of English. To improve, practice academic reading daily, work on grammatical accuracy, expand your vocabulary range, and practice writing essays with clear organization.";
  } else if (band >= 5) {
    return "You have a modest command of English with noticeable inaccuracies. Concentrate on learning fundamental grammar rules, building your vocabulary through daily reading, and practicing speaking to improve fluency.";
  } else {
    return "You need to strengthen your basic English skills. Start with foundational grammar, build essential vocabulary, and immerse yourself in English through daily listening and reading practice.";
  }
};

export const getSectionSpecificRecommendation = (section: 'listening' | 'reading' | 'writing' | 'speaking', score: number): string => {
  if (section === 'listening') {
    if (score >= 7) {
      return "Excellent listening skills. Practice with more complex academic lectures and discussions to maintain your proficiency.";
    } else if (score >= 6) {
      return "Practice with various accents and academic lectures. Focus on note-taking strategies during listening tasks.";
    } else {
      return "Build your listening skills by practicing with different audio types daily. Work on identifying main ideas and specific details.";
    }
  } else if (section === 'reading') {
    if (score >= 7) {
      return "Strong reading comprehension. Challenge yourself with complex academic texts and practice speed reading techniques.";
    } else if (score >= 6) {
      return "Improve skimming and scanning techniques. Practice reading academic texts and identifying arguments and supporting evidence.";
    } else {
      return "Focus on building vocabulary and understanding paragraph structure. Practice reading various text types daily.";
    }
  } else if (section === 'writing') {
    if (score >= 7) {
      return "Good writing skills. Work on sophisticated vocabulary and complex sentence structures to enhance your expression.";
    } else if (score >= 6) {
      return "Practice essay planning and paragraph organization. Focus on task achievement and coherence in your writing.";
    } else {
      return "Strengthen basic grammar and sentence construction. Practice writing different essay types and focus on clear structure.";
    }
  } else { // speaking
    if (score >= 7) {
      return "Articulate speaker. Continue practicing with complex topics and work on reducing any minor hesitations.";
    } else if (score >= 6) {
      return "Work on fluency and coherence in extended responses. Practice speaking on unfamiliar topics to improve flexibility.";
    } else {
      return "Build confidence by speaking English daily. Focus on basic pronunciation and expanding your vocabulary for everyday topics.";
    }
  }
};
