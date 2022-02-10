import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Input } from '../elements';
import { actionCreators as commActions } from '../redux/modules/comment';

const CommentWrite = (props) => {
    const dispatch = useDispatch();
    const {post_id} = props;
    const [comment_text, setCommentText] = React.useState();

    const onChange = (e) => {
        setCommentText(e.target.value);
    }
    
    const write = () => {
        dispatch(commActions.addCommentFB(post_id, comment_text));
        setCommentText('');
    }

    return (
        <>
            <Grid padding='16px' is_flex>
                <Input 
                placeholder='댓글 내용을 입력해주세요 :)' 
                _onChange={onChange} 
                value={comment_text} 
                is_submit 
                on_submit = {write}
                />
                <Button width='50px' margin='0 2px' _onClick={write}>작성</Button>
            </Grid>
        </>
    );
};

export default CommentWrite;