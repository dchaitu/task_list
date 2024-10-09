import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/login";
import Tasks from "./components/Tasks/tasks";
import MainPage from "./components/MainPage/mainPage";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/" element={<MainPage/>} />
        </Routes>
      </Router>
  );
};

export default App;
