import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import boardReducer from './reducers/boardReducer'

const rootReducer = combineReducers({
  board: boardReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store