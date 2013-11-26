Function.prototype.myBind = function(self) {
  var args = Array.prototype.slice.call(arguments);
  this.apply(self, args.slice(1));
}

obj = {
  name: "Earl Watts"
};

function greet(msg1, msg2) {
  console.log(msg1 + ": " + this.name);
  console.log(msg2 + ": " + this.name);
}

greet.myBind(obj, "hello", "goodbye");