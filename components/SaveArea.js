import React from 'react'
import {Row, Glyphicon, Col} from 'react-bootstrap'
import style from '../css/Style'

let SaveArea = (props) => {

  const handleNext = () => {
    props.selectionsReducer.selections.length > 0 ? props.actions.handleGoToNext() : props.actions.handleOpenDialog("next")
  };

  const handlePrevious = () => {
    props.selectionsReducer.selections.length > 0 ? props.actions.handleGoToPrevious() : props.actions.handleOpenDialog("previous")
  };

  return (
    <div style={style.saveArea}>
      <button className='btn-second'
              onClick={handlePrevious}
      >
        <Glyphicon glyph='share-alt' style={{marginRight: '10px', transform: 'scaleX(-1)'}} />
        Save & Previous
      </button>
      <button className='btn-prime'
              onClick={handleNext}
      >
        Save & Continue
        <Glyphicon glyph='share-alt' style={{marginLeft: '10px'}} />
      </button>
    </div>
  )
}

export default SaveArea;
