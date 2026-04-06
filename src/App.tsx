import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { AppLayout } from "@/components/layout/AppLayout";
import { PublicLayout } from "@/components/layout/PublicLayout";

import LandingPage from "@/pages/public/LandingPage";
import LoginPage from "@/pages/auth/LoginPage";
import DashboardPage from "@/pages/app/DashboardPage";
import AcademicPage from "@/pages/app/AcademicPage";
import FinancePage from "@/pages/app/FinancePage";
import KnowledgePage from "@/pages/app/KnowledgePage";
import ChatPage from "@/pages/app/ChatPage";
import FeedPage from "@/pages/app/FeedPage";
import NotificationsPage from "@/pages/app/NotificationsPage";
import {
  SettingsPage,
  MenuPage,
} from "@/pages/app/PlaceholderPages";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/features" element={<LandingPage />} />
            <Route path="/contact" element={<LandingPage />} />
            <Route path="/apply" element={<LandingPage />} />
          </Route>

          {/* Auth */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<LoginPage />} />

          {/* App shell */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="academic/*" element={<AcademicPage />} />
            <Route path="finance/*" element={<FinancePage />} />
            <Route path="knowledge/*" element={<KnowledgePage />} />
            <Route path="chat/*" element={<ChatPage />} />
            <Route path="feed" element={<FeedPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="search" element={<DashboardPage />} />
            <Route path="profile" element={<SettingsPage />} />
            <Route path="student/*" element={<DashboardPage />} />
            <Route path="teacher/*" element={<DashboardPage />} />
            <Route path="guardian/*" element={<DashboardPage />} />
            <Route path="admin/*" element={<DashboardPage />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
