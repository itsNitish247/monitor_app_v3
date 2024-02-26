import axios from 'axios'

const BASE_REST_API_URL = 'http://localhost:9090/api/';

export const getPorts = ()=> {
    return axios.get(BASE_REST_API_URL+'get-all-ports')
}


export const addPorts = (server) => {
    return axios.post(BASE_REST_API_URL+'add-ports', server);
}

export const deletePorts = (sId) => {
    return axios.delete(BASE_REST_API_URL + 'delete-ports-by/' + sId);
}

// export const updatePorts=(sId, server)=>{
//     return axios.put(BASE_REST_API_URL + 'update-server', server)
// }

export const getPortsById=(sId)=>{
    return axios.get(BASE_REST_API_URL + 'get-ports-by/'+sId)
}




