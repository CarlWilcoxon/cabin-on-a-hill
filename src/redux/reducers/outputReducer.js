const output = (state = ['taco', 'burrito'], action) => {
  // Use a switch statement to account for synonyms
  switch (action.type) {
    case 'STAND':
      return ['You are now standing'];
    case 'RISE':
      return ['You are now standing'];
    case 'GET' && action.payload[1] === 'UP':
      return ['You are now standing']
    case 'GET' && action.payload[1] === 'DOWN':
      return ['You are now prone']
    case 'KNEEL':
      return ['You are now kneeling']

    case 'PRONE':
      return ['You are now prone']

    case 'OUTPUT':
      return [action.payload]

    default:
      return state;
  }
};

  // standingMode will be on the redux state at:
  // reduxState.standingMode
  export default output;


