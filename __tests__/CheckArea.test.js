/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import CheckArea from '../src/components/CheckArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const ult_titus_1 = '__tests__/fixtures/ult/tit/1.json';

describe('CheckArea component Tests', () => {
  const titus1 = fs.readJSONSync(ult_titus_1);
  let props;
  
  beforeEach(()=>{
    props = {
      actions: {},
      mode: 'default',
      tags: [],
      verseText: 'This is the verse text',
      verseChanged: false,
      comment: 'Comment!',
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
      selectionsReducer: {
        selections: []
      },
      selections: [],
      projectDetailsReducer: {
        manifest: {
          target_language: {
            direction: 'ltr'
          }
        },
        currentProjectToolsSelectedGL: {
          translationWords: 'en'
        }
      },
      resourcesReducer: {
        bibles: {
          en: {
            ult: {
              1: {
                1: titus1[1]
              }
            }
          }
        }
      },
      toolsReducer: {
        currentToolName: 'translationWords'
      }
    };    
  });

  test('Check CheckArea component mode default', () => {
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().alignedGLText).toEqual('God\'s');
  });

  test('Test CheckArea component mode select)', () => {
    props.mode = 'select';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component mode edit)', () => {
    props.mode = 'edit';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component mode comment)', () => {
    props.mode = 'comment';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component where GL Aligned Text not found (uses Greek quote instead)', () => {
    props.resourcesReducer.bibles.en.ult[1][1] = {};
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().alignedGLText).toEqual(props.contextIdReducer.contextId.quote);
  });
});
