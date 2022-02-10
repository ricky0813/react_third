import React from 'react';
import {Text, Input, Grid, Button} from './../elements';
import { getCookie, setCookie, deleteCookie } from '../shared/Cookie';
import { useDispatch } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck } from '../shared/common';


const Login = () => {
    const dispatch = useDispatch();

    const [id,setId] = React.useState('');
    const [pwd, setPwd] = React.useState('')

    const login = () => {

      if(id === '' || pwd === ''){
        window.alert('입력하지 않은 내용이 있습니다!')
        return;
      }

      if(!emailCheck(id)){
        window.alert('이메일 형식이 맞지 않습니다! ')
        return;
      }

      dispatch(userActions.loginFB(id, pwd));

    }

    return (
      <>
        <Grid padding="16px">
          <Text size="32px" bold>
            로그인
          </Text>
          <Grid padding="16px 0px">
            <Input
              label="아이디(이메일)"
              placeHolder="아이디를 입력해주세요."
              _onChange={(e) => {
                setId(e.target.value);
              }}
            />
          </Grid>
          <Grid padding="16px 0px">
            <Input
              label="패스워드"
              placeHolder="패스워드를 입력해주세요."
              _onChange={(e) => {
                setPwd(e.target.value);
              }}
              type = 'password'
            />
          </Grid>
          <Button
            text="로그인하기"
            _onClick={() => {
                console.log("로그인 했어!");
                login();
            }}
          />
        </Grid>
      </>
    );
};

export default Login;