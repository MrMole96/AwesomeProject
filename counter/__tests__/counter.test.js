import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Counter from '../counter';

describe('counter', () => {
  it('renders initial value', () => {
    const {getAllByA11yLabel, getByTestId} = render(
      <Counter initialValue={20} />,
    );
    let value = getByTestId('1');

    expect(value.children[0]).toBe('20');
  });
  it('increments value after click on button', () => {
    const {getByTestId, getByText} = render(<Counter initialValue={0} />);

    const button = getByText('Press');

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    let value = getByTestId('1');

    expect(value.children[0]).toBe('3');
  });

  it('check if callback was fired wrongly', () => {
    const mock = jest.fn();

    const {getByTestId, getByText} = render(
      <Counter callback={mock} initialValue={0} />,
    );

    expect(mock).not.toHaveBeenCalled();
  });

  it('check if callback was fired correctly', () => {
    const mock = jest.fn();

    const {getByTestId, getByText} = render(
      <Counter callback={mock} initialValue={0} />,
    );

    const button = getByText('Press');

    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);
    fireEvent.press(button);

    expect(mock).toHaveBeenCalled();
  });

  it('it should match snapshot', () => {
    const {toJSON} = render(<Counter />);

    expect(toJSON()).toMatchSnapshot();
  });
});
