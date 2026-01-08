import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Register from "./pages/Register";
import CreatePassword from "./pages/CreatePassword";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import AIMitra from "./pages/AIMitra";
import TodaysLesson from "./pages/TodaysLesson";
import PracticeTest from "./pages/PracticeTest";
import QuickRevision from "./pages/QuickRevision";
import SubjectDetails from "./pages/SubjectDetails";
import NCERTLibrary from "./pages/NCERTLibrary";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/profile-setup" element={<ProfileSetup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ai-mitra" element={<AIMitra />} />
          <Route path="/todays-lesson" element={<TodaysLesson />} />
          <Route path="/practice-test" element={<PracticeTest />} />
          <Route path="/quick-revision" element={<QuickRevision />} />
          <Route path="/subject/:subjectId" element={<SubjectDetails />} />
          <Route path="/library" element={<NCERTLibrary />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
