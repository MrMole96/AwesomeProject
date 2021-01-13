import React from 'react';
import MockDate from 'mockdate';
import {render, fireEvent, act} from '@testing-library/react-native';
import {Settings} from '../settings';

describe('settings', () => {
  beforeEach(() => {
    MockDate.set('2021-01-14');
  });
  afterEach(() => {
    MockDate.reset();
  });

  test('should mock date', () => {
    var component = <Settings />;

    const {getByTestId} = render(component);

    const element = getByTestId('date-test');

    expect(element.children[0]).toBe(
      new Date(Date.now()).toLocaleString().split(',')[0],
    );
  });
});
