import React from 'react';
import { Grid, Text, Button, Image, Input, Radio } from '../elements';
import Upload from './../shared/Upload';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as postActions } from '../redux/modules/post';
import { actionCreators as imgActions } from '../redux/modules/image';

const PostWrite = (props) => {
    const is_login = useSelector(state => state.user.is_login);
    const {history} = props;
    const dispatch = useDispatch();
    const preview = useSelector(state => state.image.preview);
    const post_list = useSelector(state => state.post.list);

    const post_id = props.match.params.id;
    const is_edit = post_id ? true : false;

    let _post = is_edit ? post_list.find(p => p.id === post_id) : null; 

    const [contents, setContents] = React.useState(_post ? _post.contents : '');
    const [layout, setLayout] = React.useState(_post ? _post.layout : 'center');

    

    React.useEffect(() => {
        if(is_edit && !_post){
            window.alert('포스트 정보가 없어요!')
            history.goBack()

            return;
        }

        if(is_edit){
            dispatch(imgActions.setPreview(_post.image_url));
        }
        if(!is_edit){
            dispatch(imgActions.setPreview(null))
        }
    },[]);

    const changeContents = (e) => {
        setContents(e.target.value);
    }

    const changeLayout = (e) => {
        setLayout(e.target.value);
    }

    const addPost = () => {
        dispatch(postActions.addPostFB(contents, layout));
    }

    const editPost = () => {
        dispatch(postActions.editPostFB(post_id,{contents: contents, layout: layout}));
    }

    if(!is_login){
        return(
            <Grid margin='100px 0' padding='16px' center>
                <Text size='32px' bold>앗! 잠깐!</Text>
                <Text size='16px'>로그인 후에만 글을 쓸 수 있어요!</Text>
                <Button _onClick={() => {history.replace('/login');}}>로그인 하러가기</Button>
            </Grid>
        )
    }
    return (
        <>
            <Grid padding='16px'>
                <Text size='36px' bold='600' margin='0'>{is_edit ? '게시글 수정' : '게시글 작성'}</Text>
                <Grid margin = '5vh 0 2vh 0'>
                    <Text margin='0' size='20px' bold='500'>레이아웃 선택</Text>
                    <Radio _onClick={changeLayout} _value={layout}/>
                </Grid>
            </Grid>
            <Grid padding='16px'>
                <Text size='20px' bold='500' margin='0 0 2vw 0'>사진 선택</Text>
                <Upload/>
            </Grid>
            {(layout === 'center')&&(
                <>
                    <Grid margin='3vh 0 0 0 '>
                        <Grid padding='16px'>
                            <Text margin='0' size='20px' bold='500'>미리보기</Text>
                        </Grid>
                        <Image shape='rectangle' src={preview ? preview : 'https://yourlawnwise.com/wp-content/uploads/2017/08/photo-placeholder.png'}></Image>
                    </Grid>
                    <Grid padding='16px'>
                        <Input _onChange={changeContents} multiLine label='게시글 내용' placeholeder='게시글 작성' value={contents}/>
                    </Grid>       
                </>
            )}
            {(layout === 'layoutLeft')&&(
                <>
                    <Grid margin='3vh 0 0 0 ' padding='16px'>  
                        <Text margin='0' size='20px' bold='500'>미리보기</Text>    
                    </Grid>
                    <Grid padding='16px' is_flex>
                        <Image shape='square' src={preview ? preview : 'https://yourlawnwise.com/wp-content/uploads/2017/08/photo-placeholder.png'}></Image>
                        <Grid margin='0 0 0 2vw'>
                            <Input _onChange={changeContents} multiLine label='게시글 내용' placeholeder='게시글 작성' value={contents}/>
                        </Grid>
                    </Grid>       
                </>
            )}
            {(layout === 'layoutRight')&&(
                <>
                    <Grid margin='3vh 0 0 0 ' padding='16px'>  
                        <Text margin='0' size='20px' bold='500'>미리보기</Text>    
                    </Grid>
                    <Grid padding='16px' is_flex>
                        <Grid margin='0 2vw 0 0'>
                            <Input _onChange={changeContents} multiLine label='게시글 내용' placeholeder='게시글 작성' value={contents}/>
                        </Grid>
                        <Image shape='square' src={preview ? preview : 'https://yourlawnwise.com/wp-content/uploads/2017/08/photo-placeholder.png'}></Image>
                    </Grid>       
                </>
            )}

            <Grid padding='16px'>
                <Button text={is_edit ? '게시글 수정' : '게시글 작성'} _onClick={is_edit ? editPost : addPost}/>
            </Grid>
        </>
    );
};

export default PostWrite;