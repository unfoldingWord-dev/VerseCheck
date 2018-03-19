/* eslint-env jest */
import React from 'react';
import RenderSelectionTextComponent from '../src/components/RenderSelectionTextComponent';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { getCurrentWindowSelection } from '../src/helpers/windowSelectionHelpers';

describe('RenderSelectionTextComponent component Tests', () => {
  let props;

  beforeEach(()=> {
    props = {
      actions: {
        changeSelectionsInLocalState: jest.fn(),
        openAlertDialog: jest.fn(),
      },
      mode: 'select',
      verseText: 'verse text',
      selections: [{text: 'text'}]
    };
  });

  test('Check RenderSelectionTextComponent component', () => {
    const wrapper = shallow(<RenderSelectionTextComponent {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual(props.verseText);
  });
});
