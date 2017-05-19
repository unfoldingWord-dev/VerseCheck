import React from 'react'
import {Col} from 'react-bootstrap'

import SelectArea from './SelectArea'
import DirectionsArea from './DirectionsArea'
import EditVerseArea from './EditVerseArea'
import CommentArea from './CommentArea'
import style from '../css/Style';

let CheckArea = (props) => {
  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = <EditVerseArea
      tags={props.tags}
      verseText={props.verseText}
      verseChanged={props.verseChanged}
      actions={props.actions}
      dir = {props.projectDetailsReducer.manifest.target_language.direction} />
    break
    case 'comment':
    modeArea = <CommentArea comment={props.comment} actions={props.actions} />
    break
    case 'select':
    modeArea = <DirectionsArea quote={props.contextIdReducer.contextId.quote} />
    break
    default:
    modeArea = <DirectionsArea quote={props.contextIdReducer.contextId.quote} />
  }

  return (
    <div style={style.checkArea}>
      <SelectArea {...props} />
      <div style={{ borderLeft: '1px solid var(--border-color)', flex: 1, display: 'flex' }}>
        {modeArea}
      </div>
    </div>
  )
}

module.exports = CheckArea
