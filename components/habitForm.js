import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  InteractionManager,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import {WeekDays} from '../utils/const';

export const HabitForm = ({route, navigation}) => {
  const disptach = useDispatch();
  let inputName = useRef(null);
  let state = {};
  let formikRef = useRef();
  if (route?.params) {
    const habitId = route?.params?.habitId;
    state = useSelector((state) => state.habits.find((x) => x?.id === habitId));
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          onPress={() => {
            formikRef.current.resetForm();
          }}
          title="Reset form"
        />
      ),
    });
  }, [navigation]);

  const initialValues = {
    description: state.description || '',
    name: state.name || '',
    difficulty: state.difficulty || 0,
    tags: state?.tags?.join(',') || '',
  };
  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={(values, {resetForm}) => {
        InteractionManager.runAfterInteractions(() => {
          values.tags = values.tags.length !== 0 ? values.tags.split(',') : [];
          Object.keys(state).length === 0
            ? disptach({type: 'ADD_HABIT', payload: values})
            : disptach({
                type: 'EDIT_HABIT',
                payload: {id: route.params.habitId, ...values},
              });
          navigation.pop();
        });
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldValue,
        resetForm,
        values,
      }) => (
        <View style={{flex: 1 / 2}}>
          <View>
            <Text>Habit description:</Text>
            <TextInput
              autoFocus
              onEndEditing={() => inputName.current.focus()}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              value={values.description}
              onChangeText={(text) => setFieldValue('description', text)}
              placeholder="description..."
              clearButtonMode="always"
            />
          </View>
          <View>
            <Text>Habit name (uncontrolled):</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              ref={inputName}
              onChangeText={(text) => setFieldValue('name', text)}
              defaultValue={values.name}
              placeholder="name..."
              clearButtonMode="always"
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
          <View>
            <Text>Tags:</Text>
            <TextInput
              value={values.tags.toString()}
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => setFieldValue('tags', text)}
              placeholder="tags..."
            />
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
          <TouchableOpacity
            style={{
              flex: 0,
              alignSelf: 'center',
              width: 250,
              borderRadius: 10,
              backgroundColor: '#FFF',
            }}>
            <Button color="#673ab7" title={'Reset Form'} onPress={resetForm} />
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
