import * as selectionHelpers from '../src/utils/selectionHelpers';

describe('stringHelpers.normalizeString', () => {
  it('should normalize string by removing extra spaces into single contiguous space', () => {
    const string = '01  234   56789qwertyuiopasdfghjklzxcvbnmtyui01    234      567890';
    const output = selectionHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
    expect(expected).toEqual(output);
  });
  it('should normalize string by removing line breaks into single contiguous space', () => {
    const string = '01\n234 \n56789qwertyuiopasdfghjklzxcvbnmtyui01\n 234 \n 567890';
    const output = selectionHelpers.normalizeString(string);
    const expected = '01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890';
    expect(expected).toEqual(output);
  });
  it('should not crash on null', () => {
    const string = null;
    const output = selectionHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
  it('should not crash on undefined', () => {
    const string = undefined;
    const output = selectionHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
  it('should not crash on empty string', () => {
    const string = '';
    const output = selectionHelpers.normalizeString(string);
    const expected = '';
    expect(expected).toEqual(output);
  });
});
