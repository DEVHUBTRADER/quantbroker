/*
  # Criar tabela de estatísticas de trading

  1. Nova Tabela
    - `trading_statistics`
      - `id` (uuid, primary key)
      - `asset` (text, tipo do ativo)
      - `year` (integer, ano)
      - `profit_factor` (numeric, fator de lucro)
      - `recovery_factor` (numeric, fator de recuperação)
      - `sharpe_ratio` (numeric, índice sharpe)
      - `payoff` (numeric, payoff ratio)
      - `avg_daily_gain` (numeric, ganho médio diário)
      - `avg_daily_loss` (numeric, perda média diária)
      - `daily_win_rate` (numeric, taxa de acerto diária)
      - `max_drawdown` (numeric, drawdown máximo)
      - `total_return` (numeric, retorno total)
      - `volatility` (numeric, volatilidade)
      - `win_rate` (numeric, taxa de acerto)
      - `avg_win` (numeric, ganho médio)
      - `avg_loss` (numeric, perda média)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Habilitar RLS na tabela `trading_statistics`
    - Política para admin gerenciar todos os dados
    - Política para leitura pública
*/

-- Criar tabela de estatísticas de trading
CREATE TABLE IF NOT EXISTS trading_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  asset text NOT NULL,
  year integer NOT NULL,
  profit_factor numeric(10,2) DEFAULT 0,
  recovery_factor numeric(10,2) DEFAULT 0,
  sharpe_ratio numeric(10,2) DEFAULT 0,
  payoff numeric(10,2) DEFAULT 0,
  avg_daily_gain numeric(10,2) DEFAULT 0,
  avg_daily_loss numeric(10,2) DEFAULT 0,
  daily_win_rate numeric(10,2) DEFAULT 0,
  max_drawdown numeric(10,2) DEFAULT 0,
  total_return numeric(10,2) DEFAULT 0,
  volatility numeric(10,2) DEFAULT 0,
  win_rate numeric(10,2) DEFAULT 0,
  avg_win numeric(10,2) DEFAULT 0,
  avg_loss numeric(10,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(asset, year)
);

-- Habilitar RLS
ALTER TABLE trading_statistics ENABLE ROW LEVEL SECURITY;

-- Política para leitura pública
CREATE POLICY "Permitir leitura pública de estatísticas"
  ON trading_statistics
  FOR SELECT
  TO public
  USING (true);

-- Política para admin gerenciar dados
CREATE POLICY "Admin pode gerenciar estatísticas"
  ON trading_statistics
  FOR ALL
  TO authenticated
  USING (auth.email() = 'pedropardal04@gmail.com')
  WITH CHECK (auth.email() = 'pedropardal04@gmail.com');

-- Inserir dados iniciais de exemplo
INSERT INTO trading_statistics (asset, year, profit_factor, recovery_factor, sharpe_ratio, payoff, avg_daily_gain, avg_daily_loss, daily_win_rate, max_drawdown, total_return, volatility, win_rate, avg_win, avg_loss)
VALUES 
  ('portfolio', 2024, 1.83, 2.50, 1.20, 1.30, 0.61, 0.00, 100.00, 0.00, 160.60, 7.30, 100.00, 1.50, 1.00),
  ('bitcoin', 2024, 1.50, 2.00, 1.00, 1.20, 0.20, 0.15, 60.00, 8.00, 25.00, 15.00, 60.00, 2.00, 1.50),
  ('miniIndice', 2024, 1.60, 2.20, 1.10, 1.10, 0.10, 0.08, 70.00, 4.00, 18.00, 8.00, 70.00, 1.20, 0.80),
  ('miniDolar', 2024, 1.70, 2.30, 1.30, 1.40, 0.18, 0.12, 68.00, 6.00, 22.00, 12.00, 68.00, 1.80, 1.10)
ON CONFLICT (asset, year) DO NOTHING;