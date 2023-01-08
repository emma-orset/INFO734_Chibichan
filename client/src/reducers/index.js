import { combineReducers } from "redux";
import memberReducer from "./memberReducer";
import membersReducer from "./membersReducer";
import patternReducer from "./patternReducer";
import commentReducer from "./commentReducer";
import filterReducer from "./filterReducer";

export default combineReducers({
    memberReducer, patternReducer, membersReducer, commentReducer, filterReducer
})