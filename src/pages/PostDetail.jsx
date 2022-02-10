import React from 'react';
import Post from '../components/Post';
import CommentList from '../components/CommentList';
import CommentWrite from '../components/CommentWrite';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import Permit from './../shared/Permit';

const PostDetail = (props) => {

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const user_info = useSelector((state) => state.user.user);

    const post_list = useSelector(state => state.post.list);
    const post = post_list.find(a => a.id === id);

    React.useEffect(() => {
        if(!post){
            dispatch(postActions.getOnepostFB(id))
        }
        
    },[])


    return (
        <>
            {post && <Post {...post} is_me={post.user_info.user_id === user_info?.uid}/>}
            <Permit>
                <CommentWrite post_id={id}/>
            </Permit>
            <CommentList post_id={id}/>
        </>
    );
};

export default PostDetail;