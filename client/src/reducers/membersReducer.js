import {
    GET_MEMBERS
  } from "../actions/membersActions";
  
  const initialState = {};
  
  export default function membersReducer(state = initialState, action) {
    switch (action.type) {
      case GET_MEMBERS:
        return action.payload;
  
      default:
        return state;
    }
  }
  