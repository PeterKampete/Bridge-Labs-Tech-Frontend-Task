import React from "react";
import { CardContainer } from "./Card.styles";

const Card = ({ name, image, description }) => {
  return (
    <CardContainer bgUrl={image}>
      <h1>{name}</h1>
      <p>{description}</p>
    </CardContainer>
  );
};

export default Card;
