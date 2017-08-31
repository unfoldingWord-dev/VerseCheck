/* eslint-disable no-console */
import {describe, it} from 'mocha';
import { expect } from 'chai';
import isEqual from 'lodash/isEqual'
//helpers
import * as selectionHelpers from '../helpers/selectionHelpers';

describe('selectionHelpers.spliceStringOnRanges', () => {
  it('should splice string on ranges', function (done) {
    const string = "01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890";
    const ranges = [ { range: [ 45, 47 ], occurrence: 2, occurrences: 2 } ];
    const output = selectionHelpers.spliceStringOnRanges(string, ranges);
    const expected = [
      { text: '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 ', selected: false },
      { text: '234', selected: true, occurrence: 2, occurrences: 2 },
      { text: ' 567890', selected: false }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});

describe('selectionHelpers.selectionsToRanges', () => {
  const string = "01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890";
  it('should return ranges from selections with one selection', function (done) {
    const selections = [
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    const output = selectionHelpers.selectionsToRanges(string, selections);
    const expected = [[45,47]];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return ranges from selections with two selections', function (done) {
    const selections = [
      { text: 'querty', occurrence: 1, occurrences: 1 },
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    const output = selectionHelpers.selectionsToRanges(string, selections);
    const expected = [[45,47],[12,17]];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});

describe('selectionHelpers.selectionsToSelectedStrings', () => {
  const string = '01 234 56789qwertyuiopasd234fghjklzxcvbnmtyui01 234 567890';
  it('should return array of objects of selected strings from selections without spaces around it', function (done) {
    const selections = [
      { text: '234', occurrence: 2, occurrences: 3 }
    ];
    const output = selectionHelpers.selectionsToSelectedStrings(string, selections);
    const expected = [
      { text: '01 234 56789qwertyuiopasd234fghjklzxcvbnmtyui01 ', selected: false },
      { text: '234', selected: true },
      { text: ' 567890', selected: false }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return array of objects of selected strings from selections with spaces around it', function (done) {
    const selections = [
      { text: '234', occurrence: 1, occurrences: 3 }
    ];
    const output = selectionHelpers.selectionsToSelectedStrings(string, selections);
    const expected = [
      { text: '01 ', selected: false },
      { text: '234', selected: true },
      { text: ' 56789qwertyuiopasd234fghjklzxcvbnmtyui01 234 567890', selected: false }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});

describe('selectionHelpers.optimizeRanges', () => {
  it('should return ranges array without duplicates and overlaps merged', function (done) {
    const ranges = [[1,1],[5,9],[3,4],[7,10],[20,40],[15,16],[14,17]];
    const output = selectionHelpers.optimizeRanges(ranges);
    const expected = [[1,1],[3,10],[14,17],[20,40] ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return ranges array without duplicates', function (done) {
    const ranges = [[5,9],[5,9],[14,17]];
    const output = selectionHelpers.optimizeRanges(ranges);
    const expected = [[5,9],[14,17]];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return ranges array with overlaps merged', function (done) {
    const ranges = [[5,9],[7,10],[15,16],[14,17]];
    const output = selectionHelpers.optimizeRanges(ranges);
    const expected = [[5,10],[14,17]];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return ranges array in order', function (done) {
    const ranges = [[5,9],[3,4],[20,40],[15,16]];
    const output = selectionHelpers.optimizeRanges(ranges);
    const expected = [[3,4],[5,9],[15,16],[20,40]];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});

describe('selectionHelpers.rangesToSelections', () => {
  it('should return array of selection objects', function (done) {
    const string = "0123456789qwertyuiopasdfghjklzxcvbnmtyui01234567890";
    const ranges = [ [3,9], [14,17], [20,40] ];
    const expected = [ { text: '3456789', occurrence: 1, occurrences: 2 },
       { text: 'tyui', occurrence: 1, occurrences: 2 },
       { text: 'asdfghjklzxcvbnmtyui0', occurrence: 1, occurrences: 1 }
     ];
     const output = selectionHelpers.rangesToSelections(string, ranges);
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return array of one selection object with one range', function (done) {
    const string = "0123456789qwertyuiopasdfghjklzxcvbnmtyui01234567890";
    const ranges = [ [3,9] ];
    const expected = [ { text: '3456789', occurrence: 1, occurrences: 2 } ];
     const output = selectionHelpers.rangesToSelections(string, ranges);
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});

describe('selectionHelpers.optimizeSelections', () => {
  const string = "0123456789qwertyuiopasdfghjklzxcvbnmtyui01234567890";
  it('should return selections array even with one selection', function (done) {
    const selections = [
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array without duplicates', function (done) {
    const selections = [
      { text: '234', occurrence: 2, occurrences: 2 },
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [
      { text: '234', occurrence: 2, occurrences: 2 }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array with overlaps merged', function (done) {
    const selections = [
      { text: '234', occurrence: 1, occurrences: 2 },
      { text: '3456789q', occurrence: 1, occurrences: 1 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [
      { text: '23456789q', occurrence: 1, occurrences: 1 }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array with missing sections removed', function (done) {
    const selections = [
      { text: 'not found in here', occurrence: 2, occurrences: 2 },
      { text: 'querty', occurrence: 3, occurrences: 3 },
      { text: '234', occurrence: 1, occurrences: 2 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [
      { text: '234', occurrence: 1, occurrences: 2 }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array in order when they are made out of order', function (done) {
    const selections = [
      { text: '0', occurrence: 3, occurrences: 3 },
      { text: '234', occurrence: 1, occurrences: 2 },
      { text: 'yui', occurrence: 2, occurrences: 2 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [
      { text: '234', occurrence: 1, occurrences: 2 },
      { text: 'yui', occurrence: 2, occurrences: 2 },
      { text: '0', occurrence: 3, occurrences: 3 }
    ];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array when a single char at the end', function (done) {
    const selections = [
      { text: '0', occurrence: 3, occurrences: 3 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return selections array when a single char at the beginning', function (done) {
    const selections = [
      { text: '0', occurrence: 1, occurrences: 3 }
    ];
    const output = selectionHelpers.optimizeSelections(string, selections);
    const expected = [];
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});
