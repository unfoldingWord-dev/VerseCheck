/* eslint-env jest */
import React from 'react';
import InstructionsArea from '../src/components/InstructionsArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('InstructionsArea component Tests', () => {
  let props;

  beforeEach(()=> {
    props = {
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
    expect(wrapper.text()).toEqual('Please select the translation for:"'+props.alignedGLText+'"');
  });

  test('Test InstructionsArea component default mode)', () => {
    props.mode = 'default';
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('"'+props.alignedGLText+'"has been translated as:"'+props.selectionsReducer.selections[0].text+'" ');
  });

  test('Test InstructionsArea component no selections)', () => {
    props.selectionsReducer.selections = [];
    props.dontShowTranslation = true;
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('No selection has been made.Click the Select button, then select the translation for this check.');
  });

  test('Test InstructionsArea component no verse text)', () => {
    props.verseText = '';
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('No selection can be made because the verse is blank.You may fix this by editing the verse.If desired, you may also leave a comment or bookmark this check.');
  });
});
