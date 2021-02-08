const initialState = {
  board: {
    board: []
  },
  validationResult: {}
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
    default :
      return state
  }
}

export default boardReducer