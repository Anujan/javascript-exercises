var readline = require('readline');

var READER = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var askLessThan = function(el1, el2, callback) {
  READER.question("is " + el1 + " < " + el2 + "? (yes/no):",function(answer) {
    callback(answer === "yes");
  })
};

var performSortPass = function(arr, i, madeAnySwaps, callback) {
  if (i == (arr.length - 1)) {
    callback(madeAnySwaps);
    return;
  } else {
    askLessThan(arr[i], arr[i+1], function(lessThan) {
      if (!lessThan) {
        var temp = arr[i + 1];
        arr[i + 1] = arr[i];
        arr[i] = temp;
        madeAnySwaps = true;
      }
      performSortPass(arr, i + 1, madeAnySwaps, callback);
    });
  }
}

var crazyBubbleSort = function(arr, sortCompletionCallback) {
  var sortPassCallback = function(madeAnySwaps) {
    if (madeAnySwaps) {
      performSortPass(arr, 0, false, sortPassCallback);
    } else {
      sortCompletionCallback(arr);
      READER.close();
    }
  }
  sortPassCallback(true);
}

crazyBubbleSort([3, 2, 1], function (arr) { console.log(arr); });