import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, AlertTriangle, ExternalLink, Building2, MessageCircle } from 'lucide-react';

interface TutorialProps {
  onNavigateToTutorial?: () => void;
}

const Tutorial: React.FC<TutorialProps> = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleDashboardRedirect = () => {
    // Redirect to dashboard view
    window.location.hash = 'dashboard';
    window.location.reload();
  };

  const steps = [
    {
      title: 'Contratar Portfólio de IA Desejado',
      description: 'Escolha entre os Portfólios de IA disponíveis: Mini Índice, Bitcoin ou Mini Dólar.',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Portfólios de IA Disponíveis</h4>
            <p className="text-blue-800">
              Escolha o Portfólio de IA que melhor se adequa ao seu perfil e capital disponível.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Portfólios Disponíveis:</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                <h5 className="font-semibold text-orange-900 mb-2">Portfólio Bitcoin</h5>
                <p className="text-sm text-orange-800">Capital mínimo: R$ 3.000</p>
                <p className="text-xs text-orange-600">Operações com Bitcoin Futuro</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h5 className="font-semibold text-blue-900 mb-2">Portfólio Mini Índice</h5>
                <p className="text-sm text-blue-800">Capital mínimo: R$ 5.000</p>
                <p className="text-xs text-blue-600">Operações com Mini Índice Bovespa</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-900 mb-2">Portfólio Mini Dólar</h5>
                <p className="text-sm text-green-800">Capital mínimo: R$ 10.000</p>
                <p className="text-xs text-green-600">Operações com Mini Dólar Futuro</p>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-medium text-purple-900 mb-2">💡 Recomendação</h5>
            <p className="text-sm text-purple-800">
              Para máxima diversificação, considere o <strong>Portfólio Completo</strong> que inclui 
              acesso a todas as estratégias com gestão integrada de risco.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Contratar Plataforma MetaTrader 5 no BTG',
      description: 'Configure sua conta no BTG Pactual para operar com o MetaTrader 5.',
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-900">IMPORTANTE</h4>
                <p className="text-yellow-800 text-sm">
                  Certifique-se de selecionar o modo NETTING. O modo incorreto pode gerar perdas irreversíveis.
                </p>
              </div>
            </div>
          </div>
          
          {/* Tutorial Images */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Passo a passo visual no app BTG:</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <img 
                  src="https://imagizer.imageshack.com/img924/7572/bfK7e0.png" 
                  alt="Tela inicial do BTG - Produtos de Investimento"
                  className="w-full h-auto rounded-lg border border-gray-200 mb-3"
                />
                <h5 className="font-medium text-gray-900 mb-2">1. Acesse Produtos de Investimento</h5>
                <p className="text-sm text-gray-600">
                  Na tela inicial do app BTG, localize e toque em "Produtos de Investimento"
                </p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <img 
                  src="https://imagizer.imageshack.com/img924/7681/SQJHxg.png" 
                  alt="Menu Plataformas - Algoritmos - MetaTrader 5"
                  className="w-full h-auto rounded-lg border border-gray-200 mb-3"
                />
                <h5 className="font-medium text-gray-900 mb-2">2. Navegue até MetaTrader 5</h5>
                <p className="text-sm text-gray-600">
                  Siga: Plataformas → Algoritmos → MetaTrader 5
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Passos para contratar:</h4>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Acesse a área de <strong>Produtos de Investimento</strong></li>
              <li>Clique na aba <strong>Plataformas</strong></li>
              <li>Selecione <strong>Algoritmos</strong></li>
              <li>Localize e contrate o <strong>MetaTrader 5</strong></li>
              <li>Na configuração, selecione o modo <strong>NETTING</strong></li>
            </ol>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Caminho completo:</h5>
            <p className="text-sm text-blue-800">
              Produtos de Investimento {'->'} Plataformas {'->'} Algoritmos {'->'} MetaTrader 5
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Acesso à área de Renda Variável</h5>
              <p className="text-sm text-gray-600">Navegue até a seção correta no BTG</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h5 className="font-medium text-gray-900 mb-2">Contratação do MetaTrader 5</h5>
              <p className="text-sm text-gray-600">Configure a plataforma no modo NETTING</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Cadastro na Quant Broker',
      description: 'Acesse o formulário de cadastro para ativação do seu Portfólio de IA.',
      content: (
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-900 mb-2">Acesso ao Formulário</h4>
            <p className="text-green-800 text-sm">
              Clique no botão abaixo para acessar o formulário de cadastro e iniciar o processo de ativação do seu Portfólio de IA.
            </p>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => window.open('https://form.respondi.app/MnbrQZ6E', '_blank')}
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ExternalLink className="h-5 w-5 mr-2" />
              Acessar Formulário de Cadastro
            </button>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-blue-800 text-sm">
              <strong>Importante:</strong> O formulário será aberto em uma nova aba. Após preenchê-lo, 
              retorne a esta página para continuar com o próximo passo.
            </p>
          </div>
        </div>
      )
    },
    {
      title: 'Enviar Dados de Acesso para Quant Broker',
      description: 'Envie os dados de acesso do MetaTrader 5 recebidos por email diretamente para a equipe Quant Broker.',
      content: (
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Dados necessários:</h4>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-blue-600" />Login do MetaTrader 5</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-blue-600" />Senha de acesso</li>
              <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-blue-600" />Servidor de conexão</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Como enviar os dados:</h4>
            <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
                className="flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Enviar Dados via WhatsApp
              </button>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-700 text-sm">
              <strong>Tempo de ativação:</strong> Após o envio dos dados, a ativação será realizada em até 2 horas úteis.
              Você receberá uma confirmação por email quando seu Portfólio de IA estiver ativo.
            </p>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Building2 className="h-8 w-8 text-blue-600 mr-3" />
            <span className="text-lg font-semibold text-gray-700">Parceria Exclusiva BTG Pactual</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tutorial: Como Ativar seu Portfólio de IA BTG Pactual
          </h1>
          <h2 className="text-xl text-gray-600">
            Siga este tutorial passo a passo para ativar seu Portfólio de IA via BTG Pactual + MetaTrader 5
          </h2>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    index <= currentStep
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  }`}
                >
                  {index < currentStep ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 w-full mx-4 ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4">
              {currentStep + 1}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {steps[currentStep].title}
              </h3>
              <p className="text-gray-600 mt-1">
                {steps[currentStep].description}
              </p>
            </div>
          </div>

          <div className="mb-8">
            {steps[currentStep].content}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentStep === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Anterior
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={nextStep}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Próximo
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleDashboardRedirect}
                className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Voltar ao Dashboard
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Precisa de ajuda?
          </h3>
          <p className="text-blue-800 mb-4">
            Nossa equipe de suporte está disponível para ajudar você em qualquer etapa do processo.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
              className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Contato WhatsApp
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
              className="flex items-center justify-center px-4 py-2 border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Suporte Técnico
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;