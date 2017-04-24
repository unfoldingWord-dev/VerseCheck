import React from 'react'
import {Col, Button, Glyphicon} from 'react-bootstrap'

let ActionsArea = (props) => {
  const changeModeArea = (
    <div style={{ fontSize: '1.1em'}}>
      <Col sm={2}>
        <Button bsStyle='link'
          onClick={props.actions.changeMode.bind(this,'edit')}
          style={{color: '#747474'}}
        >
          <Glyphicon glyph='pencil' style={{color: '#747474', marginRight: '5px'}} />
          Edit
        </Button>
      </Col>
      <Col sm={2}>
        <Button bsStyle='link'
          onClick={props.actions.changeMode.bind(this,'comment')}
          style={{color: '#747474'}}
        >
          <Glyphicon glyph='comment' style={{color: '#747474', marginRight: '5px'}} />
          Comment
        </Button>
      </Col>
    </div>
  )

  const confirmEditVerseArea = (
    <div style={{textAlign: 'right'}}>
      <Col sm={3} smOffset={6}>
        <Button bsStyle='link'
          style={{color: '#747474'}}
          onClick={props.actions.cancelEditVerse.bind(this)}
        >
          Cancel
        </Button>
      </Col>
      <Col sm={3}>
        <Button bsStyle='link'
          style={{color: '#8BC34A'}}
          onClick={props.actions.saveEditVerse.bind(this)}
        >
          <Glyphicon glyph='ok' style={{color: '#8BC34A', marginRight: '5px'}} />
          Save Changes
        </Button>
      </Col>
    </div>
  )

  const confirmCommentArea = (
    <div style={{textAlign: 'right'}}>
      <Col sm={3} smOffset={6}>
        <Button bsStyle='link'
          style={{color: '#747474'}}
          onClick={props.actions.cancelComment.bind(this)}
        >
          Cancel
        </Button>
      </Col>
      <Col sm={3}>
        <Button bsStyle='link'
          style={{color: '#8BC34A'}}
          onClick={props.actions.saveComment.bind(this)}
        >
          <Glyphicon glyph='ok' style={{color: '#8BC34A', marginRight: '5px'}} />
          Save Changes
        </Button>
      </Col>
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
