import axios from "axios";

export const GET_PATTERNS = "GET_PATTERNS";
export const GET_ALL_PATTERNS = "GET_ALL_PATTERNS";
export const GET_PATTERN = "GET_PATTERN";
export const ADD_PATTERN = "ADD_PATTERN"
export const LIKE_PATTERN = "LIKE_PATTERN";
export const UNLIKE_PATTERN = "UNLIKE_PATTERN";
export const UPDATE_PATTERN = "UPDATE_PATTERN";
export const DELETE_PATTERN = "DELETE_PATTERN";
export const GET_TAGS = "GET_TAGS";

export const getPatterns = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/pattern`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_PATTERNS, payload: array });
        dispatch({ type: GET_ALL_PATTERNS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getPattern = (pid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/pattern/${pid}`)
      .then((res) => {
        dispatch({ type: GET_PATTERN, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPattern = (data) => {
  return (dispatch) => {
      return axios
      .post(`${process.env.REACT_APP_API_URL}api/pattern/addPattern`, data)
       
    };
}

export const likePattern = (idPattern, idMember) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/pattern/addLiker/${idPattern}`,
      data: { idMember },
    })
      .then((res) => {
        dispatch({ type: LIKE_PATTERN, payload: { idPattern, idMember } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePattern = (idPattern, idMember) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/pattern/deleteLiker/${idPattern}`,
      data: { idMember },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_PATTERN, payload: { idPattern, idMember } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePattern = (idPattern, data) => {
  return (dispatch) => {
    return axios
    .put(`${process.env.REACT_APP_API_URL}api/pattern/${idPattern}`, data)
     
  };
};

export const deletePattern = (idPattern) => {
  return (dispatch) => {
    return axios ({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/pattern/${idPattern}`,
    })
      
  };
}

export const getTags = (tags) => {
  return (dispatch) => {
    dispatch({type:GET_TAGS, payload: tags})
  };

}