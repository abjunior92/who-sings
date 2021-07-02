const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/ws/1.1/",
    createProxyMiddleware({
      target: "https://api.musixmatch.com",
      headers: {
        accept: "application/json",
        method: "GET"
      },
      changeOrigin: true
    })
  );
};
