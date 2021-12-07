import './App.css'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import Create from './pages/Create/Create';
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Recipe from './pages/Recipe/Recipe';
import {useTheme} from './hooks/useTheme'

function App() {
  const {mode} = useTheme()
  return (
    <div className={`App ${mode}`}>
        <Navbar/>
        <div className='Comp'>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/search" element={<Search/>} />
            <Route path="/recipe/:id" element={<Recipe/>} />
          </Routes>
        </div>
    </div>
  );
}

export default App
