import React from "react";
import PropTypes from "prop-types";
import { ListItem, StyledLink } from "./NavItem.styles";

const NavItem = ({ label, ...props }) => {
  return (
    <ListItem {...props}>
      <StyledLink>{label}</StyledLink>
    </ListItem>
  );
};

NavItem.propTypes = {
  label: PropTypes.string,
};

export default NavItem;
