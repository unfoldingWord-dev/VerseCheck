/* eslint-env jest */
import React from 'react';
import fs from 'fs-extra';
import Container from '../src/Container';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

const project = '__tests__/fixtures/project/loadedProjectShortened.json';

describe('Container component Tests', () => {
  test('Test Container', () => {
    let props = fs.readJSONSync(project);
    props.translate = k => k;
    const wrapper = shallow(<Container {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
