/* eslint-disable no-console */
/**
 * @description Function that count occurrences of a substring in a string
 * @param {String} string - The string to search in
 * @param {String} subString - The sub string to search for
 * @returns {Integer} - the count of the occurrences
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string/7924240#7924240
 * modified to fit our use cases, return zero for '' substring, and no use case for overlapping.
 */
export const occurrencesInString = (string, subString) => {
 if (subString.length <= 0) return 0;
 var occurrences = 0, position = 0, step = subString.length;
 while (position < string.length) {
   position = string.indexOf(subString, position);
   if (position === -1) break;
   ++occurrences;
   position += step;
 }
 return occurrences;
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
