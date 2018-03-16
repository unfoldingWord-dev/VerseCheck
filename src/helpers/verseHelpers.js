/**
 * @param {*} verseObjects 
 * @param {*} contextId 
 * @param {*} isWord 
 */
export const getWord = (verseObjects, contextId, isWord=false) => {
  let word = '';
  let separator = ' ';
  let inBetween = false;
  let greekWords = contextId.quote.split(' ');
  if (greekWords.indexOf(contextId.quote) < 0) {
    greekWords.push(contextId.quote);
  }
  debugger;
  verseObjects.forEach(verseObject => {
    if ((verseObject.type == 'milestone' || verseObject.type == 'word')) {
      if ((greekWords.indexOf(verseObject.content) >= 0 && verseObject.occurrence == contextId.occurrence) || isWord) {
        if (inBetween) {
          separator += '... ';
          inBetween = false;
        }
        if (verseObject.text) {
          word += (word?separator:'') + verseObject.text;
          separator = ' ';
        }
        if (verseObject.children) {
          word += (word?separator:'') + getWord(verseObject.children, contextId, true);
          separator = ' ';
        }
      } else if (verseObject.children) {
        let childWord = getWord(verseObject.children, contextId, isWord);
        if (childWord) {
          if (inBetween) {
            separator += '... ';
            inBetween = false;
          }
          word += (word?separator:'') + childWord;
          separator = ' ';
        } else if (word) {
          inBetween = true;
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
