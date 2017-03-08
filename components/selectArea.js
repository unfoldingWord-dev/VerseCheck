const React = require('react')

const style = require('../css/style')
const SelectionHelpers = require('../utils/selectionHelpers')

class SelectArea extends React.Component {
  constructor() {
    super();
    this.state = {
      inBox: false
    }
  }

  getSelectionText() {
    let verseText = this.props.checkInformation.targetLanguage;
    let text = "";
    var selection = window.getSelection();
    var indexOfTextSelection = selection.getRangeAt(0).startOffset;
    if (selection) {
      text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }
    if (text === "" || text === " ") {
      //do nothing since an empty space was selected
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

      let selectedText = {
        text: text,
        occurrence: occurrence,
        occurrences: occurrences
      };
      let newSelectedTextArray = this.props.checkInformation.selectedText;
      let foundRepeatedSelection = newSelectedTextArray.find(item => item.text === text && item.occurrence === occurrence);
      if (foundRepeatedSelection) {
        //dont add object to array
      } else {
        newSelectedTextArray.push(selectedText);
      }
      let checkInformation = this.props.checkInformation;
      // optimize the selections to address potential issues and save
      checkInformation.selectedText = SelectionHelpers.optimizeSelections(verseText, newSelectedTextArray);
      this.props.actions.updateCurrentCheck(checkInformation);
    }
  }

  removeSelection(selectionObject) {
    var newSelectedTextArray = [];
    var checkInformation = this.props.checkInformation;
    newSelectedTextArray = checkInformation.selectedText.filter(selection =>
      selection.occurrence !== selectionObject.occurrence || selection.text !== selectionObject.text
    )
    // optimize the selections to address potential issues and save
    checkInformation.selectedText = SelectionHelpers.optimizeSelections(this.props.checkInformation.targetLanguage, newSelectedTextArray);
    this.props.actions.updateCurrentCheck(checkInformation);
  }

  displayText() {
    let verseText = '';
    let { checkInformation } = this.props;
    if (checkInformation.selectedText && checkInformation.selectedText.length > 0) {
      var selectionArray = SelectionHelpers.selectionArray(checkInformation.targetLanguage, checkInformation.selectedText)
      verseText = selectionArray.map((selection, index) =>
        <span key={index} style={selection.selected ? { backgroundColor: '#FDD910', cursor: 'pointer', fontWeight: 'bold' } : {}}
          onClick={selection.selected ? () => this.removeSelection(selection) : () => { }}>
          {selection.text}
        </span>
      )

      return (
        <span onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
          {verseText}
        </span>
      );
    } else {
      verseText = this.props.checkInformation.targetLanguage;
      return (
        <span onMouseUp={() => this.getSelectionText()} onMouseLeave={()=>this.inDisplayBox(false)} onMouseEnter={()=>this.inDisplayBox(true)}>
          {verseText}
        </span>
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
    const verseDisplay = (
      <div>
        <strong>{this.props.checkInformation.chapter + ':' + this.props.checkInformation.verse} </strong>
        <span>{this.displayText()}</span>
      </div>
    )

    return (
      <div>
        <span style={style.pane.title}>
          {this.props.checkInformation.version}
        </span>
        <div style={style.pane.contentLTR}>
          {verseDisplay}
        </div>
      </div>
    )
  }
}

module.exports = SelectArea
