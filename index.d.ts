declare module 'keycharm' {
  interface KeycharmOptions {
    preventDefault?: boolean;
    container?: Window | Element;
  }

  type BindType = 'keydown' | 'keyup';

  interface Keycharm {
    bind(key: string, callback: (ev: KeyboardEvent) => void, type?: BindType): void;

    bindAll(callback: (ev: KeyboardEvent) => void, type?: BindType): void;

    unbind(key: string, callback?: (ev: KeyboardEvent) => void, type?: BindType): void;

    reset(): void;

    destroy(): void

    getKey(event: KeyboardEvent): string;
  }

  export default function keycharm(options?: KeycharmOptions): Keycharm;
}
