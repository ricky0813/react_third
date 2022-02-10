import React from 'react';
import styled from 'styled-components';

const Text = (props) => {
    const {bold, normal, color, size, children, margin, width} = props;
    const styles = {
        bold: bold,
        color: color,
        size: size,
        margin: margin,
        width: width,
    }

    return (
        <P {...styles}>
            {children}
        </P>
    );
};

Text.defaultProps = {
    children: null,
    bold: false,
    normal: false,
    color: '#222831',
    size: '14px',
    margin: false,
    width: 'auto',
}

const P =styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    font-weight: ${(props) => props.bold ? props.bold : '300' };
    ${(props) => props.margin ? `margin: ${props.margin};` : ''};
    ${(props) => props.width ? `width: ${props.width};` : ''};
`

export default Text;