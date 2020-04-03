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
window.rooksObj = {};
window.queensObj = {};

window.findNRooksSolution = function(n) {

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  countNRooksSolutions(n);

  var rnd = getRandomInt(window.rooksObj[n].length - 1);

  // Array(n).fill().map(()=>Array(n).fill());
  // console.log(window.rooksolutions);

  var solution = JSON.parse(window.rooksObj[n][rnd]);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  // window.rooksolutions = [];

  var solutions = []; //store each soln board
  //var solutionCount = 0;
  var testBoard = new Board({n:n});

  var findSoln = function(row) {
    //if we've added a rook to all the rows
    if (row === n) {
      // solutionsCount++;
      //push stringified version to solutions array'
      solutions.push(JSON.stringify(testBoard.rows()));
      return;
    }
    //iterate over decisions
    for (var i = 0; i < n; i++) {
      //toggle a piece on the board
      testBoard.togglePiece(row, i);
      //check for no conflicts
      if (!testBoard.hasAnyRooksConflicts()) {  //continue to solve
        findSoln(row + 1);
      }

      testBoard.togglePiece(row, i);
    }
  };

  findSoln(0);

  //function factorial(x) { if (x === 0) { return 1;} return x * factorial(x-1);}
  window.rooksObj[n] = solutions;
  // solutionCount = solutions.length;
  // solutionCount = factorial(n); //fixme
  console.log('Number of solutions for ' + n + ' rooks:', solutions.length); //return length of soln array
  return solutions.length;
};

window.countNRooksSolutions = _.memoize(countNRooksSolutions);

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {


  var board = new Board({n:n});

  // if (n === 0) {
  //   solution = [[]];
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //   return [[]];
  // }

  // if (n === 1) {
  //   solution = [[1]];
  //   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //   return [[1]];
  // // }

  // if (n === 2 || n === 3) {
  //   // solution = board.rows();
  //   // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  //   return;
  // }

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  var countsolutions = countNQueensSolutions(n);

  var rnd = getRandomInt(window.queensObj[n].length - 1);
// Array(n).fill().map(()=>Array(n).fill());
// console.log(window.rooksolutions);
  var solution = JSON.parse(window.queensObj[n][rnd]);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;


};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {



  var solutions = []; //store each soln board
  //var solutionCount = 0;
  var testBoard = new Board({n:n});

  var findSoln = function(row) {
    //if we've added a rook to all the rows
    if (row === n) {
      // solutionsCount++;
      //push stringified version to solutions array'

      solutions.push(JSON.stringify(testBoard.rows()));
      return;
    }
    //iterate over decisions
    for (var i = 0; i < n; i++) {
      //toggle a piece on the board
      testBoard.togglePiece(row, i);
      //check for no conflicts
      if (!testBoard.hasAnyQueensConflicts()) {  //continue to solve
        findSoln(row + 1);
      }
      testBoard.togglePiece(row, i);
    }
  };

  findSoln(0);

  //function factorial(x) { if (x === 0) { return 1;} return x * factorial(x-1);}
  window.queensObj[n] = solutions;

  /// new stuff
  if (n === 2 || n === 3) {
    // solution = board.rows();
    // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
    window.queensObj[n] = [JSON.stringify(new Board({n:n}).rows())];
    // return;
  }
  // solutionCount = solutions.length;
  // solutionCount = factorial(n); //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutions.length);
  return solutions.length;
};

window.countNQueensSolutions = _.memoize(countNQueensSolutions);