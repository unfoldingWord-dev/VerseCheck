import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';
export const QuoatationMarks = ({ children }) => <strong style={{ color: 'var(--accent-color)' }}>{'"'}{children}{'"'}</strong>;
export const Ellipsis = () => <strong style={{ color: 'var(--accent-color)' }}>{` ${ELLIPSIS} `}</strong>;

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
      <span>{renderTextSelection(selectionsReducer.selections, verseText)}</span>
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

const ELLIPSIS = '…';
/**
 * This is a helper method to determine if the selection needs an ellipsis in
 * between the selected words or not.
 * @param {Array} selections - Array of word objects that the user selected
 * @param {string} verseText - The entire verse string from the current check
 * @returns {boolean} - Whether or not the View should display an ellipsis
 */
function shouldRenderEllipsis(selections, verseText) {
  /** Need to get the the words and occurrence of the selected edge words */
  const endSelectedWord = selections[selections.length - 1].text.trim();
  const endSelectedWordOccurrence = selections[selections.length - 1].occurrence;
  const beginningSelectedWord = selections[0].text.trim();
  const beginningSelectedWordOccurrence = selections[0].occurrence;

  /** Using the occurrences to get the actual index of the word vs
   *  the first time it appears in verse text */
  const indexOfBeginningSelection = verseText.split(beginningSelectedWord, beginningSelectedWordOccurrence).join(beginningSelectedWord).length;
  const indexOfEndSelection = verseText.split(endSelectedWord, endSelectedWordOccurrence).join(endSelectedWord).length;

  /** Checking the text in between selected words for a non space character */
  const textBetweenSelection = verseText.substring(indexOfBeginningSelection + beginningSelectedWord.length, indexOfEndSelection);
  /** If the end index is the same as the beginning then it is the first word */
  return (indexOfEndSelection !== indexOfBeginningSelection) && textBetweenSelection.match(/\S/);
}

function renderTextSelection(selections, verseText) {
  if (shouldRenderEllipsis(selections, verseText)) {
    return (
      <QuoatationMarks>
        {selections[0].text.trim()}
        <Ellipsis />
        {selections[selections.length - 1].text.trim()}
      </QuoatationMarks>
    );
  } else {
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
  }
}
