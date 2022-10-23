import {Route, Routes} from 'react-router-dom';
import AppLayout from  './layouts/App';
import Home from './views/Home';
function App() {

  return (
  <>
   <Routes>
        <Route path='/' element={<AppLayout />} >
          <Route index element={<Home />} />
        </Route>
        <Route path='/index' element={<Home />} />
      </Routes>
  </>
  )
}

export default App;
