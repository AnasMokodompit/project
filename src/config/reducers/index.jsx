import { combineReducers } from 'redux'
import {dataOrder} from './OrderReducers'

const rootReducer = combineReducers({
    project: dataOrder,
})

export default rootReducer