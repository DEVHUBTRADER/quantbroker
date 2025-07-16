import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, BarChart3 } from 'lucide-react';

interface MonthData {
  month: string;
  year: number;
  bitcoin: number | null;
  miniIndice: number | null;
  miniDolar: number | null;
  portfolio: number | null;
}

interface ResultsChartProps {
  data: MonthData[];
  asset: 'bitcoin' | 'miniIndice' | 'miniDolar' | 'portfolio';
  year: number;
}

const ResultsChart: React.FC<ResultsChartProps> = ({ data, asset, year }) => {
  const [chartType, setChartType] = React.useState<'line' | 'bar'>('line');

  // Filter and prepare data for the chart
  const chartData = data
    .filter(d => d.year === year)
    .sort((a, b) => {
      const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                     'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
      return months.indexOf(a.month) - months.indexOf(b.month);
    })
    .map((d, index, array) => {
      const monthlyValue = d[asset] || 0;
      
      // Calculate cumulative value for line chart
      const cumulativeValue = index === 0 ? monthlyValue : array
        .slice(0, index + 1)
        .reduce((acc, curr) => acc + (curr[asset] || 0), 0);
      
      return {
        month: d.month.substring(0, 3), // Abbreviate month names
        monthlyValue: monthlyValue, // Individual monthly result
        cumulativeValue: cumulativeValue, // Cumulative evolution
        fullMonth: d.month
      };
    });

  // Add starting point at 0 if we have data
  if (chartData.length > 0 && chartType === 'line') {
    chartData.unshift({
      month: 'Início',
      monthlyValue: 0,
      cumulativeValue: 0,
      fullMonth: 'Início'
    });
  }

  const assetColors = {
    bitcoin: '#f97316',
    miniIndice: '#3b82f6',
    miniDolar: '#10b981',
    portfolio: '#8b5cf6'
  };

  const assetNames = {
    bitcoin: 'Bitcoin',
    miniIndice: 'Mini Índice',
    miniDolar: 'Mini Dólar',
    portfolio: 'Portfólio Completo'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const isLineChart = chartType === 'line';
      const value = isLineChart ? data.cumulativeValue : data.monthlyValue;
      const title = isLineChart ? 'Evolução Acumulada' : 'Resultado Mensal';
      
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{`${label} ${year}`}</p>
          <p className="text-sm text-gray-600">{title}</p>
          <p className={`font-bold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {`${value >= 0 ? '+' : ''}${value.toFixed(1)}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxis = (value: number) => `${value}%`;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {chartType === 'line' ? 'Evolução Acumulada' : 'Resultados Mensais'} {year} - {assetNames[asset]}
          </h2>
          <p className="text-gray-600">
            {chartType === 'line' 
              ? 'Evolução acumulada dos resultados ao longo do ano' 
              : 'Resultados individuais por mês'
            }
          </p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 sm:mt-0">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'line' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Gráfico de Linha"
          >
            <TrendingUp className="h-5 w-5" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-2 rounded-lg transition-colors ${
              chartType === 'bar' 
                ? 'bg-blue-100 text-blue-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            title="Gráfico de Barras"
          >
            <BarChart3 className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={formatYAxis}
                domain={['dataMin', 'dataMax']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="cumulativeValue" 
                stroke={assetColors[asset]}
                strokeWidth={6}
                dot={{ fill: assetColors[asset], strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8, stroke: assetColors[asset], strokeWidth: 2 }}
                connectNulls={false}
              />
              {/* Zero line */}
              <Line 
                type="monotone" 
                dataKey={() => 0} 
                stroke="#e2e8f0" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                activeDot={false}
              />
            </LineChart>
          ) : (
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickFormatter={formatYAxis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="monthlyValue" 
                fill={assetColors[asset]}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Chart Summary */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">
            {chartData.filter(d => d.monthlyValue > 0).length}
          </div>
          <div className="text-sm text-gray-600">Meses Positivos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-red-600">
            {chartData.filter(d => d.monthlyValue < 0).length}
          </div>
          <div className="text-sm text-gray-600">Meses Negativos</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">
            {chartData.length > 0 ? (chartData.reduce((acc, d) => acc + d.monthlyValue, 0) / chartData.length).toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Média Mensal</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">
            {chartData.length > 0 ? chartData[chartData.length - 1].cumulativeValue.toFixed(1) : 0}%
          </div>
          <div className="text-sm text-gray-600">Total Acumulado</div>
        </div>
      </div>
    </div>
  );
};

export default ResultsChart;