import React from 'react';
import styled from 'styled-components';
import { Grid, Text } from '.';


const Input = (props) => {
    const {label, placeHolder, _onChange, type, multiLine, value, is_submit, on_submit} = props;

    if(multiLine){
        return(
            <Grid>
                <Text margin='0'>{label}</Text>
                <ELTextarea rows={10} placeholder={placeHolder} onChange={_onChange} defaultValue={value}/>
            </Grid>
        )
    }

    return (
        <>  
            <Grid>
                {label}
                {is_submit ? (
                <ELInput 
                    type={type} 
                    placeholder={placeHolder} 
                    onChange={_onChange} 
                    value={value}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            on_submit(e)
                        }
                    }}
                />) : <ELInput type={type} placeholder={placeHolder} onChange={_onChange}/>         
                }
            </Grid>             
        </>
    );
};

Input.defaultProps = {
    multiLine: false,
    label: null,
    placeHolder: '텍스트를 입력해주세요.',
    _onChange: () => {},
    type: 'text',
    value: '',
    is_submit: false,
    on_submit: () => {},
}

const ELInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`
const ELTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;


export default Input;