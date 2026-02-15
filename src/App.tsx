import { Provider } from 'react-redux';
import { store } from './store';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Index from "./pages/Index";
import Playground from "./pages/Playground";
import Games from "./pages/Games";
import CodingChallenges from "./pages/CodingChallenges";
import ChallengeEditor from "./pages/ChallengeEditor";
import AskAI from "./pages/AskAI";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Snippets from "./pages/Snippets";
import SystemDesign from "./pages/SystemDesign";
import SystemDesignTopicPage from "./pages/SystemDesignTopicPage";
import InterviewPrep from "./pages/InterviewPrep";
import InterviewSession from "./pages/InterviewSession";
import ComingSoon from "./pages/ComingSoon";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/snippets" element={<Snippets />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/games" element={<Games />} />
              <Route path="/coding" element={<CodingChallenges />} />
              <Route path="/coding/:challengeId" element={<ChallengeEditor />} />
              <Route path="/system-design" element={<SystemDesign />} />
              <Route path="/system-design/:topicId" element={<SystemDesignTopicPage />} />
              <Route path="/interview" element={<InterviewPrep />} />
              <Route path="/interview/:interviewId" element={<InterviewSession />} />
              <Route path="/ask-ai" element={<AskAI />} />
              <Route path="/music" element={<Music />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
