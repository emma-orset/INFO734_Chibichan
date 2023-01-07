import {
  DELETE_PATTERN,
  GET_PATTERN,
  GET_PATTERNS,
  LIKE_PATTERN,
  UNLIKE_PATTERN,
  UPDATE_PATTERN,
} from "../actions/patternActions";

const initialState = {};

export default function patternReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PATTERNS:
      return action.payload;

    case GET_PATTERN:
      return action.payload;

    case LIKE_PATTERN:
      return state.map((pattern) => {
        if (pattern._id === action.payload.idPattern) {
          return {
            ...pattern,
            likers: [action.payload.idMember, ...pattern.likers],
          };
        }
        return pattern;
      });

    case UNLIKE_PATTERN:
      return state.map((pattern) => {
        if (pattern._id === action.payload.idPattern) {
          return {
            ...pattern,
            likers: pattern.likers.filter(
              (idMember) => idMember !== action.payload.idMember
            ),
          };
        }
        return pattern;
      });

      

    default:
      return state;
  }
}
