import './App.css'
import { useEffect, useState } from 'react'
import EditDetails from './Components/EditDetails'
import Profile from './Components/Profile'
import Register from './Components/Register'
import SystemAdmin from './Components/SystemAdmin'
import Login from './Components/Login'

function App() {
  const [users, setUsers] = useState([])
  const [edit, setEdit] = useState(false)
  const [loggedUser, setLoggedUser] = useState(null)

  const loadUsers = () => {
    if (localStorage["users"] !== undefined) {
      return JSON.parse(localStorage["users"]);
    }
    return [];
  }

  const registerUser = (newUser) => {
    setUsers((prevUsers => {
      const updatedUsers = [...prevUsers, newUser];
      localStorage["users"] = JSON.stringify(updatedUsers);
      return updatedUsers;
    }));
  }

  const loginUser = (username, password) => {
    let user;
    if (username !== "admin") {
      user = users.find((user) => user.username == username && user.password == password);
    }
    else{
      user={"username":username, "password":password}
    }
    setLoggedUser(user);
    sessionStorage["loggedUser"] = JSON.stringify(user);
  }

  const logoutUser = (email) => {
    if (loggedUser.email == email) {
      setLoggedUser(null);
      setEdit(false);
      sessionStorage.clear();
    }
  }
  const deleteUser = (email) => {
    setUsers(() => {
      const updatedUsers = users.filter((user) => user.email !== email);
      localStorage["users"] = JSON.stringify(updatedUsers);
      if (loggedUser.email == email) {
        logoutUser(email);
      }
      return updatedUsers;
    });
  }

  const editUser = (updatedUser) => {
    setUsers(() => {
      const updatedUsers = users.map(user => {
        if (user.email === updatedUser.email) {
          return updatedUser;
        }
        return user;
      });
      localStorage["users"] = JSON.stringify(updatedUsers);
      if(loggedUser.username!=="admin"){
        sessionStorage["loggedUser"] = JSON.stringify(updatedUser);
        setLoggedUser(updatedUser);
      }
      setEdit(false);
      return updatedUsers;
    });
  }

  const changeEdit = () => {
    setEdit((prev) => !prev);
  }

  useEffect(() => {
    setUsers(loadUsers());
    const user = sessionStorage["loggedUser"];
    user ? setLoggedUser(JSON.parse(user)) : setLoggedUser(null)
  }, []);

  return (
    <>
      <Register users={users} addNewUser={registerUser} />
      <Login users={users} loginUser={loginUser} />
      {loggedUser && loggedUser.username !== 'admin' ? <Profile loggedUser={loggedUser} logout={logoutUser} showEdit={changeEdit} /> : <p>{loggedUser ? '' : 'יש להתחבר למערכת'}</p>}
      {loggedUser && loggedUser.username == "admin" && <SystemAdmin users={users} deleteUser={deleteUser} logout={logoutUser} editUser={editUser}/>}
      {edit && <EditDetails user={loggedUser} users={users} editUser={editUser} />}
    </>
  )
}

export default App
