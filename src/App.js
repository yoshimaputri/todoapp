import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Navbar } from "./components";
import { Home, SignIn, SignUp } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
