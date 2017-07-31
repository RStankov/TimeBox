import { browserHistory } from 'react-router';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';

export default function createReduxStore(
  { reducers, middlewares, initialState, apollo } = {},
) {
  reducers = reducers ? { ...reducers } : {};
  middlewares = middlewares ? [...middlewares] : [];

  reducers.routing = routerReducer;
  middlewares.push(routerMiddleware(browserHistory));

  if (apollo) {
    reducers.apollo = apollo.reducer();
    middlewares.push(apollo.middleware());
  }

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    combineReducers(reducers),
    initialState || {},
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}
