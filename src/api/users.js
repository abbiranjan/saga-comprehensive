import axios from 'axios';

//GETUSER API
export const getUsers = () => {
    return axios.get('/users', {
        params: {
            limit: 1000
        }
    })
}

//CREATE USER API
export const createUser = ({firstName, lastName}) => {
    return axios.post('/users', {
        firstName,
        lastName
    })
}

//DELETE USER API
export const deleteUser = (userId) => {
    return axios.delete(`/users/${userId}`) 
}