import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './components/auth/LoginForm'
import RegisterForm from './components/auth/RegisterForm'
import AuthContextProvider from './status/context/Authcontex'
import PostContextProvider from './status/context/PostContext'
import Dashboard from './components/auth/Dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path='/' element={<App />}>
              <Route path='/' element={<LoginForm />} exact />
              <Route path='register' element={<RegisterForm />} exact />
              <Route path='dashboard' element={<Dashboard />} exact />
              <Route path='*' exact />
            </Route>
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
