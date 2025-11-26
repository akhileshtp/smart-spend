// Removed invalid reference to vite/client

declare var process: {
  env: {
    API_KEY: string;
    [key: string]: any;
  }
};
