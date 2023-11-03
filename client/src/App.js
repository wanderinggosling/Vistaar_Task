import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import AllRoutes from './AllRoutes';
import Navbar from './Components/Navbar/Navbar';

function App() {
  return (
   <>
   <Router>
    <Navbar/>
      <AllRoutes/>
    </Router>
    </>
  );
}

export default App;
