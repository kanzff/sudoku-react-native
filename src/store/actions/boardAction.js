import axios from 'axios'

export function fetchBoard() {
  return async (dispatch) => {
    try {
      axios({
        method: 'GET',
        url: 'https://sugoku.herokuapp.com/board'
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