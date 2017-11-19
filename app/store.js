import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';

export const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);
