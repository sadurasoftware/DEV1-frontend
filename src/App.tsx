import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import { Login } from './components/Login';


const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<h1 className="flex justify-center">Dev Frontend</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
  );
};
export default App;
