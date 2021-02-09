import axios from 'axios'

export function fetchBoard() {
  return async (dispatch) => {
    try {
      axios({
        method: 'GET',
        url: 'https://sugoku.herokuapp.com/board?difficulty=easy'
      })
      .then(({data}) => {
        // console.log(data)
        dispatch({
          type: 'FETCH_BOARD',
          payload: data
        })
      })
      .catch(err => {
        console.log(err)
      })

    } catch (err) {
      console.log(err)
    }
  }
}

export function validateBoard(board) {
  return async (dispatch) => {
    try {
      axios({
        method: 'POST',
        url: 'https://sugoku.herokuapp.com/validate',
        data: board
      })
      .then(({data}) => {
        console.log(data)
        dispatch({
          type: 'VALIDATE_BOARD',
          payload: data
        })
      })
      .catch(err => {
        console.log(err)
      })

    } catch (err) {
      console.log(err)
    }
  }
}