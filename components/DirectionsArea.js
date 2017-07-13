import React from 'react';
import PropTypes from 'prop-types';
import style from '../css/Style';

let DirectionsArea = ({
  quote,
  selectionsReducer
}) => {
  if (selectionsReducer.selections.length > 0) {
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
              <span style={{ backgroundColor: 'var(--highlight-color)' }}>
                {selection.text}
              </span>
              <span>{" "}</span>
            </span>
            );
          })}
        </span>
      </div>
    );
  }
  return (
    <div style={style.directionsArea}>
      <span>Please select the translation for:</span><br />
      <span><strong style={{color: 'var(--accent-color)'}}>"{quote}"</strong></span>
    </div>
  )
}

DirectionsArea.propTypes = {
  quote: PropTypes.string.isRequired,
  selectionsReducer: PropTypes.object.isRequired
};

export default DirectionsArea;
