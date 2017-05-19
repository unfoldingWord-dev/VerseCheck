import React from 'react'
import style from '../css/Style';

let DirectionsArea = (props) => {
  return (
    <div style={style.directionsArea}>
      <span>Please select the correct translation for:</span>
      <span><strong style={{color: 'var(--accent-color)'}}>"{props.quote}"</strong></span>
    </div>
  )
}

module.exports = DirectionsArea
