const output = (state = ['You wake up on the floor of your bedroom. Morning light pours in through the BLINDS.'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'CLEAR':
      return [];
    // if the user died, display only the starting text
    case 'DEAD':
      return ['You are swallowed up by darkness...', 'You wake up on the floor of your bedroom. Morning light pours in through the BLINDS.'];
    case 'OUTPUT':
      console.log('inside OUTPUT', action.payload);

      // if no commands matched the input, say "I don't know what you mean by that."
      if (action.payload === undefined) {
        return [...state, "I don't know what you mean by that." ];

      } else if ( typeof(action.payload) === 'object' ) {
        // If the action was successful, print the success text
        // If the action failed, print the failure text
        return [...state, (action.payload.successful) ? action.payload.success_text : action.payload.failure_text ];
      } else {
        // This handles LOOKing, a string will be passed and appended to the display
        return [...state, action.payload];
      }
    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;
