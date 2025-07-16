import React, { useState } from 'react';
import { Plus, Edit3, Save, X } from 'lucide-react';

interface MonthData {
  month: string;
  year: number;
  bitcoin: number | null;
  miniIndice: number | null;
  miniDolar: number | null;
  portfolio: number | null;
}

interface AdminSectionProps {
  isAdmin: boolean;
  onAddMonth: (monthData: MonthData) => void;
  onUpdateMonth: (monthKey: string, asset: string, value: number | null) => void;
  selectedAsset: string;
}

const AdminSection: React.FC<AdminSectionProps> = ({ 
  isAdmin, 
  onAddMonth, 
  onUpdateMonth, 
  selectedAsset 
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [newMonthData, setNewMonthData] = useState<Partial<MonthData>>({
    month: '',
    year: new Date().getFullYear(),
    bitcoin: null,
    miniIndice: null,
    miniDolar: null,
    portfolio: null
  });

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const handleAddMonth = () => {
    if (newMonthData.month && newMonthData.year) {
      const newMonth: MonthData = {
        month: newMonthData.month,
        year: newMonthData.year,
        bitcoin: newMonthData.bitcoin || null,
        miniIndice: newMonthData.miniIndice || null,
        miniDolar: newMonthData.miniDolar || null,
        portfolio: newMonthData.portfolio || null
      };
      onAddMonth(newMonth);
      setNewMonthData({
        month: '',
        year: new Date().getFullYear(),
        bitcoin: null,
        miniIndice: null,
        miniDolar: null,
        portfolio: null
      });
      setShowAddForm(false);
    }
  };

  // Don't render anything if not admin
  if (!isAdmin) {
    return null;
  }

  return (
    <>
      {/* Admin Add Month Button */}
      <div className="flex justify-center mb-4">
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Mês
        </button>
      </div>

      {/* Add Month Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Adicionar Novo Mês</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mês</label>
                <select
                  value={newMonthData.month || ''}
                  onChange={(e) => setNewMonthData({...newMonthData, month: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Selecione o mês</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
                <input
                  type="number"
                  value={newMonthData.year || ''}
                  onChange={(e) => setNewMonthData({...newMonthData, year: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bitcoin %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMonthData.bitcoin || ''}
                    onChange={(e) => setNewMonthData({...newMonthData, bitcoin: parseFloat(e.target.value) || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mini Índice %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMonthData.miniIndice || ''}
                    onChange={(e) => setNewMonthData({...newMonthData, miniIndice: parseFloat(e.target.value) || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mini Dólar %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMonthData.miniDolar || ''}
                    onChange={(e) => setNewMonthData({...newMonthData, miniDolar: parseFloat(e.target.value) || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portfólio %</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newMonthData.portfolio || ''}
                    onChange={(e) => setNewMonthData({...newMonthData, portfolio: parseFloat(e.target.value) || null})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleAddMonth}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSection;