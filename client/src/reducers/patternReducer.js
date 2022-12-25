import {
  GET_PATTERN,
  LIKE_PATTERN,
  UNLIKE_PATTERN,
} from "../actions/patternActions";

const initialState = {};

export default function patternsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATTERN:
      return action.payload;

    case LIKE_PATTERN:
      return {
        ...state,
        likers: [action.payload.idMember, ...state.likers],
      };

      case UNLIKE_PATTERN:
        return {
          ...state,
          likers: state.likers.filter((id) => id !== action.payload.idMember),
        };

    default:
      return state;
  }
}
