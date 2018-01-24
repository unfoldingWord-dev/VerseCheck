/* eslint-env jest */

import React from 'react';
import MyLanguageModal from '../src/components/MyLanguageModal';
import {shallow} from 'enzyme';
import {Modal} from 'react-bootstrap';

// Tests for MyLanguageModal React Component
describe('Test MyLanguageModal component',()=>{
  test('Tests that the modal\'s title is displayed', () => {
    const props = {
      show: true,
      onHide: jest.fn(),
      targetLangBible: {
        1: {
          1: "This is verse 1",
          2: "This is verse 2",
          3: "This is verse 3",
          4: "This is verse 4"
        }
      },
      chapter: 1,
      currentVerse: 1,
      projectDetailsReducer: {
        manifest: {
          project: {
            name: 'My Book'
          }
        }
      }
    };
    const expectedTitle = props.projectDetailsReducer.manifest.project.name;
    const enzymeWrapper = shallow(<MyLanguageModal {...props} />);
    validateModalTitle(enzymeWrapper, expectedTitle);
  });
});

function validateModalTitle(enzymeWrapper, expectedTitle) {
  const titleHeader = enzymeWrapper.find(Modal.Title);
  expect(titleHeader.length).toEqual(1);
  expect(enzymeWrapper.find(Modal.Title).props().children[0]).toEqual(expectedTitle);
}
