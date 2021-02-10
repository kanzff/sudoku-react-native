import axios from 'axios'

const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export function fetchBoard(difficulty) {
  // console.log('kepanggil')
  let url = ''
  switch (difficulty) {
    case 'easy':
      url = 'https://sugoku.herokuapp.com/board?difficulty=easy'
      break
    case 'medium':
      url = 'https://sugoku.herokuapp.com/board?difficulty=medium'
      break
    case 'hard':
      url = 'https://sugoku.herokuapp.com/board?difficulty=hard'
      break
    case 'random':
      url = 'https://sugoku.herokuapp.com/board?difficulty=random'
      break
    default:
      url = 'https://sugoku.herokuapp.com/board?difficulty=easy'
  }
  return async (dispatch) => {
    // console.log(url)
    try {
      axios({
        method: 'GET',
        url: url
      })
      .then(({data}) => {
        // console.log('ini oei',data.board)
        dispatch({
          type: 'FETCH_BOARD',
          payload: data
        })
        // dispatch({
        //   type: 'SET_LOADING',
        //   payload: false
        // })
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
  console.log('board yg akan di validate', board)

  return async (dispatch) => {
    try {
      axios({
        method: 'POST',
        url: 'https://sugoku.herokuapp.com/validate',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: encodeParams(board)
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

export function solveBoard(board) {
  return async (dispatch) => {
    try {
      axios({
        method: 'POST',
        url: 'https://sugoku.herokuapp.com/solve',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: encodeParams(board)
      })
      .then(({data}) => {
        // console.log(data)
        dispatch({
          type: 'SOLVE_BOARD',
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

export function emptyBoard() {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'VALIDATE_BOARD',
        payload: 'unsolved'
      })
    } catch(err) {
      console.log(err)
    }
  }
  
}
