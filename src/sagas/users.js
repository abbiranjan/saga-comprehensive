import {takeEvery, call, fork, put, takeLatest, take} from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function *getUsers(){ 
    try{
        const result = yield call(api.getUsers);
        console.log(result);
        yield put(actions.getUsersSuccess(
            {
                items: result.data.data
            }
        ))
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occured while trying to get user'
        }))
    }
}

function *watchGetUsersRequest() {
    yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers)
}

//WORKER SAGA FOR CREATE USER
function *createUser(action){ // Extracting the data from action
    try{
        console.log(action);
        yield call(api.createUser, {firstName:action.payload.firstName, lastName: action.payload.lastName}); // Passing payload along API call
        yield call(getUsers); // After calling API, we are calling getUser generator againg to update our state
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occured while trying to create user'
        }))
    }
}

//WATCHER SAGA FOR CREATE USER
function *watchCreateUserRequest(){
    yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser)
}

//WORKER SAGA FOR DELETE
function *deleteUser({userId}){
    console.log('delete user worker saga')
    try{
        yield call(api.deleteUser, userId);
        yield call(getUsers);
    }catch(e){
        yield put(actions.usersError({
            error: 'An error occured while trying to delete user'
        }))
    }
};

//DELETE USER SAGA
function *watchDeleteUserRequest(){
        console.log('delete user saga')
        while(true){
            const action = yield take(actions.Types.DELETE_USER_REQUEST);
            console.log('delete actions', action);
            yield call(deleteUser, {
                userId: action.payload.userId
            });
        }
}


const usersSagas = [
    fork(watchGetUsersRequest),
    fork(watchCreateUserRequest),
    fork(watchDeleteUserRequest)
];

export default usersSagas;