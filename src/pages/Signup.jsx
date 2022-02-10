import React from 'react';
import {Text, Input, Grid, Button} from './../elements';
import { useDispatch } from 'react-redux';
import user, { actionCreators as userActions } from '../redux/modules/user';
import { emailCheck } from '../shared/common';

const Signup = () => {

  const dispatch = useDispatch();

  const [id, setId] = React.useState('');
  const [pwd, setPwd] = React.useState('');
  const [pwd_check, setPwdCheck] = React.useState('');
  const [user_name, setUserName] = React.useState('');

  const signup = () => {

    if(user_name === '' || pwd === '' || pwd_check === '' || user_name === ''  ){
      window.alert('입력하지 않은 내용이 있습니다!')
      return;
    }

    if(!emailCheck(id)){
      window.alert('이메일 형식이 맞지 않습니다!')
      return;
    }

    if(pwd !== pwd_check){
      window.alert('비밀번호가 일치하지 않습니다!')
      return;
    }

    dispatch(userActions.signupFB(id, pwd, user_name));
  }

    return (
      <>
        <Grid padding="16px">
          <Text size="32px" bold>
            회원가입
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
              label="닉네임"
              placeHolder="닉네임을 입력해주세요."
              _onChange={(e) => {
                setUserName(e.target.value);
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
          <Grid padding="16px 0px">
            <Input
              label="패스워드 확인"
              placeHolder="패스워드를 다시 입력해주세요."
              _onChange={(e) => {
                setPwdCheck(e.target.value);
              }}
              type = 'password'
            />
          </Grid>
          <Button
            text="회원가입하기"
            _onClick={() => {
              signup();
            }}
          />
        </Grid>
      </>
    );
};

export default Signup;