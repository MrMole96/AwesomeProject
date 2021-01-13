import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {WeekDays} from '../utils/const';

export const TodoForm = ({route, navigation}) => {
  const disptach = useDispatch();
  let state = {};
  if (route.params) {
    const todoId = route?.params?.todoId;
    state = useSelector((state) => state.todos.find((x) => x?.id === todoId));
  }
  const initialValues = {
    description: state.description || '',
    isCompleted: state.isCompleted || false,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, {resetForm}) => {
        Object.keys(state).length === 0
          ? disptach({type: 'ADD_TODO', payload: values})
          : disptach({
              type: 'EDIT_TODO',
              payload: {id: route.params.habitId, ...values},
            });
        navigation.pop();
      }}>
      {({handleChange, handleBlur, handleSubmit, setFieldValue, values}) => (
        <View style={{flex: 1 / 2}}>
          <View>
            <Text>Todo description:</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              value={values.description}
              onChangeText={(text) => setFieldValue('description', text)}
              placeholder="description..."
            />
          </View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Text>Habit difficulty:</Text>
              <Text>{values.difficulty}</Text>
            </View>
            <Slider
              value={values.difficulty}
              onValueChange={(value) => setFieldValue('difficulty', value)}
              style={{width: 200, height: 40}}
              step={1}
              minimumValue={0}
              maximumValue={4}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
            />
          </View>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text>Habit day:</Text>
            <Picker
              selectedValue={values.day}
              style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) =>
                setFieldValue('day', itemValue)
              }>
              {WeekDays.map((day, index) => (
                <Picker.Item key={index} label={day} value={day} />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              flex: 0,
              alignSelf: 'center',
              width: 250,
              borderRadius: 10,
              backgroundColor: '#673ab7',
            }}>
            <Button
              color="#FFF"
              title={!route?.params?.habitId ? 'Dodaj' : 'Zapisz'}
              onPress={handleSubmit}
            />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
