import React, { useState } from 'react';
import { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingPlans from './components/PricingPlans';
import Dashboard from './components/Dashboard';
import Tutorial from './components/Tutorial';
import ResultsCalendar from './components/ResultsCalendar';
import LoginModal from './components/LoginModal';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import InvestmentComparison from './components/InvestmentComparison';
import WhatIsAIPortfolio from './components/WhatIsAIPortfolio';
import Testimonials from './components/Testimonials';
import PortfolioQuestionnaire from './components/PortfolioQuestionnaire';
import BenefitsSection from './components/BenefitsSection';
import QuantBrokerSection from './components/QuantBrokerSection';
import FAQ from './components/FAQ';
import AdminPanel from './components/AdminPanel';
import { supabase } from './lib/supabase';
import LocalSEO from './components/LocalSEO';
import LocationContent from './components/LocationContent';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'semiannual' | 'annual'>('monthly');
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [recommendedPlan, setRecommendedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      checkAdminStatus(session?.user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      checkAdminStatus(session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = (user: any) => {
    if (user?.email === 'pedropardal04@gmail.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentView('home');
  };

  const handleSelectPlan = (planId: string) => {
    if (planId === 'bitcoin') {
      if (isLoggedIn) {
        setCurrentView('tutorial');
      } else {
        setIsLoginModalOpen(true);
      }
    } else {
      // Direct to Stripe checkout for other plans
      const stripeLinks = {
        'mini-indice': 'https://buy.stripe.com/cN217HePO833c6IcNo',
        'mini-dolar': 'https://buy.stripe.com/8wM03DgXW3MNc6I3cf',
        'portfolio-completo': 'https://buy.stripe.com/7sY5kD4Hravx7XYfeK9R60O'
      };
      
      const link = stripeLinks[planId as keyof typeof stripeLinks];
      if (link) {
        window.open(link, '_blank');
      }
    }
  };

  const handleQuestionnaireComplete = (recommendation: string) => {
    setRecommendedPlan('portfolio-completo'); // Always recommend portfolio completo
    setIsQuestionnaireOpen(false);
    setCurrentView('plans');
    // Scroll to pricing section after a brief delay
    setTimeout(() => {
      const pricingSection = document.getElementById('pricing-section');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };
  const handleResultsClick = () => {
    if (isLoggedIn) {
      setCurrentView('results');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleViewChange = (view: string) => {
    if (view === 'results') {
      handleResultsClick();
    } else if (view === 'tutorial') {
      setCurrentView('tutorial');
    } else {
      setCurrentView(view);
    }
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return isLoggedIn ? <Dashboard onNavigateToTutorial={() => setCurrentView('tutorial')} /> : <div>Acesso negado</div>;
      case 'admin':
        return isLoggedIn ? <AdminPanel /> : (
          <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acesso Restrito</h2>
              <p className="text-gray-600 mb-6">Você precisa estar logado para acessar o painel administrativo.</p>
              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Fazer Login
              </button>
            </div>
          </div>
        );
      case 'tutorial':
        return <Tutorial />;
      case 'plans':
        return (
          <div className="min-h-screen">
            <PricingPlans 
              onSelectPlan={handleSelectPlan} 
              billingPeriod={billingPeriod}
              onToggleBilling={setBillingPeriod}
              recommendedPlan={recommendedPlan}
            />
          </div>
        );
      case 'results':
        return (
          <ResultsCalendar />
        );
      case 'faq':
        return <FAQ />;
      default:
        return (
          <div id="home-section">
            <Hero onViewPlans={() => setCurrentView('plans')} />
            <QuantBrokerSection />
            <WhatIsAIPortfolio />
            <LocationContent />
            <div id="pricing-section">
              <PricingPlans 
                onSelectPlan={handleSelectPlan} 
                billingPeriod={billingPeriod}
                onToggleBilling={setBillingPeriod}
                recommendedPlan={recommendedPlan}
              />
            </div>
            <InvestmentComparison />
            <BenefitsSection />
            <Testimonials />
            <FAQ />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <LocalSEO />
      <Header
        currentView={currentView}
        onViewChange={handleViewChange}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        onLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
      />
      
      {renderCurrentView()}
      
      <Footer />
      
      <FloatingActions onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)} />
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
      
      {isQuestionnaireOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <PortfolioQuestionnaire
            onComplete={handleQuestionnaireComplete}
            onClose={() => setIsQuestionnaireOpen(false)}
          />
        </div>
      )}
      
      <FloatingActions 
        onOpenQuestionnaire={() => setIsQuestionnaireOpen(true)}
        onNavigateToPlans={() => setCurrentView('plans')}
      />
    </div>
  );
}

export default App;