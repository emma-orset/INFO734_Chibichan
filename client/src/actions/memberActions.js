import axios from "axios";

export const GET_MEMBER = "GET_MEMBER";
export const UPDATE_PICTURE = "UPDATE_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_EMAIL = "UPDATE_EMAIL";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const UPDATE_PASSWORD = "UPDATE_PASSWORD";
export const DELETE_PICTURE = "DELETE_PICTURE";
export const DELETE_MEMBER = "DELETE_MEMBER";


export const getMember = (mid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/member/${mid}`)
      .then((res) => {
        dispatch({ type: GET_MEMBER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(
        `${process.env.REACT_APP_API_URL}api/member/updatePicture/${id}`,
        data
      )
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/member/${id}`)
          .then((res) => {
            dispatch({ type: UPDATE_PICTURE, payload: res.data.picture });
          });
      });
  };
};

export const updateBio = (bio, id) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/member/${id}`,
      data: { bio },
    })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })

      .catch((err) => console.log(err));
  };
};

export const updateEmail = (email, id) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/member/${id}`,
      data: { email },
    })
      .then((res) => {
        dispatch({ type: UPDATE_EMAIL, payload: email });
      })

      .catch((err) => console.log(err));
  };
};

export const updatePseudo = (pseudo, id) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/member/${id}`,
      data: { pseudo },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PSEUDO, payload: pseudo });
      })

      .catch((err) => console.log(err));
  };
};

export const updatePassword = (password, id) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/member/${id}`,
      data: { password },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PASSWORD, payload: password });
      })

      .catch((err) => console.log(err));
  };
};

export const deletePicture = (data, id) => {
  return (dispatch) => {
    return axios
      .put(
        `${process.env.REACT_APP_API_URL}api/member/updatePicture/${id}`,
        data
      )
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/member/${id}`)
          .then((res) => {
            dispatch({ type: DELETE_PICTURE, payload: res.data.picture });
          });
      });
  };
};

export const deleteMember = (id) => {
  return (dispatch) => {
    return axios ({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/member/${id}`,
    })
      
  };
} 



