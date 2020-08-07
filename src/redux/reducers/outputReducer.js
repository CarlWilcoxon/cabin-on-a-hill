const output = (state = ['You wake up on the floor of your bedroom. Morning light pours in through the BLINDS.'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'STAND':
      return (state[0] === 'You are now standing.' || state[0] === 'You are still standing.') ? ['You are still standing.'] : ['You are now standing.'];
    case 'RISE':
      return (state[0] === 'You are now standing.' || state[0] === 'You are still standing.') ? ['You are still standing.'] : ['You are now standing.'];
    case 'KNEEL':
      return (state[0] === 'You are now kneeling.' || state[0] === 'You are still kneeling.') ? ['You are still kneeling.'] : ['You are now kneeling.'];
    case 'PRONE':
      return (state[0] === 'You are now prone.' || state[0] === 'You are still prone.') ? ['You are still prone.'] : ['You are now prone.'];
    case 'OUTPUT':
      return [action.payload]

    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;


