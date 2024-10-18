import './App.css';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Admin from './components/Admin';
import User from './components/User';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-dashboard" element={<Admin />} />
        <Route path="/user-dashboard/:id" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
