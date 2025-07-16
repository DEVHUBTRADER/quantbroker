import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle, DollarSign, TrendingUp, Shield, Zap, X } from 'lucide-react';

// RD Station integration
declare global {
  interface Window {
    RdIntegration?: any;
  }
}

interface QuestionnaireProps {
  onComplete: (recommendation: string) => void;
  onClose: () => void;
}

const PortfolioQuestionnaire: React.FC<QuestionnaireProps> = ({ onComplete, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');

  // Load RD Station script
  React.useEffect(() => {
    if (!window.RdIntegration) {
      const script = document.createElement('script');
      script.src = 'https://d335luupugsy2.cloudfront.net/js/rdstation-forms/stable/rdstation-forms.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const questions = [
    {
      id: 'contact',
      title: 'Vamos começar com seus dados de contato',
      isContactForm: true
    },
    {
      id: 'capital',
      title: 'Qual é o seu capital disponível para investimento?',
      options: [
        { value: 'low', label: 'R$ 3.000 - R$ 10.000', description: 'Capital inicial para começar' },
        { value: 'medium', label: 'R$ 10.000 - R$ 50.000', description: 'Capital intermediário' },
        { value: 'high', label: 'R$ 50.000+', description: 'Capital alto para diversificação' }
      ]
    },
    {
      id: 'risk',
      title: 'Qual é o seu perfil de risco?',
      options: [
        { value: 'conservative', label: 'Conservador', description: 'Prefiro menor risco e retornos estáveis' },
        { value: 'moderate', label: 'Moderado', description: 'Aceito risco moderado por melhores retornos' },
        { value: 'aggressive', label: 'Arrojado', description: 'Aceito alto risco por altos retornos' }
      ]
    },
    {
      id: 'experience',
      title: 'Qual é a sua experiência com investimentos?',
      options: [
        { value: 'beginner', label: 'Iniciante', description: 'Pouca ou nenhuma experiência' },
        { value: 'intermediate', label: 'Intermediário', description: 'Alguma experiência com investimentos' },
        { value: 'advanced', label: 'Avançado', description: 'Experiência significativa no mercado' }
      ]
    },
    {
      id: 'goal',
      title: 'Qual é o seu objetivo principal?',
      options: [
        { value: 'income', label: 'Renda Extra', description: 'Gerar renda mensal adicional' },
        { value: 'growth', label: 'Crescimento', description: 'Fazer o capital crescer no longo prazo' },
        { value: 'diversification', label: 'Diversificação', description: 'Diversificar minha carteira atual' }
      ]
    }
  ];

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommendation
      const recommendation = calculateRecommendation();
      const details = getRecommendationDetails(recommendation);
      
      // Send to RD Station
      try {
        if (window.RdIntegration && userEmail) {
          const answersText = Object.entries(answers).map(([key, value]) => `${key}: ${value}`).join(', ');
          
          window.RdIntegration.post({
            token_rdstation: '57e7abbb49395ca58551fe103433f9da',
            identificador: 'questionario-portfolio',
            email: userEmail,
            nome: userName || userEmail.split('@')[0],
            telefone: userPhone,
            cf_respostas_questionario: answersText,
            cf_recomendacao_portfolio: recommendation,
            tags: ['questionario', 'portfolio-recomendado', 'lead-qualificado']
          });
        }
      } catch (rdError) {
        console.warn('RD Station integration error:', rdError);
        // Continue with recommendation even if RD Station fails
      }
      
      // Show recommendation result
      setCurrentStep(questions.length); // Go to results step
      setRecommendationResult({ recommendation, details });
    }
  };

  const [recommendationResult, setRecommendationResult] = useState<{
    recommendation: string;
    details: any;
  } | null>(null);

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateRecommendation = () => {
    const { capital, risk, experience, goal } = answers;

    // Detailed recommendation logic based on user profile
    if (capital === 'low') {
      if (risk === 'conservative') {
        return 'mini-indice';
      } else {
        return 'bitcoin';
      }
    }

    if (capital === 'medium') {
      if (risk === 'conservative') {
        return 'mini-indice';
      } else if (risk === 'moderate') {
        return 'mini-dolar';
      } else {
        return 'portfolio-completo';
      }
    }

    if (capital === 'high') {
      if (experience === 'beginner') {
        return 'mini-indice';
      } else if (goal === 'diversification' || experience === 'advanced') {
        return 'portfolio-completo';
      } else {
        return 'mini-dolar';
      }
    }

    // Default
    return 'mini-indice';
  };

  const getRecommendationDetails = (recommendation: string) => {
    const { capital, risk, experience, goal } = answers;
    
    const recommendations = {
      'bitcoin': {
        title: 'Portfólio Bitcoin',
        subtitle: 'Ideal para seu perfil arrojado',
        description: 'Com base no seu perfil de risco arrojado e capital inicial, o Portfólio Bitcoin é perfeito para você. Oferece alta volatilidade com potencial de retornos expressivos.',
        benefits: [
          'Capital mínimo acessível (R$ 3.000)',
          'Alta volatilidade para perfil arrojado',
          'Exposição ao mercado de criptomoedas',
          'Operações automatizadas 24/7'
        ],
        reasoning: `Recomendamos este portfólio porque você tem ${capital === 'low' ? 'capital inicial' : 'capital disponível'} e perfil de risco ${risk === 'aggressive' ? 'arrojado' : 'moderado'}.`
      },
      'mini-indice': {
        title: 'Portfólio Mini Índice',
        subtitle: 'Equilibrio perfeito para seu perfil',
        description: 'Baseado no seu perfil conservador/moderado, o Mini Índice oferece consistência e menor volatilidade, ideal para quem busca crescimento estável.',
        benefits: [
          'Menor volatilidade e risco controlado',
          'Acompanha o índice Bovespa',
          'Ideal para perfil conservador/moderado',
          'Histórico de consistência'
        ],
        reasoning: `Perfeito para seu perfil ${risk === 'conservative' ? 'conservador' : 'moderado'} e ${experience === 'beginner' ? 'experiência iniciante' : 'busca por estabilidade'}.`
      },
      'mini-dolar': {
        title: 'Portfólio Mini Dólar',
        subtitle: 'Aproveitando movimentos do dólar',
        description: 'Com seu perfil moderado/arrojado e capital disponível, o Mini Dólar permite aproveitar a volatilidade cambial com gestão de risco inteligente.',
        benefits: [
          'Exposição ao mercado cambial',
          'Aproveita volatilidade do dólar',
          'Hedge natural contra inflação',
          'Diversificação de moedas'
        ],
        reasoning: `Ideal para seu perfil ${risk === 'moderate' ? 'moderado' : 'arrojado'} e objetivo de ${goal === 'growth' ? 'crescimento' : 'diversificação'}.`
      },
      'portfolio-completo': {
        title: 'Portfólio Completo',
        subtitle: 'Máxima diversificação para seu perfil',
        description: 'Com seu capital alto e experiência, o Portfólio Completo oferece acesso a todas as estratégias com diversificação automática e gestão profissional.',
        benefits: [
          'Acesso a todas as estratégias',
          'Diversificação automática',
          'Gestão de risco integrada',
          'Suporte prioritário'
        ],
        reasoning: `Recomendado pelo seu ${capital === 'high' ? 'alto capital disponível' : 'perfil experiente'} e ${goal === 'diversification' ? 'objetivo de diversificação' : 'experiência avançada'}.`
      }
    };

    return recommendations[recommendation as keyof typeof recommendations];
  };

  const currentQuestion = questions[currentStep];
  const isAnswered = currentStep >= questions.length || answers[currentQuestion?.id];

  return (
    <form className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto">
      {/* Hidden RD Station fields */}
      <input type="hidden" name="token_rdstation" value="57e7abbb49395ca58551fe103433f9da" />
      <input type="hidden" name="identificador" value="questionario-portfolio" />
      
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Encontre seu Portfólio Ideal
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
          <span className="text-sm text-gray-500">
            {currentStep >= questions.length ? 'Resultado' : `${currentStep + 1} de ${questions.length}`}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentStep >= questions.length ? 100 : ((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        {currentStep < questions.length ? (
          <>
            {currentQuestion.isContactForm ? (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="seu@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone (WhatsApp)
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="(11) 99999-9999"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion.title}
                </h3>

                <div className="space-y-4">
                  {currentQuestion.options?.map((option) => (
                    <button
                      type="button"
                      key={option.value}
                      onClick={() => handleAnswer(currentQuestion.id, option.value)}
                      className={`w-full p-4 text-left border-2 rounded-lg transition-all hover:shadow-md ${
                        answers[currentQuestion.id] === option.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-gray-900">{option.label}</div>
                          <div className="text-sm text-gray-600">{option.description}</div>
                        </div>
                        {answers[currentQuestion.id] === option.value && (
                          <CheckCircle className="h-6 w-6 text-blue-500" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          // Recommendation Result
          recommendationResult && (
           <>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {recommendationResult.details.title}
              </h3>
              <p className="text-lg text-blue-600 font-medium mb-6">
                {recommendationResult.details.subtitle}
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <p className="text-gray-700 mb-4">
                  {recommendationResult.details.description}
                </p>
                <p className="text-sm text-blue-800 font-medium">
                  {recommendationResult.details.reasoning}
                </p>
              </div>
            </div>
              
            <div className="text-left mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Por que este portfólio é ideal para você:</h4>
              <ul className="space-y-2">
                {recommendationResult.details.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
              
            <button
              type="button"
              onClick={() => onComplete(recommendationResult.recommendation)}
              className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              Ver Planos e Contratar Agora
            </button>
           </>
          )
        )}
      </div>

      {currentStep < questions.length && (
        <div className="flex justify-between">
          <button
            type="button"
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

          <button
            type={currentStep === questions.length - 1 ? 'submit' : 'button'}
            onClick={nextStep}
            disabled={!isAnswered && !(currentStep === 0 && userEmail && userName && userPhone)}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
              (!isAnswered && !(currentStep === 0 && userEmail && userName && userPhone))
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentStep === questions.length - 1 ? 'Ver Recomendação' : 'Próximo'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      )}
    </form>
  );
};

export default PortfolioQuestionnaire;