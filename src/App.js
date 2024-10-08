import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/login";
import Tasks from "./components/Tasks/tasks";
import Testing from "./constants/testing";


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/tasks" element={<Tasks />} />
            <Route path="/" element={<Testing />} />
        </Routes>
      </Router>
  );
};

export default App;
