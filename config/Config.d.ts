/* tslint:disable */
/* eslint-disable */
declare module 'node-config-ts' {
  interface IConfig {
    APP_PORT: string;
    MONGO_URI: string;
  }
  export const config: Config;
  export type Config = IConfig;
}
