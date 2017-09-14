// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  // Remove whitespace
  json = json.replace(/[\r\n\t]+/g, '').trim();

  if (json[0] === '[') {
    if (json[json.length-1] !== ']')
      throw new SyntaxError('Unexpected end of JSON input');
    var retArr = [];
    var str = splitJSON(json.slice(1, -1), ',');

    retArr = str.map(function (item) {
      return parseJSON(item);
    })
    return retArr;
  }

  if (json[0] === '{') {
    if (json[json.length-1] !== '}')
      throw new SyntaxError('Unexpected end of JSON input');
    var retObj = {};

    var str = splitJSON(json.slice(1, -1), ',');

    str = str.map(function (item) {
      var arr = splitJSON(item, ':');
      return retObj[parseJSON(arr[0])] = parseJSON(arr[1]);
    });

    return  retObj;
  }

  if (json[0] === '"' && json[json.length-1] === '"') {
    return json.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  if (json === 'true')
    return true;
  if (json === 'false')
    return false;
  if (json === 'null')
    return null;
  if (/^[-+]?[0-9]*[.]?[0-9]+$/.test(json))
    return parseFloat(json);

};

var splitJSON = function(sliced, char) {
  var str = [];
  var square = 0;
  var curly = 0;
  var quote = 0;
  var start = 0;

  for (var i = 0; i < sliced.length; i++) {
    switch (sliced[i]) {
      case '{':
        curly++;
        break;
      case '}':
        curly--;
        if (curly < 0) {
          throw new SyntaxError('Unexpected end of JSON input');
        }
        break;
      case '[':
        square++;
        break;
      case ']':
        square--;
        if (square < 0) {
          throw new SyntaxError('Unexpected end of JSON input');
        }
        break;
      case '"':
        if (sliced[i-1] !== '\\')
          quote++;
        break;
      case char:
        if (curly === 0 && square === 0 && quote % 2 === 0) {
          str.push(sliced.slice(start, i).trim());
          start = i + 1;
        }
        break;
    }
  }
  if (quote % 2 !== 0)
    throw new SyntaxError('Unexpected end of JSON input');

  if (start !== sliced.length)
    str.push(sliced.slice(start, sliced.length).trim());

  return str;
};
