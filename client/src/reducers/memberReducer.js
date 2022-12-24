import { GET_MEMBER } from "../actions/memberActions";

const initialState = {};

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER:
      return action.payload;

    default:
      return state;
  }
}
