import { BrowserRouter, Routes, Route } from "react-router-dom";
import Start from "./pages/Start";
import Result from "./pages/Result";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<Start />}></Route>
          <Route path='/result' element={<Result />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
