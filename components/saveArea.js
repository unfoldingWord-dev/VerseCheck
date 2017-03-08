const React = require('react')
const RB = api.ReactBootstrap
const {Col, Button} = RB

var SaveArea = function(props) {
  return (
    <div>
      <Col sm={6}>
        <Button onClick={props.actions.goToPrevious}>
          Save and Previous
        </Button>
      </Col>
      <Col sm={6}>
        <Button bsStyle="primary" onClick={props.actions.goToNext}>
          Save & Continue
        </Button>
      </Col>
    </div>
  )
}

module.exports = SaveArea
