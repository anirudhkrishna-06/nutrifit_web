import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RedirectHandler from './components/RedirectHandler';
import { OnboardingProvider } from './contexts/OnboardingContext';

// Onboarding Pages
import WelcomePage from './pages/onboarding/WelcomePage';
import BasicInfoPage from './pages/onboarding/BasicInfoPage';
import ActivityPage from './pages/onboarding/ActivityPage';
import GoalPage from './pages/onboarding/GoalPage';
import LifestylePage from './pages/onboarding/LifestylePage';
import ProcessingPage from './pages/onboarding/ProcessingPage';

function App() {
  return (
    <OnboardingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <RedirectHandler>
              <HomePage />
            </RedirectHandler>
          } />

          {/* Onboarding Routes */}
          <Route path="/onboarding/welcome" element={
            <RedirectHandler>
              <WelcomePage />
            </RedirectHandler>
          } />
          <Route path="/onboarding/basic-info" element={
            <RedirectHandler>
              <BasicInfoPage />
            </RedirectHandler>
          } />
          <Route path="/onboarding/activity" element={
            <RedirectHandler>
              <ActivityPage />
            </RedirectHandler>
          } />
          <Route path="/onboarding/goal" element={
            <RedirectHandler>
              <GoalPage />
            </RedirectHandler>
          } />
          <Route path="/onboarding/lifestyle" element={
            <RedirectHandler>
              <LifestylePage />
            </RedirectHandler>
          } />
          <Route path="/onboarding/processing" element={
            <RedirectHandler>
              <ProcessingPage />
            </RedirectHandler>
          } />

          {/* Legacy Redirect */}
          <Route path="/onboarding/start" element={<Navigate to="/onboarding/welcome" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </OnboardingProvider>
  );
}

export default App;