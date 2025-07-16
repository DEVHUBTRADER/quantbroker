import React from 'react';
import { MapPin, TrendingUp, Users, Award } from 'lucide-react';

const LocationContent: React.FC = () => {
  const locations = [
    {
      city: "São Paulo",
      state: "SP",
      description: "Centro financeiro do Brasil, onde concentramos nossa expertise em trading algorítmico",
      keywords: "copy trading São Paulo, portfólio IA SP, trading automatizado Paulista"
    },
    {
      city: "Rio de Janeiro",
      state: "RJ",
      description: "Atendemos investidores cariocas com soluções de IA para o mercado financeiro",
      keywords: "copy trading Rio de Janeiro, robôs trading RJ, investimento IA Copacabana"
    },
    {
      city: "Belo Horizonte",
      state: "MG",
      description: "Expandindo para Minas Gerais com tecnologia de ponta em trading automatizado",
      keywords: "copy trading Belo Horizonte, portfólio IA MG, trading BH"
    }
  ];

  const serviceAreas = [
    "Portfólios de IA São Paulo",
    "Copy Trading Rio de Janeiro", 
    "Trading Automatizado Belo Horizonte",
    "Robôs de Trading Brasília",
    "IA Financeira Porto Alegre",
    "Algoritmos Trading Curitiba",
    "Copy Trade Salvador",
    "Portfólio IA Recife"
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Portfólios de IA em Todo o Brasil
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Atendemos investidores em todas as principais cidades brasileiras com 
            tecnologia de copy trading via BTG Pactual
          </p>
        </div>

        {/* Main Locations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {locations.map((location, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-xl font-bold text-gray-900">
                  {location.city} - {location.state}
                </h3>
              </div>
              
              <p className="text-gray-600 mb-6">{location.description}</p>
              
              <div className="text-xs text-gray-400 italic">
                {location.keywords}
              </div>
            </div>
          ))}
        </div>

        {/* Service Areas Grid */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Áreas de Atendimento - Copy Trading IA
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {serviceAreas.map((area, index) => (
              <div key={index} className="bg-blue-50 p-3 rounded-lg text-center">
                <span className="text-sm font-medium text-blue-800">{area}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Local SEO Content */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Por que Escolher Nossos Portfólios de IA no Brasil?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Presença Nacional</h4>
              <p className="text-gray-700 text-sm">
                Atendemos clientes em São Paulo, Rio de Janeiro, Belo Horizonte, Brasília, 
                Porto Alegre e todas as principais cidades brasileiras com suporte local.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Parceria BTG Pactual</h4>
              <p className="text-gray-700 text-sm">
                Operamos exclusivamente via BTG Pactual, garantindo segurança e 
                confiabilidade para investidores em todo território nacional.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Suporte Regional</h4>
              <p className="text-gray-700 text-sm">
                Equipe especializada conhece as particularidades de cada região, 
                oferecendo atendimento personalizado para cada localidade.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Tecnologia Nacional</h4>
              <p className="text-gray-700 text-sm">
                Algoritmos desenvolvidos no Brasil, adaptados ao mercado local 
                e regulamentações da CVM e Banco Central.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationContent;