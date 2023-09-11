const { createProxyMiddleware } = require('http-proxy-middleware');

function createAPIProxy(endpoint) {
  return createProxyMiddleware({
   // target: 'https://d32sbion19muhj.cloudfront.net/pub/interview', 
    target:process.env.REACT_APP_API_URL,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      [`^/${endpoint}`]: `/${endpoint}`,
    },
  });
}

module.exports = function (app) {
  
  app.use('/countries', createAPIProxy('countries'));  
  app.use('/states', createAPIProxy('states'));  
  app.use('/cities', createAPIProxy('cities'));
};
