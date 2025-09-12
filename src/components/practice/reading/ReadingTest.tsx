
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ReadingQuestions } from './ReadingQuestions';

interface ReadingTestProps {
  examType?: string;
  section?: string;
}

export const ReadingTest = ({ examType = 'ielts', section = 'reading' }: ReadingTestProps) => {
  const [activeTab, setActiveTab] = useState('passage');

  // Sample passage for different exam types and sections
  const getPassageContent = () => {
    if (examType === 'gre' && section === 'verbal') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">The Transformation of Urban Spaces</h3>
          <p>
            The metamorphosis of urban spaces represents one of the most profound social and architectural shifts of the modern era. Cities, once designed primarily as centers of commerce and governance, have increasingly evolved into multifaceted ecosystems that serve diverse social, cultural, and environmental functions. This transformation reflects both changing attitudes about communal living and the inexorable pressure of population growth in metropolitan areas.
          </p>
          <p>
            Urban planners now routinely incorporate biophilic elements—those that connect inhabitants with nature—recognizing the salutary effects of green spaces on mental health and community cohesion. The proliferation of urban gardens, living walls, and accessible parks represents a deliberate attempt to mitigate the psychological toll of concrete landscapes. These interventions are not merely aesthetic; research indicates that proximity to natural elements correlates with reduced stress levels, improved cognitive function, and enhanced social interactions among city dwellers.
          </p>
          <p>
            Concurrently, the concept of mixed-use development has gained traction, challenging the traditional segregation of residential, commercial, and industrial zones. By integrating diverse functionalities within compact areas, contemporary urban design fosters walkability and reduces dependence on automotive transportation—a shift that addresses both environmental concerns and quality-of-life considerations. The resulting neighborhoods often exhibit a vitality absent in their more homogeneous counterparts, as the constant flow of people engaged in different activities generates a dynamic social atmosphere.
          </p>
          <p>
            However, this urban renaissance has not proceeded without controversy. Critics argue that the revitalization of formerly neglected areas frequently catalyzes gentrification, displacing long-term residents as property values appreciate. This pattern raises fundamental questions about equity and access: Who benefits from urban transformation, and who bears its costs? The challenge for future urban development lies in balancing innovation with inclusion, ensuring that redesigned spaces remain accessible to diverse socioeconomic groups.
          </p>
        </div>
      );
    }
    else if (examType === 'gre' && section === 'quantitative') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quantitative Reasoning Practice Set</h3>
          <p>
            This practice set contains a series of mathematical problems covering various topics including arithmetic, algebra, geometry, and data analysis. Read each problem carefully and select the best answer from the options provided.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 1:</p>
            <p>
              If x² + y² = 25 and xy = 12, what is the value of (x + y)²?
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              Hint: Use the algebraic identity (x + y)² = x² + 2xy + y²
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 2:</p>
            <p>
              In a certain sequence, each term after the first is found by multiplying the preceding term by 3 and then subtracting 2. If the first term is 5, what is the 4th term in the sequence?
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 3:</p>
            <p>
              A circle has a circumference of 16π. What is the area of the circle?
            </p>
            <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">
              Hint: Remember that the circumference of a circle is 2πr and the area is πr².
            </p>
          </div>
        </div>
      );
    }
    else if (examType === 'sat' && section === 'math') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Math Section - No Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For this section, you may not use a calculator. Solve each problem and select the best answer from the choices provided.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 1:</p>
            <p>
              If 3x + 5y = 15 and 2x - y = 7, what is the value of x?
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 2:</p>
            <p>
              The function f is defined by f(x) = 2x² + 4x - 3. What is the value of f(2)?
            </p>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 3:</p>
            <p>
              In the xy-plane, what is the y-coordinate of the midpoint of the line segment with endpoints (2, 7) and (8, 5)?
            </p>
          </div>
          <h3 className="text-xl font-semibold mt-8">Math Section - Calculator</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            For this section, you may use a calculator. Solve each problem and select the best answer from the choices provided.
          </p>
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="font-medium mb-2">Problem 4:</p>
            <p>
              The average (arithmetic mean) of 6 numbers is 8. If 5 of the numbers have an average of 6, what is the value of the sixth number?
            </p>
          </div>
        </div>
      );
    }
    else if (examType === 'sat' && section === 'reading') {
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Reading & Writing Section</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            This section tests your ability to comprehend written passages and analyze text.
          </p>
          <div className="border-l-4 border-red-500 pl-4 italic">
            <p>
              The following passage is adapted from a speech delivered by Marie Curie upon accepting her second Nobel Prize in 1911.
            </p>
          </div>
          <p>
            I am among those who think that science has great beauty. A scientist in the laboratory is not only a technician: she is also a child faced with natural phenomena which impress her like a fairy tale. We should not allow it to be believed that all scientific progress can be reduced to mechanisms, machines, gearings, even though such machinery also has its own beauty.
          </p>
          <p>
            Neither do I believe that the spirit of adventure runs any risk of disappearing in our world. If I see anything vital around me, it is precisely that spirit of adventure, which seems indestructible and is akin to curiosity. Without curiosity, without the constant magical force of wonder, our work would surely appear futile.
          </p>
          <p>
            But I do not believe that among the many benefits of science, the greatest is the lessons it imparts in objectivity. In laboratories we learn to weigh and measure with precision, to observe with acuity, and to think with clarity. These skills, once developed, extend beyond our scientific endeavors into how we perceive the world and interact with others. The scientific method teaches us to recognize our biases and to question our assumptions—a practice that, if embraced broadly, could elevate public discourse and decision-making.
          </p>
        </div>
      );
    }
    else {
      // Default IELTS/TOEFL reading passage
      return (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">The History of Tea</h3>
          <p>
            Tea has played a significant role in human history for thousands of years. The story of tea begins in China, where according to legend, in 2737 BCE, the Chinese emperor Shen Nung was sitting beneath a tree while his servant boiled drinking water. Some leaves from the tree blew into the water, and Shen Nung, a renowned herbalist, decided to try the infusion that his servant had accidentally created. The tree was a Camellia sinensis, and the resulting drink was what we now call tea.
          </p>
          <p>
            Containers for tea have been found in tombs dating from the Han dynasty (206 BCE – 220 CE) but it was during the Tang dynasty (618-906 CE) that tea became firmly established as the national drink of China. It became such a favorite that during the late eighth century a writer called Lu Yu wrote the first book entirely about tea, the Ch'a Ching, or Tea Classic. It was shortly after this that tea was first introduced to Japan, by Japanese monks who had travelled to China to study.
          </p>
          <p>
            Tea drinking has become an integral part of Japanese culture, as seen in the development of the Tea Ceremony, which may be rooted in the rituals described in the Ch'a Ching. In the early 1600s, Dutch merchants brought the first tea shipments to Europe. It was initially advertised as a medicinal beverage, though it quickly became popular for its flavor and stimulating qualities, which were attributed to the caffeine content, though this was not scientifically identified until later.
          </p>
          <p>
            The British East India Company began to import tea into Britain in 1669, and it became a fashionable drink among the aristocracy and wealthy. Tea drinking became a regular part of daily life for many ordinary families in the 18th century as prices fell due to reduced taxes and increased direct imports. It was around this time that the British began adding milk and sugar to their tea, a practice that was not common in China or Japan.
          </p>
          <p>
            The demand for tea played a role in historical events, including the First Opium War and the Boston Tea Party, which was a significant catalyst for the American Revolution. Today, tea is the second most consumed beverage in the world after water, with an estimated 3 billion cups consumed every day.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setActiveTab('passage')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'passage'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
        >
          Passage
        </button>
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2 rounded-md transition-colors ${
            activeTab === 'questions'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700'
          }`}
        >
          Questions
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Passage Section */}
        {activeTab === 'passage' ? (
          <Card className="md:col-span-5 bg-white dark:bg-gray-900 shadow-md">
            <CardContent className="p-6">
              <div className="prose dark:prose-invert max-w-none">
                {getPassageContent()}
              </div>
            </CardContent>
          </Card>
        ) : (
          <ReadingQuestions examType={examType} section={section} />
        )}
      </div>
    </div>
  );
};
