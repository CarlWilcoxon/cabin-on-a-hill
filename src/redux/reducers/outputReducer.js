const output = (state = ['taco', 'burrito'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'STAND':
      return ['You are now standing'];
    case 'RISE':
      return ['You are now standing'];
    case 'GET':
      // Use action.payload for all words entered, that way I can check the
      // second, third, etc words to find required combinations
      switch (action.payload[1]) {
        case 'UP':
          return ['You are now standing']
        case 'DOWN':
          return ['You are now prone']
      }

    case 'KNEEL':
      return ['You are now kneeling']

    case 'PRONE':
      return ['You are now prone']

    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;


