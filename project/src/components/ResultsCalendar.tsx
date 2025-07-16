import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, TrendingDown, BarChart3, Filter, MessageCircle, Plus, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import ResultsChart from './ResultsChart';
import AdminEditButton from './AdminEditButton';
import AdvancedStatistics from './AdvancedStatistics';

interface MonthData {
  id?: string;
  month: string;
  year: number;
  bitcoin: number | null;
  miniIndice: number | null;
  miniDolar: number | null;
  portfolio: number | null;
}

interface PerformanceMetrics {
  profitFactor: number;
  payoff: number;
  drawdown: number;
  winRate: number;
}

const ResultsCalendar: React.FC = () => {
  // Define months array
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const [chartAsset, setChartAsset] = useState<'bitcoin' | 'miniIndice' | 'miniDolar' | 'portfolio'>('portfolio');
  const [calendarAsset, setCalendarAsset] = useState<'bitcoin' | 'miniIndice' | 'miniDolar' | 'portfolio'>('portfolio');
  const [isAdmin, setIsAdmin] = useState(false);
  const [chartYear, setChartYear] = useState<number>(2024);
  const [calendarYear, setCalendarYear] = useState<number>(2024);
  const [monthlyData, setMonthlyData] = useState<MonthData[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([2024]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMonth, setEditingMonth] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [selectedAsset, setSelectedAsset] = useState<string>('portfolio');

  // Helper functions
  const getAssetDisplayName = (asset: string) => {
    switch (asset) {
      case 'bitcoin': return 'Bitcoin';
      case 'miniIndice': return 'Mini Índice';
      case 'miniDolar': return 'Mini Dólar';
      case 'portfolio': return 'Portfólio Completo';
      default: return asset;
    }
  };

  const getAssetValue = (monthData: MonthData, asset: string) => {
    switch (asset) {
      case 'bitcoin': return monthData.bitcoin;
      case 'miniIndice': return monthData.miniIndice;
      case 'miniDolar': return monthData.miniDolar;
      case 'portfolio': return monthData.portfolio;
      default: return null;
    }
  };

  // Data filtering
  const chartData = monthlyData.filter(d => d.year === chartYear);
  const calendarData = monthlyData.filter(d => d.year === calendarYear);

  // Calculate metrics
  const calculateMetrics = (data: MonthData[], asset: string) => {
    const values = data
      .map(d => getAssetValue(d, asset))
      .filter((v): v is number => v !== null);

    if (values.length === 0) {
      return {
        totalReturn: 0,
        winRate: 0,
        bestMonth: 0,
        worstMonth: 0
      };
    }

    const totalReturn = values.reduce((acc, val) => acc + val, 0);
    const positiveMonths = values.filter(v => v > 0).length;
    const winRate = (positiveMonths / values.length) * 100;
    const bestMonth = Math.max(...values);
    const worstMonth = Math.min(...values);

    return {
      totalReturn,
      winRate,
      bestMonth,
      worstMonth
    };
  };

  const metrics = calculateMetrics(calendarData, calendarAsset);

  // Admin functions
  const checkAdminStatus = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setIsAdmin(user?.email === 'pedropardal04@gmail.com');
    } catch (error) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    }
  };

  const fetchResults = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('monthly_results')
        .select('*')
        .order('year', { ascending: false })
        .order('month', { ascending: true });

      if (error) throw error;

      const formattedData: MonthData[] = data.map(item => ({
        id: item.id,
        month: item.month,
        year: item.year,
        bitcoin: item.bitcoin,
        miniIndice: item.mini_indice,
        miniDolar: item.mini_dolar,
        portfolio: item.portfolio
      }));

      setMonthlyData(formattedData);
    } catch (error) {
      console.error('Error fetching results:', error);
      setError('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMonth = async (monthData: Omit<MonthData, 'id'>) => {
    try {
      const { error } = await supabase
        .from('monthly_results')
        .insert({
          month: monthData.month,
          year: monthData.year,
          bitcoin: monthData.bitcoin,
          mini_indice: monthData.miniIndice,
          mini_dolar: monthData.miniDolar,
          portfolio: monthData.portfolio
        });

      if (error) throw error;

      await fetchResults();
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding month:', error);
      setError('Erro ao adicionar mês');
    }
  };

  const handleUpdateMonth = async (month: string, year: number, asset: string, value: number | null) => {
    try {
      const columnMap: { [key: string]: string } = {
        bitcoin: 'bitcoin',
        miniIndice: 'mini_indice',
        miniDolar: 'mini_dolar',
        portfolio: 'portfolio'
      };

      const { error } = await supabase
        .from('monthly_results')
        .update({ [columnMap[asset]]: value })
        .eq('month', month)
        .eq('year', year);

      if (error) throw error;

      await fetchResults();
    } catch (error) {
      console.error('Error updating month:', error);
      setError('Erro ao atualizar dados');
    }
  };

  const handleUpdateStatistics = async (asset: string, year: number, metrics: any) => {
    try {
      // Here you could save custom statistics to a separate table if needed
      // For now, we'll just show a success message
      console.log('Updating statistics for', asset, year, metrics);
      // You could implement a custom statistics table in Supabase here
    } catch (error) {
      console.error('Error updating statistics:', error);
      setError('Erro ao atualizar estatísticas');
    }
  };

  // Effects
  useEffect(() => {
    checkAdminStatus();
    fetchResults();
  }, []);

  // Update available years when data changes
  useEffect(() => {
    if (monthlyData.length > 0) {
      const years = [...new Set(monthlyData.map(d => d.year))].sort((a, b) => b - a);
      setAvailableYears(years);
      
      // Set initial years to most recent available year
      const mostRecentYear = years[0];
      if (mostRecentYear) {
        setChartYear(mostRecentYear);
        setCalendarYear(mostRecentYear);
      }
    }
  }, [monthlyData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Chart Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Gráfico de Performance
            </h2>
            
            {/* Chart Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <select
                  value={chartYear}
                  onChange={(e) => setChartYear(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select
                  value={chartAsset}
                  onChange={(e) => setChartAsset(e.target.value as any)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="bitcoin">Bitcoin</option>
                  <option value="miniIndice">Mini Índice</option>
                  <option value="miniDolar">Mini Dólar</option>
                  <option value="portfolio">Portfólio Completo</option>
                </select>
              </div>
            </div>
          </div>
          
          <ResultsChart 
            data={monthlyData} 
            asset={chartAsset}
            year={chartYear}
          />
        </div>

        {/* Advanced Statistics Section */}
        <AdvancedStatistics 
          data={monthlyData}
          asset={chartAsset}
          availableYears={availableYears}
          isAdmin={isAdmin}
        />

        {/* Calendar Section */}
        <div>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Calendar className="w-6 h-6" />
              Calendário de Resultados {calendarYear} - {getAssetDisplayName(calendarAsset)}
            </h2>
            
            {/* Calendar Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <select
                  value={calendarYear}
                  onChange={(e) => setCalendarYear(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm"
                >
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select
                  value={calendarAsset}
                  onChange={(e) => setCalendarAsset(e.target.value as any)}
                  className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-sm"
                >
                  <option value="bitcoin">Bitcoin</option>
                  <option value="miniIndice">Mini Índice</option>
                  <option value="miniDolar">Mini Dólar</option>
                  <option value="portfolio">Portfólio Completo</option>
                </select>
              </div>
              
              {isAdmin && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Mês
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center py-12">
              <div className="flex items-center gap-2 text-red-400">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
              </div>
            </div>
          ) : (
            <>
              {/* Calendar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {months.map((month) => {
                  const monthData = calendarData.find(d => d.month === month);
                  const value = monthData ? getAssetValue(monthData, calendarAsset) : null;
                  
                  return (
                    <div
                      key={month}
                      className={`relative p-6 rounded-xl border transition-all duration-200 hover:scale-105 ${
                        value === null
                          ? 'bg-slate-800/50 border-slate-600'
                          : value >= 0
                          ? 'bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30'
                          : 'bg-gradient-to-br from-red-900/30 to-red-800/20 border-red-500/30'
                      }`}
                    >
                      {isAdmin && (
                        <AdminEditButton
                          month={month}
                          year={calendarYear}
                          asset={calendarAsset}
                          currentValue={value}
                          onUpdate={handleUpdateMonth}
                        />
                      )}
                      
                      <div className="text-center">
                        <h3 className="text-lg font-semibold mb-1">{month}</h3>
                        <p className="text-sm text-gray-400 mb-3">{calendarYear}</p>
                        
                        {value !== null ? (
                          <div className={`text-2xl font-bold ${
                            value >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {value >= 0 ? '+' : ''}{value.toFixed(1)}%
                          </div>
                        ) : (
                          <div className="text-gray-500 text-lg">
                            Sem dados
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-400">Total Acumulado</span>
                  </div>
                  <div className={`text-2xl font-bold ${
                    metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metrics.totalReturn >= 0 ? '+' : ''}{metrics.totalReturn.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-400">Taxa de Acerto</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    {metrics.winRate.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Melhor Mês</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    +{metrics.bestMonth.toFixed(1)}%
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-600">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-gray-400">Pior Mês</span>
                  </div>
                  <div className="text-2xl font-bold text-red-400">
                    {metrics.worstMonth.toFixed(1)}%
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add Month Modal */}
      {showAddForm && isAdmin && (
        <AddMonthModal
          onAdd={handleAddMonth}
          onClose={() => setShowAddForm(false)}
          months={months}
          availableYears={availableYears}
        />
      )}
    </div>
  );
};

// Add Month Modal Component
interface AddMonthModalProps {
  onAdd: (monthData: Omit<MonthData, 'id'>) => void;
  onClose: () => void;
  months: string[];
  availableYears: number[];
}

const AddMonthModal: React.FC<AddMonthModalProps> = ({ onAdd, onClose, months, availableYears }) => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [bitcoin, setBitcoin] = useState('');
  const [miniIndice, setMiniIndice] = useState('');
  const [miniDolar, setMiniDolar] = useState('');
  const [portfolio, setPortfolio] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMonth) {
      alert('Por favor, selecione um mês');
      return;
    }

    onAdd({
      month: selectedMonth,
      year: selectedYear,
      bitcoin: bitcoin ? parseFloat(bitcoin) : null,
      miniIndice: miniIndice ? parseFloat(miniIndice) : null,
      miniDolar: miniDolar ? parseFloat(miniDolar) : null,
      portfolio: portfolio ? parseFloat(portfolio) : null
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Adicionar Novo Mês</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mês</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
              required
            >
              <option value="">Selecione um mês</option>
              {months.map(month => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ano</label>
            <input
              type="number"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Bitcoin (%)</label>
              <input
                type="number"
                step="0.1"
                value={bitcoin}
                onChange={(e) => setBitcoin(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mini Índice (%)</label>
              <input
                type="number"
                step="0.1"
                value={miniIndice}
                onChange={(e) => setMiniIndice(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Mini Dólar (%)</label>
              <input
                type="number"
                step="0.1"
                value={miniDolar}
                onChange={(e) => setMiniDolar(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                placeholder="0.0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Portfólio (%)</label>
              <input
                type="number"
                step="0.1"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2"
                placeholder="0.0"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
            >
              Adicionar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultsCalendar;