import React, {useEffect, useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {FlatList, Switch} from 'react-native-gesture-handler';
import {useDispatch, useSelector, useStore} from 'react-redux';
import {WeekDays} from '../utils/const';
import Icon from 'react-native-vector-icons/FontAwesome';
import {HabitRow} from '../components/habitRow';

export const Habits = ({navigation}) => {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const completedToday = useSelector((state) => state.completedHabitsPerDay);
  const state = useSelector((state) =>
    !isEnabled
      ? state?.habits?.filter((x) => completedToday?.indexOf(x.id) !== -1)
      : state?.habits?.filter((x) => completedToday?.indexOf(x.id) === -1),
  );

  const completeCallBack = (id) => {
    dispatch({type: 'ADD_COMPLETE', payload: id});
    dispatch({type: 'CHECK_HABIT', payload: id});
  };

  const removeCompleteCallBack = (id) => {
    dispatch({type: 'REMOVE_COMPLETE', payload: id});
    dispatch({type: 'REMOVE_CHECK_HABIT', payload: id});
  };

  console.log('habits', state);
  return (
    <View style={{flex: 1}}>
      <Text>Show {!isEnabled ? 'finished' : 'not finished'}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />

      <FlatList
        data={state}
        extraData={state}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <HabitRow
            isFinished={!isEnabled}
            id={item.id}
            description={item.description}
            difficulty={item.difficulty}
            tags={item.tags}
            completeCallBack={completeCallBack}
            removeCompleteCallBack={removeCompleteCallBack}
          />
        )}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#673ab7',
          borderRadius: 100,
        }}
        testID={'add-button'}
        onPress={() => navigation.push('FormHabits')}>
        <Icon name="plus" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};
