import React from 'react';
import { Bot, Brain, Zap, Target, TrendingUp, Shield, BarChart3, Cpu, Database, Eye } from 'lucide-react';

const QuantBrokerSection: React.FC = () => {
  const technologies = [
    {
      icon: Brain,
      title: 'IA de Previsão de Mercado',
      description: 'Algoritmos de machine learning que analisam padrões históricos e preveem movimentos futuros com precisão institucional',
      image: 'https://i.postimg.cc/cJsZXTY2/conceito-de-transformacao-digital-de-fundo-de-cerebro-de-tecnologia-de-ia.jpg'
    },
    {
      icon: Zap,
      title: 'Execução Ultra-Rápida',
      description: 'Tecnologia proprietária de execução em milissegundos com spreads reduzidos e ordens a mercado via BTG Pactual',
      image: 'https://i.postimg.cc/m2X60w0K/technology-7994887-1280.jpg'
    },
    {
      icon: Database,
      title: 'Análise de Big Data',
      description: 'Processamento de milhões de dados em tempo real para identificar oportunidades invisíveis ao olho humano',
      image: 'https://i.postimg.cc/DZRwjL7G/pessoa-no-escritorio-analisando-e-verificando-graficos-financeiros.jpg'
    }
  ];

  const strategies = [
    {
      icon: Target,
      title: '30+ Estratégias Próprias',
      description: 'Portfólio diversificado de estratégias quantitativas desenvolvidas internamente',
      stats: '30+ estratégias ativas'
    },
    {
      icon: Shield,
      title: 'Stop Curto & Alto Retorno',
      description: 'Anos de experiência em operações de alto risco-retorno com gestão rigorosa',
      stats: '+5 anos experiência'
    },
    {
      icon: BarChart3,
      title: 'Operação Simultânea',
      description: 'Todos os ativos operados simultaneamente para maximizar oportunidades',
      stats: 'Múltiplos ativos'
    }
  ];

  const differentials = [
    {
      icon: Cpu,
      title: 'Tecnologia Única',
      description: 'Desenvolvemos nossa própria stack tecnológica, desde algoritmos de IA até sistemas de execução, garantindo vantagem competitiva exclusiva.',
      highlight: 'Propriedade Intelectual'
    },
    {
      icon: Eye,
      title: 'Busca pela Perfeição',
      description: 'Obsessão por otimização contínua. Cada algoritmo é refinado constantemente para maximizar performance e minimizar riscos.',
      highlight: 'Melhoria Contínua'
    },
    {
      icon: Bot,
      title: 'Robôs Traders Avançados',
      description: 'Sistemas autônomos que operam 24/7 sem interferência emocional, tomando decisões baseadas puramente em dados e probabilidades.',
      highlight: 'Automação Total'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <Bot className="h-4 w-4 mr-2" />
            Tecnologia Proprietária de Última Geração
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Quem é a 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Quant Broker</span>
          </h2>
          <h3 className="text-xl text-gray-600 max-w-4xl mx-auto">
            Pioneiros em tecnologia de trading automatizado com IA, desenvolvemos soluções proprietárias 
            que combinam análise de dados avançada, previsão de mercado e execução ultra-rápida
          </h3>
        </div>

        {/* Technology Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {technologies.map((tech, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={tech.image} 
                alt={tech.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <tech.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h4>
                <p className="text-gray-600 leading-relaxed">{tech.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Competitive Differentials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Diferenciais Competitivos</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              O que nos torna únicos no mercado de trading automatizado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentials.map((diff, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <diff.icon className="h-10 w-10 text-white" />
                </div>
                <div className="mb-4">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    {diff.highlight}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-4">{diff.title}</h4>
                <p className="text-gray-600 leading-relaxed">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuantBrokerSection;