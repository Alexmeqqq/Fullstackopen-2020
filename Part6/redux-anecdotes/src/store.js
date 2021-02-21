import {createStore,combineReducers} from 'redux'
import ancedoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({
    anecdotes:ancedoteReducer,
    notification:notificationReducer,
    filter:filterReducer
})
const store = createStore(reducer,composeWithDevTools())
export default store