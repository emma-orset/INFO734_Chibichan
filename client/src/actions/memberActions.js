import axios from "axios";

export const GET_MEMBER = "GET_MEMBER";

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
