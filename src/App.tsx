import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SideBar from './components/SideBar'
import MusicPlayer from './components/MusicPlayer'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import FavSongs from './pages/FavSongs'

function App() {

  return (
    <>
      <BrowserRouter>

        <SideBar />
        <Navbar />
        <MusicPlayer url="" imageSrc="https://images.unsplash.com/photo-1610446244955-c6f6cea76a76?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" songName="rap god" artistName="eminem"/>
        
        <main className='ml-16 mt-16 h-[calc(100vh-4rem)] p-2 pb-16 overflow-scroll bg-react-grey scrollbar-hide'>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/favorites" element={<FavSongs />} />
          </Routes>
        </main>

      </BrowserRouter>
    </>
  )
}

export default App
