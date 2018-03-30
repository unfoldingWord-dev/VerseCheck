/* eslint-env jest */
import React from 'react';
import InstructionsArea from '../src/components/InstructionsArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('InstructionsArea component Tests', () => {
  let props;
  const mock_translate = (text) => { return text; };

  beforeEach(()=> {
    props = {
      translate: mock_translate,
      alignedGLText: 'God\'s',
      selectionsReducer: {
        selections: [{text:'selected text'}]
      },
      dontShowTranslation: false,
      verseText: 'This is the verse text',
      mode: 'select'
    };
  });

  test('Check InstructionsArea component mode select', () => {
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('please_select"'+props.alignedGLText+'"');
  });

  test('Test InstructionsArea component default mode)', () => {
    props.mode = 'default';
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('"'+props.alignedGLText+'"translated_as"'+props.selectionsReducer.selections[0].text+'" ');
  });

  test('Test InstructionsArea component no selections)', () => {
    props.selectionsReducer.selections = [];
    props.dontShowTranslation = true;
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('no_selection');
  });

  test('Test InstructionsArea component no verse text)', () => {
    props.verseText = '';
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('empty_verse');
  });
});
