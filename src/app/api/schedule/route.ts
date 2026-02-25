import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
    try {
        const { name, phone, notes, email } = await req.json();

        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    full_name: name,
                    phone: phone,
                    email: email,
                    intent: 'Agendar Cita',
                    status: 'new',
                    notes: notes
                }
            ])
            .select();

        if (error) {
            console.error('Error saving lead:', error);
            return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });

    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
