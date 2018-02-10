import { combineReducers, applyMiddleware } from "redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import * as reducers from "./reducers";

const reducer = combineReducers(reducers);

let store = createStore(reducer, composeWithDevTools(applyMiddleware()));
export default store;
