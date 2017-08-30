import * as _ from 'lodash';

/**
 * @description - Splice string into array of ranges, flagging what is selected
 * @param {array} ranges - array of ranges [[int,int],...]
 * @returns {array} - array of objects [obj,...]
 */
export const spliceStringOnRanges = (string, ranges) => {
  var selectionArray = [] // response
  // sort ranges - this ensures we build the string correctly and don't miss selections
  // concat overlaps - should not be a concern here but might help rendering bugs
  var remainingString = string
  // shift the range since the loop is destructive
  // by working on the remainingString and not original string
  var rangeShift = 0
  ranges.forEach(function(rangeObject) {
    var range = rangeObject.range
    // save all the text before the selection
    var beforeSelection = remainingString.slice(0,range[0]-rangeShift)
    // console.log('beforeSelection: ', beforeSelection)
    // save the text in the selection
    var selection = remainingString.slice(range[0]-rangeShift,range[1]+1-rangeShift)
    // console.log('subString: ', selection)
    // save all the text after the selection
    var afterSelection = remainingString.slice(range[1]-rangeShift+1)
    // console.log('afterSelection: ', afterSelection)
    selectionArray.push({text: beforeSelection, selected: false})
    selectionArray.push({
                          text: selection,
                          selected: true,
                          occurrence: rangeObject.occurrence,
                          occurrences: rangeObject.occurrences
                        })
    // next iteration is using remaining string
    remainingString = afterSelection
    // shift the range up to last char of substring (before+sub)
    rangeShift += beforeSelection.length
    rangeShift += selection.length
  })
  selectionArray.push({text: remainingString, selected: false})
  // remove empty text from selectionArray
  return selectionArray
}
/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of range objects
 */
export const selectionsToRanges = (string, selections) => {
  var ranges = []
    selections.forEach(function(selection) {
      if (string !== undefined && string.includes(selection.text)) {
        var splitArray = string.split(selection.text)
        var beforeSelection = splitArray.slice(0,selection.occurrence).join(selection.text)
        var start = beforeSelection.length
        var end = start + selection.text.length - 1
        var rangesObject = {
                            range: [start,end],
                            occurrence: selection.occurrence,
                            occurrences: selection.occurrences
                           }
        ranges.push(rangesObject)
      }
    })
  return ranges
}

/**
 * @description - Splice string into array of substrings, flagging what is selected
 * @param {string} string - text used to get the ranges of
 * @param {array} selections - array of selections [obj,...]
 * @returns {array} - array of objects
 */
export const selectionsToSelectedStrings = (string, selections) => {
  var selectedStrings = []
  var ranges = selectionsToRanges(string, selections)
  selectedStrings = spliceStringOnRanges(string, ranges)
  return selectedStrings
}

/**
 * @description - This abstracts complex handling of ranges such as order, deduping, concatenating, overlaps
 * @param {array}  ranges - array of ranges [[int,int],...]
 * @returns {array} - array of optimized ranges [[int,int],...]
 */
export const optimizeRanges = (ranges) => {
  var optimizedRanges = [] // response
  ranges = _.sortBy(ranges, function(range) { return range[1] })// order ranges by end char index as secondary
  ranges = _.sortBy(ranges, function(range) { return range[0] })// order ranges by start char index as primary
  ranges = _.uniq(ranges) // remove duplicates
  // combine overlapping and contiguous ranges
  var _range = []
  ranges.forEach(function(range, index) {
    if (range[0] >= _range[0] && range[0] <= _range[1]+1) { // the start occurs in the running range and +1 handles contiguous
      if (range[1] >= _range[0] && range[1] <= _range[1]) { // if the start occurs inside running range then let's check the end
        // if the end occurs inside the running range then it's inside it and doesn't matter
      } else { // it doesn't occur inside the running range
        _range[1] = range[1] // extend running range
      }
    } else { // the start does not occur in the running range
      if (_range.length != 0) optimizedRanges.push(_range) // the running range is closed push it to optimizedRanges
      _range = range // reset the running range to this one
    }
    if (ranges.length === index + 1 && _range[1] - _range[0] >= 0) { // this is the last one and it isn't blank
      optimizedRanges.push(_range) // push the last one to optimizedRanges
    }
  })
  return optimizedRanges
}

/**
 * @description - This converts ranges to array of selection objects
 * @param {string} string - text used to get the ranges of
 * @param {array} ranges - array of ranges [[int,int],...]
 * @returns {array} - array of selection objects
 */
 export const rangesToSelections = (string, ranges) => {
   let selections = []
   ranges.forEach(function(range, index) {
     let start = range[0], end = range[1]
     let length = end - start + 1
     let text = string.substr(start, length) // get text
     let regex = eval('/' + text + '/g')
     let beforeText = string.substr(0,start)
     let beforeMatches = beforeText.match(regex)
     let occurrence = (beforeMatches !== null ? beforeMatches.length : 0) + 1 // get number of this occurrence
     let occurrences = string.match(regex).length // get occurrences in string
     let selection = {
       text: text,
       occurrence: occurrence,
       occurrences: occurrences
     };
     selections.push(selection)
   })
   return selections
 }

/**
 * @description - This abstracts complex handling of selections such as order, deduping, concatenating, overlapping ranges
 * @param {string} string - the text selections are found in
 * @param {array}  selections - array of selection objects [Obj,...]
 * @returns {array} - array of selection objects
 */
export const optimizeSelections = (string, selections) => {
  let optimizedSelections // return
  var ranges = selectionsToRanges(string, selections).map( rangeObject => rangeObject.range ) // get char ranges of each selection
  ranges = optimizeRanges(ranges) // optimize the ranges
  optimizedSelections = rangesToSelections(string, ranges) // convert optimized ranges into selections
  return optimizedSelections
}

/**
 * @description Function that count occurrences of a substring in a string
 * @param {String} string - The string to search in
 * @param {String} subString - The sub string to search for
 * @returns {Integer} - the count of the occurrences
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 * modified to fit our use cases, return zero for '' substring, and no use case for overlapping.
 */
export const occurrencesInString = (string, subString) => {
 if (subString.length <= 0) return 0
 var n = 0, pos = 0, step = subString.length
 while (true) {
   pos = string.indexOf(subString, pos)
   if (pos === -1) break
   ++n
   pos += step
 }
 return n
}
/**
 * @description - Function that normalizes a string including whitespace
 * @param {String} string - the string to normalize
 * @preturns {String} - The returned normalized string
 */
export const normalizeString = (string) => {
  string = string.replace(/\s+/g, ' ');
  return string;
}
