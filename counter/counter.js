import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';

const counter = ({initialValue, callback}) => {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    if (counter % 5 === 4) {
      callback(counter);
    }
  }, [counter]);

  return (
    <View>
      <Text testID={'1'}>{counter}</Text>
      <Button onPress={() => setCounter((x) => x + 1)} title="Press"></Button>
    </View>
  );
};

export default counter;
