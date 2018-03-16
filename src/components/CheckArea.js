import React, { Component } from 'react';
import PropTypes from 'prop-types';
// components
import DefaultArea from './DefaultArea';
import SelectionArea from './SelectionArea';
import InstructionsArea from './InstructionsArea';
import EditVerseArea from './EditVerseArea';
import CommentArea from './CommentArea';
import style from '../css/Style';
// helpers
import * as checkAreaHelpers from '../helpers/checkAreaHelpers';

class CheckArea extends Component {
  render() {
    const {
      actions,
      contextIdReducer: { contextId },
      mode,
      tags,
      verseText,
      verseChanged,
      comment,
      selectionsReducer,
      projectDetailsReducer,
      resourcesReducer: { bibles },
      toolsReducer
    } = this.props;

    let alignedGLText = contextId.quote;
    const selectedGL = projectDetailsReducer.currentProjectToolsSelectedGL[toolsReducer.currentToolName];
    if (bibles[selectedGL] && bibles[selectedGL]['ult']) {
      const verseObjects = bibles[selectedGL]['ult'][contextId.reference.chapter][contextId.reference.verse].verseObjects;
      const wordsToMatch = contextId.quote.split(' ');
      const text = checkAreaHelpers.getAlignedText(verseObjects, wordsToMatch, contextId.occurrence);
      if (text) {
        alignedGLText = text;
      }
    }

    let modeArea;
    switch (mode) {
      case 'edit':
        modeArea = (
          <EditVerseArea
            tags={tags}
            verseText={verseText}
            verseChanged={verseChanged}
            actions={actions}
            dir={projectDetailsReducer.manifest.target_language.direction}
          />
        );
        break;
      case 'comment':
        modeArea = <CommentArea comment={comment} actions={actions} />;
        break;
      case 'select':
        modeArea = (
          <div style={{ WebkitUserSelect: 'none', display: "flex", flex: "1", justifyContent: "center", alignItems: "center", overflow: "auto" }}>
            <InstructionsArea
              verseText={verseText}
              selectionsReducer={selectionsReducer}
              alignedGLText={alignedGLText}
              mode={mode}
            />
          </div>);
        break;
      case 'default':
      default:
        modeArea = (
          <div style={{ WebkitUserSelect: 'none', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <InstructionsArea
              dontShowTranslation={true}
              verseText={verseText}
              selectionsReducer={selectionsReducer}
              alignedGLText={alignedGLText}
            />
          </div>
        );
    }

    return (
      <div style={style.checkArea}>
        {mode === 'select' ?
          <SelectionArea
            {...this.props}
            actions={actions}
          /> :
          <DefaultArea {...this.props} />}
        <div style={{ borderLeft: '1px solid var(--border-color)', flex: 1, overflowY: "auto", display:'flex', justifyContent:'center' }}>
          {modeArea}
        </div>
      </div>
    );
  }
}

CheckArea.propTypes = {
  actions: PropTypes.object.isRequired,
  mode: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  verseText: PropTypes.string.isRequired,
  verseChanged: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  contextIdReducer: PropTypes.shape({
    contextId: PropTypes.object
  }).isRequired,
  selectionsReducer: PropTypes.shape({
    selections: PropTypes.array
  }).isRequired,
  projectDetailsReducer: PropTypes.shape({
    manifest: PropTypes.object,
    currentProjectToolsSelectedGL: PropTypes.object
  }).isRequired,
  resourcesReducer: PropTypes.shape({
    bibles: PropTypes.object
  }).isRequired,
  toolsReducer: PropTypes.shape({
    currentToolName: PropTypes.string
  }).isRequired
};

export default CheckArea;
