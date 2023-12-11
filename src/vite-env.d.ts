/// <reference types="vite/client" />
declare module 'virtual:pwa-register' {
  interface SWRegisterOptions {
    onNeedRefresh?: () => void;
  }

  export function registerSW(options?: SWRegisterOptions): () => void;
}
