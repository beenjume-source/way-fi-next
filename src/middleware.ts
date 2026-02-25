import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Protect /dashboard
    if (pathname.startsWith('/dashboard')) {
        // In a real app, we would check Supabase Auth here
        // For this demo, we'll allow it but structure it for future auth
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/admin/:path*'],
};
