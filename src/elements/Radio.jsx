import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '.';

const Radio = (props) => {
    const {_onClick, _value} = props;
    return (
        <>
        <Grid is_flex margin='2vh 0'>
            <Grid is_flex justify='center' >
                <Text width='max-content' margin='0 3% 0 0'>세로 정렬</Text>
                <input type="radio" name='rayout' value='center' onClick={_onClick} defaultChecked={_value === 'center' ? true : false}/>
            </Grid>
            <Grid is_flex justify='center' >
                <Text width='max-content' margin='0 3% 0 0'>사진 왼쪽</Text>
                <input type="radio" name='rayout' value='layoutLeft' onClick={_onClick} defaultChecked={_value === 'layoutLeft' ? true : false}/>
            </Grid>
            <Grid is_flex justify='center' >
                <Text width='max-content' margin='0 3% 0 0'>사진 오른쪽</Text>
                <input type="radio" name='rayout' value='layoutRight' onClick={_onClick} defaultChecked={_value === 'layoutRight' ? true : false}/>
            </Grid>
        </Grid>
        </>
    );
};

Radio.defaultProps={
    _onClick:() => {},
    _value: false,
}

export default Radio;