import './App.css';

import { useEffect, useState } from 'react';

import EditDetails from './Components/EditDetails';
import Profile from './Components/Profile';
import Register from './Components/Register';
import SystemAdmin from './Components/SystemAdmin';
import Login from './Components/Login';

function App() {
  const [users, setUsers] = useState([]); // State for managing users data
  const [edit, setEdit] = useState(false); // State for managing edit mode
  const [loggedUser, setLoggedUser] = useState(null); // State for managing logged-in user data

  // Function to load users data from local storage
  const loadUsers = () => {
    if (localStorage["users"] !== undefined) {
      return JSON.parse(localStorage["users"]);
    }
    return [];
  }

  // Function to register a new user
  const registerUser = (newUser) => {
    setUsers((prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage["users"] = JSON.stringify(updatedUsers);
      return updatedUsers;
    }));
  }

  // Function to log in a user
  const loginUser = (username, password) => {
    let user;
    if (username !== "admin") {
      user = users.find((user) => user.username === username && user.password === password);
    } else {
      user = { "username": username, "password": password }; // Setting admin user if username is 'admin'
    }
    setLoggedUser(user);
    sessionStorage["loggedUser"] = JSON.stringify(user); // Storing logged-in user data in session storage
  }

  // Function to log out a user
  const logoutUser = (email) => {
    if (loggedUser.email === email) {
      setLoggedUser(null); // Clearing logged-in user data
      setEdit(false); // Turning off edit mode
      sessionStorage.clear(); // Clearing session storage
    }
  }

  // Function to delete a user
  const deleteUser = (email) => {
    setUsers(() => {
      const updatedUsers = users.filter((user) => user.email !== email); // Filtering out the user to be deleted
      localStorage["users"] = JSON.stringify(updatedUsers); // Saving updated users list to local storage
      if (loggedUser.email === email) {
        logoutUser(email); // Logging out the user if deleted user is the logged-in user
      }
      return updatedUsers;
    });
  }

  // Function to edit a user
  const editUser = (updatedUser) => {
    setUsers(() => {
      const updatedUsers = users.map(user => {
        if (user.email === updatedUser.email) {
          return updatedUser; // Updating user data if user is found
        }
        return user;
      });
      localStorage["users"] = JSON.stringify(updatedUsers); // Saving updated users list to local storage
      if (loggedUser.username !== "admin") {
        sessionStorage["loggedUser"] = JSON.stringify(updatedUser); // Updating session storage if logged-in user is not admin
        setLoggedUser(updatedUser);
      }
      setEdit(false); // Turning off edit mode
      return updatedUsers;
    });
  }

  // Function to toggle edit mode
  const changeEdit = () => {
    setEdit((prev) => !prev); // Toggling edit mode
  }

  useEffect(() => {
    setUsers(loadUsers()); // Loading users data on component mount
    const user = sessionStorage["loggedUser"];
    user ? setLoggedUser(JSON.parse(user)) : setLoggedUser(null); // Setting logged-in user data from session storage
  }, []);

  return (
    <>
      <Register users={users} addNewUser={registerUser} /> {/* Render Register component */}
      <Login users={users} loginUser={loginUser} /> {/* Render Login component */}
      {loggedUser && loggedUser.username !== 'admin' ? <Profile loggedUser={loggedUser} logout={logoutUser} showEdit={changeEdit} /> : <p>{loggedUser ? '' : 'יש להתחבר למערכת'}</p>} {/* Render Profile component if logged-in user is not admin */}
      {loggedUser && loggedUser.username === "admin" && <SystemAdmin users={users} deleteUser={deleteUser} logout={logoutUser} editUser={editUser} />} {/* Render SystemAdmin component if logged-in user is admin */}
      {edit && <EditDetails user={loggedUser} users={users} editUser={editUser} />} {/* Render EditDetails component if edit mode is true */}
    </>
  )
}

export default App;
