import React from 'react'
import {Col, Button, Glyphicon} from 'react-bootstrap'
import style from '../css/Style';

let ActionsArea = (props) => {
  const changeModeArea = (
    <div style={style.actionsArea}>
      <Button bsStyle='second'
              onClick={props.actions.changeMode.bind(this,'edit')}
      >
        <Glyphicon glyph='pencil' style={{marginRight: '10px'}} />
        Edit Verse
      </Button>
      <Button bsStyle='second'
              onClick={props.actions.changeMode.bind(this,'comment')}
      >
        <Glyphicon glyph='comment' style={{marginRight: '10px'}} />
        Comment
      </Button>
    </div>
  )

  const confirmEditVerseArea = (
      <div style={style.actionsArea}>
        <Button bsStyle='second'
                onClick={props.actions.cancelEditVerse.bind(this)}
        >
          Cancel
        </Button>
        <Button bsStyle='prime'
                disabled={!props.tags.length}
                onClick={props.actions.saveEditVerse.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          Save Changes
        </Button>
      </div>
  )

  const confirmCommentArea = (
      <div style={style.actionsArea}>
        <Button bsStyle='second'
                onClick={props.actions.cancelComment.bind(this)}
        >
          Cancel
        </Button>
        <Button bsStyle='prime'
                disabled={!props.commentChanged}
                onClick={props.actions.saveComment.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          Save Changes
        </Button>
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
