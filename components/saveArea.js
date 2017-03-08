const React = require('react')
const RB = api.ReactBootstrap
const {Row, Col, Button} = RB

var SaveArea = function(props) {
  return (
    <Row style={{paddingTop: '15px'}}>
      <Col sm={6} style={{textAlign: 'left'}}>
        <Button onClick={props.actions.goToPrevious}>
          Save and Previous
        </Button>
      </Col>
      <Col sm={6} style={{textAlign: 'right'}}>
        <Button bsStyle="primary" onClick={props.actions.goToNext}>
          Save & Continue
        </Button>
      </Col>
    </Row>
  )
}

module.exports = SaveArea
