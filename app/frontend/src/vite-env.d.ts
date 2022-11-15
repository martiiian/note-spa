/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>
  export default component
}

declare module '*.png' {
  const _default: unknown
  export default _default
}

declare module '*.json' {
  const value: { [key: string]: unknown }
  export default value
}
