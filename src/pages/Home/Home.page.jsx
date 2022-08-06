import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "../../components";
import Navbar from "../../components/Navbar/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { Container, CardContainer } from "./Home.styles";
import an from "../../assets/images/ai-landing.jpeg";

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("https://simplor.herokuapp.com/api/category/categories")
      .then((response) => {
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const { logoutUser } = useAuth();
  return (
    <>
      <Navbar logout={logoutUser} />
      <Container>
        <CardContainer>
          {categories.map((cat) => (
            <Card
              key={cat.id}
              name={cat.name}
              image={an}
              description={cat.description}
            />
          ))}
        </CardContainer>
      </Container>
    </>
  );
};

export default Home;
