import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import AssignmentDashboard from "pages/assignment-dashboard";
import AiProcessingCenter from "pages/ai-processing-center";
import AssignmentCreationWizard from "pages/assignment-creation-wizard";
import QualityAssuranceDashboard from "pages/quality-assurance-dashboard";
import ResearchLibrary from "pages/research-library";
import AssignmentEditor from "pages/assignment-editor";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<AssignmentDashboard />} />
        <Route path="/assignment-dashboard" element={<AssignmentDashboard />} />
        <Route path="/ai-processing-center" element={<AiProcessingCenter />} />
        <Route path="/assignment-creation-wizard" element={<AssignmentCreationWizard />} />
        <Route path="/quality-assurance-dashboard" element={<QualityAssuranceDashboard />} />
        <Route path="/research-library" element={<ResearchLibrary />} />
        <Route path="/assignment-editor" element={<AssignmentEditor />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;