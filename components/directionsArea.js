const React = require('react')

var DirectionsArea = function(props) {
  return (
    <div>
      Select the correct translation for:
      <br />
      <strong>"{props.quote}"</strong>
    </div>
  )
}

module.exports = DirectionsArea
