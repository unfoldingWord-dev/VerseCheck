import React from 'react';
import {FormGroup, FormControl, Glyphicon} from 'react-bootstrap';
import style from '../css/Style';

let CommentArea = (props) => {
  return (
    <div style={style.commentArea}>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='comment' style={{marginRight: '5px'}} />
        Comment
      </div>
      <FormGroup style={{flex: 'auto', display: 'flex' }} controlId="formControlsTextarea">
        <FormControl autoFocus
          componentClass='textarea'
          type='text'
          defaultValue={props.comment}
          style={{flex: 'auto'}}
          onBlur={props.actions.handleComment.bind(this)}
          onInput={props.actions.checkComment.bind(this)}
        />
      </FormGroup>
    </div>
  );
};

module.exports = CommentArea;
