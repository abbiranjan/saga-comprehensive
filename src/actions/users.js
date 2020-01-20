export const Types = {
    GET_USERS_REQUEST: 'users/get_users_request',
    GET_USERS_SUCCESS: 'users/get_users_success',
    CREATE_USER_REQUEST: 'users/create_user_request',
    DELETE_USER_REQUEST: 'users/delete_user_request',
    USERS_ERROR: 'users/users_error'
};

//GET USERS
export const getUsersRequest = () => ({ //explicit return
    type: Types.GET_USERS_REQUEST
});

//ON SUCCESS OF GET USER
export const getUsersSuccess = ({items}) => ({ 
    //Destructring the items from object coming from ./sagas/users.js's getUsers generator
    type: Types.GET_USERS_SUCCESS,
    payload: {
        items
    }
});

//CREATE USER 
export const createUserRequest = ({firstName, lastName}) =>{
    return{
        type: Types.CREATE_USER_REQUEST,
        payload: {
            firstName,
            lastName
        }
    }
}

//DELETE USER
export const deleteUserRequest = (userId) => {
    console.log('delete user action', userId);
    return{
        type: Types.DELETE_USER_REQUEST,
        payload: {
            userId
        }
    }
};

export const usersError = ({error}) => {
    console.log('user error object', error);
    return {
        type: Types.USERS_ERROR,
        payload: {error}
    }
}