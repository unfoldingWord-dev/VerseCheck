import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';

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
      <span>
        {selectionsReducer.selections.map((selection, index) => {
          return (
            <span key={index}>
              <strong style={{ color: 'var(--accent-color)' }}>
                {`"${selection.text}"`}
            </strong>
              <span>{" "}</span>
            </span>
          );
        })}
      </span>
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
