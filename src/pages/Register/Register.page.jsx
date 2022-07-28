/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaCheckSquare } from "react-icons/fa";
import {
  Container,
  LeftSection,
  RightSection,
  RegisterTitle,
  Remember,
  AuthContainer,
  LoginButton,
  RegisterButton,
  GoogleButton,
  UAuth,
  SignText,
  NavContainer,
  LinkContainer,
  Image,
  StyledInputText,
} from "./Register.styles";
import image from "../../assets/images/ai-landing.jpeg";
import InputText from "../../components/Input/InputText.component";
import NavItem from "../../components/NavItem/NavItem.component";

const clientID = process.env.REACT_APP_CLIENT_ID;
// const client = axios.create({
//   baseUrl: "https://simplor.herokuapp.com/api",
// });

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleRememberMe = () => {
    setActive(!active);
    console.log("Remember me");
  };

  const userData = {
    email,
    first_name: firstName,
    last_name: lastName,
    phone,
    password,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("userDate", userData);
    try {
      const response = await axios.post(
        "https://simplor.herokuapp.com/api/user/register",
        userData,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
        <RegisterTitle> Register Account</RegisterTitle>
        <div>
          <StyledInputText
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstName"
          />
          <StyledInputText
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastName"
          />
          <StyledInputText
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="phone"
          />
          <StyledInputText
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <StyledInputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <StyledInputText
            type="file"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
        </div>
        <Remember active={active} onClick={handleRememberMe}>
          <FaCheckSquare
            style={{ color: active ? "var(--color-primary)" : "#787878" }}
          />
          <span>Remember Me</span>
        </Remember>
        <div style={{ marginTop: "40px", width: "92%" }}>
          <SignText>Sign In With Google</SignText>
          <AuthContainer>
            <UAuth>
              <LoginButton onClick={() => navigate("/")}>Login</LoginButton>
              <RegisterButton type="submit" onClick={handleRegister}>
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

export default Register;
