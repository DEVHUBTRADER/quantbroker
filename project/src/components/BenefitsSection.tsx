import React from 'react';
import { Shield, Zap, TrendingUp, Clock, Award, Users, BarChart3, CheckCircle } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: Zap,
      title: 'Execução Instantânea',
      description: 'Ordens executadas em milissegundos com spreads reduzidos via BTG Pactual',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: 'Gestão de Risco IA',
      description: 'Inteligência artificial monitora e controla riscos 24/7 automaticamente',
      color: 'blue'
    },
    {
      icon: TrendingUp,
      title: 'Performance Consistente',
      description: 'Estratégias testadas com mais de 10.000 operações históricas',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Operação Contínua',
      description: 'Robôs operam 24/7, mesmo quando você está dormindo ou trabalhando',
      color: 'purple'
    },
    {
      icon: Award,
      title: 'Tecnologia Institucional',
      description: 'Mesma tecnologia usada por fundos e mesas proprietárias',
      color: 'orange'
    },
    {
      icon: Users,
      title: 'Suporte Especializado',
      description: 'Equipe de especialistas disponível para orientação e suporte',
      color: 'indigo'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Por que escolher nossos 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Portfólios de IA?</span>
          </h2>
          <h3 className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta, resultados comprovados e a confiança da parceria com o BTG Pactual
          </h3>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
              <div className={`inline-flex p-4 rounded-xl mb-6 ${
                benefit.color === 'yellow' ? 'bg-yellow-100' :
                benefit.color === 'blue' ? 'bg-blue-100' :
                benefit.color === 'green' ? 'bg-green-100' :
                benefit.color === 'purple' ? 'bg-purple-100' :
                benefit.color === 'orange' ? 'bg-orange-100' : 'bg-indigo-100'
              }`}>
                <benefit.icon className={`h-8 w-8 ${
                  benefit.color === 'yellow' ? 'text-yellow-600' :
                  benefit.color === 'blue' ? 'text-blue-600' :
                  benefit.color === 'green' ? 'text-green-600' :
                  benefit.color === 'purple' ? 'text-purple-600' :
                  benefit.color === 'orange' ? 'text-orange-600' : 'text-indigo-600'
                }`} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h4>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BenefitsSection;