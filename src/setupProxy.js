const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/macros",
    createProxyMiddleware({
      target: "https://script.google.com",
      changeOrigin: true,
      pathRewrite: {
        "^/macros": "", // '/macros' 부분을 제거합니다.
      },
    })
  );
};
