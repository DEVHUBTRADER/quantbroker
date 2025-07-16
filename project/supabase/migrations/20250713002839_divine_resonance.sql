/*
  # Fix RLS permissions for user_profiles table

  1. Security Updates
    - Drop existing problematic policies
    - Create simplified working policies
    - Enable proper admin access
    - Allow public read access for authenticated users

  2. Policy Structure
    - Admin: Full access (pedropardal04@gmail.com)
    - Authenticated: Read access to all profiles
    - Users: Manage own profile only
*/

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Admin full access to user profiles" ON user_profiles;
DROP POLICY IF EXISTS "Public read access to user profiles" ON user_profiles;
DROP POLICY IF EXISTS "Users can manage own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admin pode gerenciar estatísticas" ON user_profiles;
DROP POLICY IF EXISTS "Permitir leitura pública de estatísticas" ON user_profiles;

-- Ensure RLS is enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy 1: Admin full access
CREATE POLICY "admin_full_access" ON user_profiles
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

-- Policy 2: Authenticated users can read all profiles
CREATE POLICY "authenticated_read_all" ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Users can manage their own profile
CREATE POLICY "users_manage_own" ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);