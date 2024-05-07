import logo from './logo.svg';
import './App.css';
import LoginPage from './components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Using Routes instead of Switch
import GymClasses from './components/GymClasses';

function App() {
  return (
        <Routes> {/* Replace Switch with Routes */}
          {/* <Route path="/" element={<LoginPage />} />  */}
          <Route path="/" element={<GymClasses />} />

          {/* <Route path="/gym-classes" element={<GymClasses />} /> */}
        </Routes>
  );
}

export default App;
