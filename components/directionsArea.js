import React from 'react'

let DirectionsArea = (props) => {
  return (
    <div style={{ height: '12em', paddingTop: '4em', textAlign: 'center'}}>
      Please select the correct translation for:
      <br />
      <strong style={{color: '#2196F3'}}>"{props.quote}"</strong>
    </div>
  )
}

module.exports = DirectionsArea
