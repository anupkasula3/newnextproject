import { ListeningTest } from '@/types/listening';

export const listeningTestData: ListeningTest = {
  id: 'lt-001',
  title: 'IELTS Listening Practice Test 1',
  description: 'A complete IELTS listening test with 4 sections.',
  totalQuestions: 40,
  duration: 30,
  sections: [
    {
      id: 'lt-001-s1',
      title: 'Social Needs Survey',
      description: 'A conversation between a student and a university administrator about a social needs survey.',
      audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3',
      questions: [
        {
          id: 'q1',
          number: 1,
          text: 'The purpose of the survey is to find out about',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'student opinions of university accommodation.' },
            { value: 'B', label: 'the social opportunities available to students.' },
            { value: 'C', label: "students' ability to manage their time efficiently." }
          ],
          correctAnswer: 'B'
        },
        {
          id: 'q2',
          number: 2,
          text: 'The administrator says that mature students',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'are not eligible to complete the survey.' },
            { value: 'B', label: 'have been approached separately.' },
            { value: 'C', label: 'have different social needs from other students.' }
          ],
          correctAnswer: 'C'
        },
        {
          id: 'q3',
          number: 3,
          text: "What is the student's nationality?",
          type: 'fill-in-blank',
          instruction: 'Write NO MORE THAN ONE WORD.',
          maxWords: 1,
          correctAnswer: 'canadian'
        },
        {
          id: 'q4',
          number: 4,
          text: 'Where is the student living?',
          type: 'fill-in-blank',
          maxWords: 2,
          correctAnswer: 'west campus'
        },
        {
          id: 'q5',
          number: 5,
          text: "Match the student's responses to the following activities:",
          type: 'matching',
          options: [
            { value: 'A', label: 'Often participates' },
            { value: 'B', label: 'Occasionally participates' },
            { value: 'C', label: 'Never participates' }
          ],
          instruction: 'Sports activities',
          correctAnswer: 'B'
        }
      ]
    },
    {
      id: 'lt-001-s2',
      title: 'Library Tour',
      description: 'A guided tour of a university library.',
      audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3',
      questions: [
        {
          id: 'q6',
          number: 6,
          text: 'The library building was formerly',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'a museum.' },
            { value: 'B', label: 'a hospital.' },
            { value: 'C', label: 'a factory.' }
          ],
          correctAnswer: 'C'
        },
        {
          id: 'q7',
          number: 7,
          text: "The library's special collection focuses on",
          type: 'fill-in-blank',
          maxWords: 2,
          correctAnswer: 'local history'
        },
        {
          id: 'q8',
          number: 8,
          text: 'Students can borrow laptop computers for',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: '2 hours' },
            { value: 'B', label: '4 hours' },
            { value: 'C', label: 'the whole day' }
          ],
          correctAnswer: 'B'
        },
        {
          id: 'q9',
          number: 9,
          text: 'The silent study area is located on the',
          type: 'fill-in-blank',
          maxWords: 1,
          correctAnswer: 'third'
        },
        {
          id: 'q10',
          number: 10,
          text: 'Students are allowed to bring drinks into the library.',
          type: 'true-false',
          options: [
            { value: 'true', label: 'True' },
            { value: 'false', label: 'False' }
          ],
          correctAnswer: 'false'
        }
      ]
    },
    {
      id: 'lt-001-s3',
      title: 'Research Project Discussion',
      description: 'A discussion between a tutor and a student about a research project.',
      audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3',
      questions: [
        {
          id: 'q11',
          number: 11,
          text: "The student's main problem with the project is",
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'finding relevant source material.' },
            { value: 'B', label: 'organizing the structure of the paper.' },
            { value: 'C', label: 'understanding the assignment requirements.' }
          ],
          correctAnswer: 'B'
        },
        {
          id: 'q12',
          number: 12,
          text: 'The tutor suggests starting with the',
          type: 'fill-in-blank',
          maxWords: 1,
          correctAnswer: 'methodology'
        },
        {
          id: 'q13',
          number: 13,
          text: 'How many words should the literature review contain?',
          type: 'fill-in-blank',
          maxWords: 1,
          correctAnswer: '800'
        },
        {
          id: 'q14',
          number: 14,
          text: 'The tutor advises the student to include more',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'recent studies.' },
            { value: 'B', label: 'international examples.' },
            { value: 'C', label: 'critical analysis.' }
          ],
          correctAnswer: 'C'
        },
        {
          id: 'q15',
          number: 15,
          text: 'The student agrees to submit a revised plan by',
          type: 'fill-in-blank',
          maxWords: 1,
          correctAnswer: 'Friday'
        }
      ]
    },
    {
      id: 'lt-001-s4',
      title: 'Lecture on Urban Planning',
      description: 'A university lecture about urban planning and city development.',
      audioUrl: 'https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3',
      questions: [
        {
          id: 'q16',
          number: 16,
          text: 'According to the lecturer, the main challenge of modern urban planning is',
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'managing population growth.' },
            { value: 'B', label: 'balancing different stakeholder interests.' },
            { value: 'C', label: 'securing adequate funding.' }
          ],
          correctAnswer: 'B'
        },
        {
          id: 'q17',
          number: 17,
          text: 'The concept of "garden cities" was first introduced in',
          type: 'fill-in-blank',
          maxWords: 1,
          correctAnswer: '1898'
        },
        {
          id: 'q18',
          number: 18,
          text: 'The lecturer mentions Barcelona as an example of',
          type: 'fill-in-blank',
          maxWords: 2,
          correctAnswer: 'grid planning'
        },
        {
          id: 'q19',
          number: 19,
          text: "In the lecturer's opinion, the most sustainable transport option is",
          type: 'multiple-choice',
          options: [
            { value: 'A', label: 'electric vehicles.' },
            { value: 'B', label: 'public transport.' },
            { value: 'C', label: 'bicycle infrastructure.' }
          ],
          correctAnswer: 'C'
        },
        {
          id: 'q20',
          number: 20,
          text: 'Students are required to submit their essays by',
          type: 'fill-in-blank',
          maxWords: 2,
          correctAnswer: 'next Thursday'
        }
      ]
    }
  ]
};
