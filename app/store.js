import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

//connect store to reducers
export default createStore(reducers, applyMiddleware(thunk));