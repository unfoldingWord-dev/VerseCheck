import React from 'react'
// components
import DefaultArea from './DefaultArea';
import SelectionArea from './SelectionArea';
import DirectionsArea from './DirectionsArea';
import EditVerseArea from './EditVerseArea';
import CommentArea from './CommentArea';
import style from '../css/Style';

let CheckArea = (props) => {
  let modeArea
  switch(props.mode) {
    case 'edit':
      modeArea = (
        <EditVerseArea
          tags={props.tags}
          verseText={props.verseText}
          verseChanged={props.verseChanged}
          actions={props.actions}
          dir = {props.projectDetailsReducer.manifest.target_language.direction}
        />
      );
    break
    case 'comment':
      modeArea = <CommentArea comment={props.comment} actions={props.actions} />
    break
    case 'select':
      modeArea = (
        <SelectionArea
          actions={props.actions}
          quote={props.contextIdReducer.contextId.quote}
        />
      );
    break
    case 'default':
    default:
      modeArea = (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
          <DirectionsArea quote={props.contextIdReducer.contextId.quote} />
        </div>
      );
  }

  return (
    <div style={style.checkArea}>
      <DefaultArea {...props} />
      <div style={{ borderLeft: '1px solid var(--border-color)', flex: 1 }}>
        {modeArea}
      </div>
    </div>
  )
}

export default CheckArea;
