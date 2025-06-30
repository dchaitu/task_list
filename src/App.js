import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/login";
import Tasks from "./components/Tasks/tasks";
import MainPage from "./components/MainPage/mainPage";
import Register from "./components/Register/register";
import AddTaskUser from "./components/AddTaskUser/addTaskUser";
import UserContextProvider from "./context/UserContextProvider";
import {useEffect, useState} from "react";

const App = () => {
    const [userDetails, setUserDetails] = useState([]);

    const verifyToken = async () => {
        const accessToken = localStorage.getItem('access_token');
        const username = localStorage.getItem('username');
        const response = await fetch("http://localhost:8000/token-verify/", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                token: accessToken,
            })
        })
        if (response.ok) {
            setUserDetails({...userDetails, access_token:accessToken,username:username})
        }
        else{
            setUserDetails({...userDetails, access_token:null,username:null});
        }


    }
    useEffect(() => {
        verifyToken();
    }, []);

    const updateUserDetails = async (value) => {
        setUserDetails(value);
    }

  return (
      <Router>
          <UserContextProvider value={{userDetails, updateUserDetails}}>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/" element={<MainPage/>} />
          <Route exact path="/add" element={<AddTaskUser />} />
        </Routes>
          </UserContextProvider>
      </Router>
  );
};

export default App;
