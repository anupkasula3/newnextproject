
import { SpeakingTask } from '@/types/speaking';

export const speakingTasksData: SpeakingTask[] = [
  // Family category
  {
    id: 'speaking-family',
    title: 'Family and Relationships',
    description: 'IELTS Speaking test focused on family and relationships topics',
    category: 'family',
    questions: [
      // Part 1: Introduction and Interview (10-12 questions)
      {
        id: 'family-q1',
        part: 1,
        text: 'Do you have a large or small family?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q2',
        part: 1,
        text: 'How much time do you spend with your family?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q3',
        part: 1,
        text: 'What activities do you usually do together with your family?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q4',
        part: 1,
        text: 'Are you close to your extended family, such as cousins and uncles?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q5',
        part: 1,
        text: 'How important is family in your culture?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q6',
        part: 1,
        text: 'Has the concept of family changed in recent years in your country?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q7',
        part: 1,
        text: 'Do you think family sizes are getting smaller in your country?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q8',
        part: 1,
        text: 'Who are you closest to in your family?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q9',
        part: 1,
        text: 'Do you think it is important for families to have meals together?',
        duration: 30,
        category: 'family'
      },
      {
        id: 'family-q10',
        part: 1,
        text: 'What family traditions do you have in your household?',
        duration: 30,
        category: 'family'
      },
      
      // Part 2: Individual Long Turn (one cue card with a 2-minute talk)
      {
        id: 'family-p2',
        part: 2,
        text: "Describe a family member who you are close to. You should say:\n\n• Who this person is\n• What this person does\n• What kind of person they are\n• And explain why you are close to this person",
        preparation: 60,
        duration: 120, // 2 minutes talk
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'family'
      },
      
      // Part 3: Two-way Discussion (related to Part 2 topic)
      {
        id: 'family-p3-q1',
        part: 3,
        text: 'How have families in your country changed in recent decades?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-p3-q2',
        part: 3,
        text: 'Do you think the role of grandparents in childcare is important?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-p3-q3',
        part: 3,
        text: 'What are the advantages and disadvantages of living in a joint family?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-p3-q4',
        part: 3,
        text: 'Do you think it is better for children to grow up in cities or in the countryside?',
        duration: 60,
        category: 'family'
      },
      {
        id: 'family-p3-q5',
        part: 3,
        text: 'How might family structures continue to change in the future?',
        duration: 60,
        category: 'family'
      }
    ]
  },
  
  // Work category
  {
    id: 'speaking-work',
    title: 'Work and Career',
    description: 'IELTS Speaking test focused on work, careers and professional life',
    category: 'work',
    questions: [
      // Part 1: Introduction and Interview (10-12 questions)
      {
        id: 'work-q1',
        part: 1,
        text: 'Do you work or are you a student?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q2',
        part: 1,
        text: 'What do you do for work?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q3',
        part: 1,
        text: 'Why did you choose this career?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q4',
        part: 1,
        text: 'What aspects of your job do you find most challenging?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q5',
        part: 1,
        text: "Do you think you'll stay in this job for a long time?",
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q6',
        part: 1,
        text: 'What skills are important in your job?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q7',
        part: 1,
        text: 'Is your current job related to what you studied?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q8',
        part: 1,
        text: 'Would you like to change your job in the future?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q9',
        part: 1,
        text: 'Do you think job satisfaction is more important than salary?',
        duration: 30,
        category: 'work'
      },
      {
        id: 'work-q10',
        part: 1,
        text: 'What was your first job?',
        duration: 30,
        category: 'work'
      },
      
      // Part 2: Individual Long Turn (one cue card with a 2-minute talk)
      {
        id: 'work-p2',
        part: 2,
        text: "Describe a job you would like to do in the future. You should say:\n\n• What the job is\n• What skills or qualifications you would need\n• Where you would be working\n• And explain why you would like to do this job",
        preparation: 60,
        duration: 120, // 2 minutes talk
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'work'
      },
      
      // Part 3: Two-way Discussion (related to Part 2 topic)
      {
        id: 'work-p3-q1',
        part: 3,
        text: "Do you think it's better to have a job that pays well or one that you enjoy?",
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-p3-q2',
        part: 3,
        text: 'How do you think the job market will change in the next 20 years?',
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-p3-q3',
        part: 3,
        text: 'What impact has technology had on employment in your country?',
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-p3-q4',
        part: 3,
        text: 'Do you think it is good to stay in the same job for a long time?',
        duration: 60,
        category: 'work'
      },
      {
        id: 'work-p3-q5',
        part: 3,
        text: 'What are the differences between working for a large company and a small company?',
        duration: 60,
        category: 'work'
      }
    ]
  },
  
  // Education category
  {
    id: 'speaking-education',
    title: 'Education and Learning',
    description: 'IELTS Speaking test focused on education, learning and studying',
    category: 'education',
    questions: [
      // Part 1: Introduction and Interview (10-12 questions)
      {
        id: 'education-q1',
        part: 1,
        text: 'What subject did you enjoy most at school?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q2',
        part: 1,
        text: 'Why did you enjoy this subject?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q3',
        part: 1,
        text: 'Do you think learning languages is important?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q4',
        part: 1,
        text: 'Was there a teacher who influenced you particularly?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q5',
        part: 1,
        text: 'How has your education helped you in life?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q6',
        part: 1,
        text: 'Do you prefer studying alone or in groups?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q7',
        part: 1,
        text: 'What kind of learning environment do you prefer?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q8',
        part: 1,
        text: 'What skills do you think are most important to learn at school?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q9',
        part: 1,
        text: 'Do schools in your country focus too much on exams?',
        duration: 30,
        category: 'education'
      },
      {
        id: 'education-q10',
        part: 1,
        text: 'At what age do children start school in your country?',
        duration: 30,
        category: 'education'
      },
      
      // Part 2: Individual Long Turn (one cue card with a 2-minute talk)
      {
        id: 'education-p2',
        part: 2,
        text: "Describe a teacher who has influenced you in your education. You should say:\n\n• Who this person is/was\n• What subject they taught\n• What was special about them\n• And explain how they influenced you",
        preparation: 60,
        duration: 120, // 2 minutes talk
        notes: "You have one minute to prepare. Then you'll need to talk about the topic for one to two minutes. You can make notes if you wish.",
        category: 'education'
      },
      
      // Part 3: Two-way Discussion (related to Part 2 topic)
      {
        id: 'education-p3-q1',
        part: 3,
        text: 'How has education changed in your country in the last 20 years?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-p3-q2',
        part: 3,
        text: 'Do you think online learning is as effective as traditional classroom learning?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-p3-q3',
        part: 3,
        text: 'What qualities make someone an effective teacher?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-p3-q4',
        part: 3,
        text: 'How important is lifelong learning in today\'s society?',
        duration: 60,
        category: 'education'
      },
      {
        id: 'education-p3-q5',
        part: 3,
        text: 'What changes do you think we will see in education in the future?',
        duration: 60,
        category: 'education'
      }
    ]
  }
]
