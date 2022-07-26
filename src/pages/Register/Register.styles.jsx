import styled from "styled-components";
import { InputText } from "../../components";

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
  font-size: 36px;
  margin-bottom: 70px;
`;
export const StyledTitle = styled(Title)`
  color: var(--color-primary);
  font-size: 38px;
  margin: 0px;
`;
export const RegisterTitle = styled(Title)`
  color: var(--color-primary);
  font-size: 36px;
  margin-bottom: 30px;
`;
export const Label = styled.p`
  color: var(--color-secondary-shade-0);
  margin-bottom: 80px;
`;

export const Remember = styled.button`
  display: flex;
  align-items: center;
  margin-top: 16px;
  outline: none;
  border: none;
  background: transparent;
  color: var(--color-secondary-shade-0);
  & > span {
    margin-left: 10px;
    color: ${({ active }) => (active ? "var(--color-primary)" : "#787878")};
  }
  :hover {
    cursor: pointer;
  }
`;
export const AuthContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1fr;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
`;
export const UAuth = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LoginButton = styled.button`
  color: var(--color-tertiary);
  background-color: var(--color-primary);
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.4);
  padding: 12px;
  width: 45%;
  border: none;
  border-radius: 1px;
  :hover {
    cursor: pointer;
  }
  :active {
    background-color: #2e40bb;
    transition: 0.4s linear;
    box-shadow: none;
  }
`;
export const RegisterButton = styled(LoginButton)`
  color: var(--color-primary);
  border: 1px solid var(--color-primary);
  background-color: var(--color-tertiary);
  padding: 11px;
  box-shadow: none;
  :active {
    background-color: #94a2ff;
    transition: 0.4s linear;
  }
`;
export const GoogleButton = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
`;
export const SignText = styled.p`
  text-align: right;
  margin-bottom: 2px;
  margin-right: 3px;
  font-size: 12px;
`;

export const RightSection = styled.div`
  background-color: var(--color-secondary-shade-1);
  padding: 48px 0px 20px 60px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NavContainer = styled.div`
  width: 60%;
  font-size: 22px;
`;
export const LinkContainer = styled.ul`
  width: 100%;
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Image = styled.img`
  width: 50%;
  height: auto;
  margin: 60px 15px 0px 0px;
`;
export const StyledInputText = styled(InputText)`
  margin-top: 18px;
`;
export const UploadButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 35px;
  width: 35px;
  padding: 1px;
  overflow: hidden;
  border: 3px solid blue;
  border-radius: 50%;
  margin-top: 10px;
  margin-bottom: 4px;
  :hover {
    box-shadow: 0 0 5px 1px rgba(0, 0, 255, 0.5);
    border: 3px solid rgba(0, 0, 255, 0.6);
  }
  & > img {
    border-radius: 50%;
    border: none;
    object-fit: cover;
    object-position: top;
  }
`;
