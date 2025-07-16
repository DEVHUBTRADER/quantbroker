/*
  # Add contracted plan column to user profiles

  1. Changes
    - Add `contracted_plan` column to user_profiles table
    - Set default value as 'none'
    - Add check constraint for valid plan values

  2. Security
    - No changes to existing RLS policies
*/

-- Add contracted_plan column
ALTER TABLE user_profiles 
ADD COLUMN contracted_plan text DEFAULT 'none';

-- Add check constraint for valid plan values
ALTER TABLE user_profiles 
ADD CONSTRAINT user_profiles_contracted_plan_check 
CHECK (contracted_plan IN ('none', 'bitcoin', 'mini-indice', 'mini-dolar', 'portfolio-completo'));

-- Add index for better performance
CREATE INDEX idx_user_profiles_contracted_plan ON user_profiles(contracted_plan);