import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Chatbot from "./components/Chatbot.tsx";

const Pricing = lazy(() => import("./pages/Pricing.tsx"));
const SectorPage = lazy(() => import("./pages/SectorPage.tsx"));
const Legal = lazy(() => import("./pages/Legal.tsx"));
const CaseStudy = lazy(() => import("./pages/CaseStudy.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/precios" element={<Suspense fallback={<div className="py-20" />}><Pricing /></Suspense>} />
          <Route path="/sectores/:slug" element={<Suspense fallback={<div className="py-20" />}><SectorPage /></Suspense>} />
          <Route path="/legal" element={<Suspense fallback={<div className="py-20" />}><Legal /></Suspense>} />
          <Route path="/caso/edommo" element={<Suspense fallback={<div className="py-20" />}><CaseStudy /></Suspense>} />
          <Route path="/blog" element={<Suspense fallback={<div className="py-20" />}><Blog /></Suspense>} />
          <Route path="/blog/:slug" element={<Suspense fallback={<div className="py-20" />}><BlogPost /></Suspense>} />
{/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Chatbot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
