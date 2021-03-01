module.exports = {
    // Target must be serverless
    target: "serverless",
    webpack: (config, { isServer }) => {
        if (isServer) {
            require("./scripts/sitemap.js")
        }
        return config
    },
}
