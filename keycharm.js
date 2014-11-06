/**
 * Created by Alex on 11/6/2014.
 */

function keycharm() {
  var _bound = {keydown:{}, keyup:{}, keypress:{}};
  var _keys = {};
  var i;

  // a - z
  for (i = 97; i <= 122; i++) {_keys[String.fromCharCode(i)] = {code:65 + (i - 97), shift: false};}
  // A - Z
  for (i = 65; i <= 90; i++) {_keys[String.fromCharCode(i)] = {code:i, shift: true};}
  // 0 - 9
  for (i = 0;  i <= 9;   i++) {_keys['' + i] = {code:48 + i, shift: false};}
  // F1 - F12
  for (i = 1;  i <= 12;   i++) {_keys['F' + i] = {code:111 + i, shift: false};}
  // num0 - num9
  for (i = 0;  i <= 9;   i++) {_keys['num' + i] = {code:96 + i, shift: false};}

  // numpad misc
  _keys['num*'] = {code:106, shift: false};
  _keys['num+'] = {code:107, shift: false};
  _keys['num-'] = {code:109, shift: false};
  _keys['num/'] = {code:111, shift: false};
  _keys['num.'] = {code:110, shift: false};
  // arrows
  _keys['left']  = {code:37, shift: false};
  _keys['up']    = {code:38, shift: false};
  _keys['right'] = {code:39, shift: false};
  _keys['down']  = {code:40, shift: false};
  // extra keys
  _keys['space'] = {code:32, shift: false};
  _keys['enter'] = {code:13, shift: false};
  _keys['shift'] = {code:16, shift: false};
  _keys['esc']   = {code:27, shift: false};
  _keys['backspace'] = {code:8, shift: false};
  _keys['tab']       = {code:9, shift: false};
  _keys['ctrl']      = {code:17, shift: false};
  _keys['alt']       = {code:18, shift: false};
  _keys['delete']    = {code:46, shift: false};
  // symbols
  _keys['=']     = {code:187, shift: false};
  _keys['-']     = {code:189, shift: false};
  _keys[']']     = {code:221, shift: false};
  _keys['[']     = {code:219, shift: false};



  var down = function(event) {handleEvent(event,'keydown');};
  var up = function(event) {handleEvent(event,'keyup');};
  //var press = function(event) {handleEvent(event,'keypress');};

  var handleEvent = function(event,type) {
    if (_bound[type][event.keyCode] !== undefined) {
      if (event.shiftKey == true && _bound[type][event.keyCode]['shift'] !== undefined) {
        _bound[type][event.keyCode]['shift'](event);
      }
      else if (event.keyCode == _keys['shift'].code) {
        _bound[type][event.keyCode][''](event);
      }
      else {
        _bound[type][event.keyCode][''](event);
      }
    }
  };

  this.bind = function(key, callback, type) {
    if (type === undefined) {
      type = 'keydown';
    }
    if (_keys[key] === undefined) {
      throw new Error("unsupported key: " + key);
    }
    if (_bound[type][_keys[key].code] === undefined) {
      _bound[type][_keys[key].code] = {};
    }
    var modifier = _keys[key].shift == true ? 'shift' : '';
    _bound[type][_keys[key].code][modifier] = callback;
  };

  this.bindAll = function(callback, type) {
    if (type === undefined) {
      type = 'keydown';
    }
    for (key in _keys) {
      if (_keys.hasOwnProperty(key)) {
        this.bind(key,callback,type);
      }
    }
  }

  this.getKey = function(event) {
    for (key in _keys) {
      if (_keys.hasOwnProperty(key)) {
        if (event.shiftKey == true && _keys[key].shift == true && event.keyCode == _keys[key].code) {
          return key;
        }
        else if (event.shiftKey == false && _keys[key].shift == false && event.keyCode == _keys[key].code) {
          return key;
        }
        else if (event.keyCode == _keys[key].code && key == 'shift') {
          return key;
        }
      }
    }
  };

  this.unbind = function(key, type) {
    if (type === undefined) {
      type = 'keydown';
    }
    if (_keys[key] === undefined) {
      throw new Error("unsupported key: " + key);
    }
    var modifier = _keys[key].shift == true ? 'shift' : '';
    delete _bound[type][_keys[key].code][modifier];
  };

  this.clear = function() {
    _bound = {keydown:{}, keyup:{}, keypress:{}};
  };

  this.destroy = function() {
    _bound = {keydown:{}, keyup:{}, keypress:{}};
    window.removeEventListener('keydown', down, true);
    window.removeEventListener('keyup', up, true);
    //window.removeEventListener('keypress', press, true);
  };

  window.addEventListener('keydown',down,true);
  window.addEventListener('keyup',up,true);
  //window.addEventListener('keypress',press,true);

  return this;
}


