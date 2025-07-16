/*
  # Add full_name column to user_profiles table

  1. Changes
    - Add `full_name` column to `user_profiles` table
    - Set default value to empty string for existing records
    - Allow null values for flexibility

  This migration fixes the missing column error that was preventing
  user management operations in the AdminPanel component.
*/

-- Add full_name column to user_profiles table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'full_name'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN full_name text DEFAULT '';
  END IF;
END $$;