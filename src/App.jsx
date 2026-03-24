import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar';
import Paste from './components/Paste';
import Home from './components/Home';
import ViewPaste from './components/ViewPaste';

const router = createBrowserRouter(
    [
    {
      path: "/",
      element: 
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path: "/pastes",
      element:
       <div>
        <Navbar />
        <Paste />
       </div>
    },
    {
      path: "/pastes/:pasteID",
      element: 
       <div>
        <Navbar />
        <ViewPaste />
       </div>
    },
    {
      path: "*",
      element: 
        <div>
           <h1>404 NOT FOUND</h1>
        </div>
    }
    ]
);

function App() {
  return (
    <>
    <RouterProvider  router={router}/>
    </>
  )
}

export default App
