/* eslint-disable no-console */
import {describe, it} from 'mocha';
import { expect } from 'chai';
import isEqual from 'lodash/isEqual'
//helpers
import * as windowSelectionHelpers from '../helpers/windowSelectionHelpers';

// describe('windowSelectionHelpers.spliceStringOnRanges', () => {
//   const string = "01 234 56789qwertyuiopasdfghjklzxcvbnmtyui01 234 567890";
//   it('should splice string on ranges', function (done) {
//     const ranges = [[45,47]];
//     const output = windowSelectionHelpers.spliceStringOnRanges(string, ranges);
//     const expected = [];
//     expect(isEqual(expected, output)).to.equal(true);
//     done();
//   });
// });
