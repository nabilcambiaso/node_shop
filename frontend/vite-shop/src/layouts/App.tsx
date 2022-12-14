import React , {useState} from 'react';
import {Outlet} from 'react-router-dom';

function App() {
  const [menuActive, setMenuActive] = useState(false);
  return (
    <div className='bg-gray-600 min-h-screen'>
        <div className='bg-gray-700 h-20 px-10 flex items-center relative'>
        <nav className='flex w-full items-center justify-between'>
          <div>
            <h1 className=' text-orange-400 text-3xl'>
              <a href="/">Shop title</a>
            </h1>
          </div>
          <ul className={`nav ${menuActive ? 'flex' : 'hidden'}`}>
            <li className='ml-4'>
              <a href="#">
                <span>Home</span>
              </a>
            </li>
            <li className='ml-4'>
              <a href="#">
                <span>Products</span>
              </a>
            </li>
            <li className='ml-4'>
              <a href="#">
                <span>Contact</span>
              </a>
            </li>
            <li className='ml-4'>
              <a href="#">
                <span>Login</span>
              </a>
            </li>
            <li className='ml-4'>
              <a href="#">
                <span>Sign Up</span>
              </a>
            </li>
          </ul>
          <svg onClick={() => { setMenuActive(prev => !prev) }} className="w-6 h-6 flex md:hidden cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
        </nav>
      </div>
      <Outlet/>
    </div>
  )
}

export default App;