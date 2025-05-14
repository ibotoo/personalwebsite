import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = 'https://nuro.dev';

const staticPages = [
    '/',
    '/about',
    '/contact',
    '/projects',
    '/blog',
];

function generateSiteMap(pages: string[]) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${pages.map((page) => {
        return `
       <url>
         <loc>${`${BASE_URL}${page}`}</loc>
         <lastmod>${new Date().toISOString()}</lastmod>
         <changefreq>weekly</changefreq>
         <priority>0.7</priority>
       </url>
     `;
    }).join('')}
   </urlset>
 `;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const sitemap = generateSiteMap(staticPages);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();
} 