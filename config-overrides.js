const { override, useBabelRc } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
    // Tùy chỉnh Babel bằng cách sử dụng Babel config riêng biệt
    useBabelRc(),

    // Tùy chỉnh Webpack để thêm alias cho jQuery và cung cấp jQuery toàn cục
    (config) => {
        // Thêm alias cho jQuery
        config.resolve.alias = {
            ...config.resolve.alias,
            jquery: 'jquery/src/jquery',
        };

        // Sử dụng ProvidePlugin để tự động cung cấp jQuery
        config.plugins = [
            ...config.plugins,
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
        ];

        return config;
    },
);
