
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Viewpaste from './components/Viewpaste'
import Paste from './components/Paste'
import Navbar from './components/Navbar'
import Home from './components/Home'


const router=createBrowserRouter(
  [
    {
      path:"/Paste_App",
      element:
      <div>
        <Navbar />
        <Home />

      </div>
    },

    {
      path:"/Paste_App/pastes",
      element:
      <div>
        <Navbar />
        <Paste />

      </div>
    },

    {
      path:"/Paste_App/pastes/:id",
      element:
      <div>
        <Navbar />
        <Viewpaste />

      </div>
    },


  ]
)

function App() {

  

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
