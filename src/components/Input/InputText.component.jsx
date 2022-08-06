import React from "react";
import PropTypes from "prop-types";
import { InputContainer, Input } from "./InputText.styles";

const InputText = ({
  value,
  placeholder,
  onChange,
  type,
  children,
  ...props
}) => {
  return (
    <InputContainer {...props}>
      <Input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {children}
    </InputContainer>
  );
};

InputText.defaultProps = {
  type: "text",
};

InputText.propTypes = {
  value: PropTypes.string,
  onchange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default InputText;
