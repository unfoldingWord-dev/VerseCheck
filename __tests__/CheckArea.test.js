/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import { shallow } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';
import CheckArea from '../src/components/CheckArea';

const ult_titus_1 = '__tests__/fixtures/ult/tit/1.json';

describe('CheckArea component Tests', () => {
  const titus1 = fs.readJSONSync(ult_titus_1);
  const mock_translate = (text) => { return text; };
  let props;
  
  beforeEach(()=>{
    props = {
      translate: mock_translate,
      actions: {
        handleGoToNext: () => jest.fn(),
        handleGoToPrevious: () => jest.fn(),
        handleOpenDialog: () => jest.fn(),
        handleCloseDialog: () => jest.fn(),
        skipToNext: () => jest.fn(),
        skipToPrevious: () => jest.fn(),
        changeSelectionsInLocalState: () => jest.fn(),
        changeMode: () => jest.fn(),
        handleComment: () => jest.fn(),
        checkComment: () => jest.fn(),
        cancelComment: () => jest.fn(),
        saveComment: () => jest.fn(),
        handleTagsCheckbox: () => jest.fn(),
        handleEditVerse: () => jest.fn(),
        checkVerse: () => jest.fn(),
        cancelEditVerse: () => jest.fn(),
        saveEditVerse: () => jest.fn(),
        validateSelections: () => jest.fn(),
        toggleReminder: () => jest.fn(),
        openAlertDialog: () => jest.fn(),
        selectModalTab: () => jest.fn()
      },
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
          },
          project: {
            name: 'Titus'
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
          },
          targetLanguage: {
            targetBible: {}
          }
        }
      },
      toolsReducer: {
        currentToolName: 'translationWords'
      }
    };    
  });

  test('Check CheckArea component mode default', () => {
    const component = renderer.create(
      <MuiThemeProvider>
        <CheckArea {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Test CheckArea component mode select)', () => {
    props.mode = 'select';
    const component = renderer.create(
      <MuiThemeProvider>
        <CheckArea {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Test CheckArea component mode edit)', () => {
    props.mode = 'edit';
    const component = renderer.create(
      <MuiThemeProvider>
        <CheckArea {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Test CheckArea component mode comment)', () => {
    props.mode = 'comment';
    const component = renderer.create(
      <MuiThemeProvider>
        <CheckArea {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Test CheckArea component where GL Aligned Text not found (uses Greek quote instead)', () => {
    props.resourcesReducer.bibles.en.ult[1][1] = {};
    const component = renderer.create(
      <MuiThemeProvider>
        <CheckArea {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('Test getAlignedGLText() function in CheckArea Component', () => {
    const wrapper = shallow(<CheckArea {...props} />);
    const expectedAlignedGLText = 'God\'s';
    expect(wrapper.instance().getAlignedGLText()).toEqual(expectedAlignedGLText);
  });

  test('Test getAlignedGLText() function in CheckArea Component where the GL align is not found so uses the Greek', () => {
    const nonExistantQuote = 'does-not-exist';
    props.contextIdReducer.contextId.quote = nonExistantQuote;
    const wrapper = shallow(<CheckArea {...props} />);
    expect(wrapper.instance().getAlignedGLText()).toEqual(nonExistantQuote);
  });
});
