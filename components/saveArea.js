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
        <Button bsStyle='link'
          onClick={handlePrevious}
          style={{color: '#747474'}}
        >
          <Glyphicon glyph='share-alt' style={{color: '#747474', marginRight: '5px', transform: 'scaleX(-1)'}} />
          Save & Previous
        </Button>
      </Col>
      <Col sm={6} style={{textAlign: 'right'}}>
        <Button bsStyle='primary'
          onClick={handleNext}
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
