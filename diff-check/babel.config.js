// module.exports = {
//   presets: ["@vue/cli-plugin-babel/preset", "@babel/preset-env", "@babel/preset-typescript"],
//   requireConfigFile: false,
// };
module.exports = {
  // other configurations...
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-typescript"],
          requireConfigFile: false,
        },
      },
    ],
  },
};
