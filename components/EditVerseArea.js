import React from 'react'
import {Checkbox, Glyphicon, FormGroup, FormControl} from 'react-bootstrap'
import style from '../css/Style';

let EditVerseArea = (props) => {
  const tagList1 = [
    ["spelling", "Spelling"],
    ["punctuation", "Punctuation"],
    ["wordChoice", "Word Choice"],
  ]

  const tagList2 = [
    ["meaning", "Meaning"],
    ["grammar", "Grammar"],
    ["other", "Other"]
  ]

  const checkboxesColumn1 = tagList1.map(tag =>
    <Checkbox
      key={tag[0]}
      checked={props.tags.includes(tag[0])}
      disabled={!props.verseChanged}
      style={props.verseChanged ? {width: '33.3%', marginLeft: '10px', marginRight: '10px', color: 'var(--text-color-dark)'} : {width: '33.3%', marginLeft: '10px', marginRight: '10px', color: 'var(--text-color-light)'}}
      onChange={props.actions.handleTagsCheckbox.bind(this, tag[0])}
    >
      {tag[1]}
    </Checkbox>
  )

  const checkboxesColumn2 = tagList2.map(tag =>
    <Checkbox
      key={tag[0]}
      checked={props.tags.includes(tag[0])}
      disabled={!props.verseChanged}
      style={props.verseChanged ? {width: '33.3%', marginLeft: '10px', marginRight: '10px', color: 'var(--text-color-dark)'} : {width: '33.3%', marginLeft: '10px', marginRight: '10px', color: 'var(--text-color-light)'}}
      onChange={props.actions.handleTagsCheckbox.bind(this, tag[0])}
    >
      {tag[1]}
    </Checkbox>
  )

  let checkBoxText = props.verseChanged ? "Next, select reason(s) for change" : "First, make changes to verse above";

  return (
    <div style={style.editArea}>
      <div style={{fontWeight: 'bold'}}>
        <Glyphicon glyph='pencil' style={{marginRight: '5px'}} />
        Edit Verse
      </div>
      <FormGroup style={{flex: 'auto', display: 'flex', flexDirection: 'column', marginBottom: '5px'}} controlId='formControlsTextarea'>
        <FormControl autoFocus
          componentClass='textarea'
          type='text'
          defaultValue={props.verseText}
          style={{flex: 'auto', direction: props.dir}}
          onBlur={props.actions.handleEditVerse.bind(this)}
          onInput={props.actions.checkVerse.bind(this)}
        />
      <div style={{flex: '0 0 65px', marginTop: '5px', fontSize: '0.9em'}}>
        {checkBoxText}
        <br />
        <div style={{ display: 'flex' }}>
          <div style={{ flex: '1' }}>
            {checkboxesColumn1}
          </div>
          <div style={{ flex: '1' }}>
            {checkboxesColumn2}
          </div>
        </div>
      </div>
      </FormGroup>
    </div>
  )
}

export default EditVerseArea;
