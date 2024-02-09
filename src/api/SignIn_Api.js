import axios from 'axios'


const BASE_REST_API_URL = 'http://localhost:9090/api/';


export const LoginUser = (login) => {
    return axios.post(BASE_REST_API_URL + 'login', login, { withCredentials : true });
}

export const getUserById = (uId) => {
    return axios.get(BASE_REST_API_URL + 'get-user/' + uId);
}




