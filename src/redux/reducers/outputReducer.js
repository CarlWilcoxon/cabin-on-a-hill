const output = (state = ['You wake up on the floor of your bedroom. Morning light pours in through the BLINDS.'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'STAND':
      return ['You are now standing'];
    case 'RISE':
      return ['You are now standing'];
    case 'KNEEL':
      return ['You are now kneeling'];
    case 'PRONE':
      return ['You are now prone'];
    case 'CLEAR':
      return [];
    case 'OUTPUT':
      console.log('inside OUTPUT', action.payload);
      if (action.payload.length === 0) {
        return [...state, "I don't know what you mean by that." ];
      }
      return [...state, action.payload];

    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;
