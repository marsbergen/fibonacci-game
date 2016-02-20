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

    expect(controller.checkFibonacci(row)).toBeFalsy();
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

    var expectation = [ 1, 2, 3, 4, 5 ];

    expect(controller.checkFibonacci(row)).toEqual(expectation);
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

    var expectation = [ 1, 2, 3, 4, 5 ];

    expect(controller.checkFibonacci(row)).toEqual(expectation);
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

    var expectation = [ 1, 2, 3, 4, 5 ];

    expect(controller.checkFibonacci(row)).toEqual(expectation);
  });

  it('should set all cell values to 1 in the same row and column of the activated cell when the activate is trigger with the correct xAxis and yAxis', () => {
    let controller = new AppController();
    controller.activate(4, 6);

    expect(controller.cells[4][0]).toEqual(1);
    expect(controller.cells[4][1]).toEqual(1);
    expect(controller.cells[4][2]).toEqual(1);
    expect(controller.cells[4][6]).toEqual(1);
    expect(controller.cells[4][49]).toEqual(1);
    expect(controller.cells[1][6]).toEqual(1);
    expect(controller.cells[4][6]).toEqual(1);
    expect(controller.cells[6][6]).toEqual(1);
    expect(controller.cells[7][7]).toBeFalsy();
  });
});
