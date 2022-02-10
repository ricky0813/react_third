import React from 'react';
import Post from './../components/Post';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import InfinityScroll from '../shared/InfinityScroll';
import { Grid } from '../elements';

const PostList = (props) => {
    const {history} = props

    const dispatch = useDispatch();
    const post_list = useSelector((state) => state.post.list);
    const user_info = useSelector((state) => state.user.user);
    const is_loading = useSelector((state) => state.post.is_loading);
    const paging = useSelector((state) => state.post.paging);

    console.log(post_list)

    React.useEffect(() => {
        if(post_list.length <= 1){
            dispatch(postActions.getPostFB());
        }
    }, [])

    return (
        // React.Fragment와 동일
        <>
            <Grid padding='20px 0 0 0'>
                <InfinityScroll
                    callNext={() => {
                        dispatch(postActions.getPostFB(paging.next))
                    }}
                    is_next={paging.next ? true : false}
                    loading={is_loading}
                >
                    {post_list.map((d, i) => {
                        if(d.user_info.user_id === user_info?.uid){
                            return (
                                <Grid key={d.id} _onClick={() => history.push(`/post/${d.id}`)} bg={'#fff'} margin ='0 0 40px 0' border='1px solid #ddd'>
                                    <Post {...d} is_me layout={d.layout}/>
                                </Grid>
                            )
                        } else {
                            return (
                                <Grid key={d.id} _onClick={() => history.push(`/post/${d.id}`)} bg={'#fff'} margin='0 0 40px 0' border='1px solid #ddd'>
                                    <Post {...d} layout={d.layout}/>
                                </Grid>
                            )
                        }
            
                    })}
                </InfinityScroll>
            </Grid>
        </>
    );
};

export default PostList;