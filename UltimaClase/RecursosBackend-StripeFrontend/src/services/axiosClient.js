import axios from 'axios';

export default class AxiosClient {
    
    makeGetRequest = ({url,config,callbackSuccess,callbackError}) =>{
        axios.get(url,config)
        .then(callbackSuccess)
        .catch(callbackError)
    }
    
    makePostRequest = ({url,body,config,callbackSuccess,callbackError}) =>{
        axios.post(url,body,config)
        .then(callbackSuccess)
        .catch(callbackError)
    }

    makePutRequest = ({url,body,config,callbackSuccess,callbackError}) =>{
        axios.put(url,body,config)
        .then(callbackSuccess)
        .catch(callbackError)
    }

    makeDeleteRequest = ({url,config,callbackSuccess,callbackError}) =>{
        axios.delete(url,config)
        .then(callbackSuccess)
        .catch(callbackError)
    }
}