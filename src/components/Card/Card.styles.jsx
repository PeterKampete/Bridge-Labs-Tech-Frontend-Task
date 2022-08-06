import styled from "styled-components";

export const CardContainer = styled.div`
  background: ${(props) => `url(${props.bgUrl})`};
  width: 250px;
  height: 300px;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 8px
`;
