import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';

let DirectionsArea = ({
  quote,
  selectionsReducer,
  dontShowTranslation
}) => {

  if (dontShowTranslation || selectionsReducer.selections.length === 0) {
    return (
      <div style={style.directionsArea}>
        <span>Please select the translation for:</span><br />
        <span><strong style={{color: 'var(--accent-color)'}}>"{quote}"</strong></span>
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
