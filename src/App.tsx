import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar'
import MusicPlayer from './components/MusicPlayer'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import FavSongs from './pages/FavSongs'
import SearchPage from './pages/SearchPage'

function App() {

  return (
    <>
      <BrowserRouter>

        <SideBar />
        <Navbar />
        <MusicPlayer />
        
        <main className='ml-16 mt-16 h-[calc(100vh-4rem)] p-2 pb-40 overflow-scroll bg-react-grey scrollbar-hide'>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/favorites" element={<FavSongs />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

      </BrowserRouter>
    </>
  )
}

export default App
