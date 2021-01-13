import React, {useState} from 'react';
import {View, Text} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

export const HabitRow = ({
  id,
  description,
  difficulty,
  tags,
  isFinished,
  completeCallBack,
  removeCompleteCallBack,
}) => {
  const navigation = useNavigation();
  const [toggleCheckBox, setToggleCheckBox] = useState(isFinished);

  const iconSwitch = () => {
    switch (difficulty) {
      case 0:
        return (
          <Icon testID={'test-difficulty'} name="battery-empty" size={20} />
        );
      case 1:
        return <Icon name="battery-1" size={20} />;
      case 2:
        return <Icon name="battery-2" size={20} />;
      case 3:
        return <Icon name="battery-3" size={20} />;
      case 4:
        return <Icon name="battery-full" size={20} />;

      default:
        <></>;
    }
  };
  console.log('tags', tags);
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
      <View style={{flexGrow: 3}}>
        <Text testID={'test-id'}>{description}</Text>
      </View>
      {tags && (
        <View style={{flexGrow: 2, flexDirection: 'row', flexWrap: 'wrap'}}>
          {tags.map((x, index) => (
            <View
              key={index}
              style={{
                backgroundColor: '#673ab7',
                borderRadius: 10,
                borderWidth: 1,
                margin: 2,
                padding: 5,
              }}>
              <Text style={{color: '#FFFF'}}>{x}</Text>
            </View>
          ))}
        </View>
      )}
      <View style={{flexGrow: 1}}>{iconSwitch()}</View>
      <View
        style={{
          width: 70,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FormHabits', {habitId: id});
          }}>
          <Icon name="edit" size={30} />
        </TouchableOpacity>
        <CheckBox
          testID={'checkbox-id'}
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => {
            setToggleCheckBox(newValue);
            if (!toggleCheckBox) {
              completeCallBack(id);
            } else {
              removeCompleteCallBack(id);
            }
          }}
        />
      </View>
    </View>
  );
};
