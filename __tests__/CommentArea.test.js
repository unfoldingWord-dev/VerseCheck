/* eslint-env jest */
import React from 'react';
import CommentArea from '../src/components/CommentArea';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('CommentArea component Tests', () => {
  let props;
  const mock_translate = (text) => { return text; };

  beforeEach(()=> {
    props = {
      translate: mock_translate,
      actions: {
        handleComment: jest.fn(),
        checkComment: jest.fn(),
      },
      comment: "my comment"
    };
  });

  test('Check CommentArea component', () => {
    const wrapper = shallow(<CommentArea {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    expect(wrapper.text()).toEqual('<Glyphicon />comment<FormGroup />');
  });
});
