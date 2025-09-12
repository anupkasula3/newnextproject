
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import './App.css';

// Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import SignUp from '@/pages/SignUp';
import Login from '@/pages/Login';
import UserDashboard from '@/pages/UserDashboard';
import Terms from '@/pages/Terms';
import Privacy from '@/pages/Privacy';
import Cookies from '@/pages/Cookies';
import SelectionHome from '@/pages/SelectionHome';
import CountriesPage from '@/pages/CountriesPage';
import ResourcesHome from '@/pages/ResourcesHome';
import ResourceDetail from '@/pages/ResourceDetail';
import Resources from '@/pages/Resources';
import AllResources from '@/pages/AllResources';
import CategoryDetail from '@/pages/CategoryDetail';
import ResourceCategoryPage from '@/pages/ResourceCategoryPage';
import Pricing from '@/pages/Pricing';
import Business from '@/pages/Business';
import BusinessDetail from '@/pages/BusinessDetail';
import Team from '@/pages/Team';
// Admin Pages
import AdminDashboard from '@/pages/admin/Dashboard';
import AdminRedirect from '@/components/admin/AdminRedirect';
import UsersCMS from '@/pages/admin/UsersCMS';
import BlogPostCMS from '@/pages/admin/BlogPostCMS';
import ResourceManagement from '@/pages/admin/ResourceManagement';
import ExamSectionPage from '@/pages/admin/ExamSectionPage';
import ReadingTaskCMS from '@/pages/admin/ReadingTaskCMS';
import WritingTaskCMS from '@/pages/admin/WritingTaskCMS';
import SpeakingReviewPage from '@/pages/admin/SpeakingReviewPage';
import ListeningTaskCMS from '@/pages/admin/ListeningTaskCMS';
import Marketing from '@/pages/admin/Marketing';
import Settings from '@/pages/admin/Settings';
import IeltsTaskManager from '@/pages/admin/IeltsTaskManager';
import MasterPanel from '@/pages/admin/MasterPanel';
import TeamManagement from '@/pages/admin/TeamManagement';

// Exam Pages
import IeltsPage from '@/pages/exams/IeltsPage';
import ToeflPage from '@/pages/exams/ToeflPage';
import PtePage from '@/pages/exams/PtePage';
import GrePage from '@/pages/exams/GrePage';
import GmatPage from '@/pages/exams/GmatPage';
import SatPage from '@/pages/exams/SatPage';

// Practice Pages
import PracticePage from '@/pages/practice/PracticePage';
import ReadingPractice from '@/pages/practice/ReadingPractice';
import ListeningPractice from '@/pages/practice/ListeningPractice';
import CompleteListeningPage from '@/pages/practice/CompleteListeningPage';
import SpeakingPractice from '@/pages/practice/SpeakingPractice';
import WritingPractice from '@/pages/practice/WritingPractice';
import MockTestPage from '@/pages/practice/MockTestPage';

// Import exam-specific practice pages
import IeltsPracticePage from '@/pages/practice/exam-specific/IeltsPracticePage';
import ToeflPracticePage from '@/pages/practice/exam-specific/ToeflPracticePage';
import PtePracticePage from '@/pages/practice/exam-specific/PtePracticePage';
import GrePracticePage from '@/pages/practice/exam-specific/GrePracticePage';
import GmatPracticePage from '@/pages/practice/exam-specific/GmatPracticePage';
import SatPracticePage from '@/pages/practice/exam-specific/SatPracticePage';

// Create GRE-specific practice components
import GreVerbalPractice from '@/pages/practice/exam-specific/gre/GreVerbalPractice';
import GreQuantitativePractice from '@/pages/practice/exam-specific/gre/GreQuantitativePractice';
import GreAnalyticalPractice from '@/pages/practice/exam-specific/gre/GreAnalyticalPractice';
import GreMixedPractice from '@/pages/practice/exam-specific/gre/GreMixedPractice';

// Create a wrapper component for the redirect
const CategoryRedirect = () => {
  const location = useLocation();
  const slug = location.pathname.split('/').pop() || '';
  return <Navigate to={`/resources/categories/${slug}`} replace />;
};

// Scroll restoration component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/selection" element={<SelectionHome />} />
        <Route path="/countries" element={<CountriesPage />} />
        <Route path="/resources" element={<ResourcesHome />} />
        <Route path="/resources/:slug" element={<ResourceDetail />} />
        <Route path="/resources/all" element={<AllResources />} />
        <Route path="/resources/categories" element={<Resources />} />
        <Route path="/resources/categories/:slug" element={<ResourceCategoryPage />} />
        {/* Add redirect for old category URLs to the new format */}
        <Route path="/resources/category/:slug" element={<CategoryRedirect />} />
        
        {/* Business Routes */}
        <Route path="/business" element={<Business />} />
        <Route path="/business/:id" element={<BusinessDetail />} />
        
        {/* Exam Routes */}
        <Route path="/exams/ielts" element={<IeltsPage />} />
        <Route path="/exams/toefl" element={<ToeflPage />} />
        <Route path="/exams/pte" element={<PtePage />} />
        <Route path="/exams/gre" element={<GrePage />} />
        <Route path="/exams/gmat" element={<GmatPage />} />
        <Route path="/exams/sat" element={<SatPage />} />
        
        {/* Generic Practice Routes */}
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/practice/reading" element={<ReadingPractice />} />
        <Route path="/practice/listening" element={<ListeningPractice />} />
        <Route path="/practice/listening/complete" element={<CompleteListeningPage />} />
        <Route path="/practice/speaking" element={<SpeakingPractice />} />
        <Route path="/practice/writing" element={<WritingPractice />} />
        <Route path="/practice/mock-test" element={<MockTestPage />} />
        
        {/* Exam-Specific Practice Routes */}
        <Route path="/practice/ielts" element={<IeltsPracticePage />} />
        <Route path="/practice/toefl" element={<ToeflPracticePage />} />
        <Route path="/practice/pte" element={<PtePracticePage />} />
        <Route path="/practice/gre" element={<GrePracticePage />} />
        <Route path="/practice/gmat" element={<GmatPracticePage />} />
        <Route path="/practice/sat" element={<SatPracticePage />} />
        
        {/* Exam-Specific Section Routes */}
        {/* IELTS Section Routes */}
        <Route path="/practice/ielts/reading" element={<ReadingPractice />} />
        <Route path="/practice/ielts/listening" element={<ListeningPractice />} />
        <Route path="/practice/ielts/writing" element={<WritingPractice />} />
        <Route path="/practice/ielts/speaking" element={<SpeakingPractice />} />
        
        {/* TOEFL Section Routes */}
        <Route path="/practice/toefl/reading" element={<ReadingPractice />} />
        <Route path="/practice/toefl/listening" element={<ListeningPractice />} />
        <Route path="/practice/toefl/writing" element={<WritingPractice />} />
        <Route path="/practice/toefl/speaking" element={<SpeakingPractice />} />
        
        {/* PTE Section Routes */}
        <Route path="/practice/pte/reading" element={<ReadingPractice />} />
        <Route path="/practice/pte/listening" element={<ListeningPractice />} />
        <Route path="/practice/pte/speaking" element={<SpeakingPractice />} />
        <Route path="/practice/pte/writing" element={<WritingPractice />} />
        
        {/* GRE Section Routes - Updated with dedicated components */}
        <Route path="/practice/gre/verbal" element={<GreVerbalPractice />} />
        <Route path="/practice/gre/quantitative" element={<GreQuantitativePractice />} />
        <Route path="/practice/gre/analytical" element={<GreAnalyticalPractice />} />
        <Route path="/practice/gre/mixed" element={<GreMixedPractice />} />
        
        {/* SAT Section Routes */}
        <Route path="/practice/sat/reading" element={<ReadingPractice />} />
        <Route path="/practice/sat/english" element={<ReadingPractice />} />
        <Route path="/practice/sat/writing" element={<ReadingPractice />} />
        <Route path="/practice/sat/vocabulary" element={<ReadingPractice />} />
        <Route path="/practice/sat/math" element={<ReadingPractice />} />
        
        {/* GMAT Section Routes */}
        <Route path="/practice/gmat/verbal" element={<ReadingPractice />} />
        <Route path="/practice/gmat/quantitative" element={<ReadingPractice />} />
        <Route path="/practice/gmat/integrated" element={<ReadingPractice />} />
        <Route path="/practice/gmat/analytical" element={<WritingPractice />} />
        
        {/* Admin Routes - Updated with exam section routes */}
        <Route path="/admin" element={<AdminRedirect />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UsersCMS />} />
        <Route path="/admin/master" element={<MasterPanel />} />
        <Route path="/admin/team" element={<TeamManagement />} />
        <Route path="/admin/blog-posts" element={<BlogPostCMS />} />
        <Route path="/admin/resources" element={<ResourceManagement />} />
        <Route path="/admin/exam-sections" element={<ExamSectionPage />} />
        <Route path="/admin/reading-tasks" element={<ReadingTaskCMS />} />
        <Route path="/admin/writing-tasks" element={<WritingTaskCMS />} />
        <Route path="/admin/speaking-review" element={<SpeakingReviewPage />} />
        <Route path="/admin/listening-tasks" element={<ListeningTaskCMS />} />
        <Route path="/admin/marketing" element={<Marketing />} />
        <Route path="/admin/settings" element={<Settings />} />
        
        {/* Exam-specific admin task managers */}
        <Route path="/admin/ielts-overview" element={<IeltsTaskManager />} />
        <Route path="/admin/toefl-overview" element={<IeltsTaskManager />} /> {/* Reusing IeltsTaskManager temporarily, would create specific ones in a real app */}
        <Route path="/admin/gre-overview" element={<IeltsTaskManager />} />
        <Route path="/admin/gmat-overview" element={<IeltsTaskManager />} />
        <Route path="/admin/sat-overview" element={<IeltsTaskManager />} />
        <Route path="/admin/pte-overview" element={<IeltsTaskManager />} />
        
        {/* Add specific exam section routes */}
        <Route path="/admin/exams/:examType" element={<ExamSectionPage />} />
        <Route path="/admin/exams/:examType/:sectionType" element={<ExamSectionPage />} />
        
        {/* 404 Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
