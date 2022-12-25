import {
    GET_PATTERNS
  } from "../actions/patternsActions";
  
  const initialState = {};
  
  export default function patternsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PATTERNS:
        return action.payload;
  
      default:
        return state;
    }
  }
  