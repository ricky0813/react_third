import React from 'react';
import Button from './../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as imgActions } from '../redux/modules/image';
import Grid from './../elements/Grid';


const Upload = (props) => {
    const fileInput = React.useRef();
    const dispatch = useDispatch();
    const is_uploading = useSelector(state => state.image.uploading);


    const selectFile = (e) => {
        console.log(e);
        console.log(e.target);
        console.log(e.target.files[0]);

        console.log(fileInput.current.files[0]);
        // FileReader 객체 생성
        const reader = new FileReader();
        // ref로 받아온 파일
        const file = fileInput.current.files[0];
        // 파일을 URL데이터로 읽어온다.
        reader.readAsDataURL(file);
        // 읽어오기가 끝나면 읽어온 결과를 setPreview 미들웨어로 dispatch 해준다.
        reader.onloadend = () => {
            console.log(reader.result);
            dispatch(imgActions.setPreview(reader.result));
        }
    }

    // const uploadImage = () => {
        
    //     if(fileInput.current.files.length === 0){
    //         window.alert('사진을 선택해주세요!');
    //         return;
    //     } else {
    //         let image = fileInput.current.files[0];
    //         dispatch(imgActions.uploadImageFB(image));
    //     }        
    // }

    return (
        <>
            <Grid padding='0 3vw'>
                <input type="file" onChange={selectFile} ref={fileInput} disabled={is_uploading}/>
            </Grid>
            {/* <Button _onClick={uploadImage}>업로드하기</Button> */}
        </>
    );
};

export default Upload;