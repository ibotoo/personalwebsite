import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, value, id, url, timestamp } = JSON.parse(req.body);

        // Log Core Web Vitals data
        console.log(`[Core Web Vitals] ${name}:`, {
            value,
            id,
            url,
            timestamp: new Date(timestamp).toISOString(),
            userAgent: req.headers['user-agent'],
        });

        // Here you could send data to analytics services like:
        // - Google Analytics
        // - DataDog
        // - New Relic
        // - Custom database

        // For now, we'll just acknowledge receipt
        res.status(200).json({
            success: true,
            metric: name,
            value,
            message: 'Web Vitals data received successfully'
        });

    } catch (error) {
        console.error('Error processing Web Vitals data:', error);
        res.status(400).json({ error: 'Invalid data format' });
    }
} 