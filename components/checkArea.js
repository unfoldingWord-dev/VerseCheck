const React = require('react')
const RB = api.ReactBootstrap
const {Col} = RB

const SelectArea = require('./selectArea')
const DirectionsArea = require('./directionsArea')
const EditArea = require('./editArea')
const CommentArea = require('./commentArea')

var CheckArea = function(props) {

  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = <EditArea actions={props.actions} />
    break
    case 'comment':
    modeArea = <CommentArea comment={props.comment} actions={props.actions} />
    break
    case 'select':
    modeArea = <DirectionsArea quote={props.checkInformation.phrase} />
    break
    default:
    modeArea = <DirectionsArea quote={props.checkInformation.phrase} />
  }

  return (
    <div style={{fontSize: '1.1em'}}>
      <Col sm={6} style={{borderRight: '1px solid #ccc', paddingTop: '5px'}}>
        <SelectArea checkInformation={props.checkInformation} direction={props.direction} actions={props.actions} />
      </Col>
      <Col sm={6} style={{height: '100%', paddingTop: '5px'}}>
        {modeArea}
      </Col>
    </div>
  )
}

module.exports = CheckArea
