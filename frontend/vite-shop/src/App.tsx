import {Route, Routes} from 'react-router-dom';
import AppLayout from  './layouts/App';
import AuthLayout from  './layouts/Auth';
import Login from './views/auth/Login';
import Home from './views/Home';
import './index.css';
function App() {

  return (
  <>
   <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path='/auth' element={<AuthLayout />} >
          <Route index element={<Login />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
  </>
  )
}

export default App;
