import React, { Component } from 'react';
import DirectionsArea from './DirectionsArea';

class SelectionArea extends Component {
    constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.displayTextOutput = this.displayText(nextProps.verseText, nextProps.selectionsReducer.selections);
    }
  }
/*
 * @description
 * Implementation notes on why you can't just use the window.getSelection()
 * getSelection is limited by same innerText node, and does not include span siblings
 * indexOfTextSelection is broken by any other previous selection since it only knows its innerText node.
 */
  getSelectionText() {
    if (!this.props.loginReducer.loggedInUser) {
      this.props.actions.selectModalTab(1, 1, true);
      this.props.actions.openAlertDialog("You must be logged in to make a selection");
      return;
    }
    // windowSelection is an object with lots of data
    let windowSelection = window.getSelection();
    // get the current text selected
    let selectedText = windowSelection.toString();

    // do nothing since an empty space was selected
    if (selectedText === '') {} else {
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
      let occurrence = occurrencesInString(textBeforeSelection, selectedText);
      // verseText is used to get all of the occurrences
      let verseText = this.props.verseText;
      // replace more than one contiguous space with a single one since HTML/selection only renders 1
      verseText = normalizeString(verseText);
      // get the total occurrences from the verse
      let occurrences = occurrencesInString(verseText, selectedText);
      let selection = {
        text: selectedText,
        occurrence: occurrence,
        occurrences: occurrences
      };
      // add the selection to the selections
      this.addSelection(selection);
    }
  }

  addSelection(selection) {
    let selections = this.props.selectionsReducer.selections;
    if (selections.length >= 4) {
      this.props.actions.openAlertDialog('Click a previous selection to remove it before adding a new one. To select more than 4 words, highlight phrases instead of individual words.')
      return false
    } else {
      selections.push(selection);
    }
    this.props.actions.changeSelections(selections);
  }

  removeSelection(selection) {
    let selections = this.props.selectionsReducer.selections;
    selections = selections.filter(_selection =>
      _selection.occurrence !== selection.occurrence || _selection.text !== selection.text
    )
    this.props.actions.changeSelections(selections);
  }

  render() {
    let { quote } = this.props;

    return (
      <div>
        <div style={{ flex: "0.2", justifyContent: "center", alignItems: "center", borderBottom: '1px solid var(--border-color)', width: "100%" }}>
          <DirectionsArea quote={quote} />
        </div>
        <div style={{ flex: "0.8", justifyContent: "center", alignItems: "center" }}>
          "Selection area"
        </div>
      </div>
    );
  }
}

export default SelectionArea;