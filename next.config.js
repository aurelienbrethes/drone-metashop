/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    env: {
        WOOCOMMERCE_API_URL: process.env.WOOCOMMERCE_API_URL,
    },
    images: {
        domains: [
            'res.cloudinary.com',
            'tailwindui.com',
            'localhost',
            'swageth.myprintful.com',
            'thibautl3.sg-host.com',
            'thibautl16.sg-host.com',
        ],
    },

    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Credentials', value: 'true' },
                    { key: 'Access-Control-Allow-Origin', value: '*' },
                    { key: 'Set-Cookie', value: '*' },
                    {
                        key: 'Access-Control-Allow-Methods',
                        value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
                    },
                    {
                        key: 'Access-Control-Allow-Headers',
                        value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
                    },
                ],
            },
        ];
    },
};
