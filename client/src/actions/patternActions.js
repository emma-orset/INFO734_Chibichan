import axios from "axios";

export const GET_PATTERN = "GET_PATTERN";
export const LIKE_PATTERN = "LIKE_PATTERN"
export const UNLIKE_PATTERN = "UNLIKE_PATTERN"


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


export const likePattern = (idMember, idPattern) => {
  return (dispatch) => {
    return axios({
      method : "patch",
      url: `${process.env.REACT_APP_API_URL}api/pattern/addLiker/${idPattern}`,
      data: {idMember}
    })
      .then((res) => {
          dispatch({ type: LIKE_PATTERN, payload: {idMember} });
      }).catch((err) => console.log(err))
  };
};

export const unlikePattern = (idMember, idPattern) => {
    return (dispatch) => {
      return axios({
        method : "patch",
        url: `${process.env.REACT_APP_API_URL}api/pattern/deleteLiker/${idPattern}`,
        data: {idMember}
      })
        .then((res) => {
            dispatch({ type: UNLIKE_PATTERN, payload: {idMember, idPattern} });
        }).catch((err) => console.log(err))
    };
  };
