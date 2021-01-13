import nextId from 'react-id-generator';

export default habitsReducer = (
  state = [
    {
      id: 1,
      description: 'brush teeth',
      difficulty: 0,
      series: 0,
    },
    {
      id: 2,
      description: 'brush teeth',
      difficulty: 1,
      series: 0,
    },
    {
      id: 3,
      description: 'brush teeth',
      difficulty: 2,
      series: 0,
    },
    {
      id: 4,
      description: 'brush teeth',
      difficulty: 3,
      series: 0,
    },
    {
      id: 5,
      description: 'brush teeth',
      difficulty: 4,
      series: 0,
    },
    {
      id: 6,
      description: 'take a sadasdasd',
      difficulty: 1,
      series: 0,
    },
    {
      id: 7,
      description: 'take a shower',
      difficulty: 2,
      series: 0,
    },
    {
      id: 8,
      description: 'take a shower',
      difficulty: 3,
      series: 0,
    },
    {
      id: 9,
      description: 'take a shower',
      difficulty: 4,
      tags: ['challenge', 'new'],
      series: 0,
    },
  ],
  action,
) => {
  let id = nextId();
  switch (action.type) {
    case 'CHECK_HABIT':
      return state.map((x) => {
        if (x.id === action.payload) {
          x.series += 1;
        }
        return x;
      });
    case 'ADD_HABIT':
      return [...state, {id: id, ...action.payload}];
    case 'EDIT_HABIT':
      return state.map((x) => {
        if (x.id === action.payload.id) {
          return {...x, ...action.payload};
        }
        return x;
      });
    case 'REMOVE_HABIT':
      return state.filter((x) => x.id !== action.payload);
    // case 'RESET_HABIT':
    //   return [
    //     {id: 0, day: 'Monday', description: 'brush teeth', difficulty: 0},
    //     {id: 1, day: 'Friday', description: 'take a xxx', difficulty: 1},
    //     {id: 2, day: 'Friday', description: 'take a shower', difficulty: 2},
    //   ];
    case 'REMOVE_CHECK_HABIT':
      return state.map((x) => {
        if (x.id === action.payload) {
          x.series -= 1;
        }
        return x;
      });
    default:
      return state;
  }
};
