import React from 'react';
import {Provider} from 'react-redux';
import {HabitRow} from '../../components/habitRow';
import {render, fireEvent, act} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import configure from 'redux-mock-store';
import App from '../../App';
import {HabitForm} from '../../components/habitForm';
import {Habits} from '../habits';
import MockDate from 'mockdate';
import {createStackNavigator} from '@react-navigation/stack';

describe('Check if habits is being completed', () => {
  const mockStore = configure([]);
  beforeEach(() => {
    MockDate.set('2021-01-11');
  });
  afterEach(() => {
    MockDate.reset();
  });

  jest.mock('react-native/Libraries/Components/Switch/Switch', () => {
    const mockComponent = require('react-native/jest/mockComponent');
    return mockComponent('react-native/Libraries/Components/Switch/Switch');
  });



  test('check if display habit', () => {
    const store = mockStore({
      habits: [{id: 1, description: 'brush teeth'}],
      completedHabitsPerDay: [1],
    });

    const component = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    const {getByTestId} = render(component);

    console.log('teraz');
    let value = getByTestId('test-id');

    expect(value.children[0]).toBe('brush teeth');
  });
  test('check if proper redux action', () => {
    const store = mockStore({
      habits: [{id: 1, description: 'brush teeth'}],
      completedHabitsPerDay: [1],
    });

    const Stack = createStackNavigator();

    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Habits"
              component={Habits}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
    const {getByPlaceholderText, getByText, getByTestId} = render(component);

    const checkbox = getByTestId('checkbox-id');

    expect(checkbox.props.value).toBeTruthy();

    // const textToEnter = 'This is a random element';
    // fireEvent.changeText(input, textToEnter);

    fireEvent(checkbox, 'onValueChange', {nativeEvent: {value: true}});

    const actions = store.getActions();
    console.log('actions test', actions);
    const expectedPayload = [
      {type: 'REMOVE_COMPLETE', payload: 1},
      {type: 'REMOVE_CHECK_HABIT', payload: 1},
    ];
    expect(actions).toEqual(expectedPayload);
  });

  test('check if it is displaying right when there is a different difficulty', () => {
    const store = mockStore({
      habits: [{id: 1, description: 'brush teeth', difficulty: 0}],
      completedHabitsPerDay: [1],
    });

    const Stack = createStackNavigator();

    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Habits"
              component={Habits}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
    const {getByPlaceholderText, getByText, getByTestId} = render(component);

    const element = getByTestId('test-difficulty');

    expect(element).toBeTruthy();

    store.dispatch({type: 'EDIT_HABIT', payload: {id: 1, difficulty: 1}});

    const actions = store.getActions();

    const element2 = getByTestId('test-difficulty');

    expect(true).toBeTruthy();
  });

  test('check if navigate to habitForm', async () => {
    const store = mockStore({
      habits: [{id: 1, description: 'brush teeth', difficulty: 0}],
      completedHabitsPerDay: [1],
    });
    const Stack = createStackNavigator();

    const component = (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Habits"
              component={Habits}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="FormHabits"
              options={{
                title: 'Habit form',
              }}
              component={HabitForm}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );

    const {getByPlaceholderText, getByText, getByTestId, findByText} = render(
      component,
    );

    const button = getByTestId('add-button');

    fireEvent(button, 'press');

    const newHeader = await findByText('Habit form');

    expect(newHeader).toBeTruthy();
  });
});
