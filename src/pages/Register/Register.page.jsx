/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import validator from "validator";
import { FaCheckSquare, FaEye, FaEyeSlash } from "react-icons/fa";
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
  UploadButton,
} from "./Register.styles";
import image from "../../assets/images/ai-landing.jpeg";
import profile from "../../assets/images/avatar.png";
import NavItem from "../../components/NavItem/NavItem.component";

const clientID = process.env.REACT_APP_CLIENT_ID;
// const client = axios.create({
//   baseUrl: "https://simplor.herokuapp.com/api",
// });

const Register = () => {
  const navigation = useNavigate();
  const { RegisterUser } = useAuth();
  const [user, setUser] = useState({});
  const [active, setActive] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [checkType, setCheckType] = useState(false);
  const [navigate, setNavigate] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);

  const handleRememberMe = () => {
    setActive(!active);
    console.log("Remember me");
  };

  const clearInputs = () => {
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setPassword("");
    setAvatar("");
  };

  // const userData = {
  //   email,
  //   first_name: firstName,
  //   last_name: lastName,
  //   phone,
  //   password,
  //   avatar,
  // };

  const handleChange = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    if (!validator.isStrongPassword(password) || validator.isEmpty(password)) {
      setPasswordError(
        "Invalid Password: minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      );
      return;
    }
    if (
      (validator.isEmail(email) || !validator.isEmpty(email)) &&
      (validator.isStrongPassword(password) || !validator.isEmpty(password))
    ) {
      console.log("avatarrrr", avatar);
      const formData = new FormData();
      formData.append("email", email);
      formData.append("first_name", firstName);
      formData.append("last_name", lastName);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("avatar", avatar);
      // console.log("userDate", userData);
      RegisterUser(formData)
        .then((response) => {
          console.log("response", response);
          clearInputs();
          setError(false);
          setNavigate(true);
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "91%",
            marginBottom: "50px",
          }}
        >
          <RegisterTitle> Register Account</RegisterTitle>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <UploadButton>
              <img
                src={avatar || profile}
                style={{ width: "35px", height: "35px", position: "absolute" }}
                alt="upload"
              />
              <input
                type="file"
                onChange={handleChange}
                style={{ opacity: "0" }}
              />
            </UploadButton>
            <h6 style={{ margin: "0px", color: "var(--color-secondary)" }}>
              upload profile
            </h6>
          </div>
        </div>
        <div>
          <span style={{ color: "red" }}>{error}</span>
          <StyledInputText
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstname"
          />
          <StyledInputText
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastname"
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
          <span style={{ color: "red" }}>{emailError}</span>
          <StyledInputText
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
          </StyledInputText>
          <span style={{ color: "red" }}>{passwordError}</span>
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
              <LoginButton onClick={() => navigation("/")}>Login</LoginButton>
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
