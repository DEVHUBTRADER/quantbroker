/*
  # Create user_profiles table

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique, not null)
      - `phone` (text, unique, nullable)
      - `leverage_multiplier` (integer, default 1)
      - `is_active` (boolean, default true)
      - `created_at` (timestamp, default now)
      - `updated_at` (timestamp, default now)

  2. Security
    - Enable RLS on `user_profiles` table
    - Add policy for authenticated users to read all profiles
    - Add policy for users to manage their own profile
    - Add policy for admin to manage all profiles

  3. Functions
    - Create trigger to automatically update `updated_at` timestamp
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL PRIMARY KEY,
    email text UNIQUE NOT NULL,
    phone text UNIQUE,
    leverage_multiplier integer DEFAULT 1 NOT NULL CHECK (leverage_multiplier >= 1 AND leverage_multiplier <= 5),
    is_active boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER handle_user_profiles_updated_at
    BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Create policies for Row Level Security

-- Policy: Users can read all profiles (for admin panel)
CREATE POLICY "Users can read all profiles"
    ON public.user_profiles
    FOR SELECT
    TO authenticated
    USING (true);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.user_profiles
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.user_profiles
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Policy: Admin can manage all profiles (replace with your admin email)
CREATE POLICY "Admin can manage all profiles"
    ON public.user_profiles
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

-- Create function to get user email from JWT
CREATE OR REPLACE FUNCTION public.get_user_email()
RETURNS text AS $$
BEGIN
    RETURN (auth.jwt() ->> 'email')::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_active ON public.user_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_user_profiles_created_at ON public.user_profiles(created_at);

-- Insert some sample data for testing (optional)
-- This will only work if you have users in auth.users table
-- INSERT INTO public.user_profiles (id, email, phone, leverage_multiplier, is_active)
-- SELECT 
--     id,
--     email,
--     phone,
--     1,
--     true
-- FROM auth.users
-- WHERE email IS NOT NULL
-- ON CONFLICT (id) DO NOTHING;