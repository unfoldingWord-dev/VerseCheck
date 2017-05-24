import React from 'react'
import {Col, Glyphicon} from 'react-bootstrap'
import style from '../css/Style';

let ActionsArea = (props) => {
  const changeModeArea = (
    <div style={style.actionsArea}>
      <button className='btn-second'
              onClick={props.actions.changeMode.bind(this,'edit')}
      >
        <Glyphicon glyph='pencil' style={{marginRight: '10px'}} />
        Edit Verse
      </button>
      <button className='btn-second'
              onClick={props.actions.changeMode.bind(this,'comment')}
      >
        <Glyphicon glyph='comment' style={{marginRight: '10px'}} />
        Comment
      </button>
    </div>
  )

  const confirmEditVerseArea = (
      <div style={style.actionsArea}>
        <button className='btn-second'
                onClick={props.actions.cancelEditVerse.bind(this)}
        >
          Cancel
        </button>
        <button className='btn-prime'
                disabled={!props.tags.length}
                onClick={props.actions.saveEditVerse.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          Save Changes
        </button>
      </div>
  )

  const confirmCommentArea = (
      <div style={style.actionsArea}>
        <button className='btn-second'
                onClick={props.actions.cancelComment.bind(this)}
        >
          Cancel
        </button>
        <button className='btn-prime'
                disabled={!props.commentChanged}
                onClick={props.actions.saveComment.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          Save Changes
        </button>
      </div>
  )

  let modeArea
  switch(props.mode) {
    case 'edit':
    modeArea = confirmEditVerseArea
    break
    case 'comment':
    modeArea = confirmCommentArea
    break
    case 'select':
    modeArea = changeModeArea
    break
    default:
    modeArea = changeModeArea
  }

  return modeArea
}

module.exports = ActionsArea
