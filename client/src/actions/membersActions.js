import axios from "axios"

export const GET_MEMBERS = "GET_MEMBERS"

export const getMembers = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/member`)
        .then((res) => {
            dispatch({type:GET_MEMBERS, payload : res.data})
        }).catch((err) => console.log(err))
    }
}