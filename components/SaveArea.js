import React from 'react'
import {Row, Glyphicon, Col, Button} from 'react-bootstrap'

let SaveArea = (props) => {

  const handleNext = () => {
    props.selectionsReducer.selections.length > 0 ? props.actions.handleGoToNext() : props.actions.handleOpenDialog("next")
  };

  const handlePrevious = () => {
    props.selectionsReducer.selections.length > 0 ? props.actions.handleGoToPrevious() : props.actions.handleOpenDialog("previous")
  };

  return (
    <Row style={{paddingTop: '15px'}}>
      <Col sm={6} style={{textAlign: 'left'}}>
        <Button bsStyle='second'
          onClick={handlePrevious}
        >
          <Glyphicon glyph='share-alt' style={{marginRight: '10px', transform: 'scaleX(-1)'}} />
          Save & Previous
        </Button>
      </Col>
      <Col sm={6} style={{textAlign: 'right'}}>
        <Button bsStyle='prime'
          onClick={handleNext}
        >
          Save & Continue
          <Glyphicon glyph='share-alt' style={{marginLeft: '10px'}} />
        </Button>
      </Col>
    </Row>
  )
}

module.exports = SaveArea
