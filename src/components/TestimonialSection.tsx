
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Neplia completely transformed my IELTS preparation. The AI feedback on my writing tasks was incredibly detailed and helped me improve from a 6.5 to an 8.0 in just two months.",
    author: "Sarah Johnson",
    role: "Graduate Student, UK",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 2,
    content: "The practice tests are so close to the real IELTS exam. I felt completely prepared on test day and scored a 7.5 overall. The speaking module practice was especially helpful.",
    author: "Rahul Sharma",
    role: "Software Engineer, India",
    rating: 5,
    avatar: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 3,
    content: "What stands out about Neplia is the detailed analytics. Being able to see exactly where I needed to improve helped me focus my study time efficiently.",
    author: "Liu Wei",
    role: "Business Analyst, China",
    rating: 4,
    avatar: "https://randomuser.me/api/portraits/women/3.jpg"
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Join thousands of satisfied students who've achieved their target IELTS scores
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.author}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
