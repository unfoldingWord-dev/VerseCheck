const ELLIPSIS = '…';

/**
 * getAlignedText - returns a string of the text found in an array of verseObjects that matches the words to find
 *                  and their occurrence in the verse.
 * @param {Array} verseObjects 
 * @param {Array} wordsToMatch
 * @param {int} occurrenceToMatch
 * @param {boolean} isMatch - if true, all verseObjects will be considered a match and will be included in the returned text
 */
export const getAlignedText = (verseObjects, wordsToMatch, occurrenceToMatch, isMatch=false) => {
  // TODO: FIX FOR HINDI, परमेश्वर (God), Titus 1:1, 2nd occurrence
  let text = '';
  let separator = ' ';
  let needsEllipsis = false;
  verseObjects.forEach(verseObject => {
    if ((verseObject.type == 'milestone' || verseObject.type == 'word')) {
      // It is a milestone or a word...we want to handle all of them.
      if ((wordsToMatch.indexOf(verseObject.content) >= 0 && verseObject.occurrence == occurrenceToMatch) || isMatch) {
        // We have a match (or previoiusly had a match in the parent) so we want to include all text that we find,
        if (needsEllipsis) {
          // Need to add an ellipsis to the separator since a previous match but not one right next to this one
          separator += ELLIPSIS+' ';
          needsEllipsis = false;
        }
        if (text) {
          // There has previously been text, so append the separator, either a space or punctuation
          text += separator;
        }
        separator = ' '; // reset the separator for the next word
        if (verseObject.text) {
          // Handle type word, appending the text from this node
          text += verseObject.text;
        }
        if (verseObject.children) {
          // Handle children of type milestone, appending all the text of the children, isMatch is true
          text += getAlignedText(verseObject.children, wordsToMatch, occurrenceToMatch, true);
        }
      } else if (verseObject.children) {
        // Did not find a match, yet still need to go through all the children and see if there's match.
        // If there isn't a match here, i.e. childText is empty, and we have text, we still need 
        // an ellipsis if a later match is found since there was some text here
        let childText = getAlignedText(verseObject.children, wordsToMatch, occurrenceToMatch, isMatch);
        if (childText) {
          if (needsEllipsis) {
            separator += ELLIPSIS+' ';
            needsEllipsis = false;
          }
          text += (text?separator:'') + childText;
          separator = ' ';
        } else if (text) {
          needsEllipsis = true;
        }
      }
    } else if (verseObject.type == "text" && text) {
      // Found some text that is a word separator/punctuation, e.g. the apostrophe between "God" and "s" for "God's"
      // We want to preserve this so we can show "God's" instead of "God ... s"
      if (separator == ' ') {
        separator = '';
      }
      separator += verseObject.text;
    }
  });
  return text;
};
