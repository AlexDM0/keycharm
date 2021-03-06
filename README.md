# keycharm

Easy and free library for binding keys.

## Install

Keycharm is on npm so you can install it with:

```bash
npm install keycharm
```

## Import

### IIFE (browser)

After importing the script `keycharm` is availible globally:

```html
<script src="https://unpkg.com/keycharm/keycharm.js">
```

### CommonJS

```js
const keycharm = require('keycharm');
```

### ESM

```js
import keycharm from 'keycharm';
```

## Usage

```js
var keys = keycharm(options);
keys.bind("a", function () {}, 'keydown'); // key, callback function, 'keydown' or 'keyup'
```

### Available options (all are optional)

```js
{
    /* optional div to bind keycharm to.
     * It will NEED a tabindex. When not supplied, this defaults to window. */
    container: document.getElementById("element"),

    /* swallow events (default: false) */
    preventDefault: false
}
```

### Supported keys

```txt
'a'-'z', 'A'-'Z', '0'-'9', 'space', 'enter', 'ctrl', 'alt', 'tab', 'shift', 'delete', 'backspace', '-', '=', '[', ']',

'esc', 'F1'-'F12', 'pageup', 'pagedown',

'left', 'up', 'right', 'down',

'num0'-'num9', 'num/', 'num*', 'num-', 'num+', 'num.'
```

Each initiation of keycharm has its own bindings to the key events.

### Available methods

```js
/* bind key, type = 'keydown' or 'keyup', default type = keydown. */
.bind(key, callback, [type]);

/* unbind key,  type = 'keydown' or 'keyup', default type = keydown. No callback deletes all bound callbacks from key */
.unbind(key, [callback], [type]);

/* remove all bound keys */
.reset();

/* remove all bound keys and the event listeners of keycharm */
.destroy();

/* get the key label of the event */
.getKey(event);

/* bind all keys to this function, could be used for testing or demos. */
.bindAll(function, 'keydown' or 'keyup');
```

Common Pitfalls:

You might feel tempted to use the keycharm library to bind keys to elements other than just form elements. Great, however, in this case you should be aware of the fact that besides giving focus to the element (e.g. programmatically `element.focus()`) you also need to add a tabindex! Simply focussing will *not* work.

## License

Keycharm is Dual-licensed with both the Apache 2.0 license as well as the MIT license.
I'll leave it up to the user to pick which one they prefer.
