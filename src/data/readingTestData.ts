
import { ReadingTest } from '@/types/reading';

export const readingTestData: ReadingTest = {
  id: "rt-001",
  title: "IELTS Reading Practice Test 1",
  description: "A complete IELTS reading test with 3 passages and 40 questions.",
  totalQuestions: 40,
  duration: 60,
  passages: [
    {
      id: "rt-001-p1",
      title: "The Evolution of Urban Design",
      text: `Cities have evolved dramatically over the centuries, shaped by various factors including population growth, technological advancements, and cultural shifts. The concept of urban planning can be traced back to ancient civilizations, where early settlements were designed with consideration for defense, water access, and religious practices.

      In the modern era, urban design has become increasingly complex, balancing functionality with aesthetic considerations. The Industrial Revolution marked a significant turning point, as cities rapidly expanded to accommodate factory workers, often leading to overcrowded and unsanitary conditions. This prompted a reform movement in the late 19th and early 20th centuries, championed by visionaries like Ebenezer Howard, who proposed the "Garden City" model that combined the benefits of urban and rural living.

      The 20th century saw the rise of various urban planning paradigms, from the car-centric approaches of the mid-century to the more recent emphasis on sustainability, walkability, and mixed-use development. Today's urban planners face the challenge of creating cities that are not only efficient and economically viable but also environmentally sustainable and socially inclusive.`,
      questions: [
        {
          id: "q1",
          number: 1,
          text: "According to the passage, what was a major factor that shaped early city design?",
          type: "multiple-choice",
          options: [
            { value: "A", label: "Aesthetic considerations" },
            { value: "B", label: "Defense requirements" },
            { value: "C", label: "Public transportation needs" }
          ],
          correctAnswer: "B"
        },
        {
          id: "q2",
          number: 2,
          text: "The Industrial Revolution's impact on cities primarily resulted in:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "improved sanitation" },
            { value: "B", label: "expanded green spaces" },
            { value: "C", label: "overcrowded conditions" }
          ],
          correctAnswer: "C"
        },
        {
          id: "q3",
          number: 3,
          text: "Who proposed the 'Garden City' model?",
          type: "fill-in-blank",
          maxWords: 2,
          correctAnswer: "Ebenezer Howard"
        },
        {
          id: "q4",
          number: 4,
          text: "The reading suggests that modern urban planning prioritizes:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "car-centric design" },
            { value: "B", label: "sustainability and inclusivity" },
            { value: "C", label: "industrial development" }
          ],
          correctAnswer: "B"
        }
      ]
    },
    {
      id: "rt-001-p2",
      title: "The Decline of Honeybee Populations",
      text: `The global decline in honeybee populations has become a matter of serious concern among environmentalists, agricultural experts, and policymakers worldwide. Bees play a vital role in our ecosystem as pollinators, facilitating the reproduction of flowering plants, including many food crops that humans rely on.

      Multiple factors contribute to this decline, collectively known as Colony Collapse Disorder (CCD). Pesticide use, particularly neonicotinoids, has been implicated as a significant contributor. These chemicals can impair bees' navigational abilities, making it difficult for them to return to their hives. Habitat loss due to urbanization and monoculture farming practices reduces the diversity of food sources available to bees, weakening their resilience.

      Climate change creates additional stress through altered flowering seasons and extreme weather events. Parasites like the Varroa mite and pathogens such as the Nosema fungus further threaten bee health. The combination of these factors creates a perfect storm of challenges for honeybee survival.

      Conservation efforts include restrictions on harmful pesticides, creation of bee-friendly habitats, and research into breeding disease-resistant bee varieties. Some agricultural practices, such as crop rotation and diversification, can create more favorable conditions for pollinators. Public awareness campaigns encourage individuals to plant bee-friendly gardens and support local beekeepers. The future of food security may well depend on our ability to protect these crucial pollinators.`,
      questions: [
        {
          id: "q5",
          number: 5,
          text: "What term is used to describe the combination of factors affecting bee populations?",
          type: "fill-in-blank",
          maxWords: 3,
          correctAnswer: "Colony Collapse Disorder"
        },
        {
          id: "q6",
          number: 6,
          text: "According to the passage, neonicotinoids affect bees by:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "reducing their lifespan" },
            { value: "B", label: "impairing their navigational abilities" },
            { value: "C", label: "preventing reproduction" }
          ],
          correctAnswer: "B"
        },
        {
          id: "q7",
          number: 7,
          text: "The Varroa mite is identified in the passage as:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "a climate change indicator" },
            { value: "B", label: "a pesticide type" },
            { value: "C", label: "a parasite" }
          ],
          correctAnswer: "C"
        },
        {
          id: "q8",
          number: 8,
          text: "True or False: Monoculture farming practices benefit honeybee populations.",
          type: "true-false",
          options: [
            { value: "true", label: "True" },
            { value: "false", label: "False" }
          ],
          correctAnswer: "false"
        },
        {
          id: "q9",
          number: 9,
          text: "Which agricultural practice is mentioned as beneficial for pollinators?",
          type: "multiple-choice",
          options: [
            { value: "A", label: "increased pesticide use" },
            { value: "B", label: "crop rotation" },
            { value: "C", label: "expanding urban areas" }
          ],
          correctAnswer: "B"
        }
      ]
    },
    {
      id: "rt-001-p3",
      title: "The Digital Divide: A Global Challenge",
      text: `The term "digital divide" refers to the gap between demographics and regions that have access to modern information and communications technology and those that don't or have restricted access. This technology includes the telephone, television, personal computers, and the internet. The divide within countries can be between rural and urban areas, between the educated and uneducated, between socioeconomic groups, and globally between more and less industrially developed nations.

      The digital divide not only reflects existing social inequalities but can also exacerbate them. In today's increasingly digital world, limited access to technology can hinder educational opportunities, employment prospects, and social mobility. For instance, during the COVID-19 pandemic, students without reliable internet access faced significant challenges in continuing their education remotely, potentially widening achievement gaps.

      Multiple initiatives aim to bridge this divide. Governments worldwide have implemented policies to expand infrastructure, subsidize devices, and provide digital literacy training. Non-governmental organizations often focus on bringing technology to underserved communities through community centers, mobile computing facilities, and educational programs. Meanwhile, technology companies have launched projects to extend internet connectivity to remote areas using innovative solutions like high-altitude balloons and low-orbit satellites.

      Despite these efforts, the digital divide persists. As technology continues to evolve rapidly, ensuring equitable access becomes increasingly challenging. The emergence of new technologies like artificial intelligence and the Internet of Things may create new dimensions to this divide. Addressing the digital divide requires not only technological solutions but also policy interventions that address underlying social and economic inequalities.`,
      questions: [
        {
          id: "q10",
          number: 10,
          text: "What is the main topic of this passage?",
          type: "fill-in-blank",
          maxWords: 2,
          correctAnswer: "digital divide"
        },
        {
          id: "q11",
          number: 11,
          text: "According to the passage, the digital divide can exist between:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "only developed and developing nations" },
            { value: "B", label: "only rural and urban areas" },
            { value: "C", label: "various demographics within countries and between nations" }
          ],
          correctAnswer: "C"
        },
        {
          id: "q12",
          number: 12,
          text: "The passage suggests that the COVID-19 pandemic:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "reduced the digital divide" },
            { value: "B", label: "highlighted educational inequalities related to technology access" },
            { value: "C", label: "had no impact on digital access issues" }
          ],
          correctAnswer: "B"
        },
        {
          id: "q13",
          number: 13,
          text: "Which of the following is NOT mentioned as a solution to bridge the digital divide?",
          type: "multiple-choice",
          options: [
            { value: "A", label: "Government infrastructure expansion" },
            { value: "B", label: "Reducing the cost of internet services" },
            { value: "C", label: "Low-orbit satellites" }
          ],
          correctAnswer: "B"
        },
        {
          id: "q14",
          number: 14,
          text: "The passage concludes that addressing the digital divide requires:",
          type: "multiple-choice",
          options: [
            { value: "A", label: "technological solutions only" },
            { value: "B", label: "both technological solutions and policy interventions" },
            { value: "C", label: "reducing the pace of technological advancement" }
          ],
          correctAnswer: "B"
        }
      ]
    }
  ]
};
