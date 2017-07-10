import React from 'react'
import style from '../css/Style';

let DirectionsArea = (props) => {
  return (
    <div style={style.directionsArea}>
      <span>Please select the translation for:</span><br />
      <span><strong style={{color: 'var(--accent-color)'}}>"{props.quote}"</strong></span>
    </div>
  )
}

export default DirectionsArea;
