module.exports = function (conf) {
  conf.addPassthroughCopy("./src/ids");
  conf.addPassthroughCopy("./src/index.js");
  conf.addPassthroughCopy("./src/assets");
  conf.addPassthroughCopy("./src/fonts");

  conf.addWatchTarget("./src/index.css");
  conf.addWatchTarget("./src/styles/");
  conf.addWatchTarget("./src/ids/");

  return {
    dir: {
      input: "./src",
      includes: "./includes",
    },
    htmlTemplateEngine: "njk",
  };
};
