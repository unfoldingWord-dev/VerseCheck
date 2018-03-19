/* eslint-env jest */
import React from 'react';
import DefaultArea from '../src/components/DefaultArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('DefaultArea component Tests', () => {
  let props;

  beforeEach(()=> {
    props = {
      actions: {
        validateSelections: jest.fn(),
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
      resourcesReducer: {
        bibles: {
          targetLanguage: {
            targetBible: {}
          }
        }
      },
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
      selectionsReducer: {
        selections: [{text:'text'}]
      },
      verseText: 'verse text'
    };
  });

  test('Check DefaultArea component', () => {
    const wrapper = shallow(<DefaultArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('Titus 1:1<Glyphicon /><MyLanguageModal />verse text');
  });
});
