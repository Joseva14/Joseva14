const path = require('path');

module.exports = strapi => {
    return {
      initialize: function(cb) {
        strapi.router.route({
          method: 'GET',
          path: '/post',
          handler: [
            async (ctx, next) => {
              ctx.url = path.basename(`${ctx.url}/success.html`);
  
              await next();
            },
            strapi.koaMiddlewares.static(strapi.config.middleware.settings.public.path || strapi.config.paths.static, {
              maxage: strapi.config.middleware.settings.public.maxAge,
              defer: true
            })
          ]
        });
  
        cb();
      }
    };
  };