import chai from 'chai';
const assert = chai.assert;
import solace from '../lib';

const MACHINE = 'machine';
const BEAUTIFUL = 'beautiful';
const OUTLINE = 'outline';

const RESET = 'reset';

var outMessage = RESET;

const writerOut = {
  write: (value) => {
    outMessage = value;
  }
};

var errMessage = RESET;

const writerErr = {
  write: (value) => {
    errMessage = value;
  }
};

const resetWriter = () => {
  outMessage = RESET;
  errMessage = RESET;

};

const optionsWithTitle = {
  title: 'title 123'
};

const createSolace = (theme) => {
  resetWriter();
  return solace({
    standardOut: writerOut,
    standardErr: writerErr,
    defaultTheme: theme
  });
};

const check = (theme, toWrite, expectedOut, expectedErr) => {
  const sol = createSolace(theme);
  const result = sol.log(toWrite);
  assert.deepEqual(result, toWrite);
  assert.include(outMessage, expectedOut);
  assert.include(errMessage, expectedErr);
};

const checkWithOpts = (theme, toWrite, expectedOut, expectedErr, opts) => {
  const sol = createSolace(theme);
  const result = sol.log(toWrite, opts);
  assert.deepEqual(result, toWrite);
  assert.include(outMessage, expectedOut);
  assert.include(errMessage, expectedErr);
};

describe('solace', function () {
  it('should write string!', function () {
    check(MACHINE, 'Some Text', 'Some Text\n', RESET);
    check(BEAUTIFUL, 'Some Text', 'Some Text\n', RESET);
    check(OUTLINE, 'Some Text', 'Some Text\n', RESET);
    checkWithOpts(MACHINE, 'Some Text', 'Some Text\n', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, 'Some Text', 'Some Text\n', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, 'Some Text', 'Some Text\n', RESET, optionsWithTitle);
  });
  it('should write boolean!', function () {
    check(MACHINE, true, 'true\n', RESET);
    check(BEAUTIFUL, false, 'false\n', RESET);
    check(OUTLINE, true, 'true\n', RESET);
    checkWithOpts(MACHINE, true, 'true\n', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, false, 'false\n', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, true, 'true\n', RESET, optionsWithTitle);
  });
  it('should write number!', function () {
    check(MACHINE, 12, '12\n', RESET);
    check(BEAUTIFUL, 12.4, '12.4\n', RESET);
    check(OUTLINE, -12, '-12\n', RESET);
    checkWithOpts(MACHINE, 15, '15\n', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, -15.3, '-15.3\n', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, 12.7, '12.7\n', RESET, optionsWithTitle);
  });
  it('should write date!', function () {
    const dd = new Date(1450816541000);
    check(MACHINE, dd, '2015-12-22T', RESET);
    check(BEAUTIFUL, dd, '2015-12-22T', RESET);
    check(OUTLINE, dd, '2015-12-22T', RESET);
    checkWithOpts(MACHINE, dd, '2015-12-22T', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, dd, '2015-12-22T', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, dd, '2015-12-22T', RESET, optionsWithTitle);
  });
  it('should write regex!', function () {
    check(MACHINE, /[A-Z]+/, '/[A-Z]+/\n', RESET);
    check(BEAUTIFUL, /[A-Z]+/, '/[A-Z]+/\n', RESET);
    check(OUTLINE, /[A-Z]+/, '/[A-Z]+/\n', RESET);
    checkWithOpts(MACHINE, /[A-Z]+/, '/[A-Z]+/\n', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, /[A-Z]+/, '/[A-Z]+/\n', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, /[A-Z]+/, '/[A-Z]+/\n', RESET, optionsWithTitle);
  });
  it('should write null!', function () {
    check(MACHINE, null, 'value is null\n', RESET);
    check(BEAUTIFUL, null, 'value is null\n', RESET);
    check(OUTLINE, null, 'value is null\n', RESET);
    checkWithOpts(MACHINE, null, 'value is null\n', RESET, optionsWithTitle);
    checkWithOpts(BEAUTIFUL, null, 'value is null\n', RESET, optionsWithTitle);
    checkWithOpts(OUTLINE, null, 'value is null\n', RESET, optionsWithTitle);
  });
  it('should write void!', function () {
    check(MACHINE, void 0, RESET, 'value is undefined');
    check(BEAUTIFUL, void 0, RESET, 'value is undefined');
    check(OUTLINE, void 0, RESET, 'value is undefined');
    checkWithOpts(MACHINE, void 0, RESET, 'value is undefined', optionsWithTitle);
    checkWithOpts(BEAUTIFUL, void 0, RESET, 'value is undefined', optionsWithTitle);
    checkWithOpts(OUTLINE, void 0, RESET, 'value is undefined', optionsWithTitle);
  });
  it('should write an error!', function () {
    const e = new Error('this is an error');
    check(MACHINE, e, RESET, 'Error: this is an error');
    check(BEAUTIFUL, e, RESET, 'Error: this is an error');
    check(OUTLINE, e, RESET, 'Error: this is an error');
    checkWithOpts(MACHINE, e, RESET, 'Error: this is an error', optionsWithTitle);
    checkWithOpts(BEAUTIFUL, e, RESET, 'Error: this is an error', optionsWithTitle);
    checkWithOpts(OUTLINE, e, RESET, 'Error: this is an error', optionsWithTitle);
  });
  it('should write NaN!', function () {
    check(MACHINE, NaN, RESET, 'value is not a number');
    check(BEAUTIFUL, NaN, RESET, 'value is not a number');
    check(OUTLINE, NaN, RESET, 'value is not a number');
    checkWithOpts(MACHINE, NaN, RESET, 'value is not a number', optionsWithTitle);
    checkWithOpts(BEAUTIFUL, NaN, RESET, 'value is not a number', optionsWithTitle);
    checkWithOpts(OUTLINE, NaN, RESET, 'value is not a number', optionsWithTitle);
  });
  it('should write an object!', function () {
    const obj = {
      a: 12,
      b: true,
      c: 'text123',
      d: ['alpha', 'bravo']
    };
    const objStr = '{"a":12,"b":true,"c":"text123","d":["alpha","bravo"]}\n';
    check(MACHINE, obj, objStr, RESET);
    checkWithOpts(MACHINE, obj, objStr, RESET, optionsWithTitle);
  });
  it('should write an empty array!', function () {
    check(MACHINE, [], '[]\n', RESET);
    check(BEAUTIFUL, [], '[]\n', RESET);
    check(OUTLINE, [], '(empty array)\n', RESET);
  });
  it('should write an array!', function () {
    const arr = ['alpha', 12, true, 'bravo'];
    check(MACHINE, arr, '["alpha",12,true,"bravo"]\n', RESET);
  });

  it('should display a few samples in beautiful mode', function () {
    const solBeautiful = solace({
      standardOut: process.stdout,
      standardErr: process.stderr,
      defaultTheme: BEAUTIFUL
    });
    solBeautiful.log(new Error('this an error'));
    solBeautiful.log(new Error('this an error with title'), optionsWithTitle);
    solBeautiful.log('Some text', optionsWithTitle);

    const beautifulData = {
      months: ['janvier', 'fevrier', 'mars'],
      boolean: true,
      number: 13.4,
      string: 'some text',
      child: {
        name: 'name123',
        age: 43
      }
    };
    solBeautiful.log(beautifulData, optionsWithTitle);

    const arrOfSV = ['jan', 'feb', true, 12, 'june'];
    solBeautiful.log(arrOfSV, optionsWithTitle);

    const dd = new Date(1450816541000);
    const row1 = {
      col1: 'column1',
      col2: dd,
      col3: 'column3'
    };
    const row2 = {
      col1: 'column1B',
      col2: true,
      col4: 'column4'
    };
    const row3 = {
      col1: 'column1',
      col5: 12
    };
    const rows = [row1, row2, row3];
    solBeautiful.log(rows, optionsWithTitle);
  });

  it('should display a few samples in outline mode', function () {
    const solOutline = solace({
      standardOut: process.stdout,
      standardErr: process.stderr,
      defaultTheme: OUTLINE
    });
    solOutline.log(new Error('this an error'));
    solOutline.log(new Error('this an error with title'), optionsWithTitle);
    solOutline.log('Some text', optionsWithTitle);

    const outlineData = {
      months: ['janvier', 'fevrier', 'mars'],
      boolean: true,
      number: 13.4,
      string: 'some text',
      child: {
        name: 'name123',
        age: 43
      }
    };
    solOutline.log(outlineData, optionsWithTitle);

    const arrOfSV = ['jan', 'feb', true, 12, 'june'];
    solOutline.log(arrOfSV, optionsWithTitle);

    const dd = new Date(1450816541000);
    const row1 = {
      col1: 'column1',
      col2: dd,
      col3: 'column3'
    };
    const row2 = {
      col1: 'column1B',
      col2: true,
      col4: 'column4'
    };
    const row3 = {
      col1: 'column1C',
      col2: 12.3,
      col5: 12
    };
    const rows = [row1, row2, row3];
    solOutline.log(rows, optionsWithTitle);

  });


});
