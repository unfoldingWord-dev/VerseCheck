import React from 'react';
import PropTypes from 'prop-types';
// components
import DefaultArea from './DefaultArea';
import SelectionArea from './SelectionArea';
import InstructionsArea from './InstructionsArea';
import EditVerseArea from './EditVerseArea';
import CommentArea from './CommentArea';
import style from '../css/Style';

const CheckArea = ({
  actions,
  mode,
  tags,
  verseText,
  verseChanged,
  comment,
  contextIdReducer,
  selectionsReducer,
  projectDetailsReducer
}) => {
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
            quote={contextIdReducer.contextId.quote}
            mode={mode}
          />
        </div>);
      break;
    case 'default':
    default:
      modeArea = (
        <div style={{ WebkitUserSelect: 'none', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <InstructionsArea dontShowTranslation={true} verseText={verseText} selectionsReducer={selectionsReducer} quote={contextIdReducer.contextId.quote} />
        </div>
      );
  }

  return (
    <div style={style.checkArea}>
      {mode === 'select' ?
        <SelectionArea
          {...this.props}
          actions={actions}
          quote={contextIdReducer.contextId.quote}
        /> :
        <DefaultArea {...this.props} />}
      <div style={{ borderLeft: '1px solid var(--border-color)', flex: 1, overflowY: "auto", display:'flex', justifyContent:'center' }}>
        {modeArea}
      </div>
    </div>
  );
};

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
    manifest: PropTypes.object
  }).isRequired
};

export default CheckArea;
