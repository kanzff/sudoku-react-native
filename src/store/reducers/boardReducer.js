const initialState = {
  board: {
    board: []
  }
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOARD':
      return {
        ...state,
        board: action.payload
      }
    default :
      return state
  }
}

export default boardReducer