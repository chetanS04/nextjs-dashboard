/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental:{
        ppr:"incremental" //The 'incremental' value allows you to adopt PPR for specific routes.
    }
};

export default nextConfig;
