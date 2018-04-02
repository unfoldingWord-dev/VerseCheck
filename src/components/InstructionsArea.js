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
  translate,
  getOrderedVerseObjectsFromString
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
      <span>{renderTextSelection(selectionsReducer.selections, verseText, getOrderedVerseObjectsFromString)}</span>
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
// const beginningSelectedWord = selections[0].text.trim();
// const endSelectedWord = selections[selections.length - 1].text.trim();
// const betweenRegex = new RegExp(beginningSelectedWord + '.*?(\\S?).*?' + endSelectedWord);
// return (verseText.match(betweenRegex) || [])[1];

const ELLIPSIS = '…';
function shouldRenderEllipsis(selections, verseText, getOrderedVerseObjectsFromString) {
  const beginningSelectedWord = selections[0].text.trim();
  const beginningSelectedOccurrence = selections[0].occurrence;
  const beginningSelectedOccurrences = selections[0].occurrences;
  const endSelectedWord = selections[selections.length - 1].text.trim();
  const verseTextObjects = getOrderedVerseObjectsFromString(verseText);
  const selectedBeginningTextObjectIndex = verseTextObjects.findIndex(({text, occurrence, occurrences}) =>
    text === beginningSelectedWord &&
    occurrence === beginningSelectedOccurrence &&
    occurrences === beginningSelectedOccurrences
  );
  const secondVerseTextObject = verseTextObjects[selectedBeginningTextObjectIndex + 1] || {};
  return secondVerseTextObject.text !== endSelectedWord;
}

function renderTextSelection(selections, verseText, getOrderedVerseObjectsFromString) {
  if (shouldRenderEllipsis(selections, verseText, getOrderedVerseObjectsFromString)) {
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
