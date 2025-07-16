import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, Target, DollarSign, Percent, Calculator, Award, Edit3, Save, X, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MonthData {
  month: string;
  year: number;
  bitcoin: number | null;
  miniIndice: number | null;
  miniDolar: number | null;
  portfolio: number | null;
}

interface AdvancedStatisticsProps {
  data: MonthData[];
  asset: 'bitcoin' | 'miniIndice' | 'miniDolar' | 'portfolio';
  availableYears: number[];
  isAdmin?: boolean;
}

interface TradingMetrics {
  profitFactor: number;
  recoveryFactor: number;
  sharpeRatio: number;
  payoff: number;
  avgDailyGain: number;
  avgDailyLoss: number;
  dailyWinRate: number;
  maxDrawdown: number;
  totalReturn: number;
  volatility: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
}

const AdvancedStatistics: React.FC<AdvancedStatisticsProps> = ({ 
  data, 
  asset, 
  availableYears,
  isAdmin = false
}) => {
  const [selectedYear, setSelectedYear] = useState(availableYears[0] || 2024);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<TradingMetrics>({
    profitFactor: 0,
    recoveryFactor: 0,
    sharpeRatio: 0,
    payoff: 0,
    avgDailyGain: 0,
    avgDailyLoss: 0,
    dailyWinRate: 0,
    maxDrawdown: 0,
    totalReturn: 0,
    volatility: 0,
    winRate: 0,
    avgWin: 0,
    avgLoss: 0
  });
  const [editingMetrics, setEditingMetrics] = useState<TradingMetrics>(metrics);

  // Atualizar ano selecionado quando anos disponíveis mudarem
  useEffect(() => {
    if (availableYears.length > 0 && !availableYears.includes(selectedYear)) {
      setSelectedYear(availableYears[0]);
    }
  }, [availableYears, selectedYear]);

  // Carregar estatísticas quando asset ou ano mudarem
  useEffect(() => {
    loadStatistics();
  }, [asset, selectedYear]);

  const getAssetValue = (monthData: MonthData, assetType: string) => {
    switch (assetType) {
      case 'bitcoin': return monthData.bitcoin;
      case 'miniIndice': return monthData.miniIndice;
      case 'miniDolar': return monthData.miniDolar;
      case 'portfolio': return monthData.portfolio;
      default: return null;
    }
  };

  const getAssetDisplayName = (assetType: string) => {
    switch (assetType) {
      case 'bitcoin': return 'Bitcoin';
      case 'miniIndice': return 'Mini Índice';
      case 'miniDolar': return 'Mini Dólar';
      case 'portfolio': return 'Portfólio Completo';
      default: return assetType;
    }
  };

  const calculateMetricsFromData = (): TradingMetrics => {
    const filteredData = data.filter(d => d.year === selectedYear);
    const values = filteredData
      .map(d => getAssetValue(d, asset))
      .filter((v): v is number => v !== null);

    if (values.length === 0) {
      return {
        profitFactor: 0,
        recoveryFactor: 0,
        sharpeRatio: 0,
        payoff: 0,
        avgDailyGain: 0,
        avgDailyLoss: 0,
        dailyWinRate: 0,
        maxDrawdown: 0,
        totalReturn: 0,
        volatility: 0,
        winRate: 0,
        avgWin: 0,
        avgLoss: 0
      };
    }

    // Cálculos básicos
    const totalReturn = values.reduce((acc, val) => acc + val, 0);
    const positiveValues = values.filter(v => v > 0);
    const negativeValues = values.filter(v => v < 0);
    
    const winRate = (positiveValues.length / values.length) * 100;
    const avgWin = positiveValues.length > 0 ? positiveValues.reduce((a, b) => a + b, 0) / positiveValues.length : 0;
    const avgLoss = negativeValues.length > 0 ? Math.abs(negativeValues.reduce((a, b) => a + b, 0) / negativeValues.length) : 0;
    
    // Fator de Lucro = Lucro Bruto / Perda Bruta
    const grossProfit = positiveValues.reduce((a, b) => a + b, 0);
    const grossLoss = Math.abs(negativeValues.reduce((a, b) => a + b, 0));
    const profitFactor = grossLoss > 0 ? grossProfit / grossLoss : grossProfit > 0 ? 999 : 0;
    
    // Payoff = Ganho Médio / Perda Média
    const payoff = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? 999 : 0;
    
    // Volatilidade (desvio padrão)
    const mean = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = values.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / values.length;
    const volatility = Math.sqrt(variance);
    
    // Sharpe Ratio (simplificado: retorno / volatilidade)
    const sharpeRatio = volatility > 0 ? (totalReturn / values.length) / volatility : 0;
    
    // Cálculo do Drawdown Máximo
    let peak = 0;
    let maxDrawdown = 0;
    let cumulative = 0;
    
    values.forEach(value => {
      cumulative += value;
      if (cumulative > peak) {
        peak = cumulative;
      }
      const drawdown = peak - cumulative;
      if (drawdown > maxDrawdown) {
        maxDrawdown = drawdown;
      }
    });
    
    // Fator de Recuperação = Retorno Total / Drawdown Máximo
    const recoveryFactor = maxDrawdown > 0 ? totalReturn / maxDrawdown : totalReturn > 0 ? 999 : 0;
    
    // Métricas diárias (aproximação: mensal / 22 dias úteis)
    const avgDailyGain = avgWin / 22;
    const avgDailyLoss = avgLoss / 22;
    const dailyWinRate = winRate; // Aproximação simplificada
    
    return {
      profitFactor,
      recoveryFactor,
      sharpeRatio,
      payoff,
      avgDailyGain,
      avgDailyLoss,
      dailyWinRate,
      maxDrawdown,
      totalReturn,
      volatility,
      winRate,
      avgWin,
      avgLoss
    };
  };

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError(null);

      // Tentar carregar estatísticas personalizadas do banco
      const { data: customStats, error } = await supabase
        .from('trading_statistics')
        .select('*')
        .eq('asset', asset)
        .eq('year', selectedYear)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Nenhum registro encontrado - usar cálculos automáticos
          const calculatedMetrics = calculateMetricsFromData();
          setMetrics(calculatedMetrics);
          setEditingMetrics(calculatedMetrics);
        } else {
          console.error('Erro ao carregar estatísticas:', error);
          // Em caso de erro, usar cálculos automáticos
          const calculatedMetrics = calculateMetricsFromData();
          setMetrics(calculatedMetrics);
          setEditingMetrics(calculatedMetrics);
        }
        return;
      }

      if (customStats) {
        const loadedMetrics: TradingMetrics = {
          profitFactor: Number(customStats.profit_factor) || 0,
          recoveryFactor: Number(customStats.recovery_factor) || 0,
          sharpeRatio: Number(customStats.sharpe_ratio) || 0,
          payoff: Number(customStats.payoff) || 0,
          avgDailyGain: Number(customStats.avg_daily_gain) || 0,
          avgDailyLoss: Number(customStats.avg_daily_loss) || 0,
          dailyWinRate: Number(customStats.daily_win_rate) || 0,
          maxDrawdown: Number(customStats.max_drawdown) || 0,
          totalReturn: Number(customStats.total_return) || 0,
          volatility: Number(customStats.volatility) || 0,
          winRate: Number(customStats.win_rate) || 0,
          avgWin: Number(customStats.avg_win) || 0,
          avgLoss: Number(customStats.avg_loss) || 0
        };
        
        setMetrics(loadedMetrics);
        setEditingMetrics(loadedMetrics);
      }
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
      // Em caso de erro, usar cálculos automáticos
      const calculatedMetrics = calculateMetricsFromData();
      setMetrics(calculatedMetrics);
      setEditingMetrics(calculatedMetrics);
    } finally {
      setLoading(false);
    }
  };

  const handleEditStart = () => {
    setIsEditing(true);
    setEditingMetrics(metrics);
  };

  const handleSave = async () => {
    if (!isAdmin) return;
    
    try {
      setLoading(true);
      setError(null);

      const { error } = await supabase
        .from('trading_statistics')
        .upsert({
          asset: asset,
          year: selectedYear,
          profit_factor: editingMetrics.profitFactor,
          recovery_factor: editingMetrics.recoveryFactor,
          sharpe_ratio: editingMetrics.sharpeRatio,
          payoff: editingMetrics.payoff,
          avg_daily_gain: editingMetrics.avgDailyGain,
          avg_daily_loss: editingMetrics.avgDailyLoss,
          daily_win_rate: editingMetrics.dailyWinRate,
          max_drawdown: editingMetrics.maxDrawdown,
          total_return: editingMetrics.totalReturn,
          volatility: editingMetrics.volatility,
          win_rate: editingMetrics.winRate,
          avg_win: editingMetrics.avgWin,
          avg_loss: editingMetrics.avgLoss,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'asset,year' 
        });

      if (error) {
        throw error;
      }

      setMetrics(editingMetrics);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erro ao salvar estatísticas:', error);
      setError('Erro ao salvar estatísticas: ' + (error.message || 'Erro desconhecido'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingMetrics(metrics);
    setError(null);
  };

  const handleMetricChange = (key: keyof TradingMetrics, value: string) => {
    const numValue = parseFloat(value);
    setEditingMetrics(prev => ({
      ...prev,
      [key]: isNaN(numValue) ? 0 : numValue
    }));
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    if (value === 999) return '∞';
    if (isNaN(value) || !isFinite(value)) return '0.00';
    return value.toFixed(decimals);
  };

  const getMetricColor = (value: number, isGood: boolean) => {
    if (value === 0 || isNaN(value)) return 'text-gray-400';
    return isGood ? 'text-green-400' : 'text-red-400';
  };

  const statisticsCards = [
    {
      title: 'Fator de Lucro',
      key: 'profitFactor' as keyof TradingMetrics,
      value: formatNumber(metrics.profitFactor),
      description: 'Lucro Bruto / Perda Bruta',
      icon: TrendingUp,
      color: getMetricColor(metrics.profitFactor, metrics.profitFactor > 1),
      benchmark: '> 1.5 (Bom)'
    },
    {
      title: 'Fator de Recuperação',
      key: 'recoveryFactor' as keyof TradingMetrics,
      value: formatNumber(metrics.recoveryFactor),
      description: 'Retorno Total / Drawdown Máximo',
      icon: Target,
      color: getMetricColor(metrics.recoveryFactor, metrics.recoveryFactor > 2),
      benchmark: '> 2.0 (Bom)'
    },
    {
      title: 'Sharpe Ratio',
      key: 'sharpeRatio' as keyof TradingMetrics,
      value: formatNumber(metrics.sharpeRatio),
      description: 'Retorno Ajustado ao Risco',
      icon: BarChart3,
      color: getMetricColor(metrics.sharpeRatio, metrics.sharpeRatio > 1),
      benchmark: '> 1.0 (Bom)'
    },
    {
      title: 'Payoff',
      key: 'payoff' as keyof TradingMetrics,
      value: formatNumber(metrics.payoff),
      description: 'Ganho Médio / Perda Média',
      icon: Calculator,
      color: getMetricColor(metrics.payoff, metrics.payoff > 1),
      benchmark: '> 1.0 (Bom)'
    },
    {
      title: 'Ganho Médio Diário',
      key: 'avgDailyGain' as keyof TradingMetrics,
      value: `${formatNumber(metrics.avgDailyGain)}%`,
      description: 'Média dos ganhos diários',
      icon: TrendingUp,
      color: getMetricColor(metrics.avgDailyGain, metrics.avgDailyGain > 0),
      benchmark: 'Positivo (Bom)'
    },
    {
      title: 'Perda Média Diária',
      key: 'avgDailyLoss' as keyof TradingMetrics,
      value: `${formatNumber(metrics.avgDailyLoss)}%`,
      description: 'Média das perdas diárias',
      icon: TrendingDown,
      color: getMetricColor(metrics.avgDailyLoss, metrics.avgDailyLoss < 2),
      benchmark: '< 2% (Bom)'
    },
    {
      title: 'Taxa de Acerto',
      key: 'dailyWinRate' as keyof TradingMetrics,
      value: `${formatNumber(metrics.dailyWinRate)}%`,
      description: 'Percentual de operações positivas',
      icon: Award,
      color: getMetricColor(metrics.dailyWinRate, metrics.dailyWinRate > 50),
      benchmark: '> 50% (Bom)'
    },
    {
      title: 'Drawdown Máximo',
      key: 'maxDrawdown' as keyof TradingMetrics,
      value: `${formatNumber(metrics.maxDrawdown)}%`,
      description: 'Maior perda acumulada',
      icon: TrendingDown,
      color: getMetricColor(metrics.maxDrawdown, metrics.maxDrawdown < 10),
      benchmark: '< 10% (Bom)'
    }
  ];

  return (
    <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-600 mb-8 relative">
      {/* Seletor de Ano para Admin */}
      {isAdmin && (
        <div className="absolute top-4 left-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="bg-slate-700 border border-slate-600 rounded-lg px-3 py-1 text-sm text-white"
            disabled={loading}
          >
            {availableYears.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      )}

      {/* Botão de Edição Admin */}
      {isAdmin && !isEditing && (
        <button
          onClick={handleEditStart}
          className="absolute top-4 right-16 p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          title="Editar Estatísticas"
          disabled={loading}
        >
          <Edit3 className="w-4 h-4 text-slate-300" />
        </button>
      )}

      {/* Botões Salvar/Cancelar */}
      {isAdmin && isEditing && (
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
            title="Salvar"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Save className="w-4 h-4 text-white" />
            )}
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50"
            title="Cancelar"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      )}

      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Estatísticas Avançadas - {getAssetDisplayName(asset)} {selectedYear}
          </h3>
          <p className="text-slate-400">
            Métricas profissionais de análise de performance
          </p>
        </div>
        <div className="flex items-center space-x-2 text-slate-400">
          <BarChart3 className="w-6 h-6" />
          <span className="text-sm">Análise Quantitativa</span>
        </div>
      </div>

      {/* Mensagem de Erro */}
      {error && (
        <div className="mb-4 p-3 bg-red-900/30 border border-red-600/50 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-400" />
          <span className="text-red-300 text-sm">{error}</span>
        </div>
      )}

      {/* Cards de Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statisticsCards.map((stat, index) => (
          <div key={index} className={`bg-slate-900/50 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-colors ${isEditing ? 'ring-2 ring-blue-500/30' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-slate-300" />
              </div>
              {isEditing ? (
                <input
                  type="number"
                  step="0.01"
                  value={editingMetrics[stat.key] || ''}
                  onChange={(e) => handleMetricChange(stat.key, e.target.value)}
                  className="w-24 px-2 py-1 text-sm bg-slate-700 border border-slate-500 rounded text-white text-right focus:border-blue-500 focus:outline-none"
                  disabled={loading}
                />
              ) : (
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              )}
            </div>
            <h4 className="text-white font-semibold mb-1">{stat.title}</h4>
            <p className="text-slate-400 text-sm mb-2">{stat.description}</p>
            <div className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
              {stat.benchmark}
            </div>
          </div>
        ))}
      </div>

      {/* Seção de Resumo */}
      <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-700">
        <h4 className="text-lg font-semibold text-white mb-3">Resumo da Performance</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Retorno Total:</span>
            <span className={`ml-2 font-semibold ${metrics.totalReturn >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metrics.totalReturn >= 0 ? '+' : ''}{formatNumber(metrics.totalReturn)}%
            </span>
          </div>
          <div>
            <span className="text-slate-400">Volatilidade:</span>
            <span className="ml-2 font-semibold text-yellow-400">
              {formatNumber(metrics.volatility)}%
            </span>
          </div>
          <div>
            <span className="text-slate-400">Meses Analisados:</span>
            <span className="ml-2 font-semibold text-blue-400">
              {data.filter(d => d.year === selectedYear && getAssetValue(d, asset) !== null).length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedStatistics;