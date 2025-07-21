/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: 'https://acooling.ru',
	generateRobotsTxt: true, // Автоматически обновит robots.txt
	sitemapSize: 7000,
	exclude: ['/api/*', '/admin/*', '/test/*'], // Исключите ненужные пути
	changefreq: 'weekly',
	priority: 0.8,
}
