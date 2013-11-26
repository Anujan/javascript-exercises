var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var addNumbers = function(sum, numsLeft, completionCallback) {
  if (numsLeft == 0) {
    return completionCallback(sum);
  }

  READER.question("Enter a number:", function(num) {
    num = parseInt(num);
    sum += num;
    console.log(sum);
    addNumbers(sum, numsLeft-1, completionCallback);
  });
}

addNumbers(0, 3, function (sum) {
  console.log("Total Sum: " + sum);
});