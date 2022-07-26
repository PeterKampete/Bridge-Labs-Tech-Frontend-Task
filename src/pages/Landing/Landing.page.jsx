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
  NavContainer,
  LinkContainer,
  StyledLink,
  ListItem,
  Image,
} from "./Landing.styles";
import image from "../../assets/images/ai-landing.jpeg";

const clientID = process.env.REACT_APP_CLIENT_ID;

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
      client_id: clientID,
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
      <RightSection>
        <NavContainer>
          <LinkContainer>
            <ListItem>
              <StyledLink>Home</StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink>About us</StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink>Blog</StyledLink>
            </ListItem>
            <ListItem>
              <StyledLink>Pricing</StyledLink>
            </ListItem>
          </LinkContainer>
        </NavContainer>
        <Image src={image} alt="nothing" />
      </RightSection>
    </Container>
  );
};

export default Landing;
