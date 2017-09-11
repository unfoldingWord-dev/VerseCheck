/* eslint-disable no-console */
import {describe, it} from 'mocha';
import { expect } from 'chai';
import isEqual from 'lodash/isEqual'
//helpers
import * as stringHelpers from '../helpers/stringHelpers';

describe('stringHelpers.normalizeString', () => {
  it('should normalize string by removing extra spaces into single contiguous space', function (done) {
    const string = '01  234   56789qwertyuiopasdfghjklzxcvbnmtyui01    234      567890';
    const output = stringHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
    expect(output).to.equal(expected);
    done();
  });
  it('should normalize string by removing line breaks into single contiguous space', function (done) {
    const string = '01\n234 \n56789qwertyuiopasdfghjklzxcvbnmtyui01\n 234 \n 567890';
    const output = stringHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
    expect(output).to.equal(expected);
    done();
  });
});

describe('stringHelpers.occurrencesInString', () => {
  const string = '01 234 56789qwerty234uiopasdfghjklzxcvbnmtyui01 234 567890';
  it('should find sub-strings with spaces and without spaces around it', function (done) {
    const subString = '234';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 3;
    expect(output).to.equal(expected);
    done();
  });
  it('should find substrings at the beginning and end even if a single character', function (done) {
    const subString = '0';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 3;
    expect(output).to.equal(expected);
    done();
  });
  it('should return 0 if sub-string not found', function (done) {
    const subString = 'not in string';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 0;
    expect(output).to.equal(expected);
    done();
  });
});

describe('windowSelectionHelpers.generateSelection', () => {
  it('should return a selection for a single character found more than once', function (done) {
    const selectedText = 's';
    const prescedingText = 'Here is ';
    const entireText = 'Here is some text.'
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: 's',
      occurrence: 2,
      occurrences: 2
    };
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return a selection for a single space found more than once', function (done) {
    const selectedText = ' ';
    const prescedingText = 'Here is';
    const entireText = 'Here is some text.'
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: ' ',
      occurrence: 2,
      occurrences: 3
    };
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
  it('should return a selection for a single word found once', function (done) {
    const selectedText = 'Here';
    const prescedingText = '';
    const entireText = 'Here is some text.'
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: 'Here',
      occurrence: 1,
      occurrences: 1
    };
    expect(isEqual(expected, output)).to.equal(true);
    done();
  });
});
