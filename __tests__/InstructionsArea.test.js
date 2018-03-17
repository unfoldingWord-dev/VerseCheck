/* eslint-env jest */
import React from 'react';
import InstructionsArea from '../src/components/InstructionsArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const props = {
  alignedGLText: 'God\'s',
  selectionsReducer: {
    selections: [{text:'selected text'}]
  },
  dontShowTranslation: false,
  verseText: 'This is the verse text',
  mode: 'select'
};

describe('InstructionsArea component Tests', () => {
  test('Check InstructionsArea component mode select', () => {
    const wrapper = shallow(<InstructionsArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('Please select the translation for:"'+props.alignedGLText+'"');
  });

  test('Test InstructionsArea component default mode)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.mode = 'default';
    const wrapper = shallow(<InstructionsArea {...newProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('"'+props.alignedGLText+'"has been translated as:"'+newProps.selectionsReducer.selections[0].text+'" ');
  });

  test('Test InstructionsArea component no selections)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.selectionsReducer.selections = [];
    newProps.dontShowTranslation = true;
    const wrapper = shallow(<InstructionsArea {...newProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('No selection has been made.Click the Select button, then select the translation for this check.');
  });

  test('Test InstructionsArea component no verse text)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.verseText = '';
    const wrapper = shallow(<InstructionsArea {...newProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('No selection can be made because the verse is blank.You may fix this by editing the verse.If desired, you may also leave a comment or bookmark this check.');
  });
});
