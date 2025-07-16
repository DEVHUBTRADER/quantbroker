import React from 'react';
import { TrendingUp, Building2 } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://i.postimg.cc/GhnKd5J5/Chat-GPT-Image-13-de-jul-de-2025-18-07-15.png" 
              alt="Quant Broker Logo" 
             className="h-10 w-10 rounded-lg"
            />
            <span className="text-gray-400">×</span>
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Quant Broker × BTG Pactual
            </span>
          </div>
          
          {/* Risk Warning */}
          <div className="text-center space-y-4 max-w-4xl">
            <div className="bg-yellow-900/30 border border-yellow-600/50 rounded-lg p-4">
              <h3 className="text-yellow-400 font-semibold mb-2">⚠️ AVISO IMPORTANTE SOBRE RISCO</h3>
              <p className="text-yellow-200 text-sm leading-relaxed">
                <strong>Renda Variável:</strong> Os investimentos em renda variável estão sujeitos a riscos e podem resultar em perdas patrimoniais. 
                Rentabilidades passadas não garantem resultados futuros. É recomendável a leitura cuidadosa do regulamento antes de investir.
              </p>
            </div>
            
            <div className="text-gray-400 text-sm space-y-2">
              <p>
                <strong>Analista Responsável:</strong> Yallon Mazuti de Carvalho - CNPI-T 8964
              </p>
              <p>
                Este material é de caráter exclusivamente informativo e não constitui recomendação de investimento.
              </p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Quant Broker. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;