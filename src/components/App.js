import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from "../actions/users";
import UserList from './UserList';
import NewUserForm from './NewUserForm';
import {Alert} from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getUsersRequest();
  }
  handleSubmit = ({firstName, lastName}) => {  
  //Using destructuring to extact firstName & lastName from object coming from NewUserFrom component.
    console.log(firstName, lastName);
    this.props.createUserRequest({
      firstName,
      lastName
    })
  };

  handleDeleteUserClick = (userId) => {
    console.log('delete user');
    this.props.deleteUserRequest(userId);
  }

  handleCloseAlert = () => {
    //here we are reusing usersError action and passing the empty string, so that we can dismiss the error.
    this.props.usersError({
      error:  ''
    })
  }

  render() {
    const { users } = this.props;
    console.log('user error in App', users);
    return (
      <div style={{margin:'0  auto', padding: '20px', maxWidth: '600px'}}>
        {/* {users.map(user =>( <li key={user.id}> {user.firstName} </li>)      
        )} */}

        {/** YOU HAVE TO RETURN JSX WITH RETURN NOT OBJECT */}
        
        {/* {users.map(user => {
          return <li>{user.firstName}</li>;
        })} */}
        <Alert color="danger" isOpen={this.props.userError} toggle={this.handleCloseAlert}>
         {this.props.userError}
        </Alert>
         <NewUserForm onSubmit={this.handleSubmit} />
        <UserList onDeleteUser={this.handleDeleteUserClick} users={users} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    users: state.users.items,
    userError: state.users.error
  };
};

export default connect(mapStateToProps, {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError
})(App);
