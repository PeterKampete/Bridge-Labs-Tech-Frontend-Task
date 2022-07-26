/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { FaCheckSquare } from "react-icons/fa";
import jwt_decode from "jwt-decode";
import {
  Container,
  LeftSection,
  RightSection,
  Title,
  StyledTitle,
  Label,
  Input,
  InputContainer,
  Remember,
  AuthContainer,
  LoginButton,
  RegisterButton,
  GoogleButton,
  UAuth,
  SignText,
} from "./Landing.styles";

const Landing = () => {
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);

  const handleRememberMe = () => {
    setActive(!active);
    console.log("Remember me");
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    const userObj = jwt_decode(response.credential);
    setUser(userObj);
    document.getElementById("signInDiv").hidden = true;
  };
  const handleSignOut = () => {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "676539751021-avahe2d71i14fpmj13jrnr13t3u9rca8.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
    google.accounts.id.prompt();
  }, []);
  return (
    <Container>
      <LeftSection>
        <Title> Digital</Title>
        <StyledTitle>
          Artificial Intelligence Driving Results For The Travel Industry
        </StyledTitle>
        <Label>Welcome back! Please login to your account.</Label>
        <InputContainer>
          <Input type="text" />
        </InputContainer>
        <Remember active={active} onClick={handleRememberMe}>
          <FaCheckSquare
            style={{ color: active ? "var(--color-primary)" : "#787878" }}
          />
          <span>Remember Me</span>
        </Remember>
        \
        <div style={{ marginTop: "70px", width: "92%" }}>
          <SignText>Sign In With Google</SignText>
          <AuthContainer>
            <UAuth>
              <LoginButton>Login</LoginButton>
              <RegisterButton>Register</RegisterButton>
            </UAuth>
            <GoogleButton>
              <div id="signInDiv"></div>
            </GoogleButton>
          </AuthContainer>
        </div>
      </LeftSection>
      <RightSection>hey</RightSection>
    </Container>
  );
};

export default Landing;
