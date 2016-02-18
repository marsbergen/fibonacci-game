import angular from 'angular';

export default class AppController {
  constructor() {
    this.cells = {};

    this.grid = 50;
  }

  activate(xAxis, yAxis) {
    for (var row = 0; row < this.grid; row++) {
      if (!this.cells[row]) {
        this.cells[row] = {};
      }

      if (!this.cells[row][yAxis]) {
        this.cells[row][yAxis] = 1;
      } else {
        this.cells[row][yAxis]++;
      }

      if (!this.cells[xAxis]) {
        this.cells[xAxis] = {};
      }

      if (row != yAxis) {
        if (!this.cells[xAxis][row]) {
          this.cells[xAxis][row] = 1;
        } else {
          this.cells[xAxis][row]++;
        }
      }
    }

    for (var rowKey in this.cells) {
      if (!this.cells.hasOwnProperty(rowKey)) {
        continue;
      }

      var fib = this.checkFibonacci(this.cells[rowKey], rowKey);
      if (!!fib) {
        for (var c = 0; c < fib.length; c++) {
          this.cells[fib[c].x][fib[c].y] = 0;
        }
      }

    }
  }

  checkFibonacci(row, xAxis) {
    var fibSequence = [];

    var yAxis;
    for (yAxis in row) {
      if (!row.hasOwnProperty(yAxis)) {
        continue;
      }

      if (this.isFib(row[yAxis])) {
        fibSequence.push(yAxis);
      }
    }

    var prevY;
    var oneBeforePrevY = 0;
    var fibbi = [];
    var fibbiBatch = [];

    if(fibSequence < 5) {
      return false;
    }

    for (var n = 0; n < fibSequence.length; n++) {
      yAxis = fibSequence[n];

      if (prevY != undefined && prevY != yAxis - 1) {
        fibbi = [];
      }

      if (prevY != undefined) {
        var nextY = fibSequence[parseInt(n) + 1];
        if (nextY != undefined && row[prevY] + row[yAxis] != row[nextY]) {
          if (row[yAxis] > 0) {
            fibbi.push({x: xAxis, y: yAxis});
          }
          fibbiBatch.push(fibbi);
          fibbi = [];
          // It is cleared when not needed (yet)
        } else if (oneBeforePrevY != undefined && row[yAxis] - row[prevY] != row[oneBeforePrevY]) {
          fibbiBatch.push(fibbi);
          fibbi = [];
          fibbi.push({x: xAxis, y: prevY});
        }
      }

      if (row[yAxis] > 0) {
        fibbi.push({x: xAxis, y: yAxis});
      }

      oneBeforePrevY = prevY;
      prevY = yAxis;
    }

    for (var batch = 0; batch < fibbiBatch.length; batch++) {
      if (fibbiBatch[batch].length > 4) {
        return fibbiBatch[batch];
      }
    }

    return false;

  }

  getArray() {
    return new Array(this.grid);
  }

  isFib(val) {
    var check1 = 5 * Math.pow(val, 2) + 4;
    var check2 = 5 * Math.pow(val, 2) - 4;

    function isPerfectSquare(num) {
      return Math.sqrt(num) % 1 === 0;
    }

    //we see if the checks are perfect squares
    var isPerfect1 = isPerfectSquare(check1);
    var isPerfect2 = isPerfectSquare(check2);

    if (isPerfect1 && isPerfect2) {
      return true;
    }
    else return !!(isPerfect1 || isPerfect2);

  }

}
