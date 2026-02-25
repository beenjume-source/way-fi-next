import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const imagesDir = path.join(process.cwd(), 'public', 'images', 'way-fi');
        const files = fs.readdirSync(imagesDir);

        // Filter for images only
        const images = files.filter(file =>
            /\.(png|jpe?g|gif|svg|webp)$/i.test(file)
        ).map(file => `/images/way-fi/${file}`);

        return NextResponse.json({ images });
    } catch (error) {
        console.error('Error reading images directory:', error);
        return NextResponse.json({ images: [] }, { status: 500 });
    }
}
