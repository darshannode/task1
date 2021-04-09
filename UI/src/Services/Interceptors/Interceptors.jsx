// Packages
import axios from 'axios';

// Cookies
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const API_URL = "http://localhost:6640/";

class Interceptors {
    constructor() {
        // Add a request interceptor
        axios.interceptors.request.use(function (config) {
            const accessToken = cookies.get('accessToken');
            if (accessToken) config['headers']['authorization'] = accessToken;

            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    }

    GET(url) {
        return axios.get(API_URL + url).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        })
    }

    POST(url, data) {
        return axios.post(API_URL + url, data).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        })
    }

    PUT(url, data) {
        return axios.put(API_URL + url, data).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        })
    }

    DELETE(url) {
        return axios.delete(API_URL + url).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        })
    }

    PUT_FILE(url, data) {
        return axios.put(API_URL + url, this.jsonToFormData(data)).then(response => {
            return response;
        }).catch(error => {
            return error.response;
        })
    }

    jsonToFormData(data) {
        const formData = new FormData();
        this.buildFormData(formData, data);
        return formData;
    }

    buildFormData(formData, data, parentKey = '') {
        const refThis = this;
        if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
            Object.keys(data).forEach(key => {
                refThis.buildFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
            });
        } else {
            const value = data == null ? '' : data;

            formData.append(parentKey, value);
        }
    }
}

export default Interceptors;