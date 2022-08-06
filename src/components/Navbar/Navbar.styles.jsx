import styled from "styled-components";

export const NavContainer = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
  background-color: #fff;
  color: black;
  box-shadow: 0 2px 2px 2px rgba(9, 9, 9, 0.23);
  & > button {
  margin-right: 10px;
  background: var(--color-primary);
  color: #fff;
  font-weight: bold;
  border-radius: 4px;
  border: none;
  display: flex;
  align-items: center;
  padding: 0.8em 1.4em;
  cursor: pointer;
  :hover {
    background: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    transition: all 0.2s linear
  }
  }
`;
export const Home = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;
