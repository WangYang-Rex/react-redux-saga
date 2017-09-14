/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import Test1Component from 'components/test1/Test1Component.js';

describe('Test1Component', () => {
  let component;

  beforeEach(() => {
    component = createComponent(Test1Component);
  });

  it('should have its component name as default className', () => {
    expect(component.props.className).to.equal('test1-component');
  });
});
