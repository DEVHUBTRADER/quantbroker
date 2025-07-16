/*
  # Create monthly results table

  1. New Tables
    - `monthly_results`
      - `id` (uuid, primary key)
      - `month` (text)
      - `year` (integer)
      - `bitcoin` (decimal)
      - `mini_indice` (decimal)
      - `mini_dolar` (decimal)
      - `portfolio` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `monthly_results` table
    - Add policy for public read access
    - Add policy for admin write access
*/

CREATE TABLE IF NOT EXISTS monthly_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  month text NOT NULL,
  year integer NOT NULL,
  bitcoin decimal(5,2),
  mini_indice decimal(5,2),
  mini_dolar decimal(5,2),
  portfolio decimal(5,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(month, year)
);

ALTER TABLE monthly_results ENABLE ROW LEVEL SECURITY;

-- Allow public read access to monthly results
CREATE POLICY "Anyone can read monthly results"
  ON monthly_results
  FOR SELECT
  TO public
  USING (true);

-- Allow admin to insert/update/delete monthly results
CREATE POLICY "Admin can manage monthly results"
  ON monthly_results
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'pedropardal04@gmail.com');

-- Insert sample data
INSERT INTO monthly_results (month, year, bitcoin, mini_indice, mini_dolar, portfolio) VALUES
('Janeiro', 2024, 15.2, 12.8, 18.5, 15.5),
('Fevereiro', 2024, -3.1, 8.2, -2.1, 1.0),
('Março', 2024, 22.3, 15.7, 25.1, 21.0),
('Abril', 2024, 8.9, 11.2, 6.8, 8.9),
('Maio', 2024, 19.4, 16.3, 21.7, 19.1),
('Junho', 2024, -1.8, 4.5, -0.9, 0.6),
('Julho', 2024, 14.6, 13.1, 16.2, 14.6),
('Agosto', 2024, 7.3, 9.8, 5.4, 7.5),
('Setembro', 2024, 25.1, 18.9, 28.3, 24.1),
('Outubro', 2024, 11.7, 14.2, 9.8, 11.9),
('Novembro', 2024, 16.8, 12.4, 19.6, 16.3),
('Dezembro', 2024, 20.2, 17.8, 22.4, 20.1),
('Janeiro', 2023, 12.5, 10.2, 15.8, 12.8),
('Fevereiro', 2023, 18.7, 14.5, 20.3, 17.8),
('Março', 2023, -2.4, 6.1, -1.2, 0.8),
('Abril', 2023, 24.1, 19.8, 26.5, 23.5),
('Maio', 2023, 13.6, 11.9, 15.2, 13.6),
('Junho', 2023, 21.8, 17.4, 23.9, 21.0)
ON CONFLICT (month, year) DO NOTHING;