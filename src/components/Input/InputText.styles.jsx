import styled from "styled-components";

export const InputContainer = styled.div`
width: 92%;
display: flex;
align-items: center;
margin-top: 22px;
`;
export const Input = styled.input`
box-sizing: border-box;
padding: 5px;
height: 52px;
width: 100%;
border: 2px solid var(--color-secondary);
outline: none;
font-size: 16px;
:focus {
  border: 2px solid var(--color-primary);
  transition: all 0.2s linear
}
`;