keycharm
========

Easy and free library for binding keys.


Example:

```
var keys = keycharm(preventDefault); // prevent default called after function execution true or false.

keys.bind("a", function () {}, 'keydown'); // key, callback function, 'keydown' or 'keyup'
```

Supported keys:
```
'a'-'z', 'A'-'Z', '0'-'9', 'F1'-'F12', 'space', 'enter', 'ctrl', 'alt', 'tab', 'shift', 
'delete', 'esc', 'backspace', '-','=', '[', ']', 'left', 'up', 'right', 'down', 'pageup', 'pagedown'

numpad: 'num0'-'num9', 'num/', 'num*', 'num-', 'num+', 'num.'
```


Each initiation of keycharm has its own bindings to the key events.

Available methods:

```
.bind(key, callback, [type]);               // bind key, type = 'keydown' or 'keyup', default type = keydown.
.unbind(key, [callback], [type]);           // unbind key,  type = 'keydown' or 'keyup', default type = keydown. No callback deletes all bound callbacks from key
.reset();                                   // remove all bound keys
.destroy();                                 // remove all bound keys and the event listeners of keycharm
.getKey(event);                             // get the key label of the event
.bindAll(function, 'keydown' or 'keyup');   // bind all keys to this function, could be used for testing or demos.
```

Keycharm is Dual-licensed with both the Apache 2.0 license as well as the MIT license. I'll leave it up to the user to pick which one they prefer.