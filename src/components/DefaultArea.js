import React from 'react';
import PropTypes from 'prop-types';
// helpers
import {
  selectionArray,
  normalizeString
} from '../utils/selectionHelpers';
// components
import { Glyphicon } from 'react-bootstrap';
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
      },
      translate
    } = this.props;
    const { target_language, project } = manifest;
    const bookName = target_language && target_language.book && target_language.book.name ?
      target_language.book.name : project.name;
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
            <Glyphicon glyph="fullscreen" title={translate("click_show_expanded")} style={{cursor: "pointer"}}/>
          </div>
          <MyLanguageModal
            projectDetailsReducer={this.props.projectDetailsReducer}
            show={this.state.modalVisibility}
            targetLangBible={bibles.targetLanguage.targetBible}
            chapter={reference.chapter}
            currentVerse={reference.verse}
            dir = {dir ? dir : "ltr"}
            onHide={() => this.setState({modalVisibility: false})}
          />
        </div>
        <div style={this.props.projectDetailsReducer.manifest.target_language.direction === 'ltr' ? style.pane.contentLTR : style.pane.contentRTL}>
          {this.displayText(this.props.verseText, this.props.selectionsReducer.selections)}
        </div>
      </div>
    );
  }
}

DefaultArea.propTypes = {
  translate: PropTypes.func.isRequired,
  contextIdReducer: PropTypes.shape({
    contextId: PropTypes.object
  }).isRequired,
  resourcesReducer: PropTypes.object.isRequired,
  projectDetailsReducer: PropTypes.shape({
    manifest: PropTypes.object
  }).isRequired,
  selectionsReducer: PropTypes.shape({
    selections: PropTypes.array
  }).isRequired,
  verseText: PropTypes.string.isRequired,
};

export default DefaultArea;
