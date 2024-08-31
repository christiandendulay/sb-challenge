// next.config.js
const path = require("path");

module.exports = {
  webpack(config) {
    // Find and exclude the existing rule for SVGs
    config.module.rules = config.module.rules.map((rule) => {
      if (rule.test && rule.test.toString().includes("svg")) {
        return {
          ...rule,
          exclude: /\.svg$/, // Exclude SVGs from this rule
        };
      }
      return rule;
    });

    // Add SVGR loader for SVGs
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            // SVGR options here (if any)
          },
        },
      ],
    });

    return config;
  },
};
