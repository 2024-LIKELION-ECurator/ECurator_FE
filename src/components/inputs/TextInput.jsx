import React from "react";
import styled from "styled-components";

const StyledTextarea = styled.textarea`
    display: flex;
    align-items: flex-start;
    padding: 40px 42px;
    border-radius: 11px;
    width: 100%;
    background-color: #FFFFFF;
    outline: none;
    color: #676767;
    border: 0;
    resize: none;
    overflow: hidden;
    box-sizing: border-box;
    ${(props) =>
        props.height &&
        `
        height: ${props.height}px;
    `}
    font-size: 20px;
    resize: none;
`;

function TextInput(props) {
    const { height, value, onChange, placeholder } = props;

    return (
        <StyledTextarea
            height={height}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
        />
    );
}


export default TextInput;