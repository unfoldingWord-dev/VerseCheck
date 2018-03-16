const ELLIPSIS = '…';

/**
 * @param {Array} verseObjects 
 * @param {Object} contextId 
 * @param {boolean} isMatch // if true, all children will be considered a match and will be included in the returned text
 */
export const getAlignedText = (verseObjects, wordsToMatch, occurrenceToMatch, isMatch=false) => {
  // TODO: FIX FOR HINDI, परमेश्वर (God), Titus 1:1, 2nd occurrence
  let text = '';
  let separator = ' ';
  let inBetween = false;
  verseObjects.forEach(verseObject => {
    if ((verseObject.type == 'milestone' || verseObject.type == 'word')) {
      if ((wordsToMatch.indexOf(verseObject.content) >= 0 && verseObject.occurrence == occurrenceToMatch) || isMatch) {
        if (inBetween) {
          separator += ELLIPSIS+' ';
          inBetween = false;
        }
        if (verseObject.text) {
          text += (text?separator:'') + verseObject.text;
          separator = ' ';
        }
        if (verseObject.children) {
          text += (text?separator:'') + getAlignedText(verseObject.children, wordsToMatch, occurrenceToMatch, true);
          separator = ' ';
        }
      } else if (verseObject.children) {
        let childWord = getAlignedText(verseObject.children, wordsToMatch, occurrenceToMatch, isMatch);
        if (childWord) {
          if (inBetween) {
            separator += ELLIPSIS+' ';
            inBetween = false;
          }
          text += (text?separator:'') + childWord;
          separator = ' ';
        } else if (text) {
          inBetween = true;
        }
      }
    } else if (verseObject.type == "text" && text) {
      if (separator == ' ') {
        separator = '';
      }
      separator += verseObject.text;
    }
  });
  return text;
};
