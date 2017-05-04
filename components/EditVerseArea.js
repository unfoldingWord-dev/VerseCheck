import React from 'react'
import {Checkbox, Glyphicon, FormGroup, FormControl} from 'react-bootstrap'

let EditVerseArea = (props) => {
  const tagList = [
    ["spelling", "Spelling"],
    ["punctuation", "Punctuation"],
    ["grammar", "Grammar"],
    ["meaning", "Meaning"],
    ["wordChoice", "Word Choice"],
    ["other", "Other"]
  ]
  const checkboxes = tagList.map( tag =>
    <Checkbox key={tag[0]} inline checked={props.tags.includes(tag[0])}
      disabled={!props.verseChanged}
      style={props.verseChanged ? {width: '33.3%', marginLeft: '0px', color: 'var(--text-color-dark)'} : {width: '33.3%', marginLeft: '0px', color: 'var(--text-color-light)'}}
      onChange={props.actions.handleTagsCheckbox.bind(this, tag[0])}
    >
      {tag[1]}
    </Checkbox>
  )

  let checkBoxText = props.verseChanged ? "Next, select reason(s) for change" : "First, make changes to verse above";

  return (
    <div>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='pencil' style={{marginRight: '5px'}} />
        Edit Verse
      </div>
      <FormGroup controlId='formControlsTextarea'>
        <FormControl
          componentClass='textarea'
          type='text'
          defaultValue={props.verseText}
          style={{height: '9em', direction: props.dir}}
          onBlur={props.actions.handleEditVerse.bind(this)}
          onInput={props.actions.checkVerse.bind(this)}
        />
      <div style={{marginTop: '5px', marginBottom: '-2px', fontSize: '0.9em'}}>
          {checkBoxText}
          <br />
          {checkboxes}
        </div>
      </FormGroup>
    </div>
  )
}

module.exports = EditVerseArea
