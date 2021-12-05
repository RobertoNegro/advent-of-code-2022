module.exports = {
  plugins: ["lodash", "@babel/plugin-transform-typescript"],
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
      },
      "@babel/preset-typescript",
    ],
  ],
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            targets: {
              node: "current",
            },
          },
        ],
        "@babel/preset-typescript",
      ],
    },
  },
};
