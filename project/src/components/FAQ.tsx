import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Shield, DollarSign, Settings, AlertTriangle, Play } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      icon: HelpCircle,
      question: "O que é um Portfólio de IA?",
      answer: "Um Portfólio de IA é um serviço de replicação automática de operações que permite que você copie as estratégias de traders profissionais sem precisar operar manualmente. Nossos algoritmos executam operações 24/7 com base em estratégias testadas e validadas.",
      color: "blue"
    },
    {
      icon: DollarSign,
      question: "Qual é o investimento mínimo recomendado?",
      answer: "O investimento mínimo varia por portfólio: Bitcoin (R$ 3.000), Mini Índice (R$ 5.000), Mini Dólar (R$ 10.000) e Portfólio Completo (R$ 15.000). Estes valores garantem uma gestão de risco adequada e permitem que os algoritmos operem com eficiência.",
      color: "green"
    },
    {
      icon: Settings,
      question: "Como funciona a integração com a corretora?",
      answer: "A integração é feita através do MetaTrader 5 via BTG Pactual. Após contratar o MT5 no BTG, você compartilha os dados de acesso conosco e configuramos o Copy Trade automaticamente. Todo o processo é seguro e você mantém controle total da sua conta.",
      color: "purple"
    },
    {
      icon: Play,
      question: "Posso usar em conta simulador?",
      answer: "Sim, você pode testar nossos algoritmos em conta demo/simulador antes de operar com dinheiro real. Recomendamos este processo para se familiarizar com o funcionamento do sistema e validar a performance antes do investimento real.",
      color: "orange"
    },
    {
      icon: AlertTriangle,
      question: "Quais são os riscos envolvidos?",
      answer: "Como qualquer investimento em renda variável, existe risco de perda do capital investido. Nossos algoritmos incluem gestão de risco automatizada com stops e controle de exposição, mas não garantem lucros. Recomendamos investir apenas o que você pode se permitir perder.",
      color: "red"
    },
    {
      icon: Shield,
      question: "Como faço para começar?",
      answer: "1) Escolha seu portfólio ideal, 2) Contrate o MetaTrader 5 no BTG Pactual, 3) Compartilhe os dados de acesso conosco, 4) Aguarde a ativação (até 2 horas úteis). Nossa equipe te acompanha em todo o processo de configuração.",
      color: "indigo"
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
            <HelpCircle className="h-4 w-4 mr-2" />
            Perguntas Frequentes
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            FAQ - Perguntas Frequentes sobre Portfólios de IA
          </h2>
          <h3 className="text-xl text-gray-600">
            Encontre respostas para as principais questões sobre nossos serviços
          </h3>
        </div>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                    item.color === 'blue' ? 'bg-blue-100' :
                    item.color === 'green' ? 'bg-green-100' :
                    item.color === 'purple' ? 'bg-purple-100' :
                    item.color === 'orange' ? 'bg-orange-100' :
                    item.color === 'red' ? 'bg-red-100' : 'bg-indigo-100'
                  }`}>
                    <item.icon className={`h-5 w-5 ${
                      item.color === 'blue' ? 'text-blue-600' :
                      item.color === 'green' ? 'text-green-600' :
                      item.color === 'purple' ? 'text-purple-600' :
                      item.color === 'orange' ? 'text-orange-600' :
                      item.color === 'red' ? 'text-red-600' : 'text-indigo-600'
                    }`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {item.question}
                  </h4>
                </div>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="pl-14">
                    <p className="text-gray-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-8">
            <h3 className="text-xl font-bold text-blue-900 mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-blue-800 mb-6">
              Nossa equipe de especialistas está pronta para esclarecer todas as suas questões
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contato WhatsApp
              </button>
              <button
                onClick={() => window.open('https://wa.me/5511911560276', '_blank')}
                className="px-6 py-3 border border-blue-300 text-blue-700 font-semibold rounded-lg hover:bg-blue-100 transition-colors"
              >
                Suporte WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;