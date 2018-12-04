import rootReduser from '../reducers'
import {createStore, applyMiddleware} from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
   // const logger = createLogger();
    const store = createStore(
        rootReduser,
        initialState,
        applyMiddleware(thunk, logger));
    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
