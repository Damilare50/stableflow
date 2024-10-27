/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
  interface IConfig {
    APP_PORT: string;
    MONGO_URI: string;
    PRIVY_APP_ID: string;
    PRIVY_APP_SECRET: string;
  }
  export const config: Config;
  export type Config = IConfig;
}
