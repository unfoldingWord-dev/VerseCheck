const React = require('react')
const RB = api.ReactBootstrap
const {Col, Button} = RB

var SaveArea = function(props) {
  return (
    <div>
      <Col sm={6}>
        <Button>Save and Previous</Button>
      </Col>
      <Col sm={6}>
        <Button bsStyle="primary">Save & Continue</Button>
      </Col>
    </div>
  )
}

module.exports = SaveArea
