const api = window.ModuleApi
const React = api.React
const RB = api.ReactBootstrap
const {FormGroup, FormControl, Glyphicon} = RB

var CommentArea = function(props) {
  return (
    <div>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='comment' style={{marginRight: '5px'}} />
        Comment
      </div>
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass='textarea'
          type='text'
          defaultValue={props.comment}
          style={{height: '13.5em'}}
          onBlur={props.actions.handleComment.bind(this)}
        />
      </FormGroup>
    </div>
  )
}

module.exports = CommentArea
