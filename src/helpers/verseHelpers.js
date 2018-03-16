/**
 * @param {*} verseObjects 
 * @param {*} contextId 
 * @param {*} isWord 
 */
export const getWord = (verseObjects, contextId, isWord=false) => {
  let word = '';
  let separator = ' ';
  let inBetween = '';
  let greekWords = contextId.quote.split(' ');
  if (greekWords.indexOf(contextId.quote) < 0) {
    greekWords.push(contextId.quote);
  }
  verseObjects.forEach(verseObject => {
    if ((verseObject.type == 'milestone' || verseObject.type == 'word')) {
      if ((greekWords.indexOf(verseObject.content) >= 0 && verseObject.occurrence == contextId.occurrence) || isWord) {
        word += (word?separator:'');
        if (inBetween) {
          word += inBetween + " ";
        }
        if (verseObject.text) {
          word += verseObject.text;
          separator = ' ';
        }
        if (verseObject.children) {
          word += getWord(verseObject.children, contextId, true);
        }
      } else if (verseObject.children) {
        if (word) {
          inBetween += getWord(verseObject.children, contextId, true);
        } else {
          let childWord = getWord(verseObject.children, contextId);
          if (childWord) {
            word += (word?separator:'');
            word += childWord;
            separator = ' ';
          }
        }
      }
    } else if (verseObject.type == "text" && word) {
      if (separator == ' ') {
        separator = '';
      }
      separator += verseObject.text;
    }
  });
  return word;
};
