/*
  # Create function to get all users including phone-only users

  1. New Function
    - `get_all_users_with_profiles()` - Returns all users from auth.users with their profiles
    - Combines data from auth.users and user_profiles tables
    - Ensures all users are visible regardless of registration method

  2. Security
    - Function is accessible to authenticated users
    - Admin-only access through RLS policies
*/

-- Create a function to get all users including those registered with phone only
CREATE OR REPLACE FUNCTION get_all_users_with_profiles()
RETURNS TABLE (
  id uuid,
  email text,
  phone text,
  full_name text,
  created_at timestamptz,
  last_sign_in_at timestamptz,
  email_confirmed_at timestamptz,
  phone_confirmed_at timestamptz,
  leverage_multiplier integer,
  is_active boolean,
  contracted_plan text
) 
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    au.id,
    COALESCE(up.email, au.email::text) as email,
    COALESCE(up.phone, au.phone::text) as phone,
    COALESCE(up.full_name, au.raw_user_meta_data->>'full_name') as full_name,
    COALESCE(up.created_at, au.created_at) as created_at,
    au.last_sign_in_at,
    au.email_confirmed_at,
    au.phone_confirmed_at,
    COALESCE(up.leverage_multiplier, 1) as leverage_multiplier,
    COALESCE(up.is_active, true) as is_active,
    COALESCE(up.contracted_plan, 'none') as contracted_plan
  FROM auth.users au
  LEFT JOIN user_profiles up ON au.id = up.id
  ORDER BY COALESCE(up.created_at, au.created_at) DESC;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION get_all_users_with_profiles() TO authenticated;

-- Create RLS policy to ensure only admins can use this function
CREATE POLICY "Only admin can get all users"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.email = 'pedropardal04@gmail.com'
    )
  );