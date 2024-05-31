/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_PREFIX_PATH: string;
  readonly VITE_API_URL: string;
  readonly VITE_FAKE_DATA_URL: string;
  readonly VITE_USER_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
