import React from 'react';
import { TrendingUp, Shield, Zap, Award, ArrowRight, Play, Star, Quote, Calendar } from 'lucide-react';

interface HeroProps {
  onViewPlans: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewPlans }) => {
  const reviews = [
    {
      name: "M.S.",
      role: "Empresário, 42 anos",
      content: "Comecei com 1x e em 3 meses já estava gerando mais de R$ 2.000 mensais. Consegui deixar ansiedade de lado e hoje diversifico através de Portfólios de IA.",
      rating: 5
    },
    {
      name: "A.R.",
      role: "Médica, 38 anos", 
      content: "A combinação de inteligência artificial com meus investimentos em renda fixa triplicou meus rendimentos mensais.",
      rating: 5
    },
    {
      name: "C.L.",
      role: "Engenheiro, 35 anos",
      content: "Tecnologia impressionante. Os algoritmos operam 24/7 sem interferência emocional. Resultados consistentes mês após mês.",
      rating: 5
    }
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white overflow-hidden">
      {/* Tech Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-cyan-500/10 border border-cyan-400/20 rounded-full text-cyan-300 text-sm font-medium mb-8 backdrop-blur-sm">
            <Zap className="h-4 w-4 mr-2" />
            Parceria Exclusiva BTG Pactual - Apenas 50 Vagas Disponíveis
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Portfólios de IA BTG Pactual - Copy Trading Automatizado
            </span>
          </h1>

          <h2 className="text-xl md:text-2xl font-light mb-8 text-slate-300 max-w-4xl mx-auto">
            Plug & Play via BTG Pactual - Comece a Operar Sem Conhecimento Prévio com Spreads Baixos e Execução Rápida
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={onViewPlans}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center"
            >
              Escolher Portfólio
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
              className="group px-8 py-4 border border-slate-600 text-slate-300 font-semibold rounded-lg hover:bg-slate-800/50 hover:border-cyan-500/50 transition-all flex items-center justify-center backdrop-blur-sm"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Agendar Reunião
            </button>
          </div>

          {/* Visual Features with Images */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16 text-sm">
            <div className="flex items-center space-x-2 text-cyan-300">
              <Zap className="h-5 w-5" />
              <span>Plug & Play</span>
            </div>
            <div className="flex items-center space-x-2 text-green-300">
              <Shield className="h-5 w-5" />
              <span>Baixo Spread</span>
            </div>
            <div className="flex items-center space-x-2 text-yellow-300">
              <TrendingUp className="h-5 w-5" />
              <span>Ordens a Mercado</span>
            </div>
            <div className="flex items-center space-x-2 text-purple-300">
              <Award className="h-5 w-5" />
              <span>50 Vagas Limitadas</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 mb-1">Analista Responsável: Yallon Mazuti de Carvalho - CNPI-T 8964</p>
          <p className="text-xs text-slate-600">Resultados passados não garantem lucros futuros</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;