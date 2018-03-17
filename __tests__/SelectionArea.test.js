/* eslint-env jest */
import React from 'react';
import SelectionArea from '../src/components/SelectionArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('SelectionArea component Tests', () => {
  let props;

  beforeEach(()=> {
    props = {
      actions: {},
      projectDetailsReducer: {
        manifest: {
          target_language: {
            direction: 'ltr'
          },
          project: {
            name: 'Titus'
          }
        }
      },
      contextIdReducer: {
        contextId: {
          quote: 'Θεοῦ',
          occurrence: 2,
          occurrences: 2,
          reference: {
            chapter: 1,
            verse: 1
          }
        }
      },
      mode: 'select',
      verseText: 'verse text',
      selections: [{text:'text'}]
    };
  });

  test('Check SelectionArea component', () => {
    const wrapper = shallow(<SelectionArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('Titus 1:1<RenderSelectionTextComponent />');
  });
});
