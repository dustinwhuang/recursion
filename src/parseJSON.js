// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  console.log('json = ', json);

  if (json[0] === '[' && json[json.length-1] === ']') {
    var retArr = [];
    var str = json.slice(1, -1).split(/,\s*(?=(?:(?:[^"]*"){2})*[^"]*$)(?=[^\]]*(?:\[|$))(?=[^\}]*(?:\{|$))/).filter(function (item) {return item !== ''});
    console.log('str = ', str);
    retArr = str.map(function (item) {
      return parseJSON(item);
    })
    return retArr;
  }

  if (json[0] === '{' && json[json.length-1] === '}') {
    var retObj = {};
    var str = json.slice(1, -1).split(/,\s*(?=(?:(?:[^"]*"){2})*[^"]*$)(?=[^\]]*(?:\[|$))(?=[^\}]*(?:\{|$))/).filter(function (item) {return item !== ''});
    console.log('str = ', str);
    str = str.map(function (item) {
      var arr = item.split(/:\s*(?=[^\}]*(?:\{|$))(?=[^\]]*(?:\[|$))/);
      console.log('arr = ', arr);
      return retObj[parseJSON(arr[0])] = parseJSON(arr[1]);
    });
    // if (str.length > 1)
    //   retObj[parseJSON(str[0])] = parseJSON(str[1]);

    return  retObj;
  }

  if (json[0] === '"' && json[json.length-1] === '"') {
    //console.log('unescape = ', json.slice(1, -1).replace(/\\\\["]/g, '$&'));
    return json.slice(1, -1);
  }

  if (/true\s*/.test(json))
    return true;
  if (/false\s*/.test(json))
    return false;
  if (/null\s*/.test(json))
    return null;
  if (/^[-+]?[0-9]*\.?[0-9]+$/.test(json))
    return parseFloat(json);

  // throw new SyntaxError();
};
