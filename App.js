/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {Todos} from './screens/todos';
import {Habits} from './screens/habits';
import {Settings} from './screens/settings';
import {HabitForm} from './components/habitForm';

function MyTabBar({state, descriptors, navigation}) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      style={{
        height: 50,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        marginBottom: 10,
      }}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        const renderIcon = () => {
          switch (label) {
            case 'Habbits':
              return <Icon name="tennis-ball" size={30} />;

            case 'Todos':
              return <Icon name="bookmark-plus" size={30} />;

            case 'Settings':
              return <Icon name="tools" size={30} />;

            default:
              return null;
          }
        };
        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={index}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{flex: 1, alignItems: 'center'}}>
            {renderIcon()}
            <Text style={{color: isFocused ? '#673ab7' : '#222'}}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const StackHabits = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Habits"
        component={Habits}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormHabits"
        options={{title: 'Habit form'}}
        component={HabitForm}
      />
    </Stack.Navigator>
  );
};

const StackTodos = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Todos"
        component={Todos}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FormTodos"
        options={{
          title: 'Habit form',
        }}
        component={HabitForm}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const Tab = createBottomTabNavigator();
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen
            name="Habbits"
            component={StackHabits}
            options={{iconName: 'iconName'}}
          />
          <Tab.Screen name="Todos" component={StackTodos} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 0,
      },
    }),
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
