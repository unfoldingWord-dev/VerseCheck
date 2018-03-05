import React from 'react';
// helpers
import {
  selectionArray,
  occurrencesInString,
  normalizeString
} from '../utils/selectionHelpers';
// components
import { Glyphicon } from 'react-bootstrap';
import InstructionsArea from './InstructionsArea';
import MyLanguageModal from './MyLanguageModal';
// styling
import style from '../css/Style';

class DefaultArea extends React.Component {
  constructor() {
    super();
    this.state = {
      inBox: false,
      modalVisibility: false
    };
  }

  displayText(verseText, selections) {
    // normalize whitespace for text rendering in order to display highlights with more than one space since html selections show one space
    verseText = normalizeString(verseText);
    let verseTextSpans = <span>{verseText}</span>;
    if (selections && selections.length > 0) {
      let _selectionArray = selectionArray(verseText, selections);
      selections.forEach(selection => {
        if (occurrencesInString(verseText,selection.text) !== selection.occurrences) {
          // validate selections and remove ones that do not apply
          this.props.actions.validateSelections(verseText);
        }
      });
      verseTextSpans = _selectionArray.map((selection, index) => {
        let style = selection.selected ? { backgroundColor: 'var(--highlight-color)' } : {};
        return (
          <span key={index} style={style}>
            {selection.text}
          </span>
        );
      });
    }
    return (
      <div style={{userSelect: 'none', color:'var(--text-color-light)'}}>
        {verseTextSpans}
      </div>
    );
  }

  render() {
    const {
      projectDetailsReducer: {
        manifest
      }
    } = this.props;
    const bookName = manifest.target_language.book.name;
    const reference = this.props.contextIdReducer.contextId.reference;
    const bibles = this.props.resourcesReducer.bibles;
    const languageName = manifest.target_language ? manifest.target_language.name : null;
    const dir = manifest.target_language ? manifest.target_language.direction : null;

    return (
      <div style={{WebkitUserSelect:'none', flex: 1, display: 'flex', flexDirection: 'column'}}>
        <div style={style.verseTitle}>
          <div style={{display: 'flex', flexDirection: 'column'}}>
              <span style={style.pane.title}>
                {languageName}
              </span>
              <span style={style.pane.subtitle}>
                {bookName} {reference.chapter + ':' + reference.verse}
              </span>
          </div>
          <div onClick={() => {this.setState({modalVisibility: true})}}>
            <Glyphicon glyph="fullscreen" title="Click to show expanded verses" style={{cursor: "pointer"}}/>
          </div>
          <MyLanguageModal
          projectDetailsReducer={this.props.projectDetailsReducer}
          show={this.state.modalVisibility}
          targetLangBible={bibles.targetLanguage}
          chapter={reference.chapter}
          currentVerse={reference.verse}
          dir = {dir ? dir : "ltr"}
          onHide={
            () => {
              this.setState({modalVisibility: false});
            }
          }/>
        </div>
        <div style={this.props.projectDetailsReducer.manifest.target_language.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          {this.displayText(this.props.verseText, this.props.selectionsReducer.selections)}
        </div>
      </div>
    );
  }
}

export default DefaultArea;
