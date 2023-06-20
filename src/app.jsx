import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import {Login} from './login/login';
import {About} from './about/about';
import {Play} from './play/play';
import {Scores} from './scores/scores';
import { AuthState } from './login/authState';


function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
export default function App() {
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);

  return (
  <BrowserRouter>
  <div className='app'>
  <header className="container-fluid">
      <nav className="navbar navbar-expand-sm"> 
          <NavLink className="navbar-brand" to="">
              <img src="/billy.svg" width="70"/>Sing Like Billy</NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
              <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item "><NavLink className="nav-link" to="">Login</NavLink></li>
            {authState === AuthState.Authenticated && (<li className="nav-item "><NavLink className="nav-link" to="play">Play</NavLink></li>)}
            {authState === AuthState.Authenticated && (<li className="nav-item "><NavLink className="nav-link" to="scores">Scores</NavLink></li>)}
            {authState === AuthState.Authenticated && (<li className="nav-item "><NavLink className="nav-link" to="about">About</NavLink></li>)}
          </ul>
          </div>  
          {/* need to figure out how to do drop menu */}
      </nav>

  </header>
<Routes>
  <Route
    path='/'
    element={
      <Login
        userName={userName}
        authState={authState}
        onAuthChange={(userName, authState) => {
          setAuthState(authState);
          setUserName(userName);
        }}
      />
    }
    exact
  />
  <Route path='/play' element={<Play userName={userName} />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>

  <footer className="container-fluid">
      <span>Tran Diep</span>
      <br />
      <NavLink to="https://github.com/dogtortron/startup">GitHub</NavLink>
  </footer>
</div>
</BrowserRouter>
);
}
