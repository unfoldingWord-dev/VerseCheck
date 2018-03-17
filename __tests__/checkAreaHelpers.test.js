/* eslint-env jest */
import fs from 'fs-extra';
import * as checkAreaHelpers from '../src/helpers/checkAreaHelpers';

const ult_titus_1 = '__tests__/fixtures/ult/tit/1.json';

// Tests for checkAreaHelpers
describe('test checkAreaHelpers.getAlignedGLText()', ()=>{
  let titus1;

  beforeAll(() => {
    titus1 = fs.readJSONSync(ult_titus_1);
  });

  test('en ULT should match first Θεοῦ to "of God" in Titus 1:1', () => {
    //given
    const verseObjects = titus1[1].verseObjects;
    const contextId = {
      quote: "Θεοῦ",
      occurrence: 1
    };
    const expectedAlignedText = 'of God';

    // when
    const alignedText = checkAreaHelpers.getAlignedText(verseObjects, [contextId.quote], contextId.occurrence);

    // then
    expect(alignedText).toEqual(expectedAlignedText);
  });

  test('en ULT should match 2nd Θεοῦ to "God\'s" in Titus 1:1', () => {
    //given
    const verseObjects = titus1[1].verseObjects;
    const contextId = {
      quote: "Θεοῦ",
      occurrence: 2
    };
    const expectedAlignedText = 'God\'s';

    // when
    const alignedText = checkAreaHelpers.getAlignedText(verseObjects, [contextId.quote], contextId.occurrence);

    // then
    expect(alignedText).toEqual(expectedAlignedText);
  });

  test('en ULT should match first Θεοῦ Πατρὸς to "God … Father" in Titus 1:4', () => {
    //given
    const verseObjects = titus1[4].verseObjects;
    const contextId = {
      quote: "Θεοῦ Πατρὸς",
      occurrence: 1
    };
    const expectedAlignedText = 'God … Father';

    // when
    const wordsToMatch = contextId.quote.split(' ');
    const alignedText = checkAreaHelpers.getAlignedText(verseObjects, wordsToMatch, contextId.occurrence);

    // then
    expect(alignedText).toEqual(expectedAlignedText);
  });

  test('en ULT should return empty string for bogus quote', () => {
    //given
    const verseObjects = titus1[1].verseObjects;
    const contextId = {
      quote: "not to be found",
      occurrence: 1
    };
    const expectedAlignedText = '';

    // when
    const wordsToMatch = contextId.quote.split(' ');
    const alignedText = checkAreaHelpers.getAlignedText(verseObjects, wordsToMatch, contextId.occurrence);

    // then
    expect(alignedText).toEqual(expectedAlignedText);
  });

  test('en ULT should match first τέκνα κατηγορίᾳ to "children … accused" in Titus 1:6 (test of separated children with ellipsis)', () => {
    //given
    const verseObjects = titus1[6].verseObjects;
    const contextId = {
      quote: "τέκνα κατηγορίᾳ",
      occurrence: 1
    };
    const expectedAlignedText = 'children … accused';

    // when
    const wordsToMatch = contextId.quote.split(' ');
    const alignedText = checkAreaHelpers.getAlignedText(verseObjects, wordsToMatch, contextId.occurrence);

    // then
    expect(alignedText).toEqual(expectedAlignedText);
  });
});
