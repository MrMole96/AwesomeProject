import nextId from 'react-id-generator';


export default todosReducer = (
  state = [
    {id: 0, description: 'zakupy', isCompleted: false},
    {id: 1, description: 'serwis', isCompleted: true},
  ],
  action,
) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'EDIT_TODO':
      return state.filter((x) => x.id === action.payload);
    case 'REMOVE_TODO':
      return state.filter((x) => x.id !== action.payload);
    default:
      return state;
  }
};
