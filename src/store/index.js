import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import rootReducer from "../rootReducer";
import thunk from "redux-thunk";
import { routerReducer } from "react-router-redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    rootReducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(thunk))
);
