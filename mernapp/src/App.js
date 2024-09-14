import './App.css';
import Home from './pages/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark-plugin.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './pages/Login';
import Signup from './pages/Signup.jsx';
import { CartProvider } from './components/ContextReducer.jsx';
import Orders from './pages/Orders.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
    <div>
      <Routes>
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/signup' element={<Signup/>} />
        <Route exact path='/myOrder' element={<Orders/>} />
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
