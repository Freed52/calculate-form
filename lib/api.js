import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000/'
})

export const requests = {
    sendUserData(arr) {
        return instance.post('api/init', arr)
    }
}