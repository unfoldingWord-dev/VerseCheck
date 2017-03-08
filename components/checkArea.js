const React = require('react')
const RB = api.ReactBootstrap
const {Col} = RB

const SelectArea = require('./selectArea')
const DirectionsArea = require('./directionsArea')

var CheckArea = function(props) {
  return (
    <div>
      <Col sm={6} style={{borderRight: '1px solid #95989A'}}>
        <SelectArea checkInformation={props.checkInformation} actions={props.actions} />
      </Col>
      <Col sm={6}>
        <DirectionsArea quote={props.checkInformation.phrase} />
      </Col>
    </div>
  )
}

module.exports = CheckArea
