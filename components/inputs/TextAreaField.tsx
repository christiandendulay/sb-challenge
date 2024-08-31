import React, { TextareaHTMLAttributes } from "react";
import { styled } from "@mui/system";

const TextArea = styled("textarea", {
  shouldForwardProp: (prop) => prop !== "error",
})<{ error: boolean }>(({ error }) => ({
  width: "100%",
  padding: "8px 12px",
  fontSize: "16px",
  lineHeight: "1.5",
  borderRadius: "4px",
  border: `1px solid ${error ? "red" : " #ccc"}`,
  "&:focus": {
    outline: "none",
    borderColor: "#007bff",
  },
}));

export const TextAreaField = ({
  isError = false,
  inputProps,
}: {
  inputProps: TextareaHTMLAttributes<HTMLTextAreaElement>;
  isError?: boolean;
}) => {
  return <TextArea error={isError} {...inputProps} />;
};

export default TextAreaField;
