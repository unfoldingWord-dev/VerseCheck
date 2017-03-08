const React = require('react')

var DirectionsArea = function(props) {
  return (
    <div style={{paddingTop: '5em', textAlign: 'center'}}>
      Please select the correct translation for:
      <br />
      <strong style={{color: '#2196F3'}}>"{props.quote}"</strong>
    </div>
  )
}

module.exports = DirectionsArea
