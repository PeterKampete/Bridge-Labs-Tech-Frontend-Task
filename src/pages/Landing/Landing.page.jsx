/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
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
  Remember
} from "./Landing.styles";

const Landing = () => {
  //   const [user, setUser] = useState({});

  //   const handleCallbackResponse = (response) => {
  //     console.log("Encoded JWT ID token" + response.credential);
  //     const userObj = jwt_decode(response.credential);
  //     setUser(userObj);
  //     document.getElementById("signInDiv").hidden = true;
  //   };
  //   const handleSignOut = () => {
  //     setUser({});
  //     document.getElementById("signInDiv").hidden = false;
  //   };

  //   useEffect(() => {
  //     google.accounts.id.initialize({
  //       client_id:
  //         "676539751021-avahe2d71i14fpmj13jrnr13t3u9rca8.apps.googleusercontent.com",
  //       callback: handleCallbackResponse,
  //     });
  //     google.accounts.id.renderButton(document.getElementById("signInDiv"), {
  //       theme: "outline",
  //       size: "large",
  //     });
  //     google.accounts.id.prompt();
  //   }, []);
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
        <Remember>
          <FaCheckCircle style={{ color: 'var(--color-primary)' }} />
          <span>Remember Me</span>
        </Remember>

        {/* <div id="signInDiv"></div>
        {Object.keys(user).length !== 0 && (
          <button onClick={(e) => handleSignOut(e)}>Sign Out</button>
        )}
        {user && (
          <div>
            <img
              alt="nothing"
              src={user?.picture}
              style={{
                border: "1px solid red",
                width: "100px",
                height: "100px",
              }}
            />
            <h3>{user.name}</h3>
          </div>
        )} */}
      </LeftSection>
      <RightSection>hey</RightSection>
    </Container>
  );
};

export default Landing;
