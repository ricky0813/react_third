import React from 'react';
import { Button, Grid, Image, Text  } from '../elements';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as likeActions } from '../redux/modules/like';
import Like from '../elements/Like';


const Post = (props) => {
    const {history} = props;
    const dispatch = useDispatch();

    const post_id = props.id;
    const is_login = useSelector(state => state.user.is_login);
    const user_id = useSelector(state => state.user.user?.uid);

    const like_list = useSelector(state => state.like.list)
    // const [check, setCheck] = React.useState('unchecked')

    // React.useEffect(() => {
    //     console.log(like_list)
    //     if(like_list !== undefined && like_list?.includes(post_id)){
    //         setCheck('checked')
    //     }
    // },[like_list])

    const checkLike = (e) => {
        e.stopPropagation();
        if(!is_login){
            window.alert('로그인을 하셔야 좋아요 기능을 사용할 수 있습니다!')
            history.push('/login')
        }
        if(is_login && like_list.includes(post_id) === false){
            dispatch(likeActions.upLikeFB(post_id, user_id));
            // setCheck('checked');
        } else if(is_login && like_list.includes(post_id)){
            dispatch(likeActions.downLikeFB(post_id, user_id));
            // setCheck('unchecked');
        }

    }

    return (
        <>
            <Grid>
                <Grid is_flex padding='16px'>
                    <Grid is_flex justify='flex-start' >
                        <Image shape='circle' src={props.src}/>
                        <Text bold='600'>{props.user_info.user_name}</Text>
                    </Grid>
                    <Grid is_flex justify={'flex-end'}>
                        <Text>{props.insert_dt}</Text>
                        {props.is_me && 
                        <Button width='auto' margin='0 0 0 4px' padding='4px' _onClick={(event) => {
                            event.stopPropagation();
                            history.push(`/write/${props.id}`)
                        }}>
                            수정
                        </Button>}
                        {props.is_me &&
                        <Button width='auto' margin='0 0 0 4px' padding='4px' _onClick={(event) => {
                            event.stopPropagation()
                            if(window.confirm('정말 게시물을 삭제할까요?')){
                                dispatch(postActions.deletePostFB(props.id));
                            }
                        }}>
                            삭제
                        </Button>}
                    </Grid>
                </Grid>
                {(props.layout === 'layoutRight')&&(
                    <Grid is_flex>
                        <Grid padding='16px'>
                            <Text>{props.contents}</Text>
                        </Grid>
                        <Grid>
                            <Image shape='square' src={props.image_url}/>
                        </Grid>
                    </Grid>    
                )}
                {(props.layout === 'layoutLeft')&&(
                    <Grid is_flex>
                        <Grid>
                            <Image shape='square' src={props.image_url}/>
                        </Grid>
                        <Grid padding='16px'>
                            <Text>{props.contents}</Text>
                        </Grid>
                    </Grid>    
                )}
                {(props.layout === 'center')&&(
                  < Grid>
                        <Grid padding='16px'>
                            <Text>{props.contents}</Text>
                        </Grid>
                        <Grid>
                            <Image shape='rectangle' src={props.image_url}/>
                        </Grid>
                    </Grid>   
                )}
                {/* <Grid padding='16px'>
                    <Text>{props.contents}</Text>
                </Grid>
                <Grid>
                    <Image shape='rectangle' src={props.image_url}/>
                </Grid> */}
                <Grid padding='16px' is_flex>
                    <Grid is_flex justify='flex-start'>
                        <Text margin= '0 2% 0 0' bold>{`댓글 ${props.comment_cnt}개`}</Text>
                        <Text margin= '0' bold>{`좋아요 ${props.like_cnt}개`}</Text>
                    </Grid>
                    <Like width='22px' _onClick={checkLike} checked={is_login&&like_list.includes(post_id) ? true : false}/>      
                </Grid>
            </Grid>           
        </>
    );
};

Post.defaultProps = {
    user_info: {
        user_name: 'hs',
        user_profile: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg',
    },
    image_url : 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg',
    contents: '고양이네요!',
    comment_cnt: '10',
    like_cnt: '5',
    insert_dt: '2022-02-04 14:00:00',
    is_me: false,
    layout: 'center',
};

const GridLeft = styled(Grid)`
    justify-content: flex-start;
`

export default Post;