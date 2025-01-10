import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';


const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path="/" element={<h1 className="flex-justify-center">DEV1 frontend</h1>} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
