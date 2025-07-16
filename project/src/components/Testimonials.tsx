import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TestimonialData {
  name: string;
  months: number;
  leverage: number;
  monthlyAverage: number;
  results: number[];
  comment: string;
}

const testimonials: TestimonialData[] = [
  {
    name: "Carlos M.",
    months: 3,
    leverage: 2,
    monthlyAverage: 1.8,
    results: [12.4, -8.2, 7.6],
    comment: "Copy trade tem seus altos e baixos. Tive um mês ruim no segundo mês, mas no geral está compensando. A disciplina é fundamental."
  },
  {
    name: "Roberto S.",
    months: 6,
    leverage: 1,
    monthlyAverage: 2.1,
    results: [15.2, 18.1, -12.8, 14.9, 16.6, -9.3],
    comment: "Resultados consistentes com alavancagem 1x. Já passei por drawdowns, mas a estratégia se mantém sólida ao longo do tempo."
  },
  {
    name: "André L.",
    months: 1,
    leverage: 3,
    monthlyAverage: 8.5,
    results: [8.5],
    comment: "Primeiro mês foi positivo, mas sei que virão meses negativos. Por enquanto estou satisfeito com o copy trade."
  },
  {
    name: "Fernando R.",
    months: 12,
    leverage: 2,
    monthlyAverage: 1.2,
    results: [22.2, -13.8, 17.1, 12.4, -11.9, 24.6, 13.8, -8.1, 16.3, 11.7, 14.2, -10.8],
    comment: "Um ano completo de copy trade. Teve meses difíceis, especialmente no meio do ano, mas no geral superou minhas expectativas."
  },
  {
    name: "Marcos T.",
    months: 8,
    leverage: 4,
    monthlyAverage: 3.2,
    results: [18.2, -14.1, 22.3, 13.8, -12.7, 19.1, 14.6, -11.5],
    comment: "Alavancagem 4x traz mais volatilidade. Já tive perdas significativas, mas os ganhos compensam. Não é para qualquer um."
  },
  {
    name: "João P.",
    months: 2,
    leverage: 1,
    monthlyAverage: -1.3,
    results: [13.2, -15.8],
    comment: "Ainda estou aprendendo sobre copy trade. Segundo mês foi mais fraco, mas mantenho a confiança na estratégia."
  }
];

const MiniChart: React.FC<{ results: number[] }> = ({ results }) => {
  const maxValue = Math.max(...results.map(Math.abs));
  
  return (
    <div className="flex items-end space-x-1 h-16 mb-4">
      {results.map((value, index) => {
        const height = Math.abs(value) / maxValue * 60;
        const isPositive = value >= 0;
        
        return (
          <div
            key={index}
            className={`w-6 flex flex-col justify-end ${
              isPositive ? 'text-green-500' : 'text-red-500'
            }`}
          >
            <div
              className={`${
                isPositive ? 'bg-green-500' : 'bg-red-500'
              } rounded-t-sm transition-all duration-300 hover:opacity-80`}
              style={{ height: `${height}px` }}
            />
            <div className="text-xs text-center mt-1 text-gray-600">
              {index + 1}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Resultados Reais dos Portfólios de IA
          </h2>
          <h3 className="text-xl text-gray-600 max-w-3xl mx-auto">
            Veja os resultados mensais de clientes que usam nosso sistema de copy trade automatizado
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            // Calcular médias separadas
            const gains = testimonial.results.filter(r => r > 0);
            const losses = testimonial.results.filter(r => r < 0);
            const avgGain = gains.length > 0 ? gains.reduce((a, b) => a + b, 0) / gains.length : 0;
            const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((a, b) => a + b, 0) / losses.length) : 0;
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <div className="flex space-x-2 mt-1">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {testimonial.leverage}x Alavancagem
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {testimonial.months} {testimonial.months === 1 ? 'mês' : 'meses'}
                      </span>
                    </div>
                  </div>
                </div>

                <MiniChart results={testimonial.results} />

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Média de Ganhos:</span>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      <span className="font-bold text-green-600">
                        +{avgGain.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Média de Perdas:</span>
                    <div className="flex items-center">
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      <span className="font-bold text-red-600">
                        -{avgLoss.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic">
                  "{testimonial.comment}"
                </blockquote>

                <div className="mt-4 flex items-center text-sm text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Copy Trade Ativo
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Resultados passados não garantem resultados futuros. Copy trade envolve riscos.
          </p>
          <button 
            onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            Começar Copy Trade
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;