import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import pokeReducer from './PokeDucks'
import userReducer, { readCurrentUserAction } from './UsersDucks'


const rootReducer = combineReducers({
    pokemons: pokeReducer,
    users: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

    readCurrentUserAction()(store.dispatch)
    return store
}