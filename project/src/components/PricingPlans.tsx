import React from 'react';
import { Check, Star, TrendingUp, Shield, Building2 } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  minCapital: string;
  dailyRisk: string;
  features: string[];
  isRecommended?: boolean;
  isAvailable: boolean;
  leverage: string;
  riskControl: string;
}

interface PricingPlansProps {
  onSelectPlan: (planId: string) => void;
  billingPeriod: 'monthly' | 'semiannual' | 'annual';
  onToggleBilling: (period: 'monthly' | 'semiannual' | 'annual') => void;
  recommendedPlan?: string | null;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ onSelectPlan, billingPeriod, onToggleBilling, recommendedPlan }) => {
  const plans: Plan[] = [
    {
      id: 'bitcoin',
      name: 'Portfólio Bitcoin',
      description: 'Operações com Bitcoin Futuro na B3 via BTG Pactual — vagas limitadas',
      price: billingPeriod === 'annual' ? 'R$ 2.160,00' : billingPeriod === 'semiannual' ? 'R$ 1.440,00' : 'R$ 300,00',
      originalPrice: billingPeriod === 'annual' ? 'R$ 3.600,00' : billingPeriod === 'semiannual' ? 'R$ 1.800,00' : undefined,
      minCapital: 'R$ 3.000',
      dailyRisk: 'R$ 100 a R$ 200',
      leverage: 'Até 1x',
      riskControl: 'IA no Controle de Risco',
      features: [
        'Copy premium com execução sem spread',
        'Setup de tendência com inteligência artificial',
        'Operações via MetaTrader 5',
        'Compatível com contas BTG Pactual',
        'Sem necessidade de configurar parâmetros'
      ],
      isAvailable: true
    },
    {
      id: 'mini-indice',
      name: 'Portfólio Mini Índice',
      description: 'Ideal para operar com risco controlado e consistência',
      price: billingPeriod === 'annual' ? 'R$ 2.880,00' : billingPeriod === 'semiannual' ? 'R$ 1.920,00' : 'R$ 400,00',
      originalPrice: billingPeriod === 'annual' ? 'R$ 4.800,00' : billingPeriod === 'semiannual' ? 'R$ 2.400,00' : undefined,
      minCapital: 'R$ 5.000',
      dailyRisk: 'R$ 400 a R$ 600',
      leverage: 'Até 1x',
      riskControl: 'IA no Controle de Risco',
      features: [
        'Copy premium com baixo spread',
        'Robô inteligente com saídas e stops dinâmicos',
        'Operações via MetaTrader 5',
        'Copy Mini Índice',
        'Plano semestral no Pix ou em até 12x'
      ],
      isRecommended: true,
      isAvailable: true
    },
    {
      id: 'mini-dolar',
      name: 'Portfólio Mini Dólar',
      description: 'Projetado para aproveitar movimentos explosivos do dólar',
      price: billingPeriod === 'annual' ? 'R$ 3.960,00' : billingPeriod === 'semiannual' ? 'R$ 2.640,00' : 'R$ 550,00',
      originalPrice: billingPeriod === 'annual' ? 'R$ 6.600,00' : billingPeriod === 'semiannual' ? 'R$ 3.300,00' : undefined,
      minCapital: 'R$ 10.000',
      dailyRisk: 'R$ 600',
      leverage: 'Até 1x',
      riskControl: 'IA no Controle de Risco',
      features: [
        'Copy premium com baixo spread',
        'Robô inteligente com saídas e stops dinâmicos',
        'Operações via MetaTrader 5',
        'Copy Mini Dólar',
        'Plano semestral no Pix ou em até 12x'
      ],
      isAvailable: true
    },
    {
      id: 'portfolio-completo',
      name: 'Portfólio Completo',
      description: 'Acesso a todas as estratégias com gestão diversificada',
      price: billingPeriod === 'annual' ? 'R$ 5.400,00' : billingPeriod === 'semiannual' ? 'R$ 3.600,00' : 'R$ 750,00',
      originalPrice: billingPeriod === 'annual' ? 'R$ 9.000,00' : billingPeriod === 'semiannual' ? 'R$ 4.500,00' : undefined,
      minCapital: 'R$ 15.000',
      dailyRisk: 'R$ 400 a R$ 800',
      leverage: 'Até 1x',
      riskControl: 'IA no Controle de Risco',
      features: [
        'Copy premium com baixo spread',
        'Robô inteligente com saídas e stops dinâmicos',
        'Operações via MetaTrader 5',
        'Copy de todas as estratégias',
        'Plano semestral no Pix ou em até 12x'
      ],
      isRecommended: true,
      isAvailable: true
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Planos de Portfólios de IA - BTG Pactual
          </h2>
          <div className="flex justify-center space-x-8 mb-8">
            <button 
              onClick={() => onToggleBilling('monthly')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                billingPeriod === 'monthly' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Plano Mensal
            </button>
            <button 
              onClick={() => onToggleBilling('semiannual')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors relative ${
                billingPeriod === 'semiannual' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Plano Semestral (PIX ou 12x)
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                20% OFF
              </span>
            </button>
            <button 
              onClick={() => onToggleBilling('annual')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors relative ${
                billingPeriod === 'annual' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              Plano Anual (PIX ou 12x)
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                40% OFF
              </span>
            </button>
          </div>
          
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700 font-medium">
              💳 <span className="text-blue-600">Planos Semestrais e Anuais:</span> Pagamento no PIX ou em até 12x no cartão
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg p-8 border-2 transition-all hover:shadow-xl ${
                plan.isRecommended || plan.id === recommendedPlan
                  ? 'border-blue-500 transform scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {(plan.isRecommended || plan.id === recommendedPlan) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    {plan.id === recommendedPlan ? 'RECOMENDADO PARA VOCÊ' : 'RECOMENDADO'}
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    {plan.leverage}
                  </span>
                  <span className="text-xs text-gray-500">{plan.riskControl}</span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                
                <div className="mb-4">
                  <span className="text-sm text-gray-500">A partir de</span>
                  {plan.originalPrice && (
                    <div className="text-lg text-gray-400 line-through">{plan.originalPrice}</div>
                  )}
                  <div className="text-3xl font-bold text-gray-900">{plan.price}</div>
                  <div className="text-sm text-gray-500">
                    {billingPeriod === 'annual' ? 'Plano anual' : billingPeriod === 'semiannual' ? 'Plano semestral' : 'Plano mensal'} | Capital mínimo: {plan.minCapital}
                  </div>
                  <div className="text-sm text-gray-600">Risco diário: {plan.dailyRisk}</div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onSelectPlan(plan.id)}
                disabled={!plan.isAvailable}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                  plan.isRecommended || plan.id === recommendedPlan
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                } ${!plan.isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {plan.id === 'bitcoin' ? 'Entrar na Fila de Espera' : 
                 billingPeriod === 'monthly' ? 'Contratar Agora' : 'Falar com Suporte'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Apenas 50 vagas disponíveis - Para planos semestrais e anuais, entre em contato com nossa equipe
          </p>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;