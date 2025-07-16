import React from 'react';
import { Bot, Zap, Clock, TrendingUp } from 'lucide-react';

const WhatIsAIPortfolio: React.FC = () => {
  const features = [
    {
      icon: Bot,
      title: 'Replicação Automática',
      description: 'Replica automaticamente as operações de traders profissionais sem precisar fazer nada manualmente.',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Algoritmos Avançados',
      description: 'Nossos algoritmos fazem todo o trabalho para você, operando 24/7 com estratégias testadas e otimizadas.',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Operação Contínua',
      description: 'O sistema opera continuamente, buscando oportunidades mesmo quando você não está acompanhando o mercado.',
      color: 'purple'
    },
    {
      icon: TrendingUp,
      title: 'Gestão Profissional',
      description: 'Estratégias desenvolvidas por profissionais com experiência em mesas proprietárias e capital institucional.',
      color: 'yellow'
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Portfólios de IA via BTG Pactual
          </h2>
          <h3 className="text-xl text-gray-600 max-w-3xl mx-auto">
            Parceria Exclusiva para Automação Total e Rendimento Passivo
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className={`inline-flex p-4 rounded-full mb-6 ${
                feature.color === 'blue' ? 'bg-blue-100' :
                feature.color === 'green' ? 'bg-green-100' :
                feature.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
              }`}>
                <feature.icon className={`h-8 w-8 ${
                  feature.color === 'blue' ? 'text-blue-600' :
                  feature.color === 'green' ? 'text-green-600' :
                  feature.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                }`} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-6">Tecnologia de Nível Institucional</h3>
            <p className="text-xl mb-8 text-blue-100">
              O Copy Invest utiliza algoritmos matemáticos quantitativos avançados que operam com base em modelos 
              estatísticos e análise de padrões de mercado, identificando oportunidades em tempo real.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-blue-300">Características Técnicas</h4>
                <ul className="space-y-2 text-left text-blue-100">
                  <li>• Algoritmos de alta frequência com baixa latência</li>
                  <li>• Operações na compra E na venda</li>
                  <li>• Gestão de risco automatizada</li>
                  <li>• Backtests com +10.000 operações históricas</li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <h4 className="text-lg font-semibold mb-4 text-green-300">Vantagens Operacionais</h4>
                <ul className="space-y-2 text-left text-green-100">
                  <li>• Lucro em qualquer cenário de mercado</li>
                  <li>• Ativos mais líquidos da B3</li>
                  <li>• Execução precisa e spreads reduzidos</li>
                  <li>• Estratégias validadas institucionalmente</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIsAIPortfolio;