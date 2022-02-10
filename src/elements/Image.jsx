import React from 'react';
import styled from 'styled-components';


const Image = (props) => {
    const {shape, src, size} = props;
    
    const styles = {
        src: src,
        size: size,
    }

    if(shape === 'circle'){
        return(
            <ImageCircle {...styles}></ImageCircle>
        )
    }
    
    if(shape === 'rectangle'){
        return(
            <AspectOutter>
                <AspectInner {...styles}></AspectInner>
            </AspectOutter>
        )
    }

    if(shape === 'square'){
        return(
            <AspectOutter>
                <AspectInnerSquare {...styles}></AspectInnerSquare>
            </AspectOutter>
        )
    }

    return (
        <>
            <ImageDefault {...styles}/>
        </>
    );
};

Image.defaultProps = {
    shape: '',
    src: 'https://idsb.tmgrup.com.tr/ly/uploads/images/2021/09/08/thumbs/800x531/142774.jpg',
    size: 36,
}; 

const ImageDefault = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size); 
    background-image: url('${(props) => props.src }');
    background-size: cover;
    background-position: center;
`;

const ImageCircle = styled.div`
    --size: ${(props) => props.size}px;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    
    background-image: url('${(props) => props.src }');
    background-size: cover;
    background-position: center;
    margin: 4px;
`;

const AspectOutter = styled.div`
    width: 100%;
    min-width: 250px;
`;
const AspectInner = styled.div`
    position: relative;
    padding-top: 75%;
    overflow: hiddne;
    background-color: #f8f8f8;
    background-image: url("${(props) => props.src}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

const AspectInnerSquare = styled.div`
    position: relative;
    padding-top: 100%;
    overflow: hiddne;
    background-color: #f8f8f8;
    background-image: url("${(props) => props.src}");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;


export default Image;