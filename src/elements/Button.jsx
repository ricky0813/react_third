import React from 'react';
import styled from 'styled-components';

const Button = (props) => {

    const {text, _onClick, is_float, children, margin, width, padding, _disabled} = props;

    if(is_float) {
        return(
            <FloatButton onClick={_onClick}/>
        )       
    }

    const styles = {
        margin: margin,
        width: width,
        padding,
    }

    return (
        <>
            <ElButton onClick={_onClick} {...styles} disabled={_disabled}>
                {text? text : children}
            </ElButton>
        </>
    );
};

Button.defaultProps = {
    text: false,
    children: null,
    _onClick: null,
    is_float: false,
    margin: false,
    width: '100%',
    padding: '12px 0',
    _disabled: false,
}

const ElButton = styled.button`
   width: ${(props) => props.width};
   background-color: #212121;
   color: #fff;
   padding: ${(props) => props.padding};
   box-sizing: border-box;
   border: none;
   ${(props) => props.margin ? `margin: ${props.margin};` : ''}
   cursor: pointer;

   &:disabled {
       opacity: 0.8;
   }
`
const FloatButton = styled.button`
    width: 50px; 
    height: 50px;
    border-radius: 50%;
    background-color: #212121;
    border: none;
    position: fixed;
    right: 16px;
    bottom: 50px;
    cursor: pointer;

    &:before{
        content: '';
        display: block;
        width: 25px;
        height: 6px;
        border-radius: 6px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 12.5px);
        top: calc(50% - 3px);
    }

    &:after{
        content: '';
        display: block;
        width: 6px;
        height: 25px;
        border-radius: 6px;
        background-color: #fff;
        position: absolute;
        left: calc(50% - 3px);
        top: calc(50% - 12.5px);
    }
`

export default Button;