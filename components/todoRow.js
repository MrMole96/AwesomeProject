import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';

export const TodoRow = ({id, description, flag}) => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(flag);
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: !toggleCheckBox ? '#FFF' : '#d1d1d1',
        borderWidth: 1,
        borderRadius: 5,
        padding: 15,
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{flexGrow: 4}}>
        <Text>{description}</Text>
      </View>
      <View
        style={{
          width: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormTodos', {habitId: id});
          }}>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <CheckBox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
        />
      </View>
    </View>
  );
};
