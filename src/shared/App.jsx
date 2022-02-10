import React from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../redux/configureStore';

import { Grid, Button } from '../elements';
import Header from './../components/Header';

import PostList from './../pages/PostList';
import Login from './../pages/Login';
import Signup from './../pages/Signup';


import { actionCreators as userActions } from '../redux/modules/user';
import { actionCreators as likeActions } from '../redux/modules/like';
import { useDispatch, useSelector } from 'react-redux';
import { apiKey } from './firebase';
import Permit from './Permit';
import PostWrite from './../pages/PostWrite';
import PostDetail from '../pages/PostDetail';
import Notification from './../pages/Notification';





function App() {
  const dispatch = useDispatch();
  const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
  const _is_session = sessionStorage.getItem(_session_key) ? true : false;
  const is_login = useSelector(state => state.user.is_login)

  // 화면이 새로고침 될 때마다 세션이 있다면 로그인 체크 미들웨어를 디스패치 해준다.
  React.useEffect(() => {
    if(is_login){
      dispatch(likeActions.setLikeFB())
    }
      

    if(_is_session){
      dispatch(userActions.loginCheckFB());
    }

  },[is_login])

  return (
    <>
      <Grid maxWidth='1200px' margin='0 auto'>
        <ConnectedRouter history={history}>
          <Header/>
          <Grid margin='calc(4vw + 40px) 0 0 0'>
            <Route path="/" exact component={PostList} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path='/write' exact component={PostWrite}/>
            <Route path='/write/:id' exact component={PostWrite}/>
            <Route path='/post/:id' exact component={PostDetail}/>
            <Route path='/noti' exact component={Notification}/>
          </Grid>
        </ConnectedRouter>
      </Grid>
      <Permit>
        <Button is_float _onClick={() => {history.push('/write');}} />
      </Permit>
    </>
  );
}

export default App;
