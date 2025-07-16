import React from 'react';
import { ExternalLink, BarChart3, TrendingUp, Shield, Settings, BookOpen, Building2 } from 'lucide-react';

interface DashboardProps {
  onNavigateToTutorial?: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigateToTutorial }) => {
  const handleRedirectToResults = () => {
    window.open('https://tridar.log.br/login', '_blank');
  };

  const handleTutorial = () => {
    if (onNavigateToTutorial) {
      onNavigateToTutorial();
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-lg font-semibold text-gray-700">Parceria Exclusiva BTG Pactual</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Dashboard - Área do Cliente Portfólios de IA
          </h1>
          <h2 className="text-xl text-gray-600">
            Configure seu Copy Trade e acompanhe sua performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Tutorial de Ativação
            </h3>
            
            <p className="text-gray-600 mb-8">
              Aprenda como ativar seu Copy Trade no BTG Pactual + MetaTrader 5 em poucos passos simples.
            </p>

            <button
              onClick={handleTutorial}
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Iniciar Tutorial
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-10 w-10 text-blue-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Dashboard de Resultados
            </h3>
            
            <p className="text-gray-600 mb-8">
              Acompanhe suas operações, performance e resultados em tempo real através da nossa plataforma especializada.
            </p>

            <button
              onClick={handleRedirectToResults}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Acessar Dashboard de Resultados
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Alavancagem Extra
            </h3>
            
            <p className="text-gray-600 mb-8">
              Potencialize seus resultados com alavancagem adicional para maximizar oportunidades de mercado.
            </p>

            <button
              onClick={() => window.open('https://buy.stripe.com/4gw3fPePObfffiU3cP', '_blank')}
              className="inline-flex items-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Contratar Alavancagem
            </button>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">Recursos Disponíveis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Performance</h4>
              <p className="text-sm text-gray-600">Acompanhe seus resultados e métricas de performance</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <Shield className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Controle de Risco</h4>
              <p className="text-sm text-gray-600">Monitore o gerenciamento de risco automatizado</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-xl">
              <Settings className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h4 className="font-semibold text-gray-900 mb-2">Configurações</h4>
              <p className="text-sm text-gray-600">Ajuste suas preferências e parâmetros</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;