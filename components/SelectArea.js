import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import style from '../css/Style'
import {selectionArray, occurrencesInString} from '../utils/selectionHelpers'
import MyLanguageModal from './MyLanguageModal'

class SelectArea extends React.Component {
  constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    }
  }

  getSelectionText() {
    if (!this.props.loginReducer.loggedInUser) {
      this.props.actions.selectModalTab(1, 1, true);
      this.props.actions.openAlertDialog("You must be logged in to make a selection");
      return;
    }
    let verseText = this.props.verseText;
    let text = "";
    // windowSelection is an object with lots of data
    let windowSelection = window.getSelection();
    // getSelection is limited by same innerText node, and does not include span siblings
    // indexOfTextSelection is broken by any other previous selection since it only knows its innerText node.
    let selectionRange = windowSelection.getRangeAt(0)
    let indexOfTextSelection = selectionRange.startOffset;
    let textForSelection = selectionRange.commonAncestorContainer;

    console.log('textForSelection', textForSelection);
    console.log('selectionRange', selectionRange);

    let postPrescedingText = textForSelection ? textForSelection.slice(0,indexOfTextSelection) : '';
    // must find length of text prior to it.
    let selectionContainer = selectionRange.commonAncestorContainer.parentElement;
    let prescedingText = '';
    // get the current span's innerText
    if (selectionContainer) {
      text = window.getSelection().toString();
      let previousSibling = selectionContainer.previousSibling;
      while (previousSibling) {
        prescedingText = previousSibling.innerText + prescedingText;
        previousSibling = previousSibling.previousSibling;
      }
    }
    if (text === "") {
      // do nothing since an empty space was selected
    } else {
      // There can be a gap between prescedingText and current selection
      let textBeforeSelection = prescedingText + postPrescedingText + text;
      console.log('textBeforeSelection', textBeforeSelection);
      let occurrence = occurrencesInString(textBeforeSelection, text);
      let occurrences = occurrencesInString(verseText, text)

      let selection = {
        text: text,
        occurrence: occurrence,
        occurrences: occurrences
      }
      console.log(selection);
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

  displayText() {
    let verseText = '';
    let { selections } = this.props.selectionsReducer;
    verseText = this.props.verseText
    if (selections && selections.length > 0) {
<<<<<<< HEAD
      let _selectionArray = selectionArray(verseText, selections)
      verseText = _selectionArray.map((selection, index) =>
        <span key={index} style={selection.selected ? { backgroundColor: '#FDD910', cursor: 'pointer' } : {}}
          onClick={selection.selected ? () => this.removeSelection(selection) : () => { }}>
          {selection.text}
        </span>
      )
=======
      var selectionArray = SelectionHelpers.selectionArray(verseText, selections)
      if(this.props.mode == "select"){
        verseText = selectionArray.map((selection, index) =>
          <span key={index} style={selection.selected ? { backgroundColor: 'var(--highlight-color)', cursor: 'pointer' } : {}}
            onClick={selection.selected ? () => this.removeSelection(selection) : () => { }}>
            {selection.text}
          </span>
        )
>>>>>>> master

        return (
          <div onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
            {verseText}
          </div>
        );
      } else {
        verseText = selectionArray.map((selection, index) =>
          <span key={index} style={selection.selected ? { backgroundColor: 'var(--highlight-color)', cursor: 'pointer' } : {}}>
            {selection.text}
          </span>
        )

        return (
          <div>
            {verseText}
          </div>
        )
      }
    } else {
      verseText = this.props.verseText;
      if(this.props.mode == "select"){
        return (
          <div onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
            {verseText}
          </div>
        );
      } else {
        return (
          <div>
            {verseText}
          </div>
        )
      }
    }
  }

  inDisplayBox(insideDisplayBox) {
    this.setState({ inBox: insideDisplayBox });
    if (!insideDisplayBox && Math.abs(window.getSelection().extentOffset - window.getSelection().baseOffset) > 0) {
      this.getSelectionText()
    }
    window.getSelection().empty();
  }

  render() {
    let {verseText, projectDetailsReducer} = this.props
    this.props.actions.validateSelections(verseText)
    const { manifest, bookName } = projectDetailsReducer

    let reference = this.props.contextIdReducer.contextId.reference
    let bibles = this.props.resourcesReducer.bibles
    let languageName = manifest.target_language ? manifest.target_language.name : null;
    let modal = <div/>

    let dir = manifest.target_language ? manifest.target_language.direction : null;

    if (this.state.modalVisibility) {
      modal = (
        <MyLanguageModal
          show={this.state.modalVisibility}
          targetLangBible={bibles.targetLanguage}
          chapter={reference.chapter}
          currentVerse={reference.verse}
          dir = {dir ? dir : "ltr"}
          onHide={
            () => {
              this.setState({modalVisibility: false})
            }
          }
        />
      )
    }

    return (
      <div style={{maxHeight: "185px", overflowY: "hidden"}}>
        <div style={{float: "right"}} onClick={() => {
          this.setState({modalVisibility: true})
        }}>
          <Glyphicon glyph="fullscreen" style={{cursor: "pointer"}}/>
          {modal}
        </div>
        <div style={{fontWeight: "bold"}}>
          {languageName}
        </div>
        <div style={{color: "var(--text-color-light)"}}>
          {bookName} {reference.chapter + ':' + reference.verse}
        </div>
        <div style={this.props.projectDetailsReducer.params.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          {this.displayText()}
        </div>
      </div>
    )
  }
}

export default SelectArea
