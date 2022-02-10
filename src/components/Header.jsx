import React from 'react';
import { Link } from 'react-router-dom';
import {Grid, Button} from './../elements';
import styled from 'styled-components';

import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

import { history } from './../redux/configureStore';
import { apiKey } from '../shared/firebase';

const Header = () => {

    const dispatch = useDispatch();
    const is_login = useSelector((state) => state.user.is_login);

    const _session_key = `firebase:authUser:${apiKey}:[DEFAULT]`

    const _is_session = sessionStorage.getItem(_session_key) ? true : false;

    if(is_login && _is_session){
        return (
          <>
            <Grid is_flex padding="4px 16px">
              <Grid>
                <Title to="/">
                  <h1>HOME</h1>
                </Title>
              </Grid>
              <Grid is_flex>
                <Button text={"알림"} _onClick={()=>{
                    history.push('/noti')
                  }}/>
                <Button
                  text={"로그아웃"}
                  _onClick={() => {
                    dispatch(userActions.logOutFB());
                  }}
                />
              </Grid>
            </Grid>
          </>
        );
    }
    
    return (
        <>
        <Grid is_flex padding='4px 16px'> 
            <Grid>
                <Title to='/'>
                    <h1>HOME</h1>
                </Title>          
            </Grid>
            <Grid is_flex>
                <Button text={'로그인'} _onClick={() => {history.push('/login')}}/>
                <Button text={'회원가입'} _onClick={() => {history.push('/signup')}}/>
            </Grid>
        </Grid>
        </>
    );
};

const Title = styled(Link)`
    text-decoration: none;
    h1 {
        margin: 0;
    }
`

export default Header;