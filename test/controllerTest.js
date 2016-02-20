import AppController from '../app/js/controllers/AppController.js';

describe('AppController', () => {
  it('should return false if there is no fibonacci in a row object', () => {
    let controller = new AppController();

    var row = {
      0: 1,
      1: 1,
      2: 2,
      3: 3,
      4: 1,
      5: 8,
      6: 1,
      7: 1,
      8: 1,
      9: 1
    };

    expect(controller.checkFibonacci(row, 1)).toBeFalsy();
  });

  it('should return an array of cell objects if there is a fibonacci found in a row object', () => {
    let controller = new AppController();

    var row = {
      0: 9,
      1: 1,
      2: 2,
      3: 3,
      4: 5,
      5: 8,
      6: 1,
      7: 1,
      8: 1,
      9: 1
    };

    var expectation = [
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 1, y: 5}
    ];

    expect(controller.checkFibonacci(row, 1)).toEqual(expectation);
  });

  it('should return an array of cell objects if there is a fibonacci found in a row object and the fib sequence is surrounded by 0', () => {
    let controller = new AppController();

    var row = {
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 5,
      5: 8,
      6: 0,
      7: 0,
      8: 0,
      9: 0
    };

    var expectation = [
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 1, y: 5}
    ];

    expect(controller.checkFibonacci(row, 1)).toEqual(expectation);
  });

  it('should return an array of cell objects if there is a fibonacci found in a row object and the fib sequence is surrounded by undefined', () => {
    let controller = new AppController();

    var row = {
      0: undefined,
      1: 1,
      2: 2,
      3: 3,
      4: 5,
      5: 8,
      6: undefined,
      7: undefined,
      8: undefined,
      9: undefined
    };

    var expectation = [
      {x: 1, y: 1},
      {x: 1, y: 2},
      {x: 1, y: 3},
      {x: 1, y: 4},
      {x: 1, y: 5}
    ];

    expect(controller.checkFibonacci(row, 1)).toEqual(expectation);
  });
});
