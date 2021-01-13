export default completedHabitsPerDay = (state = [], action) => {
  switch (action.type) {
    case 'ADD_COMPLETE':
      return [...state, action.payload];

    case 'REMOVE_COMPLETE':
      return state.filter((x) => x !== action.payload);

    default:
      return state;
  }
};
