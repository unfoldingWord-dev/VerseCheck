const api = window.ModuleApi
const React = api.React
const RB = api.ReactBootstrap
const {FormGroup, FormControl, Glyphicon} = RB

var EditVerseArea = function(props) {
  return (
    <div>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='pencil' style={{marginRight: '5px'}} />
        Edit Verse
      </div>
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass='textarea'
          type='text'
          defaultValue={props.verseText}
          style={{height: '10em'}}
          onBlur={props.actions.handleEditVerse.bind(this)}
        />
      </FormGroup>
    </div>
  )
}

module.exports = EditVerseArea
