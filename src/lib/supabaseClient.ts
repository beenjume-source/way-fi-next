import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Validamos que la URL sea válida antes de intentar crear el cliente
const isValidUrl = supabaseUrl && supabaseUrl.startsWith('http') && !supabaseUrl.includes('your-supabase-url');

if (!isValidUrl) {
    console.warn('Supabase credentials missing or invalid. Dashboard items might not load correctly.');
}

export const supabase = createClient(
    isValidUrl ? supabaseUrl : 'https://placeholder-url.supabase.co',
    isValidUrl ? supabaseAnonKey : 'placeholder-key'
);
