import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';

let DirectionsArea = ({
  quote,
  selectionsReducer,
  dontShowTranslation,
  verseText
}) => {

  if (!verseText) {
    return (
      <div style={style.directionsArea}>
        <span>No selection can be made because the verse is blank.</span><br />
        <span>You may fix this by editing the verse.</span><br />
        <span>If desired, you may also leave a comment or bookmark this check.</span><br />
      </div>
    );
  }

  if (selectionsReducer.selections.length === 0 && dontShowTranslation) {
    return (
      <div style={style.directionsArea}>
        <span>No selection has been made.</span><br />
        <span>Click the Select button, then select the translation for this check.</span><br />
      </div>
    );
  }

  return (
    <div style={style.directionsArea}>
      <span>
        <strong style={{color: 'var(--accent-color)'}}>
          "{quote}"
        </strong>
      </span><br />
      <span>has been translated as:</span><br />
      <span>
        {selectionsReducer.selections.map((selection, index) => {
          return (
          <span key={index}>
            <strong style={{color: 'var(--accent-color)'}}>
              "{selection.text}"
            </strong>
            <span>{" "}</span>
          </span>
          );
        })}
      </span>
    </div>
  );
}

DirectionsArea.propTypes = {
  quote: PropTypes.string.isRequired,
  selectionsReducer: PropTypes.object.isRequired,
  dontShowTranslation: PropTypes.bool
};

export default DirectionsArea;
