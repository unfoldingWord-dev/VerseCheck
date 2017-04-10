import React from 'react'
import {Glyphicon} from 'react-bootstrap'
import style from '../css/style'
import SelectionHelpers from '../utils/selectionHelpers'
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
    let verseText = this.props.verseText
    let text = "";
    var selectedString = window.getSelection();
    var indexOfTextSelection = selectedString.getRangeAt(0).startOffset;
    if (selectedString) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    if (text === "") {
      // do nothing since an empty space was selected
    } else {
      let expression = '/' + text + '/g';
      let wordOccurencesArray = verseText.match(eval(expression));
      let occurrences = wordOccurencesArray.length;
      let occurrence;
      let textBeforeSelection = verseText.slice(0, indexOfTextSelection);
      if (textBeforeSelection.match(eval(expression))) {
        occurrence = textBeforeSelection.match(eval(expression)).length + 1;
      } else {
        occurrence = 1;
      }

      let selection = {
        text: text,
        occurrence: occurrence,
        occurrences: occurrences
      }
      this.addSelection(selection)
    }
  }

  addSelection(selection) {
    let selections = this.props.selectionsReducer.selections;
    if (selections.length >= 4) {
      alert('Click a previous selection to remove it before adding a new one. To select more than 4 words, highlight phrases instead of individual words.')
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
      var selectionArray = SelectionHelpers.selectionArray(verseText, selections)
      verseText = selectionArray.map((selection, index) =>
        <span key={index} style={selection.selected ? { backgroundColor: '#FDD910', cursor: 'pointer' } : {}}
          onClick={selection.selected ? () => this.removeSelection(selection) : () => { }}>
          {selection.text}
        </span>
      )

      return (
        <div onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
          {verseText}
        </div>
      );
    } else {
      verseText = this.props.verseText;
      return (
        <div onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
          {verseText}
        </div>
      );
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
    let reference = this.props.contextIdReducer.contextId.reference
    let bibles = this.props.resourcesReducer.bibles
    let modal = <div/>

    if (this.state.modalVisibility) {
      modal = (
        <MyLanguageModal
          show={this.state.modalVisibility}
          targetLangBible={bibles.targetLanguage}
          chapter={reference.chapter}
          currentVerse={reference.verse}
          onHide={
            () => {
              this.setState({modalVisibility: false})
            }
          }
        />
      )
    }

    return (
      <div>
        <div style={{float: "right"}} onClick={() => {
          this.setState({modalVisibility: true})
        }}>
          <Glyphicon glyph="fullscreen" style={{cursor: "pointer"}}/>
          {modal}
        </div>
        <div style={{fontWeight: "bold"}}>
          Target Language
        </div>     
        <div style={{color: "#747474"}}>
          {reference.bookId} {reference.chapter + ':' + reference.verse}
        </div>
        <div style={this.props.projectDetailsReducer.params.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          {this.displayText()}
        </div>
      </div>
    )
  }
}

export default SelectArea
