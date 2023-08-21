import type {StorybookConfig} from "@storybook/nextjs";

const path = require("path");

const config: StorybookConfig = {
    webpackFinal: async (config, {configType}) => {
        config.resolve.modules.push(path.resolve(__dirname, '../src'));

        return config;
    },

    stories: [
        "../app/components/**/*.mdx",
        "../app/components/**/*.stories.@(js|jsx|ts|tsx)",
        "../app/pages/**/*.mdx",
        "../app/pages/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
};
export default config;
