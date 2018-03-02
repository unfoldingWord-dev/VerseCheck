import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';

const IconIndicators = ({
  verseEdited,
  selectionsReducer,
  commentsReducer,
  remindersReducer
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Glyphicon
        glyph="ok"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: selectionsReducer.selections.length > 0 ? 1 : 0.2
        }}
        title={selectionsReducer.selections.length > 0 ? "Selections were found for this check" : "No selections were found for this check"}
      />
       <Glyphicon
        glyph="pencil"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: verseEdited ? 1 : 0.2
        }}
        title={verseEdited ? "Verse edits were found for this check" : "No Verse edits were found for this check"}
      />
       <Glyphicon
        glyph="comment"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: commentsReducer.text && commentsReducer.text.length > 0 ? 1 : 0.2
        }}
        title={commentsReducer.text && commentsReducer.text.length > 0 ? "Comments were found for this check" : "No comments were found for this check"}
      />
       <Glyphicon
        glyph="bookmark"
        style={{
          margin: '0px 20px',
          color: "var(--reverse-color)",
          opacity: remindersReducer.enabled ? 1 : 0.2
        }}
        title={remindersReducer.enabled ? "This check has been bookmarked for review" : "This check has not been bookmarked for review"}
      />
    </div>
  );
};

IconIndicators.propTypes = {
  verseEdited: PropTypes.bool.isRequired,
  selectionsReducer: PropTypes.shape({
    selections: PropTypes.array
  }).isRequired,
  commentsReducer: PropTypes.shape({
    text: PropTypes.string
  }).isRequired,
  remindersReducer: PropTypes.shape({
    enabled: PropTypes.bool
  }).isRequired,
};

export default IconIndicators;
