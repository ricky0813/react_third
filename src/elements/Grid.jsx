import React from 'react';
import styled from 'styled-components';

const Grid = (props) => {
    const {is_flex, width, margin, padding, bg, children, justify, center, _onClick, maxWidth, fixed, border} = props;

    const styles = {
        is_flex: is_flex,
        justify: justify,
        width: width,
        margin: margin,
        padding: padding,
        bg: bg,
        center: center,
        maxWidth: maxWidth,
        fixed: fixed,
        border: border,
    };

    return (
        <>
        <GridBox {...styles} onClick={_onClick}>
            {children}
        </GridBox>
        </>
    );
};

Grid.defaultProps = {
    children: null,
    is_flex: false,
    justify: 'space-between',
    width: '100%',
    padding: false,
    margin: false,
    bg: false,
    center: false,
    _onClick: () => {},
    maxWidth: false,
    fixed: false,
    border: false,
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    height: 100%;
    box-sizing: border-box;
    ${(props) => props.padding? `padding: ${props.padding};` : '' }
    ${(props) => props.margin? `margin: ${props.margin};` : '' }
    ${(props) => props.bg? `background-color: ${props.bg};` : '' }
    ${(props) => props.is_flex? `display: flex; align-items: center; justify-content: ${props.justify};` : ""}
    ${(props) => props.center ? `text-align: center` : ''}
    ${(props) => props.maxWidth ? `max-width: ${props.maxWidth}` : ''}
    ${(props) => props.border ? `border: ${props.border}` : ''}
    ${(props) => props.fixed ? `
        position: fixed;
        top: 0;
        left: 0;
        border-bottom: 2px solid #ddd;
        height: 5vw;
        min-height: 70px;
        background-color: #fff;
        z-index: 9999;
    ` : ''}
`;

export default Grid;