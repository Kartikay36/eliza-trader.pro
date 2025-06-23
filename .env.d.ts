declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_URI: string;
    JWT_SECRET: string;
    PORT?: string;
    NODE_ENV?: 'development' | 'production';
  }
}
