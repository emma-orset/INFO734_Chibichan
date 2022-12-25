import axios from "axios"

export const GET_PATTERNS = "GET_PATTERNS"

export const getPatterns = () => {
    return (dispatch) => {
        return axios
        .get(`${process.env.REACT_APP_API_URL}api/pattern`)
        .then((res) => {
            dispatch({type:GET_PATTERNS, payload : res.data})
        }).catch((err) => console.log(err))
    }
}