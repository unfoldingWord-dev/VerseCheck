import * as _ from 'lodash';
// helpers
import * as stringHelpers from './stringHelpers';

/**
 * @description - Splice string into array of ranges, flagging what is selected
 * @param {array} ranges - array of ranges [[int,int],...]
 * @returns {array} - array of objects [obj,...]
 */
export const spliceStringOnRanges = (string, ranges) => {
  var selectionArray = []; // response
  var remainingString = string;
  // shift the range since the loop is destructive by working on the remainingString and not original string
  var rangeShift = 0
  ranges.forEach(function(range) {
    // save all the text before the selection
    var beforeSelection = remainingString.slice(0,range[0]-rangeShift);
    // save the text in the selection
    var selection = remainingString.slice(range[0]-rangeShift,range[1]+1-rangeShift);
    // save all the text after the selection
    var afterSelection = remainingString.slice(range[1]-rangeShift+1);
    if (beforeSelection) {
      selectionArray.push({text: beforeSelection, selected: false});
    }
    const stringBeforeRange = string.slice(0,range[0]);
    const occurrence = stringHelpers.occurrencesInString(stringBeforeRange, selection) + 1;
    const occurrences = stringHelpers.occurrencesInString(string, selection);
    const selectionObject = {
      text: selection,
      selected: true,
      occurrence: occurrence,
      occurrences: occurrences
    };
    selectionArray.push(selectionObject);
    // next iteration is using remaining string
    remainingString = afterSelection;
    // shift the range up to last char of substring (before+sub)
    rangeShift += beforeSelection.length;
    rangeShift += selection.length;
  })
  if (remainingString) {
    selectionArray.push({text: remainingString, selected: false});
  }
  // remove empty text from selectionArray
  return selectionArray;
}
/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of range objects
 */
export const selectionsToRanges = (string, selections) => {
  var ranges = [];
    selections.forEach( selection => {
      if (string !== undefined && string.includes(selection.text)) {
        const splitArray = string.split(selection.text);
        const beforeSelection = splitArray.slice(0,selection.occurrence).join(selection.text);
        const start = beforeSelection.length;
        const end = start + selection.text.length - 1;
        const range = [start,end];
        ranges.push(range);
      }
    })
  return ranges;
}

/**
 * @description - Splice string into array of substrings, flagging what is selected
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of objects
 */
export const selectionsToSplicedString = (string, selections) => {
  var selectedStrings = [];
  const ranges = selectionsToRanges(string, selections);
  selectedStrings = spliceStringOnRanges(string, ranges);
  return selectedStrings;
}

/**
 * @description - This abstracts complex handling of ranges such as order, deduping, concatenating, overlaps
 * @param {array}  ranges - array of ranges [[int,int],...]
 * @returns {array} - array of optimized ranges [[int,int],...]
 */
export const optimizeRanges = (ranges) => {
  var optimizedRanges = []; // response
  ranges = _.sortBy(ranges, function(range) { return range[1] }); // order ranges by end char index as secondary
  ranges = _.sortBy(ranges, function(range) { return range[0] }); // order ranges by start char index as primary
  ranges = _.uniq(ranges); // remove duplicates
  // combine overlapping and contiguous ranges
  var _range = [];
  ranges.forEach( (range, index) => {
    if (range[0] >= _range[0] && range[0] <= _range[1]+1) { // the start occurs in the running range and +1 handles contiguous
      if (range[1] >= _range[0] && range[1] <= _range[1]) { // if the start occurs inside running range then let's check the end
        // if the end occurs inside the running range then it's inside it and doesn't matter
      } else { // it doesn't occur inside the running range
        _range[1] = range[1]; // extend running range
      }
    } else { // the start does not occur in the running range
      if (_range.length != 0) optimizedRanges.push(_range) // the running range is closed push it to optimizedRanges
      _range = range; // reset the running range to this one
    }
    if (ranges.length === index + 1 && _range[1] - _range[0] >= 0) { // this is the last one and it isn't blank
      optimizedRanges.push(_range); // push the last one to optimizedRanges
    }
  });
  return optimizedRanges;
}

/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} ranges - array of ranges [[int,int],...]
 * @returns {array} - array of selection objects
 */
 export const rangesToSelections = (string, ranges) => {
   let selections = [];
   ranges.forEach( range => {
     const start = range[0], end = range[1]; // set the start and end point
     const length = end - start + 1; // get the length of the sub string
     const subString = string.substr(start, length); // get text of the sub string
     const beforeText = string.substr(0, start); // get the string prior to the range
     const beforeMatches = stringHelpers.occurrencesInString(beforeText, subString); // get occurrences prior to range
     const occurrence = beforeMatches + 1; // get number of this occurrence
     const occurrences = stringHelpers.occurrencesInString(string, subString); // get occurrences in string
     const selection = {
       text: subString,
       occurrence: occurrence,
       occurrences: occurrences
     };
     selections.push(selection);
   })
   return selections;
 }

/**
 * @description - This abstracts complex handling of selections such as order, deduping, concatenating, overlapping ranges
 * @param {string} string - the text selections are found in
 * @param {array}  selections - array of selection objects [Obj,...]
 * @returns {array} - array of selection objects
 */
export const optimizeSelections = (string, selections) => {
  let optimizedSelections; // return
  var ranges = selectionsToRanges(string, selections); // get char ranges of each selection
  ranges = optimizeRanges(ranges); // optimize the ranges
  optimizedSelections = rangesToSelections(string, ranges); // convert optimized ranges into selections
  return optimizedSelections;
}
