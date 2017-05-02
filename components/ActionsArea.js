import React from 'react'
import {Col, Button, Glyphicon} from 'react-bootstrap'

let ActionsArea = (props) => {
  const changeModeArea = (
    <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
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
      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Button bsStyle='second'
                style={{color: 'var(--completed-color)', borderColor: 'var(--completed-color)'}}
                onClick={props.actions.cancelEditVerse.bind(this)}
        >
          Cancel
        </Button>
        <Button bsStyle='prime'
                disabled={!props.tags.length}
                style={{backgroundColor: 'var(--completed-color)', borderColor: 'var(--completed-color)', backgroundImage: 'linear-gradient(to bottom, var(--completed-color), var(--completed-color))'}}
                onClick={props.actions.saveEditVerse.bind(this)}
        >
          <Glyphicon glyph='ok' style={{marginRight: '10px'}} />
          Save Changes
        </Button>
      </div>
  )

  const confirmCommentArea = (
      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
        <Button bsStyle='second'
                style={{color: 'var(--highlight-color)', borderColor: 'var(--highlight-color)'}}
                onClick={props.actions.cancelComment.bind(this)}
        >
          Cancel
        </Button>
        <Button bsStyle='prime'
                disabled={!props.commentChanged}
                style={{backgroundColor: 'var(--highlight-color)', borderColor: 'var(--highlight-color)', backgroundImage: 'linear-gradient(to bottom, var(--highlight-color), var(--highlight-color))'}}
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
