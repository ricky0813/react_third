import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

import { db } from "../../shared/firebase"; 
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';

import { actionCreators as postActions } from "./post";


const SET_LIKE = 'SET_LIKE';
const UP_LIKE = 'UP_LIKE';
const DOWN_LIKE = 'DOWN_LIKE';

const setLike = createAction(SET_LIKE, (like_list) => ({like_list}));
const upLike = createAction(UP_LIKE, (like_list) => ({like_list}));
const downLike = createAction(DOWN_LIKE, (like_list) => ({like_list}));

const initialState = {
    list: [],
}

const setLikeFB = () => {
    return async function(dispatch, getState, {history}){
        const docsRef =  await getDocs(collection(db, "like"));
        const user_id = getState().user.user.uid

        let like_list = [];

        docsRef.forEach(a=>{
            if(a.id === user_id){
               like_list = [...a.data().like]
           }
       })

       dispatch(setLike(like_list));
    }
}

const upLikeFB = (post_id, user_id) => {
    return async function(dispatch, getState, {history}){
        if(post_id === null){
            window.alert('포스트 정보가 없습니다!')
            history.replace('/')
            return;
        }

        const _like_list = getState().like.list;
        const like_list = [..._like_list, post_id];

        const docRef = doc(db, 'like', user_id);
        await setDoc(docRef, { like: like_list }, { merge: true });

        const post = getState().post.list.find(a=>a.id === post_id);
        dispatch(postActions.editPostFB(post_id,{like_cnt: post.like_cnt+1}, true));

        dispatch(upLike(like_list));
    }
}
const downLikeFB = (post_id, user_id) => {
    return async function(dispatch, getState, {history}){
        if(post_id === null){
            window.alert('포스트 정보가 없습니다!')
            history.replace('/')
            return;
        }

        const _like_list = getState().like.list;
        const like_list = [..._like_list].filter(a=>a!==post_id);
        
        const docRef = doc(db, 'like', user_id);
        await setDoc(docRef, { like: like_list }, { merge: true });

        const post = getState().post.list.find(a=>a.id === post_id);
        dispatch(postActions.editPostFB(post_id,{like_cnt: post.like_cnt-1}, true));

        dispatch(downLike(like_list))

    }
}
 

export default handleActions({
    [SET_LIKE] : (state, action) => produce(state, (draft) => {
        draft.list = action.payload.like_list;
    }),
    [UP_LIKE] : (state, action) => produce(state, (draft) => {
        draft.list = action.payload.like_list;
    }),
    [DOWN_LIKE] : (state, action) =>produce(state, (draft) => {
        draft.list = action.payload.like_list;
    })
},initialState);

const actionCreators = {
    upLike,
    downLike,
    setLike,
    upLikeFB,
    downLikeFB,
    setLikeFB,
}

export {actionCreators}