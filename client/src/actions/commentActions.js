import axios from "axios"

export const GET_COMMENTS = "GET_COMMENTS"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const LIKE_COMMENT = "LIKE_COMMENT"
export const UNLIKE_COMMENT = "UNLIKE_COMMENT"
export const DELETE_COMMENT = "DELETE_COMMENT"

export const getComments = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/comment`)
        .then((res) => {
            dispatch({type:GET_COMMENTS, payload : res.data})
        }).catch((err) => console.log(err))
    }
}

export const addComment = (idPattern, writer, text) => {
  return (dispatch) => {
      return axios({
          method: "post",
          url: `${process.env.REACT_APP_API_URL}api/comment/addComment`,
          data: { idPattern, writer, text },
      }).then((res) => {
          dispatch({ type: ADD_COMMENT, payload: {idPattern} });
      }).catch((err) => console.log(err))
      
       
    };
}

export const editComment = (idComment, text) => {
  return (dispatch) => {
      return axios({
          method: "put",
          url: `${process.env.REACT_APP_API_URL}api/comment/${idComment}`,
          data: { text },
      })
      .then((res) => {
          dispatch({ type: EDIT_COMMENT, payload: {idComment, text} });
      }).catch((err) => console.log(err))
      
       
    };
}

export const likeComment = (idComment, idMember) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/comment/addLiker/${idComment}`,
        data: { idMember },
      })
        .then((res) => {
          dispatch({ type: LIKE_COMMENT, payload: { idComment, idMember } });
        })
        .catch((err) => console.log(err));
    };
  };
  
  export const unlikeComment = (idComment, idMember) => {
    return (dispatch) => {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/comment/deleteLiker/${idComment}`,
        data: { idMember },
      })
        .then((res) => {
          dispatch({ type: UNLIKE_COMMENT, payload: { idComment, idMember } });
        })
        .catch((err) => console.log(err));
    };
  };

  export const deleteComment = (idComment, idPattern) => {
    return (dispatch) => {
      return axios ({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/comment/${idComment}`,
      }).then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { idPattern, idComment } });
      })
      .catch((err) => console.log(err));
        
    };
  } 
