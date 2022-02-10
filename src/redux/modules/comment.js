import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { db } from "../../shared/firebase";
import moment from "moment";

import { collection, orderBy, where, updateDoc, increment, doc, addDoc, query, getDocs } from 'firebase/firestore';
 
import { actionCreators as postActions } from "./post";


const SET_COMMENT = "SET_COMMENT";
const ADD_COMMENT = "ADD_COMMENT";
// const DELETE_COMMENT = 'DELETE_COMMENT';
const LOADING = "LOADING";

const setComment = createAction(SET_COMMENT, (post_id, comment_list) => ({post_id, comment_list}));
const addComment = createAction(ADD_COMMENT, (post_id, comment) => ({post_id, comment}));
// const deleteComment = createAction(DELETE_COMMENT, (post_id) => ({post_id}));

const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

const initialState = {
  list: {},
  is_loading: false,
};

const addCommentFB = (post_id, contents) => {
    return async function(dispatch, getState, {history}) {
        const user_info = getState().user.user;

        let comment = {
            post_id,
            user_id: user_info.uid,
            user_name: user_info.user_name,
            user_profile: user_info.user_profile,
            contents,
            insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
        }

        const comment_doc = await addDoc(collection(db, "comment"), comment);

        const docRef = doc(db, 'post', post_id);
        await updateDoc(docRef,{comment_cnt: increment(1)});   
        
        comment = {...comment, id: comment_doc.id };
        dispatch(addComment(post_id, comment));

        const post = getState().post.list.find(l => l.id === post_id);

        if(post) {
            dispatch(postActions.editPost(post_id, {comment_cnt: +post.comment_cnt + 1}))
        }

    }
}

const getCommentFB = (post_id = null) => {
    return async function(dispatch, getState, {history}){
        if(!post_id){
            return;
        }

        const commentDB = collection(db, 'comment');
        const q = query(commentDB, where("post_id", "==", post_id), orderBy('insert_dt','desc'));
        const docs = await getDocs(q).catch(err => {
            console.log('댓글 정보를 가져올 수 없습니다!',err)
        })
        
        let list = [];

        docs.forEach((doc) => {
            list.push({...doc.data(), id: doc.id})
            console.log(doc.data())
        });

        console.log(list)

        dispatch(setComment(post_id, list));
        
    }
};


export default handleActions(
  {
      [SET_COMMENT]: (state, action) => produce(state, (draft) => {
          // 각 댓글을 아이디 별로 나누어서 딕셔너리 내에 리스트 형태로 저장한다.
          draft.list[action.payload.post_id] = action.payload.comment_list;
      }),
      [ADD_COMMENT]: (state, action) => produce(state, (draft)=> {
        draft.list[action.payload.post_id].unshift(action.payload.comment);
      }),
      [LOADING]: (state, action) => 
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
    //   [DELETE_COMMENT]: (state, action) => produce(state, (draft)=>{
    //      let new_list = {};
    //      Object.keys(draft.list).filter(a => a !== action.payload.post_id).forEach((a,i) => new_list[a] = draft.list[a]);
    //      draft.list = new_list;
    //     })
  },
  initialState
);

const actionCreators = {
  getCommentFB,
  addCommentFB,
  setComment,
  addComment,
//   deleteComment,
};

export { actionCreators };