type HandlerType = 'keydown' | 'keyup'
type Handler = (event: KeyboardEvent) => void

export type KeyCharmOptions = {
  container?: Window | Element
  preventDefault?: boolean
}

export interface KeyCharm {
  /** Get the key name for the given `event` */
  getKey(event: KeyboardEvent): string | null
  /** Add a handler for the given `key` and `type || "keydown"` */
  bind(key: KeyName, fn: Handler, type?: HandlerType): void
  bind(key: string, fn: Handler, type?: HandlerType): void
  /** Remove a handler for the given `key` and `type || "keydown"` */
  unbind(key: KeyName, fn: Handler, type?: HandlerType): void
  unbind(key: string, fn: Handler, type?: HandlerType): void
  /** Remove all handlers for the given `key` */
  unbind(key: KeyName, type?: HandlerType): void
  unbind(key: string, type?: HandlerType): void
  /** Remove all handlers for all keys */
  reset(): void
  /** Remove native keyup/keydown listeners */
  dispose(): void
}

export default function keycharm({
  container = window,
  preventDefault,
}: KeyCharmOptions = {}): KeyCharm {
  const keys: {
    [name: string]: { code: number; shift?: boolean }
  } = {}

  initKeys((name, code, shift) => {
    keys[name] = { code, shift }
  })

  type HandlerEntry = { fn: Handler; shift?: boolean }
  type HandlerCache = {
    [type: string]: { [code: number]: HandlerEntry[] }
  }

  const bound: HandlerCache = {}
  const types = ['keydown', 'keyup']

  // forget all handlers
  const reset = () => each(types, type => (bound[type] = []))
  reset()

  const nativeHandlers = types.map(type => {
    function onKeyChange(event: KeyboardEvent) {
      const handlers = bound[type][event.keyCode]
      if (handlers && handlers.length) {
        each(
          handlers,
          ({ fn, shift }) =>
            (shift == null || shift == event.shiftKey) && fn(event)
        )
        if (preventDefault) {
          event.preventDefault()
        }
      }
    }
    container.addEventListener(type, onKeyChange as any, true)
    return [type, onKeyChange] as const
  })

  return {
    getKey(event) {
      let code, shift
      return (
        Object.keys(keys).find(
          key => (
            ({ code, shift } = keys[key]),
            code == event.keyCode && (shift == null || shift == event.shiftKey)
          )
        ) || null
      )
    },
    bind(key: string, fn: Handler, type: HandlerType = 'keydown') {
      if (key == 'all') {
        return each(Object.keys(keys), key => this.bind(key, fn, type))
      }
      if (!keys[key]) {
        throw Error('unsupported key: ' + key)
      }

      let { code, shift } = keys[key],
        handlers = bound[type][code]

      if (!handlers) {
        handlers = bound[type][code] = []
      }
      handlers.push({ fn, shift })
    },
    unbind(key: string, arg2?: Handler | HandlerType, arg3?: HandlerType) {
      const fn = typeof arg2 == 'function' ? arg2 : void 0
      const type = arg3 || (!fn && (arg2 as HandlerType)) || 'keydown'

      if (key == 'all') {
        return each(Object.keys(keys), key => this.unbind(key, fn!, type))
      }
      if (!keys[key]) {
        throw Error('unsupported key: ' + key)
      }

      const { code, shift } = keys[key]
      bound[type][code] = bound[type][code].filter(
        entry => (fn && fn != entry.fn) || shift !== entry.shift
      )
    },
    reset,
    dispose() {
      each(nativeHandlers, ([type, fn]) =>
        container.removeEventListener(type, fn as any, true)
      )
    },
  }
}

function initKeys(
  setKey: (name: string | number, code: number, shift?: boolean) => void
) {
  let i: number

  // a - z
  for (i = 97; i <= 122; i++) {
    setKey(String.fromCharCode(i), 65 + (i - 97), false)
  }

  // A - Z
  for (i = 65; i <= 90; i++) {
    setKey(String.fromCharCode(i), i, true)
  }

  // 0 - 9
  for (i = 0; i <= 9; i++) {
    setKey(i, 48 + i, false)
  }

  // F1 - F12
  for (i = 1; i <= 12; i++) {
    setKey('F' + i, 111 + i)
  }

  // num0 - num9
  for (i = 0; i <= 9; i++) {
    setKey('num' + i, 96 + i)
  }

  // numpad misc
  each(
    ['*', '+', , '-', '.', '/'],
    (ch, i) => ch && setKey('num' + ch, 106 + i)
  )

  // symbols
  setKey('=', 187)
  setKey('-', 189)
  setKey(']', 221)
  setKey('[', 219)

  // arrows
  each(['left', 'up', 'right', 'down'], (name, i) => setKey(name, 37 + i))

  // extra keys
  setKey('space', 32)
  setKey('enter', 13)
  setKey('shift', 16)
  setKey('esc', 27)
  setKey('backspace', 8)
  setKey('tab', 9)
  setKey('ctrl', 17)
  setKey('alt', 18)
  setKey('delete', 46)
  setKey('pageup', 33)
  setKey('pagedown', 34)
}

function each<T>(arr: readonly T[], fn: (value: T, index: number) => void) {
  arr.forEach(fn)
}

export type KeyName =
  | 'all'
  | '='
  | '-'
  | ']'
  | '['
  | 'left'
  | 'up'
  | 'right'
  | 'down'
  | 'space'
  | 'enter'
  | 'shift'
  | 'esc'
  | 'backspace'
  | 'tab'
  | 'ctrl'
  | 'alt'
  | 'delete'
  | 'pageup'
  | 'pagedown'
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'H'
  | 'I'
  | 'J'
  | 'K'
  | 'L'
  | 'M'
  | 'N'
  | 'O'
  | 'P'
  | 'Q'
  | 'R'
  | 'S'
  | 'T'
  | 'U'
  | 'V'
  | 'W'
  | 'X'
  | 'Y'
  | 'Z'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | 'F1'
  | 'F2'
  | 'F3'
  | 'F4'
  | 'F5'
  | 'F6'
  | 'F7'
  | 'F8'
  | 'F9'
  | 'F10'
  | 'F11'
  | 'F12'
  | 'num0'
  | 'num1'
  | 'num2'
  | 'num3'
  | 'num4'
  | 'num5'
  | 'num6'
  | 'num7'
  | 'num8'
  | 'num9'
  | 'num*'
  | 'num+'
  | 'num-'
  | 'num.'
  | 'num/'
