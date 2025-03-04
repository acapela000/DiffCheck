module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-typescript",
            "next/babel",
            "@vue/cli-plugin-babel/preset",
            "@babel/preset-env",
          ],
          plugins: ["module:@babel/plugin-transform-typescript"],
          requireConfigFile: false,
        },
      },
    ],
  },
};
