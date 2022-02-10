import {createAction, handleActions} from "redux-actions";
import {produce} from 'immer';

import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

import { auth } from "../../shared/firebase";
import { browserSessionPersistence, 
        createUserWithEmailAndPassword, 
        onAuthStateChanged, 
        setPersistence, 
        signInWithEmailAndPassword, 
        signOut, 
        updateProfile } from 'firebase/auth';

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER"

// action creators
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user })); 
const setUser = createAction(SET_USER, (user) => ({ user }));

// initialState
const initialState = {
    user: null,
    is_login: false,
}


// middleware actions
// const loginAction = (user) => {
//     return function(dispatch, getState, {history}){
//         console.log(history);
//         dispatch(setUser(user));
//         history.push('/');
//     }
// }

// 로그인 미들웨어
const loginFB = (id, pwd) => {
    return function (dispatch, getState, { history }){
        // 인증 상태 지속성 수정(세션 추가)
        setPersistence(auth, browserSessionPersistence).then(() => {
          // 이메일 주소와 비밀번호로 사용자 로그인 처리
          signInWithEmailAndPassword(auth, id, pwd)
            .then((userCredential) => {
              const user = userCredential.user;

              dispatch(
                setUser({
                  user_name: user.displayName,
                  id: id,
                  user_profile: "",
                  uid: user.uid,
                })
              );

              history.push("/");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
              window.alert('이메일이나 비밀번호를 다시 확인해주세요!')
            });
        });


        
    }
} 


const signupFB = (id, pwd, user_name) => {
    return function(dispatch, getState, { history }){
        // 비밀번호 기반 계정 만들기
        createUserWithEmailAndPassword(auth, id, pwd)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // 회원가입한 계정의 닉네임 업데이트
            updateProfile(auth.currentUser, {
              displayName: user_name,
            })
              .then(() => {
                // dispatch(setUser({user_name: user_name, id: id, user_profile: '', uid: user.uid,}));
                window.alert('회원가입이 완료되었습니다!')
                history.push('/login');
              }).catch((error) => {
                console.log(error);
              });

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // 회원가입 실패시 에러코드와 에러메시지 console 찍기
            console.log(errorCode, errorMessage)
        });

    }
}

// 로그인 된 상태에서 새로고침 시, 세션을 정보를 확인해 로그인 상태를 리듀스 state에도 반영
const loginCheckFB = () => {
    return function (dispatch){
        // 현재 로그인한 사용자 가져오기
        onAuthStateChanged(auth, (user) => {
            if (user) {
              dispatch(setUser({
                user_name: user.displayName,
                user_profile: '',
                id: user.email,
                uid: user.uid,
              }));
            } else {
              dispatch(logOut());
            }
          });
    }
}

const logOutFB = () => {
  return function (dispatch, getState, { history }) {
    signOut(auth)
      .then(() => {
        dispatch(logOut())
        // push와 달리 현재 페이지를 대체한다는 뜻으로 뒤로가기를 해도 이전 페이지가 표시되지 않는다.
        history.replace('/')
      });
  };
};


// reducer
// immer에서 불변성 관리를 해줄 때는 produce에서 원본을 먼저 넣고, 원본과 같은 내용이지만 수정할 draft를 함수를 넣는다.
export default handleActions({
    [SET_USER]: (state, action) => produce(state, (draft) => {
        setCookie('is_login', 'success');
        draft.user = action.payload.user;
        draft.is_login = true;
    }),
    [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        deleteCookie('is_login')
        draft.user = null;
        draft.is_login = false;
    }),
    [GET_USER]: (state, action) => produce(state, (draft)=>{}),
}, initialState);

// action creator export
const actionCreators = {
    logOut,
    getUser,
    signupFB,
    loginFB,
    loginCheckFB,
    logOutFB,
};

export { actionCreators };

                                
              