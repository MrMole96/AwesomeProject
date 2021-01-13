import {combineReducers, createStore} from 'redux';
import completedHabitsPerDay from './reducers/completedHabitsPerDay';
import habitsReducer from './reducers/habitsReducer';
import todosReducer from './reducers/todosReducer';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const resetReducer = (state = {}, action) => {
  switch (action.payload) {
    case 'RESET':
      return {};

    default:
      break;
  }
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    habits: habitsReducer,
    todos: todosReducer,
    completedHabitsPerDay: completedHabitsPerDay,
  }),
);

let store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
let persistor = persistStore(store);
export {store, persistor};
