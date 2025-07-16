/*
  # Fix RLS policies using auth.email() function

  1. Security Changes
    - Remove policies that query auth.users table directly
    - Use auth.email() built-in function instead
    - Ensure proper permissions for authenticated users

  2. Policies Created
    - Admin full access using auth.email()
    - Authenticated users can read all profiles
    - Users can manage their own profiles using auth.uid()
*/

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "admin_full_access" ON user_profiles;
DROP POLICY IF EXISTS "authenticated_read_all" ON user_profiles;
DROP POLICY IF EXISTS "users_manage_own" ON user_profiles;
DROP POLICY IF EXISTS "Admin pode gerenciar estatísticas" ON user_profiles;
DROP POLICY IF EXISTS "Permitir leitura pública de estatísticas" ON user_profiles;

-- Create new policies using auth.email() function
CREATE POLICY "admin_full_access_email" ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.email() = 'pedropardal04@gmail.com')
  WITH CHECK (auth.email() = 'pedropardal04@gmail.com');

CREATE POLICY "authenticated_read_profiles" ON user_profiles
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "users_manage_own_profile" ON user_profiles
  FOR ALL
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);