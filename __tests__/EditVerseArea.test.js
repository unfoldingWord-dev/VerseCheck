/* eslint-env jest */
import React from 'react';
import EditVerseArea from '../src/components/EditVerseArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('EditVerseArea component Tests', () => {
  let props;
  const mock_translate = (text) => { return text; };

  beforeEach(()=> {
    props = {
      translate: mock_translate,
      tags: [],
      verseChanged: false,
      verseText: 'This is the verse text',
      dir: 'ltr',
      actions: {
        handleTagsCheckbox: () => jest.fn(),
        handleEditVerse: () => jest.fn(),
        checkVerse: () => jest.fn(),
      }
    };
  });

  test('Check EditVerseArea component', () => {
    const wrapper = shallow(<EditVerseArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('<Glyphicon />edit_verse<FormGroup />');
  });

  test('Check EditVerseArea component select all', () => {
    props.tags = ["spelling", "punctuation", "wordChoice", "meaning", "grammar", "other"];
    const wrapper = shallow(<EditVerseArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('<Glyphicon />edit_verse<FormGroup />');
  });

  test('Check EditVerseArea component select all', () => {
    props.verseChanged = true;
    const wrapper = shallow(<EditVerseArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('<Glyphicon />edit_verse<FormGroup />');
  });

});
