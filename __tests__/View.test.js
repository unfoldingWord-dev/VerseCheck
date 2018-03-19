/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import View from '../src/components/View';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';

const project = '__tests__/fixtures/project/loadedProjectShortened.json';

describe('View component Tests', () => {
  test('Integrated View test', () => {
    let props = fs.readJSONSync(project);
    props.actions = {
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
    };
    props = {
      ...props,
      cancelSelection: () => jest.fn(),
      clearSelection: () => jest.fn(),
      saveSelection: () => jest.fn(),
      goToNextOrPrevious: () => jest.fn()
    };

    const component = renderer.create(
      <MuiThemeProvider>
        <View {...props} />
      </MuiThemeProvider>
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
