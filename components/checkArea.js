import React from 'react'
import {Col} from 'react-bootstrap'

import SelectArea from './selectArea'
import DirectionsArea from './directionsArea'
import EditVerseArea from './editVerseArea'
import CommentArea from './commentArea'

let CheckArea = (props) => {
  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = <EditVerseArea
      tags={props.tags}
      verseText={props.verseText}
      actions={props.actions} />
    break
    case 'comment':
    modeArea = <CommentArea comment={props.comment} actions={props.actions} />
    break
    case 'select':
    modeArea = <DirectionsArea quote={props.quote} />
    break
    default:
    modeArea = <DirectionsArea quote={props.quote} />
  }

  return (
    <div style={{fontSize: '1.1em'}}>
      <Col sm={6} style={{ paddingTop: '5px' }}>
        <SelectArea
          verseText={props.verseText}
          book={props.book}
          checkInformation={props.checkInformation}
          direction={props.direction}
          actions={props.actions}
        />
      </Col>
      <Col sm={6} style={{ borderLeft: '1px solid #ccc', height: '100%', paddingTop: '5px' }}>
        {modeArea}
      </Col>
    </div>
  )
}

module.exports = CheckArea