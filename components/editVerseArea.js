const api = window.ModuleApi
const React = api.React
const RB = api.ReactBootstrap
const {FormGroup, FormControl} = RB

var EditVerseArea = function(props) {
  return (
    <div>
      <div style={{fontWeight: 'bold'}}>
        Edit Verse
      </div>
      <FormGroup controlId="formControlsTextarea">
        <FormControl
          componentClass='textarea'
          type='text'
          defaultValue={props.verseText}
          style={{height: '13.5em'}}
          onBlur={props.actions.handleEditVerse.bind(this)}
        />
      </FormGroup>
    </div>
  )
}

module.exports = EditVerseArea
