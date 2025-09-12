
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ResourcesFAQ = () => {
  const faqs = [
    {
      question: "Are all resources free to download?",
      answer: "Most of our basic resources are free for all registered users. However, premium resources require a subscription to access. Premium resources are marked with a 'Premium' badge."
    },
    {
      question: "How often are new resources added?",
      answer: "We add new resources weekly. Our team of experts continuously develops new materials to help you stay updated with the latest learning approaches and test formats."
    },
    {
      question: "Can I download resources for offline use?",
      answer: "Yes, all of our downloadable resources can be saved to your device for offline access. This allows you to study at your convenience, even without an internet connection."
    },
    {
      question: "How do I find resources specific to my level?",
      answer: "You can use the search filters to narrow down resources by difficulty level, from beginner to advanced. Each resource is tagged with its appropriate level to help you find suitable materials."
    },
    {
      question: "Can I suggest topics for new resources?",
      answer: "Absolutely! We welcome suggestions from our community. You can submit resource requests through the 'Suggestions' form in your account dashboard. Our content team reviews these regularly."
    }
  ];

  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Find answers to common questions about our learning resources.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-10 text-center">
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Still have questions about our resources?
        </p>
        <button className="font-medium text-indigo hover:text-indigo-700 dark:hover:text-indigo-300 underline">
          Contact our support team
        </button>
      </div>
    </div>
  );
};

export default ResourcesFAQ;
