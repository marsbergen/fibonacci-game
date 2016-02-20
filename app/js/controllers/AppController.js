import angular from 'angular';

export default class AppController {
  constructor() {
    this.cells = {};

    this.grid = 50;
  }

  /**
   * Used by the ngClick in the view and will pass on the xAxis and yAxis of the cell that is clicked
   *
   * @param xAxis int
   * @param yAxis int
   */
  activate(xAxis, yAxis) {
    // Walk through every row in the grid
    for (var row = 0; row < this.grid; row++) {
      // If we don't have any cells of this row stored it's undefined by default
      // to make sure we don't get JS errors, we make it an empty object
      if (!this.cells[row]) {
        this.cells[row] = {};
      }

      // Is there no cell found in the row it's undefined, we make it 1 because we cannot do a ++ on nothing
      if (!this.cells[row][yAxis]) {
        this.cells[row][yAxis] = 1;
      } else {
        // The cell already got a value, so we increase that
        // It might occur that the value is there, but no integer.
        // In that case the app is hijacked and doesn't have to respond to it and may throw any errors. DO NOT HIJACK THIS PROTOTYPE.
        this.cells[row][yAxis]++;
      }

      // If the column is undefined, create an empy object so we don't get JS errors later
      if (!this.cells[xAxis]) {
        this.cells[xAxis] = {};
      }

      // If the current row is not on the same row as the to be activated cell.
      if (row != yAxis) {
        // Then check if the column is the same as the to be activated yAxis
        // If the cell is undefined, set it to 1
        if (!this.cells[xAxis][row]) {
          this.cells[xAxis][row] = 1;
        } else {
          // Else do a +1
          this.cells[xAxis][row]++;
        }
      }
    }

    // Now that all cell activation and updating is done, check for fibonacci sequences per row
    for (var rowKey in this.cells) {
      if (!this.cells.hasOwnProperty(rowKey)) {
        continue;
      }

      // Check for fibonacci in the current row
      var fib = this.checkFibonacci(this.cells[rowKey]);
      if (!!fib) {
        // Found a fibonacci! Now read the returned array with y-axes and set all the cells to 0
        for (var c = 0; c < fib.length; c++) {
          this.cells[rowKey][fib[c]] = 0;
        }
      }

    }
  }

  /**
   * Will check if the row object contains a fibonacci sequence,
   * if so it will return an array with the x/y values of the cells containing the sequence
   *
   * @param row Object with yAxis as key and cellValue as value
   * @returns Array with y-axis integer
   */
  checkFibonacci(row) {
    var fibSequence = [];
    var yAxis;
    var prevY;
    var oneBeforePrevY;

    // Will contain the current fibonacci sequence
    var localFibStore = [];

    // Will contain localFibStore arrays.
    // When the next cell does not match in current sequence the previous sequence will be
    // pushed to the batchStore and the current cell value will start a new localFibStore
    // By the end of this method we will check if any of the arrays in the BatchStore is bigger than 4 items.
    // If so we will return them back to the activation method
    var localFibBatchStore = [];

    // Loop through row to find y-axes, check if there are fibonacci numbers in the row.
    // If so save the y-axis so we can use them later
    for (yAxis in row) {
      if (!row.hasOwnProperty(yAxis)) {
        continue;
      }

      if (this.isFib(row[yAxis])) {
        fibSequence.push(yAxis);
      }
    }

    // If the row contains less than 5 fib numbers it is already invalid so quit early
    if(fibSequence < 5) {
      return false;
    }

    // Loop through the list of fibonacci numbers to check if they are standing in the correct order
    for (var n = 0; n < fibSequence.length; n++) {
      // Save the yAxis for later
      yAxis = fibSequence[n];

      // Clear the (local) Fibonacci store if the previous yAxis is not the direct previous one in the row from the current yAxis
      // Don't clear if there the localFibStore is already empty
      if (localFibStore.length > 0 && yAxis - 1 != prevY) {
        localFibStore = [];
      }

      // If this is at least the second column
      if (prevY != undefined) {
        var nextY = parseInt(fibSequence[parseInt(n) + 1]);
        // If there is a next number in line and the value of the previous cell + the value of the current cell
        // are not matching the value of the next cell
        if (nextY != undefined && row[prevY] + row[yAxis] != row[nextY]) {
          if (row[yAxis] > 0) {
            // Only store if the cell has a value greater than 0
            localFibStore.push(parseInt(yAxis));
          }
          
          localFibBatchStore.push(localFibStore);
          localFibStore = [];
        }

        if (nextY == undefined && oneBeforePrevY != undefined && row[yAxis] - row[prevY] != row[oneBeforePrevY]) {
          if (row[yAxis] > 0) {
            // Only store if the cell has a value greater than 0
            localFibStore.push(parseInt(yAxis));
          }

          localFibBatchStore.push(localFibStore);
          localFibStore = [];
        }
      }

      if (row[yAxis] > 0) {
        // Only store if the cell has a value greater than 0
        localFibStore.push(parseInt(yAxis));
      }

      oneBeforePrevY = parseInt(prevY);
      prevY = parseInt(yAxis);
    }

    // Walk through the localFibBatchStore to determine if there are any fib. sequences longer than 4 in found in the row,
    // if so return that sequence array. The array will contain the y-axes
    for (var batch = 0; batch < localFibBatchStore.length; batch++) {
      if (localFibBatchStore[batch].length > 4) {
        return localFibBatchStore[batch];
      }
    }

    // No fibonacci sequences found longer than 4 numbers
    return false;
  }

  /**
   * Helper method, used by the view for easy grid rendering
   * @returns {Array}
   */
  getArray() {
    return new Array(this.grid);
  }

  /**
   * Check if a value would appear in a fibonacci sequence
   * Found this method somewhere on Github Gist
   *
   * @param val int Value of a cell
   * @returns boolean
   */
  isFib(val) {
    var check1 = 5 * Math.pow(val, 2) + 4;
    var check2 = 5 * Math.pow(val, 2) - 4;

    function isPerfectSquare(num) {
      return Math.sqrt(num) % 1 === 0;
    }

    // We see if the checks are perfect squares
    var isPerfect1 = isPerfectSquare(check1);
    var isPerfect2 = isPerfectSquare(check2);

    if (isPerfect1 && isPerfect2) {
      return true;
    }
    else return !!(isPerfect1 || isPerfect2);
  }
}
