import * as stringHelpers from '../src/helpers/stringHelpers';

describe('stringHelpers.normalizeString', () => {
  it('should normalize string by removing extra spaces into single contiguous space', () => {
    const string = '01  234   56789qwertyuiopasdfghjklzxcvbnmtyui01    234      567890';
    const output = stringHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
      expect(expected).toEqual(output);
  });
  it('should normalize string by removing line breaks into single contiguous space', () => {
    const string = '01\n234 \n56789qwertyuiopasdfghjklzxcvbnmtyui01\n 234 \n 567890';
    const output = stringHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
      expect(expected).toEqual(output);
  });
  it('should not crash on null', () => {
    const string = null;
    const output = stringHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
  it('should not crash on undefined', () => {
    const string = undefined;
    const output = stringHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
  it('should not crash on empty string', () => {
    const string = '';
    const output = stringHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
});

describe('stringHelpers.occurrencesInString', () => {
  const string = '01 234 56789qwerty234uiopasdfghjklzxcvbnmtyui01 234 567890';
  it('should find sub-strings with spaces and without spaces around it', () => {
    const subString = '234';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 3;
      expect(expected).toEqual(output);
  });
  it('should find substrings at the beginning and end even if a single character', () => {
    const subString = '0';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 3;
      expect(expected).toEqual(output);
  });
  it('should return 0 if sub-string not found', () => {
    const subString = 'not in string';
    const output = stringHelpers.occurrencesInString(string, subString);
    const expected = 0;
      expect(expected).toEqual(output);
  });
});

describe('windowSelectionHelpers.generateSelection', () => {
  it('should return a selection for a single character found more than once', () => {
    const selectedText = 's';
    const prescedingText = 'Here is ';
    const entireText = 'Here is some text.';
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: 's',
      occurrence: 2,
      occurrences: 2
    };
      expect(expected).toEqual(output);
  });
  it('should return a selection for a single space found more than once', () => {
    const selectedText = ' ';
    const prescedingText = 'Here is';
    const entireText = 'Here is some text.';
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: ' ',
      occurrence: 2,
      occurrences: 3
    };
      expect(expected).toEqual(output);
  });
  it('should return a selection for a single word found once', () => {
    const selectedText = 'Here';
    const prescedingText = '';
    const entireText = 'Here is some text.';
    const output = stringHelpers.generateSelection(selectedText, prescedingText, entireText);
    const expected = {
      text: 'Here',
      occurrence: 1,
      occurrences: 1
    };
      expect(expected).toEqual(output);
  });
});
