const output = (state = ['You wake up on the floor of your bedroom. Morning light pours in through the BLINDS.'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'CLEAR':
      return [];
    case 'OUTPUT':
      console.log('inside OUTPUT', action.payload);
      if (action.payload.length === 0) {
        return [...state, "I don't know what you mean by that." ];
      } else if ( typeof(action.payload[0]) === 'object' ) {
        // If the action was successful, print the success text
        // If the action failed, print the failure text
        return [...state, (action.payload[0].successful) ? action.payload[0].success_text : action.payload[0].failure_text ];
      } else {
      return [...state, action.payload];
      }
    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;
