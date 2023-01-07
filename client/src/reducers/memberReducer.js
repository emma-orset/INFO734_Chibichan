import {
  GET_MEMBER,
  UPDATE_BIO,
  UPDATE_PICTURE,
  UPDATE_PSEUDO,
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  DELETE_PICTURE,
} from "../actions/memberActions";
import { LIKE_PATTERN, UNLIKE_PATTERN } from "../actions/patternActions";

const initialState = {};

export default function memberReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MEMBER:
      return action.payload;

    case UPDATE_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    case UPDATE_BIO:
      return {
        ...state,
        bio: action.payload,
      };

    case UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };

    case UPDATE_PSEUDO:
      return {
        ...state,
        pseudo: action.payload,
      };

    case UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };

    case DELETE_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    case LIKE_PATTERN:
      return {
        ...state,
        patternLikes: [...state.patternLikes, action.payload.idPattern],
      };

    case UNLIKE_PATTERN:
      return {
        ...state,
        patternLikes: state.patternLikes.filter(
          (idPattern) => idPattern !== action.payload.idPattern
        ),
      };

    default:
      return state;
  }
}
