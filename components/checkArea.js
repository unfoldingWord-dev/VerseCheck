const React = require('react')
const RB = api.ReactBootstrap
const {Col} = RB

const SelectArea = require('./selectArea')
const DirectionsArea = require('./directionsArea')

var CheckArea = function(props) {
  return (
    <div style={{fontSize: '1.1em'}}>
      <Col sm={6} style={{borderRight: '1px solid #ccc', paddingTop: '5px'}}>
        <SelectArea checkInformation={props.checkInformation} direction={props.direction} actions={props.actions} />
      </Col>
      <Col sm={6} style={{height: '100%'}}>
        <DirectionsArea quote={props.checkInformation.phrase} />
      </Col>
    </div>
  )
}

module.exports = CheckArea
