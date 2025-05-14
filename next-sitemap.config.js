/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://ibrahimcansancar.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    robotsTxtOptions: {
        additionalSitemaps: [
            'https://ibrahimcansancar.com/sitemap.xml',
        ],
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
    priority: 0.7,
    changefreq: 'weekly',
} 