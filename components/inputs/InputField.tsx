import React, { InputHTMLAttributes } from "react";
import styled from "@mui/system/styled";
import { StatusClear } from "@/src/assets";
import { StatusError } from "@/src/assets";

const InputWrapper = styled("div")`
  position: relative;
  width: 100%;
`;

const IconWrapper = styled("div")`
  position: absolute;
  top: 50%;
  right: 12px; /* Position the icon on the right */
  transform: translateY(-50%);
  pointer-events: none; /* Makes sure the icon is not clickable */
`;

const Input = styled("input", {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error: boolean }>(({ error }) => ({
  width: "100%",
  padding: "8px 36px 8px 12px",
  fontSize: "16px",
  lineHeight: "1.5",
  borderRadius: "4px",
  border: `1px solid ${error ? "red" : " #ccc"}`,
  "&:focus": {
    outline: "none",
    borderColor: "#007bff",
  },
}));

export const InputField = ({
  isError = false,
  inputProps,
}: {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  isError?: boolean;
}) => {
  return (
    <InputWrapper>
      <Input error={isError} {...inputProps} />
      <IconWrapper>
        {isError ? <StatusError aria-hidden /> : <StatusClear aria-hidden />}
      </IconWrapper>
    </InputWrapper>
  );
};

export default InputField;
