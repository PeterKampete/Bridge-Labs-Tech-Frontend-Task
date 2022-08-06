/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import validator from "validator";
import { FaCheckSquare, FaEye, FaEyeSlash } from "react-icons/fa";
import {
  Container,
  LeftSection,
  RightSection,
  Title,
  StyledTitle,
  Label,
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
} from "./Landing.styles";
import image from "../../assets/images/ai-landing.jpeg";
import InputText from "../../components/Input/InputText.component";
import NavItem from "../../components/NavItem/NavItem.component";
import { useAuth } from "../../hooks/useAuth";

const clientID = process.env.REACT_APP_CLIENT_ID;
// const client = axios.create({
//   baseUrl: "https://simplor.herokuapp.com/api",
// });

const Landing = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState({});
  const { loginUser } = useAuth();
  const [active, setActive] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkType, setCheckType] = useState(false);

  const handleRememberMe = () => {
    setActive(!active);
    console.log("Remember me");
  };

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const userData = {
    email,
    password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      setEmailError("Please enter a valid email address");
    }
    if (!validator.isStrongPassword(password) || validator.isEmpty(password)) {
      setPasswordError(
        "Invalid Password: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      );
    }
    if (
      (validator.isEmail(email) || !validator.isEmpty(email)) &&
      (validator.isStrongPassword(password) || !validator.isEmpty(password))
    ) {
      loginUser(userData)
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response);
            clearInputs();
            setError(false);
            setNavigate(true);
          }
        })
        .catch((error) => {
          console.log(error);
          if (emailError) {
            setError("");
          } else {
            setError(error.data.detail);
            return;
          }
        });
    }
  };

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token" + response.credential);
    const userObj = jwt_decode(response.credential);
    setUser(userObj);
    document.getElementById("signInDiv").hidden = true;
    navigate("/home");
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

  if (navigate) {
    return <Navigate to="/home" />;
  }
  return (
    <Container>
      <LeftSection>
        <Title> Digital</Title>
        <StyledTitle>
          Artificial Intelligence Driving Results For The Travel Industry
        </StyledTitle>
        <Label>Welcome back! Please login to your account.</Label>
        <div>
          <span style={{ color: "red", fontSize: "10px" }}>{error}</span>
          <InputText
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <InputText
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type={checkType ? "text" : "password"}
          >
            {checkType ? (
              <FaEye
                onClick={() => setCheckType(!checkType)}
                style={{
                  position: "absolute",
                  right: "60%",
                  color: "var(--color-primary)",
                  fontSize: "20px",
                }}
              />
            ) : (
              <FaEyeSlash
                onClick={() => setCheckType(!checkType)}
                style={{
                  position: "absolute",
                  right: "60%",
                  color: "var(--color-primary)",
                  fontSize: "20px",
                }}
              />
            )}
          </InputText>
          <span style={{ color: "red", fontSize: "10px" }}>
            {passwordError}
          </span>
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
              <LoginButton onClick={handleLogin}>Login</LoginButton>
              <RegisterButton onClick={() => navigation("/register")}>
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
