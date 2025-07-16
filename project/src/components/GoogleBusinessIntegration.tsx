import React from 'react';
import { Star, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';

const GoogleBusinessIntegration: React.FC = () => {
  return (
    <div className="bg-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Google Business Profile Preview */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            📍 Encontre-nos no Google
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-lg font-bold text-blue-600">
                  Quant Broker - Portfólios de IA BTG Pactual
                </h4>
                <p className="text-sm text-gray-600">Serviços Financeiros • Copy Trading</p>
                
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">4.8 (127 avaliações)</span>
                </div>
              </div>
              
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700">
                Contato
              </button>
            </div>
            
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                <span>Av. Paulista, 1000 - São Paulo, SP</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                <span>(11) 91156-0276</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-gray-500" />
                <span>Aberto • Fecha às 18:00</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                "Portfólios de IA com Copy Trading automatizado via BTG Pactual. 
                Robôs inteligentes operando Bitcoin, Mini Índice e Mini Dólar 24/7."
              </p>
            </div>
          </div>
        </div>

        {/* Google Business Setup Instructions */}
        <div className="bg-blue-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-blue-900 mb-4">
            🚀 Configuração Google Business Profile
          </h3>
          
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">1. Informações Básicas</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• <strong>Nome:</strong> Quant Broker - Portfólios de IA BTG Pactual</li>
                <li>• <strong>Categoria:</strong> Serviços Financeiros</li>
                <li>• <strong>Subcategoria:</strong> Consultoria de Investimentos</li>
                <li>• <strong>Descrição:</strong> Copy Trading automatizado com IA via BTG Pactual</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">2. Palavras-chave para Posts</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">copy trading</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">portfólio IA</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">BTG Pactual</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">trading automatizado</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">robôs trading</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">investimento IA</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">3. Conteúdo Sugerido para Posts</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• "Resultados mensais dos Portfólios de IA"</li>
                <li>• "Como funciona o Copy Trading via BTG Pactual"</li>
                <li>• "Depoimentos de clientes satisfeitos"</li>
                <li>• "Dicas de trading automatizado"</li>
                <li>• "Novidades em inteligência artificial financeira"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Review Management */}
        <div className="mt-8 bg-green-50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-green-900 mb-4">
            ⭐ Gestão de Avaliações
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Respostas Padrão Positivas</h4>
              <div className="bg-white rounded-lg p-3 text-sm text-gray-700">
                "Obrigado pela avaliação! Ficamos felizes que esteja satisfeito com nossos 
                Portfólios de IA. Continue acompanhando seus resultados e conte conosco 
                para qualquer dúvida. 🚀"
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Respostas para Críticas</h4>
              <div className="bg-white rounded-lg p-3 text-sm text-gray-700">
                "Agradecemos seu feedback. Nosso objetivo é sempre melhorar. Entre em 
                contato conosco pelo WhatsApp para resolvermos qualquer questão. 
                Estamos aqui para ajudar! 📞"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleBusinessIntegration;