/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode";
import axios from "axios";
import { FaCheckSquare } from "react-icons/fa";
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
import InputText from "../../components/Input/InputText.component";
import NavItem from "../../components/NavItem/NavItem.component";

const clientID = process.env.REACT_APP_CLIENT_ID;
// const client = axios.create({
//   baseUrl: "https://simplor.herokuapp.com/api",
// });

const Landing = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRememberMe = () => {
    setActive(!active);
    console.log("Remember me");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "https://simplor.herokuapp.com/api/user/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.status === 200) {
          localStorage.setItem("userToken", response.access);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    const userObj = jwt_decode(response.credential);
    setUser(userObj);
    document.getElementById("signInDiv").hidden = true;
    navigate('/home');
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
        <div>
          <InputText
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputText
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
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
              <LoginButton onClick={handleLogin}>Login</LoginButton>
              <RegisterButton onClick={() => navigate("/register")}>
                Register
              </RegisterButton>
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
            <NavItem label="Home" />
            <NavItem label="About us" />
            <NavItem label="Blog" />
            <NavItem label="Pricing" />
          </LinkContainer>
        </NavContainer>
        <Image src={image} alt="nothing" />
      </RightSection>
    </Container>
  );
};

export default Landing;
