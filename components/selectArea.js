const React = require('react')

const style = require('../css/style')

var SelectArea = function(props) {
  const verseDisplay = (
    <div>
      <strong>{props.checkInformation.reference} </strong>
      <span>{props.checkInformation.verse}</span>
    </div>
  )

  return (
    <div>
      <span style={style.pane.title}>
        {props.checkInformation.version}
      </span>
      <div style={style.pane.contentLTR}>
        {verseDisplay}
      </div>
    </div>
  )
}

module.exports = SelectArea
