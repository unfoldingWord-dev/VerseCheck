import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';
const ELLIPSIS = '…';
export const QuoatationMarks = ({ children }) => <strong style={{ color: 'var(--accent-color)' }}>{'"'}{children}{'"'}</strong>;
export const Ellipsis = () => <strong style={{ color: 'var(--accent-color)' }}>{` ${ELLIPSIS} `}</strong>;

function renderTextSelection(selections) {
  if (selections.length === 2) {
    return (
      <QuoatationMarks>
        {selections.map((selection, index) =>
          <span key={index}>
            <strong style={{ color: 'var(--accent-color)' }}>
              {`${selection.text.trim()}`}
            </strong>
            {selections[index + 1] ? <span>{" "}</span> : null}
          </span>
        )}
      </QuoatationMarks>
    );
  } else if (selections.length > 1) {
    return (
      <QuoatationMarks>
        {selections[0].text.trim()}
        <Ellipsis />
        {selections[selections.length - 1].text.trim()}
      </QuoatationMarks>
    );
  } else {
    return (
      <QuoatationMarks style={{ color: 'var(--accent-color)' }}>
        {selections[0].text.trim()}
      </QuoatationMarks>
    );
  }
}

let InstructionsArea = ({
  alignedGLText,
  selectionsReducer,
  dontShowTranslation,
  verseText,
  mode,
  translate
}) => {

  if (!verseText) {
    return (
      <div style={style.InstructionsArea}>
        <span>{translate("empty_verse")}</span><br />
      </div>
    );
  }

  if (selectionsReducer.selections.length === 0 && dontShowTranslation) {
    return (
      <div style={style.InstructionsArea}>
        <span>{translate("no_selection")}</span><br />
      </div>
    );
  }

  if (mode === 'select') {
    return (
      <div style={style.InstructionsArea}>
        <span>{translate("please_select")}</span><br />
        <span>
          <strong style={{ color: 'var(--accent-color)' }}>
            {`"${alignedGLText}"`}
          </strong>
        </span><br />
      </div>
    );
  }

  return (
    <div style={style.InstructionsArea}>
      <span>
        <strong style={{ color: 'var(--accent-color)' }}>
          {`"${alignedGLText}"`}
        </strong>
      </span><br />
      <span>{translate("translated_as")}</span><br />
      <span>{renderTextSelection(selectionsReducer.selections)}</span>
    </div>
  );
};

InstructionsArea.propTypes = {
  translate: PropTypes.func.isRequired,
  alignedGLText: PropTypes.string.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  dontShowTranslation: PropTypes.bool,
  verseText: PropTypes.string.isRequired,
  mode: PropTypes.string
};

export default InstructionsArea;
