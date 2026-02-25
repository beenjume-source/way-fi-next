import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Configuración de Notificaciones (Evolution API / n8n)
const ADMIN_PHONE = '522271009744'; // Número extraído del footer
const WEBHOOK_URL = process.env.WHATSAPP_WEBHOOK_URL; // Para n8n o Evolution API

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, phone, email, company, date, intent } = body;

        // 1. Guardar en Supabase (Usando columnas reales de la BD)
        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    full_name: name,
                    phone: phone,
                    email: email,
                    notes: `Empresa: ${company} | Fecha: ${date}`,
                    intent: intent || 'Auditoría Solicitada',
                    status: 'new'
                }
            ])
            .select();

        if (error) {
            console.error('Error saving lead:', error);
            // Si el error es por duplicado, intentamos ignorarlo y seguir con la notificación
        }

        // 2. Enviar Notificación a WhatsApp (vía Webhook n8n/Evolution)
        if (WEBHOOK_URL) {
            try {
                await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        number: ADMIN_PHONE,
                        message: `🚀 *Nuevo Lead en Wayfia!*\n\n*Nombre:* ${name}\n*Empresa:* ${company}\n*WhatsApp:* ${phone}\n*Email:* ${email}\n*Fecha:* ${date}\n*Intento:* ${intent || 'Auditoría'}`
                    })
                });
            } catch (notifyError) {
                console.error('Error sending WhatsApp notification:', notifyError);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Lead procesado correctamente',
            data
        });

    } catch (error) {
        console.error('Final API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
