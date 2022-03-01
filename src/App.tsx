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
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Navbar from './components/Navbar';

const themeLight = createTheme({
  palette: {
    primary: {
      main: '#1a2532'
    },
    background: {
      default: '#e5f2ff'
    },
    text: {
      primary: '#1a2532'
    }
  },
  typography: {
    fontFamily: 'Space Grotesk',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})
const themeDark = createTheme({
  palette: {
    primary: {
      main: '#f5faff',

    },
    background: {
      default: '#233243'
    },
    text: {
      primary: '#f5faff',
      secondary: '#c3e0ff'
    }
  },
  typography: {
    fontFamily: 'Space Grotesk',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
})

function App() {
  const userTheme = themeDark

  return (
    <ThemeProvider theme={userTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
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
    </ThemeProvider>
  )
}

export default App;
