// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  if (obj === null)
    return 'null';
  
  if (typeof(obj) === 'number' || typeof(obj) === 'boolean')
    return obj.toString();

  if (typeof(obj) === 'string')
    return '"' + obj + '"';

  if (typeof(obj) === 'object') {
    if (obj.constructor === Array) {
      return '[' + obj.map(function (item) { return stringifyJSON(item) }) + ']';
    } else { // Object
      return '{' + 
        Object.entries(obj).filter(function (item) {
          return (item[0] !== 'undefined' && item[0] !== 'functions')
        }).map(function (item) {
          return stringifyJSON(item[0]) + ':' + stringifyJSON(item[1])
        })
      + '}';
    }
  }
};
