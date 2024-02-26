import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getGroups = ()=> {
    return axios.get(BASE_REST_API_URL+'get-groups')
}


export const addGroups = (group) => {
    return axios.post(BASE_REST_API_URL+'add-groups', group);
}

export const deleteGroups = (sId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-groups' + sId);
}

export const updateGroups=(sId,group)=>{
    return axios.put(BASE_REST_API_URL + 'update-groups', group)
}

export const getGroupById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-group-by/'+sId)
}


