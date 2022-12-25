import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import patternsReducer from "./patternsReducer";

export default combineReducers({
    memberReducer, patternsReducer,
})