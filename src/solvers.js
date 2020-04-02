/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {

  // if (n === 1 ) {
  //   return [[1]];
  // }

  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  var solutions = [];

  // var newMatrix = [Array(n).map((x) => (new Array(this.length+2)))];

  var countRooksHelper = function (currentSolutionStr) {
    if (currentSolutionStr.length === n * n) {
      //some kind of filter to only add solns with 3 '1's
      solutions.push(currentSolutionStr);
      return;
    }
    ['0', '1'].forEach(x => {
      countRooksHelper(currentSolutionStr + x);
    });

  };

  countRooksHelper('');
  // filter out failing solutions if any got through our process
  // currentSolutions.filter(x => !x.hasAnyConflicts());

  // solutions.filter(x => {
  //   var re = /*1*1*1/g; */
  //   x.search(re);

  // });
  console.log(solutions);

  var filterStrs = function (arr) {
    result = [];
    for (var string of arr) {
      onecount = {};
      for (var char of string) {
        if (char === '1') {
          if (onecount[string] === undefined) {
            onecount[string] = 1;
          } else {
            onecount[string] += 1;
          }
        }
      }
      if (onecount[string] === n) {
        result.push(string);
      }
    }
    return result;
  };


  filteredSolutions = filterStrs(solutions);

  // console.log(filteredSolutions);

  var convertToMatrix = function (arr) {

    var results = [];

    var conv = function(str) {

      var convertedArr = Array(n).fill().map(()=>Array(n).fill());

      for (var i = 0; i < n; i++) {
        for (var j = 0; j < n; j++) {
          convertedArr[i][j] = Number(str[0]);
          str = str.slice(1);
        }
      }

      return convertedArr;
    };

    for (var str of arr) {
      results.push(conv(str));
    }

    return results;
  };

  matrixedSolutions = convertToMatrix(filteredSolutions);

  console.log(matrixedSolutions);

  var filterFails = function (arr) {
    var results = [];

    for (var matrix of arr) {
      var board = new Board(matrix);
      if (!board.hasAnyRooksConflicts()) {
        results.push(matrix);
      }
    }
    return results;

  };

  successfulsolutions = filterFails(matrixedSolutions);

  console.log((successfulsolutions));

  var solutionCount = successfulsolutions.length; //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
