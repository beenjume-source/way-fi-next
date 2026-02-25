const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTestLead() {
    const { data, error } = await supabase
        .from('leads')
        .insert([
            {
                email: 'test_' + Math.random().toString(36).substring(7) + '@yotta.dev',
                intent: 'Test Integration',
                status: 'new'
            }
        ])
        .select();

    if (error) {
        console.error('Error creating test lead:', error);
    } else {
        console.log('Test lead created successfully:', data);
    }
}

createTestLead();
