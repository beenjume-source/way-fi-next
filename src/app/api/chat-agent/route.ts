import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();
        const query = message.toLowerCase();

        // Artificial delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Intent Detection
        if (query.includes('cita') || query.includes('agendar') || query.includes('reunión')) {
            return NextResponse.json({
                text: '¡Excelente decisión! Para brindarte la mejor atención, por favor déjanos tus datos de contacto y cualquier observación inicial:',
                type: 'CONTACT_FORM',
            });
        }

        if (query.includes('precio') || query.includes('contratar') || query.includes('costo') || query.includes('pagar') || query.includes('planes')) {
            return NextResponse.json({
                text: 'Manejamos 3 modelos de inversión:\n1. Starter Trial (Prueba): 14 días gratis.\n2. Agency Focus (Membresía): $1,499/mes.\n3. Custom Core (Fijo): Proyectos desde $4,999 pago único.\n\n¿Cuál se adapta mejor a tu fase actual?',
                type: 'STRIPE_CARD',
            });
        }

        if (query.includes('cómo') || query.includes('proceso') || query.includes('funcionan')) {
            return NextResponse.json({
                text: 'Nuestra arquitectura se basa en 3 capas críticas: Recepción, Procesamiento Autónomo y Acción. Así es como resolvemos el flujo:',
                type: 'PROCESS_WIDGET'
            });
        }

        if (query.includes('qué hacen') || query.includes('way-fi') || query.includes('servicios')) {
            return NextResponse.json({
                text: 'En Way-FI construimos Ecosistemas Digitales. Unimos Desarrollo de Software con automatización n8n y estrategias de Ads para que su negocio funcione solo.',
                type: 'TEXT'
            });
        }

        // Default response
        return NextResponse.json({
            text: 'Soy el Concierge Inteligente de Way-FI. Puedo explicarle nuestros procesos, mostrarle precios o agendar una cita técnica. ¿En qué puedo ayudarle hoy?',
            type: 'TEXT'
        });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to process message' }, { status: 500 });
    }
}
