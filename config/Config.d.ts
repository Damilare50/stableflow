/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    APP_PORT: string
    MONGO_URI: string
    PRIVY_APP_ID: string
    PRIVY_APP_SECRET: string
    MAIL: MAIL
  }
  interface MAIL {
    USER: string
    PASSWORD: string
    SERVICE: string
    FROM: string
  }
  export const config: Config
  export type Config = IConfig
}
