import {

    GET_TAGS,

  } from "../actions/patternActions";
  
  const initialState = {};
  
  export default function filterReducer(state = initialState, action) {
    switch (action.type) {
  
        case GET_TAGS:
          return action.payload;
  
      default:
        return state;
    }
  }
  