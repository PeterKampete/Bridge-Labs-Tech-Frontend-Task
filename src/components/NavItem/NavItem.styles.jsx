import styled from "styled-components";

export const ListItem = styled.li`
  list-style-type: none;
  padding: 10px 0px;
`;
export const StyledLink = styled.a`
  color: var(--color-secondary-shade-0);
  text-decoration: none;
  cursor: pointer;
  :active {
    border-bottom: 2px solid var(--color-primary);
  }
  :hover {
    border-bottom: 3px solid rgba(55, 81, 254, 0.8);
    transition: 0.1s ease-in;
  }
`;
