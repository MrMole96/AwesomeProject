import {render} from '@testing-library/react-native';
import React from 'react';
import {Settings} from '../settings';

describe('check settings testes for IOS', () => {
  const mockPlatform = async (OS) => {
    jest.resetModules();
    await jest.doMock('react-native/Libraries/Utilities/Platform', () => ({
      OS,
      select: (config) => config[OS],
    }));
  };
  test('should render right text', () => {
    mockPlatform('ios');
    const component = <Settings />;

    const {findByText} = render(component);

    const element = findByText('You are using IOS');

    expect(element).toBeTruthy();
  });
});
