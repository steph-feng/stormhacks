import { BrowserRouter, Routes, Route } from "react-router-dom";
import ImageUpload from './sample';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<ImageUpload />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
