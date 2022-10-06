// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
module.exports = function override(config, env) {
    config.plugins = config.plugins.map((plugin) => {
        if (plugin.constructor.name === "GenerateSW") {
            return new WorkboxWebpackPlugin.InjectManifest({
                swSrc: "./src/custom-service-worker.js",
                swDest: "service-worker.js"
            });
        }
        return plugin;
    });
    return config;
};