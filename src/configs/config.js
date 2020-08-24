const appPrefix = process.env.APP_PREFIX || '';

module.exports = {
  app: {
    environment: process.env[`${appPrefix}APPLICATION_ENV`] || '',
    logpath: process.env[`${appPrefix}LOG_PATH`] || '',
    name: process.env[`${appPrefix}APP_NAME`] || 'node-boilerplate',
    port: parseInt(process.env[`${appPrefix}APP_PORT`], 10) || 8000
  },
  mongo: {
    host: process.env[`${appPrefix}DB_HOST`],
    name: process.env[`${appPrefix}DB_DATABASE`],
    password: process.env[`${appPrefix}DB_PASSWORD`],
    port: parseInt(process.env[`${appPrefix}DB_PORT`], 10),
    user: process.env[`${appPrefix}DB_USER`]
  },

  contentPath: process.env[`${appPrefix}CONTEXT_PATH`],
  jwt: {
    secret: "tempKey",
    validity:  60 * 60 * 24 * 7 ,
    validity_refresh: 60 * 60 * 24 * 7 * 4
  }
};
