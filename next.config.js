/** @type {import('next').NextConfig} */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		unoptimized: true,
	},
	output: 'export', // Включает статическую экспортированную сборку
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = nextConfig
