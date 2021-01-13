import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {TodoRow} from '../components/todoRow';
export const Todos = () => {
  const state = useSelector((state) =>
    state.todos.filter((x) => x.isCompleted === true),
  );
  return (
    <View>
      <FlatList
        data={state}
        extraData={state}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <TodoRow
            id={item.id}
            description={item.description}
            difficulty={item.isCompleted}
          />
        )}
      />
    </View>
  );
};
