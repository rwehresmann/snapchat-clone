import React, { useEffect } from 'react';
import WebcamCapture from './WebcamCapture';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import logo from './images/snapchat.png';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          userName: authUser.displayName,
          profilePic: authUser.photoURL,
          id: authUser.uid,
        }))
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ) : (
          <>
            <img src={logo} alt="" className="app__logo"/>
            <div className="app__body">
              <div className="app__bodyBackground">
                <Switch>
                  <Route path="/chats/view">
                    <ChatView/>
                  </Route>
                  <Route path="/chats">
                    <Chats/>
                  </Route>
                  <Route path="/preview">
                    <Preview/>
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture/>
                  </Route>
                </Switch>
              </div>
            </div>
          </>
        )}
      </Router>

    </div>
  );
}

export default App;
