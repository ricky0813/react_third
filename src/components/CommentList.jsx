import React from 'react';
import { Grid, Image, Text } from '../elements';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as commActions } from '../redux/modules/comment';

const CommentList = (props) => {
    const dispatch = useDispatch();
    // PostDetail.jsx에서도 가져오거나 dispatch 할 수도 있지만 쓸데없는 드릴링을 줄여야 쓸데없는 리렌더링을 줄일 수 있다.
    // 드릴링: 전역관리 저장소에서 가져온 데이터를 부모요소에서 자식요소로 다시 넘겨주는 것.
    const comment_list = useSelector(state => state.comment.list)
    console.log(comment_list)
    const {post_id} = props;

    React.useEffect(() => {
        dispatch(commActions.getCommentFB(post_id,));
    },[]);

    if(!comment_list[post_id] || !post_id){
        return null
    }

    return (
        <>
            <Grid padding='16px'>
                {comment_list[post_id].map(a=>{
                    return <CommentItem key={a.id} {...a}/>
                })}
            </Grid>
        </>
    );
};

CommentList.defaultProps = {
    post_id: null,
}

export default CommentList;


const CommentItem = (props) => {

    const {user_profile, user_name, user_id, post_id, insert_dt, contents} = props;
    return (
        <>
            <Grid is_flex>
                <Grid is_flex justify='flex-start'>
                    <Image shape='circle' margin='0 5% 0 0 '/>
                    <Text margin='0 2% 0 0' bold='600'>{user_name}</Text>
                    <Text margin='0 0 0 0'>{contents}</Text>
                </Grid>
                <Grid is_flex margin='0px 4px' justify='flex-end' width='auto'>
                    <Text margin='0' width='max-content'>{insert_dt}</Text>
                </Grid>
            </Grid>         
        </>
    );
};

CommentItem.defaultProps = {
    user_profile: "",
    user_name: 'hs419',
    user_id: '',
    post_id: 1,
    contents: '우와 귀여운 고양이네요!',
    insert_dt: '2021-09-01 19:00:00',
}

