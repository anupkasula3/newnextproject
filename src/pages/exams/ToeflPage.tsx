
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, Headphones, MessageSquare, Edit, BarChart3, Calendar, CheckCircle2, Award, Shield, Laptop, Brain, Clock, FileText, Trophy } from 'lucide-react'; // Added Trophy
import { motion } from 'framer-motion';

const ToeflPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const urlType = queryParams.get('type');
    if (urlType) {
      localStorage.setItem('selectedToeflType', urlType);
    }
    localStorage.setItem('selectedExam', 'toefl');
    window.scrollTo(0, 0);
    document.title = 'TOEFL Practice | Neplia';
  }, [location]);

  const queryParams = new URLSearchParams(location.search);
  const urlType = queryParams.get('type');
  const selectedToeflType = urlType || localStorage.getItem('selectedToeflType') || "ibt";

  const goToSection = (section: string) => {
    let path = `/practice/${section}?exam=toefl-${selectedToeflType}`;
    if (section === "structure" && (selectedToeflType === "pbt" || selectedToeflType === "itp")) {
      path = `/practice/speaking?exam=toefl-${selectedToeflType}`;
    }
    if (section === "mock-test") {
      path = `/practice/mock-test?exam=toefl-${selectedToeflType}`;
    }
    navigate(path);
  };

  const getSections = () => {
    switch (selectedToeflType) {
      case "pbt":
        return [
          { 
            key: "reading", 
            title: "Reading (50 Qs, 55 min)", 
            description: "Reading comprehension and grammar questions", 
            icon: BookOpen 
          },
          { 
            key: "listening", 
            title: "Listening (50 Qs, 30-40 min)", 
            description: "Short conversations and lectures", 
            icon: Headphones 
          },
          { 
            key: "structure", 
            title: "Structure/Written Expression (40 Qs, 25 min)", 
            description: "Grammar & error ID", 
            icon: MessageSquare 
          },
          { 
            key: "writing", 
            title: "Writing (TWE, 30 min)", 
            description: "Essay prompt practice for TWE", 
            icon: Edit 
          },
          { 
            key: "mock-test", 
            title: "Full Mock Test", 
            description: "Full PBT mock under timed conditions", 
            icon: Trophy 
          },
        ];
      case "essentials":
        return [
          { 
            key: "reading", 
            title: "Reading (adaptive)", 
            description: "Short passages, adaptive difficulty", 
            icon: BookOpen 
          },
          { 
            key: "listening", 
            title: "Listening (adaptive)", 
            description: "Conversations and mini-lectures", 
            icon: Headphones 
          },
          { 
            key: "speaking", 
            title: "Speaking (10 min)", 
            description: "Quick response & video intro", 
            icon: MessageSquare 
          },
          { 
            key: "writing", 
            title: "Writing (short tasks)", 
            description: "Short writing tasks with feedback", 
            icon: Edit 
          },
          { 
            key: "mock-test", 
            title: "Full Mock Test", 
            description: "Full Essentials mock", 
            icon: Trophy 
          },
        ];
      case "itp":
        return [
          { 
            key: "reading", 
            title: "Reading (inst. focus)", 
            description: "Institutional ITP passages", 
            icon: BookOpen 
          },
          { 
            key: "listening", 
            title: "Listening", 
            description: "Lectures/conversations", 
            icon: Headphones 
          },
          { 
            key: "structure", 
            title: "Structure/Written Expression", 
            description: "Form/meaning questions", 
            icon: MessageSquare 
          },
          { 
            key: "writing", 
            title: "Writing (supplemental)", 
            description: "Extra writing for ITP", 
            icon: Edit 
          },
          { 
            key: "mock-test", 
            title: "Full Mock Test", 
            description: "Full ITP mock", 
            icon: Trophy 
          },
        ];
      default: // ibt
        return [
          { 
            key: "reading", 
            title: "Reading (20 Qs, 35 min)", 
            description: "Academic passages, multi-choice", 
            icon: BookOpen 
          },
          { 
            key: "listening", 
            title: "Listening (28 Qs, 36 min)", 
            description: "Lectures/conversations", 
            icon: Headphones 
          },
          { 
            key: "speaking", 
            title: "Speaking (4 tasks, 16 min)", 
            description: "Opinion, integrated, conversation tasks", 
            icon: MessageSquare 
          },
          { 
            key: "writing", 
            title: "Writing (2 tasks, 29 min)", 
            description: "Integrated and independent writing", 
            icon: Edit 
          },
          { 
            key: "mock-test", 
            title: "Full Mock Test", 
            description: "Full iBT mock under timed conditions", 
            icon: Trophy 
          },
        ];
    }
  };

  const sections = getSections();

  const getExamTitle = () => {
    const label = {
      "ibt": "TOEFL iBT (Most Popular)",
      "pbt": "TOEFL PBT (Legacy Paper Test)",
      "essentials": "TOEFL Essentials",
      "itp": "TOEFL ITP (School Placement)"
    }[selectedToeflType];
    return label || "TOEFL";
  };

  return (
    <Layout>
      <section className="relative overflow-hidden pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-teal-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-300 rounded-full text-sm font-medium mb-3">
              TOEFL Preparation
            </span>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-5">
              Prepare for <span className="text-teal-600">{getExamTitle()}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Practice modules, full mock tests, and smart analytics—tailored for your TOEFL type.
            </p>
          </div>
          <div className="mx-auto max-w-2xl mb-8">
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {Object.entries({
                "ibt": "🖥️ TOEFL iBT",
                "pbt": "📝 TOEFL PBT",
                "essentials": "⚡ TOEFL Essentials",
                "itp": "🏫 TOEFL ITP",
              }).map(([type, label]) => (
                <button
                  key={type}
                  onClick={() => {
                    localStorage.setItem('selectedToeflType', type);
                    navigate(`/exams/toefl?type=${type}`);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition border
                    ${selectedToeflType === type ? 'bg-teal-600 text-white border-teal-600' : 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-600 text-teal-600 dark:text-teal-400'}
                    hover:bg-teal-50 dark:hover:bg-teal-950`
                  }
                  style={{ minWidth: 120 }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              Which TOEFL exam are you preparing for? Select to start a full test or practice sections.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sections.map(s => (
              <div 
                key={s.key} 
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg border border-gray-100 dark:border-gray-700 h-full flex flex-col"
              >
                <div className={`flex-1 flex flex-col p-6`}>
                  <div className={`flex items-center gap-3 mb-3`}>
                    <div className="p-2 rounded-full bg-teal-50 dark:bg-teal-900/20 w-12 h-12 flex items-center justify-center">
                      <s.icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <h3 className="text-xl font-bold text-teal-700 dark:text-teal-100">{s.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-5 flex-1">{s.description}</p>
                  <button
                    className="mt-auto w-full bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-base font-medium transition"
                    onClick={() => goToSection(s.key)}
                  >
                    Start Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-8 flex justify-center text-xs text-gray-500 opacity-80">
        <span>
          This simulator mimics TOEFL but isn’t endorsed by ETS.
        </span>
      </div>
    </Layout>
  );
};

export default ToeflPage;
