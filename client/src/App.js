import './App.css';
import React from 'react';
import {Link, Outlet} from 'react-router-dom'
// import LoginForm from './components/auth/LoginForm'
// import RegisterForm from './components/auth/RegisterForm'
// import AuthContextProvider from './status/context/Authcontex'
// import Dashboard from './components/auth/Dashboard';
// import { ACCESS_TOKEN_NAME } from './axios'
function App() {
  return (
    <>
      <div className='App'>
        <nav>
          <Link to='/'></Link>
          <Link to='/register'></Link>
          <Link to='/dashboard'></Link>
        </nav>
        <Outlet />
      </div>
    </>
    // <AuthContextProvider>
    // <AuthContextProvider>
    //   <Router>
    //     <Routes>
    //       <Route path='/' element={<LoginForm />} exact />
    //       <Route path='/register' element={<RegisterForm />} exact />
    //       <Route path='/dashboard' element={<Dashboard />} exact />
    //     </Routes>
    //   </Router>
    //  </AuthContextProvider>
    // </AuthContextProvider>
  );
}

export default App;
