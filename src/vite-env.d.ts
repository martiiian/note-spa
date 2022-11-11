/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.png' {
  const _default: any
  export default _default
}

declare module '*.json' {
  const value: { [key: string]: any };
  export default value;
}
