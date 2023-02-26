import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ShowList from './components/ShowList';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowList/>} >
          
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
