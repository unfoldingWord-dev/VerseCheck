import * as selectionHelpers from './selectionHelpers';
/**
 * @description - Gets the currently selected text from the Web UI
 * @param {String} verseText - the text that the selection should be in
 * @return {Object} - the selection object to be used
 * Implementation notes on why you can't just use the window.getSelection()
 * getSelection is limited by same innerText node, and does not include span siblings
 * indexOfTextSelection is broken by any other previous selection since it only knows its innerText node.
 */
// TODO: Make this into smaller functions.
export const getSelectionText = (verseText) => {
  // replace more than one contiguous space with a single one since HTML/selection only renders 1
  verseText = selectionHelpers.normalizeString(verseText);
  // TODO: Determine if a user can even get this far without being logged in.
  // if (!this.props.loginReducer.loggedInUser) {
  //   this.props.actions.selectModalTab(1, 1, true);
  //   this.props.actions.openAlertDialog("You must be logged in to make a selection");
  //   return;
  // }
  // windowSelection is an object with lots of data
  let windowSelection = window.getSelection();
  // get the current text selected
  let selectedText = windowSelection.toString();

  // do nothing since an empty space was selected
  if (selectedText !== '') {
    // get the text after the presceding selection and current span selection is in.
    let selectionRange = windowSelection.getRangeAt(0)
    // get the character index of what is selected in context of the span it is in.
    let indexOfTextSelection = selectionRange.startOffset;
    // get the container of the selection, this is a strange object, that logs as a string.
    let textContainer = selectionRange.commonAncestorContainer;
    // get the parent span that contains the textContainer.
    let textSpan = textContainer ? textContainer.parentElement : undefined;
    // get all of the text in the selection's container similar to the span's innerText.
    let textSpanContent = textSpan.innerText;
    // get the text presceding the selection but after the selection just prior to it.
    let postPrescedingText = textContainer ? textSpanContent.slice(0,indexOfTextSelection) : '';
    // start with an empty string to prepend to for text presceding current span selection is in.
    let prescedingText = '';
    // if we have a span that holds text, see what presceding text we can extract.
    if (textSpan) {
      // get the previous sibling to start the loop
      let previousSibling = textSpan.previousSibling;
      // loop through previous spans to get their text
      while (previousSibling) {
        // prepend the spans innerText to the prescedingText
        prescedingText = previousSibling.innerText + prescedingText;
        // move to the previous span, if none, it ends the loop
        previousSibling = previousSibling.previousSibling;
      }
    }

    // There can be a gap between prescedingText and current selection
    let textBeforeSelection = prescedingText + postPrescedingText + selectedText;
    // get the occurrence of the selection
    let occurrence = selectionHelpers.occurrencesInString(textBeforeSelection, selectedText);
    // get the total occurrences from the verse
    let occurrences = selectionHelpers.occurrencesInString(verseText, selectedText);
    let selection = {
      text: selectedText,
      occurrence: occurrence,
      occurrences: occurrences
    };
    // add the selection to the selections
    return selection;
  }
}
