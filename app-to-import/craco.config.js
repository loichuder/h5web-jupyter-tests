module.exports = {
  webpack: {
    configure: {
      optimization: {
        // Disable code splitting: https://github.com/facebook/create-react-app/issues/5306#issuecomment-431431877
        runtimeChunk: false,
        splitChunks: {
          cacheGroups: {
            default: false,
          },
        },
      },
      // Remove hash from the names of JS files
      output: {
        filename: "static/js/[name].js",
        chunkFilename: "[name].bundle.js",
      },
    },
  },
};
