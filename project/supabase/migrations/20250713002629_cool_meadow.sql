/*
  # Fix RLS policies for user_profiles table

  1. Security Updates
    - Drop existing policies that may be causing permission issues
    - Create new comprehensive policies for admin access
    - Ensure proper authentication checks

  2. Admin Access
    - Full CRUD permissions for pedropardal04@gmail.com
    - Public read access for general users
    - Proper policy structure for all operations
*/

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Admin can manage all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can read all profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin pode gerenciar estatísticas" ON user_profiles;
DROP POLICY IF EXISTS "Permitir leitura pública de estatísticas" ON user_profiles;

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Create comprehensive admin policy for all operations
CREATE POLICY "Admin full access to user profiles"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'pedropardal04@gmail.com'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'pedropardal04@gmail.com'
    )
  );

-- Allow users to read all profiles (for general access)
CREATE POLICY "Public read access to user profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow users to manage their own profile
CREATE POLICY "Users can manage own profile"
  ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);