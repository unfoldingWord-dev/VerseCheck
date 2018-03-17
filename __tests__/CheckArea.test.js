/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import CheckArea from '../src/components/CheckArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const ult_titus_1 = '__tests__/fixtures/ult/tit/1.json';
const titus1 = fs.readJSONSync(ult_titus_1);

const props = {
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
  projectDetailsReducer: {
    manifest: {},
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

describe('CheckArea component Tests', () => {
  test('Check CheckArea component mode default', () => {
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().alignedGLText).toEqual('God\'s');
  });

  test('Test CheckArea component mode select)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.mode = 'select';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component mode edit)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.mode = 'edit';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component mode comment)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.mode = 'comment';
    const wrapper = shallow(<CheckArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  test('Test CheckArea component where GL Aligned Text not found (uses Greek quote instead)', () => {
    const newProps = JSON.parse(JSON.stringify(props));
    newProps.resourcesReducer.bibles.en.ult[1][1] = {};
    const wrapper = shallow(<CheckArea {...newProps} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.instance().alignedGLText).toEqual(newProps.contextIdReducer.contextId.quote);
  });
});
