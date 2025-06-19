import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/login";
import Tasks from "./components/Tasks/tasks";
import MainPage from "./components/MainPage/mainPage";
import Register from "./components/Register/register";
import AddTaskUser from "./components/AddTaskUser/addTaskUser";
import UserContextProvider from "./context/UserContextProvider";

const App = () => {
  return (
      <Router>
          <UserContextProvider>
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
