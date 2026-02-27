import { Outlet } from 'react-router'
import NavBar from './NavBar'
import '/src/styles/App.css'

function App() {

  return (
    <>
    <NavBar/>
    <main>
      <Outlet/>
    </main>
    </>
  )
}

export default App
