const initialState = {
  board: {
    board: []
  },
  // loading: true,
  validationResult: {
    status: ''
  },
  solvedBoard: {
    solution: []
  }
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOARD':
      return {
        ...state,
        board: action.payload
      }
    case 'VALIDATE_BOARD':
      return {
        ...state,
        validationResult: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      }
    case 'SOLVE_BOARD':
      return {
        ...state,
        solvedBoard: action.payload
      }
    default :
      return state
  }
}

export default boardReducer