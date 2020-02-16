import axios from 'axios'

export default {
    get(url, request) {
        return axios.get(url, request)
            .then((response) => {
                if (response.status === 200)
                    return response.data
            })
            .catch((error) => Promise.reject(error));
    },
    post(url, request) {
        return axios.post(url, request)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    },
    request(options) {
        return axios(options)
            .then((response) => Promise.resolve(response))
            .catch((error) => Promise.reject(error));
    }
}