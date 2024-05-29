/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_FAKE_DATA_URL: string;
  readonly VITE_MODE: string;
  readonly VITE_DEMO_PREFIX: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
