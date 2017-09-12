// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // Use document.body as default if no node is provided
  var elem = arguments.length === 1 ? document.body : arguments[1];
  var list = Array.prototype.slice.call(elem.classList);
  var nodes = Array.prototype.slice.call(elem.childNodes);
  var retArr = [];

  // Check for className in list
  if (list.some(function (item) {return item === className})) {
    retArr.push(elem);
  }

  // Iterate along nodes, traversing recursively
  while (nodes.length !== 0) {
    var node = nodes.shift();
    // Done traversing this node
    if (node === undefined)
      return;
    // Check if node is ELEMENT_NODE
    if (node.nodeType === 1) {
      retArr = retArr.concat(getElementsByClassName(className, node));
    }
  }

  return retArr;
};
