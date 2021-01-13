import React from 'react';
import {View, Text, Platform} from 'react-native';

export const Settings = () => {
  return (
    <View>
      <Text>
        You are using {Platform.select({ios: 'IOS', android: 'ANDROID'})}
      </Text>
      <Text testID={'date-test'}>{new Date(Date.now()).toLocaleString().split(',')[0]}</Text>
    </View>
  );
};
