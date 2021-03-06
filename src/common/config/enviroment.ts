import { config } from 'dotenv'

config()

const defaultEnv = 'development'

const env = process.env.NODE_ENV || defaultEnv

const configs = {
  base: {
    ENV: env,
    DEV: env === defaultEnv,
    // General
    NAME: process.env.APP_NAME || 'AppName',
    TITLE: process.env.APP_TITLE || 'AppTitle',
    DESCRIPTION: process.env.APP_DESCRIPTION || 'AppDescription',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.APP_PORT || 7070,
    // JWT
    SECRET: process.env.APP_SECRET || 'DEV',
    EXPIRATION: process.env.APP_EXPIRATION || '3600s',
    // Mail
    MAIL_HOST: process.env.MAIL_HOST || 'gmail.com',
    MAIL_PORT: process.env.MAIL_PORT || 25,
    MAIL_USER: process.env.MAIL_USER || 'mazurco066@gmail.com',
    MAIL_PASS: process.env.MAIL_PASS || 'xxxxxx'
  },
  development: {},
  production: {
    PORT: process.env.APP_PORT || 7071
  },
  test: {
    port: 7072
  }
}

const options = { ...configs.base, ...configs[env] }

export { options }
