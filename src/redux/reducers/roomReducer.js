const room = (state = [], action) => {
  switch (action.type) {
    case 'SET_ROOM':
      return action.payload[0];
    default:
      return state;
  }
};

// room will be on the redux state at:
// state.room
export default room;
