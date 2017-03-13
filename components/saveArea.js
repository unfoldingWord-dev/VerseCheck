const React = require('react')
const RB = api.ReactBootstrap
const {Row, Col, Button, Glyphicon} = RB

var SaveArea = function(props) {
  return (
    <Row style={{paddingTop: '15px'}}>
      <Col sm={6} style={{textAlign: 'left'}}>
        <Button bsStyle='link'
          onClick={props.actions.goToPrevious}
          style={{color: '#747474'}}
        >
          <Glyphicon glyph='share-alt' style={{color: '#747474', marginRight: '5px', transform: 'scaleX(-1)'}} />
          Save & Previous
        </Button>
      </Col>
      <Col sm={6} style={{textAlign: 'right'}}>
        <Button bsStyle='primary'
          onClick={props.actions.goToNext}
          style={{background: '#2196F3', border: 'none'}}
        >
          Save & Continue
          <Glyphicon glyph='share-alt' style={{marginLeft: '5px'}} />
        </Button>
      </Col>
    </Row>
  )
}

module.exports = SaveArea
