import { createAction, handleActions } from "redux-actions";
import { produce } from 'immer';

import { db, storage } from "../../shared/firebase"; 
import { collection, getDocs, addDoc, doc, updateDoc, getDoc, query, orderBy, limit, startAt, where, deleteDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';

import moment from 'moment';

import { actionCreators as imgActions } from "./image";
import { actionCreators as commActions } from "./comment";

const SET_POST = 'SET_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';
const LOADING = 'LOADING';

const setPost = createAction(SET_POST, (post_list, paging) => ({post_list, paging}));
const addPost = createAction(ADD_POST, (post) => ({post}));
const editPost = createAction(EDIT_POST, (post_id, post) => ({post_id, post}));
const deletePost = createAction(DELETE_POST, (post_id) => ({post_id}));
const loading = createAction(LOADING, (is_loading) => ({is_loading}));

const initialState = {
    list: [],
    paging: {start: null, next: null, size: 3},
    is_loading: false
}

const initialPost = {
    // id: 0,
    // user_info: {
    //     user_name: 'hs',
    //     user_profile: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg',
    // },
    image_url : 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg',
    contents: '고양이네요!',
    comment_cnt: 0,
    like_cnt: 0,
    insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
};


const editPostFB = (post_id = null, post = {}, like_edit = false) => {
    return async function(dispatch, getState, { history }){
        if(!post_id){
            window.alert('게시물 정보가 없습니다!')
            return;
        }
        const _img = getState().image.preview;

        const _post_idx = getState().post.list.findIndex(p => p.id === post_id);
        const _post = getState().post.list[_post_idx];

        if (like_edit){
            const docRef = doc(db, "post", post_id);
            await updateDoc(docRef, post);
            dispatch(editPost(post_id, post));

            return;
        } else if(_img === _post.image_url){
            const docRef = doc(db, "post", post_id);
            await updateDoc(docRef, post);
            dispatch(editPost(post_id, post));
            history.replace('/');

            return;
        } else{

            const user_id = getState().user.user.uid;
            const _upload = ref(storage, `images/${user_id}_${new Date().getTime()}`);

            await uploadString(_upload, _img, "data_url").then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);

                    return url
                }).then(async url => {
                    const docRef = doc(db, "post", post_id);
                    await updateDoc(docRef, {...post, image_url: url});
                    dispatch(editPost(post_id, {...post, image_url: url}));
                    history.replace('/');
                }).catch((err) => {
                    window.alert('앗! 이미지 업로드에 문제가 있어요!');
                    console.log('앗! 이미지 업로드에 문제가 있어요!', err);
                })
            }); 

        }
    }
}

const addPostFB = (contents, layout) => {
    return async function(dispatch, getState, { history }){
        const _user = getState().user.user;

        const user_info = {
            user_name: _user.user_name,
            user_id: _user.uid,
            user_profile: _user.user_profile,
        }

        const _post = {
            ...initialPost,
            contents: contents,
            insert_dt: moment().format('YYYY-MM-DD hh:mm:ss'),
            layout: layout,
        }

        const _image = getState().image.preview;

        const _upload = ref(storage, `images/${user_info.user_id}_${new Date().getTime()}`);

        await uploadString(_upload, _image, "data_url").then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                console.log(url);

                return url
            }).then(url => {
                addDoc(collection(db, "post"), {...user_info, ..._post, image_url: url}).then((doc) => {
                    dispatch(addPost({..._post, user_info, image_url: url,id: doc.id}));
                    history.replace('/');

                    dispatch(imgActions.setPreview(null));
                }).catch((err)=>{
                    window.alert('앗! 포스트 작성에 문제가 있어요!');
                    console.log('포스트 작성에 실패했어요!', err);
                });
            }).catch((err) => {
                window.alert('앗! 이미지 업로드에 문제가 있어요!');
                console.log('앗! 이미지 업로드에 문제가 있어요!', err);
            })
        }); 
    }
}

const getPostFB = (start = null, size = 3) => {
    return async function (dispatch, getState, { history }){

        let _paging = getState().post.paging;

        if(_paging.start && !_paging.next){
            return;
        }

        dispatch(loading(true))
        const postDB = collection(db, "post");

        let q = query(postDB, orderBy("insert_dt", "desc"), limit(size+1));

        if(start) {
            q = query(postDB, orderBy("insert_dt", "desc"), startAt(start), limit(size+1));
        }

        const docs = await getDocs(q);
        
        let post_list = [];

        let paging = { start: docs.docs[0], 
                       next: docs.docs.length >= size+1 ? docs.docs[docs.docs.length - 1] : null,  
                       size: size,
                    };

        docs.forEach(d=>{
            
            let _post = d.data();
            
            let post = Object.keys(_post).reduce((a,b) => {
                if(b.includes('user')){
                    a.user_info[b] = _post[b];
                } else{
                    a[b] = _post[b];
                }
                return a;
            },{id: d.id, user_info: {}})

            post_list.push(post);
        });

        post_list.pop();

        dispatch(setPost(post_list, paging));
    }
}

const getOnepostFB = (id) => {
    return async function (dispatch, getState, {history}) {
        const docRef = doc(db, "post", id);
        const _post = (await getDoc(docRef)).data()            
            
        let post = Object.keys(_post).reduce((a,b) => {
            if(b.includes('user')){
                a.user_info[b] = _post[b];
            } else{
                a[b] = _post[b];
            }
            return a;
        },{id: id, user_info: {}})

        dispatch(setPost([post]))
    }
}

const deletePostFB = (post_id) => {
    return async function(dispatch, getState, {history}) {
        if(!post_id){
            window.alert('게시물 정보가 없습니다!')
            return;
        }

        const docRef = doc(db, 'post', post_id);
        await deleteDoc(docRef);

        // const comment_list = getState().comment.list[post_id].map(a=>a.id)

        // comment_list.forEach(async(a) => {
        //     const docRef = doc(db, "comment", a);
        //     await deleteDoc(docRef);
        // });
       
        // dispatch(commActions(post_id));
     
        dispatch(deletePost(post_id));

        history.replace('/');
    }
}

export default handleActions({
    [SET_POST] : (state, action) => produce(state, (draft) => {
        draft.list.push(...action.payload.post_list);
        // 상세페이지에서 한개의 포스트 정보만을 리스트에 담았다가, 다시 모든 리스트를 불러오면 중복이 생길 수 있으므로, 중복제거 처리를 해준다.
        draft.list = draft.list.reduce((a,b) => {
            if(a.findIndex(c => c.id === b.id) === -1){
                return [...a, b];
            } else{
                return a;
            }
        },[]);

        if(action.payload.paging){
            draft.paging = action.payload.paging;
        }
        draft.is_loading = false;
    }),

    [ADD_POST] : (state, action) => produce(state, (draft) => {
        draft.list.unshift(action.payload.post);
    }),
    [EDIT_POST] : (state, action) => produce(state, (draft) => {
        let idx = draft.list.findIndex(p => p.id === action.payload.post_id);

        draft.list[idx] = {...draft.list[idx], ...action.payload.post};
    }),
    [DELETE_POST]: (state, action) => produce(state, (draft) => {
        draft.list = draft.list.filter(a => a.id !== action.payload.post_id);
    }),
    [LOADING] : (state, action) => produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
    }),

}, initialState);

const actionCreators = {
    setPost,
    addPost,
    editPost,
    deletePost,
    getPostFB,
    addPostFB,
    editPostFB,
    getOnepostFB,
    deletePostFB,
};

export {actionCreators};
