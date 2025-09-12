
import React from 'react';
import Layout from '@/components/Layout';
import { 
  Users, 
  Award, 
  Star, 
  Check, 
  Info 
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Hero Section */}
        <section className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo to-coral bg-clip-text text-transparent">
            About Neplia
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Your trusted partner in IELTS preparation, operated with passion and expertise by Team Tuit.
          </p>
        </section>

        {/* Our Story */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <Info className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Our Story</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Neplia was born from a simple yet powerful observation: IELTS preparation should be accessible, effective, and engaging. Founded in 2021 by Govinda Bohara who later formed Team Tuit, we set out to revolutionize how students prepare for one of the world's most recognized English proficiency tests.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                What began as a small collection of practice materials has evolved into a comprehensive platform used by thousands of students worldwide. Our journey has been guided by one core principle: to empower every learner with the tools they need to achieve their target IELTS score.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Today, Neplia stands as a testament to the dedication of Team Tuit and our commitment to educational excellence. We continue to innovate and expand our offerings, driven by the success stories of our users.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-indigo to-coral p-1 rounded-xl">
                <div className="w-full h-full bg-white dark:bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="font-heading text-4xl font-bold text-indigo">
                    Neplia<span className="text-coral">.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Tuit */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Meet Team Tuit</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="mb-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Behind Neplia is a diverse team of educators, language experts, and technologists united by a shared passion for transforming exam preparation. Team Tuit brings together decades of combined experience in language teaching, test preparation, and educational technology.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {/* Team Member 1 - Govinda Bohara */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Govinda Bohara</h3>
                  <p className="text-indigo font-medium mb-3">Founder & CEO</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Visionary leader with extensive experience in educational technology and language training. Govinda founded Neplia with a mission to democratize exam preparation.
                  </p>
                </div>
              </div>
              
              {/* Team Member 2 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">James Lee</h3>
                  <p className="text-indigo font-medium mb-3">Head of Content</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Linguistics PhD with specialization in test preparation. James oversees all educational content development.
                  </p>
                </div>
              </div>
              
              {/* Team Member 3 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Maria Garcia</h3>
                  <p className="text-indigo font-medium mb-3">Technology Director</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Former edTech startup founder with a passion for creating intuitive learning platforms and experiences.
                  </p>
                </div>
              </div>
              
              {/* Team Member 4 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">David Kim</h3>
                  <p className="text-indigo font-medium mb-3">Speaking & Writing Coach</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Certified TEFL instructor with experience teaching in 5 countries. David specializes in speaking and writing preparation.
                  </p>
                </div>
              </div>
              
              {/* Team Member 5 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Aisha Patel</h3>
                  <p className="text-indigo font-medium mb-3">User Experience Lead</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    UX designer specialized in educational applications. Aisha ensures Neplia is intuitive and enjoyable to use.
                  </p>
                </div>
              </div>
              
              {/* Team Member 6 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-indigo/10 to-coral/10"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Thomas Wilson</h3>
                  <p className="text-indigo font-medium mb-3">Student Success Manager</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Former international student advisor with a passion for helping learners achieve their educational goals.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <Star className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Our Approach</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Research-Based</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Every resource, practice test, and strategy we offer is grounded in research and proven methodologies. We continuously analyze test trends and update our materials accordingly.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Personalized</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We understand that every learner is unique. Our platform adapts to individual strengths and weaknesses, providing targeted practice where it's needed most.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-4">Comprehensive</h3>
              <p className="text-gray-700 dark:text-gray-300">
                From IELTS and TOEFL to government exams and banking tests, we cover all major examinations with the depth and breadth needed for success. No stone is left unturned.
              </p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <Award className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Our Achievements</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-indigo mb-2">50K+</h3>
              <p className="text-gray-700 dark:text-gray-300">Active Students</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-indigo mb-2">120+</h3>
              <p className="text-gray-700 dark:text-gray-300">Countries Reached</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-indigo mb-2">92%</h3>
              <p className="text-gray-700 dark:text-gray-300">Success Rate</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center">
              <h3 className="text-4xl font-bold text-indigo mb-2">4.8/5</h3>
              <p className="text-gray-700 dark:text-gray-300">Student Satisfaction</p>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-indigo/10 to-coral/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-4">Recognition</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Check className="h-6 w-6 text-indigo mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">Featured in "Top 10 Language Learning Platforms" by Education Weekly (2023)</p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-indigo mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">Winner of the EdTech Breakthrough Award for "Best Test Preparation Solution" (2022)</p>
              </li>
              <li className="flex items-start">
                <Check className="h-6 w-6 text-indigo mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 dark:text-gray-300">Certified by the International Association of Language Educators (2021-Present)</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Mission and Values */}
        <section className="mb-20">
          <div className="flex items-center mb-6">
            <Star className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Our Mission & Values</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md mb-8">
            <h3 className="text-2xl font-bold mb-4">Mission</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              To democratize exam preparation by providing accessible, high-quality resources that empower learners worldwide to achieve their goals. We focus on a wide range of tests including IELTS, PTE, TOEFL, SAT, as well as government, non-government, and banking exams, ensuring comprehensive coverage for all educational needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We are committed to delivering the highest quality in everything we do—from our practice materials to our user experience.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We believe quality education should be available to all, regardless of geographical or economic barriers.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
              <h3 className="text-xl font-bold mb-3">Innovation</h3>
              <p className="text-gray-700 dark:text-gray-300">
                We continuously explore new approaches and technologies to enhance the learning experience and improve outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* Get in Touch */}
        <section>
          <div className="flex items-center mb-6">
            <Info className="h-8 w-8 text-indigo mr-3" />
            <h2 className="text-3xl font-bold">Get in Touch</h2>
          </div>
          <Separator className="mb-8" />
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              We'd love to hear from you! Whether you have questions about our platform, feedback to share, or partnership opportunities to discuss, Team Tuit is ready to connect.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Email:</span>
                    <span className="text-indigo">team@neplia.com</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Phone:</span>
                    <span>+1 (555) 123-4567</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-semibold mr-2">Address:</span>
                    <span>123 Education Lane, Suite 456<br />San Francisco, CA 94105</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Follow us on social media for the latest updates, exam tips, and success stories.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo hover:bg-indigo hover:text-white transition-colors">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo hover:bg-indigo hover:text-white transition-colors">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo hover:bg-indigo hover:text-white transition-colors">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-indigo/10 flex items-center justify-center text-indigo hover:bg-indigo hover:text-white transition-colors">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default About;
