import {
  EDIT_COMMENT,
  GET_COMMENTS,
  LIKE_COMMENT,
  UNLIKE_COMMENT,
} from "../actions/commentActions";

const initialState = {};

export default function commentReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;

    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment._id === action.payload.idComment) {
          return {
            ...comment,
            text: action.payload.text,
          };
        }
        return comment;
      });


    case LIKE_COMMENT:
      return state.map((comment) => {
        if (comment._id === action.payload.idComment) {
          return {
            ...comment,
            likers: [action.payload.idMember, ...comment.likers],
          };
        }
        return comment;
      });

    case UNLIKE_COMMENT:
      return state.map((comment) => {
        if (comment._id === action.payload.idComment) {
          return {
            ...comment,
            likers: comment.likers.filter(
              (idMember) => idMember !== action.payload.idMember
            ),
          };
        }
        return comment;
      });

      

    default:
      return state;
  }
}
