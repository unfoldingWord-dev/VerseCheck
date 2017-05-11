import React from 'react'
import {FormGroup, FormControl, Glyphicon} from 'react-bootstrap'

let CommentArea = (props) => {
  return (
    <div>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='comment' style={{marginRight: '5px'}} />
        Comment
      </div>
      <FormGroup controlId="formControlsTextarea">
        <FormControl autoFocus
          componentClass='textarea'
          type='text'
          defaultValue={props.comment}
          style={{height: '13.5em'}}
          onBlur={props.actions.handleComment.bind(this)}
          onInput={props.actions.checkComment.bind(this)}
        />
      </FormGroup>
    </div>
  )
}

module.exports = CommentArea
