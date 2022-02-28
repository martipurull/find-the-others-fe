import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NotFound from './pages/NotFound';
import Home from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import CreateBand from './pages/CreateBand';
import CreateProject from './pages/CreateProject';
import Jobs from './pages/Jobs';
import Login from './pages/Login';
import CreateJob from './pages/CreateJob';
import Shop from './pages/Shop';
import ShopBackOffice from './pages/ShopBackOffice';
import Subscription from './pages/Subscription';
import Cart from './pages/Cart';
import Payment from './pages/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>} />
        <Route path='/register' element={<PrivateRoute><Register /></PrivateRoute>} />
        <Route path='/new-band' element={<PrivateRoute><CreateBand /></PrivateRoute>} />
        <Route path='/new-project' element={<PrivateRoute><CreateProject /></PrivateRoute>} />
        <Route path='/jobs' element={<PrivateRoute><Jobs /></PrivateRoute>} />
        <Route path='/new-job' element={<PrivateRoute><CreateJob /></PrivateRoute>} />
        <Route path='/shop' element={<PrivateRoute><Shop /></PrivateRoute>} />
        <Route path='/shop-backoffice' element={<PrivateRoute><ShopBackOffice /></PrivateRoute>} />
        <Route path='/subscribe' element={<PrivateRoute><Subscription /></PrivateRoute>} />
        <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
        <Route path='/payment' element={<PrivateRoute><Payment /></PrivateRoute>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App;
