import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1fr;
  height: 100vh;
  width: 100%;
`;
export const LeftSection = styled.div`
  padding: 30px 0px 20px 60px;
  text-align: left;
  overflow: hidden;
`;
export const Title = styled.h1`
  color: var(--color-primary);
  font-size: 38px;
  margin-bottom: 70px;
`;
export const StyledTitle = styled(Title)`
  color: var(--color-primary);
  font-size: 40px;
  margin: 0px;
`;
export const Label = styled.p`
  color: var(--color-secondary);
`;
export const InputContainer = styled.div`
  width: 92%;
  display: flex;
  align-items: center;
  margin-top: 100px;
`;
export const Input = styled.input`
  box-sizing: border-box;
  padding: 5px;
  height: 52px;
  width: 100%;
  border: 2px solid var(--color-secondary-shade-0);
  outline: none;
  font-size: 16px;
  :focus {
    border: 2px solid var(--color-primary);
  }
`;
export const Remember = styled.button`
  display: flex;
  align-items: center;
  margin-top: 12px;
  outline: none;
  border: none;
  background: transparent;
  color: var(--color-primary);
  & > span {
    margin-left: 10px;
  }
  :hover {
    cursor: pointer;
  }
`;
export const RightSection = styled.div`
  background-color: grey;
  overflow: hidden;
`;
